import ProductTable from "@/components/pages/all-products-page/ProductTable";
import database from "@/lib/db";

export default async function AllProductsPage() {
  const initialProducts = await database.products.findMany({
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
