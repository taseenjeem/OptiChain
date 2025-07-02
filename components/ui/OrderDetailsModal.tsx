"use client";
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
import { Label } from "./label";
import { Input } from "./input";
import { toast } from "sonner";
import { useState } from "react";

interface Order {
  id?: string;
  supplier_company?: string;
  email?: string;
  phone?: string;
  product_name?: string;
  qty?: number;
  createdAt?: string;
}

interface Props {
  order: Order;
  onStatusUpdate: () => void;
}

function formatFullDateTime(isoString: string) {
  const date = new Date(isoString);

  const formatted = date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return formatted;
}

export function OrderDetailsModal({ order, onStatusUpdate }: Props) {
  const [loading, setLoading] = useState(false);
  const handleArrived = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: order.id }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Status updated to arrived!");
        onStatusUpdate();
      } else {
        toast.error(data.error || "Failed to update status.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-primary p-0 h-auto">
          Order History
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="">
          <DialogTitle className="font-bold">Order Details</DialogTitle>
          <p>Order placed on: {formatFullDateTime(order.createdAt!)}</p>
          <DialogDescription className="hidden" />
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Supplier Company Name:</Label>
            <Input
              className="border-primary"
              value={order.supplier_company}
              readOnly
              autoFocus={false}
            />
          </div>
          <div className="space-y-2">
            <Label>Email:</Label>
            <Input
              className="border-primary"
              value={order.email}
              readOnly
              autoFocus={false}
            />
          </div>
          <div className="space-y-2">
            <Label>Phone Number:</Label>
            <Input
              className="border-primary"
              value={order.phone}
              readOnly
              autoFocus={false}
            />
          </div>
          <div className="space-y-2">
            <Label>Product Name:</Label>
            <Input
              className="border-primary"
              value={order.product_name}
              readOnly
              autoFocus={false}
            />
          </div>
          <div className="space-y-2">
            <Label>Quantity:</Label>
            <Input
              className="border-primary"
              value={order.qty}
              readOnly
              autoFocus={false}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleArrived} disabled={loading} type="submit">
              {loading ? "Updating..." : "Arrived"}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
