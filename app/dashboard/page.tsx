import { DashboardSummery } from "@/components/ui/DashboardSummery";
import { StockReportChart } from "@/components/ui/StockReportChart";

export default function DashboardPage() {
  return (
    <>
      <DashboardSummery />
      <StockReportChart />
    </>
  );
}
