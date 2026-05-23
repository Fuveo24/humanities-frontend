"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// April 24, 1915 — the date of the first mass arrests in Constantinople
const GENOCIDE_START = new Date("1915-04-24T00:00:00Z");

function daysSince(): number {
  const now = new Date();
  const ms = now.getTime() - GENOCIDE_START.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

export default function HeroSection() {
  const [days, setDays] = useState<number | null>(null);

  // Hydrate on client only to avoid SSR mismatch
  useEffect(() => {
    setDays(daysSince());
    // Update at midnight
    const ms = new Date().setHours(24, 0, 0, 0) - Date.now();
    const t = setTimeout(() => setDays(daysSince()), ms);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center gradient-blood overflow-hidden px-6 text-center">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0ibTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <p className="text-red-700 text-sm uppercase tracking-[0.3em] mb-6 font-medium">
          Armenian Genocide · 1915–1923
        </p>

        <h1 className="text-5xl md:text-7xl font-bold text-stone-100 leading-tight mb-8 flicker">
          Would you have
          <br />
          <span className="text-red-800">survived?</span>
        </h1>

        {/* Days counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="inline-flex flex-col items-center border border-stone-800 px-8 py-4 mb-10"
        >
          <p className="text-stone-600 text-xs uppercase tracking-[0.3em] mb-1">
            Days since April 24, 1915
          </p>
          <p className="text-4xl md:text-5xl font-bold text-stone-300 tabular-nums">
            {days !== null ? days.toLocaleString() : "—"}
          </p>
          <p className="text-stone-600 text-xs mt-1 tracking-wide">
            without full international recognition
          </p>
        </motion.div>

        <p className="text-stone-400 text-lg md:text-xl leading-relaxed mb-12 max-w-xl mx-auto">
          Between 1915 and 1923, the Ottoman Empire systematically destroyed its
          Armenian, Assyrian, and Greek populations. Over{" "}
          <span className="text-stone-200 font-semibold">1.5 million people</span>{" "}
          were killed. Your demographics would have determined your fate.
        </p>

        <motion.a
          href="#form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="inline-block border border-red-900 text-red-400 px-8 py-3 text-sm uppercase tracking-widest hover:bg-red-900/20 transition-colors"
        >
          Find out your fate
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stone-600 text-xs tracking-widest uppercase"
      >
        scroll down
        <div className="mt-2 mx-auto w-px h-12 bg-gradient-to-b from-stone-600 to-transparent" />
      </motion.div>
    </section>
  );
}
