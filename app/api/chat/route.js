import { NextResponse } from "next/server";

const SYSTEM = `Eres FitCoach, el entrenador personal y nutricionista de Lidia. Eres cercana, motivadora y profesional.

DATOS DE LIDIA:
- Edad: 26 años, Altura: 1.68m, Peso: 66.9kg
- IMC: 23.7, Grasa corporal: 32.9%, Masa muscular: 42kg
- BMR: 1382kcal, Músculo esquelético: 46.2%, Agua: 47%
- Grasa visceral: 4.9, Grasa subcutánea: 21.5%

OBJETIVO: Recomposición corporal - figura reloj de arena. Ganar músculo en piernas, glúteos y caderas. Reducir grasa del 32.9% a ~25%. El peso objetivo (60kg) es orientativo.

ENTRENA EN CASA con: esterilla, 3 pares de lastres/tobilleras, 1 banda elástica, mancuernas de 3kg y 5kg, y una barra con 2 discos de 5kg y 2 discos de 2kg.
Sigue el programa Hourglass 2024 de Chloe Ting (26 días, foco glúteos y core). Cuando lo acaba lo vuelve a empezar.

ALIMENTACIÓN:
- Desayuno fijo: batido de 250ml leche soja 0% azúcar + 30g whey + 5g creatina + 10g colágeno peptides
- Almuerzo fijo: café con leche de soja + mini bocata de jamón dulce y queso (cantidades de cafetería)
- NO come pescado
- Suplementos: whey, creatina 5g/día, colágeno peptides 10g, hairburst/iraltone cabello

MACROS DIARIOS: ~2100kcal, 130g proteína, 235g carbohidratos, 58g grasa.

REGLAS:
- Español siempre. Máximo 3 párrafos. Usa su nombre.
- Algún emoji con moderación (💪🔥✨).
- Basa consejos en evidencia científica.
- Si pregunta algo médico, recomienda profesional.
- Alternativas al pescado: pollo, pavo, huevos, legumbres, tofu, soja.
- Recuérdale que la creatina y el whey ya los toma en su batido matutino, perfecto.
- Si pregunta por ejercicios, complementa su programa Chloe Ting, no lo reemplaces.
- Si pregunta por material nuevo, recomienda más discos para la barra o mancuernas más pesadas.`;

export async function POST(req) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY not found in environment");
      return NextResponse.json({ error: "API key no configurada en el servidor" }, { status: 500 });
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No se recibieron mensajes" }, { status: 400 });
    }

    console.log("Calling Anthropic API for chat...", { messageCount: messages.length });

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
        system: SYSTEM,
        messages: messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic API error:", JSON.stringify(data));
      return NextResponse.json({ error: data.error?.message || "Error de la API de Claude" }, { status: response.status });
    }

    const text = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    if (!text) {
      console.error("Empty response from Anthropic:", JSON.stringify(data));
      return NextResponse.json({ error: "Respuesta vacía de Claude" }, { status: 500 });
    }

    return NextResponse.json({ text });
  } catch (e) {
    console.error("Chat route error:", e);
    return NextResponse.json({ error: e.message || "Error interno del servidor" }, { status: 500 });
  }
}
