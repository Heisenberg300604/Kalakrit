/**
 * AI Commerce Guide - Sample Data & Guidance
 * Provides personalized business advice on pricing, marketing, storytelling, and growth
 */

export interface PricingRecommendation {
  productName: string;
  category: string;
  currentPrice: number;
  recommendedPrice: number;
  priceRange: { min: number; max: number };
  reason: string;
  confidence: 'high' | 'medium' | 'low';
  seasonalAdjustment?: string;
  marketTrend: string;
}

export interface MarketingTip {
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  timeToImplement: string;
  examples?: string[];
}

export interface GrowthOpportunity {
  title: string;
  description: string;
  potentialRevenue?: number;
  implementationDifficulty: 'Easy' | 'Medium' | 'Hard';
  timeframe: string;
  actionSteps: string[];
}

export interface BusinessGuidance {
  pricingRecommendations: PricingRecommendation[];
  marketingTips: MarketingTip[];
  growthOpportunities: GrowthOpportunity[];
  craftStoryEnhancement: string;
  performanceInsights: string;
}

/**
 * Sample AI Commerce Guide Data
 * Based on artisan craft types and sales patterns
 */
export const sampleGuidance: Record<string, BusinessGuidance> = {
  banarasi_silk: {
    pricingRecommendations: [
      {
        productName: 'Banarasi Silk Saree',
        category: 'Textiles',
        currentPrice: 2500,
        recommendedPrice: 3200,
        priceRange: { min: 2800, max: 4500 },
        reason: 'Festival season demand up 45%. Similar Banarasi sarees from established artisans priced at ₹3000-3500. Your product quality justifies premium pricing.',
        confidence: 'high',
        seasonalAdjustment: 'Festival season (Oct-Dec): +15%, Summer (Apr-Jun): -5%',
        marketTrend: '📈 Trending upward; traditional wear gaining popularity among Gen Z',
      },
      {
        productName: 'Banarasi Silk Dupatta',
        category: 'Accessories',
        currentPrice: 800,
        recommendedPrice: 1100,
        priceRange: { min: 900, max: 1500 },
        reason: 'Cross-sell item with high profit margin (48%). Bundle with saree for ₹4000 combo deal.',
        confidence: 'high',
        marketTrend: '📈 High bundle frequency with sarees',
      },
    ],
    marketingTips: [
      {
        title: 'Enhance Product Descriptions',
        description: 'Your Banarasi Silk descriptions lack storytelling. Add: weaving technique, thread count, regional origin (Banarasi specifically), care instructions, and artisan story.',
        impact: 'High',
        timeToImplement: '1-2 hours',
        examples: ['handwoven with 100% silk threads', 'zari gold work brings radiance typical of Banarasi tradition', 'artisan Rajesh has 15 years experience'],
      },
      {
        title: 'Use SEO Keywords',
        description: 'Add keywords to categories and tags: "Banarasi", "traditional saree", "silk weave", "handloom", "zari work", "festive wear"',
        impact: 'High',
        timeToImplement: '30 minutes',
        examples: ['#BanarasiSilk #HandwovenSaree #TraditionalWear #FestiveAttire'],
      },
      {
        title: 'Photography Improvement',
        description: 'Add 3-4 more photos: close-up of zari work, full-length wear-photo on model, packaging/gift wrapping, detail of pallu pattern',
        impact: 'High',
        timeToImplement: '2-3 hours',
        examples: ["lifestyle photo can increase interest by 28%"],
      },
    ],
    growthOpportunities: [
      {
        title: 'Festival Bundle Strategy',
        description: 'Create bundled offers for Diwali, Navratri, and Wedding season. Combine saree + dupatta + jewelry at ₹4500 deal (₹500 discount.)',
        potentialRevenue: 15000,
        implementationDifficulty: 'Easy',
        timeframe: '2 weeks',
        actionSteps: [
          'Create 3 bundle packages: Everyday, Festival, Wedding',
          'Set inventory for bundle production',
          'Launch marketing campaign 1 month before festival',
        ],
      },
      {
        title: 'B2B Wholesale Partnerships',
        description: 'Approach wedding planners, ethnic wear boutiques, and online platforms (Flipkart, Amazon, Meesho). Offer 30-40% wholesale discount.',
        potentialRevenue: 50000,
        implementationDifficulty: 'Hard',
        timeframe: '4-6 weeks',
        actionSteps: [
          'Prepare wholesale catalog with photos and pricing',
          'Identify 15-20 potential B2B partners in metro cities',
          'Send personalized partnership proposals',
          'Negotiate terms: MOQ, payment, returns policy',
        ],
      },
    ],
    craftStoryEnhancement:
      "Your craft story should emphasize: generations of skill, specific heritage of Banarasi weaving, unique zari techniques, time investment per saree (mention 5-7 days per saree). Frame as 'Preserving 500-year tradition' with your artisan name prominently. This appeals to conscious consumers.",
    performanceInsights:
      '✅ Your Banarasi Silk products have 38% higher views than average artisans. Revenue grew 23% last month. Focus on scaling festive season inventory and adding more color variants.',
  },

  warli_painting: {
    pricingRecommendations: [
      {
        productName: 'Small Warli Painting (12x12 inches)',
        category: 'Art & Decor',
        currentPrice: 600,
        recommendedPrice: 850,
        priceRange: { min: 700, max: 1200 },
        reason: 'Home decor demand up 32% post-pandemic. Warli paintings trending on Pinterest and Instagram with millennial audience.',
        confidence: 'high',
        seasonalAdjustment: 'Home décor season (Feb-Apr, Oct-Dec): +10%',
        marketTrend: '📈 Trending with interior design enthusiasts and home décor category',
      },
      {
        productName: 'Large Warli Painting (24x36 inches)',
        category: 'Art & Decor',
        currentPrice: 2000,
        recommendedPrice: 2800,
        priceRange: { min: 2400, max: 4000 },
        reason: 'Premium segment; justifiable for hand-painted art. Often displayed in high-income homes and corporate spaces.',
        confidence: 'medium',
        marketTrend: '📈 B2B opportunity: corporate offices, hotels, restaurants',
      },
    ],
    marketingTips: [
      {
        title: 'Create Content Around Symbolism',
        description: 'Each Warli symbol (bird, fish, tree, human) has meaning. Create short educational content explaining these symbols—increases perceived value and cultural appeal.',
        impact: 'High',
        timeToImplement: '1 hour',
        examples: ['The "fish" symbol represents fertility and prosperity', 'The "tree" symbolizes growth and life'],
      },
      {
        title: 'Lifestyle Photography',
        description: 'Show paintings in actual living spaces (homes, offices, restaurants). This helps customers visualize placement and increases conversion by 35%.',
        impact: 'High',
        timeToImplement: '2-3 hours',
        examples: ['on living room wall behind sofa', 'above entryway entrance', 'corporate office lounge'],
      },
      {
        title: 'Target Interior Designers',
        description: 'Reach out to interior designers on Instagram/LinkedIn. Offer 25-30% designer discount. They can become bulk buyers and refer many customers.',
        impact: 'High',
        timeToImplement: '2-3 hours ongoing',
      },
    ],
    growthOpportunities: [
      {
        title: 'Corporate Art Supply',
        description: 'Partner with hotels, restaurants, corporate offices for bulk art orders. Offer custom sizes and colors. Margins: 50%+',
        potentialRevenue: 60000,
        implementationDifficulty: 'Hard',
        timeframe: '2-3 months',
        actionSteps: [
          'Create corporate portfolio with 5-10 high-quality images',
          'Identify 20 high-end hotels/restaurants in major cities',
          'Approach with customized proposals',
          'Negotiate bulk ordering and delivery terms',
        ],
      },
      {
        title: 'DIY Kit / Workshop Model',
        description: 'Sell Warli painting DIY kits (canvas, paints, brushes) + online tutorial (₹500-800). Reach younger audience learning traditional art.',
        potentialRevenue: 20000,
        implementationDifficulty: 'Easy',
        timeframe: '3-4 weeks',
        actionSteps: [
          'Create 2-3 simple painting tutorials (15-20 min each)',
          'Organize kits with quality materials',
          'Launch on Etsy, Amazon Handmade, or your own site',
        ],
      },
    ],
    craftStoryEnhancement:
      'Warli painting is tribal art from Western India (Maharashtra border). Emphasize: "An art form nearly 3000 years old, historically created to celebrate harvests and community." Mention your personal connection: "I learned from grandmother who learned from her ancestors." This authenticity resonates with buyers.',
    performanceInsights:
      '⚠️ Your Warli paintings have 2x views compared to other products, but conversion is low (2.3%). Issue: Price points are competitive, but product descriptions lack story. Adding artistic narrative and better photos can boost conversion to 6%+',
  },

  blue_pottery: {
    pricingRecommendations: [
      {
        productName: 'Blue Pottery Dinner Set (6 pieces)',
        category: 'Home & Kitchen',
        currentPrice: 1200,
        recommendedPrice: 1650,
        priceRange: { min: 1400, max: 2200 },
        reason: 'Functional + decorative; home category trending. Similar handmade pottery sets priced at ₹1600-2000. Raise price incrementally.',
        confidence: 'high',
        seasonalAdjustment: 'Wedding season (Nov-Feb): +15% (gifts market)',
        marketTrend: '📈 Home decor + sustainable alternatives to mass-produced dinnerware',
      },
    ],
    marketingTips: [
      {
        title: 'Highlight Artisanal Process',
        description: 'Show step-by-step pottery creation videos. Customers pay premium for handmade + sustainable. Use hashtags #SlowLiving #Artisanal #EcoFriendly',
        impact: 'High',
        timeToImplement: '2-3 hours (video creation)',
      },
      {
        title: 'Functional Benefits Copy',
        description: 'Blue pottery is food-safe, hand-glazed, long-lasting. Emphasize durability & eco-conscious appeal. Compare: "One Blue Pottery set replaces 5 sets of mass-produced dinnerware."',
        impact: 'Medium',
        timeToImplement: '30 minutes',
      },
    ],
    growthOpportunities: [
      {
        title: 'Wedding Registry Partnerships',
        description: 'Partner with wedding planning platforms (Wedmegood, Shaadisaga). Blue pottery is popular wedding gift. Get featured in gift guides.',
        potentialRevenue: 40000,
        implementationDifficulty: 'Medium',
        timeframe: '6-8 weeks',
        actionSteps: [
          'Contact wedding platform business teams',
          'Prepare wedding package bundles',
          'Offer exclusive partnership discounts',
        ],
      },
    ],
    craftStoryEnhancement:
      'Blue pottery originated in Jaipur, crafted for centuries. Your story: "Carrying forward 300-year legacy with sustainable natural glazes. Each piece is unique—no two sets are identical." This resonates with customers seeking authentic, eco-friendly home goods.',
    performanceInsights:
      '✅ Blue pottery has strong seasonal peaks (Feb-Apr for wedding season). Recommendation: Prepare extra inventory 2-3 months before peak seasons. Revenue opportunity: +₹25000 if you scale inventory now.',
  },
};

