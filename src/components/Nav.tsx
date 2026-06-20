import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_CHAPTERS } from "../data";
import { audio } from "../utils/audio";
import { AudioToggle } from "./UI";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      // Determine which section is in view
      let current = "hero";
      for (const c of NAV_CHAPTERS) {
        const el = document.getElementById(c.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom > 0) {
          current = c.id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
    audio.click();
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.7 }}
        className={`fixed left-1/2 top-4 z-[150] -translate-x-1/2 transition-all duration-500 ${
          scrolled ? "top-3" : "top-6"
        }`}
      >
        <div
          className={`glass-strong flex items-center gap-1 rounded-full px-2 py-1.5 transition ${
            scrolled ? "shadow-2xl shadow-cyan-500/10" : ""
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => go("hero")}
            className="flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] tracking-widest text-cyan-200 transition hover:text-white"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 blink" />
            SANSKAR·VERSE
          </button>

          <div className="mx-1 h-5 w-px bg-cyan-400/20" />

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {NAV_CHAPTERS.map((c) => (
              <button
                key={c.id}
                onClick={() => go(c.id)}
                onMouseEnter={() => audio.hover()}
                className={`group relative rounded-full px-3 py-1.5 font-mono text-[10px] tracking-widest transition ${
                  active === c.id ? "text-white" : "text-cyan-300/70 hover:text-white"
                }`}
              >
                {active === c.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-cyan-400/15"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{c.label}</span>
              </button>
            ))}
          </div>

          <div className="mx-1 hidden h-5 w-px bg-cyan-400/20 lg:block" />

          <div className="hidden lg:block">
            <AudioToggle />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => { setOpen(!open); audio.click(); }}
            className="flex h-8 w-8 items-center justify-center rounded-full text-cyan-200 transition hover:bg-cyan-400/10 lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed left-4 right-4 top-20 z-[140] glass-strong rounded-2xl p-4 lg:hidden"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="font-mono text-[10px] tracking-widest text-cyan-300/70">CHAPTERS</div>
              <AudioToggle />
            </div>
            <div className="flex flex-col gap-1">
              {NAV_CHAPTERS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => go(c.id)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-left transition ${
                    active === c.id ? "bg-cyan-400/15" : "hover:bg-cyan-400/5"
                  }`}
                >
                  <div>
                    <div className="font-display text-sm font-bold text-white">{c.label}</div>
                    <div className="font-mono text-[10px] text-cyan-300/50">{c.desc}</div>
                  </div>
                  {active === c.id && <span className="h-2 w-2 rounded-full bg-cyan-400 blink" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress */}
      <div className="fixed left-0 right-0 top-0 z-[160] h-[2px] bg-cyan-400/5">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300"
          style={{ scaleX: progress }}
        />
      </div>
    </>
  );
}
