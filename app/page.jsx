"use client";
import { useState, useRef, useEffect } from "react";
import { Home, Dumbbell, UtensilsCrossed, MessageCircle, Camera, TrendingUp, Clock, Send, X, ChevronDown, ChevronUp, Download } from "lucide-react";

/* ═══════ PROFILE ═══════ */
const P = {
  name: "Lidia", age: 26, height: 168, weight: 66.9, targetWeight: 60,
  bmi: 23.7, bodyFat: 32.9, muscleMass: 42.0, bmr: 1382,
  skeletalMuscle: 46.2, water: 47.0, visceralFat: 4.9,
  protein: 16.0, boneMass: 2.7, subcutaneousFat: 21.5,
  supplements: ["Whey 30g", "Creatina 5g", "Colágeno 10g", "Hairburst"],
  equipment: ["Esterilla", "3× Lastres", "Banda elástica", "Mancuernas 3kg", "Mancuernas 5kg", "Barra + discos"],
};
const MACROS = { calories: 2100, protein: 130, carbs: 235, fat: 58 };

/* ═══════ MEALS - Updated with Lidia's real habits ═══════ */
const MEALS = [
  { label: "Lunes", meals: [
    { time: "🌅 Desayuno", desc: "Batido: 250ml leche soja 0% + 30g whey + 5g creatina + 10g colágeno peptides.", cal: 280, prot: 35 },
    { time: "☕ Almuerzo", desc: "Café con leche de soja + mini bocata jamón dulce y queso.", cal: 280, prot: 14 },
    { time: "🌴 Comida", desc: "Pechuga pollo plancha + arroz basmati + brócoli salteado con ajo.", cal: 550, prot: 42 },
    { time: "🌊 Merienda", desc: "Yogur griego natural + plátano + 10 almendras.", cal: 300, prot: 16 },
    { time: "🌙 Cena", desc: "Revuelto de pavo con champiñones y pimientos. Ensalada verde.", cal: 400, prot: 32 },
  ]},
  { label: "Martes", meals: [
    { time: "🌅 Desayuno", desc: "Batido: 250ml leche soja 0% + 30g whey + 5g creatina + 10g colágeno peptides.", cal: 280, prot: 35 },
    { time: "☕ Almuerzo", desc: "Café con leche de soja + mini bocata jamón dulce y queso.", cal: 280, prot: 14 },
    { time: "🌴 Comida", desc: "Ternera magra salteada con verduras al wok + quinoa.", cal: 520, prot: 38 },
    { time: "🌊 Merienda", desc: "2 tortitas arroz con crema cacahuete + fruta.", cal: 280, prot: 10 },
    { time: "🌙 Cena", desc: "Tortilla 2 huevos con queso fresco y espinacas. Ensalada.", cal: 380, prot: 26 },
  ]},
  { label: "Miércoles", meals: [
    { time: "🌅 Desayuno", desc: "Batido: 250ml leche soja 0% + 30g whey + 5g creatina + 10g colágeno peptides.", cal: 280, prot: 35 },
    { time: "☕ Almuerzo", desc: "Café con leche de soja + mini bocata jamón dulce y queso.", cal: 280, prot: 14 },
    { time: "🌴 Comida", desc: "Pollo horno con boniato asado y judías verdes.", cal: 540, prot: 40 },
    { time: "🌊 Merienda", desc: "Requesón con miel, nueces y arándanos.", cal: 260, prot: 18 },
    { time: "🌙 Cena", desc: "Hamburguesa casera pavo en pan integral con lechuga y tomate.", cal: 420, prot: 34 },
  ]},
  { label: "Jueves", meals: [
    { time: "🌅 Desayuno", desc: "Batido: 250ml leche soja 0% + 30g whey + 5g creatina + 10g colágeno peptides.", cal: 280, prot: 35 },
    { time: "☕ Almuerzo", desc: "Café con leche de soja + mini bocata jamón dulce y queso.", cal: 280, prot: 14 },
    { time: "🌴 Comida", desc: "Lentejas estofadas con verduras + arroz.", cal: 520, prot: 26 },
    { time: "🌊 Merienda", desc: "Yogur griego con granola casera y kiwi.", cal: 270, prot: 16 },
    { time: "🌙 Cena", desc: "Wrap integral con pollo desmenuzado, aguacate y tomate.", cal: 430, prot: 30 },
  ]},
  { label: "Viernes", meals: [
    { time: "🌅 Desayuno", desc: "Batido: 250ml leche soja 0% + 30g whey + 5g creatina + 10g colágeno peptides.", cal: 280, prot: 35 },
    { time: "☕ Almuerzo", desc: "Café con leche de soja + mini bocata jamón dulce y queso.", cal: 280, prot: 14 },
    { time: "🌴 Comida", desc: "Pasta integral con pollo troceado, tomate y parmesano.", cal: 560, prot: 38 },
    { time: "🌊 Merienda", desc: "Hummus con bastones zanahoria y pepino + fruta.", cal: 240, prot: 10 },
    { time: "🌙 Cena", desc: "Ensalada completa: lechugas, huevo duro, pollo, maíz, cherry.", cal: 380, prot: 30 },
  ]},
  { label: "Sábado", meals: [
    { time: "🌅 Desayuno", desc: "Batido: 250ml leche soja 0% + 30g whey + 5g creatina + 10g colágeno peptides.", cal: 280, prot: 35 },
    { time: "☕ Almuerzo", desc: "Café con leche de soja + mini bocata jamón dulce y queso.", cal: 280, prot: 14 },
    { time: "🌴 Comida", desc: "Arroz con pollo al curry suave, leche coco light y verduras.", cal: 550, prot: 36 },
    { time: "🌊 Merienda", desc: "Tostada integral con aguacate y huevo poché.", cal: 300, prot: 14 },
    { time: "🌙 Cena", desc: "Pizza casera integral con pavo, champiñones y mozzarella.", cal: 440, prot: 30 },
  ]},
  { label: "Domingo", meals: [
    { time: "🌅 Desayuno", desc: "Batido: 250ml leche soja 0% + 30g whey + 5g creatina + 10g colágeno peptides.", cal: 280, prot: 35 },
    { time: "☕ Almuerzo", desc: "Café con leche de soja + mini bocata jamón dulce y queso.", cal: 280, prot: 14 },
    { time: "🌴 Comida", desc: "Pollo asado con patatas horno y ensalada mediterránea.", cal: 560, prot: 40 },
    { time: "🌊 Merienda", desc: "Yogur griego con crema cacahuete + fruta.", cal: 300, prot: 18 },
    { time: "🌙 Cena", desc: "Crema calabaza y zanahoria + tostada con pavo y queso.", cal: 370, prot: 24 },
  ]},
];

