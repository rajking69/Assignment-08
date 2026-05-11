/* eslint-disable @next/next/no-img-element -- user can paste any image URL */
"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MdArrowBack,
  MdEmail,
  MdPerson,
  MdBookmark,
  MdMenuBook,
  MdEdit,
} from "react-icons/md";
import { useSession } from "@/lib/auth-client";

const Profile = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/Login?callbackURL=/Profile");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-10 pb-16">
          <div className="h-10 w-32 animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-8 h-64 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </main>
    );
  }

  if (!session?.user) return null;

  const name = session.user.name || "Reader";
  const email = session.user.email || "";
  const rawPhoto = String(session.user.image || "");

  let photoUrl = null;
  if (rawPhoto.trim() !== "") {
    try {
      const u = new URL(rawPhoto.trim());
      if (u.protocol === "http:" || u.protocol === "https:") {
        photoUrl = rawPhoto.trim();
      }
    } catch {
      photoUrl = null;
    }
  }

  const cleanName = name.trim();
  let avatarLetters = "?";
  if (cleanName.length >= 2) avatarLetters = cleanName.substring(0, 2).toUpperCase();
  else if (cleanName.length === 1) avatarLetters = cleanName.toUpperCase();
  else if (email.length >= 2) avatarLetters = email.substring(0, 2).toUpperCase();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-10 pb-16">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-indigo-100 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-indigo-50"
        >
          <MdArrowBack className="text-lg" aria-hidden />
          Back to home
        </Link>

        <article className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">
          {/* Header banner */}
          <div className="relative overflow-hidden bg-linear-to-br from-indigo-800 via-indigo-900 to-indigo-950 px-6 py-10 md:px-10 md:py-12">
            <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-amber-300/15 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-32 -left-16 size-64 rounded-full bg-amber-500/10 blur-3xl" aria-hidden />

            <div className="relative flex flex-col items-center gap-8 md:flex-row md:gap-10 md:text-left">
              {/* Avatar */}
              <div className="relative mx-auto shrink-0 md:mx-0">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={name + " profile photo"}
                    referrerPolicy="no-referrer"
                    width={128}
                    height={128}
                    className="h-28 w-28 rounded-2xl border-4 border-white object-cover shadow-xl ring-2 ring-white/30 md:h-32 md:w-32"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-white bg-white/15 text-3xl font-bold tracking-tight text-white shadow-xl ring-2 ring-white/25 backdrop-blur-sm md:h-32 md:w-32 md:text-4xl">
                    {avatarLetters}
                  </div>
                )}
                <span className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-800 shadow-md">
                  <MdBookmark className="text-sm" aria-hidden />
                  ReadVault
                </span>
              </div>

              <div className="min-w-0 flex-1 text-center md:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 md:text-sm">
                  My profile
                </p>
                <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-white drop-shadow-sm md:text-4xl">
                  {name}
                </h1>
                {email !== "" && (
                  <p className="mt-3 flex items-center justify-center gap-2 text-sm text-white/90 md:justify-start">
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                      <MdEmail className="text-lg text-white" aria-hidden />
                    </span>
                    <span className="truncate font-medium">{email}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
            {/* Account details */}
            <section className="rounded-xl border border-slate-100 bg-slate-50/90 p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                <MdPerson className="text-lg text-indigo-600" aria-hidden />
                Account details
              </h2>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-xs font-medium text-slate-500">Display name</p>
                  <p className="mt-0.5 text-base font-medium text-indigo-950">{name}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Email</p>
                  <p className="mt-0.5 break-all text-base text-slate-800">
                    {email !== "" ? email : "—"}
                  </p>
                </div>
              </div>
              {/* Update button */}
              <Link
                href="/UpdateProfile"
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-800 shadow-sm transition hover:bg-indigo-50"
              >
                <MdEdit className="text-base" aria-hidden />
                Update Information
              </Link>
            </section>

            {/* Quick actions */}
            <section className="flex flex-col justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50/60 p-5">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-800">
                  Keep reading
                </h2>
                <p className="mt-2 text-sm text-slate-700">
                  Browse the library or discover your next great book.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/AllBooks"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-800"
                >
                  <MdMenuBook className="text-lg" aria-hidden />
                  Browse Books
                </Link>
                <Link
                  href="/"
                  className="inline-flex flex-1 items-center justify-center rounded-lg border border-amber-300 bg-white px-4 py-2.5 text-sm font-semibold text-amber-800 transition hover:bg-amber-50"
                >
                  Home
                </Link>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
};

export default Profile;
