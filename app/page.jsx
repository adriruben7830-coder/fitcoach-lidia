"use client";
import { useState, useRef, useEffect } from "react";
import { Home, Dumbbell, UtensilsCrossed, MessageCircle, Camera, TrendingUp, Clock, Send, X, ChevronDown, ChevronUp, Pencil, Trash2, Plus, Check, Loader } from "lucide-react";

/* ═══════ PROFILE — UPDATED GOAL ═══════ */
const P = {
  name: "Lidia", age: 26, height: 168, weight: 66.9, targetWeight: 70,
  bmi: 23.7, bodyFat: 32.9, muscleMass: 42.0, bmr: 1382,
  skeletalMuscle: 46.2, water: 47.0, visceralFat: 4.9,
  protein: 16.0, boneMass: 2.7, subcutaneousFat: 21.5,
  supplements: ["Whey 30g", "Creatina 5g", "Colágeno 10g", "Hairburst"],
  equipment: ["Esterilla", "3× Lastres", "Banda", "Mancuernas 3kg", "Mancuernas 5kg", "Barra + discos"],
};
// Updated for muscle gain (caloric surplus)
const MACROS = { calories: 2400, protein: 145, carbs: 270, fat: 67 };

/* ═══════ MEALS ═══════ */
const DEFAULT_MEALS = [
  { label: "Lunes", meals: [
    { time: "🌅 Desayuno", desc: "Batido: 250ml leche soja 0% + 30g whey + 5g creatina + 10g colágeno.", cal: 280, prot: 35, carbs: 15, fat: 5 },
    { time: "☕ Almuerzo", desc: "Café con leche soja + mini bocata jamón dulce y queso.", cal: 280, prot: 14, carbs: 30, fat: 10 },
    { time: "🌴 Comida", desc: "Pechuga pollo plancha + arroz basmati + brócoli salteado.", cal: 650, prot: 48, carbs: 70, fat: 14 },
    { time: "🌊 Merienda", desc: "Yogur griego + plátano + 15 almendras + tostada integral con mantequilla cacahuete.", cal: 450, prot: 22, carbs: 50, fat: 20 },
    { time: "🌙 Cena", desc: "Revuelto de pavo con champiñones y pimientos. Ensalada. Pan integral.", cal: 500, prot: 35, carbs: 35, fat: 20 },
  ]},
  { label: "Martes", meals: [
    { time: "🌅 Desayuno", desc: "Batido: 250ml leche soja 0% + 30g whey + 5g creatina + 10g colágeno.", cal: 280, prot: 35, carbs: 15, fat: 5 },
    { time: "☕ Almuerzo", desc: "Café con leche soja + mini bocata jamón dulce y queso.", cal: 280, prot: 14, carbs: 30, fat: 10 },
   { time: "🌴 Comida", desc: "Ternera magra con verduras wok + quinoa abundante.", cal: 650, prot: 44, carbs: 65, fat: 18 },
   { time: "🌊 Merienda", desc: "2 tostadas integrales con crema cacahuete + plátano + vaso leche soja.", cal: 450, prot: 20, carbs: 55, fat: 18 },
   { time: "🌙 Cena", desc: "Tortilla 3 huevos con queso fresco y espinacas. Pan integral. Ensalada.", cal: 520, prot: 34, carbs: 30, fat: 24 },
  ]},
  { label: "Miércoles", meals: [
    { time: "🌅 Desayuno", desc: "Batido: 250ml leche soja 0% + 30g whey + 5g creatina + 10g colágeno.", cal: 280, prot: 35, carbs: 15, fat: 5 },
    { time: "☕ Almuerzo", desc: "Café con leche soja + mini bocata jamón dulce y queso.", cal: 280, prot: 14, carbs: 30, fat: 10 },
   { time: "🌴 Comida", desc: "Pollo horno con boniato asado y judías verdes. Arroz extra.", cal: 680, prot: 46, carbs: 70, fat: 16 },
   { time: "🌊 Merienda", desc: "Requesón con miel, nueces, arándanos + tostada integral.", cal: 400, prot: 24, carbs: 40, fat: 16 },
    { time: "🌙 Cena", desc: "Hamburguesa casera doble de pavo pan integral. Ensalada completa.", cal: 560, prot: 40, carbs: 40, fat: 22 },
  ]},
  { label: "Jueves", meals: [
    { time: "🌅 Desayuno", desc: "Batido: 250ml leche soja 0% + 30g whey + 5g creatina + 10g colágeno.", cal: 280, prot: 35, carbs: 15, fat: 5 },
    { time: "☕ Almuerzo", desc: "Café con leche soja + mini bocata jamón dulce y queso.", cal: 280, prot: 14, carbs: 30, fat: 10 },
   { time: "🌴 Comida", desc: "Lentejas estofadas con verduras + arroz abundante + pan.", cal: 680, prot: 32, carbs: 90, fat: 14 },
    { time: "🌊 Merienda", desc: "Yogur griego con granola, kiwi + tostada con aguacate.", cal: 420, prot: 22, carbs: 48, fat: 16 },
   { time: "🌙 Cena", desc: "2 wraps integrales con pollo, aguacate y tomate.", cal: 580, prot: 40, carbs: 50, fat: 24 },
  ]},
  { label: "Viernes", meals: [
    { time: "🌅 Desayuno", desc: "Batido: 250ml leche soja 0% + 30g whey + 5g creatina + 10g colágeno.", cal: 280, prot: 35, carbs: 15, fat: 5 },
    { time: "☕ Almuerzo", desc: "Café con leche soja + mini bocata jamón dulce y queso.", cal: 280, prot: 14, carbs: 30, fat: 10 },
    { time: "🌴 Comida", desc: "Pasta integral abundante con pollo troceado, tomate y parmesano.", cal: 700, prot: 44, carbs: 80, fat: 18 },
    { time: "🌊 Merienda", desc: "Hummus con bastones zanahoria + tostadas integrales + fruta.", cal: 400, prot: 16, carbs: 48, fat: 16 },
    { time: "🌙 Cena", desc: "Ensalada completa: lechugas, 2 huevos duros, pollo, maíz, aguacate.", cal: 520, prot: 36, carbs: 30, fat: 24 },
  ]},
  { label: "Sábado", meals: [
    { time: "🌅 Desayuno", desc: "Batido: 250ml leche soja 0% + 30g whey + 5g creatina + 10g colágeno.", cal: 280, prot: 35, carbs: 15, fat: 5 },
    { time: "☕ Almuerzo", desc: "Café con leche soja + mini bocata jamón dulce y queso.", cal: 280, prot: 14, carbs: 30, fat: 10 },
    { time: "🌴 Comida", desc: "Arroz abundante con pollo al curry suave, leche coco light y verduras.", cal: 680, prot: 42, carbs: 75, fat: 18 },
    { time: "🌊 Merienda", desc: "2 tostadas integrales con aguacate y huevo. Fruta.", cal: 440, prot: 20, carbs: 40, fat: 22 },
    { time: "🌙 Cena", desc: "Pizza casera integral grande con pavo, champiñones y mozzarella.", cal: 560, prot: 36, carbs: 50, fat: 22 },
  ]},
  { label: "Domingo", meals: [
    { time: "🌅 Desayuno", desc: "Batido: 250ml leche soja 0% + 30g whey + 5g creatina + 10g colágeno.", cal: 280, prot: 35, carbs: 15, fat: 5 },
    { time: "☕ Almuerzo", desc: "Café con leche soja + mini bocata jamón dulce y queso.", cal: 280, prot: 14, carbs: 30, fat: 10 },
   { time: "🌴 Comida", desc: "Pollo asado con patatas horno abundantes y ensalada mediterránea.", cal: 700, prot: 46, carbs: 65, fat: 22 },
    { time: "🌊 Merienda", desc: "Yogur griego con crema cacahuete + plátano + avena.", cal: 420, prot: 24, carbs: 42, fat: 18 },
   { time: "🌙 Cena", desc: "Crema calabaza + 2 tostadas con pavo y queso. Ensalada.", cal: 480, prot: 30, carbs: 45, fat: 18 },
  ]},
];

