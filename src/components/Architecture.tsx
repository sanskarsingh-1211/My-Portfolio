import { motion } from "framer-motion";
import { ChapterHeader } from "./UI";
import { audio } from "../utils/audio";

/* ---------- Architecture Diagram (SVG) ---------- */
function ArchDiagram() {
  return (
    <svg viewBox="0 0 800 400" className="h-full w-full">
      <defs>
        <linearGradient id="arch-flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.0" />
        </linearGradient>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#00F0FF" />
        </marker>
      </defs>

      {/* Background grid */}
      <pattern id="arch-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,240,255,0.08)" strokeWidth="0.5" />
      </pattern>
      <rect width="800" height="400" fill="url(#arch-grid)" />

      {/* Layer labels */}
      <text x="20" y="30" fill="rgba(0,240,255,0.5)" fontSize="10" fontFamily="monospace" letterSpacing="2">DATA · STREAMS</text>
      <text x="20" y="130" fill="rgba(0,240,255,0.5)" fontSize="10" fontFamily="monospace" letterSpacing="2">PLATFORM · LAYER</text>
      <text x="20" y="230" fill="rgba(0,240,255,0.5)" fontSize="10" fontFamily="monospace" letterSpacing="2">CLOUD · INFRA</text>
      <text x="20" y="330" fill="rgba(0,240,255,0.5)" fontSize="10" fontFamily="monospace" letterSpacing="2">USER · INTERFACE</text>

      {/* Nodes */}
      {[
        { x: 200, y: 60, w: 130, h: 40, label: "Power BI · Analytics", color: "#F2C811" },
        { x: 380, y: 60, w: 130, h: 40, label: "Dynamics 365", color: "#0078D4" },
        { x: 560, y: 60, w: 130, h: 40, label: "Zoho One", color: "#E42528" },
        { x: 200, y: 160, w: 130, h: 40, label: "Power Platform", color: "#742774" },
        { x: 380, y: 160, w: 130, h: 40, label: "Python · AI/ML", color: "#FFD43B" },
        { x: 560, y: 160, w: 130, h: 40, label: "Logic Apps", color: "#00B8FF" },
        { x: 200, y: 260, w: 130, h: 40, label: "Azure · VNet", color: "#0078D4" },
        { x: 380, y: 260, w: 130, h: 40, label: "AWS · Services", color: "#FF9900" },
        { x: 560, y: 260, w: 130, h: 40, label: "Entra ID", color: "#2D7D9A" },
        { x: 380, y: 340, w: 130, h: 40, label: "M365 · Teams", color: "#D83B01" },
      ].map((n, i) => (
        <g key={i}>
          <rect
            x={n.x} y={n.y} width={n.w} height={n.h}
            rx="6" fill={`${n.color}15`} stroke={n.color} strokeWidth="1"
          />
          <circle cx={n.x + 14} cy={n.y + 20} r="3" fill={n.color}>
            <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <text
            x={n.x + 24} y={n.y + 25}
            fill="#E6F7FF" fontSize="11" fontFamily="monospace" letterSpacing="0.5"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* Connection lines */}
      {[
        ["M 265 100 L 265 160", "#00F0FF"],
        ["M 445 100 L 445 160", "#00F0FF"],
        ["M 625 100 L 625 160", "#00F0FF"],
        ["M 265 200 L 265 260", "#00B8FF"],
        ["M 445 200 L 445 260", "#00B8FF"],
        ["M 625 200 L 625 260", "#00B8FF"],
        ["M 445 300 L 445 340", "#6EEBFF"],
      ].map(([d, c], i) => (
        <path
          key={i}
          d={d as string}
          stroke={c as string}
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 3"
          opacity="0.6"
        >
          <animate attributeName="stroke-dashoffset" values="0;-14" dur="1.5s" repeatCount="indefinite" />
        </path>
      ))}

      {/* Flow particles */}
      {[
        ["M 265 130 L 265 130", 2],
        ["M 445 130 L 445 130", 2.5],
        ["M 625 130 L 625 130", 3],
      ].map(([d, dur], i) => (
        <circle key={i} r="2" fill="#00F0FF" filter="url(#glow)">
          <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={d as string} />
        </circle>
      ))}

      {/* Pulsing core */}
      <circle cx="445" cy="200" r="6" fill="#00F0FF">
        <animate attributeName="r" values="6;14;6" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.2;1" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="445" cy="200" r="2" fill="#fff" />
    </svg>
  );
}

export default function Architecture() {
  return (
    <section id="architecture" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <ChapterHeader id="EXTRA" label="ARCHITECTURE" desc="Reference Enterprise Topology" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onMouseEnter={() => audio.hover()}
            className="glass-strong neon-border relative col-span-1 h-[420px] overflow-hidden rounded-2xl lg:col-span-3"
          >
            <div className="absolute left-4 top-4 z-10 font-mono text-[10px] tracking-widest text-cyan-300/70">
              ◆ ARCHITECTURE.v4 · LIVE TOPOLOGY
            </div>
            <div className="absolute right-4 top-4 z-10 font-mono text-[10px] tracking-widest text-cyan-300/70">
              <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 blink" />
              STREAMING
            </div>
            <ArchDiagram />
          </motion.div>

          {/* Legend */}
          <div className="col-span-1 flex flex-col gap-3 lg:col-span-2">
            {[
              {
                title: "Experience Stack",
                desc: "Dynamics 365 CE, Power Apps, Power Pages, M365 — every layer integrated, every workflow automated.",
                icon: "◆",
              },
              {
                title: "Cloud Foundation",
                desc: "Azure landing zones (Hub-Spoke), AWS multi-account, Entra ID identity, hybrid networking.",
                icon: "⬡",
              },
              {
                title: "Data & AI",
                desc: "Power BI dashboards, Azure ML, AWS SageMaker, Python pipelines feeding business intelligence.",
                icon: "◈",
              },
              {
                title: "Resilience",
                desc: "Veeam + Acronis + Azure Backup. BaaS multi-tenant. RTO/RPO tuned for regulated workloads.",
                icon: "◉",
              },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                onMouseEnter={() => audio.hover()}
                className="glass rounded-xl p-4 transition hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3">
                  <div className="font-display text-2xl text-cyan-300">{b.icon}</div>
                  <div className="font-display text-sm font-bold text-white">{b.title}</div>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-cyan-100/75">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
