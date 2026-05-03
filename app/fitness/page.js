"use client";
import { useState, useEffect } from "react";

export default function Fitness() {
  const [steps, setSteps] = useState("");
  const [calories, setCalories] = useState("");
  const [sleep, setSleep] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (email) {
      const data = JSON.parse(localStorage.getItem(`fitness_${email}`));

      if (data) {
        setSteps(data.steps || "");
        setCalories(data.calories || "");
        setSleep(data.sleep || "");
      }
    }
  }, []);

  const handleSave = () => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      alert("User not logged in");
      return;
    }

    const data = { steps, calories, sleep };

    // ✅ Save per user
    localStorage.setItem(`fitness_${email}`, JSON.stringify(data));

    alert("Fitness data saved!");
  };

  return (
    <div className="relative min-h-screen bg-gray-950 flex flex-col justify-center p-6 overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-950/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Daily Fitness</h1>
        <p className="text-gray-400 mb-8">Keep track of your daily stats.</p>

        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          {/* Steps */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <label className="text-gray-400 text-sm mb-2 block">
              🏃 Steps
            </label>
            <input
              type="number"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="w-full text-3xl bg-transparent text-white outline-none"
            />
          </div>

          {/* Calories */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <label className="text-gray-400 text-sm mb-2 block">
              🔥 Calories
            </label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full text-3xl bg-transparent text-white outline-none"
            />
          </div>

          {/* Sleep */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <label className="text-gray-400 text-sm mb-2 block">
              🌙 Sleep (hrs)
            </label>
            <input
              type="number"
              value={sleep}
              onChange={(e) => setSleep(e.target.value)}
              className="w-full text-3xl bg-transparent text-white outline-none"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-emerald-500 text-black rounded-lg font-bold hover:bg-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}