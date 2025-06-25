import { DashboardSummery } from "@/components/ui/DashboardSummery";
import { SalesOrderSummary } from "@/components/ui/SalesOrderSummary";
import { StockReportChart } from "@/components/ui/StockReportChart";

export default function DashboardPage() {
  return (
    <>
      <DashboardSummery />
      <StockReportChart />
      <SalesOrderSummary />
    </>
  );
}
