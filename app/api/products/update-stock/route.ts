import { NextResponse } from "next/server";
import database from "@/lib/db";

export async function PATCH(req: Request) {
  try {
    const { id, newStock } = await req.json();

    if (!id || newStock == null) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    await database.products.update({
      where: { id },
      data: { stock: newStock },
    });

    return NextResponse.json({ message: "Stock updated successfully" });
  } catch (error) {
    console.error("Error updating stock:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
