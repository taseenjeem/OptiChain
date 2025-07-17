"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Products = {
  id: string;
  name?: string | null;
  price?: number | null;
  currency?: string | null;
  stock?: number | null;
  order_status?: string | null;
  order_date?: string | null;
  updated_at?: Date | null;
};

export default function ProductTable({
  initialData,
}: {
  initialData: Products[];
}) {
  const [products, setProducts] = useState<Products[]>(initialData);

  return (
    <div className="rounded-md border overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p, index) => (
            <TableRow key={index}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{p.currency}</TableCell>
              <TableCell>{p.stock}</TableCell>
              <TableCell>{p.order_status}</TableCell>
              <TableCell>{p.order_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
