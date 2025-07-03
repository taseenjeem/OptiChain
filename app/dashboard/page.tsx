import { DashboardSummery } from "@/components/pages/dashboard-page/DashboardSummery";
import { ReOrderSoon } from "@/components/pages/dashboard-page/ReOrderSoon";
import { SalesOrderSummary } from "@/components/pages/dashboard-page/SalesOrderSummary";
import { StockReportChart } from "@/components/pages/dashboard-page/StockReportChart";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <DashboardSummery />
      <StockReportChart />
      <SalesOrderSummary />
      <ReOrderSoon />
    </div>
  );
}
