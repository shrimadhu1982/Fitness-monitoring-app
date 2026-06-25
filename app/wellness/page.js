"use client";

import { useState, useEffect } from "react";

// Recommended Videos
const WELLNESS_VIDEOS = [
  {
    title: "5 Min Mindfulness",
    url: "https://www.youtube.com/watch?v=inpok4MKVLM",
    category: "Mindfulness",
  },

  {
    title: "Guided Breathing",
    url: "https://www.youtube.com/watch?v=VUjiXcfKBn8",
    category: "Stress Relief",
  },

  {
    title: "Deep Relaxation",
    url: "https://www.youtube.com/watch?v=YRJ6xoiRcpQ",
    category: "Calm",
  },
];

// Recommended Podcasts
const WELLNESS_PODCASTS = [
  {
    title: "8 Realistic Healthy Habits",
    url: "https://www.youtube.com/watch?v=-Kd7I6GrdGM",
    category: "Science",
  },

  {
    title: "The Stress Expert: Brain Battery",
    url: "https://www.youtube.com/watch?v=9EqrUK7ghho",
    category: "Life",
  },

  {
    title: "10 Minute Meditation",
    url: "https://www.youtube.com/watch?v=H_uc-uQ3Nkc",
    category: "Meditation",
  },
];

// Wellness Centers
const WELLNESS_CENTERS = [
  {
    name: "Sukha Wellness",
    address:
      "Mangaladevi Temple Rd, Mangaluru",
  },

  {
    name:
      "Transform Health & Wellness",
    address: "Kadri, Mangaluru",
  },

  {
    name: "SATHWA SPA & WELLNESS",
    address: "Attavar, Mangaluru",
  },
];

const getYoutubeId = (url) => {

  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

  const match = url.match(regExp);

  return match &&
    match[2].length === 11
    ? match[2]
    : null;
};

