import { DashboardSummery } from "@/components/ui/DashboardSummery";
import { ReOrderSoon } from "@/components/ui/ReOrderSoon";
import { SalesOrderSummary } from "@/components/ui/SalesOrderSummary";
import { StockReportChart } from "@/components/ui/StockReportChart";

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
