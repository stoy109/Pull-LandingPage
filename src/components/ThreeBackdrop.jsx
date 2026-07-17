import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackdrop() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!mount || reduceMotion) return undefined

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
    } catch {
      return undefined
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 30)
    camera.position.z = 8

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const count = window.innerWidth < 700 ? 70 : 150
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 15
      positions[index * 3 + 1] = (Math.random() - 0.5) * 10
      positions[index * 3 + 2] = (Math.random() - 0.5) * 8
      scales[index] = Math.random()
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float aScale;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vAlpha;
        void main() {
          vec3 p = position;
          p.y += sin(uTime * 0.16 + position.x * 0.7) * 0.12;
          p.x += cos(uTime * 0.11 + position.y) * 0.08;
          vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * viewPosition;
          gl_PointSize = (2.0 + aScale * 4.0) * uPixelRatio * (6.0 / -viewPosition.z);
          vAlpha = 0.15 + aScale * 0.45;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          if (d > 0.5) discard;
          float glow = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(0.75, 0.94, 0.30, glow * vAlpha);
        }
      `,
    })

    const points = new THREE.Points(geometry, material)
    points.rotation.z = -0.12
    scene.add(points)

    const pointer = { x: 0, y: 0 }
    const onPointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.45
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.3
    }

    const resize = () => {
      const { innerWidth, innerHeight } = window
      renderer.setSize(innerWidth, innerHeight)
      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()
    }

    let frame
    const clock = new THREE.Clock()
    const render = () => {
      material.uniforms.uTime.value = clock.getElapsedTime()
      points.rotation.y += (pointer.x - points.rotation.y) * 0.018
      points.rotation.x += (-pointer.y - points.rotation.x) * 0.018
      renderer.render(scene, camera)
      frame = requestAnimationFrame(render)
    }

    resize()
    render()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className="three-backdrop" ref={mountRef} aria-hidden="true" />
}
