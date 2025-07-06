"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
} from "recharts";

interface Order {
  _id: string;
  supplier_company: string;
  status: "pending" | "arrived";
  createdAt: string;
  updatedAt: string;
}

interface PerformanceData {
  supplier: string;
  early: number;
  onTime: number;
  late: number;
}

export default function SupplierPerformanceReport() {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiUrl = `${window.location.origin}/api/orders`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data from the server.");
        }
        const orders: Order[] = await response.json();

        if (orders.length === 0) {
          setPerformanceData([]);
          setIsLoading(false);
          return;
        }

        const supplierOrderCounts = new Map<string, number>();
        orders.forEach((order) => {
          supplierOrderCounts.set(
            order.supplier_company,
            (supplierOrderCounts.get(order.supplier_company) || 0) + 1
          );
        });

        const topSuppliers = Array.from(supplierOrderCounts.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map((entry) => entry[0]);

        const processedData = topSuppliers.map((supplier) => {
          const supplierOrders = orders.filter(
            (order) => order.supplier_company === supplier
          );
          let earlyCount = 0;
          let onTimeCount = 0;
          let lateCount = 0;
          const now = new Date();

          supplierOrders.forEach((order) => {
            const createdAt = new Date(order.createdAt);
            const updatedAt = new Date(order.updatedAt);

            const diffHours =
              (updatedAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
            const pendingHours =
              (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

            if (order.status === "arrived") {
              if (diffHours <= 12) earlyCount++;
              else if (diffHours <= 24) onTimeCount++;
              else lateCount++;
            } else if (order.status === "pending" && pendingHours > 24) {
              lateCount++;
            }
          });

          const totalAnalyzed = earlyCount + onTimeCount + lateCount;

          if (totalAnalyzed === 0) {
            return { supplier, early: 0, onTime: 0, late: 0 };
          }

          return {
            supplier,
            early: Math.round((earlyCount / totalAnalyzed) * 100),
            onTime: Math.round((onTimeCount / totalAnalyzed) * 100),
            late: Math.round((lateCount / totalAnalyzed) * 100),
          };
        });

        setPerformanceData(processedData);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessData();
  }, []);

  const renderContent = () => {
    if (!isClient || isLoading) {
      return (
        <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">
          Loading Report...
        </div>
      );
    }
    if (error) {
      return (
        <div className="h-[300px] w-full flex items-center justify-center text-red-500">
          {error}
        </div>
      );
    }
    if (performanceData.length === 0) {
      return (
        <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">
          No supplier data available.
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={performanceData}
          margin={{ left: 10, right: 10 }}
        >
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis
            dataKey="supplier"
            type="category"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            width={80}
            interval={0}
          />
          <Bar dataKey="early" stackId="a" fill="#10B981" radius={[4, 0, 0, 4]}>
            <LabelList
              dataKey="early"
              position="center"
              fill="#fff"
              fontSize={10}
              formatter={(value: any) =>
                typeof value === "number" && value > 0 ? `${value}%` : ""
              }
            />
          </Bar>
          <Bar dataKey="onTime" stackId="a" fill="#F59E0B">
            <LabelList
              dataKey="onTime"
              position="center"
              fill="#fff"
              fontSize={10}
              formatter={(value: any) =>
                typeof value === "number" && value > 0 ? `${value}%` : ""
              }
            />
          </Bar>
          <Bar dataKey="late" stackId="a" fill="#EF4444" radius={[0, 4, 4, 0]}>
            <LabelList
              dataKey="late"
              position="center"
              fill="#fff"
              fontSize={10}
              formatter={(value: any) =>
                typeof value === "number" && value > 0 ? `${value}%` : ""
              }
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Supplier Performance Report{" "}
          <span className="text-sm font-normal text-muted-foreground">
            (Top 5 Suppliers)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">{renderContent()}</div>
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-[#10B981]" />
            <span>Early</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-[#F59E0B]" />
            <span>On Time</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-[#EF4444]" />
            <span>Late</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
