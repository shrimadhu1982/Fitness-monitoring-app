"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  const [profile, setProfile] = useState({
    name: "",
    weight: "",
    height: "",
    age: "",
    gender: "",
    goal: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  // FIXED: Dependency array is now explicitly empty []
  // This ensures the effect runs exactly once when the component mounts.
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("userEmail");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // Fetch from API
        const res = await fetch("/api/profile", {
          headers: { Authorization: token },
        });

        const data = await res.json();

        if (res.ok) {
          setProfile((prev) => ({ ...prev, name: data.name || "" }));
        } else {
          // If session is expired, redirect
          router.push("/login");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }

      // Load specific user data from localStorage
      if (email) {
        const saved = localStorage.getItem(`profile_${email}`);
        if (saved) {
          try {
            setProfile((prev) => ({ ...prev, ...JSON.parse(saved) }));
          } catch (e) {
            console.error("Error parsing profile data:", e);
          }
        }
      }
    };

    fetchProfile();
  }, []); // <--- This empty array fixes the "size changed" error.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    const email = localStorage.getItem("userEmail");
    if (email) {
      localStorage.setItem(`profile_${email}`, JSON.stringify(profile));
    }
    setTimeout(() => setIsSaving(false), 1000);
  };

  const handleLogout = () => {
  const email = localStorage.getItem("userEmail");

  // Remove login session
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");

  // Remove that user's profile data
  if (email) {
    localStorage.removeItem(`profile_${email}`);
  }

  // Go to login page
  router.push("/login");
};

  return (
    <div className="relative min-h-screen bg-gray-950 flex flex-col justify-center p-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-950/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">
          Your Profile
        </h1>

        <div className="bg-gray-900/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-800">
          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white text-3xl font-bold uppercase shadow-lg shadow-emerald-500/20">
              {profile.name ? profile.name[0] : "U"}
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="text-gray-400 text-sm font-medium ml-1 mb-2 block">
                Full Name
              </label>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full p-4 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm font-medium ml-1 mb-2 block">
                Age
              </label>
              <input
                name="age"
                type="number"
                value={profile.age}
                onChange={handleChange}
                className="w-full p-4 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm font-medium ml-1 mb-2 block">
                Weight (kg)
              </label>
              <input
                name="weight"
                type="number"
                value={profile.weight}
                onChange={handleChange}
                className="w-full p-4 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm font-medium ml-1 mb-2 block">
                Height (cm)
              </label>
              <input
                name="height"
                type="number"
                value={profile.height}
                onChange={handleChange}
                className="w-full p-4 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm font-medium ml-1 mb-2 block">
                Gender
              </label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="w-full p-4 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-400 text-sm font-medium ml-1 mb-2 block">
                Goal
              </label>
              <input
                name="goal"
                value={profile.goal}
                onChange={handleChange}
                className="w-full p-4 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                placeholder="e.g., Lose weight, Build muscle"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-10">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex-1 font-bold p-4 rounded-xl transition-all active:scale-95 shadow-lg ${
                isSaving
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-500 text-gray-950 hover:bg-white"
              }`}
            >
              {isSaving ? "Saved!" : "Save Profile"}
            </button>

            <button
              onClick={handleLogout}
              className="px-6 bg-red-500/10 text-red-500 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}