import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const weeklySalesData = Array.from({ length: 7 * 8 }, (_, i) => {
  const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i % 7];
  const hour = Math.floor(i / 7) + 9;
  return {
    day,
    hour: `${String(hour).padStart(2, "0")}:00`,
    value: Math.floor(Math.random() * 5000),
  };
});

const getHeatmapColor = (value: number) => {
  if (value > 1000) return "bg-green-600";
  if (value > 500) return "bg-green-400";
  if (value > 0) return "bg-green-200";
  return "bg-slate-100";
};

export default function WeeklySalesHeatmap() {
  return (
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
                className={`h-3 w-3 rounded-sm ${
                  ["bg-green-200", "bg-green-400", "bg-green-600"][i]
                }`}
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
