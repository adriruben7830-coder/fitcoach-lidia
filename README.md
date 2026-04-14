# 🌺 FitCoach AI — Entrenador Personal con Inteligencia Artificial

<div align="center">

**App web personalizada de fitness y nutrición con IA integrada.**

Análisis de comida por foto · Chat con IA especializado · Planes de entreno y nutrición

[Ver App en Vivo →](https://fitcoach-lidia.vercel.app)

</div>

---

## 🚀 Sobre el Proyecto

FitCoach AI es una aplicación web progresiva (PWA) que actúa como **entrenador personal y nutricionista virtual**, personalizada para cada usuario con sus datos reales de composición corporal, equipo disponible, restricciones alimentarias y objetivos específicos.

La app utiliza **Claude AI de Anthropic** como motor de inteligencia artificial para ofrecer dos funcionalidades clave: un chatbot experto en fitness/nutrición que conoce el perfil completo del usuario, y un analizador de comida por fotografía que estima macronutrientes y ofrece recomendaciones personalizadas.

### ¿Por qué este proyecto?

Una amiga cercana llevaba meses entrenando en casa usando ChatGPT básico como guía, sin ninguna personalización real. Le propuse construir algo mejor: una herramienta que realmente conociera sus datos, su equipo, su alimentación y sus objetivos, y que le diera respuestas profesionales y personalizadas.

El resultado es una app que cualquier persona puede usar desde su móvil, instalable como aplicación nativa, con una interfaz premium optimizada para móvil.

---

## ✨ Funcionalidades

### 📊 Dashboard Personalizado
- Datos reales de composición corporal (peso, grasa, músculo, IMC, agua corporal, grasa visceral...)
- Barra de progreso hacia el objetivo
- Visualización de suplementos y equipo disponible

### 🏋️‍♀️ Plan de Entrenamiento
- 5 días de rutinas diseñadas para entrenar en casa
- Ejercicios adaptados al equipo real del usuario (mancuernas, barra, bandas, lastres)
- Tips técnicos de ejecución para cada ejercicio
- Indicaciones de progresión

### 🥗 Nutrición Inteligente
- **Analizador de comida por foto con IA**: haz una foto a tu plato y obtén calorías, proteínas, carbohidratos, grasas, valoración y sugerencias de mejora
- Macros diarios calculados según objetivos
- Plan de comidas rotativo de 7 días (lunes a domingo)
- Adaptado a restricciones alimentarias del usuario

### 💬 Chat con IA Especializado
- Chatbot que conoce el perfil completo del usuario
- Responde sobre ejercicios, alimentación, suplementos, técnica, alternativas...
- Basado en evidencia científica
- Respuestas personalizadas, no genéricas

### 📱 Instalable como App (PWA)
- Se instala en la pantalla de inicio del móvil
- Se abre a pantalla completa como una app nativa
- Sin necesidad de App Store ni Google Play

---

## 🛠️ Tech Stack

| Tecnología | Uso |
|---|---|
| **Next.js 14** | Framework React con App Router y API Routes |
| **React 18** | Interfaz de usuario con hooks |
| **Claude AI (Anthropic)** | Motor de IA para chat y análisis de imágenes |
| **Vercel** | Hosting y despliegue serverless |
| **PWA** | Manifest + meta tags para instalación nativa |
| **Lucide React** | Iconografía |
| **Google Fonts** | Tipografías (Lilita One, Quicksand, Nunito) |

---

## 📐 Arquitectura

```
fitcoach/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.js        # API Route — Chat con IA
│   │   └── food/
│   │       └── route.js        # API Route — Análisis de fotos
│   ├── layout.js               # Layout con PWA config
│   └── page.jsx                # App principal (SPA)
├── public/
│   ├── manifest.json           # PWA manifest
│   └── icon.svg                # Icono de la app
├── .env.local                  # API Key (no se sube a git)
├── next.config.js
└── package.json
```

**Flujo de la IA:**

```
Usuario envía mensaje/foto
        ↓
Frontend comprime imagen (si aplica) y envía a API Route
        ↓
API Route (servidor) → Anthropic Claude API
        ↓
Respuesta procesada → Frontend muestra resultado
```

Las llamadas a la API de Anthropic se hacen desde el **servidor** (API Routes de Next.js), nunca desde el cliente. Esto protege la API Key y evita problemas de CORS.

---

## 🎨 Diseño

- **Estética tropical/hawaiana** con paleta de colores océano oscuro
- Optimizada para **mobile-first** (max-width 430px)
- Animaciones suaves (fade-in, floating, wave)
- Tipografías display (Lilita One) + lectura (Quicksand, Nunito)
- Gradientes coral-rosa-amarillo como acento principal
- Dark mode nativo

---

## ⚡ Instalación Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/adriruben7830-coder/fitcoach-lidia.git
cd fitcoach-lidia

# 2. Instalar dependencias
npm install

# 3. Configurar API Key
# Crear archivo .env.local con:
ANTHROPIC_API_KEY=tu_clave_de_anthropic

# 4. Arrancar en desarrollo
npm run dev

# 5. Abrir en navegador
# http://localhost:3000
```

### Requisitos
- Node.js 18+
- API Key de [Anthropic](https://console.anthropic.com)

---

## 🌐 Despliegue en Vercel

1. Sube el proyecto a GitHub
2. Importa el repositorio en [Vercel](https://vercel.com)
3. Añade la variable de entorno `ANTHROPIC_API_KEY`
4. Deploy automático

---

## 📱 Instalación en Móvil (PWA)

**iPhone (Safari):**
1. Abre la URL de la app en Safari
2. Toca el botón Compartir (⬆️)
3. Selecciona "Añadir a pantalla de inicio"
4. Toca "Añadir"

**Android (Chrome):**
1. Abre la URL de la app en Chrome
2. Toca el menú (⋮) arriba a la derecha
3. Selecciona "Añadir a pantalla de inicio"

---

## 🔮 Roadmap

- [ ] Historial de comidas analizadas con tracking diario
- [ ] Sistema de logros y rachas de entrenamiento
- [ ] Gráficos de progreso de peso y medidas
- [ ] Notificaciones de recordatorio de entreno
- [ ] Exportar datos a PDF
- [ ] Multi-usuario (diferentes perfiles)

---

## 👨‍💻 Autor

**Adrián** — Desarrollador Web & Fundador de MØRK Studio

Estudiante de DAW (Desarrollo de Aplicaciones Web) apasionado por crear experiencias digitales premium con tecnologías modernas e inteligencia artificial.

- GitHub: [@adriruben7830-coder](https://github.com/adriruben7830-coder)

---

## 📄 Licencia

Este proyecto es de código abierto con fines educativos y de portfolio.
