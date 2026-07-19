"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { User } from "@/types/auth";
import { getCurrentUser } from "@/services/auth.service";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const currentUser = await getCurrentUser();

      setUser(currentUser);
    } catch {
      localStorage.removeItem("token");

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("token", token);

    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