/* ═══════ TRAINING ═══════ */
const TRAINING = [
  { day: "Día 1", title: "Glúteos & Isquios", icon: "🌺", exercises: [
    { name: "Hip Thrust con barra", sets: "4×12", rest: "90s", note: "Barra con discos (14kg). Espalda en sofá. Aprieta 2s arriba." },
    { name: "Peso muerto rumano con barra", sets: "3×12", rest: "90s", note: "Baja lento hasta espinilla. Espalda recta." },
    { name: "Zancadas inversas 5kg", sets: "3×12/pierna", rest: "60s", note: "Mancuernas 5kg. Paso hacia ATRÁS." },
    { name: "Kickback con lastre", sets: "3×15/pierna", rest: "45s", note: "Cuatro patas. Sube pierna recta." },
    { name: "Puente glúteo con banda", sets: "3×20", rest: "45s", note: "Banda en rodillas. Abre al subir." },
    { name: "Curl femoral con lastre", sets: "3×15", rest: "45s", note: "Boca abajo. Talones al glúteo." },
  ]},
  { day: "Día 2", title: "Cuádriceps & Gemelos", icon: "🌊", exercises: [
    { name: "Sentadilla goblet 5kg", sets: "4×15", rest: "60s", note: "Mancuerna al pecho. Baja profundo." },
    { name: "Búlgara en silla", sets: "3×12/pierna", rest: "60s", note: "Mancuernas 3kg. Pie trasero en silla." },
    { name: "Zancada lateral", sets: "3×12/pierna", rest: "60s", note: "Mancuerna 5kg. Paso lateral amplio." },
    { name: "Isométrica pared", sets: "3×45s", rest: "60s", note: "Mancuernas en muslos. Muslos paralelos." },
    { name: "Gemelos con barra", sets: "4×20", rest: "45s", note: "Barra en hombros en escalón." },
  ]},
  { day: "Día 3", title: "Descanso Activo", icon: "🌴", exercises: [
    { name: "Caminata rápida", sets: "30 min", rest: "-", note: "Buen ritmo al aire libre." },
    { name: "Estiramientos", sets: "15 min", rest: "-", note: "Caderas, isquios, cuádriceps." },
    { name: "Automasaje", sets: "10 min", rest: "-", note: "Pelota tenis en piernas y glúteos." },
  ]},
  { day: "Día 4", title: "Glúteos & Core", icon: "🔥", exercises: [
    { name: "Sentadilla sumo con barra", sets: "4×12", rest: "90s", note: "Pies separados, puntas fuera." },
    { name: "Fire hydrant con lastre", sets: "3×15/pierna", rest: "45s", note: "Abre pierna al lado." },
    { name: "Clamshell con banda", sets: "3×20/pierna", rest: "45s", note: "De lado. Abre como concha." },
    { name: "Donkey kick con lastre", sets: "3×15/pierna", rest: "45s", note: "Pierna doblada al techo." },
    { name: "Plancha", sets: "3×45s", rest: "45s", note: "Cuerpo recto." },
    { name: "Crunch bicicleta", sets: "3×20", rest: "45s", note: "Codo a rodilla contraria." },
    { name: "Elevación piernas", sets: "3×15", rest: "45s", note: "Con lastre. 90° y baja." },
  ]},
  { day: "Día 5", title: "Full Pierna", icon: "💪", exercises: [
    { name: "Sumo pulsante 5kg", sets: "4×20", rest: "60s", note: "Mini-rebotes. Quema." },
    { name: "Hip Thrust pies elevados", sets: "4×12", rest: "90s", note: "Pies en silla. Barra." },
    { name: "Step-up silla 5kg", sets: "3×12/pierna", rest: "60s", note: "Empuja con talón." },
    { name: "Abducción con banda", sets: "3×20/pierna", rest: "45s", note: "De lado. Lento." },
    { name: "Isométrica barra", sets: "3×50s", rest: "60s", note: "Barra en muslos." },
    { name: "Gemelos una pierna", sets: "4×15/pierna", rest: "45s", note: "Mancuerna 5kg." },
  ]},
];

