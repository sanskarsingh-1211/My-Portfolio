import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const MISSIONS = [
  "Cloud Migration",
  "Dynamics 365",
  "Power Platform",
  "AI Automation",
  "SaaS Architecture",
  "Enterprise Integration",
];

export default function MissionBrief() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="rounded-xl border border-cyan-400/15 bg-black/20 p-4">
      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-cyan-300/80">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 blink" />
        MISSION BRIEF
      </div>

      <p className="mb-3 text-xs leading-relaxed text-cyan-100/85">
        Helping enterprises modernize their digital infrastructure through:
      </p>

      <ul className="space-y-1.5">
        {MISSIONS.map((m, i) => (
          <motion.li
            key={m}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-2 font-mono text-[11px] text-cyan-100/90"
          >
            <span className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-sm border border-cyan-400/40 bg-cyan-400/10">
              <Check className="h-2.5 w-2.5 text-cyan-300" />
            </span>
            {m}
          </motion.li>
        ))}
      </ul>

      {/* Current mission */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-4 rounded-lg border border-cyan-400/30 bg-cyan-400/5 p-3"
      >
        <div className="mb-1 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.3em] text-cyan-300/80">CURRENT MISSION</span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-green-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
            </span>
            ACTIVE
          </span>
        </div>
        <p className="text-xs leading-relaxed text-cyan-100/90">
          Engineering scalable digital ecosystems that simplify business complexity and accelerate innovation.
        </p>
      </motion.div>
    </div>
  );
}