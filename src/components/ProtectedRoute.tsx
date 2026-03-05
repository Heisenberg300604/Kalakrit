import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[--warm-white]">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 size={32} className="animate-spin text-[--terracotta]" />
                    <p className="text-sm text-[--text-secondary]">Loading your workspace...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <>{children}</>;
}
