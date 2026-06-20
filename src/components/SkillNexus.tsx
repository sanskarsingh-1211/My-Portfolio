import { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ChapterHeader } from "./UI";
import { SKILL_NODES } from "../data";
import { audio } from "../utils/audio";

/* ---------- 3D Node ---------- */
function Node3D({
  node,
  hovered,
  onHover,
}: {
  node: typeof SKILL_NODES[number];
  hovered: string | null;
  onHover: (id: string | null) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const isHover = hovered === node.id;
  const pos = useMemo<[number, number, number]>(() => [node.x, node.y, node.z], [node]);

  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.5;
      ref.current.rotation.x += dt * 0.2;
      const target = isHover ? 1.5 : 1;
      ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.1);
    }
    if (ringRef.current && isHover) {
      ringRef.current.rotation.z += dt * 2;
    }
  });

  return (
    <group position={pos}>
      <mesh
        ref={ref}
        onPointerOver={(e) => { e.stopPropagation(); onHover(node.id); audio.hover(); }}
        onPointerOut={() => onHover(null)}
      >
        <icosahedronGeometry args={[0.12 + (node.level / 100) * 0.12, 1]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isHover ? 2.5 : 0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {isHover && (
        <mesh ref={ringRef}>
          <torusGeometry args={[0.35, 0.008, 8, 32]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.8} />
        </mesh>
      )}
      <pointLight color={node.color} intensity={isHover ? 1.5 : 0.3} distance={2} />
    </group>
  );
}

/* ---------- Connection wires between nodes ---------- */
function Connections() {
  const ref = useRef<THREE.LineSegments>(null);
  const positions = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < SKILL_NODES.length; i++) {
      for (let j = i + 1; j < SKILL_NODES.length; j++) {
        const a = SKILL_NODES[i];
        const b = SKILL_NODES[j];
        if (a.category === b.category) {
          arr.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }
      }
    }
    return new Float32Array(arr);
  }, []);

  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.05;
    }
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} />
      </bufferGeometry>
      <lineBasicMaterial color="#00F0FF" transparent opacity={0.25} />
    </lineSegments>
  );
}

/* ---------- Outer particle ring ---------- */
function RingParticles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      const r = 2.4 + Math.random() * 0.6;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, []);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y -= dt * 0.04;
      ref.current.rotation.x += dt * 0.01;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={800} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#6EEBFF" sizeAttenuation transparent opacity={0.7} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ---------- Desktop view with hover state ---------- */
function NexusScene({ onHover, hovered }: { onHover: (id: string | null) => void; hovered: string | null }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.08;
  });
  return (
    <group ref={ref}>
      <Connections />
      {SKILL_NODES.map((n) => (
        <Node3D key={n.id} node={n} hovered={hovered} onHover={onHover} />
      ))}
    </group>
  );
}

/* ---------- Public component ---------- */
export default function SkillNexus() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const active = SKILL_NODES.find((n) => n.id === hovered) || null;
  const categories = Array.from(new Set(SKILL_NODES.map((n) => n.category)));
  const filtered = filter ? SKILL_NODES.filter((n) => n.category === filter) : SKILL_NODES;

  return (
    <section id="nexus" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 grid-bg-dense opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <ChapterHeader id="02" label="SKILL NEXUS" desc="Neural Network of Expertise" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* 3D sphere */}
          <div className="relative col-span-1 h-[500px] overflow-hidden rounded-2xl glass-strong neon-border lg:col-span-3 lg:h-[620px]">
            <div className="absolute left-4 top-4 z-10 font-mono text-[10px] tracking-widest text-cyan-300/70">
              ◆ NEXUS_RENDER.v3 · HOVER A NODE
            </div>
            <div className="absolute right-4 top-4 z-10 font-mono text-[10px] tracking-widest text-cyan-300/70">
              {SKILL_NODES.length} NODES
            </div>

            <Canvas
              camera={{ position: [0, 0, 4.5], fov: 50 }}
              dpr={[1, 1.6]}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.4} />
              <pointLight position={[3, 3, 3]} color="#00F0FF" intensity={1.2} />
              <pointLight position={[-3, -2, 2]} color="#00B8FF" intensity={0.8} />
              <Suspense fallback={null}>
                <NexusScene onHover={setHovered} hovered={hovered} />
                <RingParticles />
              </Suspense>
            </Canvas>

            {/* Center label */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="text-center font-mono text-[10px] tracking-widest text-cyan-300/30">
                [ NEURAL SPHERE ]
              </div>
            </div>
          </div>

          {/* Side panel */}
          <div className="col-span-1 flex flex-col gap-4 lg:col-span-2">
            {/* Filter chips */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { setFilter(null); audio.click(); }}
                onMouseEnter={() => audio.hover()}
                className={`rounded-full border px-3 py-1 font-mono text-[10px] tracking-widest transition ${
                  !filter
                    ? "border-cyan-400 bg-cyan-400/20 text-cyan-200"
                    : "border-cyan-400/30 text-cyan-300/60 hover:border-cyan-400/60"
                }`}
              >
                ALL
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => { setFilter(c); audio.click(); }}
                  onMouseEnter={() => audio.hover()}
                  className={`rounded-full border px-3 py-1 font-mono text-[10px] tracking-widest transition ${
                    filter === c
                      ? "border-cyan-400 bg-cyan-400/20 text-cyan-200"
                      : "border-cyan-400/30 text-cyan-300/60 hover:border-cyan-400/60"
                  }`}
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Active node info */}
            <motion.div
              key={active?.id || "none"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-strong neon-border min-h-[160px] rounded-xl p-5"
            >
              {active ? (
                <div>
                  <div className="font-mono text-[10px] tracking-widest" style={{ color: active.color }}>
                    {active.category.toUpperCase()} · NODE
                  </div>
                  <div className="mt-1 font-display text-3xl font-bold text-white" style={{ textShadow: `0 0 20px ${active.color}80` }}>
                    {active.label}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-cyan-100/80">{active.desc}</p>
                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between font-mono text-[10px] text-cyan-300/60">
                      <span>PROFICIENCY</span>
                      <span>{active.level}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-cyan-400/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${active.level}%` }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${active.color}, #6EEBFF)` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full min-h-[140px] flex-col items-start justify-center font-mono text-xs text-cyan-300/50">
                  <div className="mb-1 text-cyan-300/70">// HOVER OR TAP A NODE</div>
                  <div>{SKILL_NODES.length} active capabilities across {categories.length} domains</div>
                </div>
              )}
            </motion.div>

            {/* Skills list */}
            <div className="glass rounded-xl p-4">
              <div className="mb-3 font-mono text-[10px] tracking-widest text-cyan-300/60">
                {filter ? `${filter.toUpperCase()} · ${filtered.length} NODES` : `ALL · ${filtered.length} NODES`}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {filtered.map((n) => (
                  <button
                    key={n.id}
                    onMouseEnter={() => { setHovered(n.id); audio.hover(); }}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => audio.click()}
                    className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wide transition ${
                      hovered === n.id
                        ? "border-cyan-300 bg-cyan-300/15 text-white"
                        : "border-cyan-400/20 text-cyan-200/70 hover:border-cyan-400/50"
                    }`}
                    style={hovered === n.id ? { boxShadow: `0 0 16px ${n.color}50` } : {}}
                  >
                    {n.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