/**
 * AI Chat Responses - triggered by keywords
 * Provides intelligent answers to common business questions
 */
export const aiChatResponses: Record<string, string> = {
  // Pricing guidance
  pricing: `💰 **Pricing Strategy Guide**

I analyze current market trends, competitor pricing, and your demand patterns to recommend optimal prices. Here's how I help:

1. **Market Analysis**: Your products compared to 50+ similar artisans
2. **Seasonal Adjustments**: Recommend +15% during festival seasons, -5% during off-seasons
3. **Profit Optimization**: Suggest prices that maximize both revenue AND conversion rates
4. **Bundle Pricing**: Create combo deals (e.g., Saree + Dupatta) to boost average order value

**What you should do next:**
- Ask "What price should my [product] be?"
- Share your current price + product details
- I'll give you specific recommendation with reasoning

Example: "My Banarasi saree is ₹2500. Should I increase price?" → I'd analyze competitor prices, demand trends, and suggest ₹3200 with detailed reasoning.`,

  marketing: `📣 **Marketing & Storytelling Tips**

The difference between artisans earning ₹10K/month vs ₹1L/month often isn't product quality—it's marketing & storytelling.

**Key areas I guide you on:**
1. **Product Descriptions**: Make them emotionally compelling, not just technical
2. **Keywords & Tags**: Ensure your products appear in relevant searches
3. **Photography**: What angles, lighting, backgrounds drive higher conversion
4. **Platform Strategy**: Which marketplace (Flipkart, Amazon, Etsy, Instagram) suits your craft
5. **Content Ideas**: What kind of posts/videos get engagement

**My recommendations:**
- Better descriptions alone can increase conversion by 25-40%
- 3-5 high-quality photos > 10 mediocre photos
- Keywords like "handmade", "eco-friendly", "traditional" increase visibility

**Next steps:**
Ask me: "How should I describe my [product]?" or "What keywords should I use?"`,

  naming: `✏️ **Product Naming & Positioning**

A great product name can increase perceived value by 20-30%. Here's what I recommend:

**Naming Principles:**
- **Tell the Story**: Not just "Blue Pottery Bowl", but "Jaipur Blue Pottery Handcrafted Serving Bowl"
- **Highlight Heritage**: "3000-year-old Warli Art Technique" vs just "Warli Painting"
- **Add Emotion**: "Festival Green Banarasi Silk Saree - A Bride's Treasure" vs "Saree"

**Examples of good vs bad names:**
- ❌ "Painting" → ✅ "Authentic Warli Tribe Art - Home Wall Décor"
- ❌ "Pottery Plate" → ✅ "Handcrafted Jaipur Blue Pottery Dinner Plate - Eco-Friendly"
- ❌ "Silk Fabric" → ✅ "Pure Banarasi Silk Fabric - Festival Gold Zari Weave"

**Impact**: Better names rank higher in search, attract premium buyers, justify higher prices.

Ask me: "How should I name my [product]?" I'll suggest 3-5 compelling options!`,

  story: `📖 **Craft Story & Artisan Narrative**

Your personal story is your *competitive advantage*. Customers pay 30-50% premium for products with authenticity + emotional connection.

**What buyers connect with:**
1. **Your journey**: "I learned from my grandmother who learned from her mother" 
2. **Heritage & culture**: "Banarasi weaving is 500 years old tradition"
3. **Specific details**: "Each saree takes 5-7 days. Uses 10,000+ silk threads"
4. **Sustainability**: "Natural dyes, no synthetic chemicals, eco-friendly"
5. **Personal touch**: "Every piece has my signature—I ensure quality"

**Winning craft story template:**
"I'm [Your Name], a [craft type] artisan from [location]. I learned this art from [family/mentor]. What makes my [product] special: [unique technique/material]. When you buy from me, you're: [benefit to buyer—preserving tradition, supporting crafts, getting authentic product]"

**Example for Banarasi Silk artisan:**
"I'm Rajesh, a Banarasi silk weaver from Varanasi. My family has been weaving for 150 years. Each saree takes 5-7 days with 100% pure silk and zari gold work. When you buy my saree, you're wearing a piece of history & supporting a 500-year tradition."

I can help you refine and optimize your story for better customer connection!`,

  story_writing: `📖 **Let me help you craft your story!**

Great craft stories follow this structure:

1. **Your Background** (1 sentence): Who are you? Where are you from?
2. **Learning Journey** (2 sentences): How did you learn this craft?
3. **What Makes You Unique** (2 sentences): What's special about your technique/materials?
4. **Heritage Connection** (1 sentence): How does this craft connect to culture/tradition?
5. **Customer Benefit** (1 sentence): Why should someone buy from you?

Share details about yourself, and I'll write a compelling story that connects with buyers!`,

  growth: `📈 **Business Growth Strategies**

I identify 3-5 high-potential growth opportunities specific to your craft and sales patterns:

**Common opportunities:**
1. **Cross-selling & Bundling**: Combine complementary products at combo price
2. **Seasonal Scaling**: Increase inventory before peak seasons (festivals, weddings)
3. **B2B Partnerships**: Approach boutiques, hotels, corporate offices for bulk orders
4. **Platform Expansion**: Reach Flipkart, Amazon, Etsy alongside your own site
5. **Product Diversification**: New product lines in same craft category

**My approach:**
- Analyze your current sales patterns
- Identify which channels/products drive highest margin
- Recommend specific partnerships or new products
- Give implementation timeline & difficulty level

Next step: Ask "What should I do to grow my business?" I'll give personalized 3-month growth plan!`,

  // Holiday/Seasonal
  festival: `🎉 **Festival Season Strategy**

Festivals = Highest sales opportunity for artisans! Here's how to prepare:

**Key Festivals & Purchase Patterns:**
- **Diwali (Oct-Nov)**: +45% traffic; buyers want gifts + home décor
- **Navratri (Sept-Oct)**: Traditional wear spike; +30% sales
- **Wedding Season (Nov-Feb)**: Bridal wear, festive sarees, home décor
- **Summer (Apr-Jun)**: Lightweight fabrics, eco-friendly products

**Preparation (Do this now if upcoming festival):**
- Increase inventory 3 months before peak
- Create bundled offers (saree + dupatta combo)
- Prepare festival-themed product descriptions
- Plan social media content calendar
- Start promotions 2-3 weeks before festival

**What to do:** Tell me which festival is coming next, and I'll give you specific action plan!`,

  sales: `💹 **Sales Optimization**

High-traffic but low conversion? Here's how to fix it:

**Common conversion killers:**
1. **Poor product photos**: Use 10+ angles, close-ups, lifestyle photos
2. **Vague descriptions**: Add: material, size, care, origin, artisan story
3. **Missing keywords**: Use "handmade", "authentic", "traditional", "eco-friendly"
4. **Pricing anxiety**: Show competitor prices, explain why yours is premium
5. **Trust building**: Add testimonials, return policy, shipping info clearly

**My diagnostic:**
- High views + low purchases = Better photos & descriptions needed
- Low views + low purchases = Need better keywords & marketing
- Medium views + good purchases = Keep doing what you're doing!

**Quick wins:**
- Add 2 lifestyle photos (product in actual use) → +15-20% conversion
- Write compelling story → +25-30% conversion
- Use relevant keywords → +40-50% visibility increase

Tell me your current monthly sales & traffic, I'll identify exact bottleneck!`,

  default: `Hi there! 👋 As your AI Commerce Guide, I'm here to help with:

💰 **Pricing** - What price should my products be?
📣 **Marketing** - How do I write better product descriptions?
✏️ **Product Names** - Help me name my products better
📖 **Craft Story** - How do I tell my artisan story?
📈 **Growth** - What opportunities exist for my business?

Ask me any specific question, and I'll provide personalized advice based on market trends, your craft type, and real sales data. 🙏`,
};