/* ═══════ HELPERS ═══════ */
function todayKey() { return new Date().toISOString().split("T")[0]; }

function loadLog() {
  try {
    const raw = localStorage.getItem("fc_log");
    if (!raw) return { date: todayKey(), items: [] };
    const log = JSON.parse(raw);
    if (log.date !== todayKey()) return { date: todayKey(), items: [] };
    return log;
  } catch { return { date: todayKey(), items: [] }; }
}

function saveLog(log) { localStorage.setItem("fc_log", JSON.stringify(log)); }

function loadMealEdits() {
  try { return JSON.parse(localStorage.getItem("fc_edits") || "{}"); } catch { return {}; }
}
function saveMealEdits(edits) { localStorage.setItem("fc_edits", JSON.stringify(edits)); }

function shrink(file) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onerror = () => rej("No se pudo leer");
    fr.onload = (e) => {
      const im = new window.Image();
      im.onerror = () => rej("Imagen no válida");
      im.onload = () => {
        const c = document.createElement("canvas");
        let w = im.width, h = im.height;
        if (w > 800) { h = Math.round((800 / w) * h); w = 800; }
        c.width = w; c.height = h;
        c.getContext("2d").drawImage(im, 0, 0, w, h);
        res(c.toDataURL("image/jpeg", 0.7).split(",")[1]);
      };
      im.src = e.target.result;
    };
    fr.readAsDataURL(file);
  });
}

/* ═══════ COMPONENTS ═══════ */
function Ring({ value, max, label, color, size = 58 }) {
  const p = Math.min((value / max) * 100, 100), r = size * 0.4, ci = 2 * Math.PI * r;
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="4.5" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="4.5" strokeDasharray={ci} strokeDashoffset={ci - (ci * p) / 100} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: "stroke-dashoffset 0.8s" }} />
        <text x={size / 2} y={size / 2 + 5} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="Quicksand">{value}</text>
      </svg>
      <div style={{ fontSize: 11, color: "#7a8ba8", marginTop: 2, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function ProgressBar({ value, max, color, label }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: "#9db3cc", fontWeight: 600 }}>{label}</span>
        <span style={{ fontWeight: 700 }}><span style={{ color }}>{value}</span><span style={{ color: "#7a8ba8" }}>/{max}</span></span>
      </div>
      <div style={{ height: 8, background: "rgba(255,255,255,.06)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width 0.6s" }} />
      </div>
    </div>
  );
}

