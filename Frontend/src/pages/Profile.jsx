import { useContext, useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit, FiSave, FiLogOut } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import AppContext from "../Context/AppContext";
import { serrverUrl } from "../main";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      if (imageFile) data.append("image", imageFile);

      const res = await axios.put(
        `${serrverUrl}/api/user/update-profile`,
        data,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Profile updated");
        setUser(res.data.user);
        setIsEditing(false);
      }
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
  try {
    await axios.post(
      `${serrverUrl}/api/user/logout`,
      {},
      { withCredentials: true }
    );

    setUser(null);                 // 🔥 context clear
    toast.success("Logged out");
    navigate("/login");            // 🔥 redirect
  } catch {
    toast.error("Logout failed");
  }
};

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#ABA293] px-4">

      {/* NEUMORPHIC CARD */}
      <div
        className="
          w-full max-w-xl p-8 rounded-3xl
          bg-[#592219] text-[#ABA293]
          shadow-[8px_8px_16px_#3e170f,-8px_-8px_16px_#74412b]
        "
      >
        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center">
          {previewImage || user?.image ? (
            <img
              src={previewImage || user.image}
              alt="profile"
              className="
                h-28 w-28 rounded-full object-cover
                shadow-[inset_4px_4px_8px_#3e170f,inset_-4px_-4px_8px_#74412b]
              "
            />
          ) : (
            <FaUserCircle size={110} className="text-[#ABA293]" />
          )}

          {isEditing && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="
                  mt-4 px-4 py-1.5 rounded-full text-sm
                  bg-[#592219]
                  shadow-[4px_4px_8px_#3e170f,-4px_-4px_8px_#74412b]
                  hover:scale-105 transition
                "
              >
                Change Photo
              </button>
            </>
          )}
        </div>

        <h2 className="text-3xl font-bold text-center mt-6 mb-8">
          My Profile
        </h2>

        {/* FORM */}
        <div className="space-y-5">
          {["name", "email", "phone"].map((field) => (
            <div key={field}>
              <label className="text-sm font-semibold capitalize">
                {field}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                disabled={field === "email" || !isEditing}
                value={formData[field]}
                onChange={handleChange}
                className="
                  w-full mt-1 p-3 rounded-xl outline-none
                  bg-[#592219] text-[#ABA293]
                  shadow-[inset_4px_4px_8px_#3e170f,inset_-4px_-4px_8px_#74412b]
                  disabled:opacity-70
                "
              />
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-10">
          {isEditing ? (
            <button
              onClick={handleSave}
              disabled={loading}
              className="
                flex items-center gap-2 px-6 py-2.5 rounded-full
                bg-[#592219]
                shadow-[4px_4px_8px_#3e170f,-4px_-4px_8px_#74412b]
                hover:scale-105 transition
              "
            >
              <FiSave /> {loading ? "Saving..." : "Save"}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="
                flex items-center gap-2 px-6 py-2.5 rounded-full
                bg-[#592219]
                shadow-[4px_4px_8px_#3e170f,-4px_-4px_8px_#74412b]
                hover:scale-105 transition
              "
            >
              <FiEdit /> Edit
            </button>
          )}

          <button
            onClick={handleLogout}
            className="
              flex items-center gap-2 px-6 py-2.5 rounded-full
              bg-[#592219]
              shadow-[4px_4px_8px_#3e170f,-4px_-4px_8px_#74412b]
               hover:scale-105 transition
            "
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
