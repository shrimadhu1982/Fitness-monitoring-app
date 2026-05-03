"use client";
import { useState, useEffect } from "react";

export default function Wellness() {
  const [water, setWater] = useState("");
  const [mood, setMood] = useState("");
  const [stress, setStress] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (email) {
      const data = JSON.parse(localStorage.getItem(`wellness_${email}`));

      if (data) {
        setWater(data.water || "");
        setMood(data.mood || "");
        setStress(data.stress || "");
      }
    }
  }, []);

  const handleSave = () => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      alert("User not logged in");
      return;
    }

    const data = { water, mood, stress };

    // ✅ Save per user
    localStorage.setItem(`wellness_${email}`, JSON.stringify(data));

    alert("Wellness data saved!");
  };

  return (
    <div className="relative min-h-screen bg-gray-950 flex flex-col justify-center p-6 overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-950/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">
          Daily Wellbeing
        </h1>
        <p className="text-gray-400 mb-8">
          Track your mood, stress, and hydration.
        </p>

        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          {/* Water */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <label className="text-gray-400 text-sm mb-2 block">
              💧 Water (Liters)
            </label>
            <input
              type="number"
              value={water}
              onChange={(e) => setWater(e.target.value)}
              className="w-full text-2xl bg-transparent text-white outline-none"
            />
          </div>

          {/* Mood */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <label className="text-gray-400 text-sm mb-2 block">
              😊 Mood
            </label>
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full text-2xl bg-transparent text-white outline-none"
            />
          </div>

          {/* Stress */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <label className="text-gray-400 text-sm mb-2 block">
              🧘 Stress (1-10)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={stress}
              onChange={(e) => setStress(e.target.value)}
              className="w-full text-2xl bg-transparent text-white outline-none"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-emerald-500 text-black rounded-lg font-bold hover:bg-white"
          >
            Save Wellness Log
          </button>
        </div>
      </div>
    </div>
  );
}