/* ═══════ TRAINING - Complementary to Chloe Ting ═══════ */
const TRAINING = [
  { day: "Día 1", title: "Glúteos & Isquios", icon: "🌺", exercises: [
    { name: "Hip Thrust con barra", sets: "4×12", rest: "90s", note: "Barra con discos (14kg). Espalda en sofá/silla. Aprieta glúteos arriba 2s." },
    { name: "Peso muerto rumano con barra", sets: "3×12", rest: "90s", note: "Barra con discos. Baja lento hasta espinilla. Espalda recta siempre." },
    { name: "Zancadas inversas con mancuernas 5kg", sets: "3×12/pierna", rest: "60s", note: "Paso hacia ATRÁS. Empuja con talón delantero." },
    { name: "Kickback glúteo con lastre", sets: "3×15/pierna", rest: "45s", note: "A cuatro patas. Sube pierna recta y aprieta arriba." },
    { name: "Puente glúteo con banda", sets: "3×20", rest: "45s", note: "Banda en rodillas. Abre al subir. Siente el glúteo medio." },
    { name: "Curl femoral con lastre", sets: "3×15", rest: "45s", note: "Boca abajo. Lleva talones al glúteo lento." },
  ]},
  { day: "Día 2", title: "Cuádriceps & Gemelos", icon: "🌊", exercises: [
    { name: "Sentadilla goblet mancuerna 5kg", sets: "4×15", rest: "60s", note: "Mancuerna al pecho. Baja profundo. Rodillas dirección pies." },
    { name: "Búlgara en silla con mancuernas", sets: "3×12/pierna", rest: "60s", note: "Mancuernas 3kg. Pie trasero en silla. El ejercicio clave." },
    { name: "Zancada lateral con mancuerna", sets: "3×12/pierna", rest: "60s", note: "Mancuerna 5kg. Paso lateral amplio." },
    { name: "Isométrica pared con mancuernas", sets: "3×45s", rest: "60s", note: "Mancuernas en muslos para más peso. Muslos paralelos." },
    { name: "Elevación gemelos con barra", sets: "4×20", rest: "45s", note: "Barra en hombros en un escalón. Rango completo." },
  ]},
  { day: "Día 3", title: "Descanso Activo", icon: "🌴", exercises: [
    { name: "Caminata rápida", sets: "30 min", rest: "-", note: "Buen ritmo, al aire libre si puedes." },
    { name: "Estiramientos esterilla", sets: "15 min", rest: "-", note: "Caderas, isquios, cuádriceps. Postura paloma, mariposa." },
    { name: "Foam roller / automasaje", sets: "10 min", rest: "-", note: "Pelota tenis en glúteos, cuádriceps e isquios." },
  ]},
  { day: "Día 4", title: "Glúteos & Core", icon: "🔥", exercises: [
    { name: "Sentadilla sumo con barra", sets: "4×12", rest: "90s", note: "Pies muy separados, puntas fuera. Barra colgando entre piernas." },
    { name: "Fire hydrant con lastre", sets: "3×15/pierna", rest: "45s", note: "A cuatro patas. Abre pierna al lado sin mover cadera." },
    { name: "Clamshell con banda", sets: "3×20/pierna", rest: "45s", note: "Banda en rodillas. De lado. Abre como concha. Lento." },
    { name: "Donkey kick con lastre", sets: "3×15/pierna", rest: "45s", note: "A cuatro patas. Sube pierna doblada al techo." },
    { name: "Plancha", sets: "3×45s", rest: "45s", note: "Cuerpo recto. Glúteo y abdomen apretados." },
    { name: "Crunch bicicleta", sets: "3×20", rest: "45s", note: "Codo a rodilla contraria. Sin impulso." },
    { name: "Elevación piernas con lastre", sets: "3×15", rest: "45s", note: "Tumbada. 90° y baja sin tocar suelo." },
  ]},
  { day: "Día 5", title: "Full Pierna Intenso", icon: "💪", exercises: [
    { name: "Sumo pulsante con mancuernas", sets: "4×20", rest: "60s", note: "Mancuernas 5kg. Mini-rebotes en sumo. Quema final." },
    { name: "Hip Thrust pies elevados con barra", sets: "4×12", rest: "90s", note: "Pies en silla. Barra con discos. Más rango = más activación." },
    { name: "Step-up silla con mancuernas", sets: "3×12/pierna", rest: "60s", note: "Mancuernas 5kg. Sube a silla estable. Empuja con talón." },
    { name: "Abducción con banda tumbada", sets: "3×20/pierna", rest: "45s", note: "De lado con banda en rodillas. Lento arriba, más lento abajo." },
    { name: "Isométrica pared con barra", sets: "3×50s", rest: "60s", note: "Barra en muslos. Aguanta al máximo." },
    { name: "Gemelos una pierna", sets: "4×15/pierna", rest: "45s", note: "Mancuerna 5kg. Puntilla en pared." },
  ]},
];

