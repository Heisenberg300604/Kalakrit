import type { Product, Artisan, Order, PricingInsight, Marketplace, AnalyticsData, ActivityItem, ChatMessage } from '../types';

export const mockArtisan: Artisan = {
  id: '1',
  name: 'Vartika Singh',
  email: 'vartika@kalakrit.in',
  phone: '+91 98765 43210',
  language: 'hi',
  craft: 'Textile & Weaving',
  location: 'Varanasi, UP',
  bio: 'Third-generation silk weaver from Varanasi creating handloom sarees with traditional Banarasi patterns.',
  totalProducts: 24,
  totalSales: 156,
  totalRevenue: 284500,
  joinedAt: '2024-01-15',
};

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Handwoven Banarasi Silk Saree',
    description: 'Exquisite pure silk saree with intricate zari work, featuring traditional peacock motifs. Handwoven by master weavers using 100-year-old looms in Varanasi.',
    price: 8500,
    category: 'Textiles',
    tags: ['silk', 'saree', 'handwoven', 'banarasi', 'traditional'],
    materials: ['Pure Silk', 'Gold Zari', 'Natural Dyes'],
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop'],
    artisanId: '1',
    views: 1240,
    orders: 18,
    status: 'published',
    marketplaces: ['amazon', 'etsy'],
    createdAt: '2024-02-10',
    story: {
      storyTitle: 'Threads of a Thousand Years',
      craftHeritage: 'Banarasi silk weaving dates back to the Mughal era, a tradition passed through generations of master weavers.',
      howItsMade: 'Each saree takes 15-30 days to weave on a traditional handloom. The zari threads are hand-laid into intricate patterns using ancient draft cards.',
      whyUnique: 'No two pieces are identical. Each saree carries the maker\'s unique fingerprint—the subtle variations that machines can never replicate.',
      artisanNarrative: 'My grandmother taught me this craft at age 8. Every thread I weave carries her memory and the hope that this art lives on.',
    },
  },
  {
    id: '2',
    title: 'Blue Pottery Decorative Vase',
    description: 'Traditional Jaipur blue pottery vase with floral designs, made with quartz stone powder and no clay. Each piece uniquely hand-painted.',
    price: 1200,
    category: 'Pottery',
    tags: ['blue pottery', 'vase', 'jaipur', 'handmade', 'decor'],
    materials: ['Quartz Stone Powder', 'Natural Pigments', 'Sandalwood Oil'],
    images: ['https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop'],
    artisanId: '1',
    views: 890,
    orders: 32,
    status: 'published',
    marketplaces: ['amazon', 'etsy', 'flipkart'],
    createdAt: '2024-02-18',
    story: {
      storyTitle: 'Born of Rajputana Earth',
      craftHeritage: 'Blue pottery is Jaipur\'s Mughal-Persian legacy, technically distinct as it contains no clay—only stone powder and minerals.',
      howItsMade: 'Raw quartz is ground, mixed with multani mitti and borax, shaped by hand, bisque-fired, painted with cobalt blue, then glazed at 800°C.',
      whyUnique: 'The translucent glaze gives it a luminous quality unlike any factory piece. Each flower is painted freehand in one breath.',
      artisanNarrative: 'I am the 4th generation blue pottery artist in my family. Each piece is my family\'s heart in your home.',
    },
  },
  {
    id: '3',
    title: 'Dokra Brass Tribal Figurine',
    description: 'Ancient Dhokra lost-wax cast brass figurine of a dancing tribal woman. Authentic Chhattisgarh craft over 4000 years old.',
    price: 2800,
    category: 'Metal Craft',
    tags: ['dhokra', 'brass', 'tribal', 'figurine', 'lost-wax'],
    materials: ['Brass', 'Beeswax', 'Clay'],
    images: ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop'],
    artisanId: '1',
    views: 567,
    orders: 12,
    status: 'published',
    marketplaces: ['etsy', 'amazon'],
    createdAt: '2024-03-01',
  },
  {
    id: '4',
    title: 'Hand-Block Printed Cotton Dupatta',
    description: 'Natural indigo and madder dyed cotton dupatta with traditional Rajasthani block prints. Eco-friendly and hand-crafted.',
    price: 950,
    category: 'Textiles',
    tags: ['block print', 'dupatta', 'indigo', 'rajasthan', 'natural dye'],
    materials: ['Organic Cotton', 'Natural Indigo', 'Madder Root'],
    images: ['https://images.unsplash.com/photo-1631445851533-5e2cf3ba3db7?w=400&h=400&fit=crop'],
    artisanId: '1',
    views: 445,
    orders: 28,
    status: 'published',
    marketplaces: ['meesho', 'amazon'],
    createdAt: '2024-03-10',
  },
  {
    id: '5',
    title: 'Warli Folk Art Wall Panel',
    description: 'Traditional Warli tribal art on handmade paper depicting harvest festival scenes. Original artwork from Palghar district Maharashtra.',
    price: 3500,
    category: 'Folk Art',
    tags: ['warli', 'folk art', 'tribal', 'wall art', 'painting'],
    materials: ['Handmade Paper', 'Natural Pigments', 'Bamboo Brush'],
    images: ['https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=400&fit=crop'],
    artisanId: '1',
    views: 321,
    orders: 8,
    status: 'draft',
    marketplaces: [],
    createdAt: '2024-03-15',
  },
  {
    id: '6',
    title: 'Madhubani Painting — Bride & Groom',
    description: 'Traditional Mithila Madhubani painting on handmade paper. Auspicious wedding theme with fish and lotus motifs. Museum-quality piece.',
    price: 4200,
    category: 'Folk Art',
    tags: ['madhubani', 'mithila', 'painting', 'wedding', 'bihar'],
    materials: ['Handmade Paper', 'Natural Dyes', 'Nib Pen'],
    images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop'],
    artisanId: '1',
    views: 678,
    orders: 15,
    status: 'published',
    marketplaces: ['etsy', 'amazon'],
    createdAt: '2024-03-20',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    productId: '1',
    productTitle: 'Handwoven Banarasi Silk Saree',
    productImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=80&h=80&fit=crop',
    customerName: 'Ananya Krishnan',
    customerLocation: 'Bangalore, Karnataka',
    amount: 8500,
    status: 'delivered',
    platform: 'Amazon',
    createdAt: '2024-03-18T10:30:00Z',
  },
  {
    id: 'ORD002',
    productId: '2',
    productTitle: 'Blue Pottery Decorative Vase',
    productImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=80&h=80&fit=crop',
    customerName: 'Sarah Johnson',
    customerLocation: 'London, UK',
    amount: 1200,
    status: 'shipped',
    platform: 'Etsy',
    createdAt: '2024-03-19T14:20:00Z',
  },
  {
    id: 'ORD003',
    productId: '4',
    productTitle: 'Hand-Block Printed Cotton Dupatta',
    productImage: 'https://images.unsplash.com/photo-1631445851533-5e2cf3ba3db7?w=80&h=80&fit=crop',
    customerName: 'Meera Patel',
    customerLocation: 'Ahmedabad, Gujarat',
    amount: 950,
    status: 'processing',
    platform: 'Meesho',
    createdAt: '2024-03-20T09:15:00Z',
  },
  {
    id: 'ORD004',
    productId: '6',
    productTitle: 'Madhubani Painting',
    productImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=80&h=80&fit=crop',
    customerName: 'Rahul Gupta',
    customerLocation: 'Mumbai, Maharashtra',
    amount: 4200,
    status: 'pending',
    platform: 'Amazon',
    createdAt: '2024-03-21T16:45:00Z',
  },
];

