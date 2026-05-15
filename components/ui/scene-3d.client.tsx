'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Environment, Stars } from '@react-three/drei'
import { useRef, Suspense } from 'react'
import type { Mesh, Group } from 'three'
import { cn } from '@/lib/utils'

function AIBrain() {
  const meshRef = useRef<Mesh>(null)
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={meshRef} args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#6366f1"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive="#4f46e5"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>
      {[...Array(12)].map((_, i) => (
        <OrbitingParticle key={i} index={i} />
      ))}
      <NeuralConnections />
    </group>
  )
}

function OrbitingParticle({ index }: { index: number }) {
  const meshRef = useRef<Mesh>(null)
  const angle = (index / 12) * Math.PI * 2
  const radius = 2.5 + (index % 3) * 0.5
  const speed = 0.5 + (index % 3) * 0.2
  const yOffset = (index % 5 - 2) * 0.4

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed + angle
      meshRef.current.position.x = Math.cos(t) * radius
      meshRef.current.position.z = Math.sin(t) * radius
      meshRef.current.position.y = yOffset + Math.sin(t * 2) * 0.3
    }
  })

  const colors = ['#6366f1', '#a855f7', '#06b6d4', '#ec4899']

  return (
    <Sphere ref={meshRef} args={[0.08, 16, 16]} position={[radius, yOffset, 0]}>
      <meshStandardMaterial
        color={colors[index % colors.length]}
        emissive={colors[index % colors.length]}
        emissiveIntensity={2}
      />
    </Sphere>
  )
}

function NeuralConnections() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const x = Math.cos(angle) * 2
        const z = Math.sin(angle) * 2
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={1}
              transparent
              opacity={0.8}
            />
          </mesh>
        )
      })}
    </group>
  )
}

interface Scene3DProps {
  className?: string
  variant?: 'hero' | 'background' | 'minimal'
}

export function Scene3D({ className, variant = 'hero' }: Scene3DProps) {
  return (
    <div className={cn('w-full h-full', className)}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
          <spotLight
            position={[0, 5, 5]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            color="#06b6d4"
          />
          <AIBrain />
          {variant !== 'minimal' && (
            <Stars
              radius={100}
              depth={50}
              count={2000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
          )}
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}

function FloatingCube({ position, scale, color, speed }: {
  position: [number, number, number]
  scale: number
  color: string
  speed: number
}) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  )
}

export function FloatingCubesScene({ className }: { className?: string }) {
  const cubes = [
    { position: [-3, 2, -2] as [number, number, number], scale: 0.5, color: '#6366f1', speed: 1 },
    { position: [3, -1, -3] as [number, number, number], scale: 0.7, color: '#a855f7', speed: 0.8 },
    { position: [-2, -2, -1] as [number, number, number], scale: 0.4, color: '#06b6d4', speed: 1.2 },
    { position: [2, 1, -2] as [number, number, number], scale: 0.6, color: '#ec4899', speed: 0.9 },
    { position: [0, 3, -4] as [number, number, number], scale: 0.3, color: '#22c55e', speed: 1.1 },
  ]

  return (
    <div className={cn('w-full h-full', className)}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          {cubes.map((cube, i) => (
            <FloatingCube key={i} {...cube} />
          ))}
          <Stars
            radius={50}
            depth={50}
            count={1000}
            factor={3}
            saturation={0}
            fade
            speed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
