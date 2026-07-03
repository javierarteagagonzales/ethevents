# 🎨 ETH Events — Design System

> Documento de referencia para mantener consistencia visual en todo el proyecto.
> **Respetar estos estilos en todas las funcionalidades nuevas.**

---

## 🎨 Paleta de Colores

| Token | Valor | Uso |
|-------|-------|-----|
| `--bg` / `bg` | `#020308` | Fondo principal de página |
| `--surface` | `rgba(10, 12, 20, 0.75)` | Cards, paneles, nav |
| `--surface-2` | `rgba(18, 22, 34, 0.9)` | Inputs, overlays secundarios |
| `--accent` | `#627eea` | Color principal de marca (azul Ethereum) |
| `--accent-2` | `#8a9ff5` | Variante clara del accent |
| `--accent-glow` | `rgba(98, 126, 234, 0.18)` | Glow/halo del accent |
| `--accent-glow-strong` | `rgba(98, 126, 234, 0.35)` | Glow fuerte |
| `--muted` | `#7b8db0` | Texto secundario |
| `--text` | `#f0f4ff` | Texto principal |
| `--success` | `#10b981` | Estados positivos |
| `--warning` | `#f59e0b` | Alertas / Hackathons |
| `--border` | `rgba(255,255,255, 0.07)` | Bordes sutiles |
| `--border-bright` | `rgba(255,255,255, 0.14)` | Bordes en foco / hover |

### Gradientes de marca
```css
/* Texto degradado principal */
background: linear-gradient(135deg, #fff 0%, #8a9ff5 50%, #627eea 100%);

/* Texto degradado accent */
background: linear-gradient(90deg, #627eea 0%, #8a9ff5 100%);

/* Shimmer animado (hero h1) */
background: linear-gradient(90deg, #627eea, #a78bfa, #627eea);
background-size: 200% auto;
animation: shimmer 4s linear infinite;
```

---

## 🔤 Tipografía

| Familia | Variable | Uso |
|---------|----------|-----|
| **Inter** | `font-sans` | Cuerpo, títulos, descripciones |
| **Space Mono** | `font-mono` | Labels, badges, botones, tags |

### Tamaños frecuentes
- Título hero: `text-6xl md:text-8xl font-extrabold`
- Título sección: `text-2xl md:text-3xl font-extrabold`
- Label mono pequeño: `font-mono text-[10px] tracking-[0.2em]`
- Texto cuerpo: `text-sm leading-relaxed`

---

## 🧱 Componentes Base

### Nav Flotante
```html
<!-- Siempre usar #main-nav con estas clases base -->
<nav id="main-nav" class="fixed top-4 left-1/2 -translate-x-1/2 
  w-[calc(100%-48px)] max-w-[1100px] h-14 rounded-[20px]
  bg-[rgba(8,10,18,0.72)] backdrop-blur-2xl
  border border-[rgba(98,126,234,0.15)]
  shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-[999]">
```
- Se vuelve `.scrolled` al bajar (más oscuro, con más sombra)
- Siempre `position: fixed`, centrado horizontalmente con `left-1/2 -translate-x-1/2`

### Cards de Evento
```html
<div class="event-card group rounded-[22px] border border-white/6
  bg-gradient-to-b from-white/[0.05] to-transparent
  backdrop-blur-xl transition-all duration-500
  hover:-translate-y-2.5 hover:border-accent/35
  hover:shadow-[0_30px_70px_rgba(0,0,0,0.65),0_0_50px_rgba(98,126,234,0.12)]">
```
- Siempre `rounded-[22px]`
- Siempre `backdrop-blur-xl`
- Efecto shimmer y mouse-tracking glow via JS (ya definido en Layout)

### Botón Principal (CTA)
```html
<a class="btn-glow btn-magnetic font-mono text-[11px] px-5 py-2
  bg-accent/10 border border-accent/30 text-accent
  hover:bg-accent hover:text-white rounded-xl transition-all tracking-[0.08em]">
```
- Usar `.btn-glow` para efecto de destello en hover
- Usar `.btn-magnetic` para efecto de atracción magnética hacia el cursor

### Botón Secundario / Ghost
```html
<button class="px-6 py-2.5 bg-surface border border-white/10
  hover:bg-surface-2 hover:border-white/20 text-white
  font-mono text-xs font-bold rounded-xl transition-all">
```

### Badges de tipo de evento
```css
conference:  bg-accent/10   text-accent    border-accent/25    shadow-[0_0_12px_rgba(98,126,234,0.15)]
workshop:    bg-success/10  text-success   border-success/25   shadow-[0_0_12px_rgba(16,185,129,0.15)]
hackathon:   bg-warning/10  text-warning   border-warning/25   shadow-[0_0_12px_rgba(245,158,11,0.15)]
meetup:      bg-purple-500/10 text-purple-400 border-purple-500/25
bootcamp:    bg-indigo-500/10 text-indigo-400 border-indigo-500/25
cohorte:     bg-pink-500/10   text-pink-400   border-pink-500/25
buildathon:  bg-teal-500/10   text-teal-400   border-teal-500/25
grant:       bg-yellow-500/10 text-yellow-400  border-yellow-500/25
```

