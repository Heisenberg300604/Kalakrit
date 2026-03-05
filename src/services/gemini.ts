import { GoogleGenerativeAI } from '@google/generative-ai';
import { mockVoiceListingResult } from './mockData';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const configuredModel = import.meta.env.VITE_GEMINI_MODEL;
const enableFallback = import.meta.env.VITE_GEMINI_FALLBACK_TO_MOCK !== 'false';

const MODEL_CANDIDATES = [
  configuredModel,
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
].filter(Boolean) as string[];

let genAI: GoogleGenerativeAI | null = null;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return String(err ?? '');
}

function parseRetryDelayMs(raw: string): number {
  const retryInMatch = raw.match(/retry in\s+([\d.]+)s/i);
  if (retryInMatch?.[1]) {
    return Math.max(1000, Math.ceil(Number(retryInMatch[1]) * 1000));
  }

  const retryDelayMatch = raw.match(/"retryDelay"\s*:\s*"(\d+)s"/i);
  if (retryDelayMatch?.[1]) {
    return Math.max(1000, Number(retryDelayMatch[1]) * 1000);
  }

  return 2500;
}

function isRateLimitError(err: unknown): boolean {
  const message = getErrorMessage(err).toLowerCase();
  return message.includes('429') || message.includes('resource_exhausted') || message.includes('quota exceeded');
}

function isZeroQuotaError(err: unknown): boolean {
  const message = getErrorMessage(err).toLowerCase();
  return message.includes('limit: 0') || message.includes('free_tier_requests, limit: 0') || message.includes('free_tier_input_token_count, limit: 0');
}

async function generateWithRetry(prompt: string): Promise<string> {
  if (!genAI) {
    throw new Error('Gemini API key not configured. Add VITE_GEMINI_API_KEY to your .env file.');
  }

  let lastError: unknown = null;

  for (const modelName of MODEL_CANDIDATES) {
    const model = genAI.getGenerativeModel({ model: modelName });

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const result = await model.generateContent(prompt);
        return result.response.text().trim();
      } catch (err) {
        lastError = err;
        if (!isRateLimitError(err) || attempt === 2) {
          break;
        }

        const waitMs = parseRetryDelayMs(getErrorMessage(err));
        await sleep(waitMs);
      }
    }
  }

  throw lastError;
}

// ── Listing Generation ──────────────────────────────────────

export interface GeneratedListing {
  title: string;
  description: string;
  tags: string[];
  category: string;
  materials: string[];
  highlights: string[];
  suggestedPrice: number;
}

const LISTING_PROMPT = `You are an expert product listing creator for Indian artisan crafts on marketplaces like Amazon, Etsy, Flipkart, and Meesho.

The artisan has described their product by speaking. Below is their transcribed speech (may be in Hindi, Tamil, Telugu, Bengali, or English).

Create a professional, marketplace-ready product listing. Return ONLY valid JSON (no markdown, no code fences) with this exact structure:
{
  "title": "Professional product title in English (max 80 chars)",
  "description": "Detailed product description in English (150-250 words) highlighting craftsmanship, heritage, and appeal to buyers",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7"],
  "category": "Product category (e.g. Textiles, Pottery, Folk Art, Metal Craft, Jewelry, Woodwork)",
  "materials": ["Material 1", "Material 2", "Material 3"],
  "highlights": ["Highlight 1", "Highlight 2", "Highlight 3", "Highlight 4", "Highlight 5"],
  "suggestedPrice": 0
}

For suggestedPrice, estimate a fair market price in INR based on the craft type, materials, and complexity described.

Rules:
- Title must be professional and SEO-optimized for marketplaces
- Description should tell the craft story and appeal to both Indian and international buyers
- Tags should include craft technique, region, material, and use-case keywords
- Highlights should focus on authenticity, handmade quality, and unique selling points
- If the speech is unclear, make reasonable assumptions about a traditional Indian craft product`;