/* ═══════ IMAGE COMPRESS ═══════ */
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

/* ═══════ RING COMPONENT ═══════ */
function Ring({ value, max, label, color }) {
  const p = Math.min((value / max) * 100, 100), r = 23, ci = 2 * Math.PI * r;
  return (
    <div style={{ textAlign: "center" }}>
      <svg width="58" height="58" viewBox="0 0 58 58">
        <circle cx="29" cy="29" r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="4.5" />
        <circle cx="29" cy="29" r={r} fill="none" stroke={color} strokeWidth="4.5" strokeDasharray={ci} strokeDashoffset={ci - (ci * p) / 100} strokeLinecap="round" transform="rotate(-90 29 29)" style={{ transition: "stroke-dashoffset 1s" }} />
        <text x="29" y="32" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="Quicksand">{value}</text>
      </svg>
      <div style={{ fontSize: 11, color: "#7a8ba8", marginTop: 2, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

/* ═══════ DASHBOARD ═══════ */
function Dash({ setTab }) {
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    // Check if not already installed as PWA
    if (window.matchMedia && !window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstall(true);
    }
  }, []);

  return (
    <div className="pg">
      {showInstall && (
        <div className="c" style={{ background: "linear-gradient(135deg,rgba(255,107,157,.12),rgba(255,217,61,.08))", borderColor: "rgba(255,107,157,.25)", textAlign: "center", padding: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>📱 Instala FitCoach en tu móvil</p>
          <p style={{ fontSize: 12, color: "#9db3cc", lineHeight: 1.5 }}>
            iPhone: toca <strong style={{ color: "#fff" }}>Compartir</strong> (⬆️) → <strong style={{ color: "#fff" }}>Añadir a pantalla de inicio</strong>
          </p>
          <button onClick={() => setShowInstall(false)} style={{ marginTop: 8, background: "none", border: "none", color: "#7a8ba8", fontSize: 11, cursor: "pointer" }}>Cerrar</button>
        </div>
      )}

      <div className="c cg" style={{ textAlign: "center", padding: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -10, right: -10, fontSize: 60, opacity: .08 }}>🌺</div>
        <div className="flt" style={{ fontSize: 52, marginBottom: 10 }}>🌺</div>
        <h2 style={{ fontFamily: "Lilita One", fontSize: 24 }}>¡Aloha, {P.name}! <span className="wh">👋</span></h2>
        <p style={{ color: "#7a8ba8", fontSize: 13, marginTop: 8 }}>Tu objetivo: figura reloj de arena ⏳💪</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 14, flexWrap: "wrap" }}>
          {P.supplements.map(s => <span key={s} className="tg tp">{s}</span>)}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 6, flexWrap: "wrap" }}>
          {P.equipment.map(s => <span key={s} className="tg tb">{s}</span>)}
        </div>
      </div>

      <div className="st">🎯 Composición Corporal</div>
      <div className="sg">
        <div className="sb"><div className="v" style={{ color: "#FF6B9D" }}>{P.weight}</div><div className="l">Peso (kg)</div></div>
        <div className="sb"><div className="v" style={{ color: "#00C9DB" }}>{P.bodyFat}%</div><div className="l">Grasa</div></div>
        <div className="sb"><div className="v" style={{ color: "#4ade80" }}>{P.muscleMass}</div><div className="l">Músculo (kg)</div></div>
      </div>

      <div className="c" style={{ marginTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>⏳ Camino al objetivo</span>
          <span style={{ fontSize: 13, color: "#FF6B9D", fontWeight: 700 }}>{P.targetWeight} kg</span>
        </div>
        <div className="bar"><div className="fill" style={{ width: `${Math.max(10, ((P.weight - P.targetWeight) / 10) * 100)}%` }} /></div>
      </div>

      <div className="st" style={{ marginTop: 18 }}>📊 Métricas</div>
      <div className="sg">
        <div className="sb"><div className="v" style={{ fontSize: 18, color: "#FFD93D" }}>{P.bmr}</div><div className="l">BMR</div></div>
        <div className="sb"><div className="v" style={{ fontSize: 18, color: "#38bdf8" }}>{P.water}%</div><div className="l">Agua</div></div>
        <div className="sb"><div className="v" style={{ fontSize: 18, color: "#4ade80" }}>{P.bmi}</div><div className="l">IMC</div></div>
        <div className="sb"><div className="v" style={{ fontSize: 18, color: "#FF6B9D" }}>{P.skeletalMuscle}%</div><div className="l">M.Esq</div></div>
        <div className="sb"><div className="v" style={{ fontSize: 18, color: "#c084fc" }}>{P.visceralFat}</div><div className="l">G.Vis</div></div>
        <div className="sb"><div className="v" style={{ fontSize: 18, color: "#fb923c" }}>{P.subcutaneousFat}%</div><div className="l">G.Sub</div></div>
      </div>

      <div className="c co" style={{ marginTop: 14 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <span style={{ fontSize: 22, flexShrink: 0 }}>🌊</span>
          <p style={{ fontSize: 13, lineHeight: 1.65, color: "#9db3cc" }}>
            Tu IMC es normal pero tu grasa (32.9%) permite <strong style={{ color: "#fff" }}>recomposición corporal</strong>: ganar músculo y perder grasa a la vez. Tu programa Chloe Ting Hourglass + estos ejercicios extra con tu barra y mancuernas = resultados. 🌺
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
      <div className="st">🏋️‍♀️ Entreno Extra (complementa Chloe Ting)</div>
      <div className="c" style={{ marginBottom: 14, background: "rgba(255,107,157,.06)", borderColor: "rgba(255,107,157,.15)" }}>
        <p style={{ fontSize: 12.5, color: "#9db3cc", lineHeight: 1.6 }}>
          ⏳ Estos ejercicios <strong style={{ color: "#fff" }}>complementan</strong> tu programa Hourglass 2024 de Chloe Ting. Puedes hacerlos los días que no tengas vídeo de Chloe, o añadirlos después si te queda energía.
        </p>
      </div>
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
      <div className="c co" style={{ marginTop: 10 }}>
        <p style={{ fontSize: 12.5, color: "#9db3cc", lineHeight: 1.65 }}>📈 <strong style={{ color: "#fff" }}>Progresión:</strong> Cuando 4×12 sea fácil, sube a 4×15. Luego añade más discos a la barra. Tu barra actual llega a 14kg — cuando domines eso, compra discos de 10kg.</p>
      </div>
    </div>
  );
}

/* ═══════ NUTRITION ═══════ */
function Food() {
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [mealDay, setMealDay] = useState(() => { const d = new Date().getDay(); return d === 0 ? 6 : d - 1; });
  const ref = useRef(null);

  const reset = () => { setPreview(null); setResult(null); setError(null); if (ref.current) ref.current.value = ""; };

  const analyze = async (file) => {
    setBusy(true); setResult(null); setError(null);
    try {
      const b64 = await shrink(file);
      const r = await fetch("/api/food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: b64 }),
      });
      const data = await r.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e) {
      setError(String(e.message || e));
    }
    setBusy(false);
  };

  const tm = MEALS[mealDay];

  return (
    <div className="pg">
      <div className="st">🥑 Macros Diarios</div>
      <div className="c">
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Ring value={MACROS.calories} max={2500} label="Calorías" color="#FFD93D" />
          <Ring value={MACROS.protein} max={180} label="Proteína" color="#FF6B9D" />
          <Ring value={MACROS.carbs} max={300} label="Carbos" color="#c084fc" />
          <Ring value={MACROS.fat} max={80} label="Grasa" color="#00C9DB" />
        </div>
      </div>

      <div className="st" style={{ marginTop: 16 }}>📸 Analiza tu Comida</div>
      <input type="file" ref={ref} accept="image/*" capture="environment" style={{ display: "none" }} onChange={e => {
        const f = e.target.files?.[0]; if (!f) return;
        setPreview(URL.createObjectURL(f)); analyze(f);
      }} />

      {!preview && !busy && !result && !error && (
        <div className="up" onClick={() => ref.current?.click()}>
          <Camera size={36} color="#FF6B9D" style={{ margin: "0 auto 12px" }} />
          <p style={{ fontWeight: 700, fontSize: 15 }}>Toca para foto 📷</p>
          <p style={{ fontSize: 12, color: "#7a8ba8", marginTop: 6 }}>La IA analizará los macros de tu plato</p>
        </div>
      )}

      {preview && (
        <div style={{ position: "relative", marginBottom: 14 }}>
          <img src={preview} alt="" style={{ width: "100%", borderRadius: 20, maxHeight: 200, objectFit: "cover" }} />
          {!busy && <button onClick={reset} style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,.6)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={16} color="#fff" /></button>}
        </div>
      )}

      {busy && <div className="c" style={{ textAlign: "center", padding: 28 }}><div className="td" style={{ marginBottom: 10 }}><span /><span /><span /></div><p style={{ fontSize: 13, color: "#7a8ba8" }}>Analizando tu comida... 🔍</p></div>}

      {error && (
        <div className="c" style={{ borderColor: "rgba(239,68,68,.25)", background: "rgba(239,68,68,.06)" }}>
          <p style={{ fontSize: 13, color: "#fca5a5", fontWeight: 700, marginBottom: 6 }}>⚠️ Error</p>
          <p style={{ fontSize: 12, color: "#9db3cc", lineHeight: 1.5 }}>{error}</p>
          <button onClick={reset} style={{ marginTop: 12, width: "100%", padding: 12, borderRadius: 12, border: "1px solid #1e3355", background: "#152238", color: "#f0f4ff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>📸 Intentar otra foto</button>
        </div>
      )}

      {result && (
        <div style={{ animation: "fu .4s" }}>
          <div className="c cg">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ fontFamily: "Quicksand", fontSize: 16, fontWeight: 700 }}>{result.alimento}</h3>
              <div style={{ background: "linear-gradient(135deg,#FF6B9D,#FF8E53)", borderRadius: 12, padding: "5px 14px", fontFamily: "Quicksand", fontWeight: 700, fontSize: 15 }}>{result.puntuacion}/10</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[{ l: "Cal", v: result.calorias, c: "#FFD93D" }, { l: "Prot", v: result.proteinas, c: "#FF6B9D" }, { l: "Carbs", v: result.carbohidratos, c: "#c084fc" }, { l: "Grasa", v: result.grasas, c: "#00C9DB" }].map(m => (
                <div key={m.l} style={{ textAlign: "center", background: "rgba(255,255,255,.03)", borderRadius: 12, padding: "10px 4px" }}>
                  <div style={{ fontFamily: "Quicksand", fontWeight: 700, fontSize: 18, color: m.c }}>{m.v}</div>
                  <div style={{ fontSize: 10, color: "#7a8ba8", marginTop: 2 }}>{m.l}</div>
                </div>
              ))}
            </div>
            {result.valoracion && <p style={{ fontSize: 13, color: "#9db3cc", lineHeight: 1.6, marginBottom: 6 }}>✅ {result.valoracion}</p>}
            {result.sugerencia && <p style={{ fontSize: 13, color: "#9db3cc", lineHeight: 1.6 }}>💡 {result.sugerencia}</p>}
          </div>
          <button onClick={reset} style={{ width: "100%", padding: 14, borderRadius: 16, border: "1px solid #1e3355", background: "#152238", color: "#f0f4ff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>📸 Analizar otra comida</button>
        </div>
      )}

      <div className="st" style={{ marginTop: 20 }}>🥗 Plan Comidas (sin pescado)</div>
      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 12 }}>
        {MEALS.map((m, i) => <button key={i} className={`dc ${mealDay === i ? "on3" : ""}`} onClick={() => setMealDay(i)}>{m.label}</button>)}
      </div>
      <div className="c" style={{ background: "rgba(255,217,61,.04)", borderColor: "rgba(255,217,61,.1)" }}>
        {tm.meals.map((m, i) => (
          <div key={i} className="mc">
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{m.time}</div>
            <div style={{ fontSize: 13, color: "#9db3cc", lineHeight: 1.5 }}>{m.desc}</div>
            <div style={{ display: "flex", gap: 10, marginTop: 6, fontSize: 11, color: "#7a8ba8" }}>
              <span><strong style={{ color: "#f0f4ff" }}>{m.cal}</strong> kcal</span>
              <span><strong style={{ color: "#f0f4ff" }}>{m.prot}g</strong> prot</span>
            </div>
          </div>
        ))}
        <div style={{ textAlign: "center", marginTop: 10, fontSize: 12, color: "#7a8ba8" }}>
          Total: <strong style={{ color: "#FFD93D" }}>{tm.meals.reduce((a, m) => a + m.cal, 0)} kcal</strong> · <strong style={{ color: "#FF6B9D" }}>{tm.meals.reduce((a, m) => a + m.prot, 0)}g prot</strong>
        </div>
      </div>
    </div>
  );
}

/* ═══════ CHAT ═══════ */
function Chat() {
  const [msgs, setMsgs] = useState([
    { r: "b", t: "¡Aloha Lidia! 🌺 Soy tu coach de fitness y nutrición personalizado.\n\nConozco tus datos, tu equipo en casa, tu programa Chloe Ting Hourglass y tu alimentación. Pregúntame lo que necesites: técnica de ejercicios, alternativas de comida, suplementos, dudas del plan... ¡Estoy aquí para ti! 💪" }
  ]);
  const [inp, setInp] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, busy]);

  const send = async () => {
    if (!inp.trim() || busy) return;
    const txt = inp.trim();
    setInp("");
    const updated = [...msgs, { r: "u", t: txt }];
    setMsgs(updated);
    setBusy(true);
    try {
      const conv = updated.slice(1); // skip welcome message
      const apiMsgs = conv.map(m => ({ role: m.r === "u" ? "user" : "assistant", content: m.t }));
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMsgs }),
      });
      const data = await r.json();
      if (data.error) throw new Error(data.error);
      setMsgs(prev => [...prev, { r: "b", t: data.text }]);
    } catch (e) {
      setMsgs(prev => [...prev, { r: "e", t: String(e.message || e) }]);
    }
    setBusy(false);
  };

  return (
    <div className="pg" style={{ paddingBottom: 0, height: "calc(100vh - 135px)", display: "flex", flexDirection: "column" }}>
      <div className="st" style={{ flexShrink: 0 }}>🌺 Chat con tu Coach</div>
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
        <input type="text" placeholder="Pregúntame lo que quieras... 🌺" value={inp}
          onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
        <button className="sn" onClick={send} disabled={!inp.trim() || busy}><Send size={18} /></button>
      </div>
    </div>
  );
}

