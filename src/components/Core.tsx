import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChapterHeader } from "./UI";
import { PROFILE, STATS } from "../data";
import { audio } from "../utils/audio";

function CountUp({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(eased * to) + suffix;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, suffix]);

  return <div ref={ref} className="font-display text-4xl font-bold text-cyan-300 glow-text md:text-5xl">0{suffix}</div>;
}

export default function Core() {
  return (
    <section id="core" className="relative w-full overflow-hidden pt-32 pb-24 md:py-32">
      {/* Holographic background */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <ChapterHeader id="01" label="THE CORE" desc="AI Command Room — Professional Summary" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left: Summary text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onMouseEnter={() => audio.hover()}
            className="glass-strong neon-border relative col-span-1 rounded-2xl p-6 lg:col-span-3 lg:p-8"
          >
            <div className="absolute -top-3 left-6 flex items-center gap-2 font-mono text-[10px] tracking-widest text-cyan-300/80">
              <span className="h-1 w-1 rounded-full bg-cyan-400 blink" />
              FILE · CORE_PROFILE.SYS
            </div>

            <div className="mb-4 font-mono text-xs text-cyan-300/60">{`> loading_identity.log ...`}</div>
            <p className="text-base leading-relaxed text-cyan-100/90 md:text-lg">
              {PROFILE.summary}
            </p>

            {/* Holographic panels */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { t: "Cloud", v: "Azure · AWS · M365", c: "#00F0FF" },
                { t: "Apps", v: "Dynamics 365 · Zoho", c: "#00B8FF" },
                { t: "Data & AI", v: "Power BI · Python · ML", c: "#6EEBFF" },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  onMouseEnter={() => audio.hover()}
                  className="glass relative cursor-default overflow-hidden rounded-xl p-4"
                  style={{ borderColor: `${p.c}40` }}
                >
                  <div className="mb-1 font-mono text-[10px] tracking-widest" style={{ color: p.c }}>
                    {p.t.toUpperCase()}
                  </div>
                  <div className="text-sm font-medium text-white">{p.v}</div>
                  <div
                    className="absolute -right-6 -top-6 h-16 w-16 rounded-full blur-2xl"
                    style={{ background: p.c, opacity: 0.25 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats grid */}
          <div className="col-span-1 grid grid-cols-2 gap-3 lg:col-span-2">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => audio.hover()}
                className="glass-strong relative overflow-hidden rounded-xl p-4 transition hover:scale-105"
              >
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-cyan-400/10 blur-2xl" />
                <CountUp to={parseInt(s.value) || 0} suffix={s.value.replace(/[0-9]/g, "")} />
                <div className="mt-1 font-display text-xs font-bold tracking-wider text-white">
                  {s.label}
                </div>
                <div className="mt-1 font-mono text-[10px] text-cyan-300/60">{s.sub}</div>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-cyan-400/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 1.2 }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-400"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
