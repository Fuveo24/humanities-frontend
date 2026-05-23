"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ResultReveal from "./ResultReveal";

type FormState = {
  age_group: string;
  gender: string;
  religion: string;
  ethnicity: string;
  location: string;
  occupation: string;
  socioeconomic_status: string;
};

const INITIAL: FormState = {
  age_group: "",
  gender: "",
  religion: "",
  ethnicity: "",
  location: "",
  occupation: "",
  socioeconomic_status: "",
};

// Maps age_group label → numeric age sent to model
const AGE_MAP: Record<string, number> = {
  child: 8,
  teen: 15,
  adult: 30,
  elder: 55,
};

const FIELDS = [
  {
    key: "age_group" as const,
    label: "Age",
    options: [
      { value: "child", label: "Child (0–12)" },
      { value: "teen", label: "Teen (13–17)" },
      { value: "adult", label: "Adult (18–45)" },
      { value: "elder", label: "Elder (46+)" },
    ],
  },
  {
    key: "gender" as const,
    label: "Gender",
    options: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
    ],
  },
  {
    key: "religion" as const,
    label: "Religion",
    options: [
      { value: "Armenian_Apostolic", label: "Armenian Apostolic" },
      { value: "Armenian_Catholic", label: "Armenian Catholic" },
      { value: "Armenian_Protestant", label: "Armenian Protestant" },
      { value: "Assyrian_Christian", label: "Assyrian Christian" },
      { value: "Greek_Orthodox", label: "Greek Orthodox" },
      { value: "Jewish", label: "Jewish" },
      { value: "Muslim", label: "Muslim" },
    ],
  },
  {
    key: "ethnicity" as const,
    label: "Ethnicity",
    options: [
      { value: "Armenian", label: "Armenian" },
      { value: "Assyrian", label: "Assyrian" },
      { value: "Greek", label: "Greek" },
      { value: "Turkish", label: "Turkish" },
      { value: "Kurdish", label: "Kurdish" },
      { value: "Jewish", label: "Jewish" },
      { value: "Arab", label: "Arab" },
    ],
  },
  {
    key: "location" as const,
    label: "Location in the Ottoman Empire",
    options: [
      { value: "Eastern_Anatolia_Erzurum", label: "Erzurum" },
      { value: "Eastern_Anatolia_Van", label: "Van" },
      { value: "Eastern_Anatolia_Bitlis", label: "Bitlis" },
      { value: "Eastern_Anatolia_Diyarbekir", label: "Diyarbekir" },
      { value: "Eastern_Anatolia_Trabzon", label: "Trabzon" },
      { value: "Eastern_Anatolia_Harput", label: "Harput" },
      { value: "Eastern_Anatolia_Sivas", label: "Sivas" },
      { value: "Eastern_Anatolia_Marash", label: "Marash" },
      { value: "Eastern_Anatolia_Urfa", label: "Urfa" },
      { value: "Constantinople", label: "Constantinople (Istanbul)" },
      { value: "Western_Anatolia", label: "Western Anatolia (Smyrna)" },
      { value: "Cilicia", label: "Cilicia (Adana)" },
      { value: "Syria_Aleppo", label: "Syria — Aleppo" },
      { value: "Syria_Deir_ez_Zor", label: "Syria — Deir ez-Zor" },
      { value: "Syria_Ras_al_Ayn", label: "Syria — Ras al-Ayn" },
      { value: "Syria_Meskene", label: "Syria — Meskene" },
    ],
  },
  {
    key: "occupation" as const,
    label: "Occupation",
    options: [
      { value: "Farmer", label: "Farmer" },
      { value: "Merchant", label: "Merchant" },
      { value: "Artisan", label: "Artisan / Craftsman" },
      { value: "Doctor_Professional", label: "Doctor / Professional" },
      { value: "Teacher", label: "Teacher" },
      { value: "Clergy", label: "Clergy" },
      { value: "Soldier_Conscript", label: "Soldier / Conscript" },
      { value: "Domestic_Worker", label: "Domestic Worker" },
      { value: "Student", label: "Student" },
      { value: "Child", label: "Child (not working)" },
    ],
  },
  {
    key: "socioeconomic_status" as const,
    label: "Socioeconomic Status",
    options: [
      { value: "Low", label: "Low" },
      { value: "Medium", label: "Medium" },
      { value: "High", label: "High" },
    ],
  },
];

export default function PredictionForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const complete = Object.values(form).every(Boolean);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!complete) return;
    setLoading(true);
    try {
      const payload = {
        age: AGE_MAP[form.age_group],
        gender: form.gender,
        religion: form.religion,
        ethnicity: form.ethnicity,
        location: form.location,
        occupation: form.occupation,
        socioeconomic_status: form.socioeconomic_status,
      };
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResult(data.survival_probability);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setForm(INITIAL);
  }

  if (result !== null) {
    return <ResultReveal probability={result} formData={form} onReset={handleReset} />;
  }

  const filled = Object.values(form).filter(Boolean).length;
  const total = Object.keys(form).length;

  return (
    <section id="form" className="min-h-screen bg-stone-950 flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl"
      >
        <p className="text-red-700 text-xs uppercase tracking-[0.3em] mb-4">Step into history</p>
        <h2 className="text-3xl md:text-4xl font-bold text-stone-100 mb-3">
          Enter your 1915 profile
        </h2>
        <p className="text-stone-500 mb-2 text-sm leading-relaxed">
          These are the exact demographic factors that determined survival.
          The model was trained on 300 historical records drawn from academic sources.
        </p>
        <div className="flex items-center gap-2 mb-10">
          <div className="flex-1 h-px bg-stone-800">
            <div
              className="h-px bg-red-900 transition-all duration-500"
              style={{ width: `${(filled / total) * 100}%` }}
            />
          </div>
          <span className="text-stone-600 text-xs">{filled}/{total}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {FIELDS.map((field) => (
            <div key={field.key}>
              <label className="block text-stone-400 text-xs uppercase tracking-widest mb-3">
                {field.label}
              </label>
              <div className="flex flex-wrap gap-2">
                {field.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, [field.key]: opt.value }))}
                    className={`px-4 py-2 text-sm border transition-colors ${
                      form[field.key] === opt.value
                        ? "border-red-800 bg-red-900/30 text-red-300"
                        : "border-stone-700 text-stone-400 hover:border-stone-500"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <motion.button
            type="submit"
            disabled={!complete || loading}
            whileHover={complete ? { scale: 1.01 } : {}}
            className={`w-full py-4 text-sm uppercase tracking-widest font-medium transition-colors ${
              complete
                ? "bg-red-900 text-red-100 hover:bg-red-800 cursor-pointer"
                : "bg-stone-800 text-stone-600 cursor-not-allowed"
            }`}
          >
            {loading ? "Calculating…" : "Calculate my survival probability"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