### Glass Card (overlay / modales / paneles)
```html
<div class="glass-card rounded-3xl">
  <!-- glass-card aplica: backdrop-blur-xl, bg rgba(12,15,25,0.65), border rgba(255,255,255,0.07) -->
```

### Inputs del Formulario
```html
<input class="block w-full bg-surface-2 border border-white/10 rounded-xl
  px-4 pb-2.5 pt-6 text-white
  focus:border-accent focus:bg-accent/5 focus:ring-1 focus:ring-accent
  outline-none transition-all peer">
```
- Siempre usar floating label con `.peer` + `peer-focus:` utilities

---

## ✨ Efectos y Animaciones

### Reveal on Scroll
```html
<!-- Agregar clase para animar entrada al hacer scroll -->
<div class="reveal-hidden">
  <!-- Al entrar al viewport se agrega .reveal-visible via IntersectionObserver -->
```

### Partículas de fondo
- Definidas en `Layout.astro` vía `<canvas id="particles-canvas">`
- Automático, no necesita configuración adicional

### Glow orbs de fondo
- Definidos en `.glow-orb::after` y `.glow-orb::before` en `global.css`
- Aplicados automáticamente en `<body class="glow-orb">`

### Cursor glow
- Definido en Layout, sigue al mouse con `#cursor-glow`
- Automático, no necesita configuración adicional

### Animaciones disponibles (Tailwind)
| Clase | Efecto |
|-------|--------|
| `animate-float` | Levitar suave 3s |
| `animate-glow-pulse` | Pulsación de sombra brillante |
| `animate-slide-up` | Deslizar desde abajo 0.6s |
| `animate-fade-in` | Aparecer 0.4s |
| `animate-shimmer` | Texto con gradiente en movimiento |
| `animate-modal-fade` | Entrada de modal/overlay |
| `animate-pulse` | Pulso (dot, indicadores) |

### Gradient Text
```html
<span class="gradient-text">Texto degradado blanco→accent</span>
<span class="gradient-text-accent">Texto degradado accent</span>
```

---

## 📐 Espaciado y Layout

- **Contenedor máximo principal:** `max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10`
- **Padding top de páginas (nav flotante):** `pt-28` en `<main>` o `padding-top: 9rem` en hero
- **Gap entre cards:** `gap-6`
- **Grid de cards:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- **Border radius cards:** `rounded-[22px]`
- **Border radius botones:** `rounded-xl` (pequeños) / `rounded-2xl` (grandes)
- **Border radius nav:** `rounded-[20px]`

---

## 🔧 Utilidades CSS Custom (global.css)

| Clase | Descripción |
|-------|-------------|
| `.btn-glow` | Destello de luz en hover |
| `.btn-magnetic` | Atracción magnética hacia el cursor (requiere JS en Layout) |
| `.gradient-text` | Texto blanco→accent degradado |
| `.gradient-text-accent` | Texto accent→accent-2 degradado |
| `.glass-card` | Fondo glassmorphism estándar |
| `.pulse-dot` | Punto pulsante con anillo animado |
| `.cursor-blink` | Cursor parpadeante (tipo terminal) |
| `.reveal-hidden` / `.reveal-visible` | Animación de entrada al scroll |
| `.section-divider` | Línea divisora con degradado |
| `.tag-hover` | Tag con hover suave |
| `.grid-bg` | Grid de puntos en el fondo (en `<body>`) |
| `.glow-orb` | Orbs de luz animados en el fondo (en `<body>`) |

---

## 📦 Estructura del Proyecto

```
src/
├── components/
│   ├── Header.astro        ← Nav flotante glassmorphism
│   ├── EventCard.astro     ← Card de evento con efectos premium
│   ├── FilterBar.astro     ← Barra de filtros
│   ├── Modal.astro         ← Modal de detalle de evento
│   ├── StatsBar.astro      ← Estadísticas
│   └── Calendar.astro      ← Vista calendario
├── layouts/
│   └── Layout.astro        ← Layout base (partículas, cursor glow, FAB, scroll-top)
├── pages/
│   ├── index.astro         ← Página principal
│   ├── submit.astro        ← Formulario de propuesta
│   └── proyectos.astro     ← Proyectos / equipo
└── styles/
    └── global.css          ← Tokens, efectos globales, utilidades custom
```

---

## ⚠️ Reglas de consistencia

1. **Nunca usar colores planos** (`red`, `blue`, `green`). Siempre usar los tokens del sistema.
2. **Todo fondo oscuro** debe tener `backdrop-blur` si es transparente.
3. **Bordes** siempre con `rgba` bajo opacidad (`border-white/7`, `border-accent/25`).
4. **Textos secundarios** → `text-muted` (nunca `text-gray-*`).
5. **Botones primarios** → siempre `.btn-glow` + `.btn-magnetic`.
6. **Nuevas páginas** deben tener `pt-28` en el `<main>` para no quedar bajo el nav flotante.
7. **i18n**: Todos los textos visibles deben tener `data-i18n="clave"` y entry en el diccionario ES + EN.
8. **Animaciones de entrada**: Usar `.reveal-hidden` en secciones y bloques principales.
