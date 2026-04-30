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
    const { image } = await req.json();
    if (!image) return NextResponse.json({ error: "No se recibió imagen" }, { status: 400 });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: "image/jpeg", data: image } },
            { type: "text", text: `Analiza esta comida y estima sus macronutrientes. Responde UNICAMENTE con JSON valido sin backticks:
{"alimento":"nombre del plato","calorias":numero,"proteinas":numero,"carbohidratos":numero,"grasas":numero,"fibra":numero,"valoracion":"frase corta","sugerencia":"frase corta","puntuacion":numero_1_al_10}
Contexto: mujer 26 anos, 66.9kg, objetivo GANAR masa muscular hasta 70kg. Macros: 2400kcal, 145g proteina, 270g carbs, 67g grasa. No come pescado.` }
          ]
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
    return NextResponse.json({ alimento: "Comida", calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0, valoracion: txt.slice(0, 200), sugerencia: "", puntuacion: "-" });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
