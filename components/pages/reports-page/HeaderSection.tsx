import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function HeaderSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-5">
      <h3 className="text-3xl font-bold">Reports</h3>
      <Button className="w-full lg:w-auto">
        <Printer /> Print Reports
      </Button>
    </div>
  );
}
