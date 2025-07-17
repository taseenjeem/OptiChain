import ProductTable from "@/components/pages/all-products-page/ProductTable";
import database from "@/lib/db";
import { PAGE_SIZE } from "@/lib/definitions";

export const dynamic = "force-dynamic";

export default async function AllProductsPage() {
  const initialProducts = await database.products.findMany({
    take: PAGE_SIZE,
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4 mt-10">All Products</h2>
      <ProductTable initialData={initialProducts} />
    </div>
  );
}
