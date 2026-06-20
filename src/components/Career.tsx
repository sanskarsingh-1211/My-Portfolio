import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChapterHeader } from "./UI";
import { EXPERIENCES } from "../data";
import { audio } from "../utils/audio";
import { Briefcase, MapPin, Calendar, ArrowRight } from "lucide-react";

export default function Career() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const exp = EXPERIENCES[active];

  return (
    <section id="career" className="relative w-full overflow-hidden py-24 md:py-32">
      {/* Tunnel background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <motion.div
          animate={{ x: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 top-1/4 h-px w-[200%] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        />
        <motion.div
          animate={{ x: ["10%", "-10%", "10%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 h-px w-[200%] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <ChapterHeader id="03" label="CAREER TIMELINE" desc="Time Tunnel of Experience" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Timeline rail (left) */}
          <div className="col-span-1 lg:col-span-4">
            <div className="glass-strong relative rounded-2xl p-3">
              <div className="absolute left-9 top-0 h-full w-px bg-gradient-to-b from-cyan-400/0 via-cyan-400/40 to-cyan-400/0" />
              {EXPERIENCES.map((e, i) => (
                <button
                  key={e.id}
                  onClick={() => { setActive(i); audio.click(); }}
                  onMouseEnter={() => audio.hover()}
                  className={`group relative flex w-full items-start gap-3 rounded-xl p-3 text-left transition ${
                    active === i ? "bg-cyan-400/10" : "hover:bg-cyan-400/5"
                  }`}
                >
                  {/* Marker */}
                  <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2"
                    style={{
                      borderColor: e.color,
                      background: active === i ? e.color : "transparent",
                      boxShadow: active === i ? `0 0 20px ${e.color}80` : "none",
                    }}
                  >
                    <span className="font-mono text-xs font-bold" style={{ color: active === i ? "#0A0A0F" : e.color }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {active === i && <span className="pulse-ring absolute inset-0 rounded-full" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="truncate font-display text-sm font-bold text-white">{e.company}</div>
                    </div>
                    <div className="mt-0.5 truncate font-mono text-[10px] tracking-wider" style={{ color: e.color }}>
                      {e.role}
                    </div>
                    <div className="mt-1 flex items-center gap-2 font-mono text-[10px] text-cyan-300/50">
                      <Calendar className="h-3 w-3" /> {e.period}
                    </div>
                  </div>

                  {active === i && (
                    <ArrowRight className="mt-3 h-3 w-3 flex-shrink-0 text-cyan-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Room (right) */}
          <div className="col-span-1 lg:col-span-8" ref={ref}>
            <AnimatePresence mode="wait">
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.6 }}
                onMouseEnter={() => audio.hover()}
                className="glass-strong neon-border relative overflow-hidden rounded-2xl"
                style={{ boxShadow: `0 0 80px ${exp.color}10` }}
              >
                {/* Theme header */}
                <div className="relative overflow-hidden border-b border-cyan-400/15 p-6 lg:p-8">
                  <div
                    className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
                    style={{ background: exp.color, opacity: 0.18 }}
                  />
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-widest text-cyan-300/70">
                    <span className="rounded-full border border-cyan-400/30 px-2 py-0.5">
                      ROOM · {String(active + 1).padStart(2, "0")} / {String(EXPERIENCES.length).padStart(2, "0")}
                    </span>
                    <span style={{ color: exp.color }}>◆ {exp.theme.toUpperCase()}</span>
                  </div>
                  <h3 className="mt-3 font-display text-3xl font-black text-white glow-text md:text-4xl">
                    {exp.company}
                  </h3>
                  <div className="mt-1 text-base font-medium" style={{ color: exp.color }}>
                    {exp.role}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs text-cyan-200/70">
                    <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {exp.period}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {exp.location}</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="h-3 w-3" /> {exp.theme}</span>
                  </div>
                  <p className="mt-4 max-w-2xl text-sm italic text-cyan-100/70">"{exp.tagline}"</p>
                </div>

                {/* Bullets */}
                <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:p-8">
                  {exp.bullets.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                      className="glass group flex gap-3 rounded-xl p-4 transition hover:scale-[1.02]"
                      style={{ borderColor: `${exp.color}30` }}
                    >
                      <div
                        className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold"
                        style={{ background: `${exp.color}20`, color: exp.color }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <p className="text-sm leading-relaxed text-cyan-100/85">{b}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative scan line */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Quick nav arrows */}
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => { setActive((active - 1 + EXPERIENCES.length) % EXPERIENCES.length); audio.click(); }}
                className="glass flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] tracking-widest text-cyan-200 transition hover:bg-cyan-400/10"
              >
                ← PREV ROOM
              </button>
              <div className="font-mono text-[10px] tracking-widest text-cyan-300/60">
                {active + 1} / {EXPERIENCES.length}
              </div>
              <button
                onClick={() => { setActive((active + 1) % EXPERIENCES.length); audio.click(); }}
                className="glass flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] tracking-widest text-cyan-200 transition hover:bg-cyan-400/10"
              >
                NEXT ROOM →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
