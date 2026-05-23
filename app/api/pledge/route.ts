import { NextRequest, NextResponse } from "next/server";

const BASE_COUNT = 1847;
// In-memory fallback for local dev when backend is not running
let localCount = BASE_COUNT;

async function proxyToBackend(method: "GET" | "POST") {
  const url = process.env.ML_BACKEND_URL;
  if (!url) return null;
  try {
    const res = await fetch(`${url}/pledge`, {
      method,
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) return res.json();
  } catch {
    // backend unreachable — fall through
  }
  return null;
}

export async function GET() {
  const data = await proxyToBackend("GET");
  if (data) return NextResponse.json(data);
  return NextResponse.json({ count: localCount });
}

export async function POST(_req: NextRequest) {
  const data = await proxyToBackend("POST");
  if (data) return NextResponse.json(data);
  localCount += 1;
  return NextResponse.json({ count: localCount });
}
