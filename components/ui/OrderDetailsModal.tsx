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

interface Order {
  supplier_company?: string;
  email?: string;
  phone?: string;
  product_name?: string;
  qty?: number;
  createdAt?: string;
}

interface OrderDetailsModalProps {
  order: Order;
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

export function OrderDetailsModal({ order }: OrderDetailsModalProps) {
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
          <Button type="submit">Arrived</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
