'use client';

import { FaInstagram, FaTwitter, FaGithub, FaDribbble } from 'react-icons/fa';

export default function FooterSection() {
  return (
    <footer className="bg-[#e6ddff] text-black py-12 px-6 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Brand Name */}
        <div className="text-3xl font-extrabold tracking-tight text-[#ff007f] uppercase">
          UrbanVault
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-semibold uppercase tracking-wide">
          <a href="#home" className="hover:text-[#ff007f] transition-colors duration-200">
            Home
          </a>
          <a href="#about" className="hover:text-[#ff007f] transition-colors duration-200">
            About
          </a>
          <a href="#products" className="hover:text-[#ff007f] transition-colors duration-200">
            Products
          </a>
          <a href="#contact" className="hover:text-[#ff007f] transition-colors duration-200">
            Contact
          </a>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-5 text-xl">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff007f] transition-colors duration-200"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff007f] transition-colors duration-200"
          >
            <FaTwitter />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff007f] transition-colors duration-200"
          >
            <FaGithub />
          </a>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff007f] transition-colors duration-200"
          >
            <FaDribbble />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-xs text-black/60 mt-8">
        © {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
}
