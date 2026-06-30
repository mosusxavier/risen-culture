'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, isSupabaseAvailable } from '@/lib/supabase';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{error: string | null}>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<{error: string | null}>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function getAuthErrorMessage(error: unknown) {
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === 'string' && message.trim()) {
      const normalized = message.toLowerCase();
      if (
        normalized.includes('failed to fetch') ||
        normalized.includes('network') ||
        normalized.includes('err_name_not_resolved') ||
        normalized.includes('fetch')
      ) {
        return 'Authentication is currently unavailable. Please try again later.';
      }
      return message;
    }
  }

  return 'Authentication is currently unavailable. Please try again later.';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => undefined;

    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (session) {
          await fetchProfile(session.user.id, session.user.email || '');
        } else {
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    };

    checkUser();

    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: string, session: any) => {
        if (session) {
          await fetchProfile(session.user.id, session.user.email || '');
        } else {
          setUser(null);
          setLoading(false);
        }
      });
      unsubscribe = () => subscription.unsubscribe();
    } catch {
      unsubscribe = () => undefined;
    }

    return () => unsubscribe();
  }, []);

  const fetchProfile = async (id: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('name, is_admin')
        .eq('id', id)
        .single();
        
      if (data) {
        setUser({ 
          id, 
          email, 
          name: data.name || 'User', 
          avatar: data.name ? data.name[0].toUpperCase() : 'U',
          isAdmin: data.is_admin || false
        });
      } else {
        setUser({ id, email, name: 'User', avatar: 'U', isAdmin: false });
      }
    } catch (e) {
      console.error(e);
      setUser({ id, email, name: 'User', avatar: 'U' });
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    if (!(await isSupabaseAvailable())) {
      return { error: 'Authentication and account features are currently unavailable. Please try again later.' };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error ? getAuthErrorMessage(error) : null };
    } catch (error) {
      return { error: getAuthErrorMessage(error) };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    if (!(await isSupabaseAvailable())) {
      return { error: 'Authentication and account features are currently unavailable. Please try again later.' };
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      });
      return { error: error ? getAuthErrorMessage(error) : null };
    } catch (error) {
      return { error: getAuthErrorMessage(error) };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore logout failures so the UI can remain responsive.
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
