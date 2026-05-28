"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 border-t border-stone-800/40 py-16 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Creator credit */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="text-stone-600 text-xs uppercase tracking-[0.4em] mb-4">
            Conceived, designed & built by
          </p>
          <p className="text-2xl md:text-3xl font-bold tracking-[0.15em] text-stone-300">
            Alan{" "}
            <span className="text-red-700">Nurlan</span>
          </p>
          <p className="text-stone-600 text-xs mt-3 tracking-widest uppercase">
            &copy; {year} · All rights reserved
          </p>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-stone-800" />
          <div className="w-1.5 h-1.5 rounded-full bg-red-900" />
          <div className="flex-1 h-px bg-stone-800" />
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center space-y-3"
        >
          <p className="text-stone-600 text-xs leading-relaxed max-w-xl mx-auto">
            This project was created for educational purposes. The survival probability
            model is trained on a historically-informed dataset and is intended to
            make the human cost of the Armenian Genocide personally felt — not to
            trivialise or gamify it.
          </p>
          <p className="text-stone-700 text-xs leading-relaxed max-w-xl mx-auto">
            Historical data drawn from academic sources including Raymond Kévorkian&apos;s{" "}
            <em>The Armenian Genocide: A Complete History</em>, U.S. State Department
            diplomatic records, and the Armenian Genocide Museum archives.
          </p>
        </motion.div>

        {/* Bottom line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-stone-800 text-xs mt-10 uppercase tracking-[0.3em]"
        >
          Never forget · Never again · Never silent
        </motion.p>

      </div>
    </footer>
  );
}
