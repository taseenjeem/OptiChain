import database from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { products } = await req.json();

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: "No products provided" },
        { status: 400 }
      );
    }

    const created = await Promise.all(
      products.map((product: any) =>
        database.products.create({
          data: {
            name: product.name,
            price: product.price,
            currency: "USD",
            stock: product.stock,
            order_status: product.order_status,
            order_date: product.order_date,
          },
        })
      )
    );

    return NextResponse.json({ success: true, created });
  } catch (error) {
    console.error("Product insert error:", error);
    return NextResponse.json(
      { error: "Failed to add products" },
      { status: 500 }
    );
  }
}
