import React from "react";
import { Facebook, Instagram, Twitter, BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#ECE7CA] to-[#E5DDC1] text-[#5A4B35] py-10 px-6 mt-10 shadow-inner">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Logo + tagline */}
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="text-[#C8AD7E]" size={34} />
            <h2 className="text-3xl font-bold tracking-wide">BookHive</h2>
          </div>
          <p className="mt-3 text-sm opacity-80">
            Your gateway to smarter discovery. Explore books, knowledge and curiosity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold border-l-4 border-[#C8AD7E] pl-2">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a className="hover:text-[#C8AD7E] transition" href="#">Home</a></li>
            <li><a className="hover:text-[#C8AD7E] transition" href="#">Explore</a></li>
            <li><a className="hover:text-[#C8AD7E] transition" href="#">Categories</a></li>
            <li><a className="hover:text-[#C8AD7E] transition" href="#">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold border-l-4 border-[#C8AD7E] pl-2">Resources</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a className="hover:text-[#C8AD7E] transition" href="#">About Us</a></li>
            <li><a className="hover:text-[#C8AD7E] transition" href="#">Privacy Policy</a></li>
            <li><a className="hover:text-[#C8AD7E] transition" href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold border-l-4 border-[#C8AD7E] pl-2">Follow Us</h3>
          <div className="flex gap-4 mt-4">
            <a className="p-2 rounded-full bg-[#DED6B4] hover:bg-[#C8AD7E] transition shadow-sm" href="#">
              <Facebook size={20} />
            </a>
            <a className="p-2 rounded-full bg-[#DED6B4] hover:bg-[#C8AD7E] transition shadow-sm" href="#">
              <Twitter size={20} />
            </a>
            <a className="p-2 rounded-full bg-[#DED6B4] hover:bg-[#C8AD7E] transition shadow-sm" href="#">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-[#D6CCA5] mt-10 pt-5 text-center text-sm opacity-70">
        © {new Date().getFullYear()} BookHive · Designed for knowledge seekers ✨
      </div>
    </footer>
  );
}
