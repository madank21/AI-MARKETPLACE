'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { cn } from '@/lib/utils'

interface Scene3DProps {
  className?: string
  variant?: 'hero' | 'background' | 'minimal'
}

type Cleanup = () => void

function createRenderer(host: HTMLDivElement) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(host.clientWidth, host.clientHeight)
  host.appendChild(renderer.domElement)

  return renderer
}

function addLights(scene: THREE.Scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.3))

  const key = new THREE.PointLight(0x6366f1, 30, 30)
  key.position.set(10, 10, 10)
  scene.add(key)

  const fill = new THREE.PointLight(0xa855f7, 16, 30)
  fill.position.set(-10, -10, -10)
  scene.add(fill)

  const rim = new THREE.SpotLight(0x06b6d4, 28, 40, 0.3, 1)
  rim.position.set(0, 5, 5)
  scene.add(rim)
}

function createStars(scene: THREE.Scene, count: number) {
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i += 1) {
    const radius = 18 + Math.random() * 80
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05,
    transparent: true,
    opacity: 0.8,
  })

  const stars = new THREE.Points(geometry, material)
  scene.add(stars)

  return { stars, geometry, material }
}

function mountBrainScene(host: HTMLDivElement, variant: Scene3DProps['variant']): Cleanup {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200)
  camera.position.set(0, 0, 6)

  const renderer = createRenderer(host)
  addLights(scene)

  const group = new THREE.Group()
  scene.add(group)

  const brainGeometry = new THREE.SphereGeometry(1.5, 64, 64)
  const brainMaterial = new THREE.MeshStandardMaterial({
    color: 0x6366f1,
    roughness: 0.2,
    metalness: 0.8,
    emissive: 0x4f46e5,
    emissiveIntensity: 0.5,
  })
  const brain = new THREE.Mesh(brainGeometry, brainMaterial)
  group.add(brain)

  const particles: THREE.Mesh[] = []
  const particleGeometry = new THREE.SphereGeometry(0.08, 16, 16)
  const colors = [0x6366f1, 0xa855f7, 0x06b6d4, 0xec4899]

  for (let i = 0; i < 12; i += 1) {
    const material = new THREE.MeshStandardMaterial({
      color: colors[i % colors.length],
      emissive: colors[i % colors.length],
      emissiveIntensity: 2,
    })
    const particle = new THREE.Mesh(particleGeometry, material)
    particles.push(particle)
    group.add(particle)
  }

  const connectionGroup = new THREE.Group()
  const nodeGeometry = new THREE.SphereGeometry(0.05, 8, 8)
  const nodeMaterial = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    emissive: 0x06b6d4,
    emissiveIntensity: 1,
    transparent: true,
    opacity: 0.8,
  })

  for (let i = 0; i < 8; i += 1) {
    const angle = (i / 8) * Math.PI * 2
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
    node.position.set(Math.cos(angle) * 2, 0, Math.sin(angle) * 2)
    connectionGroup.add(node)
  }

  group.add(connectionGroup)

  const stars = variant === 'minimal' ? null : createStars(scene, 2000)
  const clock = new THREE.Clock()
  let frame = 0

  const resize = () => {
    const width = Math.max(host.clientWidth, 1)
    const height = Math.max(host.clientHeight, 1)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  const animate = () => {
    frame = window.requestAnimationFrame(animate)
    const time = clock.getElapsedTime()

    brain.rotation.y = time * 0.2
    brain.scale.setScalar(1 + Math.sin(time * 2) * 0.04)
    group.rotation.y = time * 0.1
    connectionGroup.rotation.y = time * 0.05
    connectionGroup.rotation.x = Math.sin(time * 0.1) * 0.1

    particles.forEach((particle, index) => {
      const angle = (index / 12) * Math.PI * 2
      const radius = 2.5 + (index % 3) * 0.5
      const speed = 0.5 + (index % 3) * 0.2
      const yOffset = ((index % 5) - 2) * 0.4
      const t = time * speed + angle

      particle.position.set(
        Math.cos(t) * radius,
        yOffset + Math.sin(t * 2) * 0.3,
        Math.sin(t) * radius
      )
    })

    if (stars) {
      stars.stars.rotation.y = time * 0.01
    }

    renderer.render(scene, camera)
  }

  resize()
  animate()
  window.addEventListener('resize', resize)

  return () => {
    window.cancelAnimationFrame(frame)
    window.removeEventListener('resize', resize)
    renderer.dispose()
    brainGeometry.dispose()
    brainMaterial.dispose()
    particleGeometry.dispose()
    particles.forEach((particle) => {
      const material = particle.material
      if (Array.isArray(material)) {
        material.forEach((item) => item.dispose())
      } else {
        material.dispose()
      }
    })
    nodeGeometry.dispose()
    nodeMaterial.dispose()
    stars?.geometry.dispose()
    stars?.material.dispose()
    host.removeChild(renderer.domElement)
  }
}

