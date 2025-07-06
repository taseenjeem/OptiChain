import { NextResponse } from "next/server";
import database from "@/lib/db";

export async function GET() {
  try {
    const lowStockProducts = await database.products.findMany({
      where: {
        stock: {
          lt: 50,
        },
      },
      orderBy: {
        stock: "asc",
      },
    });

    return NextResponse.json(lowStockProducts);
  } catch (error) {
    console.error("Error fetching low stock products:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
