import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Holographic Identity Scanner
 * - Animated scan line every ~5s
 * - Idle breathing
 * - Flickering blue particles
 * - Subtle noise
 * - Terminal-style status text
 */
export default function IdentityScanner() {
  const [scanKey, setScanKey] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; d: number }>>([]);

  useEffect(() => {
    const t = setInterval(() => setScanKey((k) => k + 1), 5000);
    // Pre-build particles once
    const ps = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      d: Math.random() * 3 + 2,
    }));
    setParticles(ps);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-full min-h-[260px] w-full overflow-hidden rounded-xl">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/25 via-blue-900/40 to-purple-900/30" />

      {/* Hologram grid */}
      <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 200 200" preserveAspectRatio="none">
        <defs>
          <pattern id="scan-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,240,255,0.25)" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#scan-grid)" />
      </svg>

      {/* Stylized portrait silhouette */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="scan-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6EEBFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#742774" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="scan-portrait" cx="50%" cy="38%">
            <stop offset="0%" stopColor="#6EEBFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#002050" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Particles forming the silhouette */}
        {particles.map((p) => (
          <motion.circle
            key={p.id}
            cx={p.x * 2}
            cy={p.y * 2}
            r="1"
            fill="url(#scan-grad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 1, 0.4, 0.9, 0.3] }}
            transition={{ duration: p.d, repeat: Infinity, delay: p.id * 0.05 }}
          />
        ))}

        {/* Head */}
        <motion.ellipse
          cx="100"
          cy="78"
          rx="28"
          ry="34"
          fill="url(#scan-portrait)"
          opacity="0.55"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 78px" }}
        />
        {/* Shoulders */}
        <path d="M 40 200 Q 100 130 160 200 Z" fill="url(#scan-grad)" opacity="0.45" />
        {/* Neck shadow */}
        <ellipse cx="100" cy="118" rx="14" ry="6" fill="#000" opacity="0.35" />
      </svg>

      {/* Animated scan line */}
      <motion.div
        key={scanKey}
        className="pointer-events-none absolute inset-x-0 h-[2px] shadow-[0_0_20px_2px_rgba(0,240,255,0.8)]"
        initial={{ top: "0%" }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, ease: "linear" }}
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(0,240,255,1) 50%, transparent 100%)",
        }}
      />

      {/* Secondary trailing glow */}
      <motion.div
        key={`${scanKey}-glow`}
        className="pointer-events-none absolute inset-x-0 h-12"
        initial={{ top: "-12%" }}
        animate={{ top: ["-12%", "100%", "-12%"] }}
        transition={{ duration: 4, ease: "linear" }}
        style={{
          background: "linear-gradient(180deg, transparent, rgba(0,240,255,0.18), transparent)",
        }}
      />

      {/* Noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
        }}
      />

      {/* Top-left crosshair */}
      <div className="pointer-events-none absolute left-3 top-3 flex h-5 w-5 items-center justify-center">
        <div className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-cyan-300" />
        <div className="absolute top-0 left-1/2 h-2 w-px -translate-x-1/2 bg-cyan-300" />
      </div>
      <div className="pointer-events-none absolute right-3 top-3 flex h-5 w-5 items-center justify-center">
        <div className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-cyan-300" />
        <div className="absolute top-0 right-1/2 h-2 w-px translate-x-1/2 bg-cyan-300" />
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 flex h-5 w-5 items-center justify-center">
        <div className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-cyan-300" />
        <div className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-cyan-300" />
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 flex h-5 w-5 items-center justify-center">
        <div className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-cyan-300" />
        <div className="absolute bottom-0 right-1/2 h-2 w-px translate-x-1/2 bg-cyan-300" />
      </div>

      {/* Status overlay (terminal-style) */}
      <div className="absolute inset-x-3 bottom-3 font-mono text-[9px] tracking-widest text-cyan-200/90">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-cyan-300">IDENTITY_SCAN</span>
          <span className="text-cyan-300/60">v4.2</span>
        </div>
        <div className="space-y-0.5 text-cyan-100/80">
          <Row k="STATUS" v="ONLINE" />
          <Row k="CLEARANCE" v="LEVEL Ω" />
          <Row k="LOCATION" v="NEW DELHI" />
          <Row k="SYSTEM" v="SYNCED" pulse />
        </div>
      </div>

      {/* Top-right ID badge */}
      <div className="absolute right-3 top-7 font-mono text-[9px] tracking-widest text-cyan-300/80">
        ID · 0xA7F-SSK
      </div>
    </div>
  );
}

function Row({ k, v, pulse }: { k: string; v: string; pulse?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-cyan-300/70">{k}</span>
      <span className="flex items-center gap-1.5">
        {pulse && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 blink" />}
        {v}
      </span>
    </div>
  );
}