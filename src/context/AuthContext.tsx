"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store";
import { useWishlistStore } from "@/lib/wishlistStore";

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    profile: any | null; // Profile from 'profiles' table
    signOut: () => Promise<void>;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    profile: null,
    signOut: async () => { },
    isAdmin: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        let mounted = true;
        let subscription: { unsubscribe: () => void } | null = null;

        const initAuth = async () => {
            try {
                const { data: { session: initialSession } } = await supabase.auth.getSession();

                if (!mounted) return;

                setSession(initialSession);
                setUser(initialSession?.user ?? null);

                if (initialSession?.user) {
                    useCartStore.getState().setUserId(initialSession.user.id);
                    useCartStore.getState().syncCart();

                    useWishlistStore.getState().setUserId(initialSession.user.id);
                    useWishlistStore.getState().syncWishlist();

                    await fetchProfile(initialSession.user.id);
                } else {
                    useCartStore.getState().setUserId(null);
                    useWishlistStore.getState().setUserId(null);
                    setLoading(false);
                }

                const { data: { subscription: sub } } = supabase.auth.onAuthStateChange(
                    async (event, session) => {
                        if (!mounted) return;

                        setSession(session);
                        setUser(session?.user ?? null);

                        if (session?.user) {
                            useCartStore.getState().setUserId(session.user.id);
                            useCartStore.getState().syncCart();

                            useWishlistStore.getState().setUserId(session.user.id);
                            useWishlistStore.getState().syncWishlist();

                            await fetchProfile(session.user.id);
                        } else {
                            useCartStore.getState().setUserId(null);
                            useWishlistStore.getState().setUserId(null);
                            setProfile(null);
                            setLoading(false);
                        }

                        if (event === "SIGNED_OUT") {
                            useCartStore.getState().clearCart();
                            useWishlistStore.getState().clearWishlist();
                            setProfile(null);
                            router.push("/");
                            router.refresh();
                        }
                    }
                );
                subscription = sub;
            } catch (error) {
                console.error("Error in auth init:", error);
                if (mounted) setLoading(false);
            }
        };

        void initAuth();

        return () => {
            mounted = false;
            subscription?.unsubscribe();
        };
    }, [router]);

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single();

            if (error) {
                if (error.code === "PGRST116") {
                    // Try to create profile
                    const { data: newProfile, error: createError } = await supabase
                        .from("profiles")
                        .insert([{
                            id: userId,
                            full_name: "User", // Default name
                            role: "user"
                        }])
                        .select()
                        .single();

                    if (createError) {
                        console.error("Error creating profile:", createError);
                    } else {
                        setProfile(newProfile);
                    }
                } else {
                    console.error("Error fetching profile:", error);
                }
            } else {
                setProfile(data);
            }
        } catch (error) {
            console.error("Error in fetchProfile:", error);
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    const isAdmin = profile?.role === "admin";

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                loading,
                profile,
                signOut,
                isAdmin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