export const mockPricingInsight: PricingInsight = {
  recommendedPrice: 8500,
  minPrice: 5500,
  maxPrice: 14000,
  averagePrice: 8200,
  demandScore: 78,
  seasonality: 'High demand during festive season (Oct–Dec). Prices peak by 30% around Diwali and wedding season.',
  competitorRanges: [
    { platform: 'Amazon', min: 6000, max: 12000 },
    { platform: 'Etsy', min: 7500, max: 18000 },
    { platform: 'Flipkart', min: 5000, max: 10000 },
    { platform: 'Meesho', min: 4500, max: 8000 },
  ],
  tips: [
    'Handcrafted terracotta vases sell 30% higher during festival seasons.',
    'Adding "GI Tagged" to your title increases visibility by 40%.',
    'Products with 5+ photos get 2.3x more views.',
    'Etsy buyers pay premium for authentic craft stories.',
  ],
  trendDirection: 'up',
  priceHistory: [
    { month: 'Sep', price: 7200 },
    { month: 'Oct', price: 8100 },
    { month: 'Nov', price: 10500 },
    { month: 'Dec', price: 11200 },
    { month: 'Jan', price: 8800 },
    { month: 'Feb', price: 8500 },
  ],
};

export const mockMarketplaces: Marketplace[] = [
  { id: 'amazon', name: 'Amazon', logo: '🛒', color: '#FF9900', commission: 15, enabled: true, listingsCount: 12 },
  { id: 'etsy', name: 'Etsy', logo: '🧶', color: '#F1641E', commission: 6.5, enabled: true, listingsCount: 8 },
  { id: 'flipkart', name: 'Flipkart', logo: '📦', color: '#2874F0', commission: 12, enabled: false, listingsCount: 0 },
  { id: 'meesho', name: 'Meesho', logo: '🏪', color: '#9B2FCE', commission: 0, enabled: true, listingsCount: 6 },
];

