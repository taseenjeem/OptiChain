"use client";

import { useState, useEffect, useTransition } from "react";
import { useInView } from "react-intersection-observer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2Icon } from "lucide-react";
import { getMoreProducts } from "@/actions/getProducts";
import { PAGE_SIZE, Product } from "@/lib/definitions";

export default function ProductTable({
  initialData,
}: {
  initialData: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialData);
  const [offset, setOffset] = useState(initialData.length);
  const [hasMore, setHasMore] = useState(initialData.length >= PAGE_SIZE);
  const [isPending, startTransition] = useTransition();

  const { ref, inView } = useInView({ threshold: 0 });

  const loadMoreProducts = () => {
    if (isPending || !hasMore) return;

    startTransition(async () => {
      const newProducts = await getMoreProducts({ skip: offset });
      if (newProducts.length > 0) {
        setProducts((prev) => [...prev, ...newProducts]);
        setOffset((prev) => prev + newProducts.length);
      }
      if (newProducts.length < PAGE_SIZE) {
        setHasMore(false);
      }
    });
  };

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView]);

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

      {/* Trigger and Loader */}
      <div ref={ref} className="flex justify-center items-center p-4">
        {hasMore && isPending && <Loader2Icon className="animate-spin" />}
        {!hasMore && (
          <p className="text-sm text-gray-500">You've reached the end! 🎉</p>
        )}
      </div>
    </div>
  );
}
