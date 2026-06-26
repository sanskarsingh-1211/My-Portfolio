import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Scene3D from "./Scene3D";
import { PROFILE } from "../data";
import { audio } from "../utils/audio";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setBooted(true), 1800);
    const t2 = setInterval(() => {
      setTaglineIdx((i) => (i + 1) % PROFILE.rotatingTaglines.length);
    }, 4200);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, []);

  const enter = () => {
    audio.resume();
    audio.startAmbient();
    audio.whoosh();
    const el = document.getElementById("core");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-[720px] w-full items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene3D variant="hero" />
      </div>

      {/* Radial fade */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0A0A0F_85%)]" />

      {/* Grid floor */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 grid-bg opacity-50 [mask-image:linear-gradient(to_top,black,transparent)]" />

      {/* Top bar */}
      <div className="absolute top-0 z-30 flex w-full items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.4em] text-cyan-300">
          <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 blink" />
          SANSKAR·VERSE
        </div>
        <div className="hidden font-mono text-[10px] tracking-widest text-cyan-300/60 md:block">
          v1.0 · NEURAL COMMAND CENTER
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-24 text-center">
        {/* Boot sequence */}
        {!booted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xs tracking-widest text-cyan-300"
          >
            <div className="dot-load mb-2 flex justify-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </div>
            INITIALIZING NEURAL NETWORK…
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1 font-mono text-[10px] tracking-[0.4em] text-cyan-300">
              <span className="h-1 w-1 rounded-full bg-cyan-400 blink" />
              CERTIFIED · MICROSOFT · AWS · ATLASSIAN
            </div>

            <h1 className="font-display text-5xl font-black leading-[0.95] text-white glow-text-strong sm:text-7xl md:text-8xl lg:text-9xl">
              {PROFILE.name.split(" ").map((w, i) => (
                <motion.span
                  key={w + i}
                  initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="mr-3 inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-3 font-mono text-xs tracking-[0.5em] text-cyan-300/80 sm:text-sm"
            >
              TECHNOLOGY&nbsp;CONSULTANT · CLOUD&nbsp;&&nbsp;ENTERPRISE&nbsp;SOLUTIONS
            </motion.div>

            <motion.div
              key={taglineIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="mt-6 max-w-2xl text-base font-light text-cyan-100/80 sm:text-lg md:text-xl"
            >
              <span className="text-cyan-400/60">"</span>
              {PROFILE.rotatingTaglines[taglineIdx]}
              <span className="text-cyan-400/60">"</span>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              onClick={enter}
              onMouseEnter={() => audio.hover()}
              className="group relative mt-10 overflow-hidden rounded-full border border-cyan-400/50 bg-cyan-400/5 px-9 py-4 font-display text-sm font-bold tracking-[0.3em] text-cyan-200 backdrop-blur-md transition hover:bg-cyan-400/10 hover:text-white"
            >
              <span className="relative z-10 flex items-center gap-3">
                ENTER THE VERSE
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 transition-transform duration-700 group-hover:translate-x-full" />
            </motion.button>

            {/* Identity Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              className="glass-strong neon-border mt-6 grid w-full max-w-3xl grid-cols-1 gap-4 rounded-2xl p-4 sm:grid-cols-[140px_1fr]"
            >
            <div className="relative h-32 overflow-hidden rounded-lg sm:h-full sm:min-h-[140px]">
  <img
    src="/Sanskar.png"
    alt="Sanskar Singh"
    className="h-full w-full rounded-lg object-cover"
  />
</div>
            
                 <div className="flex flex-col justify-center gap-1 text-left">
  <div className="font-mono text-[10px] tracking-widest text-cyan-300/70">
    // IDENTITY CONFIRMED
  </div>

  <div className="font-display text-xl font-bold text-white">
    Sanskar Singh
  </div>

  <div className="font-mono text-xs text-cyan-200/80">
    Cloud • Dynamics 365 • AI • Enterprise
  </div>

  <div className="mt-2 flex flex-wrap gap-1.5">
    {["MS CERTIFIED", "AWS ML", "D365 CE", "AZURE EXPERT", "AI • DATA"].map((t) => (
      <span
        key={t}
        className="rounded-full border border-cyan-400/30 bg-cyan-400/5 px-2 py-0.5 font-mono text-[9px] tracking-widest text-cyan-200/80"
      >
        {t}
      </span>
    ))}
  </div>
        </div>          {/* closes text section */}

      </motion.div>     {/* closes Identity Card */}

    </motion.div>       {/* closes the booted motion.div */}

  </div>                {/* closes Main Content */}
      {/* Scroll cue */}
      
      <motion.button
        onClick={enter}
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-12 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-1 font-mono text-[10px] tracking-widest text-cyan-300/60"
      >
        <span>SCROLL TO BEGIN</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.button> 

      {/* Side tech labels */}
      <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 font-mono text-[10px] tracking-widest text-cyan-300/40 lg:flex">
        <div>◆ AZ-NE-001</div>
        <div>◆ PP-DEV-002</div>
        <div>◆ AWS-ML-003</div>
        <div>◆ AZ-AVD-004</div>
      </div>
      <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-2 font-mono text-[10px] tracking-widest text-cyan-300/40 lg:flex">
        <div>DYNAMICS · 365</div>
        <div>POWER · PLATFORM</div>
        <div>AZURE · CLOUD</div>
        <div>AWS · ML</div>
      </div>
    </section>
  );
}
