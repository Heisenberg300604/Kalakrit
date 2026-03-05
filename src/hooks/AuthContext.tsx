import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import supabase from '../utils/supabase';

interface AuthState {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: string | null }>;
    signUp: (
        email: string,
        password: string,
        profile?: {
            name?: string;
            phone?: string;
            craft?: string;
            location?: string;
            language?: string;
        }
    ) => Promise<{ error: string | null }>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    async function signIn(email: string, password: string) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error: error?.message ?? null };
    }

    async function signUp(
        email: string,
        password: string,
        profile?: {
            name?: string;
            phone?: string;
            craft?: string;
            location?: string;
            language?: string;
        }
    ) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: profile?.name ?? null,
                    phone: profile?.phone ?? null,
                    craft: profile?.craft ?? null,
                    location: profile?.location ?? null,
                    language: profile?.language ?? 'en',
                },
            },
        });

        if (error) {
            return { error: error.message ?? null };
        }

        const userId = data.user?.id;
        const hasSession = Boolean(data.session);

        if (userId && profile && hasSession) {
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: userId,
                    full_name: profile.name,
                    phone: profile.phone,
                    craft: profile.craft,
                    location: profile.location,
                    language: profile.language,
                }, { onConflict: 'id' });

            if (profileError) {
                return { error: profileError.message ?? null };
            }
        }

        return { error: null };
    }

    async function signOut() {
        await supabase.auth.signOut();
    }

    return (
        <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
