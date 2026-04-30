import { NextResponse } from "next/server";
const rateMap = new Map();
function checkRate(ip, limit = 10, window = 60000) {
  const now = Date.now();
  const entry = rateMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > window) { rateMap.set(ip, { count: 1, start: now }); return true; }
  if (entry.count >= limit) return false;
  rateMap.set(ip, { ...entry, count: entry.count + 1 });
  return true;
}
export async function POST(req) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "API key no configurada" }, { status: 500 });
const ip = req.headers.get("x-forwarded-for") || "local";
if (!checkRate(ip)) return NextResponse.json({ error: "Demasiadas peticiones. Espera un momento." }, { status: 429 });
    const { meal } = await req.json();
    if (!meal) return NextResponse.json({ error: "No se recibió descripción" }, { status: 400 });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        messages: [{
          role: "user",
          content: `Estima los macronutrientes de esta comida: "${meal}". Responde UNICAMENTE con JSON valido sin backticks ni texto extra: {"calorias":numero,"proteinas":numero,"carbohidratos":numero,"grasas":numero}. Estima cantidades razonables para una porcion normal de una mujer adulta.`
        }]
      }),
    });

    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data.error?.message || "Error API" }, { status: response.status });

    const txt = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("");
    const match = txt.match(/\{[\s\S]*?\}/);
    if (match) {
      try { return NextResponse.json(JSON.parse(match[0])); } catch {}
    }
    return NextResponse.json({ calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
