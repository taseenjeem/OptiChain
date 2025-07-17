// app/actions/getProducts.ts
"use server";

import database from "@/lib/db";
import { PAGE_SIZE, Product } from "@/lib/definitions";

// Define a consistent page size

export async function getMoreProducts({
  skip,
}: {
  skip: number;
}): Promise<Product[]> {
  try {
    const products = await database.products.findMany({
      take: PAGE_SIZE,
      skip: skip,
      orderBy: {
        updatedAt: "desc",
      },
    });
    return products as Product[]; // Cast to ensure type conformity
  } catch (error) {
    console.error("Database Error:", error);
    return []; // Return an empty array on error
  }
}