export const mockAnalytics: AnalyticsData = {
  salesTrend: [
    { month: 'Oct', sales: 8, revenue: 42000 },
    { month: 'Nov', sales: 14, revenue: 78500 },
    { month: 'Dec', sales: 22, revenue: 125000 },
    { month: 'Jan', sales: 16, revenue: 89000 },
    { month: 'Feb', sales: 18, revenue: 96500 },
    { month: 'Mar', sales: 28, revenue: 152000 },
  ],
  demandTrend: [
    { month: 'Oct', demand: 45, views: 1200 },
    { month: 'Nov', demand: 62, views: 1850 },
    { month: 'Dec', demand: 88, views: 3200 },
    { month: 'Jan', demand: 55, views: 1950 },
    { month: 'Feb', demand: 67, views: 2400 },
    { month: 'Mar', demand: 78, views: 3100 },
  ],
  topProducts: [
    { title: 'Banarasi Silk Saree', sales: 18, revenue: 153000 },
    { title: 'Blue Pottery Vase', sales: 32, revenue: 38400 },
    { title: 'Madhubani Painting', sales: 15, revenue: 63000 },
    { title: 'Block Print Dupatta', sales: 28, revenue: 26600 },
    { title: 'Dhokra Figurine', sales: 12, revenue: 33600 },
  ],
  customerLocations: [
    { city: 'Mumbai', count: 34 },
    { city: 'Bangalore', count: 28 },
    { city: 'Delhi', count: 22 },
    { city: 'London', count: 18 },
    { city: 'New York', count: 15 },
    { city: 'Dubai', count: 12 },
  ],
  platformBreakdown: [
    { platform: 'Amazon', percentage: 42, revenue: 119490 },
    { platform: 'Etsy', percentage: 33, revenue: 93885 },
    { platform: 'Meesho', percentage: 15, revenue: 42675 },
    { platform: 'Flipkart', percentage: 10, revenue: 28450 },
  ],
};

export const mockActivity: ActivityItem[] = [
  { id: '1', type: 'order', title: 'New Order Received', description: 'Banarasi Silk Saree ordered by Ananya from Bangalore', timestamp: '2024-03-21T16:45:00Z', icon: '🛍️' },
  { id: '2', type: 'view', title: 'Product Trending', description: 'Blue Pottery Vase got 120 views in the last hour', timestamp: '2024-03-21T14:30:00Z', icon: '👁️' },
  { id: '3', type: 'listing', title: 'New Listing Published', description: 'Madhubani Painting published to Amazon & Etsy', timestamp: '2024-03-21T11:20:00Z', icon: '✅' },
  { id: '4', type: 'pricing', title: 'Price Suggestion', description: 'AI suggests raising Dhokra Figurine price by ₹400', timestamp: '2024-03-20T09:00:00Z', icon: '💡' },
  { id: '5', type: 'export', title: 'Marketplace Sync', description: 'All products synced with Amazon catalog', timestamp: '2024-03-19T18:00:00Z', icon: '🔄' },
];

export const mockChatHistory: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Namaste! 🙏 I\'m your AI Commerce Guide. I can help you with pricing, marketing, product naming, and craft storytelling. What would you like help with today?',
    timestamp: '2024-03-21T10:00:00Z',
  },
];

// Voice-to-Listing mock generation
export interface VoiceToListingResult {
  title: string;
  description: string;
  tags: string[];
  category: string;
  materials: string[];
  highlights: string[];
  suggestedPrice: number;
}

export const mockVoiceListingResult: VoiceToListingResult = {
  title: 'Handcrafted Warli Tribal Painting on Handmade Paper',
  description: 'Authentic Warli folk art from Palghar district, Maharashtra. This stunning piece depicts a traditional harvest festival with tribal figures, animals, and geometric patterns hand-painted using natural white pigment on earthy red-ochre handmade paper. A timeless celebration of India\'s living tribal heritage.',
  tags: ['warli', 'folk art', 'tribal painting', 'wall art', 'handmade', 'Maharashtra', 'authentic'],
  category: 'Folk Art & Tribal Crafts',
  materials: ['Handmade Recycled Paper', 'Natural White Pigment (Rice Paste)', 'Bamboo Stick Brush', 'Red Ochre Background'],
  highlights: [
    'Original artwork by certified tribal artisan',
    'GI Tagged craft from Palghar, Maharashtra',
    '100% natural materials, eco-friendly',
    'Certificate of authenticity included',
    'Ready to frame or mount',
  ],
  suggestedPrice: 3500,
};

export const aiChatResponses: Record<string, string> = {
  pricing: 'Based on current market trends, your Banarasi Silk Saree is priced at ₹8,500 which is competitive. During the upcoming wedding season (April–June), I recommend raising it to ₹10,000–₹11,500. Similar products on Etsy sell for $150–$200 (₹12,500–₹16,500). 💰',
  marketing: 'For your handloom products, I suggest: 1) Use "GI Tagged" and "Heritage Craft" badges in titles. 2) Post on Instagram Reels showing the weaving process. 3) Target NRI buyers on Etsy with "Made in India" narrative. 4) List during Diwali season for 40% more visibility. 📣',
  naming: 'Great product names that convert: "Varanasi Heritage Katan Silk Saree — Festival Edition", "Royal Banarasi Pure Silk with Antique Zari". Include the origin, technique, and occasion. Keep it under 80 characters for Amazon listing compliance. ✨',
  story: 'Your product story should include: 1) The origin city and tradition age. 2) How long it took to make. 3) What makes it special (GI tag, technique). 4) Your personal connection. 5) What the buyer gets (uniqueness, cultural value). I can generate a full story for any product! 📖',
};
