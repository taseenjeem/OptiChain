import database from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await database.products.findMany({
      select: { price: true },
    });

    const totalProductPrice = products.reduce(
      (sum, product) => sum + (product.price || 0),
      0
    );

    return NextResponse.json({
      totalPrice: totalProductPrice,
      totalCount: products.length,
    });
  } catch (error) {
    console.error("Failed to fetch product summary:", error);
    return NextResponse.json(
      { error: "Failed to load product summary" },
      { status: 500 }
    );
  }
}
