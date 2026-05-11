import Link from "next/link";
import { MdBookmark, MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaGithub, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-indigo-900/40 bg-indigo-950 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400">
                <MdBookmark className="text-sm text-indigo-950" aria-hidden />
              </div>
              <span className="text-lg font-bold text-white">
                Read<span className="text-amber-400">Vault</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-indigo-300">
              Your digital library. Borrow books, explore knowledge, and grow
              your reading habit — all in one place.
            </p>
            {/* Social links */}
            <div className="mt-5 flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-900 text-indigo-300 transition hover:bg-amber-400 hover:text-indigo-950"
              >
                <FaGithub className="text-base" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-900 text-indigo-300 transition hover:bg-amber-400 hover:text-indigo-950"
              >
                <FaTwitter className="text-base" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-900 text-indigo-300 transition hover:bg-amber-400 hover:text-indigo-950"
              >
                <FaFacebook className="text-base" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-900 text-indigo-300 transition hover:bg-amber-400 hover:text-indigo-950"
              >
                <FaInstagram className="text-base" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-amber-400">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2.5">
              <Link href="/" className="text-sm text-indigo-300 transition hover:text-white">Home</Link>
              <Link href="/AllBooks" className="text-sm text-indigo-300 transition hover:text-white">All Books</Link>
              <Link href="/Profile" className="text-sm text-indigo-300 transition hover:text-white">My Profile</Link>
              <Link href="/Registration" className="text-sm text-indigo-300 transition hover:text-white">Register</Link>
              <Link href="/Login" className="text-sm text-indigo-300 transition hover:text-white">Login</Link>
            </nav>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-amber-400">
              Browse
            </h3>
            <nav className="flex flex-col gap-2.5">
              <Link href="/AllBooks?category=Story" className="text-sm text-indigo-300 transition hover:text-white">Story Books</Link>
              <Link href="/AllBooks?category=Tech" className="text-sm text-indigo-300 transition hover:text-white">Tech Books</Link>
              <Link href="/AllBooks?category=Science" className="text-sm text-indigo-300 transition hover:text-white">Science Books</Link>
            </nav>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-amber-400">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3 text-sm text-indigo-300">
                <MdEmail className="mt-0.5 shrink-0 text-amber-400" />
                <a href="mailto:hello@readvault.dev" className="transition hover:text-white">
                  hello@readvault.dev
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-indigo-300">
                <MdPhone className="mt-0.5 shrink-0 text-amber-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-indigo-300">
                <MdLocationOn className="mt-0.5 shrink-0 text-amber-400" />
                <span>123 Library Lane, Book City, BC 10001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-indigo-900/60 pt-6 text-center text-xs text-indigo-500">
          © {new Date().getFullYear()} ReadVault. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
