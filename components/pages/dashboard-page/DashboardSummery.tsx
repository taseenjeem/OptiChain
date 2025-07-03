"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  TrendingUp,
  Calendar,
  DollarSign,
  ShoppingBag,
  PlusCircle,
  FileText,
  Upload,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

const quickActions = [
  {
    label: "Create Order",
    icon: <PlusCircle />,
    href: "/create-order",
  },
  {
    label: "Add Supplier",
    icon: <FileText />,
    href: "/add-supplier",
  },
  {
    label: "Add Product",
    icon: <ShoppingBag />,
    href: "/add-product",
  },
  {
    label: "Export",
    icon: <Upload />,
    href: "#",
  },
];

export function DashboardSummery() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<{
    totalPrice: number;
    totalCount: number;
  } | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/products/summary");
        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error("Failed to fetch product summary", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="w-full my-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex flex-col gap-3 text-muted-foreground h-56 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
                Fetching Summary. Please wait...
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Today's Sale */}
                <Card>
                  <CardContent className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        143.3k
                      </p>
                      <p className="text-sm text-slate-500">Today's Sale</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Yearly Total Sales */}
                <Card>
                  <CardContent className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                      <Calendar className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        $250,423
                      </p>
                      <p className="text-sm text-slate-500">
                        Yearly Total Sales
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Total Product Price */}
                <Card>
                  <CardContent className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                      <DollarSign className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        ${summary?.totalPrice.toLocaleString() || 0}
                      </p>
                      <p className="text-sm text-slate-500">
                        Total Product Price
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Products */}
                <Card>
                  <CardContent className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
                      <ShoppingBag className="h-5 w-5 text-pink-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {summary?.totalCount || 0}
                      </p>
                      <p className="text-sm text-slate-500">Products</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Sidebar Card - Admin Info & Quick Actions */}
        <Card className="space-y-8">
          <CardHeader className="flex items-center justify-between border-b border-slate-200 pb-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src="https://randomuser.me/api/portraits/men/18.jpg"
                  alt="Asil Mizan"
                />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-slate-800">Asil Mizan</p>
                <p className="text-sm text-slate-500">Admin</p>
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
            <h2 className="text-lg font-semibold text-slate-800">
              Quick Actions
            </h2>
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
      </div>
    </div>
  );
}
