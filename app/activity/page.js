"use client";

import { useState, useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

// Custom map marker
const customIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/684/684908.png",

  iconSize: [40, 40],

  iconAnchor: [20, 40],

  popupAnchor: [0, -35],
});

// Fitness centers
const FITNESS_CENTERS = [
  {
    name: "Cult MG Road",
    address: "Mangaluru",
    position: [12.9141, 74.856],
  },

  {
    name: "Zeus Fitness Club",
    address: "Kadri, Mangaluru",
    position: [12.8926, 74.842],
  },

  {
    name: "Gold's Gym",
    address: "Kodailbail",
    position: [12.87, 74.843],
  },
];

export default function ActivityPage() {

  const [stats, setStats] = useState({
    steps: 0,
    calories: 0,
    sleep: 0,
    water: 0,
    mood: "Neutral",
    stress: 0,
  });

  const [aiData, setAiData] = useState({
    advice: "",
    diet: "",
    recovery: "",
    workout: "",
    tasks: [],
  });

  const [recommendedTasks] = useState([
    "30 min treadmill cardio",
    "Drink lemon water after waking",
    "15 squats × 3 sets",
    "20-minute yoga session",
    "Take stairs instead of elevator",
    "Morning stretching routine",
    "Eat protein-rich breakfast",
    "10-minute meditation",
    "Cycling for 20 mins",
    "Avoid sugary drinks today",
    "Upper body workout",
    "Lower body strength training",
    "Go for an evening walk",
    "Foam rolling session",
    "Practice posture correction",
    "Eat more fruits today",
    "Hydrate every hour",
    "Core workout session",
  ]);

  const [customTasks, setCustomTasks] =
    useState([]);

  const [completedTasks, setCompletedTasks] =
    useState([]);

  // Add task
  const addTask = (task) => {

    if (!customTasks.includes(task)) {

      setCustomTasks([
        ...customTasks,
        task,
      ]);
    }
  };

  // Toggle task complete
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

  // Gemini AI fetch
  const fetchAI = async (data) => {

    try {

      const res = await fetch(
        "/api/activity-ai",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (result.success) {

        setAiData(result.data);
      }

    } catch (error) {

      console.log(
        "AI Error:",
        error
      );
    }
  };

  // Load localStorage data
  useEffect(() => {

    if (typeof window === "undefined")
      return;

    const email =
      localStorage.getItem(
        "userEmail"
      ) || "demo@gmail.com";

    const fitnessData =
      localStorage.getItem(
        `fitness_${email}`
      );

    const wellnessData =
      localStorage.getItem(
        `wellness_${email}`
      );

    const fitness = fitnessData
      ? JSON.parse(fitnessData)
      : {};

    const wellness = wellnessData
      ? JSON.parse(wellnessData)
      : {};

    const steps =
      Number(fitness.steps) || 0;

    const calories = Math.round(
      steps * 0.04
    );

    const finalStats = {
      steps,
      calories,
      sleep:
        Number(fitness.sleep) || 0,
      water:
        Number(wellness.water) || 0,
      mood:
        wellness.mood || "Neutral",
      stress:
        Number(wellness.stress) || 0,
    };

    setStats(finalStats);

    fetchAI(finalStats);

  }, []);

  return (

    <div className="min-h-screen bg-black text-white p-6">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h1 className="text-5xl font-bold mb-2">
          Wellness Dashboard
        </h1>

        <p className="text-gray-400 mb-10">
          Your personalized wellness
          insights and daily goals.
        </p>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-10">

          <div className="bg-zinc-900 p-6 rounded-3xl">

            <p className="text-gray-400">
              Steps
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {stats.steps}
            </h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-3xl">

            <p className="text-gray-400">
              Calories
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {stats.calories}
            </h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-3xl">

            <p className="text-gray-400">
              Sleep
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {stats.sleep} hrs
            </h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-3xl">

            <p className="text-gray-400">
              Stress
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {stats.stress}/10
            </h2>
          </div>
        </div>

        {/* Suggestion */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-3xl mb-10">

          <h2 className="text-3xl font-bold mb-4">
            Ultimate Suggestion
          </h2>

          <p className="text-lg text-gray-300 leading-8">
            {aiData.advice ||
              "Generating personalized advice..."}
          </p>
        </div>

        {/* Recommendation Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">

          <div className="bg-zinc-900 p-6 rounded-3xl">

            <h3 className="text-2xl font-bold mb-3">
              Diet Recommendation
            </h3>

            <p className="text-gray-300">
              {aiData.diet ||
                "Loading recommendation..."}
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-3xl">

            <h3 className="text-2xl font-bold mb-3">
              Workout Plan
            </h3>

            <p className="text-gray-300">
              {aiData.workout ||
                "Loading workout..."}
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-3xl">

            <h3 className="text-2xl font-bold mb-3">
              Recovery Tip
            </h3>

            <p className="text-gray-300">
              {aiData.recovery ||
                "Loading recovery tip..."}
            </p>
          </div>
        </div>

        {/* Tasks */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          {/* User Tasks */}
          <div className="bg-zinc-900 p-8 rounded-3xl">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-3xl font-bold">
                  Todays Tasks
                </h2>

                <p className="text-gray-400 mt-1">
                  Complete your wellness goals
                </p>
              </div>

              <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-2xl text-sm">

                {completedTasks.length}/
                {aiData.tasks.length +
                  customTasks.length}
              </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">

              {[...aiData.tasks,
                ...customTasks].map(
                (task, idx) => {

                  const completed =
                    completedTasks.includes(
                      task
                    );

                  return (

                    <div
                      key={idx}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                        completed
                          ? "bg-emerald-500/10 border-emerald-500/30"
                          : "bg-zinc-800 border-zinc-700"
                      }`}
                    >

                      <button
                        onClick={() =>
                          toggleTask(task)
                        }
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          completed
                            ? "bg-emerald-500 border-emerald-500"
                            : "border-zinc-500"
                        }`}
                      >

                        {completed &&
                          "✓"}
                      </button>

                      <p
                        className={`flex-1 ${
                          completed
                            ? "line-through text-gray-500"
                            : "text-white"
                        }`}
                      >
                        {task}
                      </p>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Recommended Tasks */}
          <div className="bg-zinc-900 p-8 rounded-3xl">

            <h2 className="text-3xl font-bold mb-2">
              Recommended Tasks
            </h2>

            <p className="text-gray-400 mb-6">
              Add extra fitness challenges
            </p>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">

              {recommendedTasks.map(
                (task, idx) => (

                  <div
                    key={idx}
                    className="bg-zinc-800 border border-zinc-700 p-4 rounded-2xl flex items-center justify-between"
                  >

                    <p className="text-gray-200">
                      {task}
                    </p>

                    <button
                      onClick={() =>
                        addTask(task)
                      }
                      className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                    >
                      Add
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Fitness Centers Map */}
        <div className="bg-zinc-900 p-6 rounded-3xl mb-20">

          <h2 className="text-3xl font-bold mb-5">
            Nearby Fitness Centers
          </h2>

          <div className="h-[500px] rounded-3xl overflow-hidden">

            <MapContainer
              center={[12.9141, 74.856]}
              zoom={12}
              className="h-full w-full"
            >

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {FITNESS_CENTERS.map(
                (gym, idx) => (

                  <Marker
                    key={idx}
                    position={gym.position}
                    icon={customIcon}
                  >

                    <Popup>

                      <div className="text-center">

                        <h3 className="font-bold text-lg">
                          {gym.name}
                        </h3>

                        <p className="text-gray-600">
                          {gym.address}
                        </p>

                        <button
                          className="mt-3 bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm"
                        >
                          View Location
                        </button>
                      </div>

                    </Popup>

                  </Marker>
                )
              )}

            </MapContainer>
          </div>
        </div>

      </div>
    </div>
  );
}