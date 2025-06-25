"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", stockIn: 11000, stockOut: 4500 },
  { month: "Feb", stockIn: 9000, stockOut: 4000 },
  { month: "Mar", stockIn: 9500, stockOut: 6000 },
  { month: "Apr", stockIn: 11500, stockOut: 6000 },
  { month: "May", stockIn: 7500, stockOut: 2000 },
  { month: "Jun", stockIn: 7500, stockOut: 4000 },
  { month: "Jul", stockIn: 10000, stockOut: 4500 },
  { month: "Aug", stockIn: 12500, stockOut: 6500 },
  { month: "Sep", stockIn: 12500, stockOut: 4000 },
  { month: "Oct", stockIn: 10000, stockOut: 2000 },
  { month: "Nov", stockIn: 10500, stockOut: 4500 },
  { month: "Dec", stockIn: 9000, stockOut: 2000 },
];

const chartConfig = {
  stockIn: {
    label: "Stock In",
    color: "#6FAB23",
  },
  stockOut: {
    label: "Stock Out",
    color: "#14AE5C",
  },
} satisfies ChartConfig;

export function StockReportChart() {
  return (
    <Card className="w-full rounded-none">
      <CardHeader>
        <CardTitle>Stock Report</CardTitle>
        <CardDescription>
          <div className="flex items-center justify-end gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-[#6FAB23]" />
              <span>Stock In</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-[#14AE5C]" />
              <span>Stock Out</span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // --- THIS IS THE FIX ---
              tickFormatter={(value) => String(value).slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              domain={[0, 25000]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey="stockIn"
              fill="var(--color-stockIn)"
              radius={[4, 4, 0, 0]}
              stackId="a"
            />
            <Bar
              dataKey="stockOut"
              fill="var(--color-stockOut)"
              radius={[4, 4, 0, 0]}
              stackId="a"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
