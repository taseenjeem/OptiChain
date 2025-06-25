"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, createContext, useContext } from "react";
import { toast } from "sonner";

interface AuthContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  isAuthChecked: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<string | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const isLoginPage = pathname === "/";

    setUser(storedUser);

    if (!storedUser && !isLoginPage) {
      setTimeout(() => {
        toast.error("Access Denied", {
          description: "You must be logged in to access this page.",
          duration: 5000,
        });
      }, 500);
      router.push("/");
    } else if (storedUser && isLoginPage) {
      router.push("/dashboard");
    }

    setIsAuthChecked(true);
  }, [pathname, router]);

  if (!isAuthChecked) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthChecked }}>
      {children}
    </AuthContext.Provider>
  );
}
