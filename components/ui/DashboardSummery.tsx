import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  TrendingUp,
  Calendar,
  DollarSign,
  ShoppingBag,
  PlusCircle,
  FileText,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

const salesData = [
  {
    title: "Today's Sale",
    amount: "143.3k",
    icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
    iconBg: "bg-blue-100",
  },
  {
    title: "Yearly Total Sales",
    amount: "$250,423",
    icon: <Calendar className="h-5 w-5 text-purple-500" />,
    iconBg: "bg-purple-100",
  },
  {
    title: "Net Income",
    amount: "$68.9k",
    icon: <DollarSign className="h-5 w-5 text-orange-500" />,
    iconBg: "bg-orange-100",
  },
  {
    title: "Products",
    amount: "343",
    icon: <ShoppingBag className="h-5 w-5 text-pink-500" />,
    iconBg: "bg-pink-100",
  },
];

const quickActions = [
  {
    label: "Create Order",
    icon: <PlusCircle />,
    href: "/create-order",
  },
  {
    label: "Add Supplier",
    icon: <FileText />,
    href: "/add-supplier",
  },
  {
    label: "Add Product",
    icon: <ShoppingBag />,
    href: "/add-product",
  },
  {
    label: "Export",
    icon: <Upload />,
    href: "#",
  },
];

export function DashboardSummery() {
  return (
    <div className="w-full my-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {salesData.map((item, index) => (
                <Card key={index}>
                  <CardContent className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${item.iconBg}`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {item.amount}
                      </p>
                      <p className="text-sm text-slate-500">{item.title}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="space-y-8">
          <CardHeader className="flex items-center justify-between border-b border-slate-200 pb-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src="https://randomuser.me/api/portraits/men/18.jpg"
                  alt="Asil Mizan"
                />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-slate-800">Asil Mizan</p>
                <p className="text-sm text-slate-500">Admin</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <MoreHorizontal className="h-5 w-5 text-slate-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>

          <CardContent>
            <h2 className="text-lg font-semibold text-slate-800">
              Quick Actions
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-auto justify-start p-0 font-medium text-slate-600 hover:bg-transparent hover:text-primary"
                >
                  <Link href={action.href} className="flex items-center gap-2">
                    {action.icon}
                    {action.label}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
