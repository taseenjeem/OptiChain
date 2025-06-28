"use client";

import { Pie, PieChart, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChartContainer } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MoreHorizontal } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const suppliersData = [
  { name: "Apple", email: "apple@gmail.com", contact: "+63 123 4243" },
  { name: "Samsung", email: "samsung@gmail.com", contact: "+63 133 3453" },
  { name: "Mugna Tech", email: "logitech@gmail.com", contact: "+63 433 4451" },
  { name: "Logitech", email: "xiao.mi@gmail.com", contact: "+63 433 4531" },
  { name: "Asus", email: "asus@gmail.com", contact: "+63 234 6457" },
  { name: "Lian Li", email: "microsoft@gmail.com", contact: "+63 546 8345" },
  { name: "NZXT", email: "hello@mugna.tech", contact: "+63 917 1033 599" },
  { name: "Xiaomi", email: "lianli@gmail.com", contact: "+63 123 3345" },
  { name: "Microsoft", email: "akko@gmail.com", contact: "+63 334 5673" },
  { name: "Sony", email: "intel@gmail.com", contact: "+63 986 7465" },
  { name: "Dell", email: "nvidia@gmail.com", contact: "+63 461 4677" },
];

const quickActions = [
  { label: "Create Order", shortcut: ["ctrl", "n"] },
  { label: "Add Product", shortcut: ["ctrl", "p"] },
  { label: "Add Supplier", shortcut: ["ctrl", "k"] },
  { label: "Export", shortcut: ["ctrl", "s"] },
];

const topSuppliersData = [
  { name: "Apple", value: 61, color: "#511D43" },
  { name: "Samsung", value: 15, color: "#901E3E" },
  { name: "Asus", value: 13, color: "#DC2525" },
  { name: "Xiaomi", value: 11, color: "#9BC09C" },
];

export default function SuppliersPage() {
  const { user } = useAuth();
  return (
    <div className="w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        <Card className="w-full lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Suppliers</CardTitle>
              <div className="flex w-full sm:w-auto sm:gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-9" />
                </div>
                <Button className="hidden sm:flex bg-[#6E9E23] hover:bg-[#5a831c]">
                  Edit Suppliers
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-100 hover:bg-slate-100">
                    <TableHead className="font-semibold text-slate-700">
                      Supplier Name
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Email
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Contact No.
                    </TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliersData.map((supplier) => (
                    <TableRow key={supplier.name}>
                      <TableCell className="font-medium">
                        {supplier.name}
                      </TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell>{supplier.contact}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="link"
                          className="text-green-600 p-0 h-auto"
                        >
                          Order History
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src="https://randomuser.me/api/portraits/men/18.jpg"
                  alt="Alysha Koay"
                />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-slate-800">Asil Mizan</p>
                <p className="text-sm text-slate-500">
                  {user?.role === "admin" ? "Admin" : "Manager"}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {quickActions.map((action) => (
                <div
                  key={action.label}
                  className="flex items-center justify-between"
                >
                  <p className="font-medium text-slate-600">{action.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {action.shortcut.join(" + ")}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Suppliers</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <ChartContainer
                config={{}}
                className="mx-auto aspect-square h-48"
              >
                <PieChart>
                  <Pie
                    data={topSuppliersData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={40}
                    outerRadius={80}
                    strokeWidth={2}
                  >
                    {topSuppliersData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        className="stroke-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="-mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-slate-600">
                {topSuppliersData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span
                      className="block h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                    <span className="font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                className="bg-[#6E9E23] text-white hover:bg-[#5a831c] hover:text-white"
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
