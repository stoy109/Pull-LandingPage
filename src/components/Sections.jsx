import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BrandMark from './BrandMark'
import { comparisons, problems, solutions } from '../data/content'
import { FeatureIcon, HeroRouteArt, JourneyPath } from './Graphics'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  ['Instagram', 'https://instagram.com'],
  ['WhatsApp', 'https://wa.me/'],
  ['LinkedIn', 'https://linkedin.com'],
  ['Email', 'mailto:halo@pull.id'],
]

function setupCardMotion(selector, scope) {
  const cards = gsap.utils.toArray(selector, scope)
  const removers = []
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches

  cards.forEach((card, index) => {
    const icon = card.querySelector('svg')

    if (icon) {
      gsap.to(icon, {
        y: index % 2 === 0 ? -10 : 9,
        rotation: index % 2 === 0 ? -2.5 : 2.5,
        duration: 2.4 + index * 0.35,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }


    if (!canHover) return

    const onPointerMove = (event) => {
      const bounds = card.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5

      gsap.to(card, {
        rotationX: -y * 5,
        rotationY: x * 6,
        x: x * 5,
        y: y * 5 - 6,
        transformPerspective: 900,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    const onPointerLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.55)',
        overwrite: 'auto',
      })
    }

    card.addEventListener('pointermove', onPointerMove)
    card.addEventListener('pointerleave', onPointerLeave)
    removers.push(() => {
      card.removeEventListener('pointermove', onPointerMove)
      card.removeEventListener('pointerleave', onPointerLeave)
    })
  })

  return () => removers.forEach((remove) => remove())
}

export function HeroSection() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } })
      timeline
        .from('.hero-kicker', { scaleX: 0, transformOrigin: 'left', duration: 0.65 })
        .from('.hero-line > span', { yPercent: 105, stagger: 0.1, duration: 0.95 }, '-=0.25')
        .from('.hero-brand-tagline', { y: 24, autoAlpha: 0, duration: 0.65 }, '-=0.5')
        .from('.hero-support > *', { y: 24, autoAlpha: 0, stagger: 0.09, duration: 0.65 }, '-=0.45')
        .from('.hero-art', { xPercent: 12, autoAlpha: 0, duration: 1.05 }, '-=0.9')
        .from('.hero-cart__crate', { y: -80, autoAlpha: 0, stagger: 0.12, duration: 0.75 }, '-=0.55')
        .from('.hero-art__label', { scale: 0, autoAlpha: 0, stagger: 0.1, duration: 0.5 }, '-=0.4')
        .from('.hero-foot', { y: 20, autoAlpha: 0, duration: 0.6 }, '-=0.3')

      gsap.to('.hero-art svg', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
      })
      gsap.to('.hero-cart', { y: -8, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    }, ref)

    return () => context.revert()
  }, [])

  return (
    <section className="hero" id="beranda" ref={ref} aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-kicker"><span>Platform digital UMKM Solo Raya</span><i /></div>
          <h1 id="hero-title">
            <span className="hero-line"><span>Satu jaringan, tiga solusi,</span></span>
            <span className="hero-line"><span>seribu peluang.</span></span>
          </h1>
          <p className="hero-brand-tagline">— bersama UMKM Solo Raya lebih kuat.</p>
          <div className="hero-support">
            <p>
              Patungan bahan baku bersama UMKM lain, temukan tenaga kerja harian dalam hitungan jam, dan bangun etalase digital otomatis dengan QR Code — gratis untuk mulai.
            </p>
            <a className="pill pill--hero" href="https://pull-phi.vercel.app/">
              <span>Mulai Sekarang</span>
              <i aria-hidden="true">↘</i>
            </a>
          </div>
        </div>
        <HeroRouteArt />
      </div>
      <div className="hero-foot" aria-hidden="true">
        <span>01 / 05</span>
        <div><i /> GULIR UNTUK MENGENAL PULL</div>
        <span>SOLO RAYA — 2026</span>
      </div>
    </section>
  )
}

