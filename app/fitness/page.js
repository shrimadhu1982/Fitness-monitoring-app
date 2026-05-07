"use client";

import { useState } from "react";

export default function FitnessPage() {
  const [steps, setSteps] = useState("");
  const [sleep, setSleep] = useState("");

  const saveFitnessData = () => {
    // Example user email
    const email =
      localStorage.getItem("userEmail") || "demo@gmail.com";

    // Save data
    localStorage.setItem(
      `fitness_${email}`,
      JSON.stringify({
        steps: Number(steps),
        sleep: Number(sleep),
      })
    );

    alert("Fitness data saved!");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-3xl border border-gray-800">

        <h1 className="text-3xl font-bold mb-6">
          Fitness Input
        </h1>

        {/* Steps */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-400">
            Steps
          </label>

          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 outline-none"
            placeholder="Enter steps"
          />
        </div>

        {/* Sleep */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-400">
            Sleep Hours
          </label>

          <input
            type="number"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 outline-none"
            placeholder="Enter sleep hours"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={saveFitnessData}
          className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all py-3 rounded-xl font-semibold"
        >
          Save Fitness Data
        </button>

      </div>
    </div>
  );
}