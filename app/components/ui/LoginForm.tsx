import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="id">ID</Label>
              <Input id="id" placeholder="Enter your ID" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <Button className="w-full bg-neutral-800 text-white hover:bg-neutral-700">
              Sign In
            </Button>
          </div>
        </form>
        <div className="mt-4 text-start text-sm">
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
