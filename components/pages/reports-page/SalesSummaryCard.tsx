import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import HeaderSection from "./HeaderSection";

const topSuppliersData = [
  { name: "Apple", value: 61, color: "#0088FE" },
  { name: "Samsung", value: 15, color: "#FF449A" },
  { name: "Asus", value: 13, color: "#00C49F" },
  { name: "Xiaomi", value: 8, color: "#A344FF" },
];

export default function SalesSummaryCard() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <HeaderSection />
        <CardTitle>Sales Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 items-center gap-4">
          <ChartContainer config={{}} className="mx-auto aspect-square h-40">
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
  );
}
