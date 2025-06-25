"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const isLoginPage = pathname === "/";

    if (!user && !isLoginPage) {
      setTimeout(() => {
        toast.error("Access Denied", {
          description: "You must be logged in to access this page.",
          duration: 5000,
        });
      }, 500);
      router.push("/");
    } else if (user && isLoginPage) {
      router.push("/dashboard");
    }

    setIsAuthChecked(true);
  }, [pathname, router]);

  if (!isAuthChecked) {
    return null;
  }

  return <>{children}</>;
}
