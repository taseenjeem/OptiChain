import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderDetailsModal } from "@/components/ui/OrderDetailsModal";
import { Loader2 } from "lucide-react";

interface Props {
  orders: any[];
  loading: boolean;
  refetch: () => void;
}

export function SupplierTable({ orders, loading, refetch }: Props) {
  return (
    <div className="relative w-full overflow-x-auto">
      {loading && (
        <div className="absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
          <Loader2 className="h-10 w-10 animate-spin" />
          <p className="mt-4 text-lg font-medium text-foreground">
            Fetching Data...
          </p>
        </div>
      )}
      <Table className={loading ? "opacity-50" : ""}>
        <TableHeader>
          <TableRow className="bg-slate-100">
            <TableHead>Supplier Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact No.</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order, i) => (
              <TableRow key={i}>
                <TableCell>{order.supplier_company}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell className="text-right">
                  <OrderDetailsModal order={order} onStatusUpdate={refetch} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
