import database from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { supplierCompany, firstName, lastName, email, phone } = body;

    const newSupplier = await database.customers.create({
      data: {
        supplier_company: supplierCompany,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
      },
    });

    return NextResponse.json(
      { message: "Supplier added successfully", supplier: newSupplier },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Failed to add supplier:", error);
    return NextResponse.json(
      { error: "Failed to add supplier" },
      { status: 500 }
    );
  }
}
