"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PledgeSection() {
  const [count, setCount] = useState<number | null>(null);
  const [pledged, setPledged] = useState(false);
  const [animating, setAnimating] = useState(false);
  const displayRef = useRef<HTMLSpanElement>(null);
  const prevCount = useRef<number | null>(null);

  useEffect(() => {
    fetch("/api/pledge")
      .then((r) => r.json())
      .then((d) => setCount(d.count));
  }, []);

  // Animate counter when count changes
  useEffect(() => {
    if (count === null || prevCount.current === null) {
      prevCount.current = count;
      return;
    }
    const el = displayRef.current;
    if (!el || count === prevCount.current) {
      prevCount.current = count;
      return;
    }
    const from = prevCount.current;
    const to = count;
    const duration = 1200;
    const step = 16;
    let current = from;
    const increment = (to - from) / (duration / step);
    const timer = setInterval(() => {
      current = Math.min(current + increment, to);
      el.textContent = Math.round(current).toLocaleString();
      if (current >= to) clearInterval(timer);
    }, step);
    prevCount.current = to;
    return () => clearInterval(timer);
  }, [count]);

  async function handlePledge() {
    if (pledged || animating) return;
    setAnimating(true);
    const res = await fetch("/api/pledge", { method: "POST" });
    const data = await res.json();
    setCount(data.count);
    setPledged(true);
    setAnimating(false);
  }

  return (
    <section className="bg-stone-950 border-t border-stone-800 py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-stone-600 text-xs uppercase tracking-[0.3em] mb-6">
            Join the pledge
          </p>

          <AnimatePresence mode="wait">
            {!pledged ? (
              <motion.div
                key="pre"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.button
                  onClick={handlePledge}
                  disabled={animating}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative px-12 py-5 border-2 border-red-800 text-red-300 text-base uppercase tracking-[0.2em] font-medium hover:bg-red-900/20 transition-colors disabled:opacity-50"
                >
                  {animating ? (
                    <span className="inline-block w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "I will never stay silent"
                  )}
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="post"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-red-400 text-sm uppercase tracking-[0.2em] mb-4">
                  Your pledge is recorded.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-10"
          >
            <p className="text-stone-600 text-xs uppercase tracking-widest mb-2">
              People who have pledged
            </p>
            <p className="text-5xl md:text-6xl font-bold text-stone-200">
              <span ref={displayRef}>
                {count !== null ? count.toLocaleString() : "—"}
              </span>
            </p>
            <p className="text-stone-700 text-xs mt-3">and counting</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-stone-600 text-xs mt-10 leading-relaxed max-w-md mx-auto italic"
          >
            &ldquo;All it takes for evil to rule is for good people to do nothing.&rdquo;
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
