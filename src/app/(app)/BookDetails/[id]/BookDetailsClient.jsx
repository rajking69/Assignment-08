"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdMenuBook, MdPerson, MdCategory, MdInventory2 } from "react-icons/md";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";

const categoryColors = {
  Story: "bg-rose-100 text-rose-700",
  Tech: "bg-blue-100 text-blue-700",
  Science: "bg-emerald-100 text-emerald-700",
};

export default function BookDetailsClient({ book }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const signedIn = Boolean(session?.user);

  useEffect(() => {
    if (!isPending && !signedIn) {
      router.replace(`/Login?callbackURL=/BookDetails/${book.id}`);
    }
  }, [isPending, signedIn, router, book.id]);

  if (isPending) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-10 pb-16">
          <div className="h-10 w-32 animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-8 h-96 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </main>
    );
  }

  if (!signedIn) return null;

  const { title, author, description, category, available_quantity, image_url } = book;
  const badgeClass = categoryColors[category] || "bg-indigo-100 text-indigo-700";

  const handleBorrow = () => {
    toast.success(`"${title}" borrowed successfully! Happy reading.`);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="container mx-auto px-4 py-10 pb-16">
        <Link
          href="/AllBooks"
          className="mb-6 inline-flex items-center rounded-lg border border-indigo-100 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-indigo-50"
        >
          ← Back to all books
        </Link>

        <article className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-5">
            {/* Book cover */}
            <div className="lg:col-span-2">
              <div className="h-72 bg-indigo-50 md:h-full min-h-72">
                {image_url ? (
                  <img
                    src={image_url}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-7xl text-indigo-200">
                    <MdMenuBook />
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-3">
              <div className="p-6 md:p-8">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${badgeClass}`}>
                  {category}
                </span>

                <h1 className="mt-3 text-2xl font-extrabold text-indigo-950 md:text-3xl">
                  {title}
                </h1>

                <p className="mt-3 text-base leading-relaxed text-slate-600">{description}</p>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <Stat icon={<MdPerson className="text-indigo-500" />} label="Author" value={author} />
                  <Stat icon={<MdCategory className="text-indigo-500" />} label="Category" value={category} />
                  <Stat
                    icon={<MdInventory2 className="text-indigo-500" />}
                    label="Availability"
                    value={
                      available_quantity > 0
                        ? `${available_quantity} copies left`
                        : "Currently unavailable"
                    }
                  />
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleBorrow}
                    disabled={available_quantity === 0}
                    className="rounded-lg bg-indigo-950 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {available_quantity > 0 ? "Borrow This Book" : "Out of Stock"}
                  </button>
                  <Link
                    href="/AllBooks"
                    className="rounded-lg border border-indigo-200 px-5 py-3 text-sm font-semibold text-indigo-800 transition hover:bg-indigo-50"
                  >
                    Browse more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
        {icon} {label}
      </p>
      <p className="mt-1 text-sm font-medium text-indigo-950">{value}</p>
    </div>
  );
}
