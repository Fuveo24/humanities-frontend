import { NextRequest, NextResponse } from "next/server";

type Payload = {
  age: number;
  gender: string;
  religion: string;
  ethnicity: string;
  location: string;
  occupation: string;
  socioeconomic_status: string;
};

// Heuristic fallback used when ML_BACKEND_URL is not set
function heuristic(d: Payload): number {
  let base = 50;

  const religion: Record<string, number> = {
    Armenian_Apostolic: -38, Armenian_Catholic: -35, Armenian_Protestant: -33,
    Assyrian_Christian: -32, Greek_Orthodox: -28, Jewish: -12, Muslim: +42,
  };
  const ethnicity: Record<string, number> = {
    Armenian: -33, Assyrian: -28, Greek: -22, Jewish: -8,
    Arab: 0, Kurdish: +10, Turkish: +38,
  };
  const location: Record<string, number> = {
    Eastern_Anatolia_Erzurum: -32, Eastern_Anatolia_Bitlis: -30,
    Eastern_Anatolia_Diyarbekir: -32, Eastern_Anatolia_Trabzon: -30,
    Eastern_Anatolia_Van: -22, Eastern_Anatolia_Harput: -30,
    Eastern_Anatolia_Sivas: -28, Eastern_Anatolia_Marash: -26,
    Eastern_Anatolia_Urfa: -26, Cilicia: -18,
    Syria_Aleppo: -15, Syria_Deir_ez_Zor: -35,
    Syria_Ras_al_Ayn: -32, Syria_Meskene: -30,
    Western_Anatolia: -12, Constantinople: +8,
  };
  const occupation: Record<string, number> = {
    Farmer: -5, Soldier_Conscript: -18, Clergy: -15, Teacher: -8,
    Merchant: +3, Doctor_Professional: +5, Artisan: -2,
    Domestic_Worker: +2, Student: 0, Child: +2,
  };

  base += religion[d.religion] ?? 0;
  base += ethnicity[d.ethnicity] ?? 0;
  base += location[d.location] ?? 0;
  base += occupation[d.occupation] ?? 0;
  if (d.gender === "Male") base -= 14;
  if (d.gender === "Female") base += 4;
  if (d.age < 13) base -= 8;
  else if (d.age < 18) base -= 4;
  else if (d.age > 45) base -= 18;
  if (d.socioeconomic_status === "High") base += 6;
  if (d.socioeconomic_status === "Low") base -= 4;

  return Math.min(98, Math.max(2, Math.round(base)));
}

export async function POST(req: NextRequest) {
  const body: Payload = await req.json();

  const backendUrl = process.env.ML_BACKEND_URL;
  if (backendUrl) {
    try {
      const res = await fetch(`${backendUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) return NextResponse.json(await res.json());
    } catch {
      // fall through to heuristic
    }
  }

  return NextResponse.json({ survival_probability: heuristic(body) });
}
