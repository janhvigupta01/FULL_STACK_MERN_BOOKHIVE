import { useContext, useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit, FiSave, FiLogOut } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import AppContext from "../Context/AppContext";
import { serrverUrl } from "../main";

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

  // 🔹 Load user info initially
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // 🔹 Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Image select
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // 🔹 Save profile
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
        toast.success("Profile updated successfully");
        setUser(res.data.user);
        setIsEditing(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout
  const handleLogout = async () => {
    try {
      await axios.post(`${serrverUrl}/api/user/logout`);

      setUser(null);
      toast.success("Logged out");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#F5F5DD] to-[#EFE6C8] p-4">
      <div className="bg-[#FDF8F0] rounded-3xl shadow-xl w-full max-w-xl p-8">
        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center">
          {previewImage || user?.image ? (
            <img
              src={previewImage || user.image}
              alt="Profile"
              className="h-28 w-28 rounded-full object-cover border-4 border-black shadow-lg"
            />
          ) : (
            <FaUserCircle size={110} className="text-gray-700" />
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
                className="mt-3 text-sm bg-black text-white px-4 py-1.5 rounded-full hover:opacity-90 transition"
              >
                Change Photo
              </button>
            </>
          )}
        </div>

        <h2 className="text-3xl font-bold text-center mt-6 mb-8">My Profile</h2>

        {/* FORM */}
        <div className="space-y-5">
          <div>
            <label className="text-sm font-semibold">Name</label>
            <input
              type="text"
              name="name"
              disabled={!isEditing}
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl bg-gray-100 disabled:bg-gray-200 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full p-3 border rounded-xl bg-gray-200 text-gray-600"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              disabled={!isEditing}
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl bg-gray-100 disabled:bg-gray-200 focus:ring-2 focus:ring-black outline-none"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-8">
          {isEditing ? (
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-full shadow hover:scale-105 transition"
            >
              <FiSave />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-full shadow hover:scale-105 transition"
            >
              <FiEdit />
              Edit Profile
            </button>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-full shadow hover:bg-red-700 transition"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
