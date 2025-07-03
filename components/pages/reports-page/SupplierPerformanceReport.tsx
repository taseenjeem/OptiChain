"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const performanceData = [
  { supplier: "Apple", early: 74, onTime: 18, late: 8 },
  { supplier: "Samsung", early: 73, onTime: 13, late: 14 },
  { supplier: "Asus", early: 47, onTime: 18, late: 35 },
  { supplier: "Xiaomi", early: 67, onTime: 12, late: 21 },
  { supplier: "Logitech", early: 62, onTime: 28, late: 10 },
];

export default function SupplierPerformanceReport() {
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
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={performanceData}
              margin={{ left: 10, right: 10 }}
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
          </ResponsiveContainer>
        </div>

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
