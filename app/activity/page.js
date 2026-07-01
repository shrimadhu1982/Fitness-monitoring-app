"use client";

import { useState, useEffect } from "react";

export default function ActivityPage() {

  const [steps, setSteps] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [exercise, setExercise] = useState(0);
  const [goal, setGoal] = useState("");
  const [water, setWater] = useState(0);
  const [mood, setMood] = useState("N/A");
  const [stress, setStress] = useState(0);
  const [calories, setCalories] = useState(0);
const [workout, setWorkout] = useState("");
const [diet, setDiet] = useState("");
const [recovery, setRecovery] = useState("");
const [tasks, setTasks] = useState("");

const [loadingAI, setLoadingAI] = useState(false);
  useEffect(() => {

    const email =
      localStorage.getItem("userEmail") ||
      "demo@gmail.com";

    // Fitness Data
    const fitness = JSON.parse(
      localStorage.getItem(`fitness_${email}`) || "{}"
    );

    // Wellness Data
    const wellness = JSON.parse(
      localStorage.getItem(`wellness_${email}`) || "{}"
    );

    setSteps(Number(fitness.steps) || 0);
    setSleep(Number(fitness.sleep) || 0);
    setExercise(Number(fitness.exercise) || 0);
    setGoal(fitness.goal || "");

    setWater(Number(wellness.water) || 0);
    setMood(wellness.mood || "N/A");
    setStress(Number(wellness.stress) || 0);

    // Calories estimation
    setCalories(Math.round((Number(fitness.steps) || 0) * 0.04));

  }, []);
  useEffect(() => {

  if (steps || sleep || water) {

    generateAI();

  }

}, [steps, sleep, water, mood, stress, exercise, goal]);
  const generateAI = async () => {

  try {

    setLoadingAI(true);

    const response = await fetch("/api/activity-ai", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        steps,
        sleep,
        water,
        mood,
        stress,
        exercise,
        goal,

      }),

    });

    const data = await response.json();

    setWorkout(data.workout);
    setDiet(data.diet);
    setRecovery(data.recovery);
    setTasks(data.tasks);

  }

  catch (error) {

    console.log(error);

  }

  finally {

    setLoadingAI(false);

  }

};
  return (

<div className="min-h-screen bg-[#050816] text-white py-10">

  <div className="max-w-7xl mx-auto px-8">

    {/* Heading */}

    <h1 className="text-4xl font-bold mb-8">

      Your Activity

    </h1>

    {/* Top Grid */}

    <div className="grid md:grid-cols-2 gap-6">

      {/* Steps */}

      <div className="bg-[#111827] rounded-2xl p-5 border border-gray-800">

        <div className="flex justify-between mb-3">

          <span className="text-gray-400">

            Steps

          </span>

          <span>

            <b>{steps}</b>

            <span className="text-gray-500 text-sm">

              {" "}steps

            </span>

          </span>

        </div>

        <div className="w-full h-2 bg-gray-700 rounded-full">

          <div
            className="h-2 bg-emerald-500 rounded-full"
            style={{
              width: `${Math.min(
                (steps / 10000) * 100,
                100
              )}%`,
            }}
          />

        </div>

      </div>

      {/* Calories */}

      <div className="bg-[#111827] rounded-2xl p-5 border border-gray-800">

        <div className="flex justify-between mb-3">

          <span className="text-gray-400">

            Calories

          </span>

          <span>

            <b>{calories}</b>

            <span className="text-gray-500 text-sm">

              {" "}kcal

            </span>

          </span>

        </div>

        <div className="w-full h-2 bg-gray-700 rounded-full">

          <div
            className="h-2 bg-orange-500 rounded-full"
            style={{
              width: `${Math.min(
                (calories / 500) * 100,
                100
              )}%`,
            }}
          />

        </div>

      </div>

      {/* Sleep */}

      <div className="bg-[#111827] rounded-2xl p-5 border border-gray-800">

        <div className="flex justify-between mb-3">

          <span className="text-gray-400">

            Sleep

          </span>

          <span>

            <b>{sleep}</b>

            <span className="text-gray-500 text-sm">

              {" "}hrs

            </span>

          </span>

        </div>

        <div className="w-full h-2 bg-gray-700 rounded-full">

          <div
            className="h-2 bg-blue-500 rounded-full"
            style={{
              width: `${Math.min(
                (sleep / 8) * 100,
                100
              )}%`,
            }}
          />

        </div>

      </div>

      {/* Water */}

      <div className="bg-[#111827] rounded-2xl p-5 border border-gray-800">

        <div className="flex justify-between mb-3">

          <span className="text-gray-400">

            Water

          </span>

          <span>

            <b>{water}</b>

            <span className="text-gray-500 text-sm">

              {" "}L

            </span>

          </span>

        </div>

        <div className="w-full h-2 bg-gray-700 rounded-full">

          <div
            className="h-2 bg-cyan-500 rounded-full"
            style={{
              width: `${Math.min(
                (water / 3) * 100,
                100
              )}%`,
            }}
          />

        </div>

      </div>

    </div>
        {/* Mood & Stress */}

    <div className="mt-6">

      <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">

        <div className="flex justify-between items-start">

          {/* Mood */}

          <div>

            <p className="text-gray-400 text-sm">

              Mood

            </p>

            <h2 className="text-2xl font-bold mt-2">

              {mood}

            </h2>

          </div>

          {/* Stress */}

          <div className="text-right">

            <p className="text-gray-400 text-sm">

              Stress

            </p>

            <h2
              className={`text-3xl font-bold mt-2 ${
                stress <= 3
                  ? "text-emerald-400"
                  : stress <= 6
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >

              {stress} / 10

            </h2>

          </div>

        </div>

      </div>

    </div>
    {/* AI Personalized Recommendations */}

<div className="mt-8">

  <h2 className="text-3xl font-bold mb-6">

    🤖 AI Personalized Recommendations

  </h2>

  {loadingAI ? (

    <div className="bg-[#111827] rounded-2xl p-8 border border-gray-800 text-center">

      <h3 className="text-2xl font-bold text-emerald-400 animate-pulse">

        Generating your personalized plan...

      </h3>

      <p className="text-gray-400 mt-3">

        Please wait...

      </p>

    </div>

  ) : (

    <div className="grid md:grid-cols-2 gap-6">

      {/* Workout */}

      <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">

        <h3 className="text-xl font-bold mb-4">

          🏋️ Workout Plan

        </h3>

        <pre className="whitespace-pre-wrap text-gray-300">

          {workout}

        </pre>

      </div>

      {/* Diet */}

      <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">

        <h3 className="text-xl font-bold mb-4">

          🍎 Diet Recommendation

        </h3>

        <pre className="whitespace-pre-wrap text-gray-300">

          {diet}

        </pre>

      </div>

      {/* Recovery */}

      <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">

        <h3 className="text-xl font-bold mb-4">

          😴 Recovery Tips

        </h3>

        <pre className="whitespace-pre-wrap text-gray-300">

          {recovery}

        </pre>

      </div>

      {/* Tasks */}

      <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">

        <h3 className="text-xl font-bold mb-4">

          ✅ Daily Tasks

        </h3>

        <pre className="whitespace-pre-wrap text-gray-300">

          {tasks}

        </pre>

      </div>

    </div>

  )}

</div>
      </div>
      

</div>


);

}