function mountCubesScene(host: HTMLDivElement): Cleanup {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
  camera.position.set(0, 0, 5)

  const renderer = createRenderer(host)
  scene.add(new THREE.AmbientLight(0xffffff, 0.2))

  const light = new THREE.PointLight(0xffffff, 14, 30)
  light.position.set(10, 10, 10)
  scene.add(light)

  const cubeData = [
    { position: [-3, 2, -2] as const, scale: 0.5, color: 0x6366f1, speed: 1 },
    { position: [3, -1, -3] as const, scale: 0.7, color: 0xa855f7, speed: 0.8 },
    { position: [-2, -2, -1] as const, scale: 0.4, color: 0x06b6d4, speed: 1.2 },
    { position: [2, 1, -2] as const, scale: 0.6, color: 0xec4899, speed: 0.9 },
    { position: [0, 3, -4] as const, scale: 0.3, color: 0x22c55e, speed: 1.1 },
  ]

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const cubes = cubeData.map((cube) => {
    const material = new THREE.MeshStandardMaterial({
      color: cube.color,
      metalness: 0.8,
      roughness: 0.2,
      emissive: cube.color,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.7,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(cube.position[0], cube.position[1], cube.position[2])
    mesh.scale.setScalar(cube.scale)
    scene.add(mesh)
    return { ...cube, mesh, material }
  })

  const stars = createStars(scene, 1000)
  const clock = new THREE.Clock()
  let frame = 0

  const resize = () => {
    const width = Math.max(host.clientWidth, 1)
    const height = Math.max(host.clientHeight, 1)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  const animate = () => {
    frame = window.requestAnimationFrame(animate)
    const time = clock.getElapsedTime()

    cubes.forEach((cube) => {
      cube.mesh.rotation.x = time * cube.speed
      cube.mesh.rotation.y = time * cube.speed * 0.5
      cube.mesh.position.y = cube.position[1] + Math.sin(time * cube.speed) * 0.5
    })
    stars.stars.rotation.y = time * 0.006

    renderer.render(scene, camera)
  }

  resize()
  animate()
  window.addEventListener('resize', resize)

  return () => {
    window.cancelAnimationFrame(frame)
    window.removeEventListener('resize', resize)
    renderer.dispose()
    geometry.dispose()
    cubes.forEach((cube) => cube.material.dispose())
    stars.geometry.dispose()
    stars.material.dispose()
    host.removeChild(renderer.domElement)
  }
}

export function Scene3D({ className, variant = 'hero' }: Scene3DProps) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hostRef.current) return
    return mountBrainScene(hostRef.current, variant)
  }, [variant])

  return <div ref={hostRef} className={cn('w-full h-full', className)} />
}

export function FloatingCubesScene({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hostRef.current) return
    return mountCubesScene(hostRef.current)
  }, [])

  return <div ref={hostRef} className={cn('w-full h-full', className)} />
}
