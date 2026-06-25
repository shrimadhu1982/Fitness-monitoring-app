"use client";

import { useState, useEffect } from "react";

export default function FitnessPage() {

  const [steps, setSteps] = useState("");
  const [sleep, setSleep] = useState("");

  const [completedTasks, setCompletedTasks] =
    useState([]);

  // ALL possible tasks
  const ALL_TASKS = [

    // Walking
    "Complete 10,000 total steps",
    "Walk for 45 minutes outdoors",
    "Take stairs instead of elevator",
    "Morning 20-minute walk",
    "Evening recovery walk",

    // Workout
    "15 pushups × 3 sets",
    "20 squats × 3 sets",
    "1-minute plank × 3",
    "30-minute full body workout",
    "Upper body strength session",
    "Lower body training session",
    "20-minute HIIT workout",
    "Core strengthening workout",
    "Stretching session for 15 mins",
    "10 burpees × 3 sets",

    // Recovery
    "Sleep before 11 PM",
    "Foam rolling for 10 mins",
    "Take a cold shower recovery",
    "Meditate for 10 minutes",
    "Deep breathing exercises",

    // Nutrition
    "Drink 3L of water",
    "Eat a protein-rich breakfast",
    "Avoid sugary drinks today",
    "Eat fruits during snack time",
    "No junk food today",
    "Increase vegetable intake",

    // Lifestyle
    "Limit screen time before sleep",
    "Stand and stretch every hour",
    "Practice posture correction",
    "Spend 15 mins in sunlight",
    "Journal your fitness progress",

    // Cardio
    "Cycling for 30 mins",
    "Jump rope for 10 mins",
    "Dance workout session",
    "Jog for 20 minutes",
  ];

  const [tasks, setTasks] =
    useState([]);

  // Generate random tasks
  const generateTasks = () => {

    let filteredTasks =
      [...ALL_TASKS];

    // Low activity tasks
    if (Number(steps) < 3000) {

      filteredTasks = [
        ...filteredTasks,

        "Walk extra 3000 steps today",
        "Complete an outdoor walk",
      ];
    }

    // Low sleep tasks
    if (Number(sleep) < 6) {

      filteredTasks = [
        ...filteredTasks,

        "Take a recovery stretch session",
        "Avoid caffeine at night",
        "Prioritize recovery today",
      ];
    }

    // Shuffle tasks
    const shuffled =
      filteredTasks.sort(
        () => 0.5 - Math.random()
      );

    // Select 10
    const selected =
      shuffled.slice(0, 10);

    setTasks(selected);
  };

  // Generate initial tasks
  useEffect(() => {

    generateTasks();

  }, []);

  // Toggle complete
  const toggleTask = (task) => {

    if (completedTasks.includes(task)) {

      setCompletedTasks(
        completedTasks.filter(
          (t) => t !== task
        )
      );

    } else {

      setCompletedTasks([
        ...completedTasks,
        task,
      ]);
    }
  };

  // Save fitness data
  const saveFitnessData = () => {

    const email =
      localStorage.getItem(
        "userEmail"
      ) || "demo@gmail.com";

    localStorage.setItem(
      `fitness_${email}`,

      JSON.stringify({
        steps: Number(steps),
        sleep: Number(sleep),
      })
    );

    // Refresh tasks
    generateTasks();

    // Reset progress
    setCompletedTasks([]);

    alert(
      "Fitness data saved & tasks updated!"
    );
  };

  return (

    <div className="min-h-screen bg-black text-white p-6">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold mb-3">
            Fitness Tracker
          </h1>

          <p className="text-gray-400 text-lg">
            Track your health and complete
            todays fitness missions.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Daily Fitness Input
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Steps */}
            <div>

              <label className="block mb-3 text-gray-400">
                Steps Walked
              </label>

              <input
                type="number"
                value={steps}
                onChange={(e) =>
                  setSteps(e.target.value)
                }
                className="w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 outline-none focus:border-emerald-500"
                placeholder="Enter today's steps"
              />
            </div>

            {/* Sleep */}
            <div>

              <label className="block mb-3 text-gray-400">
                Sleep Hours
              </label>

              <input
                type="number"
                value={sleep}
                onChange={(e) =>
                  setSleep(e.target.value)
                }
                className="w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 outline-none focus:border-emerald-500"
                placeholder="Enter sleep hours"
              />
            </div>
          </div>

          <button
            onClick={saveFitnessData}
            className="mt-8 w-full bg-emerald-500 hover:bg-emerald-600 transition-all py-4 rounded-2xl font-semibold text-lg"
          >
            Save Fitness Data
          </button>
        </div>

        {/* Task Section */}
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold">
                Todays Fitness Missions
              </h2>

              <p className="text-gray-400 mt-2">
                Your personalized fitness tasks
                based on your inputs.
              </p>
            </div>

            <div className="bg-emerald-500/20 text-emerald-400 px-5 py-2 rounded-2xl text-sm">

              {completedTasks.length}/
              {tasks.length} Completed
            </div>
          </div>

          <div className="space-y-5">

            {tasks.map((task, idx) => {

              const completed =
                completedTasks.includes(task);

              return (

                <div
                  key={idx}
                  className={`flex items-center gap-5 p-5 rounded-3xl transition-all border ${
                    completed
                      ? "bg-emerald-500/10 border-emerald-500/30"
                      : "bg-zinc-800 border-zinc-700 hover:border-emerald-500/40"
                  }`}
                >

                  <button
                    onClick={() =>
                      toggleTask(task)
                    }
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                      completed
                        ? "bg-emerald-500 border-emerald-500"
                        : "border-zinc-500"
                    }`}
                  >

                    {completed && (
                      <span className="text-black font-bold text-sm">
                        ✓
                      </span>
                    )}
                  </button>

                  <div className="flex-1">

                    <p
                      className={`text-lg ${
                        completed
                          ? "line-through text-gray-500"
                          : "text-white"
                      }`}
                    >
                      {task}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Daily fitness challenge
                    </p>
                  </div>

                  <div
                    className={`text-xs px-4 py-2 rounded-full ${
                      completed
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-zinc-700 text-gray-300"
                    }`}
                  >
                    {completed
                      ? "Done"
                      : "Pending"}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}