"use client";

import { useState } from "react";

export default function FitnessPage() {

  const [steps, setSteps] = useState("");
  const [exercise, setExercise] = useState("");
  const [sleep, setSleep] = useState("");
  const [goal, setGoal] = useState("");

  const [recommendation, setRecommendation] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const saveFitnessData = async () => {

    if (
      !steps ||
      !exercise ||
      !sleep ||
      !goal
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {

      setLoading(true);

      const email =
        localStorage.getItem("userEmail") ||
        "demo@gmail.com";

      localStorage.setItem(
        `fitness_${email}`,
        JSON.stringify({
          steps,
          exercise,
          sleep,
          goal,
        })
      );

      const response =
        await fetch(
          "/api/fitness-ai",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              steps,
              exercise,
              sleep,
              goal,

            }),
          }
        );

      const data =
        await response.json();

      setRecommendation(
        data.recommendation
      );

    } catch (error) {

      console.log(error);

      setRecommendation(
        "Unable to generate AI recommendation."
      );

    } finally {

      setLoading(false);

    }

  };  return (
    <div className="min-h-screen bg-black text-white p-6">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold mb-3">
            Daily Fitness Dashboard
          </h1>

         

        </div>

        {/* Input Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-8">
            Daily Fitness Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Steps */}
            <div>

              <label className="block mb-3 text-gray-400">
                🚶 Steps Walked
              </label>

              <input
                type="number"
                value={steps}
                onChange={(e) =>
                  setSteps(e.target.value)
                }
                placeholder="Enter today's steps"
                className="w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 outline-none focus:border-emerald-500"
              />

            </div>

            {/* Exercise */}
            <div>

              <label className="block mb-3 text-gray-400">
                🏃 Exercise Duration (minutes)
              </label>

              <input
                type="number"
                value={exercise}
                onChange={(e) =>
                  setExercise(e.target.value)
                }
                placeholder="Example: 45"
                className="w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 outline-none focus:border-emerald-500"
              />

            </div>

            {/* Sleep */}
            <div>

              <label className="block mb-3 text-gray-400">
                😴 Sleep Hours
              </label>

              <input
                type="number"
                value={sleep}
                onChange={(e) =>
                  setSleep(e.target.value)
                }
                placeholder="Example: 8"
                className="w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 outline-none focus:border-emerald-500"
              />

            </div>

            {/* Goal */}
            <div>

              <label className="block mb-3 text-gray-400">
                🎯 Fitness Goal
              </label>

              <select
                value={goal}
                onChange={(e) =>
                  setGoal(e.target.value)
                }
                className="w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 outline-none focus:border-emerald-500"
              >
                <option value="">
                  Select Goal
                </option>

                <option value="Weight Loss">
                  Weight Loss
                </option>

                <option value="Muscle Gain">
                  Muscle Gain
                </option>

                <option value="Maintain Fitness">
                  Maintain Fitness
                </option>

                <option value="Improve Endurance">
                  Improve Endurance
                </option>

              </select>

            </div>

          </div>

          <button
            onClick={saveFitnessData}
            disabled={loading}
            className="mt-8 w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-700 transition-all py-4 rounded-2xl font-semibold text-lg"
          >

            {loading
              ? "Generating AI Recommendation..."
              : "Get AI Recommendation"}

          </button>

        </div>
                {/* AI Recommendation */}

        <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-3">
            🤖 AI Fitness Recommendation
          </h2>

          <p className="text-gray-400 mb-6">
            Gemini AI analyzes your activity, exercise, sleep, and fitness goal to provide personalized guidance.
          </p>

          {loading ? (

            <div className="text-center py-10">

              <div className="animate-pulse text-emerald-400 text-xl font-semibold">

                Generating your personalized recommendation...

              </div>

            </div>

          ) : recommendation ? (

            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 whitespace-pre-wrap leading-8 text-gray-100">

              {recommendation}

            </div>

          ) : (

            <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 text-center">

              <p className="text-gray-400 text-lg">

                Your AI recommendation will appear here.

              </p>

              <p className="text-gray-500 mt-2">

                Fill in your fitness details above and click
                <span className="text-emerald-400 font-semibold">
                  {" "}Get AI Recommendation
                </span>.

              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}