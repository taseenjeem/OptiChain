"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ReOrderModalProps {
  product: {
    id: string;
    name: string;
    price: number;
    currency: string;
    stock: number;
    order_status: string;
    order_date: string;
  };
}

export function ReOrderModal(product: ReOrderModalProps) {
  const [addedStock, setAddedStock] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleStockUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/products/update-stock", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: product.product.id,
          newStock: product.product.stock + addedStock,
        }),
      });

      if (res.ok) {
        toast.success("Stock updated successfully");
      } else {
        toast.error("Failed to update stock");
        throw new Error("Failed to update stock");
      }
    } catch (err) {
      console.error("Stock update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Add New Stocks</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Stock</DialogTitle>
          <DialogDescription>
            Review product info and add more stock.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleStockUpdate}>
          <div className="grid gap-4 py-4">
            <div className="space-y-1">
              <p className="text-sm">
                <strong>Product: </strong>
                {product.product.name}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm">
                <strong>Price: </strong>${product.product.price}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm">
                <strong>Current Stock: </strong>
                {product.product.stock}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="added-stock">Add Stock</Label>
              <Input
                id="added-stock"
                type="number"
                min="1"
                value={addedStock || ""}
                onChange={(e) => setAddedStock(parseInt(e.target.value) || 0)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Stock"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
