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

type Supplier = {
  id: string;
  customer_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  supplier_company?: string | null;
  phone?: string | null;
  email?: string | null;
};

export function SupplierTable({ initialData }: { initialData: Supplier[] }) {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !loading) {
          setLoading(true);
          try {
            const res = await fetch(`/api/suppliers?page=${page + 1}`);
            const data: Supplier[] = await res.json();
            if (data.length > 0) {
              setSuppliers((prev) => [...prev, ...data]);
              setPage((prev) => prev + 1);
            }
          } catch (error) {
            console.error("Failed to load more suppliers", error);
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
            <TableHead>Customer ID</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((s, index) => (
            <TableRow key={index}>
              <TableCell>{s.customer_id || s.id}</TableCell>
              <TableCell>{s.first_name || "-"}</TableCell>
              <TableCell>{s.last_name || "-"}</TableCell>
              <TableCell>{s.supplier_company || "-"}</TableCell>
              <TableCell>{s.email || "-"}</TableCell>
              <TableCell>{s.phone || "-"}</TableCell>
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
