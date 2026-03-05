export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  materials: string[];
  images: string[];
  artisanId: string;
  views: number;
  orders: number;
  story?: ProductStory;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  marketplaces: string[];
}

export interface ProductStory {
  storyTitle: string;
  craftHeritage: string;
  howItsMade: string;
  whyUnique: string;
  artisanNarrative: string;
}

export interface Artisan {
  id: string;
  name: string;
  email: string;
  phone: string;
  language: Language;
  craft: string;
  location: string;
  avatar?: string;
  bio: string;
  totalProducts: number;
  totalSales: number;
  totalRevenue: number;
  joinedAt: string;
}

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn';

export interface Order {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  customerName: string;
  customerLocation: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  platform: string;
  createdAt: string;
}

export interface PricingInsight {
  recommendedPrice: number;
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
  demandScore: number;
  seasonality: string;
  competitorRanges: { platform: string; min: number; max: number }[];
  tips: string[];
  trendDirection: 'up' | 'down' | 'stable';
  priceHistory: { month: string; price: number }[];
}

export interface Marketplace {
  id: string;
  name: string;
  logo: string;
  color: string;
  commission: number;
  enabled: boolean;
  listingsCount: number;
}

export interface AnalyticsData {
  salesTrend: { month: string; sales: number; revenue: number }[];
  demandTrend: { month: string; demand: number; views: number }[];
  topProducts: { title: string; sales: number; revenue: number }[];
  customerLocations: { city: string; count: number }[];
  platformBreakdown: { platform: string; percentage: number; revenue: number }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ActivityItem {
  id: string;
  type: 'order' | 'view' | 'listing' | 'export' | 'pricing';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}