/**
 * Sample AI Guidance by Craft Type
 */
export const guidanceByCraft: Record<string, BusinessGuidance> = sampleGuidance;

/**
 * AI Commerce Guide Prompts for Gemini API
 * (If you want to generate real AI responses instead of mock data)
 */
export const aiGuidePrompts = {
  pricing: (productName: string, currentPrice: number, craftType: string) =>
    `You are a business advisor for Indian artisans. Analyze pricing for: ${productName} (Current: ₹${currentPrice}, Craft: ${craftType}).
      Provide: recommended price, price range, reason, seasonal adjustments, market trend.
      Format as JSON with fields: recommendedPrice, priceRange (min/max), reason, seasonalAdjustment, marketTrend.`,

  marketing: (productName: string, description: string) =>
    `Improve marketing for artisan product: "${productName}". Current description: "${description}"
      Provide: 3 marketing tips with impact level (High/Medium/Low) and implementation time.
      Format as JSON array with fields: title, description, impact, timeToImplement, examples.`,

  story: (artisanName: string, craftType: string, location: string) =>
    `Write a compelling craft story for artisan "${artisanName}" who makes ${craftType} from ${location}.
      Story should emphasize heritage, uniqueness, and why customers should buy.
      Make it emotional, authentic, and 100-150 words.`,

  growth: (craftType: string, monthlyRevenue: number, productCount: number) =>
    `Suggest growth opportunities for artisan with ${productCount} products, ₹${monthlyRevenue} monthly revenue, craft type: ${craftType}.
      Provide 3 specific, actionable opportunities with implementation difficulty and potential revenue impact.
      Format as JSON array with fields: title, description, potentialRevenue, implementationDifficulty, timeframe, actionSteps.`,
};

