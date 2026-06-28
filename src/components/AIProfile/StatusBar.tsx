import { motion } from "framer-motion";

/**
 * Bottom status bar — profile sync progress + system status indicators.
 */
export default function StatusBar() {
  return (
    <div className="rounded-xl border border-cyan-400/15 bg-black/30 px-4 py-3 font-mono text-[10px] tracking-widest text-cyan-100/85">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Profile sync */}
        <div className="flex flex-1 items-center gap-3">
          <span className="text-cyan-300/80">PROFILE_SYNCHRONIZED</span>
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-cyan-400/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.4, duration: 2.2, ease: "easeOut" }}
              className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ delay: 1.6, duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </motion.div>
          </div>
          <span className="text-cyan-300">100%</span>
        </div>

        {/* Status pills */}
        <div className="flex items-center gap-3">
          <StatusPill label="MISSION" value="READY" color="green" />
          <StatusPill label="SYSTEM" value="ONLINE" color="cyan" />
          <StatusPill label="CLEARANCE" value="OMEGA" color="purple" />
        </div>
      </div>
    </div>
  );
}

function StatusPill({ label, value, color }: { label: string; value: string; color: "green" | "cyan" | "purple" }) {
  const colorMap = {
    green: { dot: "bg-green-400", text: "text-green-300", border: "border-green-400/40" },
    cyan: { dot: "bg-cyan-400", text: "text-cyan-300", border: "border-cyan-400/40" },
    purple: { dot: "bg-purple-400", text: "text-purple-300", border: "border-purple-400/40" },
  } as const;
  const c = colorMap[color];
  return (
    <div className={`flex items-center gap-1.5 rounded-full border ${c.border} bg-black/40 px-2 py-0.5`}>
      <span className="relative flex h-1.5 w-1.5">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${c.dot} opacity-75`} />
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${c.dot}`} />
      </span>
      <span className="text-cyan-300/70">{label}</span>
      <span className={c.text}>{value}</span>
    </div>
  );
}