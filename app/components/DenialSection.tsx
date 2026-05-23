"use client";

import { motion } from "framer-motion";

const RECOGNIZING = [
  "United States (2021)", "France", "Germany", "Canada", "Netherlands",
  "Russia", "Argentina", "Italy", "Vatican City", "Sweden", "Poland",
  "Greece", "Cyprus", "Lebanon", "Bolivia", "Brazil", "Chile",
];

export default function DenialSection() {
  return (
    <section className="bg-stone-950 py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-red-700 text-xs uppercase tracking-[0.3em] mb-4">The second crime</p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-100 mb-6">Denial</h2>
          <p className="text-stone-400 leading-relaxed mb-4">
            Since 1923, Turkey which replaced Ottoman Empire, has officially said that the Armenian Genocide never happened. Turkey admits that Armenians died, but claims it was because of the chaos of World War One and fighting between different groups, not because the government planned and organised their destruction.
          </p>
          <p className="text-stone-400 leading-relaxed mb-4">
            However, this denial is challenged by a huge amount of evidence. Ottoman government records, messages sent by American diplomats, letters written by German military officers (Germany was Turkey's ally in WWI and witnessed the killings firsthand), reports from missionaries, and the agreement of genocide historians and researchers from around the world all point to the same conclusion — that this was a planned and deliberate genocide.
          </p>
          <p className="text-stone-400 leading-relaxed">
            Raphael Lemkin, the man who actually invented the word <em className="text-stone-300">&quot;genocide&quot;</em> in
            1944, specifically pointed to what happened to the Armenians as one of his main examples when creating the term. He wrote:{" "}
            <span className="text-stone-300 italic">
              &quot;It happened to the Armenians, then Hitler got influenced.&quot;
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-stone-300 font-semibold mb-1">
            Countries that officially recognize the Armenian Genocide:
          </h3>
          <p className="text-stone-600 text-xs mb-6">
            The United States recognized it formally under President Biden in 2021, 106 years
            after the fact.
          </p>
          <div className="flex flex-wrap gap-2">
            {RECOGNIZING.map((c) => (
              <span
                key={c}
                className="text-xs px-3 py-1 border border-stone-700 text-stone-400"
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border border-red-900/40 bg-red-950/20 p-6"
        >
          <p className="text-stone-300 text-sm leading-relaxed">
            <span className="text-red-500 font-semibold">Why denial matters:</span> When the people responsible for a genocide are never punished, it can inspire others to do the same thing. The UN Genocide Convention was created in 1948 specifically to make sure genocide would never happen again. But the Armenian Genocide shows us that without properly recognising what happened and holding people accountable, history has a way of repeating itself. Adolf Hitler himself is reported to have said, just before invading Poland in 1939, 'Who today remembers the extermination of the Armenians?' suggesting that the world's silence over the Armenian Genocide gave him confidence that he too could get away with mass murder.
          </p>

        </motion.div>
      </div>
    </section>
  );
}
