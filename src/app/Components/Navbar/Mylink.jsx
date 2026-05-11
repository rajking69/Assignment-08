"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Mylink = ({ href, children }) => {
  const path = usePathname();
  const active = path === href;
  return (
    <Link
      href={href}
      className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors duration-200
        ${active
          ? "bg-amber-400 text-indigo-950"
          : "text-white/80 hover:bg-indigo-900 hover:text-white"
        }`}
    >
      {children}
    </Link>
  );
};

export default Mylink;
