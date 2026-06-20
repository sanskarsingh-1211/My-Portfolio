import { motion } from "framer-motion";
import { SKILL_NODES } from "../data";

const items = SKILL_NODES.map((n) => n.label);
// Triple to ensure seamless wrap
const loop = [...items, ...items, ...items];

export default function Marquee() {
  return (
    <section className="relative w-full overflow-hidden border-y border-cyan-400/10 bg-cyan-400/[0.02] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0A0A0F] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0A0A0F] to-transparent" />

      <div className="flex">
        <motion.div
          className="flex flex-shrink-0 items-center gap-12 pr-12"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {loop.map((label, i) => (
            <div key={i} className="flex items-center gap-3 whitespace-nowrap">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span className="font-display text-lg font-bold tracking-wider text-cyan-200/60 transition hover:text-cyan-100">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
