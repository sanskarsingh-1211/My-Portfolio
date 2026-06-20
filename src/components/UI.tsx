import { motion } from "framer-motion";
import { audio } from "../utils/audio";
import { Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";

export function HUDFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute -top-3 left-6 z-10 flex items-center gap-2 font-mono text-[10px] tracking-widest text-cyan-300/70">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 blink" />
        SYS · ONLINE · 0xA7F
      </div>
      <div className="pointer-events-none absolute -top-3 right-6 z-10 font-mono text-[10px] tracking-widest text-cyan-300/70">
        LAT 0.4ms · 60FPS
      </div>
      {children}
    </div>
  );
}

export function ChapterHeader({ id, label, desc }: { id: string; label: string; desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="mb-12 flex flex-col items-start gap-2"
    >
      <div className="font-mono text-xs tracking-[0.4em] text-cyan-400/80">CHAPTER · {id}</div>
      <h2 className="font-display text-4xl font-bold text-white glow-text md:text-5xl lg:text-6xl">
        {label}
      </h2>
      <div className="mt-1 flex items-center gap-3">
        <span className="h-px w-12 bg-cyan-400" />
        <p className="font-mono text-xs tracking-widest text-cyan-200/70 md:text-sm">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export function AudioToggle() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    // Don't autoplay — wait for user gesture
  }, []);
  return (
    <button
      onClick={() => {
        const v = audio.toggle();
        setOn(v);
        audio.click();
      }}
      className="glass-strong group flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] tracking-widest text-cyan-200 transition hover:text-white"
      aria-label="Toggle audio"
    >
      {on ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
      <span className="hidden sm:inline">{on ? "AUDIO · ON" : "AUDIO · OFF"}</span>
    </button>
  );
}

export function CornerBrackets() {
  return (
    <>
      <div className="pointer-events-none fixed left-4 top-4 z-50 h-8 w-8 border-l border-t border-cyan-400/40" />
      <div className="pointer-events-none fixed right-4 top-4 z-50 h-8 w-8 border-r border-t border-cyan-400/40" />
      <div className="pointer-events-none fixed left-4 bottom-4 z-50 h-8 w-8 border-l border-b border-cyan-400/40" />
      <div className="pointer-events-none fixed right-4 bottom-4 z-50 h-8 w-8 border-r border-b border-cyan-400/40" />
    </>
  );
}

export function Typewriter({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <motion.span
      className={className}
      initial={{ width: 0 }}
      whileInView={{ width: "auto" }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay, ease: "easeOut" }}
      style={{ display: "inline-block", overflow: "hidden", whiteSpace: "nowrap" }}
    >
      {text}
    </motion.span>
  );
}
