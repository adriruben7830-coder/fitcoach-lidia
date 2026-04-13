import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY not found in environment");
      return NextResponse.json({ error: "API key no configurada" }, { status: 500 });
    }

    const body = await req.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json({ error: "No se recibió imagen" }, { status: 400 });
    }

    console.log("Calling Anthropic API for food analysis...", { imageSize: image.length });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: "image/jpeg", data: image },
              },
              {
                type: "text",
                text: `Analiza esta comida y estima sus macronutrientes. Responde UNICAMENTE con un objeto JSON valido, sin backticks ni texto adicional:
{"alimento":"nombre del plato","calorias":numero,"proteinas":numero,"carbohidratos":numero,"grasas":numero,"fibra":numero,"valoracion":"una frase sobre si es buena opcion para ganar musculo y perder grasa","sugerencia":"una frase de como mejorar el plato para sus objetivos","puntuacion":numero_del_1_al_10}
Contexto: mujer 26 anos, 66.9kg, entrena en casa con programa Chloe Ting Hourglass, quiere ganar musculo en piernas/gluteos y reducir grasa corporal. Macros objetivo: 2100kcal, 130g proteina, 235g carbs, 58g grasa. No come pescado. Ya toma whey+creatina+colageno en batido matutino con leche soja.`,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic API error (food):", JSON.stringify(data));
      return NextResponse.json({ error: data.error?.message || "Error de la API" }, { status: response.status });
    }

    const txt = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    console.log("Food analysis raw response:", txt.slice(0, 200));

    // Extract JSON from response
    const match = txt.match(/\{[\s\S]*?\}/);
    if (match) {
      try {
        const parsed = JSON.parse(match[0]);
        return NextResponse.json(parsed);
      } catch (parseErr) {
        console.error("JSON parse error:", parseErr, "Raw:", match[0]);
      }
    }

    // Fallback if JSON extraction fails
    return NextResponse.json({
      alimento: "Comida analizada",
      calorias: "~",
      proteinas: "~",
      carbohidratos: "~",
      grasas: "~",
      fibra: "~",
      valoracion: txt.slice(0, 200),
      sugerencia: "Intenta con una foto más clara",
      puntuacion: "-",
    });
  } catch (e) {
    console.error("Food route error:", e);
    return NextResponse.json({ error: e.message || "Error interno" }, { status: 500 });
  }
}
