import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChapterHeader } from "./UI";
import { PROJECTS } from "../data";
import { audio } from "../utils/audio";
import { X, Cpu, GitBranch, Target, Sparkles, Wrench } from "lucide-react";

export default function Vault() {
  const [open, setOpen] = useState<number | null>(null);
  const project = open !== null ? PROJECTS[open] : null;

  return (
    <section id="vault" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-15" />

      <div className="relative mx-auto max-w-7xl px-6">
        <ChapterHeader id="04" label="PROJECT VAULT" desc="Holographic Archive of Enterprise Work" />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => { setOpen(i); audio.chime(); }}
              onMouseEnter={() => audio.hover()}
              className="group glass-strong relative h-64 overflow-hidden rounded-2xl text-left"
              style={{ borderColor: `${p.color}40` }}
            >
              {/* Animated glow blob */}
              <motion.div
                animate={{ x: ["-20%", "20%", "-20%"], y: ["-10%", "10%", "-10%"] }}
                transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
                style={{ background: p.color, opacity: 0.3 }}
              />

              {/* Cube face pattern */}
              <div className="absolute inset-0 opacity-30">
                <svg className="h-full w-full" viewBox="0 0 200 200">
                  <defs>
                    <linearGradient id={`grad-${p.id}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={p.color} stopOpacity="0.6" />
                      <stop offset="100%" stopColor={p.color} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {Array.from({ length: 6 }).map((_, k) => (
                    <line
                      key={k}
                      x1={(k + 1) * 30} y1="0" x2={(k + 1) * 30} y2="200"
                      stroke={`url(#grad-${p.id})`} strokeWidth="0.5"
                    />
                  ))}
                </svg>
              </div>

              <div className="relative flex h-full flex-col justify-between p-5">
                <div>
                  <div
                    className="mb-3 inline-block rounded-full px-2 py-0.5 font-mono text-[10px] tracking-widest"
                    style={{ background: `${p.color}20`, color: p.color, border: `1px solid ${p.color}40` }}
                  >
                    {p.category}
                  </div>
                  <div className="font-mono text-[10px] tracking-widest text-cyan-300/60">CLIENT · {p.client}</div>
                  <h3 className="mt-1 font-display text-lg font-bold leading-tight text-white">
                    {p.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] text-cyan-300/50">CUBE · {String(i + 1).padStart(3, "0")}</div>
                  <div
                    className="flex items-center gap-1 font-mono text-[10px] tracking-widest transition group-hover:translate-x-1"
                    style={{ color: p.color }}
                  >
                    ENTER →
                  </div>
                </div>
              </div>

              {/* Top edge glow */}
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {project && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => { setOpen(null); audio.click(); }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              className="glass-strong neon-border relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{ borderColor: `${project.color}40`, boxShadow: `0 0 80px ${project.color}20` }}
            >
              {/* Close */}
              <button
                onClick={() => { setOpen(null); audio.click(); }}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-200 transition hover:bg-cyan-400/20"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div
                className="relative overflow-hidden p-6 lg:p-8"
                style={{ background: `linear-gradient(180deg, ${project.color}10 0%, transparent 100%)` }}
              >
                <div
                  className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full blur-3xl"
                  style={{ background: project.color, opacity: 0.3 }}
                />
                <div
                  className="mb-3 inline-block rounded-full px-2 py-0.5 font-mono text-[10px] tracking-widest"
                  style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}
                >
                  {project.category}
                </div>
                <h3 className="font-display text-2xl font-black text-white glow-text md:text-3xl">
                  {project.title}
                </h3>
                <div className="mt-1 font-mono text-sm text-cyan-200/70">CLIENT · {project.client}</div>
              </div>

              {/* Body */}
              <div className="space-y-5 p-6 lg:p-8">
                <div>
                  <div className="mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest text-cyan-300/80">
                    <Target className="h-3.5 w-3.5" /> PROBLEM
                  </div>
                  <p className="text-sm leading-relaxed text-cyan-100/90">{project.problem}</p>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest text-cyan-300/80">
                    <Cpu className="h-3.5 w-3.5" /> ARCHITECTURE
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {project.architecture.map((a, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 font-mono text-xs text-cyan-100/90"
                      >
                        <div className="h-1.5 w-1.5 rounded-full" style={{ background: project.color }} />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest text-cyan-300/80">
                    <Wrench className="h-3.5 w-3.5" /> SOLUTION
                  </div>
                  <p className="text-sm leading-relaxed text-cyan-100/90">{project.solution}</p>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest text-cyan-300/80">
                    <Sparkles className="h-3.5 w-3.5" /> OUTCOME
                  </div>
                  <p
                    className="rounded-xl border p-4 text-sm leading-relaxed"
                    style={{
                      background: `${project.color}08`,
                      borderColor: `${project.color}40`,
                      color: "rgba(230, 247, 255, 0.95)",
                    }}
                  >
                    {project.outcome}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 font-mono text-[10px] text-cyan-300/40">
                  <GitBranch className="h-3 w-3" /> DEPLOYMENT · MULTI-REGION · ENTERPRISE-GRADE
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
