"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { SupplierTable } from "@/components/pages/suppliers/SupplierTable";
import UserCard from "@/components/pages/suppliers/UserCard";
import { QuickActions } from "@/components/pages/suppliers/QuickActions";
import { TopSuppliersChart } from "@/components/pages/suppliers/TopSuppliersChart";
import { SuppliersPagination } from "@/components/pages/suppliers/SuppliersPagination";

const colors = ["#511D43", "#901E3E", "#DC2525", "#9BC09C", "#FFE28A"];

export default function SuppliersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [topSuppliersData, setTopSuppliersData] = useState<
    { name: string; value: number; color: string }[]
  >([]);

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
        {/* Supplier Table & Header */}
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
            <SupplierTable
              orders={orders}
              loading={loading}
              refetch={fetchOrders}
            />
          </CardContent>
        </Card>

        {/* Sidebar: UserCard, Actions, Chart */}
        <div className="flex flex-col gap-8">
          <UserCard />
          <QuickActions />
          <Card>
            <CardHeader>
              <CardTitle>Top Suppliers</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <TopSuppliersChart data={topSuppliersData} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pagination */}
      <SuppliersPagination />
    </div>
  );
}
