import { SupplierTable } from "@/components/pages/all-suppliers-page/SupplierTable";
import database from "@/lib/db";

export default async function AllSupplierPage() {
  const initialSuppliers = await database.customers.findMany({
    take: 20,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4 mt-10">All Suppliers</h2>
      <SupplierTable initialData={initialSuppliers} />
    </div>
  );
}
