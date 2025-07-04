"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Order {
  _id: string;
  createdAt: string;
}

interface HeatmapCellData {
  day: string;
  timeSlot: string;
  value: number;
}

const getHeatmapColor = (value: number): string => {
  if (value > 1000) return "bg-green-600";
  if (value > 500) return "bg-green-400";
  if (value > 0) return "bg-green-200";
  return "bg-slate-100";
};

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TIME_SLOTS = Array.from({ length: 12 }, (_, i) => {
  const startHour = i * 2;
  const endHour = startHour + 1;
  return {
    label: `${String(startHour).padStart(2, "0")}:00 - ${String(
      endHour
    ).padStart(2, "0")}:59`,
    startHour,
  };
});

const START_DATE = new Date("2025-07-01T00:00:00Z");

export default function WeeklySalesHeatmap() {
  const [heatmapData, setHeatmapData] = useState<HeatmapCellData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weekOffset, setWeekOffset] = useState<number>(0); // 0 = current week

  // Calculate the "current" week offset from July 1, 2025
  useEffect(() => {
    const now = new Date();
    const msDiff = now.getTime() - START_DATE.getTime();
    const weeksSinceStart = Math.floor(msDiff / (7 * 24 * 60 * 60 * 1000));
    setWeekOffset(weeksSinceStart);
  }, []);

  const getWeekRange = (offset: number) => {
    const weekStart = new Date(START_DATE);
    weekStart.setUTCDate(weekStart.getUTCDate() + offset * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setUTCDate(weekStart.getUTCDate() + 6);
    return { start: weekStart, end: weekEnd };
  };

  const { start: weekStart, end: weekEnd } = getWeekRange(weekOffset);

  useEffect(() => {
    const fetchAndProcessOrders = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/orders");
        if (!response.ok) throw new Error("Network response was not ok");

        const orders: Order[] = await response.json();
        const counts = new Map<string, number>();

        for (const order of orders) {
          const createdAt = new Date(order.createdAt);

          if (createdAt < weekStart || createdAt > weekEnd) continue;

          const dayIndex = (createdAt.getUTCDay() + 6) % 7;
          const day = DAYS_OF_WEEK[dayIndex];
          const hour = createdAt.getUTCHours();
          const slotStartHour = Math.floor(hour / 2) * 2;
          const key = `${day}-${slotStartHour}`;
          counts.set(key, (counts.get(key) || 0) + 1);
        }

        const processedData: HeatmapCellData[] = [];
        TIME_SLOTS.forEach((slot) => {
          DAYS_OF_WEEK.forEach((day) => {
            const key = `${day}-${slot.startHour}`;
            const value = counts.get(key) || 0;
            processedData.push({ day, timeSlot: slot.label, value });
          });
        });

        setHeatmapData(processedData);
      } catch (error) {
        console.error("Error:", error);
        setHeatmapData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessOrders();
  }, [weekOffset]);

  const formatDateRange = (start: Date, end: Date) => {
    const format = (date: Date) =>
      `${date.toLocaleString("default", { month: "short" })} ${String(
        date.getUTCDate()
      ).padStart(2, "0")}`;
    return `${format(start)} - ${format(end)}, ${end.getUTCFullYear()}`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Weekly Sales</CardTitle>
          <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setWeekOffset((prev) => Math.max(prev - 1, 0))}
              disabled={weekOffset === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span>{formatDateRange(weekStart, weekEnd)}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setWeekOffset((prev) => prev + 1)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-[auto_1fr] gap-x-4 text-[11px]">
          <div className="flex flex-col gap-[9px] pt-6 text-right text-muted-foreground">
            {TIME_SLOTS.map((slot) => (
              <div key={slot.startHour} className="h-6 leading-6">
                {slot.label}
              </div>
            ))}
          </div>
          <div className="grid flex-1 grid-cols-7 gap-1">
            {DAYS_OF_WEEK.map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-muted-foreground pb-1"
              >
                {day}
              </div>
            ))}

            {isLoading ? (
              <div className="col-span-7 text-center py-8">Loading data...</div>
            ) : (
              heatmapData.map((d, i) => (
                <div
                  key={i}
                  title={`${d.value} orders on ${d.day} (${d.timeSlot})`}
                  className={`h-6 rounded-[2px] ${getHeatmapColor(d.value)}`}
                />
              ))
            )}
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
