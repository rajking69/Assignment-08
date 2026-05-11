/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { MdArrowForward, MdMenuBook } from "react-icons/md";

const collageImages = [
  {
    src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&h=400&q=80",
    alt: "Library shelves",
    cls: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&h=300&q=80",
    alt: "Open book",
    cls: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&h=300&q=80",
    alt: "Stack of books",
    cls: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=400&h=300&q=80",
    alt: "Night sky science",
    cls: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&h=300&q=80",
    alt: "Tech book",
    cls: "col-span-1 row-span-1",
  },
];

const stats = [
  { value: "12+", label: "Books" },
  { value: "3", label: "Categories" },
  { value: "Free", label: "Membership" },
];

const Banner = () => {
  return (
    <section className="mx-4 mt-6 mb-10 overflow-hidden rounded-3xl bg-indigo-950">
      <div className="grid grid-cols-1 items-center gap-0 lg:grid-cols-2">
        {/* Text side */}
        <div className="flex flex-col justify-center px-8 py-14 md:px-12">
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <MdMenuBook className="text-amber-400" />
            New books every week
          </span>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            Find Your<br />
            <span className="text-amber-400">Next Read.</span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-indigo-300">
            Explore a curated collection of Story, Tech, and Science books.
            Borrow digitally, read anywhere — no late fees, no hassle.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/AllBooks"
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-indigo-950 shadow-lg shadow-amber-400/20 transition hover:bg-amber-300"
            >
              Browse Now
              <MdArrowForward />
            </Link>
            <Link
              href="/Registration"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Join free
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-10 flex gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold text-amber-400">{s.value}</p>
                <p className="mt-0.5 text-xs text-indigo-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Collage side */}
        <div className="hidden h-full lg:grid grid-cols-3 grid-rows-2 gap-2 p-4 min-h-[440px]">
          {collageImages.map((img, i) => (
            <div key={i} className={`${img.cls} overflow-hidden rounded-2xl`}>
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Mobile single image */}
        <div className="lg:hidden h-56 w-full overflow-hidden">
          <img
            src={collageImages[0].src}
            alt={collageImages[0].alt}
            className="h-full w-full object-cover opacity-80"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
