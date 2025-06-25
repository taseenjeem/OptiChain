"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Printer,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  FileText,
  Upload,
  ShoppingBag,
} from "lucide-react";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

// --- Mock Data ---

// Updated colors and data for the Pie Chart
const topSuppliersData = [
  { name: "Apple", value: 61, color: "#0088FE" }, // Blue
  { name: "Samsung", value: 15, color: "#FF449A" }, // Pink/Magenta
  { name: "Asus", value: 13, color: "#00C49F" }, // Green
  { name: "Xiaomi", value: 8, color: "#A344FF" }, // Purple
];

// Re-added icons for Quick Actions
const quickActions = [
  { label: "Create Order", icon: PlusCircle },
  { label: "Add Supplier", icon: FileText },
  { label: "Add Product", icon: ShoppingBag },
  { label: "Export", icon: Upload },
];

const weeklySalesData = Array.from({ length: 7 * 8 }, (_, i) => {
  const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i % 7];
  const hour = Math.floor(i / 7) + 9;
  return {
    day,
    hour: `${String(hour).padStart(2, "0")}:00`,
    value: Math.floor(Math.random() * 5000),
  };
});

const performanceData = [
  { supplier: "Apple", early: 74, onTime: 18, late: 8 },
  { supplier: "Samsung", early: 73, onTime: 13, late: 14 },
  { supplier: "Asus", early: 47, onTime: 18, late: 35 },
  { supplier: "Xiaomi", early: 67, onTime: 12, late: 21 },
  { supplier: "Logitech", early: 62, onTime: 28, late: 10 },
];

// --- Main Component ---

export default function ReportsPage() {
  const getHeatmapColor = (value: number) => {
    if (value > 1000) return "bg-green-600";
    if (value > 500) return "bg-green-400";
    if (value > 0) return "bg-green-200";
    return "bg-slate-100";
  };

  return (
    <div className="flex min-h-screen w-full flex-col gap-8 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto px-4">
      {/* === Top Header === */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-800">Reports</h1>
        <div className="flex items-center gap-4">
          <Button className="bg-[#6E9E23] hover:bg-[#5a831c]">
            <Printer className="mr-2 h-4 w-4" /> Print Reports
          </Button>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?u=asilmizan" />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-slate-800">Asil Mizan</p>
              <p className="text-sm text-slate-500">Admin</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* === First Row: Pie Chart & Quick Actions (UPDATED) === */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 items-center gap-4">
              <ChartContainer
                config={{}}
                className="mx-auto aspect-square h-40"
              >
                <PieChart>
                  <Pie
                    data={topSuppliersData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    strokeWidth={2}
                  >
                    {topSuppliersData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {topSuppliersData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span
                      className="block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-600">{item.name}</span>
                    <span className="font-semibold text-slate-800">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="ghost"
                className="justify-start font-medium text-slate-600 hover:text-slate-900"
              >
                <action.icon className="mr-3 h-4 w-4 text-slate-500" />
                {action.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* === Second Row: Weekly Sales Heatmap === */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Weekly Sales</CardTitle>
            <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span>Feb 19-25</span>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 text-xs">
            <div className="flex flex-col gap-[9px] text-right text-muted-foreground">
              {Array.from({ length: 8 }, (_, i) => i + 9).map((hour) => (
                <div key={hour}>{`${String(hour).padStart(2, "0")}:00`}</div>
              ))}
            </div>
            <div className="grid flex-1 grid-cols-7 gap-1">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div
                  key={day}
                  className="text-center font-semibold text-muted-foreground"
                >
                  {day}
                </div>
              ))}
              {weeklySalesData.map((d, i) => (
                <div
                  key={i}
                  className={`h-6 rounded-[2px] ${getHeatmapColor(d.value)}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            {["0-500", "501-1,000", "1,001-5,000"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-sm bg-green-${(i + 1) * 2}00`}
                />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* === Third Row: Supplier Performance Report === */}
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
          <ChartContainer config={{}} className="h-[250px] w-full">
            <BarChart
              layout="vertical"
              data={performanceData}
              margin={{ left: 10, right: 40 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="supplier"
                type="category"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                width={80}
              />
              <Bar
                dataKey="early"
                stackId="a"
                fill="#10B981"
                radius={[4, 0, 0, 4]}
              >
                <LabelList
                  dataKey="early"
                  position="center"
                  fill="#fff"
                  fontSize={10}
                  formatter={(value) =>
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
                  formatter={(value) =>
                    typeof value === "number" && value > 0 ? `${value}%` : ""
                  }
                />
              </Bar>
              <Bar
                dataKey="late"
                stackId="a"
                fill="#EF4444"
                radius={[0, 4, 4, 0]}
              >
                <LabelList
                  dataKey="late"
                  position="center"
                  fill="#fff"
                  fontSize={10}
                  formatter={(value) =>
                    typeof value === "number" && value > 0 ? `${value}%` : ""
                  }
                />
              </Bar>
            </BarChart>
          </ChartContainer>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
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

      {/* === Fourth Row: Downloadable Reports === */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Reports for Last Month</CardTitle>
            <CardDescription>From 01 Jul - 31 Jul</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline">Download PDF</Button>
            <Button variant="ghost">View</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Defect Rate Report</CardTitle>
            <CardDescription>Product Defects & Supplier Origin</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline">Download PDF</Button>
            <Button variant="ghost">View</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
