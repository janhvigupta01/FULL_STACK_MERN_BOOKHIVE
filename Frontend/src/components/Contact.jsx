import React, { useState } from "react";
import axios from "axios";

const Contact = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/api/contact",
        formData
      );

      alert(res.data.message);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to send message");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#030b17] flex justify-center items-center py-20 px-6">

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* LEFT SECTION same */}

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

          <form className="space-y-4" onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NeoInput
                placeholder="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <NeoInput
                placeholder="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <NeoInput
              type="email"
              placeholder="Your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <NeoInput
              placeholder="Phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <textarea
              rows="4"
              placeholder="How can we help?"
              name="message"
              value={formData.message}
              onChange={handleChange}
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

          </form>
        </div>

      </div>
    </div>
  );
};

/* 🔹 UPDATED NEOMORPHIC INPUT */
const NeoInput = ({ type = "text", placeholder, name, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    className="
      w-full px-4 py-3 rounded-xl
      bg-[#030b17] text-white placeholder-[#64748B]
      shadow-[inset_4px_4px_8px_#01060d,inset_-4px_-4px_8px_#050f22]
      outline-none
    "
  />
);

export default Contact;
