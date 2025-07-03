"use client";
import { Pie, PieChart, Cell } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

export function TopSuppliersChart({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) {
  return (
    <>
      <ChartContainer config={{}} className="mx-auto aspect-square h-48">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={80}
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                className="stroke-white"
              />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="-mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-slate-600">
        {data.map((item) => (
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
    </>
  );
}
