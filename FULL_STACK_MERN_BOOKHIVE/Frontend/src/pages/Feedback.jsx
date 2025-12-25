import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
    const navigate = useNavigate();

  const submitFeedback = async () => {
    const res = await fetch("http://localhost:4000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, text }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Thank you for your feedback 💛");
      setName("");
      setText("");
    }
  };

  return (
    <div className="min-h-screen bg-[#ABA293] flex items-center justify-center px-4 relative">

  {/* 🔙 BACK BUTTON — TOP RIGHT */}
  <button
    onClick={() => navigate("/")}
    className="
      absolute top-6 right-6
      px-6 py-2 rounded-xl
      text-sm font-semibold text-[#592219]
      bg-[#ABA293]
      shadow-[6px_6px_14px_#8f887a,-6px_-6px_14px_#c7bfa9]
      hover:scale-105 transition
    "
  >
    ← Back
  </button>

      <div className="
        bg-[#ABA293] p-10 rounded-3xl w-full max-w-md
        shadow-[8px_8px_20px_#8f887a,-8px_-8px_20px_#c7bfa9]
      ">
        <h2 className="text-center text-[#592219] font-semibold mb-6">
          Write your feedback
        </h2>

        <input
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-[#ABA293]
          shadow-[inset_4px_4px_10px_#8f887a,inset_-4px_-4px_10px_#c7bfa9]
          outline-none"
        />

        <textarea
          placeholder="Your feedback"
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-xl bg-[#ABA293]
          shadow-[inset_4px_4px_10px_#8f887a,inset_-4px_-4px_10px_#c7bfa9]
          outline-none"
        />

        <button
          onClick={submitFeedback}
          className="w-full py-3 rounded-xl text-[#592219] font-semibold
          shadow-[6px_6px_14px_#8f887a,-6px_-6px_14px_#c7bfa9]
          hover:scale-105 transition"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default Feedback;
