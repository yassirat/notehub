import type { User } from '@supabase/supabase-js';
import {
  createContext,
  createEffect,
  createSignal,
  useContext,
} from 'solid-js';
import { supabase } from '../lib/supabase-client';

interface Register {
  email: string;
  password: string;
}

interface AuthContextType {
  user: () => User | null;
  signUp: (credentials: Register) => Promise<any>;
  signIn: (credentials: Register) => Promise<any>;
  signOut: () => Promise<void>;
  loading: () => boolean;
}

const SignContext = createContext<AuthContextType | undefined>(undefined);

export const SignContextProvider = (props: any) => {
  const [user, setUser] = createSignal<User | null>(null);
  const [loading, setLoading] = createSignal(true);

  // Check auth state on mount
  createEffect(() => {
    supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
  });

  // Sign Up
  const signUp = async ({ email, password }: Register) => {
    const response = await supabase.auth.signUp({ email, password });

    if (response.error) {
      console.error('Sign up error:', response.error.message);
    }
    return response;
  };

  // Sign In
  const signIn = async ({ email, password }: Register) => {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (response.error) {
      console.error('Sign in error:', response.error.message);
    }
    return response;
  };

  // Sign Out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      setUser(null);
      if (error) {
        console.error('Sign out error:', error.message);
      }
    } catch (e) {
      console.error('An unexpected error occurred during sign out:', e);
    }
  };

  return (
    <SignContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {props.children}
    </SignContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(SignContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
