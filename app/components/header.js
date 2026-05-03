"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Emerald green theme styles
  const linkStyle = (path) =>
    `px-4 py-2 text-sm font-medium transition-all duration-200 ${
      pathname === path 
        ? "text-emerald-400 bg-emerald-500/10 rounded-lg" 
        : "text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo with Emerald gradient */}
        <h1 className="text-2xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
          Fitness App
        </h1>

        {/* Navigation */}
        <nav className="flex gap-1">
            <Link href="/" className={linkStyle("/")}>
            Home
          </Link>
          <Link href="/fitness" className={linkStyle("/fitness")}>
            Fitness
          </Link>
          <Link href="/wellness" className={linkStyle("/wellness")}>
            Wellness
          </Link>
          <Link href="/activity" className={linkStyle("/activity")}>
            Activity
          </Link>
          <Link href="/profile" className={linkStyle("/profile")}>
            Profile
          </Link>
          <Link
          href="/login"
           className={linkStyle("/login")}
        >
          Login
        </Link>
        </nav>
      </div>
    </header>
  );
}