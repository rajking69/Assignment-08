"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { MdSearch, MdClose, MdMenuBook } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const CATEGORIES = ["All", "Story", "Tech", "Science"];

const categoryColors = {
  Story: "bg-rose-100 text-rose-700",
  Tech: "bg-blue-100 text-blue-700",
  Science: "bg-emerald-100 text-emerald-700",
};

function BookCard({ book }) {
  const { id, title, author, description, category, available_quantity, image_url } = book;
  const badgeClass = categoryColors[category] || "bg-indigo-100 text-indigo-700";

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-48 overflow-hidden bg-indigo-50">
        {image_url ? (
          <img
            src={image_url}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">📚</div>
        )}
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${badgeClass}`}>
          {category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h2 className="line-clamp-2 text-sm font-bold text-indigo-950 group-hover:text-indigo-700 transition-colors">
          {title}
        </h2>
        <p className="mt-1 text-xs text-indigo-400">{author}</p>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-500">{description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {available_quantity > 0 ? `${available_quantity} copies left` : "Unavailable"}
          </span>
        </div>
        <Link
          href={`/BookDetails/${id}`}
          className="mt-3 block w-full rounded-lg bg-indigo-950 py-2 text-center text-xs font-semibold text-white transition hover:bg-indigo-800"
        >
          Details
        </Link>
      </div>
    </div>
  );
}

function CatalogInner({ books }) {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("category") || "All";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    CATEGORIES.includes(initialCat) ? initialCat : "All"
  );

  const allBooks = Array.isArray(books) ? books : [];

  const filtered = useMemo(() => {
    return allBooks
      .filter((b) => activeCategory === "All" || b.category === activeCategory)
      .filter((b) => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return true;
        return (b.title + " " + b.author).toLowerCase().includes(q);
      });
  }, [allBooks, activeCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      {/* Sidebar */}
      <aside className="lg:w-52 lg:shrink-0">
        <div className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-400">
            Category
          </p>
          <ul className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1">
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                    cat === activeCategory
                      ? "bg-indigo-950 text-white shadow"
                      : "text-slate-700 hover:bg-indigo-50 hover:text-indigo-950"
                  }`}
                >
                  {cat === "All" ? "All Books" : cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        {/* Search bar */}
        <div className="mb-6">
          <div className="relative max-w-lg">
            <MdSearch className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books by title..."
              autoComplete="off"
              className="w-full rounded-xl border border-indigo-200 bg-white py-3 pl-11 pr-10 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <MdClose className="text-lg" />
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-slate-400">
            {filtered.length} of {allBooks.length} books
          </p>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-indigo-100 bg-white px-6 py-16 text-center">
            <MdMenuBook className="mx-auto mb-3 text-4xl text-indigo-200" />
            <p className="text-slate-500">No books match. Try different keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BooksCatalog({ books }) {
  return (
    <Suspense fallback={<div className="text-sm text-slate-400">Loading books…</div>}>
      <CatalogInner books={books} />
    </Suspense>
  );
}
