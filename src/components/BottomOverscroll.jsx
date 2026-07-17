import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import logoUrl from '../../logo.svg'

export default function BottomOverscroll() {
  const peekRef = useRef(null)

  useEffect(() => {
    const peek = peekRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!peek || reducedMotion) return undefined

    const state = { value: 0 }
    let releaseTimer
    let releaseTween
    let touchY = 0

    const render = () => {
      const progress = state.value / 112
      gsap.set(peek, {
        y: -state.value,
        opacity: Math.min(1, progress * 1.8),
      })
      gsap.set(peek.querySelector('.overscroll-peek__logo'), {
        scale: 0.86 + progress * 0.14,
        rotation: -5 + progress * 5,
      })
      gsap.set(peek.querySelector('.overscroll-peek__tagline'), {
        opacity: Math.max(0, (progress - 0.25) * 1.6),
        y: 12 - progress * 12,
      })
    }

    const release = () => {
      clearTimeout(releaseTimer)
      releaseTween?.kill()
      releaseTween = gsap.to(state, {
        value: 0,
        duration: 1.15,
        ease: 'elastic.out(1, 0.55)',
        onUpdate: render,
      })
    }

    const push = (amount) => {
      releaseTween?.kill()
      state.value = Math.min(112, state.value + amount)
      render()
      clearTimeout(releaseTimer)
      releaseTimer = window.setTimeout(release, 110)
    }

    const atBottom = () =>
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4

    const onWheel = (event) => {
      if (!atBottom() || event.deltaY <= 0) {
        if (state.value > 0 && event.deltaY < 0) release()
        return
      }

      event.preventDefault()
      push(Math.min(19, event.deltaY * 0.12))
    }

    const onTouchStart = (event) => {
      touchY = event.touches[0]?.clientY ?? 0
    }

    const onTouchMove = (event) => {
      const currentY = event.touches[0]?.clientY ?? touchY
      const delta = touchY - currentY
      touchY = currentY
      if (!atBottom() || delta <= 0) return

      event.preventDefault()
      push(Math.min(14, delta * 0.45))
    }

    window.addEventListener('wheel', onWheel, { passive: false, capture: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', release, { passive: true })

    return () => {
      clearTimeout(releaseTimer)
      releaseTween?.kill()
      window.removeEventListener('wheel', onWheel, { capture: true })
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', release)
    }
  }, [])

  return (
    <div className="overscroll-peek" ref={peekRef} aria-hidden="true">
      <div className="overscroll-peek__panel">
        <span className="overscroll-peek__logo"><img src={logoUrl} alt="" /></span>
        <span className="overscroll-peek__tagline">Satu jaringan, tiga solusi, seribu peluang</span>
      </div>
    </div>
  )
}
