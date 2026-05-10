import Link from "next/link";
import { MdHome, MdMenuBook } from "react-icons/md";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Error 404
        </p>
        <h1 className="mt-2 text-4xl font-bold text-indigo-950">Page not found</h1>
        <p className="mt-3 text-slate-600">
          The page you&apos;re looking for has either moved or never existed.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-800"
          >
            <MdHome className="text-lg" aria-hidden />
            Back to home
          </Link>
          <Link
            href="/AllBooks"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-indigo-200 bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
          >
            <MdMenuBook className="text-lg" aria-hidden />
            Browse books
          </Link>
        </div>
      </div>
    </main>
  );
}
