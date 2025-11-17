import React from "react";
import { Facebook, Instagram, Twitter, BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10 px-6 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo + Tagline */}
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="text-white" size={32} />
            <h2 className="text-2xl font-bold text-white">BookHive</h2>
          </div>
          <p className="mt-3 text-sm text-gray-400">
            Your gateway to smart library exploration. Discover, search, and learn effortlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><a className="hover:text-white" href="#">Home</a></li>
            <li><a className="hover:text-white" href="#">Explore</a></li>
            <li><a className="hover:text-white" href="#">Categories</a></li>
            <li><a className="hover:text-white" href="#">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white">Resources</h3>
          <ul className="mt-3 space-y-2">
            <li><a className="hover:text-white" href="#">About Us</a></li>
            <li><a className="hover:text-white" href="#">Privacy Policy</a></li>
            <li><a className="hover:text-white" href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex gap-4 mt-3">
            <a href="#" className="hover:text-white"><Facebook /></a>
            <a href="#" className="hover:text-white"><Twitter /></a>
            <a href="#" className="hover:text-white"><Instagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} BookHive. All Rights Reserved.
      </div>
    </footer>
  );
}
