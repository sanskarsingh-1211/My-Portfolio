import { motion } from "framer-motion";
import IdentityScanner from "./IdentityScanner";
import Terminal from "./Terminal";
import SkillBars from "./SkillBars";
import MissionBrief from "./MissionBrief";
import Stats from "./Stats";
import StatusBar from "./StatusBar";
import ScanLine from "./ScanLine";
import { audio } from "../../utils/audio";

/**
 * AI Personnel Dossier — orchestrates the cinematic reveal sequence:
 * Scanner (immediate) → Terminal (typing) → Mission Brief → Skill Bars → Stats → Status Bar
 */
export default function AIDossier() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 1.6, duration: 1 }}
      onMouseEnter={() => audio.hover()}
      className="relative mx-auto mt-10 w-full max-w-5xl"
    >
      {/* Outer glow */}
      <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-cyan-500/10 blur-2xl" />

      {/* Card */}
      <div className="glass-strong neon-border relative rounded-2xl p-3 sm:p-4">
        <ScanLine />

        {/* Header */}
        <div className="mb-3 flex items-center justify-between border-b border-cyan-400/15 pb-2 font-mono text-[10px] tracking-widest text-cyan-300/70">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 blink" />
            AI PERSONNEL DOSSIER
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span>FILE · 0xA7F-SSK.enc</span>
            <span className="text-cyan-300/50">|</span>
            <span>SECURE CHANNEL</span>
          </div>
        </div>

        {/* Grid: 3 columns */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          {/* Scanner (left) */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="lg:col-span-4"
          >
            <IdentityScanner />
          </motion.div>

          {/* Terminal (center) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="lg:col-span-5"
          >
            <Terminal />
          </motion.div>

          {/* Mission (right) */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <MissionBrief />
          </motion.div>
        </div>

        {/* Bottom row: Skills + Stats */}
        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.6 }}
          >
            <SkillBars delay={2.6} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.6 }}
          >
            <Stats delay={3.6} />
          </motion.div>
        </div>

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.8 }}
          className="mt-3"
        >
          <StatusBar />
        </motion.div>
      </div>
    </motion.div>
  );
}