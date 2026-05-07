"use client";

import { useState, useEffect } from "react";

const WELLNESS_TIPS = [
  {
    title: "Hydration",
    desc: "Aim for a glass of water every time you check your stats to keep metabolism steady.",
    icon: "💧",
  },
  {
    title: "Active Breaks",
    desc: "If your step count is low, try a 5-minute walk around the room to boost circulation.",
    icon: "🏃",
  },
  {
    title: "Sleep Hygiene",
    desc: "Dim your screens 30 minutes before bed to improve your sleep quality.",
    icon: "🌙",
  },
  {
    title: "Mindfulness",
    desc: "If stress is high, take 3 deep, intentional breaths to reset your nervous system.",
    icon: "🧘",
  },
];

const FITNESS_CENTERS = [
  {
    name: "Cult MG Road",
    address: "Inland Avenue, MG Rd, Mangaluru",
  },
  {
    name: "Zeus Fitness Club",
    address: "Shivabagh, Kadri, Mangaluru",
  },
  {
    name: "Abbsolute Gym (Gold's)",
    address: "Boloor, Kodailbail, Mangaluru",
  },
];

export default function Activity() {
  const [stats, setStats] = useState({
    steps: 0,
    calories: 0,
    sleep: 0,
    water: 0,
    mood: "Neutral",
    stress: 0,
  });

  // Load data from localStorage
  useEffect(() => {
    const email =
      typeof window !== "undefined"
        ? localStorage.getItem("userEmail")
        : null;

    if (!email) return;

    const fitness = JSON.parse(
      localStorage.getItem(`fitness_${email}`) || "{}"
    );

    const wellness = JSON.parse(
      localStorage.getItem(`wellness_${email}`) || "{}"
    );

    // Get step count
    const steps = fitness.steps || 0;

    // Auto calculate calories
    const calories = Math.round(steps * 0.04);

    setStats({
      steps,
      calories,
      sleep: fitness.sleep || 0,
      water: wellness.water || 0,
      mood: wellness.mood || "Neutral",
      stress: wellness.stress || 0,
    });
  }, []);

  // Dynamic wellness suggestion
  const getSuggestion = () => {
    if (stats.steps < 3000)
      return "🚶 Try walking more today to stay active.";

    if (stats.water < 2)
      return "💧 Increase your water intake.";

    if (stats.sleep < 6)
      return "😴 You should get more sleep for recovery.";

    if (stats.stress > 7)
      return "🧘 Practice breathing exercises to reduce stress.";

    return "🔥 Great job! Keep maintaining your healthy lifestyle.";
  };

  // Reusable Stat Card
  const StatCard = ({
    label,
    value,
    max,
    unit,
    colorClass,
  }) => (
    <div className="bg-gray-900/50 p-6 rounded-3xl border border-gray-800 hover:border-gray-700 transition-all">
      <div className="flex justify-between mb-2">
        <span className="text-gray-400 text-sm">
          {label}
        </span>

        <span className="text-white text-xl font-bold">
          {value}{" "}
          <span className="text-xs text-gray-500">
            {unit}
          </span>
        </span>
      </div>

      <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
        <div
          className={`${colorClass} h-full`}
          style={{
            width: `${Math.min(
              (value / max) * 100,
              100
            )}%`,
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 p-6 text-white">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-2">
          Your Daily Activity
        </h1>

        <p className="text-gray-400 mb-10">
          Track your wellness and monitor your fitness progress.
        </p>

        {/* Main Stats */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">

          <StatCard
            label="Steps"
            value={stats.steps}
            max={10000}
            unit="steps"
            colorClass="bg-emerald-500"
          />

          <StatCard
            label="Calories Burned"
            value={stats.calories}
            max={400}
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
            label="Water Intake"
            value={stats.water}
            max={4}
            unit="L"
            colorClass="bg-cyan-500"
          />
        </div>

        {/* Mood & Stress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">

          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 text-center">
            <p className="text-gray-400 text-sm mb-1">
              Mood
            </p>

            <p className="text-2xl font-bold">
              {stats.mood}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 text-center">
            <p className="text-gray-400 text-sm mb-1">
              Stress Level
            </p>

            <p className="text-2xl font-bold text-emerald-400">
              {stats.stress}/10
            </p>
          </div>
        </div>

        {/* Smart Suggestion */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-3xl mb-12">
          <h2 className="text-2xl font-bold mb-3">
            AI Wellness Suggestion
          </h2>

          <p className="text-gray-300">
            {getSuggestion()}
          </p>
        </div>

        {/* Wellness Tips */}
        <h2 className="text-2xl font-bold mb-6">
          Wellness Insights
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {WELLNESS_TIPS.map((tip, idx) => (
            <div
              key={idx}
              className="bg-gray-900 p-6 rounded-3xl border border-gray-800 hover:border-emerald-500/30 transition-all flex items-start gap-4"
            >
              <div className="text-3xl">
                {tip.icon}
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  {tip.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Fitness Centers */}
        <h2 className="text-2xl font-bold mb-6">
          Nearby Fitness Centers
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {FITNESS_CENTERS.map((gym, idx) => (
            <div
              key={idx}
              className="bg-gray-900 p-5 rounded-3xl border border-gray-800 hover:border-blue-500/30 transition-all"
            >
              <h3 className="font-bold text-lg mb-2">
                {gym.name}
              </h3>

              <p className="text-gray-400 text-sm">
                {gym.address}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}