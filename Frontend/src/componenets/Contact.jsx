import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen w-full bg-[#F5F5DD] flex justify-center items-center py-16 px-6">

      {/* ====== FULL WIDTH CONTAINER ====== */}
      <div className="max-w-6xl w-full flex gap-10">

        {/* ================= LEFT SECTION ================= */}
        <div className="w-1/2 flex items-center flex-col">

          {/* Heading */}
          <h1 className="text-5xl font-bold text-[#3C2F2F] mb-4">
            Contact Us
          </h1>

          <p className="text-[#6F635A] text-lg w-[90%]">
            Email us, or complete the form to learn how BookHive can help solve your book browsing & reading problems.
          </p>

          {/* Email & phone */}
          <div className="mt-6 text-[#3C2F2F]">
            <p className="text-lg font-semibold">contact@bookhive.com</p>
            <p className="text-lg font-semibold mt-1">+91 9876543210</p>
            <a href="#" className="underline mt-2 inline-block text-[#6F635A]">
              Customer Support
            </a>
          </div>

          {/* 3 Info Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">

            {/* Box 1 */}
            <div>
              <h3 className="font-semibold text-[#3C2F2F]">Customer Support</h3>
              <p className="text-sm text-[#6F635A] mt-1">
                Our team is available around the clock to help you with any issue.
              </p>
            </div>

            {/* Box 2 */}
            <div>
              <h3 className="font-semibold text-[#3C2F2F]">Feedback & Suggestions</h3>
              <p className="text-sm text-[#6F635A] mt-1">
                Share your ideas. Help us build a better BookHive!
              </p>
            </div>

            {/* Box 3 */}
            <div>
              <h3 className="font-semibold text-[#3C2F2F]">Media Inquiries</h3>
              <p className="text-sm text-[#6F635A] mt-1">
                Email us at media@bookhive.com for collaborations.
              </p>
            </div>

          </div>

        </div>

        {/* ================= RIGHT CONTACT FORM ================= */}
        <div className="w-1/2">
          <div
            className="bg-[#FDF8F0] rounded-2xl p-8 shadow-[0_8px_20px_rgba(165,140,100,0.25)]
           transition-all duration-500 hover:scale-[1.01]"
          >
            <h2 className="text-3xl font-bold text-[#3C2F2F] mb-2">
              Get in Touch
            </h2>
            <p className="text-[#6F635A] mb-6">You can reach us anytime</p>

            {/* Form */}
            <form className="space-y-4">

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  className="px-4 py-3 w-full rounded-lg border border-[#E3D8B7] bg-[#F8F4EB] focus:ring-2 focus:ring-[#D1BB91] outline-none"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="px-4 py-3 w-full rounded-lg border border-[#E3D8B7] bg-[#F8F4EB] focus:ring-2 focus:ring-[#D1BB91] outline-none"
                />
              </div>

              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-3 w-full rounded-lg border border-[#E3D8B7] bg-[#F8F4EB] focus:ring-2 focus:ring-[#D1BB91] outline-none"
              />

              <input
                type="text"
                placeholder="Phone number"
                className="px-4 py-3 w-full rounded-lg border border-[#E3D8B7] bg-[#F8F4EB] focus:ring-2 focus:ring-[#D1BB91] outline-none"
              />

              <textarea
                placeholder="How can we help?"
                rows="4"
                className="px-4 py-3 w-full rounded-lg border border-[#E3D8B7] bg-[#F8F4EB] focus:ring-2 focus:ring-[#D1BB91] outline-none"
              ></textarea>

              <button
                type="submit"
                className="w-full py-3 bg-[#D1BB91] text-white font-semibold rounded-lg hover:bg-[#c3a77c] transition-all"
              >
                Submit
              </button>

              <p className="text-xs text-[#6F635A] text-center mt-2">
                By contacting us, you agree to our{" "}
                <span className="underline cursor-pointer">Terms of Service</span> &
                <span className="underline cursor-pointer"> Privacy Policy</span>.
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
