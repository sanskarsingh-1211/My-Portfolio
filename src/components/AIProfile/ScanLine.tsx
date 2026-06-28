import { motion } from "framer-motion";

/**
 * Animated scan line — used inside the dossier container border.
 */
export default function ScanLine() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      <motion.div
        initial={{ top: "-2%" }}
        animate={{ top: ["-2%", "102%", "-2%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,240,255,1) 50%, transparent 100%)",
          boxShadow: "0 0 20px 2px rgba(0,240,255,0.8)",
        }}
      />
    </div>
  );
}