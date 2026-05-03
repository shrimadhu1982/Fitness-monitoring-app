import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-emerald-500/30">
      
      {/* Hero Section */}
      <header className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-[128px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-6 tracking-tighter">
            Elevate Your Health
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            A comprehensive, data-driven system to monitor your fitness, track your wellness, and find your daily balance.
          </p>
          <Link href="/login">
            <button className="px-10 py-4 bg-emerald-500 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:bg-white hover:text-gray-950 hover:scale-105 shadow-lg shadow-emerald-500/20 active:scale-95">
              Get Started
            </button>
          </Link>
        </div>
      </header>

      {/* Benefits Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Smart Tracking", desc: "Log your daily steps, workouts, and physical progress with ease." },
            { title: "Nutritional Balance", desc: "Monitor caloric intake and hydration to fuel your body correctly." },
            { title: "Wellness Focus", desc: "Keep tabs on your sleep quality, mood fluctuations, and stress levels." }
          ].map((feature, i) => (
            <div key={i} className="p-8 bg-gray-900/50 border border-white/5 rounded-3xl hover:border-emerald-500/30 transition-all">
              <h3 className="text-xl font-bold mb-3 text-emerald-400">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl font-bold text-center mb-16">Simple 3-Step Process</h2>
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {[
            { num: "01", title: "Create Profile", text: "Set up your unique metrics and fitness goals." },
            { num: "02", title: "Track Daily", text: "Log your activities and wellness stats daily." },
            { num: "03", title: "Analyze Growth", text: "View your trends and optimize your lifestyle." }
          ].map((step, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="text-4xl font-black text-gray-800 mb-4">{step.num}</div>
              <h4 className="font-bold text-lg mb-2">{step.title}</h4>
              <p className="text-gray-500 text-sm">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

     
      
    </div>
  );
}