export async function generateListing(transcript: string, language: string): Promise<GeneratedListing> {
  const prompt = `${LISTING_PROMPT}

Artisan's speech (language: ${language}):
"${transcript}"

Return ONLY valid JSON:`;

  let text = '';
  try {
    text = await generateWithRetry(prompt);
  } catch (err) {
    if (enableFallback && isRateLimitError(err)) {
      if (isZeroQuotaError(err)) {
        console.warn('Gemini quota is currently 0 for this project/tier. Falling back to mock listing output.');
      }
      return {
        ...mockVoiceListingResult,
        description: `${mockVoiceListingResult.description}\n\nArtisan voice note: ${transcript}`,
      };
    }

    throw new Error('Gemini request failed. Please retry shortly or check AI Studio quota and billing settings.');
  }

  let jsonStr = text;
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }

  try {
    const parsed = JSON.parse(jsonStr) as GeneratedListing;
    return parsed;
  } catch {
    console.error('Failed to parse Gemini response:', text);
    throw new Error('AI returned invalid data. Please try recording again.');
  }
}

// ── AI Storytelling ─────────────────────────────────────────

export interface GeneratedStory {
  storyTitle: string;
  craftHeritage: string;
  howItsMade: string;
  whyUnique: string;
  artisanNarrative: string;
}

const STORY_PROMPT = `You are a master storyteller specializing in Indian artisan crafts. Your stories celebrate heritage, human creativity, and cultural preservation.

Given a product listing, write a rich craft story. Return ONLY valid JSON (no markdown, no code fences) with this exact structure:
{
  "storyTitle": "An evocative, poetic title for the craft story (5-10 words)",
  "craftHeritage": "2-3 sentences about the historical and cultural roots of this craft tradition. Mention the region, approximate age of the tradition, and cultural significance.",
  "howItsMade": "2-3 sentences describing the traditional making process — the techniques, tools, time, and human skill involved.",
  "whyUnique": "2-3 sentences about what makes this piece special — why no machine or factory can replicate it, what the buyer receives beyond a product.",
  "artisanNarrative": "2-3 sentences written as a first-person artisan voice — personal, warm, and authentic. Express pride, family legacy, and hope for the craft's future."
}

Rules:
- Write in English but feel warmly Indian in tone
- Be specific to the craft type, materials, and region
- Make it emotionally compelling — buyers should feel they're supporting a living tradition
- Keep each field concise but vivid`;

export async function generateStory(product: {
  title: string;
  description: string;
  category: string;
  materials: string[];
}): Promise<GeneratedStory> {
  const prompt = `${STORY_PROMPT}

Product details:
Title: ${product.title}
Description: ${product.description}
Category: ${product.category}
Materials: ${product.materials.join(', ')}

Return ONLY valid JSON:`;

  let text = '';
  try {
    text = await generateWithRetry(prompt);
  } catch (err) {
    if (enableFallback && isRateLimitError(err)) {
      if (isZeroQuotaError(err)) {
        console.warn('Gemini quota is currently 0 for this project/tier. Falling back to deterministic story output.');
      }
      return {
        storyTitle: `${product.title} — A Living Craft Tradition`,
        craftHeritage: `This ${product.category} tradition carries regional techniques passed down through generations of artisans in India. Each piece reflects cultural memory and community identity.`,
        howItsMade: `The product is handmade using ${product.materials.join(', ') || 'traditional materials'}, with careful manual steps that demand patience and skill. Small variations are natural and prove authentic handwork.`,
        whyUnique: `No factory process can replicate the human touch, subtle imperfections, and heritage methods in this piece. Buyers receive both a functional product and a story rooted in craft legacy.`,
        artisanNarrative: `I make each piece with pride and respect for the elders who taught this craft. Your support helps my family continue this tradition and keep our art alive for the next generation.`,
      };
    }

    throw new Error('Gemini request failed. Please retry shortly or check AI Studio quota and billing settings.');
  }

  let jsonStr = text;
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }

  try {
    const parsed = JSON.parse(jsonStr) as GeneratedStory;
    return parsed;
  } catch {
    console.error('Failed to parse Gemini story response:', text);
    throw new Error('AI returned invalid story data. Please try again.');
  }
}
