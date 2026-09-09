'use client'

export default function House({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Main house body */}
      <mesh castShadow receiveShadow position={[0, 1.25, 0]}>
        <boxGeometry args={[4, 2.5, 4]} />
        <meshStandardMaterial color="#e2dcd4" roughness={0.88} metalness={0} />
      </mesh>

      {/* Flat roof parapet edge */}
      <mesh castShadow receiveShadow position={[0, 2.62, 0]}>
        <boxGeometry args={[4.4, 0.24, 4.4]} />
        <meshStandardMaterial color="#ccc6be" roughness={0.9} metalness={0} />
      </mesh>

      {/* Window — front left */}
      <mesh position={[-0.9, 1.6, 2.02]}>
        <boxGeometry args={[0.85, 0.85, 0.05]} />
        <meshStandardMaterial color="#a8cce8" emissive="#a8cce8" emissiveIntensity={0.15} metalness={0.25} roughness={0.1} />
      </mesh>

      {/* Window — front right */}
      <mesh position={[0.9, 1.6, 2.02]}>
        <boxGeometry args={[0.85, 0.85, 0.05]} />
        <meshStandardMaterial color="#a8cce8" emissive="#a8cce8" emissiveIntensity={0.15} metalness={0.25} roughness={0.1} />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0.65, 2.02]}>
        <boxGeometry args={[0.75, 1.3, 0.05]} />
        <meshStandardMaterial color="#7a5c42" roughness={0.8} metalness={0} />
      </mesh>

      {/* Side window */}
      <mesh position={[-2.02, 1.6, 0]}>
        <boxGeometry args={[0.05, 0.85, 0.85]} />
        <meshStandardMaterial color="#a8cce8" emissive="#a8cce8" emissiveIntensity={0.15} metalness={0.25} roughness={0.1} />
      </mesh>

      {/* Inverter box on wall (DC-AC converter) */}
      <mesh castShadow position={[-2.06, 1.2, 0.6]}>
        <boxGeometry args={[0.12, 0.38, 0.32]} />
        <meshStandardMaterial color="#2c3a4a" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* LED status indicator on inverter */}
      <mesh position={[-2.068, 1.32, 0.68]}>
        <boxGeometry args={[0.01, 0.04, 0.04]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={3} />
      </mesh>
    </group>
  )
}
