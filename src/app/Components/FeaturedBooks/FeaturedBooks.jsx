"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const categoryColors = {
  Story: "bg-rose-100 text-rose-700",
  Tech: "bg-blue-100 text-blue-700",
  Science: "bg-emerald-100 text-emerald-700",
};

function BookCard({ book }) {
  const { id, title, author, description, category, available_quantity, image_url } = book;
  const badgeClass = categoryColors[category] || "bg-indigo-100 text-indigo-700";

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-52 overflow-hidden bg-indigo-50">
        {image_url ? (
          <img
            src={image_url}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-indigo-200 text-5xl">📚</div>
        )}
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${badgeClass}`}>
          {category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-bold text-indigo-950 group-hover:text-indigo-700 transition-colors">
          {title}
        </h3>
        <p className="mt-1 text-xs text-indigo-400">{author}</p>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">{description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-400">{available_quantity} copies left</span>
        </div>
        <Link
          href={`/BookDetails/${id}`}
          className="mt-4 block w-full rounded-lg bg-indigo-950 py-2 text-center text-xs font-semibold text-white transition hover:bg-indigo-800"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default function FeaturedBooks({ books }) {
  const featured = Array.isArray(books) ? books.slice(0, 4) : [];

  return (
    <section className="mt-2 px-4 pb-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Handpicked</p>
          <h2 className="mt-1 text-2xl font-bold text-indigo-950">Featured Books</h2>
        </div>
        <Link
          href="/AllBooks"
          className="text-sm font-semibold text-indigo-700 underline-offset-2 hover:underline"
        >
          See all →
        </Link>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {featured.map((book) => (
          <SwiperSlide key={book.id} className="h-auto">
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
