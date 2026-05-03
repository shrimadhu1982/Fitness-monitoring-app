"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Your existing logic remains fully intact
  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    if (!isLogin && !name) {
      alert("Enter your name");
      return;
    }

    const url = isLogin ? "/api/login" : "/api/register";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      let data;
      try { data = await res.json(); } catch { alert("Invalid server response"); return; }

      if (!res.ok) { alert(data.error || "Something went wrong"); return; }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", email);
        alert("Login successful");
        router.push("/");
      } else {
        const loginRes = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const loginData = await loginRes.json();
        if (loginRes.ok) {
          localStorage.setItem("token", loginData.token);
          localStorage.setItem("userEmail", email);
          router.push("/fitness");
        } else {
          alert("Registered, but auto-login failed. Please login manually.");
          setIsLogin(true);
        }
      }
    } catch (error) {
      console.error("Frontend Error:", error);
      alert("Server error. Try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-950 p-6 overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[128px]" />
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md bg-gray-900/50 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/5 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-400">
            {isLogin ? "Sign in to your dashboard" : "Join us to start tracking"}
          </p>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-4 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-4 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-8 py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
        >
          {isLogin ? "Log In" : "Register"}
        </button>

        <p
          className="text-center text-sm text-gray-500 mt-6 cursor-pointer hover:text-emerald-400 transition"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}