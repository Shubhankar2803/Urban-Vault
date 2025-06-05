'use client';

import { FaInstagram, FaTwitter, FaGithub, FaDribbble } from 'react-icons/fa';
import Link from 'next/link';

export default function FooterSection() {
  return (
    <footer className="mt-auto bg-black text-white py-16 px-6 border-t-4 border-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        {/* Brand Name */}
        <div className="flex items-center">
          <Link href="/">
            <span className="bg-white text-black px-6 py-2 font-black text-2xl uppercase tracking-tight cursor-pointer">
              UrbanVault
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center md:justify-start gap-8 text-sm font-bold uppercase tracking-wide">
          <Link href="/" className="hover:bg-white hover:text-black px-4 py-2 transition-all duration-200 border-2 border-transparent hover:border-white">
            Home
          </Link>
          <Link href="/about" className="hover:bg-white hover:text-black px-4 py-2 transition-all duration-200 border-2 border-transparent hover:border-white">
            About
          </Link>
          <Link href="/products" className="hover:bg-white hover:text-black px-4 py-2 transition-all duration-200 border-2 border-transparent hover:border-white">
            Products
          </Link>
          <Link href="/contact" className="hover:bg-white hover:text-black px-4 py-2 transition-all duration-200 border-2 border-transparent hover:border-white">
            Contact
          </Link>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200 text-xl"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200 text-xl"
          >
            <FaTwitter />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200 text-xl"
          >
            <FaGithub />
          </a>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200 text-xl"
          >
            <FaDribbble />
          </a>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="w-full h-px bg-white mt-12 mb-6"></div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-white font-medium uppercase tracking-wide">
        © {new Date().getFullYear()} UrbanVault. All rights reserved.
      </div>
    </footer>
  );
}