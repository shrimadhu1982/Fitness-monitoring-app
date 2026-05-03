"use client";
import { useEffect, useState } from "react";

export default function Activity() {
  const [stats, setStats] = useState({
    steps: 0,
    calories: 0,
    sleep: 0,
    water: 0,
    mood: "N/A",
    stress: 0,
  });

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (!email) return;

    // ✅ Get user-specific data
    const fitness = JSON.parse(
      localStorage.getItem(`fitness_${email}`) || "{}"
    );

    const wellness = JSON.parse(
      localStorage.getItem(`wellness_${email}`) || "{}"
    );

    setStats({
      steps: fitness.steps || 0,
      calories: fitness.calories || 0,
      sleep: fitness.sleep || 0,
      water: wellness.water || 0,
      mood: wellness.mood || "Neutral",
      stress: wellness.stress || 0,
    });
  }, []);

  // UI Card
  const StatCard = ({ label, value, max, unit, colorClass }) => (
    <div className="bg-gray-900/50 p-6 rounded-3xl border border-gray-800">
      <div className="flex justify-between mb-2">
        <span className="text-gray-400 text-sm">{label}</span>
        <span className="text-white text-xl font-bold">
          {value} <span className="text-xs text-gray-500">{unit}</span>
        </span>
      </div>

      <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
        <div
          className={`${colorClass} h-full`}
          style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <h1 className="text-3xl font-bold text-white mb-8">
        Your Activity
      </h1>

      <div className="grid md:grid-cols-2 gap-4">
        <StatCard
          label="Steps"
          value={stats.steps}
          max={10000}
          unit="steps"
          colorClass="bg-emerald-500"
        />

        <StatCard
          label="Calories"
          value={stats.calories}
          max={2000}
          unit="kcal"
          colorClass="bg-blue-500"
        />

        <StatCard
          label="Sleep"
          value={stats.sleep}
          max={12}
          unit="hrs"
          colorClass="bg-indigo-500"
        />

        <StatCard
          label="Water"
          value={stats.water}
          max={4}
          unit="L"
          colorClass="bg-cyan-500"
        />
      </div>

      {/* Wellness Summary */}
      <div className="mt-6 bg-gray-900 p-6 rounded-3xl border border-gray-800 flex justify-between">
        <div>
          <p className="text-gray-400 text-sm">Mood</p>
          <p className="text-white text-xl font-bold">
            {stats.mood}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Stress</p>
          <p className="text-emerald-400 text-xl font-bold">
            {stats.stress} / 10
          </p>
        </div>
      </div>
    </div>
  );
}