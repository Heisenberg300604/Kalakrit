# 🎨 KalaKrit - Artisan Marketplace Platform

A modern, full-featured marketplace platform designed to empower Indian artisans by providing tools to digitize and scale their craft businesses. Built with React, TypeScript, and powered by AI-driven product listing automation.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Key Features Explained](#key-features-explained)
- [API Integration](#api-integration)
- [Team Setup](#team-setup)

## 🌟 Features

### Authentication & User Management
- **User Registration & Login** - Secure email/password authentication with Supabase
- **Profile Management** - Create and update artisan profiles with name, phone, craft, location, and language preferences
- **Protected Routes** - Role-based access control for authenticated users
- **Multi-language Support** - Support for Hindi, English, and other regional languages

### Marketplace
- **Published Products Showcase** - Browse and discover artisan products from across India
- **Product Filtering & Sorting** - Filter by category, price, artisan location, and craft type
- **Artisan Profile View** - Discover artisan details, craft story, and all their products
- **Secure Checkout Integration** - Ready for payment gateway integration

### Voice-Powered Product Listing (AI Feature)
- **Voice-to-Listing** - Speak to generate complete product listings using Web Speech Recognition API
- **AI-Powered Product Descriptions** - Google Gemini AI generates engaging product descriptions, prices, and metadata from voice input
- **Automatic Metadata Generation** - Categories, tags, materials, and highlights auto-populated
- **Intelligent Fallback** - Graceful degradation when API quota exceeded; mock data fallback ensures app reliability
- **Error Handling & Retry Logic** - Exponential backoff for rate-limited requests; configurable AI model selection

### Dashboard (For Artisans)
- **Dashboard Home** - Welcome greeting with real-time stats, revenue trends, and AI suggestions
- **Product Management** - Create, edit, and manage product listings with full control
  - Draft, publish, and archive products
  - Add images, transcripts, and AI-generated descriptions
  - Track product views and order counts
- **Analytics Dashboard** - Visualize revenue trends, demand patterns, and view metrics
  - Interactive charts powered by Recharts
  - Revenue trend analysis with monthly breakdowns
  - Demand forecasting and seasonal insights
- **Order Management** - Track incoming orders, customer details, and fulfillment status
- **Pricing Insights** - AI-powered pricing recommendations based on market trends and demand
- **AI Commerce Guide** - Smart suggestions for product optimization, pricing strategy, and market positioning
- **Settings Page** - Manage account preferences, notification settings, and privacy controls

### Public Pages
- **Landing Page** - Engaging introduction with call-to-action, features showcase, and testimonials
- **Marketplace Page** - Browse published products with artisan profiles (filtered to published-only status)

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library for building interactive interfaces
- **TypeScript** - Type-safe JavaScript for better code reliability
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router** - Client-side routing for multi-page navigation
- **Recharts** - Data visualization library for dashboard charts
- **Lucide React** - Beautiful icon library
- **ShadCN/UI** - High-quality, customizable UI components

### Backend & Database
- **Supabase** - Open-source Firebase alternative providing:
  - PostgreSQL Database with Row-Level Security (RLS)
  - Authentication with email/password support
  - Real-time capabilities via WebSockets
  - Built-in triggers and stored procedures
- **PostgreSQL** - Relational database for storing user profiles, products, and orders

### AI & Voice
- **Google Generative AI (Gemini)** - AI model for auto-generating product descriptions and metadata
  - Primary: `gemini-2.5-flash` (stable, production-ready)
  - Fallback: `gemini-2.5-flash-lite` (lightweight alternative)
- **Web Speech Recognition API** - Browser-native speech-to-text conversion

### Development Tools
- **ESLint** - Code linting for consistency and best practices
- **TypeScript Compiler** - Strict type checking during development
- **Vite HMR** - Hot Module Replacement for instant dev feedback

## 📁 Project Structure

```
src/
├── components/
│   ├── ProtectedRoute.tsx      # Route guard for authenticated-only pages
│   └── ui/                     # Reusable UI components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       └── separator.tsx
├── hooks/
│   ├── AuthContext.tsx         # Global auth state & methods (signup, signin, signout)
│   └── useLanguage.tsx         # Language/i18n context hook
├── pages/
│   ├── LandingPage.tsx         # Public landing page
│   ├── LoginPage.tsx           # User login form
│   ├── SignupPage.tsx          # User registration form
│   ├── MarketplacePage.tsx     # Public marketplace with published products
│   ├── ProductDetailPage.tsx   # Individual product details
│   └── dashboard/              # Artisan dashboard pages
│       ├── DashboardLayout.tsx    # Main dashboard layout with sidebar
│       ├── DashboardHome.tsx      # Dashboard homepage with stats
│       ├── ProductManagement.tsx  # Create/edit/manage products
│       ├── VoiceListing.tsx       # AI-powered voice-to-listing feature
│       ├── AnalyticsDashboard.tsx # Revenue & demand charts
│       ├── OrdersPage.tsx         # Order management & tracking
│       ├── PricingInsights.tsx    # AI-powered pricing recommendations
│       ├── AICommerceGuide.tsx    # Smart marketplace suggestions
│       ├── ProfilePage.tsx        # Artisan profile management
│       ├── SettingsPage.tsx       # Account settings
│       ├── ProductShowcase.tsx    # Published products gallery
│       └── MarketplaceExport.tsx  # Bulk export to platforms (Flipkart, Amazon)
├── services/
│   ├── gemini.ts              # Google Gemini API integration with retry logic
│   └── mockData.ts            # Fallback mock data for development/quota limits
├── utils/
│   ├── supabase.ts            # Supabase client initialization
│   └── utils.ts               # Utility functions (formatCurrency, formatNumber, etc.)
├── lib/
│   └── utils.ts               # Helper functions
├── types/
│   └── index.ts               # TypeScript type definitions
├── App.tsx                    # Main app component with routing
├── main.tsx                   # React DOM entry point
├── App.css & index.css        # Global styles
└── components.json            # Component registry for CLI generation
```

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/kalakrit.git
   cd kalakrit
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables** (see next section)
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## 🔑 Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini API
VITE_GEMINI_API_KEY=your_google_ai_api_key
VITE_GEMINI_MODEL=gemini-2.5-flash          # Primary model
VITE_GEMINI_FALLBACK_TO_MOCK=true           # Fallback to mock data on quota exceeded
```

### Getting These Values

**Supabase:**
1. Create account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings → API to find URL and Anon Key

**Google Gemini API:**
1. Visit [Google AI Studio](https://aistudio.google.com)
2. Create API key
3. Enable Generative Language API in Google Cloud Console
4. Set up billing tier (free tier has limits; monitor quota at [ai.google.dev](https://ai.google.dev))

## 💾 Database Setup

The project uses Supabase PostgreSQL with automatic schema initialization.

### Quick Setup

1. **Run SQL Schema** - Execute the unified setup file in Supabase SQL Editor:
   ```bash
   # Copy contents of supabase_schema.sql
   # Paste into Supabase → SQL Editor → New Query
   # Click Run
   ```

   This creates:
   - `profiles` table - User artisan profiles with full_name, phone, craft, location, language
   - `products` table - Product listings with detailed fields (title, description, price, images, status, etc.)
   - Auto-create trigger `handle_new_user()` - Automatically creates profile row on signup
   - RLS Policies - Ensure data security:
     - Published products readable by all
     - Unpublished products only visible to owner
     - Profile updates/deletes restricted to owner

2. **Verify Tables**
   In Supabase Dashboard → Table Editor, you should see:
   - `auth.users` (managed by Supabase)
   - `public.profiles`
   - `public.products`

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
- Frontend: http://localhost:5173
- HMR (Hot Module Reloading) enabled for instant updates

### Build for Production
```bash
npm run build
```
Creates optimized bundle in `dist/` folder

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 🎯 Key Features Explained

### 1. Voice-to-Listing with Gemini AI

**How It Works:**
1. User clicks "Add New Product" → Voice Listing
2. Browser captures speech using Web Speech Recognition API
3. Transcript sent to Google Gemini AI with structured JSON prompt
4. Gemini returns:
   - Product title, description, category
   - Suggested price with market analysis
   - Materials, techniques, highlights
   - Tags for searchability
5. Result displayed for final editing before publishing

**Error Handling:**
- If API quota exceeded (429 error), gracefully falls back to mock data
- Retry logic with exponential backoff (1s → 10s → configurable delay)
- User sees warning but can still continue with mock data

**Code Reference:** [src/services/gemini.ts](src/services/gemini.ts)

### 2. Authentication Flow

**Signup Process:**
1. User enters: email, password, full name, phone, craft type, location, language
2. AuthContext.signUp() creates Supabase user + stores metadata
3. Trigger `handle_new_user()` auto-creates profile row in DB
4. User auto-logged in and redirected to dashboard

**Login Process:**
1. User enters email & password
2. Supabase validates credentials
3. Session token stored in localStorage
4. User redirected based on auth state (login page → dashboard)

**Code Reference:** [src/hooks/AuthContext.tsx](src/hooks/AuthContext.tsx)

### 3. Marketplace Publishing

**Draft to Published:**
1. Artisan creates product in "Draft" status
2. Can edit anytime while drafted
3. Click "Publish" to make visible on marketplace
4. Only published products appear on public marketplace page
5. Can archive to hide without deleting

**Query Pattern:**
```sql
SELECT * FROM products 
WHERE status = 'published'
JOIN profiles ON products.user_id = profiles.id
ORDER BY created_at DESC
```

### 4. Analytics & Insights Dashboard

**Real-Time Metrics:**
- Total products, total revenue, total views, monthly orders
- Revenue trend chart (monthly breakdown)
- Demand trend + view count comparison

**AI Suggestions:**
- Pricing optimizations based on demand
- Product photography recommendations
- Marketplace export opportunities

**Code Reference:** [src/pages/dashboard/AnalyticsDashboard.tsx](src/pages/dashboard/AnalyticsDashboard.tsx)

## 🔗 API Integration

### Supabase Client
```typescript
import supabase from '../../utils/supabase';

// Fetch data
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('user_id', userId);

// Upsert with conflict handling
await supabase.from('profiles').upsert(
  {id, full_name, phone, craft, location, language},
  {onConflict: 'id'}
);
```

### Gemini API Integration
```typescript
import { generateListing } from '../../services/gemini';

const result = await generateListing(transcript, language);
// Returns: {title, description, price, category, materials, highlights, tags}
```

### Authentication
```typescript
const { user, signUp, signIn, signOut } = useAuth();

// Signup with profile data
await signUp({
  email, password, full_name, phone, craft, location, language
});

// Signin
await signIn(email, password);

// Signout
await signOut();
```

## 👥 Team Setup

To enable team collaboration and development:

1. **Database Setup** - All team members use shared Supabase project
   - Run `supabase_schema.sql` once per Supabase project
   - Or use unified `SETUP_DB.sql` which includes complete schema with documentation

2. **Environment Variables** - Each team member creates `.env.local` with shared Supabase credentials

3. **Git Workflow**
   ```bash
   # Pull latest
   git pull origin main
   
   # Create feature branch
   git checkout -b feature/your-feature
   
   # Commit & push
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature
   
   # Create Pull Request for review
   ```

4. **Development Conventions**
   - Use TypeScript for type safety
   - Follow Tailwind CSS for styling (no inline CSS)
   - Keep components in `src/components/` or `src/pages/`
   - Add tests in `__tests__/` folders
   - Always fetch real data from Supabase (avoid mocks in production)

## 📝 Notes

- The app uses **mock data** (from `mockData.ts`) for charts, activity feeds, and order history during development
- **Real user data** (full_name, profile, published products) is fetched from Supabase
- Voice listing requires a modern browser with Web Speech API support (Chrome, Edge, Safari)
- Gemini API has rate limits on free tier; upgrade billing tier for production

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 💬 Support

For issues, feature requests, or questions:
- Open an Issue on GitHub
- Contact the development team

---

**Built with ❤️ for Indian Artisans**

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