export default function Wellness() {

  const [water, setWater] =
    useState("");

  const [mood, setMood] =
    useState("");

  const [stress, setStress] =
    useState(0);

  const [isSaved, setIsSaved] =
    useState(false);

  // Reset everything initially
  useEffect(() => {

    setWater("");
    setMood("");
    setStress(0);

  }, []);

  // LIVE stress calculation
  useEffect(() => {

    // Start from 0
    if (
      water === "" &&
      mood === ""
    ) {

      setStress(0);

      return;
    }

    const email =
      localStorage.getItem(
        "userEmail"
      );

    const fitness = JSON.parse(
      localStorage.getItem(
        `fitness_${email}`
      ) || "{}"
    );

    const sleep =
      Number(fitness.sleep) || 0;

    const steps =
      Number(fitness.steps) || 0;

    let calculatedStress = 0;

    // Sleep impact
    if (sleep < 5) {
      calculatedStress += 4;
    }

    else if (sleep < 7) {
      calculatedStress += 2;
    }

    // Activity impact
    if (steps < 3000) {
      calculatedStress += 2;
    }

    // Water impact
    if (
      water !== "" &&
      Number(water) < 2
    ) {

      calculatedStress += 1;
    }

    // Mood analysis
    const lowerMood =
      mood.toLowerCase();

    if (
      lowerMood.includes("sad")
    ) {

      calculatedStress += 2;
    }

    if (
      lowerMood.includes(
        "anxious"
      )
    ) {

      calculatedStress += 3;
    }

    if (
      lowerMood.includes(
        "tired"
      )
    ) {

      calculatedStress += 2;
    }

    calculatedStress =
      Math.min(
        calculatedStress,
        10
      );

    setStress(
      calculatedStress
    );

  }, [water, mood]);

  const handleSave = () => {

    const email =
      localStorage.getItem(
        "userEmail"
      );

    if (!email)
      return alert(
        "User not logged in"
      );

    localStorage.setItem(
      `wellness_${email}`,

      JSON.stringify({
        water,
        mood,
        stress,
      })
    );

    setIsSaved(true);

    setTimeout(
      () =>
        setIsSaved(false),
      2000
    );
  };

  const renderMediaCards = (
    items,
    title
  ) => (

    <div className="mt-12">

      <h2 className="text-xl font-semibold text-white mb-4">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {items.map(
          (item, idx) => {

            const id =
              getYoutubeId(
                item.url
              );

            return (

              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-900 rounded-2xl border border-gray-800 hover:border-emerald-500/30 transition-all overflow-hidden flex flex-col"
              >

                <div className="relative aspect-video overflow-hidden bg-gray-800">

                  <img
                    src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                    alt={
                      item.title
                    }
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-4">

                  <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                    {
                      item.category
                    }
                  </p>

                  <p className="text-white font-medium line-clamp-1">
                    {item.title}
                  </p>
                </div>
              </a>
            );
          }
        )}
      </div>
    </div>
  );

  const renderLocationCards = (
    items,
    title
  ) => (

    <div className="mt-12">

      <h2 className="text-xl font-semibold text-white mb-4">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {items.map(
          (place, idx) => (

            <a
              key={idx}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                place.name +
                  " " +
                  place.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer flex flex-col gap-4"
            >

              <div className="flex items-start gap-4">

                <div className="bg-gray-800 p-3 rounded-xl group-hover:bg-emerald-500/20 transition-colors shrink-0">

                  <svg
                    className="w-6 h-6 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>

                <div className="min-w-0">

                  <h3 className="text-white font-bold text-lg break-words pr-8">
                    {place.name}
                  </h3>

                  <p className="text-gray-400 text-sm mt-1 break-words">
                    {
                      place.address
                    }
                  </p>
                </div>
              </div>

              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">

                <span className="text-emerald-500 font-bold text-sm">
                  View →
                </span>
              </div>
            </a>
          )
        )}
      </div>
    </div>
  );

  return (

    <div className="min-h-screen bg-gray-950 p-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-white mb-2">
          Daily Wellbeing
        </h1>

        <p className="text-gray-400 mb-8">
          Track your mood,
          stress, and hydration.
        </p>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

          {[
            {
              label: "Water (L)",
              val: water,
              set: setWater,
              icon: "💧",
            },

            {
              label: "Mood",
              val: mood,
              set: setMood,
              icon: "😊",
            },
          ].map(
            (item, idx) => (

              <div
                key={idx}
                className="bg-gray-900 border border-gray-800 p-6 rounded-2xl"
              >

                <label className="text-gray-400 text-sm mb-2 block">

                  {item.icon}{" "}
                  {item.label}
                </label>

                <input
                  type={
                    item.label ===
                    "Mood"
                      ? "text"
                      : "number"
                  }
                  value={item.val}
                  onChange={(e) =>
                    item.set(
                      e.target.value
                    )
                  }
                  className="w-full text-3xl bg-transparent text-white outline-none"
                  placeholder="0"
                />
              </div>
            )
          )}
        </div>

        {/* Stress Analysis */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl mb-8">

          <div className="flex items-center justify-between mb-4">

            <div>

              <h2 className="text-xl font-bold text-white">
                AI Stress Analysis
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                Calculated from
                sleep, mood,
                hydration &
                activity
              </p>
            </div>

            <div className={`text-3xl font-bold ${
              stress <= 3
                ? "text-emerald-400"
                : stress <= 6
                ? "text-yellow-400"
                : "text-red-400"
            }`}>
              {stress}/10
            </div>
          </div>

          <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">

            <div
              className={`h-full transition-all ${
                stress <= 3
                  ? "bg-emerald-500"
                  : stress <= 6
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${stress * 10}%`,
              }}
            />
          </div>

          <p className="mt-4 text-gray-300">

            {stress <= 3 &&
              "You seem relaxed today. Keep maintaining your healthy habits."}

            {stress > 3 &&
              stress <= 6 &&
              "Moderate stress detected. Take breaks and stay hydrated."}

            {stress > 6 &&
              "High stress detected. Prioritize recovery and relaxation today."}
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`w-full py-4 rounded-xl font-bold transition-all ${
            isSaved
              ? "bg-emerald-600"
              : "bg-emerald-500 hover:bg-emerald-600"
          } text-black`}
        >

          {isSaved
            ? "Saved Successfully!"
            : "Save Wellness Log"}
        </button>

        {renderMediaCards(
          WELLNESS_VIDEOS,
          "Recommended Videos"
        )}

        {renderMediaCards(
          WELLNESS_PODCASTS,
          "Recommended Podcasts"
        )}

        {renderLocationCards(
          WELLNESS_CENTERS,
          "Nearby Wellness Centers"
        )}

      </div>
    </div>
  );
}