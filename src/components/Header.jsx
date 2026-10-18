import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BrandMark from './BrandMark'
import { socialLinks } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const navigation = [
  ['Beranda', '#beranda'],
  ['Masalah', '#masalah'],
  ['Solusi', '#solusi'],
  ['Alur Sistem', '#alur'],
  ['Kenapa Pull', '#kenapa'],
]

export default function Header() {
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuOpenRef = useRef(menuOpen)

  useEffect(() => {
    menuOpenRef.current = menuOpen
  }, [menuOpen])

  useEffect(() => {
    const header = headerRef.current
    let previous = 0

    const trigger = ScrollTrigger.create({
      start: 80,
      end: 'max',
      onUpdate: (self) => {
        const current = self.scroll()
        header.classList.toggle('is-scrolled', current > 80)
        header.classList.toggle('is-hidden', !menuOpenRef.current && current > previous && current > 520)
        previous = current
      },
    })

    return () => trigger.kill()
  }, [])

  useEffect(() => {
    const panel = menuRef.current
    if (!panel) return undefined

    if (menuOpen) {
      document.body.classList.add('menu-open')
      gsap.set(panel, { display: 'grid' })
      gsap.timeline()
        .to(panel, { autoAlpha: 1, duration: 0.32, ease: 'power2.out' })
        .fromTo(
          panel.querySelectorAll('.mobile-menu__nav a'),
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.055, duration: 0.5, ease: 'power3.out' },
          '-=0.12',
        )
    } else {
      document.body.classList.remove('menu-open')
      gsap.to(panel, {
        autoAlpha: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => gsap.set(panel, { display: 'none' }),
      })
    }

    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header className={`site-header${menuOpen ? ' menu-is-open' : ''}`} ref={headerRef}>
      <div className="nav-shell">
        <BrandMark />
        <nav className="main-nav" aria-label="Navigasi utama">
          {navigation.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <a className="nav-login" href="https://pull-phi.vercel.app/">Masuk</a>
          <a className="pill pill--small pill--lime" href="https://pull-phi.vercel.app/">
            Daftar <span aria-hidden="true">↗</span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <div className="mobile-menu" id="mobile-menu" ref={menuRef} aria-hidden={!menuOpen}>
        <nav className="mobile-menu__nav" aria-label="Navigasi mobile">
          {navigation.map(([label, href], index) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>{label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu__statement">
          <span>Tagline Pull</span>
          <p>Satu jaringan, tiga solusi, seribu peluang — bersama UMKM Solo Raya lebih kuat.</p>
        </div>
        <div className="mobile-menu__footer">
          <div><span>Sosial</span>{socialLinks.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div>
          <div><span>Legal</span><a href="mailto:halo@pull.id">Kontak</a></div>
        </div>
      </div>
    </header>
  )
}
