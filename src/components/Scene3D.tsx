import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ---------- Particle Field (Neural network background) ---------- */
function ParticleField({ count = 1200, radius = 12 }: { count?: number; radius?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color("#00F0FF");
    const c2 = new THREE.Color("#00B8FF");
    const c3 = new THREE.Color("#6EEBFF");
    for (let i = 0; i < count; i++) {
      const r = Math.cbrt(Math.random()) * radius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const t = Math.random();
      const c = t < 0.4 ? c1 : t < 0.8 ? c2 : c3;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count, radius]);

  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.04;
      ref.current.rotation.x += dt * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------- Connection Lines (Neural connections) ---------- */
function NeuralConnections({ count = 60, radius = 6 }: { count?: number; radius?: number }) {
  const ref = useRef<THREE.LineSegments>(null);
  const geom = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const r = 1.5 + Math.random() * radius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      nodes.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ));
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 2.6 && Math.random() < 0.5) {
          positions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
          const c = new THREE.Color().setHSL(0.52, 0.8, 0.55);
          colors.push(c.r, c.g, c.b, c.r, c.g, c.b);
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return g;
  }, [count, radius]);

  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.025;
      ref.current.rotation.x += dt * 0.008;
    }
  });

  return (
    <lineSegments ref={ref}>
      <primitive object={geom} attach="geometry" />
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

/* ---------- Floating Wireframe Globe (Azure/AWS/Cloud nodes) ---------- */
function WireGlobe() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.12;
    }
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#00F0FF" wireframe transparent opacity={0.18} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.4, 16, 16]} />
        <meshBasicMaterial color="#00B8FF" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

/* ---------- Hero: 3D Portrait Silhouette built from particles ---------- */
function HeroBust({ mouse }: { mouse: { x: number; y: number } }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);

  // Build bust shape from a sphere cluster (head + shoulders)
  const particles = useMemo(() => {
    const count = 1500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Head
      let r, theta, phi;
      if (i < count * 0.55) {
        r = 0.85 + Math.random() * 0.05;
        theta = Math.random() * Math.PI * 2;
        phi = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) + 0.3;
        pos[i * 3 + 2] = r * Math.cos(phi);
      } else {
        // Shoulders
        r = 0.6 + Math.random() * 0.9;
        theta = Math.random() * Math.PI * 2;
        phi = Math.acos(2 * Math.random() - 1);
        const y = -0.6 - Math.random() * 0.8;
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta) * (Math.abs(y) + 0.6);
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = r * Math.cos(phi) * (Math.abs(y) + 0.6) * 0.8;
      }
    }
    return pos;
  }, []);

  useFrame((state, dt) => {
    if (group.current) {
      // Subtle cursor tracking
      const tx = mouse.x * 0.25;
      const ty = mouse.y * 0.18;
      group.current.rotation.y += (tx - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (-ty - group.current.rotation.x) * 0.04;
      // Breathing
      const t = state.clock.elapsedTime;
      group.current.position.y = Math.sin(t * 0.6) * 0.05;
    }
    if (core.current) {
      core.current.rotation.y += dt * 0.4;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Particle bust */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} count={particles.length / 3} />
        </bufferGeometry>
        <pointsMaterial
          color="#6EEBFF"
          size={0.02}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Inner glowing core (heart of the digital brain) */}
      <mesh ref={core} position={[0, 0.3, 0]}>
        <icosahedronGeometry args={[0.45, 2]} />
        <meshBasicMaterial color="#00F0FF" wireframe transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.35} />
      </mesh>
      <pointLight position={[0, 0.3, 0]} color="#00F0FF" intensity={3} distance={6} />

      {/* Orbiting ring */}
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.3, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.008, 16, 100]} />
        <meshBasicMaterial color="#6EEBFF" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/* ---------- Camera Parallax Rig ---------- */
function CameraRig({ mouse }: { mouse: { x: number; y: number } }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ---------- Public Scene ---------- */
export default function Scene3D({ variant = "hero" }: { variant?: "hero" | "ambient" }) {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#00F0FF" intensity={1.2} />
      <pointLight position={[-5, -3, 3]} color="#00B8FF" intensity={0.6} />

      <CameraRig mouse={mouseRef.current} />
      <ParticleField count={variant === "hero" ? 900 : 500} radius={14} />
      <NeuralConnections count={variant === "hero" ? 50 : 30} radius={8} />

      {variant === "hero" && <HeroBust mouse={mouseRef.current} />}
      {variant === "hero" && <WireGlobe />}
    </Canvas>
  );
}
