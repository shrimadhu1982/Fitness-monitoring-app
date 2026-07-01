"use client";

import { useState, useEffect } from "react";

export default function Wellness() {

  
  const [water, setWater] = useState("");
  const [mood, setMood] = useState("");

  const [stress, setStress] = useState(0);

  const [recommendation, setRecommendation] = useState("");

  const [loading, setLoading] = useState(false);

  const [saved, setSaved] = useState(false);


  useEffect(() => {

    const email = localStorage.getItem("userEmail");

    const fitness = JSON.parse(
      localStorage.getItem(`fitness_${email}`) || "{}"
    );

    const sleep = Number(fitness.sleep) || 0;
    const steps = Number(fitness.steps) || 0;

    let score = 0;

    // Sleep

    if (sleep < 5)

      score += 4;

    else if (sleep < 7)

      score += 2;

    // Steps

    if (steps < 3000)

      score += 2;

    // Water

    if (
      water &&
      Number(water) < 2
    )

      score += 1;

    // Mood

    const lowerMood = mood.toLowerCase();

    if (lowerMood.includes("sad"))

      score += 2;

    if (lowerMood.includes("tired"))

      score += 2;

    if (lowerMood.includes("anxious"))

      score += 3;

    score = Math.min(score, 10);

    setStress(score);

  }, [water, mood]);

  // ==========================
  // SAVE & GENERATE AI
  // ==========================

  const handleSave = async () => {

    const email =
      localStorage.getItem("userEmail");

    if (!email) {

      alert("Please login first.");

      return;

    }

    localStorage.setItem(

      `wellness_${email}`,

      JSON.stringify({

        water,
        mood,
        stress,

      })

    );

    try {

      setLoading(true);

      const fitness = JSON.parse(

        localStorage.getItem(
          `fitness_${email}`
        ) || "{}"

      );

      const response = await fetch(

        "/api/wellness-ai",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            water,
            mood,
            stress,

            sleep: fitness.sleep,

            steps: fitness.steps,

          }),

        }

      );

      const data =
        await response.json();

      setRecommendation(
        data.recommendation
      );

      setSaved(true);

      setTimeout(() => {

        setSaved(false);

      }, 2000);

    } catch (err) {

      console.log(err);

      setRecommendation(

        "Unable to generate AI report."

      );

    } finally {

      setLoading(false);

    }

  };
    return (

    <div className="min-h-screen bg-[#050816] text-white py-12">

  <div className="max-w-5xl mx-auto">

    {/* Heading */}

    <h1 className="text-4xl font-bold mb-2">
      Daily Wellbeing
    </h1>

    <p className="text-gray-400 mb-8">
      Track your mood, stress, and hydration.
    </p>

    {/* Input Cards */}

    <div className="grid md:grid-cols-3 gap-4">

      {/* Water */}

      <div className="bg-[#111827] rounded-xl p-5 border border-gray-800">

        <label className="text-gray-400 text-sm">
          💧 Water (Liters)
        </label>

        <input
          type="number"
          value={water}
          onChange={(e) => setWater(e.target.value)}
          placeholder="2"
          className="mt-3 w-full bg-transparent outline-none text-white text-lg"
        />

      </div>

      {/* Mood */}

      <div className="bg-[#111827] rounded-xl p-5 border border-gray-800">

        <label className="text-gray-400 text-sm">
          😊 Mood
        </label>

        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="Happy"
          className="mt-3 w-full bg-transparent outline-none text-white text-lg"
        />

      </div>

      {/* Stress */}

      <div className="bg-[#111827] rounded-xl p-5 border border-gray-800">

        <label className="text-gray-400 text-sm">
          🔥 Stress (1–10)
        </label>

        <input
          type="number"
          value={stress}
          readOnly
          className="mt-3 w-full bg-transparent outline-none text-white text-lg"
        />

      </div>

    </div>

    {/* Save Button */}

    <div className="flex justify-end mt-6">

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-emerald-500 hover:bg-emerald-600 px-8 py-3 rounded-lg font-semibold transition"
      >

        {loading
          ? "Generating..."
          : "Save Wellness Log"}

      </button>

    </div>
                {/* AI Wellness Report */}

        <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-3xl font-bold">
                🤖 AI Wellness Report
              </h2>

              <p className="text-gray-400 mt-2">
                Personalized wellness insights powered by Gemini AI.
              </p>

            </div>

            <div
              className={`text-5xl font-extrabold ${
                stress <= 3
                  ? "text-emerald-400"
                  : stress <= 6
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {stress}/10
            </div>

          </div>

          {/* Progress Bar */}

          <div className="w-full bg-zinc-800 rounded-full h-4 overflow-hidden">

            <div
              className={`h-full transition-all duration-700 ${
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

          {/* AI Output */}

          <div className="mt-8">

            {loading ? (

              <div className="bg-zinc-800 rounded-2xl p-8 text-center">

                <h3 className="text-2xl font-bold text-emerald-400 animate-pulse">

                  🤖 Gemini is analyzing your wellness...

                </h3>

                <p className="text-gray-400 mt-4">

                  Please wait a few seconds.

                </p>

              </div>

            ) : recommendation ? (

              <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-emerald-500 rounded-3xl p-8">

                <pre className="whitespace-pre-wrap leading-8 text-lg font-sans text-gray-200">

                  {recommendation}

                </pre>

              </div>

            ) : (

              <div className="bg-zinc-800 rounded-2xl p-8 text-center">

                <div className="text-6xl mb-4">
                  🧠
                </div>

                <h3 className="text-2xl font-bold">

                  AI Report Not Generated

                </h3>

                <p className="text-gray-400 mt-4">

                  Enter your wellness details and click

                  <span className="text-emerald-400 font-semibold">

                    {" "}Save Wellness Log

                  </span>

                  {" "}to receive a personalized AI wellness report.

                </p>

              </div>

            )}

          </div>

        </div>
                {/* Wellness Resources */}

        <div className="mt-10">

          {/* Videos */}
{/* Recommended Videos */}

<div className="mt-12">

  <h2 className="text-3xl font-bold mb-6">
    🎥 Recommended Videos
  </h2>

 <div className="flex flex-col items-center space-y-6">

    <a
  href="https://youtu.be/inpok4MKVLM"
  target="_blank"
  className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-emerald-500 transition-all hover:scale-105 max-w-2xl mx-auto"
>

      <img
        src="https://img.youtube.com/vi/inpok4MKVLM/maxresdefault.jpg"
        alt="Meditation"
        className="w-full h-52 object-cover"
      />

      <div className="p-6">

        <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full">
          YouTube
        </span>

        <h3 className="text-xl font-bold mt-4">

          Guided Meditation for Stress Relief

        </h3>

        <p className="text-gray-400 mt-2">

          Relax your mind in just 10 minutes with this beginner-friendly meditation.

        </p>

        <button className="mt-5 bg-emerald-500 hover:bg-emerald-600 px-5 py-2 rounded-xl font-semibold">

          ▶ Watch Now

        </button>

      </div>

    </a>

  </div>

</div>

          {/* Podcasts */}

      {/* Wellness Podcasts */}

<div className="mt-12">

  <h2 className="text-3xl font-bold mb-6">
    🎧 Wellness Podcasts
  </h2>

<div className="flex flex-col items-center space-y-6">

  {/* Podcast 1 */}

  <a
    href="https://open.spotify.com/show/5bC65RDvs3oxnLyqqvkUYX"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full max-w-2xl bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-green-500 transition-all hover:scale-105"
  >

    <img
      src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200"
      alt="Podcast"
      className="w-full h-52 object-cover"
    />

    <div className="p-6">

      <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
        Spotify
      </span>

      <h3 className="text-xl font-bold mt-4">
        The Daily Meditation Podcast
      </h3>

      <p className="text-gray-400 mt-2">
        Relax your mind, improve focus, and reduce stress with guided meditation.
      </p>

      <div className="flex justify-between items-center mt-5">

        <span className="text-green-400">
          ⭐ 4.9
        </span>

        <button className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-xl font-semibold">
          🎧 Listen
        </button>

      </div>

    </div>

  </a>

  {/* Podcast 2 */}

  <a
    href="https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full max-w-2xl bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-green-500 transition-all hover:scale-105"
  >

    <img
      src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200"
      alt="Podcast"
      className="w-full h-52 object-cover"
    />

    <div className="p-6">

      <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
        Spotify
      </span>

      <h3 className="text-xl font-bold mt-4">
        The Mindset Mentor
      </h3>

      <p className="text-gray-400 mt-2">
        Build confidence, improve mental health, and stay motivated every day.
      </p>

      <div className="flex justify-between items-center mt-5">

        <span className="text-green-400">
          ⭐ 4.8
        </span>

        <button className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-xl font-semibold">
          🎧 Listen
        </button>

      </div>

    </div>

  </a>

</div>

</div>

          {/* Wellness Centers */}

         {/* Nearby Wellness Centers */}

<div className="mt-12">

  <h2 className="text-3xl font-bold mb-6">
    📍 Nearby Wellness Centers
  </h2>

  <div className="space-y-6">

    {/* Center 1 */}

   <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-emerald-500 transition-all hover:scale-105 max-w-2xl mx-auto">

      <img
        src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200"
        alt="Yoga Center"
        className="w-full h-52 object-cover"
      />

      <div className="p-6">

        <div className="flex justify-between items-center">

          <h3 className="text-xl font-bold">
            Wellness Yoga Studio
          </h3>

          <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
            Open
          </span>

        </div>

        <p className="text-gray-400 mt-3">
          📍 MG Road, Bangalore
        </p>

        <p className="text-gray-400 mt-2">
          ⭐ 4.8 • Yoga • Meditation • Stress Relief
        </p>

        <a
          href="https://maps.google.com"
          target="_blank"
          className="inline-block mt-5 bg-emerald-500 hover:bg-emerald-600 px-5 py-2 rounded-xl font-semibold"
        >
          📍 View on Maps
        </a>

      </div>

    </div>

    {/* Center 2 */}

    <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-emerald-500 transition-all hover:scale-105 max-w-2xl mx-auto">

      <img
        src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200"
        alt="Therapy Center"
        className="w-full h-52 object-cover"
      />

      <div className="p-6">

        <div className="flex justify-between items-center">

          <h3 className="text-xl font-bold">
            MindCare Therapy Centre
          </h3>

          <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
            Open
          </span>

        </div>

        <p className="text-gray-400 mt-3">
          📍 Indiranagar, Bangalore
        </p>

        <p className="text-gray-400 mt-2">
          ⭐ 4.9 • Therapy • Counselling • Mental Wellness
        </p>

        <a
          href="https://maps.google.com"
          target="_blank"
          className="inline-block mt-5 bg-emerald-500 hover:bg-emerald-600 px-5 py-2 rounded-xl font-semibold"
        >
          📍 View on Maps
        </a>

      </div>

    </div>

  </div>

</div>

        </div>

      </div>

    </div>

  );
}