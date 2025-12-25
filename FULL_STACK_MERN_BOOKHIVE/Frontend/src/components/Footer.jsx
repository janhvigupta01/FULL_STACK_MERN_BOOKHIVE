import React from "react";
import { Facebook, Instagram, Twitter, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#592219] text-[#ABA293] py-10 px-6 shadow-inner">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">

        {/* Logo + tagline */}
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="text-[#8D664A]" size={34} />
            <h2 className="text-3xl font-bold tracking-wide">BookHive</h2>
          </div>
          <p className="mt-3 text-sm text-[#CFC6B8]">
            Your gateway to smarter discovery. Explore books, knowledge and curiosity.
          </p>
        </div>

        {/* Quick Links + Resources */}
        <div className="grid grid-cols-2 gap-8 md:gap-12 md:col-span-2">

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold border-l-4 border-[#8D664A] pl-2">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-[#8D664A] transition">Home</Link></li>
              <li><Link to="/categories" className="hover:text-[#8D664A] transition">Categories</Link></li>
              <li><Link to="/authors" className="hover:text-[#8D664A] transition">Authors</Link></li>
              <li><Link to="/contact" className="hover:text-[#8D664A] transition">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold border-l-4 border-[#8D664A] pl-2">
              Resources
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-[#8D664A] transition">About Us</Link></li>
              <li><Link to="/feedback" className="hover:text-[#8D664A] transition">Feedback</Link></li>
              <li><Link to="/profile" className="hover:text-[#8D664A] transition">Profile</Link></li>
            </ul>
          </div>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold border-l-4 border-[#8D664A] pl-2">
            Follow Us
          </h3>
          <div className="flex gap-4 mt-4">
            <a className="p-2 rounded-full bg-[#432819] hover:bg-[#8D664A] transition shadow-md" href="#">
              <Facebook size={20} />
            </a>
            <a className="p-2 rounded-full bg-[#432819] hover:bg-[#8D664A] transition shadow-md" href="#">
              <Twitter size={20} />
            </a>
            <a className="p-2 rounded-full bg-[#432819] hover:bg-[#8D664A] transition shadow-md" href="#">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#8D664A]/40 mt-8 pt-4 text-center text-sm text-[#CFC6B8]">
        © {new Date().getFullYear()} BookHive · Designed for knowledge seekers ✨
      </div>
    </footer>
  );
}
