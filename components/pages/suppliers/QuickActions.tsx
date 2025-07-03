import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const quickActions = [
  { label: "Create Order", href: "/create-order", shortcut: ["ctrl", "n"] },
  { label: "Add Product", href: "/add-product", shortcut: ["ctrl", "p"] },
  { label: "Add Supplier", href: "/add-supplier", shortcut: ["ctrl", "k"] },
  { label: "Export", href: "#", shortcut: ["ctrl", "s"] },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {quickActions.map((action) => (
          <div key={action.label} className="flex items-center justify-between">
            <Link
              href={action.href}
              className="font-medium text-slate-600 hover:text-primary"
            >
              {action.label}
            </Link>
            <p className="text-sm text-muted-foreground">
              {action.shortcut.join(" + ")}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
