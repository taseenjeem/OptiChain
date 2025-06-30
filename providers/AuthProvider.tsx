"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, createContext, useContext } from "react";
import { toast } from "sonner";

interface IUser {
  user_id: string;
  role: string;
}

interface AuthContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isAuthChecked: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const isLoginPage = pathname === "/";

    if (!storedUser) {
      setUser(null);
      if (!isLoginPage) {
        setTimeout(() => {
          toast.error("Access Denied", {
            description: "You must be logged in to access this page.",
            duration: 5000,
          });
        }, 500);
        router.push("/");
      }
    } else {
      try {
        const parsedUser: IUser = JSON.parse(storedUser);
        setUser(parsedUser);
        if (isLoginPage) {
          if (parsedUser.role === "admin") {
            router.push("/dashboard");
          } else if (parsedUser.role === "manager") {
            router.push("/supplies");
          }
        }
      } catch (error) {
        console.error("Invalid user data in localStorage", error);
        setUser(null);
        localStorage.removeItem("user");
        router.push("/");
      }
    }

    setIsAuthChecked(true);
  }, [pathname, router]);

  if (!isAuthChecked) return null;

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthChecked }}>
      {children}
    </AuthContext.Provider>
  );
}
