import { motion } from "framer-motion";
import { ChapterHeader } from "./UI";
import { CERTIFICATIONS } from "../data";
import { audio } from "../utils/audio";
import { Award, CheckCircle2 } from "lucide-react";

export default function Certifications() {
  return (
    <section id="certifications" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <ChapterHeader id="05" label="CERTIFICATION WALL" desc="Hall of Achievements" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CERTIFICATIONS.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => audio.hover()}
              whileHover={{ y: -6, scale: 1.03 }}
              className="group relative h-72 cursor-default overflow-hidden rounded-2xl glass-strong"
              style={{ borderColor: `${c.color}40` }}
            >
              {/* Animated conic gradient on hover */}
              <div
                className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `conic-gradient(from 0deg, transparent, ${c.color}40, transparent 40%)`,
                  animation: "spin-slow 4s linear infinite",
                }}
              />

              {/* Particles */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                {Array.from({ length: 6 }).map((_, k) => (
                  <motion.div
                    key={k}
                    initial={{ x: "50%", y: "50%", opacity: 0 }}
                    animate={{ x: `${10 + Math.random() * 80}%`, y: `${Math.random() * 100}%`, opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: k * 0.1 }}
                    className="absolute h-1 w-1 rounded-full"
                    style={{ background: c.color, boxShadow: `0 0 8px ${c.color}` }}
                  />
                ))}
              </div>

              {/* Badge face */}
              <div className="relative z-10 flex h-full flex-col items-center justify-center p-5 text-center">
                {/* Hex badge */}
                <div
                  className="relative mb-3 flex h-24 w-24 items-center justify-center"
                  style={{
                    background: `radial-gradient(circle, ${c.color}30 0%, transparent 70%)`,
                  }}
                >
                  <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                    <defs>
                      <linearGradient id={`bg-${c.id}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={c.color} stopOpacity="0.8" />
                        <stop offset="100%" stopColor={c.color} stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    <polygon
                      points="50,5 90,28 90,72 50,95 10,72 10,28"
                      fill={`url(#bg-${c.id})`}
                      stroke={c.color}
                      strokeWidth="2"
                    />
                    <polygon
                      points="50,15 80,32 80,68 50,85 20,68 20,32"
                      fill="rgba(10,10,20,0.5)"
                      stroke={c.color}
                      strokeWidth="0.5"
                      strokeOpacity="0.5"
                    />
                  </svg>
                  <span className="relative text-3xl" style={{ filter: `drop-shadow(0 0 8px ${c.color})` }}>
                    {c.icon}
                  </span>
                </div>

                <div
                  className="mb-1 font-mono text-[10px] tracking-[0.2em]"
                  style={{ color: c.color }}
                >
                  {c.issuer.toUpperCase()}
                </div>
                <h4 className="font-display text-sm font-bold leading-tight text-white">
                  {c.name.replace("Microsoft Certified: ", "").replace("AWS Certified: ", "").replace("Atlassian Certified: ", "")}
                </h4>

                <div
                  className="mt-3 flex items-center gap-1.5 font-mono text-[9px] tracking-widest opacity-70"
                  style={{ color: c.color }}
                >
                  <CheckCircle2 className="h-3 w-3" /> VERIFIED
                </div>
              </div>

              {/* Top scan line */}
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${c.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Achievement counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-strong mt-12 flex flex-col items-center gap-2 rounded-2xl p-6 sm:flex-row sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <Award className="h-7 w-7 text-cyan-300" />
            <div>
              <div className="font-display text-2xl font-bold text-white">{CERTIFICATIONS.length}+ Professional Certifications</div>
              <div className="font-mono text-xs text-cyan-200/60">Microsoft · AWS · Atlassian · Continuous Learning</div>
            </div>
          </div>
          <div className="font-mono text-[10px] tracking-widest text-cyan-300/50">
            <span className="text-cyan-300">●</span> ALL CREDENTIALS ACTIVE
          </div>
        </motion.div>
      </div>
    </section>
  );
}
