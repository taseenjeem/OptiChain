"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import credentials from "@/data/credentials.json";

export function LoginForm() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const foundUser = credentials.find(
        (cred) => cred.user_id === userId && cred.password === password
      );
      if (foundUser) {
        toast.success("Login Successful!", {
          description: `Welcome back! Redirecting to your dashboard...`,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({ userId: foundUser.user_id, role: foundUser.role })
        );
        if (foundUser.role === "admin") {
          router.push("/dashboard");
        } else if (foundUser.role === "manager") {
          router.push("/supplies");
        }
      } else {
        toast.error("Invalid Credentials", {
          description: "Please check your ID and Password and try again.",
        });
      }
      setUserId("");
      setPassword("");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="id">ID</Label>
              <Input
                id="id"
                placeholder="Enter your ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-neutral-800 text-white hover:bg-neutral-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-sm">
          <Link
            href="#"
            className="text-neutral-600 underline-offset-4 hover:text-neutral-800 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
