"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type FormData = {
  age_group: string;
  gender: string;
  religion: string;
  ethnicity: string;
  location: string;
  occupation: string;
  socioeconomic_status: string;
};

type Props = {
  probability: number;
  formData: FormData;
  onReset: () => void;
};

// Real notes from dataset.csv, grouped by survival range
const QUOTES = {
  very_low: [
    {
      note: "Deported May 1915; shot by gendarmerie in mass grave outside Erzurum. ~99% of Erzurum deportees never reached Syria.",
      profile: "Male, 35, Farmer — Erzurum",
    },
    {
      note: "Marched out of Harput with 800 other men; all executed in ravines before women's convoys assembled.",
      profile: "Male, 38, Farmer — Harput",
    },
    {
      note: "Survived the 1,000 km march only to be burned alive in a cave at Deir ez-Zor in August 1916.",
      profile: "Female, 32 — Deir ez-Zor",
    },
    {
      note: "Amele Taburu (labor battalion) conscript; worked to exhaustion then executed by military escorts.",
      profile: "Male, 24, Soldier — Trabzon",
    },
  ],
  low: [
    {
      note: "Meskene: 35,000 died there. She survived the entire march only to die of hunger weeks after arrival.",
      profile: "Female, 29 — Syria/Meskene",
    },
    {
      note: "Urfa Armenians attempted armed resistance; resistance crushed and all captured survivors massacred.",
      profile: "Male, 31 — Urfa",
    },
    {
      note: "Reached Ras al-Ayn; camp liquidated early 1916 — of 30,000 in the camp almost none survived.",
      profile: "Female, 44 — Ras al-Ayn",
    },
  ],
  medium: [
    {
      note: "Joined Van Armenian resistance (April 1915); held out until Russian army arrived, escaped to Transcaucasia.",
      profile: "Male, 18 — Van",
    },
    {
      note: "Taken in by Kurdish family in Dersim region; Dersim Kurds notably refused to participate and sheltered Armenians.",
      profile: "Female, 7 — Bitlis",
    },
    {
      note: "US consul in Smyrna (George Horton) documented cases of consulate-adjacent Armenians receiving protection.",
      profile: "Female, adult — Western Anatolia",
    },
    {
      note: "Taken into Turkish family as domestic servant; forcibly converted and given new name.",
      profile: "Male, 10 — Bitlis",
    },
  ],
  high: [
    {
      note: "Wealthy merchant used bribery and German business contacts to avoid deportation orders.",
      profile: "Male, 52, Merchant — Constantinople",
    },
    {
      note: "Employed by German military mission hospital; German officers provided limited protection to some Armenians.",
      profile: "Male, 30, Doctor — Constantinople",
    },
    {
      note: "Hid with Greek neighbors during police sweeps; urban environment allowed concealment unlike rural areas.",
      profile: "Female, 19 — Constantinople",
    },
    {
      note: "Son of a family with American missionary school connections; mission networks provided some protection.",
      profile: "Male, 7 — Constantinople",
    },
  ],
};

function getQuotes(p: number) {
  if (p < 15) return QUOTES.very_low;
  if (p < 35) return QUOTES.low;
  if (p < 60) return QUOTES.medium;
  return QUOTES.high;
}

function getColor(p: number) {
  if (p < 20) return "text-red-500";
  if (p < 45) return "text-orange-400";
  return "text-green-500";
}

const LOCATION_LABELS: Record<string, string> = {
  Eastern_Anatolia_Erzurum: "Erzurum",
  Eastern_Anatolia_Van: "Van",
  Eastern_Anatolia_Bitlis: "Bitlis",
  Eastern_Anatolia_Diyarbekir: "Diyarbekir",
  Eastern_Anatolia_Trabzon: "Trabzon",
  Eastern_Anatolia_Harput: "Harput",
  Eastern_Anatolia_Sivas: "Sivas",
  Eastern_Anatolia_Marash: "Marash",
  Eastern_Anatolia_Urfa: "Urfa",
  Constantinople: "Constantinople",
  Western_Anatolia: "Western Anatolia",
  Cilicia: "Cilicia",
  Syria_Aleppo: "Aleppo",
  Syria_Deir_ez_Zor: "Deir ez-Zor",
  Syria_Ras_al_Ayn: "Ras al-Ayn",
  Syria_Meskene: "Meskene",
};