export function ProblemSection() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let removeInteractions = () => {}

    const context = gsap.context(() => {
      gsap.from('.problem-heading > *', {
        y: 56,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.problem-heading', start: 'top 78%' },
      })
      gsap.from('.problem-card', {
        y: 110,
        rotation: (index) => (index - 1) * 4,
        autoAlpha: 0,
        stagger: 0.14,
        duration: 0.95,
        ease: 'back.out(1.2)',
        scrollTrigger: { trigger: '.problem-cards', start: 'top 76%' },
      })
      gsap.fromTo(
        '.problem-section .journey-path path',
        { strokeDashoffset: 900 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'bottom 45%', scrub: 1 },
        },
      )
      removeInteractions = setupCardMotion('.problem-card', ref.current)
    }, ref)

    return () => {
      removeInteractions()
      context.revert()
    }
  }, [])

  return (
    <section className="problem-section section-pad" id="masalah" ref={ref} aria-labelledby="problem-title">
      <JourneyPath />
      <div className="section-head problem-heading">
        <span className="section-tag section-tag--yellow">01 · Masalah UMKM</span>
        <h2 id="problem-title">Tiga masalah yang menghambat pertumbuhan UMKM.</h2>
        <p>Hambatan di bahan baku, tenaga kerja, dan pemasaran saling berkaitan. Pull membantu memutus siklusnya.</p>
      </div>
      <div className="problem-cards">
        {problems.map((problem, index) => (
          <div className={`problem-card-wrap problem-card-wrap--${index + 1}`} key={problem.title}>
            <article className="problem-card interactive-card">
              <div className="card-index"><span>0{index + 1}</span><i>MASALAH</i></div>
              <FeatureIcon name={problem.icon} />
              <h3>{problem.title}</h3>
              <p>{problem.description}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export function SolutionSection() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let removeInteractions = () => {}

    const context = gsap.context(() => {
      gsap.from('.solution-heading > *', {
        y: 58,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.solution-heading', start: 'top 76%' },
      })
      gsap.from('.solution-card', {
        y: 110,
        scale: 0.92,
        rotation: (index) => (index - 1) * -4,
        autoAlpha: 0,
        stagger: 0.14,
        duration: 0.95,
        ease: 'back.out(1.15)',
        scrollTrigger: { trigger: '.solution-cards', start: 'top 76%' },
      })
      gsap.fromTo(
        '.solution-route',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'bottom 60%', scrub: 1 },
        },
      )
      removeInteractions = setupCardMotion('.solution-card', ref.current)
    }, ref)

    return () => {
      removeInteractions()
      context.revert()
    }
  }, [])

  return (
    <section className="solution-section section-pad" id="solusi" ref={ref} aria-labelledby="solution-title">
      <div className="solution-topline"><span>PULL UNTUK UMKM</span><i className="solution-route" /><span>02 / SOLUSI</span></div>
      <div className="section-head solution-heading">
        <span className="section-tag section-tag--dark">02 · Solusi Pull</span>
        <h2 id="solution-title">Tiga solusi dalam satu platform.</h2>
        <p>Setiap fitur menyelesaikan satu kebutuhan dan memperkuat seluruh jaringan usaha.</p>
      </div>
      <div className="solution-cards">
        {solutions.map((solution, index) => (
          <div className={`solution-card-wrap solution-card-wrap--${index + 1}`} key={solution.title}>
            <article className="solution-card interactive-card">
              <div className="solution-card__top"><span>0{index + 1}</span><FeatureIcon name={solution.icon} /></div>
              <div>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ComparisonSection() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      gsap.from('.compare-title > *', {
        y: 54,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.compare-title', start: 'top 75%' },
      })
      gsap.from('.compare-row', {
        clipPath: 'inset(0 100% 0 0)',
        stagger: 0.1,
        duration: 0.85,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.comparison-table', start: 'top 77%' },
      })
      gsap.from('.compare-vs', {
        scale: 0,
        duration: 0.65,
        ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.comparison-head', start: 'top 80%' },
      })
    }, ref)
    return () => context.revert()
  }, [])

  return (
    <section className="comparison-section section-pad" id="kenapa" ref={ref} aria-labelledby="compare-title">
      <div className="compare-title">
        <span className="section-tag section-tag--dark">04 · Kenapa Pull</span>
        <h2 id="compare-title">Mengapa UMKM memilih Pull?</h2>
        <p>Pull menyatukan kebutuhan usaha yang selama ini berjalan sendiri-sendiri dalam satu ekosistem praktis.</p>
      </div>

      <div className="comparison-table">
        <div className="comparison-head" aria-hidden="true">
          <span>LAINNYA</span>
          <i className="compare-vs">VS</i>
          <span>PULL</span>
        </div>
        {comparisons.map((item, index) => (
          <article className="compare-row" key={item.label}>
            <div className="compare-row__label"><span>0{index + 1}</span>{item.label}</div>
            <div className="compare-row__other"><i>×</i><p>{item.other}</p></div>
            <div className="compare-row__pull"><i>✓</i><p>{item.pull}</p></div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function ClosingSection() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      gsap.from('.closing-main > *:not(.closing-orbit)', {
        y: 52,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      })
      gsap.from('.closing-orbit', {
        scale: 0.72,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
      })
      gsap.from('.footer-grid > *', {
        y: 30,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.65,
        scrollTrigger: { trigger: '.footer-grid', start: 'top 88%' },
      })
    }, ref)
    return () => context.revert()
  }, [])

  return (
    <footer className="closing" id="daftar" ref={ref}>
      <div className="closing-main">
        <div className="closing-orbit" aria-label="Logo Pull">
          <i /><i /><i />
          <BrandMark compact />
        </div>
        <span className="section-tag section-tag--dark">Mulai bersama Pull</span>
        <h2 className="closing-heading">Bangun usaha yang lebih kuat bersama Pull.</h2>
        <p className="closing-tagline">Satu jaringan, tiga solusi, seribu peluang — bersama UMKM Solo Raya lebih kuat.</p>
        <p className="closing-copy">Mulai dari kebutuhan paling dekat hari ini. Daftar gratis dan temukan jaringan usaha di Solo Raya.</p>
        <a className="pill pill--closing" href="https://pull-phi.vercel.app/"><span>Gabung Pull — Gratis</span><i>↗</i></a>
      </div>

      <div className="footer-grid">
        <div className="footer-brand">
          <BrandMark />
          <p>Platform digital yang membantu UMKM belanja lebih hemat, menemukan tenaga kerja, dan tampil lebih luas.</p>
        </div>
        <nav className="footer-column" aria-label="Menu footer">
          <span>Menu</span>
          <a href="#beranda">Beranda</a>
          <a href="#solusi">Solusi</a>
          <a href="#alur">Alur Sistem</a>
          <a href="#kenapa">Kenapa Pull</a>
        </nav>
        <div className="footer-column">
          <span>Sosial</span>
          {socialLinks.map(([label, href]) => <a href={href} key={label}>{label} ↗</a>)}
        </div>
        <div className="footer-column" id="legal">
          <span>Legal</span>
          <a href="#legal">Kebijakan Privasi</a>
          <a href="#legal">Syarat Layanan</a>
          <a href="mailto:halo@pull.id">Kontak</a>
        </div>
        <a className="footer-contact" href="mailto:halo@pull.id">
          <span>Butuh bantuan?</span>
          <strong>halo@pull.id</strong>
          <i>↗</i>
        </a>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Pull. Seluruh hak cipta dilindungi.</span>
        <span>Dibangun untuk UMKM Solo Raya.</span>
      </div>
    </footer>
  )
}
