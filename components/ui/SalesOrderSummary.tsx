"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";

const salesOrderData = [
  {
    channel: "Direct Sales",
    draft: 2,
    confirmed: 32,
    packed: 42,
    shipped: 23,
    invoiced: 7,
  },
  {
    channel: "Wholesale",
    draft: 0,
    confirmed: 41,
    packed: 33,
    shipped: 11,
    invoiced: 14,
  },
  {
    channel: "Retail",
    draft: 2,
    confirmed: 12,
    packed: 25,
    shipped: 16,
    invoiced: 21,
  },
];

export function SalesOrderSummary() {
  return (
    <Card className="w-full rounded-none border-t-0 shadow-none">
      <CardHeader className="container mx-auto p-4">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Sales Order</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 font-semibold text-green-600"
              >
                Last 7 Days
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by date</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
              <DropdownMenuItem>Last 90 Days</DropdownMenuItem>
              <DropdownMenuItem>All Time</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="container mx-auto p-4">
        {/* On small screens, this wrapper allows the table to be scrolled horizontally */}
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              {/* The header row with the light lavender background */}
              <TableRow className="bg-slate-50 hover:bg-slate-100">
                <TableHead className="w-[150px] font-semibold text-slate-600">
                  Channel
                </TableHead>
                <TableHead className="font-semibold text-slate-600">
                  Draft
                </TableHead>
                <TableHead className="font-semibold text-slate-600">
                  Confirmed
                </TableHead>
                <TableHead className="font-semibold text-slate-600">
                  Packed
                </TableHead>
                <TableHead className="font-semibold text-slate-600">
                  Shipped
                </TableHead>
                <TableHead className="font-semibold text-slate-600">
                  Invoiced
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesOrderData.map((order) => (
                <TableRow key={order.channel}>
                  <TableCell className="font-medium text-slate-800">
                    {order.channel}
                  </TableCell>
                  <TableCell>{order.draft}</TableCell>
                  <TableCell>{order.confirmed}</TableCell>
                  <TableCell>{order.packed}</TableCell>
                  <TableCell>{order.shipped}</TableCell>
                  <TableCell>{order.invoiced}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
