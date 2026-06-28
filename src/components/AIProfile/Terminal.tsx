import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_SEQUENCE = [
  "> Connecting...",
  "> Verifying identity...",
  "> Access granted.",
  "> Loading personnel profile...",
  "> Welcome.",
];

const ROTATING_LOGS = [
  "> Synchronizing cloud nodes...",
  "> Azure connection verified.",
  "> Dynamics 365 modules online.",
  "> AWS ML inference engine ready.",
  "> Power Platform flows active.",
  "> Backups synchronized across regions.",
  "> Identity federation stable.",
];

/**
 * Terminal — types boot sequence, then prints name + role, then loops rotating logs every 10s.
 */
export default function Terminal() {
  const [phase, setPhase] = useState<"boot" | "profile" | "loop">("boot");
  const [lines, setLines] = useState<string[]>([]);
  const [typing, setTyping] = useState("");
  const logsRef = useRef<string[]>([...ROTATING_LOGS]);

  // Phase 1: Boot sequence (typing each line)
  useEffect(() => {
    let cancelled = false;
    let lineIdx = 0;

    const typeLine = async () => {
      if (cancelled) return;
      const text = BOOT_SEQUENCE[lineIdx];
      if (text === undefined) {
        setPhase("profile");
        return;
      }
      // Type character by character
      for (let i = 1; i <= text.length; i++) {
        if (cancelled) return;
        setTyping(text.slice(0, i));
        await sleep(28);
      }
      setLines((prev) => [...prev, text]);
      setTyping("");
      await sleep(180);
      lineIdx++;
      typeLine();
    };

    typeLine();
    return () => {
      cancelled = true;
    };
  }, []);

  // Phase 2: Profile lines appear after boot finishes
  useEffect(() => {
    if (phase !== "profile") return;
    let cancelled = false;
    const sequence = [
      { text: "", delay: 0 },
      { text: "SANSKAR SINGH", delay: 250 },
      { text: "Technology Consultant", delay: 400 },
      { text: "", delay: 200 },
      { text: "STATUS", delay: 200 },
      { text: "ONLINE", delay: 300 },
    ];

    const run = async () => {
      for (const step of sequence) {
        if (cancelled) return;
        await sleep(step.delay);
        if (step.text) setLines((prev) => [...prev, step.text]);
      }
      if (!cancelled) {
        await sleep(700);
        setPhase("loop");
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [phase]);

  // Phase 3: Rotating logs every ~6s
  useEffect(() => {
    if (phase !== "loop") return;
    let cancelled = false;
    let i = 0;
    const tick = async () => {
      if (cancelled) return;
      const log = logsRef.current[i % logsRef.current.length];
      // Type
      for (let j = 1; j <= log.length; j++) {
        if (cancelled) return;
        setTyping(log.slice(0, j));
        await sleep(22);
      }
      setLines((prev) => [...prev.slice(-7), log]);
      setTyping("");
      await sleep(4200);
      i++;
      tick();
    };
    tick();
    return () => {
      cancelled = true;
    };
  }, [phase]);

  return (
    <div className="relative h-full min-h-[260px] w-full overflow-hidden rounded-xl bg-black/40 p-4 font-mono text-xs">
      {/* Header bar */}
      <div className="mb-3 flex items-center justify-between border-b border-cyan-400/20 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/70" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
          <span className="h-2 w-2 rounded-full bg-green-400/70" />
        </div>
        <span className="text-[10px] tracking-widest text-cyan-300/60">TERMINAL · TTY/0</span>
      </div>

      {/* Lines */}
      <div className="space-y-0.5 leading-relaxed text-cyan-100/90">
        <AnimatePresence initial={false}>
          {lines.map((l, idx) => (
            <motion.div
              key={`${idx}-${l}`}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={
                l === "SANSKAR SINGH"
                  ? "mt-3 font-display text-base font-black text-white glow-text-strong tracking-[0.2em]"
                  : l === "Technology Consultant"
                  ? "text-cyan-200/80"
                  : l === "STATUS"
                  ? "text-[10px] uppercase tracking-[0.3em] text-cyan-300/60 mt-2"
                  : l === "ONLINE"
                  ? "flex items-center gap-1.5 text-cyan-300 font-bold"
                  : "text-cyan-200/85"
              }
            >
              {l === "ONLINE" ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                  </span>
                  ONLINE
                </>
              ) : (
                l
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing buffer */}
        {typing && (
          <div className="text-cyan-200/95">
            {typing}
            <span className="ml-0.5 inline-block h-3 w-1.5 -translate-y-0.5 animate-pulse bg-cyan-400" />
          </div>
        )}

        {/* Idle cursor */}
        {!typing && (
          <div className="text-cyan-300/70">
            <span className="text-cyan-400">&gt;</span>
            <span className="ml-1 inline-block h-3 w-2 animate-pulse bg-cyan-400 align-middle" />
          </div>
        )}
      </div>

      {/* Subtle scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,240,255,0.5) 0px, rgba(0,240,255,0.5) 1px, transparent 1px, transparent 3px)",
        }}
      />
    </div>
  );
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}