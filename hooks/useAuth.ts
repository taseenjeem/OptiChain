"use client";

import { AuthContext } from "@/app/providers/AuthProvider";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Something went wrong with auth provider");
  }
  return context;
}
