import { NextRequest, NextResponse } from "next/server";
import database from "@/lib/db";

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);

    const data = await database.customers.findMany({
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        customer_id: true,
        first_name: true,
        last_name: true,
        supplier_company: true,
        phone: true,
        email: true,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return NextResponse.json(
      { error: "Failed to fetch suppliers data" },
      { status: 500 }
    );
  }
}
