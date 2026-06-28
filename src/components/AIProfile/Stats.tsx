import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { label: "Years", value: 6, suffix: "+" },
  { label: "Projects", value: 50, suffix: "+" },
  { label: "Clients", value: 20, suffix: "+" },
  { label: "Technologies", value: 35, suffix: "+" },
  { label: "Certifications", value: 8, suffix: "" },
  { label: "Countries", value: 5, suffix: "" },
];

function Counter({ to, suffix, start }: { to: number; suffix: string; start: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;
    const controls = animate(count, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    const unsub = rounded.on("change", (v) => setVal(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [start, to, count, rounded]);

  return (
    <span className="font-display text-2xl font-black text-white glow-text">
      {val}
      <span className="text-cyan-300">{suffix}</span>
    </span>
  );
}

export default function Stats({ delay = 0 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="rounded-xl border border-cyan-400/15 bg-black/20 p-4">
      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-cyan-300/80">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 blink" />
        LIVE STATS
      </div>
      <div className="grid grid-cols-3 gap-3">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: delay + i * 0.1, duration: 0.5 }}
            className="text-center"
          >
            <Counter to={s.value} suffix={s.suffix} start={inView} />
            <div className="mt-0.5 font-mono text-[9px] tracking-widest text-cyan-300/60">
              {s.label.toUpperCase()}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}