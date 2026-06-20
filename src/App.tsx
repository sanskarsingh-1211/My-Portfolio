import { useEffect } from "react";
import Hero from "./components/Hero";
import Core from "./components/Core";
import SkillNexus from "./components/SkillNexus";
import Career from "./components/Career";
import Vault from "./components/Vault";
import Architecture from "./components/Architecture";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Nav from "./components/Nav";
import DeepDive from "./components/DeepDive";
import Marquee from "./components/Marquee";
import { audio } from "./utils/audio";

export default function App() {
  // Init audio on first user interaction (browser policy)
  useEffect(() => {
    const init = () => {
      audio.resume();
      window.removeEventListener("pointerdown", init);
      window.removeEventListener("keydown", init);
    };
    window.addEventListener("pointerdown", init, { once: true });
    window.addEventListener("keydown", init, { once: true });
    return () => {
      window.removeEventListener("pointerdown", init);
      window.removeEventListener("keydown", init);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0A0A0F] text-cyan-50">
      {/* Atmospheric layers */}
      <div className="scanline" />
      <div className="noise" />
      <div className="vignette" />

      <Nav />
      <DeepDive />

      <main className="relative z-10">
        <Hero />
        <Core />
        <Marquee />
        <SkillNexus />
        <Career />
        <Vault />
        <Architecture />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
}
