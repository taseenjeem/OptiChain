import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DownloadableReports() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Reports for Last Month</CardTitle>
          <CardDescription>From 01 Jul - 31 Jul</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline">Download PDF</Button>
          <Button variant="ghost">View</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Defect Rate Report</CardTitle>
          <CardDescription>Product Defects & Supplier Origin</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline">Download PDF</Button>
          <Button variant="ghost">View</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
