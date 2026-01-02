import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen w-full bg-[#030b17] flex justify-center items-center py-20 px-6">

      {/* ====== MAIN CONTAINER ====== */}
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* ================= LEFT SECTION ================= */}
        <div className="flex flex-col gap-6">

          <h1 className="text-5xl font-bold text-[#F8FAFC]">
            Contact Us
          </h1>

          <p className="text-[#CBD5E1] text-lg leading-relaxed max-w-lg">
            Email us or fill out the form to discover how{" "}
            <span className="text-[#EAB308] font-semibold">BookHive</span>{" "}
            can improve your book browsing and reading experience.
          </p>

          {/* Contact Info */}
          <div className="mt-4 text-[#F8FAFC] space-y-1">
            <p className="text-lg font-semibold">contact@bookhive.com</p>
            <p className="text-lg font-semibold">+91 9876543210</p>
            <a href="#" className="underline text-[#94A3B8] inline-block mt-2">
              Customer Support
            </a>
          </div>

          {/* Info Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">

            {[
              ["Customer Support", "24×7 assistance for all your queries and issues."],
              ["Feedback", "Your ideas help us grow and improve."],
              ["Media", "media@bookhive.com for collaborations."],
            ].map(([title, desc], i) => (
              <div
                key={i}
                className="
                  rounded-xl p-4
                  bg-[#030b17]
                  shadow-[6px_6px_14px_#01060d,-6px_-6px_14px_#050f22]
                "
              >
                <h3 className="font-semibold text-[#F8FAFC]">{title}</h3>
                <p className="text-sm text-[#94A3B8] mt-1">{desc}</p>
              </div>
            ))}

          </div>
        </div>

        {/* ================= RIGHT FORM (NEOMORPHISM) ================= */}
        <div
          className="
            rounded-3xl p-8
            bg-[#030b17]
            shadow-[10px_10px_25px_#01060d,-10px_-10px_25px_#050f22]
          "
        >
          <h2 className="text-3xl font-bold text-[#F8FAFC] mb-2">
            Get in Touch
          </h2>
          <p className="text-[#94A3B8] mb-6">
            We’d love to hear from you anytime
          </p>

          <form className="space-y-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NeoInput placeholder="First name" />
              <NeoInput placeholder="Last name" />
            </div>

            <NeoInput type="email" placeholder="Your email" />
            <NeoInput placeholder="Phone number" />

            <textarea
              rows="4"
              placeholder="How can we help?"
              className="
                w-full px-4 py-3 rounded-xl
                bg-[#030b17] text-white placeholder-[#64748B]
                shadow-[inset_4px_4px_8px_#01060d,inset_-4px_-4px_8px_#050f22]
                outline-none resize-none
              "
            />

            <button
              type="submit"
              className="
                w-full py-3 rounded-xl font-semibold
                bg-[#EAB308] text-[#020617]
                hover:bg-[#FACC15]
                transition shadow-md
              "
            >
              Submit
            </button>

            <p className="text-xs text-[#64748B] text-center mt-3">
              By contacting us, you agree to our{" "}
              <span className="underline cursor-pointer">Terms</span> &{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>.
            </p>

          </form>
        </div>

      </div>
    </div>
  );
};

/* 🔹 NEOMORPHIC INPUT */
const NeoInput = ({ type = "text", placeholder }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="
      w-full px-4 py-3 rounded-xl
      bg-[#030b17] text-white placeholder-[#64748B]
      shadow-[inset_4px_4px_8px_#01060d,inset_-4px_-4px_8px_#050f22]
      outline-none
    "
  />
);

export default Contact;
