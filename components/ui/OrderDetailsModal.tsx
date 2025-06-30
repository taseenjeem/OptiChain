import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Order {
  supplier_company?: string;
  email?: string;
  phone?: string;
  product_name?: string;
  qty?: number;
}

interface OrderDetailsModalProps {
  order: Order;
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
        <DialogHeader>
          <DialogTitle className="font-bold">Order Details</DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>

        <div className="space-y-3 text-sm text-slate-700">
          <div>
            <strong>Supplier Company:</strong> {order.supplier_company || "N/A"}
          </div>
          <div>
            <strong>Email:</strong> {order.email || "N/A"}
          </div>
          <div>
            <strong>Phone:</strong> {order.phone || "N/A"}
          </div>
          <div>
            <strong>Product Name:</strong> {order.product_name || "N/A"}
          </div>
          <div>
            <strong>Quantity:</strong> {order.qty ?? "N/A"}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
