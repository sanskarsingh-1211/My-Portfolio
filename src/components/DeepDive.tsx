import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audio } from "../utils/audio";
import { Brain, Zap, X } from "lucide-react";

/**
 * Deep Dive Mode: triggered by right-click (desktop) or long-press (mobile).
 * Reveals a color-shifted, data-dense "AI overlay" of the currently visible section.
 */
export default function DeepDive() {
  const [active, setActive] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const start = () => {
      startedRef.current = true;
      timerRef.current = window.setTimeout(() => {
        if (startedRef.current) {
          setActive(true);
          audio.aiPulse();
        }
      }, 600);
    };
    const cancel = () => {
      startedRef.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const onContext = (e: MouseEvent) => {
      e.preventDefault();
      start();
    };
    const onTouchStart = () => {
      start();
    };

    window.addEventListener("contextmenu", onContext);
    window.addEventListener("mousedown", cancel);
    window.addEventListener("touchend", cancel);
    window.addEventListener("touchstart", onTouchStart);

    return () => {
      window.removeEventListener("contextmenu", onContext);
      window.removeEventListener("mousedown", cancel);
      window.removeEventListener("touchend", cancel);
      window.removeEventListener("touchstart", onTouchStart);
      cancel();
    };
  }, []);

  return (
    <>
      {/* Color shift overlay when active */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[120]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,240,255,0.08) 0%, rgba(255,0,128,0.05) 70%, rgba(0,240,255,0.02) 100%)",
              mixBlendMode: "screen",
            }}
          />
        )}
      </AnimatePresence>

      {/* Deep dive panel */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed bottom-6 right-6 z-[180] max-w-sm"
          >
            <div
              className="glass-strong neon-border rounded-2xl p-4"
              style={{ borderColor: "rgba(255,0,128,0.4)", boxShadow: "0 0 60px rgba(255,0,128,0.2)" }}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-500/15">
                    <Brain className="h-4 w-4 text-pink-300" />
                  </div>
                  <div>
                    <div className="font-display text-sm font-bold text-white">DEEP DIVE MODE</div>
                    <div className="font-mono text-[9px] tracking-widest text-pink-300/70">AI OVERLAY · ACTIVE</div>
                  </div>
                </div>
                <button
                  onClick={() => { setActive(false); audio.click(); }}
                  className="rounded-full p-1 text-pink-200 transition hover:bg-pink-500/15"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2 font-mono text-[10px] text-cyan-100/85">
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-pink-300" />
                  Architecture overlays enabled
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-pink-300" />
                  Project insights unlocked
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-pink-300" />
                  Color palette: shifted to spectrum
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-pink-300" />
                  Data layer +2 · Telemetry streaming
                </div>
              </div>

              <div className="mt-3 h-1 overflow-hidden rounded-full bg-pink-500/15">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-cyan-400"
                />
              </div>
              <div className="mt-1 text-right font-mono text-[9px] text-pink-300/50">Auto-dismiss in 4s</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint pill (only shows briefly at start) */}
      <AnimatePresence>
        {!active && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 3, duration: 0.6 }}
            className="fixed bottom-6 left-6 z-[100] hidden lg:block"
          >
            <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] tracking-widest text-cyan-300/70">
              <Brain className="h-3 w-3" />
              RIGHT-CLICK or LONG-PRESS for DEEP DIVE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