/* ═══════ DASHBOARD ═══════ */
function Dash() {
  return (
    <div className="pg">
      <div className="c cg" style={{ textAlign: "center", padding: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -10, right: -10, fontSize: 60, opacity: .08 }}>🌺</div>
        <div className="flt" style={{ fontSize: 52, marginBottom: 10 }}>🌺</div>
        <h2 style={{ fontFamily: "Lilita One", fontSize: 24 }}>¡Aloha, {P.name}! <span className="wh">👋</span></h2>
        <p style={{ color: "#7a8ba8", fontSize: 13, marginTop: 8 }}>Objetivo: 70kg masa muscular · mínima grasa 💪</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 14, flexWrap: "wrap" }}>
          {P.supplements.map(s => <span key={s} className="tg tp">{s}</span>)}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 6, flexWrap: "wrap" }}>
          {P.equipment.map(s => <span key={s} className="tg tb">{s}</span>)}
        </div>
      </div>

      <div className="st">🎯 Composición Corporal</div>
      <div className="sg">
        <div className="sb"><div className="v" style={{ color: "#FF6B9D" }}>{P.weight}</div><div className="l">Actual (kg)</div></div>
        <div className="sb"><div className="v" style={{ color: "#4ade80" }}>{P.targetWeight}</div><div className="l">Objetivo (kg)</div></div>
        <div className="sb"><div className="v" style={{ color: "#00C9DB" }}>{P.muscleMass}</div><div className="l">Músculo (kg)</div></div>
      </div>

      <div className="c" style={{ marginTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>💪 Camino a 70kg</span>
          <span style={{ fontSize: 13, color: "#4ade80", fontWeight: 700 }}>+{(P.targetWeight - P.weight).toFixed(1)} kg</span>
        </div>
        <div className="bar"><div className="fill" style={{ width: `${((P.weight - 55) / (P.targetWeight - 55)) * 100}%` }} /></div>
        <p style={{ fontSize: 11, color: "#7a8ba8", marginTop: 6, textAlign: "center" }}>Ganancia limpia: más músculo, menos grasa</p>
      </div>

      <div className="st" style={{ marginTop: 18 }}>📊 Métricas</div>
      <div className="sg">
        <div className="sb"><div className="v" style={{ fontSize: 18, color: "#FFD93D" }}>{P.bmr}</div><div className="l">BMR</div></div>
        <div className="sb"><div className="v" style={{ fontSize: 18, color: "#FF6B9D" }}>{P.bodyFat}%</div><div className="l">Grasa</div></div>
        <div className="sb"><div className="v" style={{ fontSize: 18, color: "#38bdf8" }}>{P.water}%</div><div className="l">Agua</div></div>
        <div className="sb"><div className="v" style={{ fontSize: 18, color: "#4ade80" }}>{P.skeletalMuscle}%</div><div className="l">M.Esq</div></div>
        <div className="sb"><div className="v" style={{ fontSize: 18, color: "#c084fc" }}>{P.visceralFat}</div><div className="l">G.Vis</div></div>
        <div className="sb"><div className="v" style={{ fontSize: 18, color: "#fb923c" }}>{P.bmi}</div><div className="l">IMC</div></div>
      </div>

      <div className="c co" style={{ marginTop: 14 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <span style={{ fontSize: 22, flexShrink: 0 }}>🔥</span>
          <p style={{ fontSize: 13, lineHeight: 1.65, color: "#9db3cc" }}>
            Para ganar músculo necesitas comer en <strong style={{ color: "#fff" }}>superávit calórico controlado</strong> (~2400kcal) con alta proteína (145g). No tengas miedo a comer más — tu cuerpo necesita ese combustible para construir músculo. 💪
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════ TRAINING ═══════ */
function Train() {
  const [day, setDay] = useState(0);
  const [exp, setExp] = useState(null);
  const d = TRAINING[day];
  return (
    <div className="pg">
      <div className="st">🏋️‍♀️ Entreno (complementa Chloe Ting)</div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 14 }}>
        {TRAINING.map((t, i) => <button key={i} className={`dt ${day === i ? "on" : ""}`} onClick={() => { setDay(i); setExp(null); }}>{t.icon} D{i + 1}</button>)}
      </div>
      <div className="c cg" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 32 }}>{d.icon}</span>
          <div>
            <div style={{ fontFamily: "Lilita One", fontSize: 18 }}>{d.title}</div>
            <div style={{ fontSize: 12, color: "#7a8ba8", marginTop: 2 }}>{d.exercises.length} ejercicios · En casa 🏠</div>
          </div>
        </div>
      </div>
      {d.exercises.map((e, i) => (
        <div key={`${day}-${i}`} className="ex" onClick={() => setExp(exp === i ? null : i)}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14.5 }}>{e.name}</div>
              <div style={{ fontSize: 12, color: "#7a8ba8", marginTop: 4, display: "flex", gap: 14 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><TrendingUp size={12} />{e.sets}</span>
                {e.rest !== "-" && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} />{e.rest}</span>}
              </div>
            </div>
            {exp === i ? <ChevronUp size={18} color="#7a8ba8" /> : <ChevronDown size={18} color="#7a8ba8" />}
          </div>
          {exp === i && <div style={{ fontSize: 13, color: "#9db3cc", marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,.05)", lineHeight: 1.6 }}>💡 {e.note}</div>}
        </div>
      ))}
    </div>
  );
}

/* ═══════ NUTRITION ═══════ */
function Food() {
  const [log, setLog] = useState({ date: "", items: [] });
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [mealDay, setMealDay] = useState(() => { const d = new Date().getDay(); return d === 0 ? 6 : d - 1; });
  const [mealEdits, setMealEdits] = useState({});
  const [editing, setEditing] = useState(null); // { dayIdx, mealIdx }
  const [editText, setEditText] = useState("");
  const [estimating, setEstimating] = useState(false);
  const ref = useRef(null);

  useEffect(() => { setLog(loadLog()); setMealEdits(loadMealEdits()); }, []);

  const consumed = log.items.reduce((a, i) => ({
    cal: a.cal + (i.cal || 0), prot: a.prot + (i.prot || 0),
    carbs: a.carbs + (i.carbs || 0), fat: a.fat + (i.fat || 0)
  }), { cal: 0, prot: 0, carbs: 0, fat: 0 });

  const resetPhoto = () => { setPreview(null); setResult(null); setError(null); if (ref.current) ref.current.value = ""; };

  const addToLog = (item) => {
    const updated = { ...log, items: [...log.items, { ...item, time: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }) }] };
    setLog(updated); saveLog(updated);
  };

  const removeFromLog = (idx) => {
    const updated = { ...log, items: log.items.filter((_, i) => i !== idx) };
    setLog(updated); saveLog(updated);
  };

  const analyze = async (file) => {
    setBusy(true); setResult(null); setError(null);
    try {
      const b64 = await shrink(file);
      const r = await fetch("/api/food", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: b64 }) });
      const data = await r.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e) { setError(String(e.message || e)); }
    setBusy(false);
  };

  const confirmAdd = () => {
    if (result) {
      addToLog({ name: result.alimento, cal: result.calorias || 0, prot: result.proteinas || 0, carbs: result.carbohidratos || 0, fat: result.grasas || 0 });
      resetPhoto();
    }
  };

  const startEdit = (dayIdx, mealIdx) => {
    setEditing({ dayIdx, mealIdx });
    const key = `${dayIdx}-${mealIdx}`;
    setEditText(mealEdits[key]?.desc || "");
  };

  const saveEdit = async () => {
    if (!editText.trim() || !editing) return;
    setEstimating(true);
    try {
      const r = await fetch("/api/estimate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ meal: editText.trim() }) });
      const data = await r.json();
      const key = `${editing.dayIdx}-${editing.mealIdx}`;
      const newEdits = { ...mealEdits, [key]: { desc: editText.trim(), cal: data.calorias || 0, prot: data.proteinas || 0, carbs: data.carbohidratos || 0, fat: data.grasas || 0 } };
      setMealEdits(newEdits);
      saveMealEdits(newEdits);
    } catch (e) { console.error(e); }
    setEstimating(false);
    setEditing(null);
    setEditText("");
  };

  const resetMeal = (dayIdx, mealIdx) => {
    const key = `${dayIdx}-${mealIdx}`;
    const newEdits = { ...mealEdits };
    delete newEdits[key];
    setMealEdits(newEdits);
    saveMealEdits(newEdits);
  };

  const getMeal = (dayIdx, mealIdx) => {
    const key = `${dayIdx}-${mealIdx}`;
    const edit = mealEdits[key];
    const orig = DEFAULT_MEALS[dayIdx].meals[mealIdx];
    if (edit) return { ...orig, desc: edit.desc, cal: edit.cal, prot: edit.prot, carbs: edit.carbs, fat: edit.fat, edited: true };
    return { ...orig, edited: false };
  };

  const dayMeals = DEFAULT_MEALS[mealDay].meals.map((_, i) => getMeal(mealDay, i));
  const dayTotal = dayMeals.reduce((a, m) => ({ cal: a.cal + m.cal, prot: a.prot + m.prot }), { cal: 0, prot: 0 });

  return (
    <div className="pg">
      {/* ── DAILY MACRO TRACKER ── */}
      <div className="st">📊 Contador del Día</div>
      <div className="c cg">
        <ProgressBar value={consumed.cal} max={MACROS.calories} color="#FFD93D" label="Calorías (kcal)" />
        <ProgressBar value={consumed.prot} max={MACROS.protein} color="#FF6B9D" label="Proteína (g)" />
        <ProgressBar value={consumed.carbs} max={MACROS.carbs} color="#c084fc" label="Carbohidratos (g)" />
        <ProgressBar value={consumed.fat} max={MACROS.fat} color="#00C9DB" label="Grasa (g)" />
        {log.items.length === 0 && <p style={{ textAlign: "center", fontSize: 12, color: "#7a8ba8", marginTop: 8 }}>Haz fotos a tus comidas para ir sumando 📸</p>}
      </div>

      {/* ── FOOD LOG ── */}
      {log.items.length > 0 && (
        <div className="c" style={{ padding: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>🍽️ Comidas registradas hoy</div>
          {log.items.map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < log.items.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</div>
                <div style={{ fontSize: 11, color: "#7a8ba8" }}>{item.time} · {item.cal}kcal · {item.prot}g prot</div>
              </div>
              <button onClick={() => removeFromLog(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                <Trash2 size={16} color="#f87171" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── PHOTO ANALYSIS ── */}
      <div className="st" style={{ marginTop: 16 }}>📸 Analiza y Registra</div>
      <input type="file" ref={ref} accept="image/*" capture="environment" style={{ display: "none" }} onChange={e => {
        const f = e.target.files?.[0]; if (!f) return;
        setPreview(URL.createObjectURL(f)); analyze(f);
      }} />

      {!preview && !busy && !result && !error && (
        <div className="up" onClick={() => ref.current?.click()}>
          <Camera size={36} color="#FF6B9D" style={{ margin: "0 auto 12px" }} />
          <p style={{ fontWeight: 700, fontSize: 15 }}>Foto de tu comida 📷</p>
          <p style={{ fontSize: 12, color: "#7a8ba8", marginTop: 6 }}>Se analizará y sumará al contador</p>
        </div>
      )}

      {preview && (
        <div style={{ position: "relative", marginBottom: 14 }}>
          <img src={preview} alt="" style={{ width: "100%", borderRadius: 20, maxHeight: 200, objectFit: "cover" }} />
          {!busy && !result && <button onClick={resetPhoto} style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,.6)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={16} color="#fff" /></button>}
        </div>
      )}

      {busy && <div className="c" style={{ textAlign: "center", padding: 28 }}><div className="td" style={{ marginBottom: 10 }}><span /><span /><span /></div><p style={{ fontSize: 13, color: "#7a8ba8" }}>Analizando... 🔍</p></div>}
      {error && <div className="c" style={{ borderColor: "rgba(239,68,68,.25)", background: "rgba(239,68,68,.06)" }}><p style={{ fontSize: 13, color: "#fca5a5", marginBottom: 6 }}>⚠️ {error}</p><button onClick={resetPhoto} style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #1e3355", background: "#152238", color: "#f0f4ff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Reintentar</button></div>}

      {result && (
        <div className="c cg">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h3 style={{ fontFamily: "Quicksand", fontSize: 16, fontWeight: 700 }}>{result.alimento}</h3>
            <div style={{ background: "linear-gradient(135deg,#FF6B9D,#FF8E53)", borderRadius: 12, padding: "4px 12px", fontWeight: 700, fontSize: 14 }}>{result.puntuacion}/10</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, marginBottom: 12 }}>
            {[{ l: "Cal", v: result.calorias, c: "#FFD93D" }, { l: "Prot", v: result.proteinas, c: "#FF6B9D" }, { l: "Carbs", v: result.carbohidratos, c: "#c084fc" }, { l: "Grasa", v: result.grasas, c: "#00C9DB" }].map(m => (
              <div key={m.l} style={{ textAlign: "center", background: "rgba(255,255,255,.03)", borderRadius: 10, padding: "8px 2px" }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: m.c }}>{m.v}</div>
                <div style={{ fontSize: 10, color: "#7a8ba8" }}>{m.l}</div>
              </div>
            ))}
          </div>
          {result.valoracion && <p style={{ fontSize: 12, color: "#9db3cc", lineHeight: 1.5, marginBottom: 4 }}>✅ {result.valoracion}</p>}
          {result.sugerencia && <p style={{ fontSize: 12, color: "#9db3cc", lineHeight: 1.5 }}>💡 {result.sugerencia}</p>}
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <button onClick={confirmAdd} style={{ flex: 1, padding: 12, borderRadius: 14, border: "none", background: "linear-gradient(135deg,#4ade80,#22c55e)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Plus size={16} /> Añadir al contador
            </button>
            <button onClick={resetPhoto} style={{ padding: 12, borderRadius: 14, border: "1px solid #1e3355", background: "#152238", color: "#7a8ba8", fontSize: 14, cursor: "pointer" }}>
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── EDITABLE MEAL PLAN ── */}
      <div className="st" style={{ marginTop: 20 }}>🥗 Plan Comidas <span style={{ fontSize: 12, color: "#7a8ba8", fontWeight: 500 }}>(toca ✏️ para cambiar)</span></div>
      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 12 }}>
        {DEFAULT_MEALS.map((m, i) => <button key={i} className={`dc ${mealDay === i ? "on3" : ""}`} onClick={() => setMealDay(i)}>{m.label}</button>)}
      </div>
      <div className="c" style={{ background: "rgba(255,217,61,.04)", borderColor: "rgba(255,217,61,.1)", padding: 14 }}>
        {dayMeals.map((m, i) => (
          <div key={i} className="mc" style={{ position: "relative" }}>
            {editing?.dayIdx === mealDay && editing?.mealIdx === i ? (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{m.time}</div>
                <textarea value={editText} onChange={e => setEditText(e.target.value)}
                  placeholder="Escribe lo que vas a comer..."
                  style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #1e3355", background: "#0f1b2d", color: "#f0f4ff", fontSize: 13, fontFamily: "Nunito", resize: "vertical", minHeight: 60, outline: "none" }} />
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button onClick={saveEdit} disabled={estimating || !editText.trim()}
                    style={{ flex: 1, padding: 10, borderRadius: 10, border: "none", background: "#4ade80", color: "#1a1a2e", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4, opacity: estimating ? 0.6 : 1 }}>
                    {estimating ? <><Loader size={14} className="spin" /> Calculando...</> : <><Check size={14} /> Guardar</>}
                  </button>
                  <button onClick={() => setEditing(null)}
                    style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #1e3355", background: "#152238", color: "#7a8ba8", fontSize: 13, cursor: "pointer" }}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{m.time} {m.edited && <span style={{ fontSize: 10, color: "#4ade80" }}>✏️ editado</span>}</div>
                    <div style={{ fontSize: 13, color: "#9db3cc", lineHeight: 1.5 }}>{m.desc}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 6, fontSize: 11, color: "#7a8ba8" }}>
                      <span><strong style={{ color: "#FFD93D" }}>{m.cal}</strong> kcal</span>
                      <span><strong style={{ color: "#FF6B9D" }}>{m.prot}g</strong> prot</span>
                      <span><strong style={{ color: "#c084fc" }}>{m.carbs}g</strong> carbs</span>
                      <span><strong style={{ color: "#00C9DB" }}>{m.fat}g</strong> grasa</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 4, marginLeft: 8, flexShrink: 0 }}>
                    <button onClick={() => startEdit(mealDay, i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Pencil size={15} color="#7a8ba8" /></button>
                    {m.edited && <button onClick={() => resetMeal(mealDay, i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><X size={15} color="#f87171" /></button>}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
        <div style={{ textAlign: "center", marginTop: 10, fontSize: 12, color: "#7a8ba8" }}>
          Total plan: <strong style={{ color: "#FFD93D" }}>{dayTotal.cal} kcal</strong> · <strong style={{ color: "#FF6B9D" }}>{dayTotal.prot}g prot</strong>
        </div>
      </div>
    </div>
  );
}

/* ═══════ CHAT ═══════ */
function Chat() {
  const [msgs, setMsgs] = useState([
    { r: "b", t: "¡Aloha Lidia! 🌺 Soy tu coach de fitness y nutrición.\n\nConozco tu nuevo objetivo: llegar a 70kg de masa muscular con la menor grasa posible. Pregúntame lo que necesites: alimentación, técnica, suplementos... ¡Vamos a por ello! 💪" }
  ]);
  const [inp, setInp] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, busy]);

  const send = async () => {
    if (!inp.trim() || busy) return;
    const txt = inp.trim(); setInp("");
    const updated = [...msgs, { r: "u", t: txt }]; setMsgs(updated); setBusy(true);
    try {
      const conv = updated.slice(1);
      const apiMsgs = conv.map(m => ({ role: m.r === "u" ? "user" : "assistant", content: m.t }));
      const r = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: apiMsgs }) });
      const data = await r.json();
      if (data.error) throw new Error(data.error);
      setMsgs(prev => [...prev, { r: "b", t: data.text }]);
    } catch (e) { setMsgs(prev => [...prev, { r: "e", t: String(e.message || e) }]); }
    setBusy(false);
  };

  return (
    <div className="pg" style={{ paddingBottom: 0, height: "calc(100vh - 135px)", display: "flex", flexDirection: "column" }}>
      <div className="st" style={{ flexShrink: 0 }}>🌺 Chat Coach</div>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingBottom: 8 }}>
        {msgs.map((m, i) => (
          <div key={i} className={`ms ${m.r === "u" ? "u" : m.r === "e" ? "e" : "b"}`}>
            {m.t.split("\n").map((l, j) => <span key={j}>{l}<br /></span>)}
          </div>
        ))}
        {busy && <div className="ms b"><div className="td"><span /><span /><span /></div></div>}
        <div ref={end} />
      </div>
      <div className="ci" style={{ flexShrink: 0 }}>
        <input type="text" placeholder="Pregúntame... 🌺" value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
        <button className="sn" onClick={send} disabled={!inp.trim() || busy}><Send size={18} /></button>
      </div>
    </div>
  );
}

/* ═══════ APP ═══════ */
const NAV = [
  { id: "h", label: "Inicio", icon: Home },
  { id: "t", label: "Entreno", icon: Dumbbell },
  { id: "f", label: "Nutrición", icon: UtensilsCrossed },
  { id: "c", label: "Chat", icon: MessageCircle },
];

export default function App() {
  const [tab, setTab] = useState("h");
  return (
    <>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Quicksand:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0}body{background:#0f1b2d;color:#f0f4ff;font-family:'Nunito',sans-serif;-webkit-tap-highlight-color:transparent}
.app{max-width:430px;margin:0 auto;min-height:100vh;min-height:100dvh;background:#0f1b2d;padding-bottom:85px;overflow-x:hidden}
.hd{padding:14px 20px 12px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50;background:rgba(9,19,34,.96);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,.04)}.hd h1{font-family:'Lilita One',cursive;font-size:22px}.hd .ac{background:linear-gradient(135deg,#FF6B9D,#FF8E53,#FFD93D);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.pg{padding:8px 20px 20px;animation:fu .3s ease}
@keyframes fu{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes pu{0%,100%{opacity:1}50%{opacity:.5}}@keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes wv{0%{transform:rotate(0)}25%{transform:rotate(14deg)}50%{transform:rotate(0)}75%{transform:rotate(-8deg)}100%{transform:rotate(0)}}
.c{background:#152238;border:1px solid #1e3355;border-radius:20px;padding:18px;margin-bottom:14px}.cg{background:linear-gradient(135deg,rgba(255,107,157,.08),rgba(0,201,219,.06));border-color:rgba(255,107,157,.2)}.co{background:linear-gradient(135deg,rgba(0,201,219,.08),rgba(107,91,255,.06));border-color:rgba(0,201,219,.18)}
.sg{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}.sb{background:rgba(255,255,255,.03);border-radius:16px;padding:14px 10px;text-align:center;border:1px solid rgba(255,255,255,.04)}.sb .v{font-family:'Quicksand';font-size:22px;font-weight:700}.sb .l{font-size:11px;color:#7a8ba8;margin-top:4px;text-transform:uppercase;letter-spacing:.5px}
.bar{height:8px;background:rgba(255,255,255,.06);border-radius:99px;overflow:hidden}.fill{height:100%;border-radius:99px;background:linear-gradient(135deg,#FF6B9D,#FF8E53,#FFD93D);transition:width 1s}
.ex{background:#152238;border:1px solid #1e3355;border-radius:16px;padding:14px 16px;margin-bottom:10px;cursor:pointer;transition:transform .15s}.ex:active{transform:scale(.98)}
.dt{padding:10px 16px;border-radius:14px;font-size:13px;font-weight:700;white-space:nowrap;cursor:pointer;border:1px solid #1e3355;background:#152238;color:#7a8ba8;font-family:'Quicksand';transition:all .2s}.dt.on{background:linear-gradient(135deg,#FF6B9D,#FF8E53);color:#fff;border-color:transparent;box-shadow:0 4px 15px rgba(255,107,157,.3)}
.ms{max-width:85%;padding:12px 16px;border-radius:20px;font-size:14px;line-height:1.6;animation:fu .2s;word-wrap:break-word}.ms.u{align-self:flex-end;background:linear-gradient(135deg,#FF6B9D,#FF8E53);color:#fff;border-bottom-right-radius:6px}.ms.b{align-self:flex-start;background:#152238;border:1px solid #1e3355;border-bottom-left-radius:6px}.ms.e{align-self:flex-start;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-bottom-left-radius:6px;color:#fca5a5;font-size:12px}
.ci{display:flex;gap:8px;padding:12px 0 4px;border-top:1px solid rgba(255,255,255,.05)}.ci input{flex:1;padding:12px 16px;border-radius:16px;border:1px solid #1e3355;background:#152238;color:#f0f4ff;font-size:14px;outline:none;font-family:'Nunito'}.ci input::placeholder{color:#7a8ba8}.ci input:focus{border-color:#FF6B9D}
.sn{width:48px;height:48px;border-radius:16px;border:none;background:linear-gradient(135deg,#FF6B9D,#FF8E53);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}.sn:disabled{opacity:.4;cursor:not-allowed}
.bn{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:rgba(9,19,34,.97);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.05);padding:8px 12px env(safe-area-inset-bottom,24px);display:flex;justify-content:space-around;z-index:100}
.ni{display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;padding:6px 14px;border-radius:14px;background:0;border:0;color:#7a8ba8;font-family:'Nunito'}.ni.on2{color:#FF6B9D}.ni span{font-size:10px;font-weight:700}
.st{font-family:'Quicksand';font-size:17px;font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:8px}
.up{border:2px dashed rgba(255,107,157,.3);border-radius:20px;padding:28px;text-align:center;cursor:pointer;background:rgba(255,107,157,.04)}
.td span{display:inline-block;width:7px;height:7px;border-radius:50%;background:#7a8ba8;animation:pu 1.2s infinite;margin:0 2px}.td span:nth-child(2){animation-delay:.2s}.td span:nth-child(3){animation-delay:.4s}
.tg{display:inline-block;padding:4px 10px;border-radius:10px;font-size:11px;font-weight:600;margin:3px 3px 3px 0}.tp{background:rgba(255,107,157,.12);color:#FF6B9D;border:1px solid rgba(255,107,157,.18)}.tb{background:rgba(0,201,219,.12);color:#00C9DB;border:1px solid rgba(0,201,219,.18)}
.wh{display:inline-block;animation:wv 1.8s ease infinite;transform-origin:70% 70%}.flt{animation:fl 3s ease infinite}
.mc{background:rgba(255,255,255,.02);border-radius:14px;padding:12px 14px;margin-bottom:8px;border:1px solid rgba(255,255,255,.03)}
.dc{padding:8px 14px;border-radius:12px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid #1e3355;background:#152238;color:#7a8ba8;font-family:'Quicksand';white-space:nowrap;transition:all .2s}.dc.on3{background:#FFD93D;color:#1a1a2e;border-color:transparent}
.spin{animation:sp 1s linear infinite}@keyframes sp{from{transform:rotate(0)}to{transform:rotate(360deg)}}
      `}</style>
      <div className="app">
        <div className="hd">
          <h1><span className="ac">Fit</span>Coach 🌺</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px rgba(74,222,128,.5)" }} />
            <span style={{ fontSize: 11, color: "#7a8ba8", fontWeight: 600 }}>Ohana</span>
          </div>
        </div>
        {tab === "h" && <Dash />}
        {tab === "t" && <Train />}
        {tab === "f" && <Food />}
        {tab === "c" && <Chat />}
        <div className="bn">
          {NAV.map(n => (
            <button key={n.id} className={`ni ${tab === n.id ? "on2" : ""}`} onClick={() => setTab(n.id)}>
              <n.icon size={22} /><span>{n.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
