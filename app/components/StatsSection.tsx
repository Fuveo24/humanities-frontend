"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "1.5M", label: "Armenians killed", sub: "Conservative scholarly estimate" },
  { value: "75%+", label: "Of Ottoman Armenians", sub: "Proportion killed or displaced" },
  { value: "25+", label: "Countries recognizing it", sub: "As genocide under international law" },
  { value: "109", label: "Years of denial", sub: "Turkey still disputes the genocide classification" },
];

const METHODS = [
  { title: "Death Marches", body: "Deportees were forced to walk hundreds of miles into the Syrian desert with no food or water." },
  { title: "Mass Shootings", body: "Men were separated and shot in mass executions. The Deir ez-Zor massacres killed up to 200,000 in 1916 alone." },
  { title: "Starvation", body: "Concentration camps in the desert provided no food. Death rates from starvation and disease were catastrophic." },
  { title: "Forced Conversion", body: "Some women and children were spared through forced conversion to Islam and Turkish identity." },
  { title: "Dirty Labor", body: "Armenian men were forcefully put into labor battalions. Worked to exhaustion and executed." },
  { title: "Drowning", body: "Mass drownings in the Black Sea and Euphrates River were documented by American and German witnesses." },
  { title: "Burning", body: "There are cases of Armenians being forced inside buildings that were put on fire." },
  { title: "Kidnapping of children", body: "Many Armenian children were taken and raised as Turkish, completely erasing their identity." },
];

export default function StatsSection() {
  return (
    <section className="bg-stone-900 py-24 px-6">
      <div className="max-w-4xl mx-auto space-y-20">
        {/* Stats grid */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <p className="text-red-700 text-xs uppercase tracking-[0.3em] mb-4">The scale</p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-100">By the numbers</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-700">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-stone-900 p-6"
              >
                <p className="text-4xl font-bold text-red-600 mb-2">{stat.value}</p>
                <p className="text-stone-200 text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-stone-500 text-xs">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Methods */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <p className="text-red-700 text-xs uppercase tracking-[0.3em] mb-4">Methods</p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-100">How it was done</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-px bg-stone-700">
            {METHODS.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-stone-900 p-6"
              >
                <h3 className="text-stone-100 font-semibold mb-2 flex items-center gap-2">
                  <span className="text-red-800">▸</span> {m.title}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">{m.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
