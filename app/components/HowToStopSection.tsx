"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    word: "Educate",
    body: "Learn the warning signs. Genocide always follows the same pattern — classification, dehumanisation, organisation. When you see these signs happening anywhere in the world today, call it out by name.",
  },
  {
    word: "Speak",
    body: "Denial is what allows genocide to repeat. Every time you talk about the Armenian Genocide, you make denial slightly harder. Talk about it at school, at dinner, online. Make it impossible to ignore.",
  },
  {
    word: "Pressure",
    body: "Governments only act when their people demand it. Contact your representative. Sign petitions. Vote for leaders who take human rights seriously.",
  },
  {
    word: "Remember",
    body: "The Armenian Genocide happened because the world decided it was someone else's problem. Rwanda happened. Bosnia happened. Darfur happened. The pattern repeats every time we forget.",
  },
];

export default function HowToStopSection() {
  return (
    <section className="bg-stone-950 py-24 px-6 border-t border-stone-800/50">
      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <p className="text-red-700 text-xs uppercase tracking-[0.3em] mb-6">The question that matters</p>

          <p className="text-stone-300 text-2xl md:text-3xl font-light leading-snug mb-3">
            Genocide does not begin with weapons.
          </p>
          <p className="text-stone-500 text-2xl md:text-3xl font-light leading-snug">
            It begins with words. With silence. With looking away.
          </p>

          <div className="mt-8 h-px bg-gradient-to-r from-red-900/60 via-stone-700 to-transparent" />

          <p className="text-stone-200 text-xl md:text-2xl font-semibold mt-8">
            How do we stop it?
          </p>
        </motion.div>

        <div className="space-y-0">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.word}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex gap-6 py-8 border-b border-stone-800/60 last:border-0"
            >
              <div className="shrink-0 w-28 pt-0.5">
                <span className="text-red-600 text-sm uppercase tracking-[0.2em] font-semibold">
                  {step.word}
                </span>
              </div>
              <p className="text-stone-400 text-base leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
