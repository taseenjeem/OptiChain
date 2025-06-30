import database from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const company = searchParams.get("company");

  if (!company) {
    return NextResponse.json(
      { error: "Company name is required." },
      { status: 400 }
    );
  }

  try {
    const match = await database.customers.findFirst({
      where: {
        supplier_company: {
          equals: company,
          mode: "insensitive",
        },
      },
      select: { id: true },
    });

    return NextResponse.json({ exists: !!match });
  } catch (error) {
    console.error("Error checking supplier company:", error);
    return NextResponse.json(
      { error: "Server error while checking company." },
      { status: 500 }
    );
  }
}
