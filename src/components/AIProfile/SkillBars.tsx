import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SKILLS = [
  { name: "Azure", level: 96 },
  { name: "Dynamics 365", level: 95 },
  { name: "Power Platform", level: 93 },
  { name: "AWS", level: 90 },
  { name: "AI & Automation", level: 88 },
  { name: "Microsoft 365", level: 96 },
];

export default function SkillBars({ delay = 0 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="rounded-xl border border-cyan-400/15 bg-black/20 p-4">
      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-cyan-300/80">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 blink" />
        SKILLS DASHBOARD
      </div>

      <div className="space-y-2.5">
        {SKILLS.map((s, i) => (
          <div key={s.name}>
            <div className="mb-1 flex items-center justify-between font-mono text-[11px] text-cyan-100/90">
              <span>{s.name}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: delay + i * 0.12 + 0.3 }}
                className="text-cyan-300"
              >
                {s.level}%
              </motion.span>
            </div>
            <div className="relative h-2 overflow-hidden rounded-full bg-cyan-400/10">
              {/* Tick marks */}
              <div className="pointer-events-none absolute inset-0 flex justify-between px-0">
                {Array.from({ length: 10 }).map((_, k) => (
                  <span key={k} className="h-full w-px bg-cyan-400/10" />
                ))}
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${s.level}%` } : {}}
                transition={{ delay: delay + i * 0.12, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300"
              >
                {/* Shimmer */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={inView ? { x: "200%" } : {}}
                  transition={{ delay: delay + i * 0.12 + 0.6, duration: 1.4, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}