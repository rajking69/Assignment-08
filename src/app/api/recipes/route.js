import { NextResponse } from "next/server";
import books from "../../../../public/data.json";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  const category = (searchParams.get("category") || "").trim().toLowerCase();

  let result = Array.isArray(books) ? books : [];

  if (category) {
    result = result.filter(
      (b) => String(b.category || "").toLowerCase() === category,
    );
  }

  if (q) {
    const words = q.split(/\s+/).filter(Boolean);
    result = result.filter((b) => {
      const haystack = [b.title, b.author, b.category, b.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return words.every((w) => haystack.includes(w));
    });
  }

  return NextResponse.json({ count: result.length, data: result });
}
