"use server";

import database from "@/lib/db";
import { PAGE_SIZE, Product } from "@/lib/definitions";

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
    return products as Product[];
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}
