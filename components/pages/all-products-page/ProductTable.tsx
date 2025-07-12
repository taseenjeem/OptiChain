"use client";

import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

type Products = {
  id: string;
  name?: string | null;
  price?: number | null;
  currency?: string | null;
  stock?: number | null;
  order_status?: string | null;
  order_date?: string | null;
};

export default function ProductTable({
  initialData,
}: {
  initialData: Products[];
}) {
  const [products, setProducts] = useState<Products[]>(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !loading) {
          setLoading(true);
          try {
            const res = await fetch(`/api/products/info?page=${page + 1}`);
            const data: Products[] = await res.json();
            if (data.length > 0) {
              setProducts((prev) => [...prev, ...data]);
              setPage((prev) => prev + 1);
            }
          } catch (error) {
            console.error("Failed to load more products", error);
          } finally {
            setLoading(false);
          }
        }
      },
      { rootMargin: "200px" }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [page, loading]);
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

      <div ref={observerRef} className="flex justify-center py-4">
        {loading && (
          <Loader2 className="animate-spin w-5 h-5 text-muted-foreground" />
        )}
      </div>
    </div>
  );
}