/* ═══════ NAV & APP ═══════ */
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
.up{border:2px dashed rgba(255,107,157,.3);border-radius:20px;padding:32px;text-align:center;cursor:pointer;background:rgba(255,107,157,.04)}
.td span{display:inline-block;width:7px;height:7px;border-radius:50%;background:#7a8ba8;animation:pu 1.2s infinite;margin:0 2px}.td span:nth-child(2){animation-delay:.2s}.td span:nth-child(3){animation-delay:.4s}
.tg{display:inline-block;padding:4px 10px;border-radius:10px;font-size:11px;font-weight:600;margin:3px 3px 3px 0}.tp{background:rgba(255,107,157,.12);color:#FF6B9D;border:1px solid rgba(255,107,157,.18)}.tb{background:rgba(0,201,219,.12);color:#00C9DB;border:1px solid rgba(0,201,219,.18)}
.wh{display:inline-block;animation:wv 1.8s ease infinite;transform-origin:70% 70%}.flt{animation:fl 3s ease infinite}
.mc{background:rgba(255,255,255,.02);border-radius:14px;padding:12px 14px;margin-bottom:8px;border:1px solid rgba(255,255,255,.03)}
.dc{padding:8px 14px;border-radius:12px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid #1e3355;background:#152238;color:#7a8ba8;font-family:'Quicksand';white-space:nowrap;transition:all .2s}.dc.on3{background:#FFD93D;color:#1a1a2e;border-color:transparent}
      `}</style>
      <div className="app">
        <div className="hd">
          <h1><span className="ac">Fit</span>Coach 🌺</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px rgba(74,222,128,.5)" }} />
            <span style={{ fontSize: 11, color: "#7a8ba8", fontWeight: 600 }}>Ohana</span>
          </div>
        </div>
        {tab === "h" && <Dash setTab={setTab} />}
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
