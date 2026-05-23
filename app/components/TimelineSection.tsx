"use client";

import { motion } from "framer-motion";

const EVENTS = [
  {
    year: "1894–96",
    title: "Hamidian Massacres",
    body: "Sultan Abdul Hamid II orchestrates the killing of 80,000–300,000 Armenians. The pattern of mass murder begins. This early wave of violence shows the stages of Persecution and Extermination, as Armenians were targeted as a group and killed in large numbers for the first time.",
  },
  {
    year: "1908",
    title: "Young Turk Revolution",
    body: "The Committee of Union and Progress (CUP) seizes power. Initial promises of equality soon give way to Pan-Turkist ideology. This connects to the stages of Symbolisation and Discrimination, as Armenians were increasingly seen as outsiders who did not belong.",
  },
  {
    year: "1914–15",
    title: "Planning Begins",
    body: "The CUP starts removing Armenian soldiers from the army and forcing them into hard labour. This shows the stage of Organisation, as the government was quietly making plans to get rid of the Armenian population.",
  },
  {
    year: "April 24, 1915",
    title: "The Arrests Begin",
    body: "700 Armenian intellectuals and community leaders in Constantinople are arrested and executed. This is a clear example of Persecution, as the government deliberately targeted the most important and influential members of the Armenian community. This date is now commemorated as Armenian Genocide Remembrance Day.",
  },
  {
    year: "Summer 1915",
    title: "Mass Deportations",
    body: "Interior Minister Talat Pasha orders the deportation of all Armenians from Anatolia. Death marches into the Syrian desert begin. Starvation, rape, and massacre follow.",
  },
  {
    year: "1916",
    title: "Deir ez-Zor",
    body: "Hundreds of thousands of Armenians who survived the marches are massacred at Deir ez-Zor in the Syrian desert. This is the deadliest point of the genocide and represents the peak of the Extermination stage, where killing became the open and direct goal.",
  },
  {
    year: "1919–20",
    title: "Ottoman Courts-Martial",
    body: "After WWI defeat, Ottoman courts try and convict Talat, Enver, and Cemal Pasha in absentia for organizing the massacres. They are later assassinated by Armenian avengers. However, the new government that followed soon began to cover up what had happened, marking the beginning of the stage of Denial.",
  },
  {
    year: "1923",
    title: "Treaty of Lausanne",
    body: "The new Turkish Republic, under Mustafa Kemal, secures international recognition — and begins the state policy of denial that persists to this day.",
  },
];

export default function TimelineSection() {
  return (
    <section className="bg-stone-950 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-red-700 text-xs uppercase tracking-[0.3em] mb-4">How it happened</p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-100">Timeline</h2>
        </motion.div>

        <div className="relative border-l border-stone-800 pl-8 space-y-12">
          {EVENTS.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative"
            >
              <div className="absolute -left-[2.35rem] top-1 w-3 h-3 rounded-full bg-red-900 border border-red-700" />
              <p className="text-red-700 text-xs uppercase tracking-widest mb-1">{event.year}</p>
              <h3 className="text-stone-100 font-semibold text-lg mb-2">{event.title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{event.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
