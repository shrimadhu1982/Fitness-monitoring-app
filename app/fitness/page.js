"use client";
import { useState, useEffect } from "react";

const RECOMMENDED_VIDEOS = [
  { title: "10 Min Morning Yoga", url: "https://www.youtube.com/watch?v=v7AYKMP6rOE", category: "Sleep/Recovery" },
  { title: "Full Body HIIT", url: "https://www.youtube.com/watch?v=UBMk30rjy0o", category: "Steps/Calories" },
  { title: "15 Min Walk at Home", url: "https://www.youtube.com/watch?v=C_rKOIJTB6A", category: "Steps" },
];

const FITNESS_CENTERS = [
  { name: "Cult MG Road", address: "Inland Avenue, MG Rd, Mangaluru", id: "ChIJVWISMyFbozsRQN-i0QIBGZI" },
  { name: "Zeus Fitness Club", address: "Shivabagh, Kadri, Mangaluru", id: "ChIJ85lagU9aozsRFjGRuyzdVBE" },
  { name: "Abbsolute Gym (Gold's)", address: "Boloor, Kodailbail, Mangaluru", id: "ChIJ8_Xsj0haozsRynS_8yLR020" },
];

const getYoutubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default function Fitness() {
  const [steps, setSteps] = useState("");
  const [calories, setCalories] = useState("");
  const [sleep, setSleep] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      const data = JSON.parse(localStorage.getItem(`fitness_${email}`) || "{}");
      setSteps(data.steps || "");
      setCalories(data.calories || "");
      setSleep(data.sleep || "");
    }
  }, []);

  const handleSave = () => {
    const email = localStorage.getItem("userEmail");
    if (!email) return alert("User not logged in");
    if (steps < 0 || calories < 0 || sleep < 0) return alert("Values cannot be negative");

    localStorage.setItem(`fitness_${email}`, JSON.stringify({ steps, calories, sleep }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const renderLocationCards = (items, title) => (
    <div className="mt-12">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((place, idx) => (
          <a 
            key={idx} 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.address)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer flex flex-col gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="bg-gray-800 p-3 rounded-xl group-hover:bg-emerald-500/20 transition-colors shrink-0">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-bold text-lg break-words pr-8">
                  {place.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1 break-words">
                  {place.address}
                </p>
              </div>
            </div>
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-emerald-500 font-bold text-sm">View →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Daily Fitness Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Steps", val: steps, set: setSteps, icon: "🏃" },
            { label: "Calories", val: calories, set: setCalories, icon: "🔥" },
            { label: "Sleep (hrs)", val: sleep, set: setSleep, icon: "🌙" },
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-emerald-500/30 transition-colors">
              <label className="text-gray-400 text-sm mb-2 block">{item.icon} {item.label}</label>
              <input
                type="number"
                value={item.val}
                onChange={(e) => item.set(e.target.value)}
                className="w-full text-3xl bg-transparent text-white outline-none"
                placeholder="0"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className={`w-full py-4 rounded-xl font-bold transition-all ${isSaved ? "bg-emerald-600" : "bg-emerald-500 hover:bg-emerald-600"} text-black`}
        >
          {isSaved ? "Saved Successfully!" : "Save Daily Stats"}
        </button>

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-white mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RECOMMENDED_VIDEOS.map((video, idx) => {
              const videoId = getYoutubeId(video.url);
              return (
                <a key={idx} href={video.url} target="_blank" rel="noopener noreferrer" className="group bg-gray-900 rounded-2xl border border-gray-800 hover:border-emerald-500/30 transition-all overflow-hidden flex flex-col">
                  <div className="relative aspect-video overflow-hidden bg-gray-800">
                    {videoId && (
                      <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.target.style.display = 'none'; }} />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1">{video.category}</p>
                    <p className="text-white font-medium line-clamp-1">{video.title}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Nearby Fitness Centers Section */}
        {renderLocationCards(FITNESS_CENTERS, "Nearby Fitness Centers")}
      </div>
    </div>
  );
}