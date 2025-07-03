"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  PlusCircle,
  FileText,
  Upload,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const quickActions = [
  { label: "Create Order", icon: <PlusCircle />, href: "/create-order" },
  { label: "Add Supplier", icon: <FileText />, href: "/add-supplier" },
  { label: "Add Product", icon: <ShoppingBag />, href: "/add-product" },
  { label: "Export", icon: <Upload />, href: "#" },
];

export default function UserCard() {
  const { user } = useAuth();
  return (
    <Card className="space-y-8">
      <CardHeader className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://randomuser.me/api/portraits/men/18.jpg" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-slate-800">Asil Mizan</p>
            <p className="text-sm text-slate-500">
              {user?.role === "admin" ? "Admin" : "Manager"}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <MoreHorizontal className="h-5 w-5 text-slate-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <h2 className="text-lg font-semibold text-slate-800">Quick Actions</h2>
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto justify-start p-0 font-medium text-slate-600 hover:bg-transparent hover:text-primary"
            >
              <Link href={action.href} className="flex items-center gap-2">
                {action.icon}
                {action.label}
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
