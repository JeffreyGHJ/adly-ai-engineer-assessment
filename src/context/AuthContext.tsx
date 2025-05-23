import React, { createContext, useContext, useState, useEffect } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export interface User {
  id: string;
  name: string;
  email: string;
  plan: "free" | "basic" | "premium" | "enterprise";
  credits: number;
  max_credits: number;
  humanizer_count: number;
  ai_detector_count: number;
  plagiarism_count: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  deleteUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const createUserProfile = (supabaseUser: SupabaseUser): User => ({
  id: supabaseUser.id,
  name: supabaseUser.email?.split("@")[0] || "User",
  email: supabaseUser.email || "",
  plan: "free",
  credits: 50,
  max_credits: 100,
  humanizer_count: 0,
  ai_detector_count: 0,
  plagiarism_count: 0,
});

const fetchUserProfile = async (id: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
  return data as User;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setUserData = async (session: any) => {
    const profile = await fetchUserProfile(session.user.id);

    if (profile) {
      setUser({
        id: session.user.id,
        name: session.user.email?.split("@")[0] || "User",
        email: session.user.email || "",
        plan: profile.plan,
        credits: profile.credits,
        max_credits: profile.max_credits,
        humanizer_count: profile.humanizer_count,
        ai_detector_count: profile.ai_detector_count,
        plagiarism_count: profile.plagiarism_count,
      });
    } else {
      setUser(createUserProfile(session.user));
    }
  };

  useEffect(() => {
    // Check active session
    const initializeAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        if (profile) {
          setUser(profile);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUserData(session);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const profile = await fetchUserProfile(data.user.id);
        if (profile) {
          setUser(profile);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        const profile = await fetchUserProfile(data.user.id);
        if (profile) {
          setUser(profile);
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (user) {
      // Update in Supabase
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating user:", error);
        return;
      }
      // Update local state
      setUser({ ...user, ...updates });
    }
  };

  // SUPABASE DOES NOT MAKE THIS EASY :(
  const deleteUser = async () => {
    if (!user) return;
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }
    try {
      // Delete from profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Delete from Auth
      const { error: authError } = await supabase.auth.admin.deleteUser(
        user.id
      );
      if (authError) throw authError;

      setUser(null);
    } catch (error) {
      console.error("Delete user error:", error);
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
    deleteUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