/**
 * Default Mock Chat History for first load
 */
export const mockChatHistoryData = [
  {
    id: '1',
    role: 'assistant' as const,
    content:
      "👋 Welcome! I'm your AI Commerce Guide. I provide personalized advice on pricing strategy, marketing, product storytelling, and business growth. Whether you want to optimize prices, write better descriptions, or scale your craft business, I'm here to help! What would you like assistance with today?",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: '2',
    role: 'user' as const,
    content: "I make Banarasi silk sarees. What price should I set?",
    timestamp: new Date(Date.now() - 4 * 60000).toISOString(),
  },
  {
    id: '3',
    role: 'assistant' as const,
    content: `💰 Great question! Banarasi silk sarees are in high demand, especially during festival season.

Based on current market trends:
- **Current average price**: ₹2,500-3,000
- **My recommendation**: **₹3,200-3,500** for quality Banarasi with zari work
- **Why**: Festival season demand up 45%, similar sarees priced at ₹3,000-3,500
- **Your advantage**: Handmade quality justifies premium pricing

**Seasonal strategy**:
- Festival (Oct-Dec): ₹3,500 (peak demand)
- Regular (Jan-Sept): ₹3,000 (steady demand)
- Summer (Apr-Jun): ₹2,700 (lower demand)

**To increase sales**:
1. Better product photos (show zari work details + lifestyle)
2. Write compelling description (mention weaving technique, thread count, care)
3. Bundle offer: Saree + Dupatta at ₹4,200 (vs ₹4,100 separately)

Want help with product descriptions or marketing strategy next?`,
    timestamp: new Date(Date.now() - 3 * 60000).toISOString(),
  },
];
