# Portfolio — Juan Manuel Sirtori Cortina

Portafolio de UX para aplicar a co-ops en 2027, con foco en entretenimiento.

## Objetivo y fechas
- **Target principal:** EA SPORTS FC Quality Designer Co-op (mayo 2027).
- **Deadline de aplicación:** viernes 14 nov 2026.
- **Case study completo de Ignitia:** antes del 5 dic 2026 (antes del screening).
- El rol de EA es híbrido QA + process design, no UX puro. Juan no tiene experiencia en game dev; plan para cerrar ese gap: Global Game Jam (enero 2027).

## Stack
- React + Vite (oxlint para lint).
- `React.lazy()` para cargar los case studies.
- Carpetas = `<button>` semántico.
- Deploy: Vercel → `juansirtori.vercel.app`.
- Repo: https://github.com/jmsirtori/portfolio (rama `main`).

Comandos: `npm run dev` · `npm run build` · `npm run lint` · `npm run preview`

## Estructura
- `src/App.jsx` — shell principal (explorador de archivos).
- `src/components/FolderCard.jsx` — carpeta de proyecto (abierta / locked).
- `src/components/PreviouslyAt.jsx` — barra "Previously at".
- `src/cases/Ignitia.jsx` — case study de Ignitia.

## Concepto visual
Explorador de archivos retro 90s/2000s, **solo en el shell**. El contenido de cada case study va limpio y legible.

Las 4 reglas CSS del shell:
1. Border sólido.
2. `box-shadow` sin blur.
3. Fuente monospace en etiquetas.
4. Fondo gris claro.

## Scope V1
- **Ignitia SEO Auditor**: case study completo.
- **Toronto Bike Repair**: carpeta locked, "In Progress".
- **Barra "Previously at"**: Universal Pictures, PepsiCo, U of T, Ignitia.

### Entregable del viernes 14 nov
Shell desplegado con:
- Nombre.
- Barra "Previously at".
- Carpeta Ignitia: "In Progress — Full case study by Dec 5".
- Carpeta Toronto: locked.

### Case study de Ignitia (8 secciones)
Problem → Who It's For → Key Design Decisions → Building It → Testing → What I Learned → What's Next → Reflection

- **Testing:** Juan es el único usuario. Se presenta como "Self-testing & iteration in production".
- **Sin sección de Results:** se reemplazó por "What I Learned", para no inventar métricas.
- **Demo:** video de 60-90s con captions, con Ignitia auditando su propio sitio. Se graba después del viernes.
- **Fuente del contenido:** el chat de Claude donde se desarrolló la app.

### Contexto de Ignitia (para el case study)
Micro-consultoría de performance digital de Juan (getignitia.com). Tiene 3 piezas:
1. **Landing:** HTML plano en Netlify.
2. **Herramienta pública `/audit`:** lead magnet. Usa Claude Haiku con web search, da un friction score de 1 a 10 y muestra 2 problemas. Los leads se guardan en Notion.
3. **App interna `flow-auditor.vercel.app`:** React + Vite + Supabase + Claude Sonnet. Incluye historial de clientes, re-auditorías comparativas, reporte de 4 secciones, 5 quick wins y es bilingüe ES/EN.

Marca: fondo `#060a10`, naranja `#FF4500`, estética terminal, todo en mayúsculas.

## V2 (futuro)
Escritorio completo con ventanas, posiblemente con tipografía Art Deco.

## Reglas del proyecto
- **Contenido antes que código.**
- **Accesibilidad:** Lighthouse 90+ y navegación completa con teclado.
- **Cero métricas inventadas.**
- **Nada de datos de clientes sin permiso.**
- **Proyectos end-to-end:** se muestra el proceso completo; no hace falta que el producto esté lanzado.
- Comunicación con Juan en español; el contenido del portafolio va en inglés.
