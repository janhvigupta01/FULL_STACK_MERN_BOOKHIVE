import React from "react";
import heroImg from "../assets/bookshelf-hero.jpg";
import visionImg from "../assets/vision-reading.jpg";

const About = () => {
  return (
    <div className="bg-[#ABA293] min-h-screen text-[#4F3A2C]">

      {/* ================= HERO ================= */}
      <section
        className="
          w-full
          h-[260px] sm:h-[320px] lg:h-[420px]
          bg-cover bg-center
          flex items-center justify-center
        "
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="bg-black/50 w-full h-full flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-4xl font-bold text-white mb-3">
              Library Keyword Explorer
            </h1>
            <p className="text-gray-200 max-w-2xl mx-auto">
              A calm, intelligent platform for academic discovery and knowledge exploration.
            </p>
          </div>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="
          p-10 rounded-3xl
          bg-[#ABA293]
          shadow-[8px_8px_20px_#8f887a,-8px_-8px_20px_#c7bfa9]
        ">
          <p className="leading-7 mb-4">
            <strong>Library Keyword Explorer</strong> enhances how users interact
            with academic and library resources by focusing on clarity,
            structure, and meaningful connections.
          </p>
          <p className="leading-7">
            It transforms traditional keyword searches into a guided,
            discovery-driven learning experience for students, researchers,
            and institutions.
          </p>
        </div>
      </section>

      {/* ================= VISION & MISSION ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* TEXT */}
          <div className="
            flex-1 p-10 rounded-3xl
            bg-[#ABA293]
            shadow-[8px_8px_20px_#8f887a,-8px_-8px_20px_#c7bfa9]
          ">
            <h2 className="text-3xl font-semibold mb-4">
              Vision & Mission
            </h2>
            <p className="leading-7 mb-4">
              Our vision is to simplify academic research while preserving depth,
              reliability, and structure.
            </p>
            <p className="leading-7">
              We aim to make knowledge more discoverable, interconnected,
              and institution-ready.
            </p>
          </div>

          {/* IMAGE */}
          <div className="flex-1 max-w-lg w-full">
            <img
              src={visionImg}
              alt="Students reading in modern library"
              className="
                w-full
                h-[380px]
                object-cover
                rounded-3xl
                shadow-[8px_8px_20px_#8f887a,-8px_-8px_20px_#c7bfa9]
              "
            />
          </div>

        </div>
      </section>

      {/* ================= COMMITMENTS ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Our Commitments
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            ["Accessible by Design", "Usable across devices and audiences."],
            ["Quality & Relevance", "Accurate and structured academic data."],
            ["Scalable Architecture", "Supports institutional growth."],
            ["Data Security", "Secure authentication & data handling."],
          ].map(([title, desc], i) => (
            <div
              key={i}
              className="
                p-6 rounded-2xl text-center
                bg-[#ABA293]
                shadow-[6px_6px_14px_#8f887a,-6px_-6px_14px_#c7bfa9]
              "
            >
              <h4 className="font-semibold mb-2">{title}</h4>
              <p className="text-sm opacity-80">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TECHNOLOGY ================= */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="
          p-10 rounded-3xl
          bg-[#ABA293]
          shadow-[8px_8px_20px_#8f887a,-8px_-8px_20px_#c7bfa9]
        ">
          <h2 className="text-3xl font-semibold mb-6">
            Technology & Architecture
          </h2>

          <ul className="space-y-4 text-sm">
            <li><strong>Backend:</strong> Node.js & Express</li>
            <li><strong>Database:</strong> MongoDB with Mongoose</li>
            <li><strong>Authentication:</strong> JWT & bcrypt</li>
            <li><strong>Frontend:</strong> React + Tailwind CSS</li>
          </ul>
        </div>
      </section>

    </div>
  );
};

export default About;