function getReasons(f: FormData, p: number): string[] {
  const reasons: string[] = [];

  if (["Armenian_Apostolic", "Armenian_Catholic", "Armenian_Protestant", "Assyrian_Christian", "Greek_Orthodox"].includes(f.religion)) {
    reasons.push(`Your religion (${f.religion.replace(/_/g, " ")}) marked you as a primary target. Christian minorities were systematically deported and killed.`);
  } else if (f.religion === "Muslim") {
    reasons.push("Being Muslim dramatically increased survival odds — the genocide specifically targeted Christian minorities, not Muslims.");
  }

  if (["Armenian", "Assyrian", "Greek"].includes(f.ethnicity)) {
    reasons.push(`Your ethnicity (${f.ethnicity}) was one of the three peoples the Ottoman state sought to eliminate from Anatolia.`);
  } else if (f.ethnicity === "Turkish" || f.ethnicity === "Kurdish") {
    reasons.push(`${f.ethnicity} individuals were generally not targeted, though some Kurds were also victims of Ottoman repression.`);
  }

  if (f.gender === "Male" && f.age_group === "adult") {
    reasons.push("Adult men faced the highest death rate — they were the first separated from convoys and executed, often through Amele Taburu labor battalions.");
  } else if (f.gender === "Female") {
    reasons.push("Women faced different but devastating fates — many were abducted, forcibly converted, or taken as servants. Some survived this way.");
  }

  if (f.location.startsWith("Eastern_Anatolia")) {
    const region = LOCATION_LABELS[f.location] ?? f.location;
    reasons.push(`${region} was in the eastern provinces where deportations were near-total. Fewer than 10% of Armenians in this region survived.`);
  } else if (f.location === "Constantinople") {
    reasons.push("Constantinople Armenians survived longer due to foreign witnesses and embassy presence, but 700+ leaders were arrested on April 24, 1915.");
  } else if (f.location.startsWith("Syria")) {
    const region = LOCATION_LABELS[f.location] ?? f.location;
    reasons.push(`${region} was a destination of death marches. Those who survived the march often died in concentration camps there.`);
  }

  if (f.occupation === "Soldier_Conscript") {
    reasons.push("Armenian soldiers conscripted into the Ottoman army were disarmed and assigned to labor battalions (Amele Taburu), then systematically executed.");
  } else if (f.occupation === "Clergy") {
    reasons.push("Clergy were among the first arrested — spiritual leaders were explicitly targeted to destroy community cohesion.");
  } else if (f.occupation === "Doctor_Professional") {
    reasons.push(`Professionals${p > 40 ? " sometimes received temporary protection due to their skills" : " were targeted early — educated leaders were seen as a threat"}.`);
  }

  if (f.socioeconomic_status === "High") {
    reasons.push("Higher socioeconomic status offered some possibility of bribery or escape, but also made you a target for property confiscation.");
  }

  return reasons;
}

export default function ResultReveal({ probability, formData, onReset }: Props) {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;
    let start = 0;
    const duration = 2200;
    const step = 16;
    const increment = probability / (duration / step);
    const timer = setInterval(() => {
      start = Math.min(start + increment, probability);
      el.textContent = Math.round(start) + "%";
      if (start >= probability) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [probability]);

  const reasons = getReasons(formData, probability);
  const quotes = getQuotes(probability);
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <section className="min-h-screen bg-stone-950 flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl"
      >
        <p className="text-stone-500 text-xs uppercase tracking-[0.3em] mb-6 text-center">
          Your 1915 survival probability
        </p>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`text-8xl md:text-9xl font-bold mb-4 text-center ${getColor(probability)}`}
        >
          <span ref={counterRef}>0%</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="text-center text-stone-500 text-sm mb-10"
        >
          {probability < 20
            ? "You almost certainly would not have survived."
            : probability < 50
            ? "Your chances were slim. Survival would have required extraordinary luck or circumstance."
            : "You had a higher chance than most — but 'higher' still meant real danger."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="space-y-6"
        >
          {reasons.length > 0 && (
            <div className="bg-stone-900/60 border border-stone-800 p-6 space-y-3">
              <p className="text-stone-400 text-xs uppercase tracking-widest mb-4">
                Why this number
              </p>
              {reasons.map((r, i) => (
                <p key={i} className="text-stone-300 text-sm leading-relaxed flex gap-3">
                  <span className="text-red-800 mt-0.5 shrink-0">▸</span>
                  {r}
                </p>
              ))}
            </div>
          )}

          <div className="border-l-2 border-red-900 pl-5">
            <p className="text-stone-400 text-sm leading-relaxed italic mb-2">
              &ldquo;{quote.note}&rdquo;
            </p>
            <p className="text-stone-600 text-xs">{quote.profile} — from the historical record</p>
          </div>

          <p className="text-stone-500 text-sm text-center">
            Scroll down to learn more about what happened — and why it still matters.
          </p>

          <div className="text-center">
            <button
              onClick={onReset}
              className="text-xs text-stone-600 hover:text-stone-400 uppercase tracking-widest underline underline-offset-4 transition-colors"
            >
              Try a different profile
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
