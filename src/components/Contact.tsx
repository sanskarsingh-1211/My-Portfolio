import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChapterHeader } from "./UI";
import { PROFILE } from "../data";
import { audio } from "../utils/audio";
import { Mail, Phone, Download, Send, Sparkles, ArrowUpRight } from "lucide-react";

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

export default function Contact() {
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    audio.chime();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden py-24 md:py-32" ref={ref}>
      {/* Cinematic backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/8 blur-3xl" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/5"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <ChapterHeader id="06" label="CONTACT HORIZON" desc="Build the Future Together" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* CTA headline */}
          <div className="mb-12 text-center">
            <motion.h3
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.9 }}
              className="font-display text-4xl font-black leading-tight text-white glow-text-strong md:text-6xl lg:text-7xl"
            >
              Let's Build Something
              <br />
              <span className="holo-text">Exceptional.</span>
            </motion.h3>
            <p className="mx-auto mt-4 max-w-2xl text-base text-cyan-100/80 md:text-lg">
              Open to technology consulting, cloud architecture, Dynamics 365 &amp; Power Platform engagements, and enterprise AI initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Contact form */}
            <form
              onSubmit={submit}
              className="glass-strong neon-border col-span-1 space-y-3 rounded-2xl p-6 lg:col-span-3 lg:p-8"
            >
              <div className="mb-2 font-mono text-[10px] tracking-widest text-cyan-300/70">
                ◆ SECURE_CHANNEL · ENCRYPTED
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-mono text-[10px] tracking-widest text-cyan-300/70">NAME</label>
                  <input
                    required
                    type="text"
                    className="w-full rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 py-2.5 text-sm text-white placeholder-cyan-300/30 outline-none transition focus:border-cyan-400/60 focus:bg-cyan-400/10"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-[10px] tracking-widest text-cyan-300/70">EMAIL</label>
                  <input
                    required
                    type="email"
                    className="w-full rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 py-2.5 text-sm text-white placeholder-cyan-300/30 outline-none transition focus:border-cyan-400/60 focus:bg-cyan-400/10"
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block font-mono text-[10px] tracking-widest text-cyan-300/70">SUBJECT</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 py-2.5 text-sm text-white placeholder-cyan-300/30 outline-none transition focus:border-cyan-400/60 focus:bg-cyan-400/10"
                  placeholder="Cloud · D365 · AI · Consulting"
                />
              </div>
              <div>
                <label className="mb-1 block font-mono text-[10px] tracking-widest text-cyan-300/70">MESSAGE</label>
                <textarea
                  required
                  rows={4}
                  className="w-full resize-none rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 py-2.5 text-sm text-white placeholder-cyan-300/30 outline-none transition focus:border-cyan-400/60 focus:bg-cyan-400/10"
                  placeholder="Tell me about your project, timeline, and goals…"
                />
              </div>
              <button
                type="submit"
                onMouseEnter={() => audio.hover()}
                className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3.5 font-display text-sm font-bold tracking-[0.25em] text-white shadow-lg shadow-cyan-500/30 transition hover:shadow-cyan-500/50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {sent ? (
                    <>
                      <Sparkles className="h-4 w-4" /> MESSAGE RECEIVED · STAND BY
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> TRANSMIT
                    </>
                  )}
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-0" />
              </button>
              <div className="text-center font-mono text-[10px] tracking-widest text-cyan-300/40">
                {sent ? "✓ ENCRYPTED MESSAGE LOGGED · RESPONSE WITHIN 24H" : "RESPONSE WITHIN 24 HOURS · UTC+5:30"}
              </div>
            </form>

            {/* Contact details */}
            <div className="col-span-1 space-y-3 lg:col-span-2">
              {[
                { icon: Mail, label: "EMAIL", value: PROFILE.email, href: `mailto:${PROFILE.email}`, color: "#00F0FF" },
                { icon: Phone, label: "PHONE", value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, "")}`, color: "#6EEBFF" },
                { icon: Linkedin, label: "LINKEDIN", value: "/in/sanskarsingh", href: PROFILE.linkedin, color: "#00B8FF" },
                { icon: Download, label: "RESUME", value: "Download PDF", href: "#", color: "#6EEBFF" },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.a
                    key={i}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                    onMouseEnter={() => audio.hover()}
                    className="glass-strong group flex items-center gap-4 rounded-xl p-4 transition hover:scale-[1.02]"
                    style={{ borderColor: `${c.color}30` }}
                  >
                    <div
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `${c.color}15`, border: `1px solid ${c.color}40` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: c.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[10px] tracking-widest" style={{ color: c.color }}>
                        {c.label}
                      </div>
                      <div className="truncate font-mono text-sm text-white">{c.value}</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-cyan-300/50 transition group-hover:text-cyan-300" />
                  </motion.a>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="glass rounded-xl p-4"
              >
                <div className="mb-2 font-mono text-[10px] tracking-widest text-cyan-300/70">AVAILABILITY</div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                  </span>
                  <span className="text-sm font-medium text-cyan-200">Open for global engagements</span>
                </div>
                <div className="mt-2 font-mono text-[10px] text-cyan-300/50">
                  Remote · Hybrid · On-site · Worldwide
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-20 flex flex-col items-center gap-3 border-t border-cyan-400/10 pt-8 text-center">
          <div className="font-display text-2xl font-bold text-white glow-text">SANSKAR·VERSE</div>
          <div className="font-mono text-[10px] tracking-widest text-cyan-300/50">
            CRAFTING INTELLIGENT DIGITAL ECOSYSTEMS · © {new Date().getFullYear()} SANSKAR SINGH
          </div>
          <div className="mt-2 flex items-center gap-2 font-mono text-[10px] text-cyan-300/30">
            <span className="h-1 w-1 rounded-full bg-cyan-400 blink" />
            END OF TRANSMISSION
          </div>
        </div>
      </div>
    </section>
  );
}
