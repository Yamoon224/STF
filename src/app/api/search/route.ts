import { NextRequest, NextResponse } from "next/server";
import { buildSearchIndex } from "@/lib/search/buildIndex";
import { searchItems } from "@/lib/search/search";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";

  const items = await buildSearchIndex();
  const response = searchItems(items, query);

  return NextResponse.json(response);
}
