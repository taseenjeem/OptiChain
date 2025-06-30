import database from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { supplier_company, email, phone, product_name, qty } = body;

    if (!supplier_company || !email || !phone || !product_name || !qty) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const order = await database.orders.create({
      data: {
        supplier_company,
        email,
        phone,
        product_name,
        qty: Number(qty),
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
