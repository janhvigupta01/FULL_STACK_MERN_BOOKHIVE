import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serrverUrl } from "../main";

const FeedbackStrip = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get(`${serrverUrl}/api/feedback`).then((res) => {
      setFeedbacks(res.data);
    });
  }, []);

  return (
    <section className="bg-[#ABA293] py-20 border-t  border-b border-[#9d9484]">

      <h3 className="text-center text-2xl font-semibold text-[#592219]  mb-10">
        What our readers say
      </h3>

      <div className="relative overflow-hidden mb-12">
        <div className="flex gap-8 animate-feedback-scroll px-16 w-max">
          {[...feedbacks, ...feedbacks].map((item, index) => (
            <div
              key={index}
              className="
                min-w-[260px]
                px-5 py-4
                rounded-2xl
                bg-[#ABA293]
                text-[#592219]
                shadow-[6px_6px_14px_#8f887a,-6px_-6px_14px_#c7bfa9]
              "
            >
              <p className="text-sm italic leading-relaxed">
                “{item.text}”
              </p>
              <p className="mt-3 text-xs font-semibold opacity-80">
                — {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/feedback")}
          className="
            px-10 py-4 rounded-2xl text-sm font-semibold
            text-[#592219] bg-[#ABA293]
            shadow-[inset_6px_6px_14px_#8f887a,inset_-6px_-6px_14px_#c7bfa9]
            hover:scale-105 transition
          "
        >
          ✍️ Write your own feedback
        </button>
      </div>

    </section>
  );
};

export default FeedbackStrip;
