import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './hooks/useLanguage';
import { AuthProvider } from './hooks/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPageNew from './pages/LandingPageNew';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MarketplacePage from './pages/MarketplacePage';
import ProductDetailPage from './pages/ProductDetailPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import VoiceListing from './pages/dashboard/VoiceListing';
import ProductManagement from './pages/dashboard/ProductManagement';
import PricingInsights from './pages/dashboard/PricingInsights';
import MarketplaceExport from './pages/dashboard/MarketplaceExport';
import ProductShowcase from './pages/dashboard/ProductShowcase';
import AICommerceGuide from './pages/dashboard/AICommerceGuide';
import AnalyticsDashboard from './pages/dashboard/AnalyticsDashboard';
import OrdersPage from './pages/dashboard/OrdersPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import SettingsPage from './pages/dashboard/SettingsPage';

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPageNew />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/marketplace/:id" element={<ProductDetailPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardHome />} />
              <Route path="voice" element={<VoiceListing />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="pricing" element={<PricingInsights />} />
              <Route path="marketplace" element={<MarketplaceExport />} />
              <Route path="showcase" element={<ProductShowcase />} />
              <Route path="guide" element={<AICommerceGuide />} />
              <Route path="analytics" element={<AnalyticsDashboard />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}
