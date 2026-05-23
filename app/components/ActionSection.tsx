"use client";

import { motion } from "framer-motion";

const ORGS = [
  {
    name: "Lemkin Institute for Genocide Prevention",
    desc: "Documents ongoing genocides and advocates for international accountability.",
    url: "https://www.lemkininstitute.com",
  },
  {
    name: "Armenian National Committee of America",
    desc: "Largest Armenian-American grassroots organization working on recognition and rights.",
    url: "https://www.anca.org",
  },
  {
    name: "Aurora Humanitarian Initiative",
    desc: "Armenian-founded initiative honoring genocide survivors by aiding today's survivors worldwide.",
    url: "https://auroraprize.com",
  },
  {
    name: "Armenian Genocide Museum — Washington, D.C.",
    desc: "Educational archive with primary sources, survivor testimony, and research materials.",
    url: "https://armeniangenocidemuseum.org",
  },
];

export default function ActionSection() {
  return (
    <section className="bg-stone-900 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-red-700 text-xs uppercase tracking-[0.3em] mb-4">What you can do</p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-100 mb-4">Take action</h2>
          <p className="text-stone-400 leading-relaxed">
            Edmund Burke once wrote that all it takes for evil to rule is for good people to do nothing. The Armenians were not destroyed in a single act, but destroyed gradually, while the world watched and stayed silent. Every genocide in history has relied not only on the emotion of hatred, but on the other people's fear to act. You are not a bystander by accident. You become one by choice. Thus, the world only changes when ordinary people decide that human life is worth more than political regulations. That decision starts with you.
          </p>
        </motion.div>

        <div className="space-y-4 mb-16">
          {ORGS.map((org, i) => (
            <motion.a
              key={i}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="block border border-stone-700 p-5 hover:border-red-900/60 hover:bg-red-950/10 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-stone-200 font-medium mb-1 group-hover:text-red-300 transition-colors">
                    {org.name}
                  </h3>
                  <p className="text-stone-500 text-sm">{org.desc}</p>
                </div>
                <span className="text-stone-600 group-hover:text-red-700 transition-colors text-lg shrink-0">→</span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center border-t border-stone-800 pt-12"
        >
          <p className="text-stone-600 text-xs uppercase tracking-[0.3em] mb-3">
            April 24 · Armenian Genocide Remembrance Day
          </p>
          <p className="text-stone-400 text-sm italic">
            &quot;I should like to see any Power of the world destroy this race, this small tribe of unimportant
            people, whose wars have all been fought and lost, whose structures have crumbled, whose literature is
            unread, whose music is unheard, whose prayers are no more answered. Go ahead, destroy Armenia. See if
            you can do it. Send them into the desert without bread or water. Burn their homes and churches.
            Then see if they will not laugh, sing and pray again.&quot;
          </p>
          <p className="text-stone-600 text-xs mt-3">— William Saroyan, 1936</p>
        </motion.div>
      </div>
    </section>
  );
}
