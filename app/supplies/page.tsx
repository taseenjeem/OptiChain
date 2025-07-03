"use client";

import { useEffect, useState } from "react";
import { Pie, PieChart, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChartContainer } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MoreHorizontal, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { OrderDetailsModal } from "@/components/ui/OrderDetailsModal";

const quickActions = [
  { label: "Create Order", href: "/create-order", shortcut: ["ctrl", "n"] },
  { label: "Add Product", href: "/add-product", shortcut: ["ctrl", "p"] },
  { label: "Add Supplier", href: "/add-supplier", shortcut: ["ctrl", "k"] },
  { label: "Export", href: "#", shortcut: ["ctrl", "s"] },
];

export default function SuppliersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [topSuppliersData, setTopSuppliersData] = useState<
    { name: string; value: number; color: string }[]
  >([]);
  console.log(topSuppliersData);
  const colors = ["#511D43", "#901E3E", "#DC2525", "#9BC09C", "#FFE28A"];

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      const pendingOrders = data.filter(
        (order: any) => order.status === "pending"
      );
      setOrders(pendingOrders);

      const counts: Record<string, number> = {};
      for (const order of data) {
        const name = order.supplier_company;
        counts[name] = (counts[name] || 0) + 1;
      }

      const total = Object.values(counts).reduce((a, b) => a + b, 0);

      const top = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count], idx) => ({
          name,
          value: Math.round((count / total) * 100),
          color: colors[idx % colors.length],
        }));

      setTopSuppliersData(top);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        <Card className="w-full lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Suppliers</CardTitle>
              <div className="flex w-full sm:w-auto sm:gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-9" />
                </div>
                <Button className="hidden sm:flex bg-[#6E9E23] hover:bg-[#5a831c]">
                  Edit Suppliers
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-x-auto">
              {loading && (
                <div className="absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                  <Loader2
                    className="h-10 w-10 animate-spin"
                    aria-label="Loading"
                  />
                  <p className="mt-4 text-lg font-medium text-foreground">
                    Fetching Data...
                  </p>
                </div>
              )}

              <Table className={loading ? "opacity-50" : ""}>
                <TableHeader>
                  <TableRow className="bg-slate-100 hover:bg-slate-100">
                    <TableHead className="font-semibold text-slate-700">
                      Supplier Name
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Email
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Contact No.
                    </TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {orders.length > 0 ? (
                    orders.map((order, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">
                          {order.supplier_company}
                        </TableCell>
                        <TableCell>{order.email}</TableCell>
                        <TableCell>{order.phone}</TableCell>
                        <TableCell className="text-right">
                          <OrderDetailsModal
                            order={order}
                            onStatusUpdate={fetchOrders}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src="https://randomuser.me/api/portraits/men/18.jpg"
                  alt="User"
                />
                <AvatarFallback>U</AvatarFallback>
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
                <Button variant="ghost" size="icon">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {quickActions.map((action) => (
                <div
                  key={action.label}
                  className="flex items-center justify-between"
                >
                  <Link
                    href={action.href}
                    className="font-medium text-slate-600 hover:text-primary"
                  >
                    {action.label}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {action.shortcut.join(" + ")}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Suppliers</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <ChartContainer
                config={{}}
                className="mx-auto aspect-square h-48"
              >
                <PieChart>
                  <Pie
                    data={topSuppliersData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={40}
                    outerRadius={80}
                    strokeWidth={2}
                  >
                    {topSuppliersData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        className="stroke-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="-mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-slate-600">
                {topSuppliersData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span
                      className="block h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                    <span className="font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                className="bg-[#6E9E23] text-white hover:bg-[#5a831c] hover:text-white"
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
