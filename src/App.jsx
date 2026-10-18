import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Header from './components/Header'
import FlowSection from './components/FlowSection'
import BottomOverscroll from './components/BottomOverscroll'
import {
  ClosingSection,
  ComparisonSection,
  HeroSection,
  ProblemSection,
  SolutionSection,
} from './components/Sections'

// Latar Three.js dimuat setelah render awal agar bundle utama tetap ringan.
const ThreeBackdrop = lazy(() => import('./components/ThreeBackdrop'))

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const meterRef = useRef(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = reducedMotion
      ? null
      : new Lenis({
          duration: 1.1,
          easing: (value) => Math.min(1, 1.001 - 2 ** (-10 * value)),
          smoothWheel: true,
          wheelMultiplier: 0.9,
        })

    const raf = (time) => lenis?.raf(time * 1000)
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)
    }

    const meter = meterRef.current
    const progressTrigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => gsap.set(meter, { scaleX: self.progress }),
    })

    const handleAnchor = (event) => {
      const anchor = event.target.closest('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href === '#' || anchor.classList.contains('skip-link')) return
      const target = document.querySelector(href)
      if (!target) return
      event.preventDefault()
      if (lenis) lenis.scrollTo(target, { offset: -24 })
      else target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
    }

    document.addEventListener('click', handleAnchor)
    ScrollTrigger.refresh()

    return () => {
      document.removeEventListener('click', handleAnchor)
      progressTrigger.kill()
      if (lenis) {
        gsap.ticker.remove(raf)
        lenis.destroy()
      }
    }
  }, [])

  return (
    <>
      <div className="scroll-meter" ref={meterRef} aria-hidden="true" />
      <Suspense fallback={<div className="three-backdrop" aria-hidden="true" />}>
        <ThreeBackdrop />
      </Suspense>
      <Header />
      <main id="main" tabIndex={-1}>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <FlowSection />
        <ComparisonSection />
      </main>
      <ClosingSection />
      <BottomOverscroll />
    </>
  )
}
