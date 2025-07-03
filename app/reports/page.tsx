"use client";
import DownloadableReports from "@/components/pages/reports-page/DownloadableReports";
import SalesSummaryCard from "@/components/pages/reports-page/SalesSummaryCard";
import SupplierPerformanceReport from "@/components/pages/reports-page/SupplierPerformanceReport";
import UserCard from "@/components/pages/reports-page/UserCard";
import WeeklySalesHeatmap from "@/components/pages/reports-page/WeeklySalesHeatmap";

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-8 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <SalesSummaryCard />
        <UserCard />
      </div>
      <WeeklySalesHeatmap />
      <SupplierPerformanceReport />
      <DownloadableReports />
    </div>
  );
}
