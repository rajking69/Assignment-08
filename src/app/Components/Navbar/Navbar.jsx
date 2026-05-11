"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Mylink from "./Mylink";
import { MdBookmark, MdMenu, MdClose } from "react-icons/md";
import { toast } from "sonner";
import { signOut, useSession } from "@/lib/auth-client";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const signedIn = Boolean(session?.user);
  const userName = session?.user?.name || session?.user?.email || "";

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await signOut();
      toast.success("Logged out");
      router.replace("/Login");
      router.refresh();
    } catch (e) {
      toast.error(e?.message || "Logout failed. Try again.");
    } finally {
      setIsLoggingOut(false);
      setMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-indigo-950 text-white shadow-lg shadow-indigo-950/40">
      <div className="container mx-auto flex items-center justify-between px-4 py-3.5">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 shadow transition-colors group-hover:bg-amber-300">
            <MdBookmark className="text-lg text-indigo-950" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Read<span className="text-amber-400">Vault</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          <Mylink href="/">Home</Mylink>
          <Mylink href="/AllBooks">All Books</Mylink>
          {signedIn && <Mylink href="/Profile">My Profile</Mylink>}
        </nav>

        {/* Desktop auth */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-8 w-20 animate-pulse rounded-full bg-indigo-900" />
          ) : signedIn ? (
            <div className="flex items-center gap-3">
              <span className="max-w-[140px] truncate text-sm font-medium text-indigo-200">
                {userName}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="rounded-full bg-red-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-red-400 disabled:opacity-60"
              >
                {isLoggingOut ? "Leaving..." : "Logout"}
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/Login"
                className="rounded-full border border-white/30 px-4 py-1.5 text-sm font-semibold text-white/90 transition hover:border-white hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/Registration"
                className="rounded-full bg-amber-400 px-4 py-1.5 text-sm font-semibold text-indigo-950 transition hover:bg-amber-300"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition hover:bg-indigo-900 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="border-t border-indigo-900 bg-indigo-950 px-4 pb-5 pt-3 md:hidden">
          <nav className="flex flex-col gap-1">
            <MobileLink href="/" onClick={() => setMenuOpen(false)}>Home</MobileLink>
            <MobileLink href="/AllBooks" onClick={() => setMenuOpen(false)}>All Books</MobileLink>
            {signedIn && (
              <MobileLink href="/Profile" onClick={() => setMenuOpen(false)}>My Profile</MobileLink>
            )}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            {signedIn ? (
              <>
                <p className="truncate px-1 text-sm text-indigo-300">{userName}</p>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full rounded-full bg-red-500 py-2 text-sm font-semibold text-white transition hover:bg-red-400 disabled:opacity-60"
                >
                  {isLoggingOut ? "Leaving..." : "Logout"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/Login"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-full border border-white/30 py-2 text-center text-sm font-semibold text-white transition hover:border-white"
                >
                  Login
                </Link>
                <Link
                  href="/Registration"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-full bg-amber-400 py-2 text-center text-sm font-semibold text-indigo-950 transition hover:bg-amber-300"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

function MobileLink({ href, onClick, children }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-lg px-3 py-2 text-sm font-semibold text-white/90 transition hover:bg-indigo-900 hover:text-white"
    >
      {children}
    </Link>
  );
}

export default Navbar;
