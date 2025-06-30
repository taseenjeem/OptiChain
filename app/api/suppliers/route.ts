import database from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await database.customers.findMany({
      orderBy: {
        createdAt: "desc",
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
