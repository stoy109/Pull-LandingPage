import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { phases } from '../data/content'
import { PhaseIllustration } from './Graphics'

gsap.registerPlugin(ScrollTrigger)

function PhaseCopy({ phase, index }) {
  return (
    <div className="phase-copy">
      <div className="phase-copy__meta">
        <span>0{index + 1}</span>
        <span>{phase.kicker}</span>
      </div>
      <h3>{phase.title}</h3>
      <p className="phase-copy__caption">{phase.caption}</p>
      <ol>
        {phase.points.map((point, pointIndex) => (
          <li key={point}>
            <span>0{pointIndex + 1}</span>
            <p>{point}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function FlowSection() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const matchMedia = gsap.matchMedia()

    matchMedia.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const panels = gsap.utils.toArray('.flow-panel', section)
      const copies = gsap.utils.toArray('.flow-copy-wrap', section)
      const indicators = gsap.utils.toArray('.flow-indicator', section)

      gsap.set(panels.slice(1), { autoAlpha: 0, scale: 0.86, rotation: 4, y: 70 })
      gsap.set(copies.slice(1), { autoAlpha: 0, y: 70 })
      gsap.set(indicators.slice(1), { opacity: 0.68 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=3300',
          pin: section.querySelector('.flow-pin'),
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      timeline
        .from('.flow-eyebrow', { y: -16, duration: 0.25 })
        .from('.flow-panel:first-child .phase-visual > *', { y: 40, autoAlpha: 0, stagger: 0.06, duration: 0.55 }, '<')
        .from('.flow-copy-wrap:first-child li', { x: 38, autoAlpha: 0, stagger: 0.07, duration: 0.45 }, '<0.05')
        .to({}, { duration: 0.28 })

      for (let index = 1; index < phases.length; index += 1) {
        timeline
          .addLabel(`phase-${index}`)
          .to(copies[index - 1], { autoAlpha: 0, y: -50, duration: 0.42 })
          .to(panels[index - 1], { autoAlpha: 0, scale: 0.9, rotation: -4, y: -50, duration: 0.48 }, '<')
          .to(indicators[index - 1], { opacity: 0.68, duration: 0.2 }, '<')
          .fromTo(
            panels[index],
            { autoAlpha: 0, scale: 0.86, rotation: 4, y: 70 },
            { autoAlpha: 1, scale: 1, rotation: 0, y: 0, duration: 0.62 },
          )
          .fromTo(
            copies[index],
            { autoAlpha: 0, y: 70 },
            { autoAlpha: 1, y: 0, duration: 0.52 },
            '<0.08',
          )
          .to(indicators[index], { opacity: 1, duration: 0.25 }, '<')
          .from(copies[index].querySelectorAll('li'), { x: 38, autoAlpha: 0, stagger: 0.07, duration: 0.4 }, '<0.08')
          .to('.flow-progress__fill', { scaleX: (index + 1) / phases.length, duration: 0.55 }, '<')
          .to({}, { duration: 0.3 })
      }

      return () => timeline.scrollTrigger?.kill()
    })

    return () => matchMedia.revert()
  }, [])

  return (
    <section className="flow-section" id="alur" ref={sectionRef} aria-labelledby="flow-title">
      <div className="flow-pin">
        <div className="flow-eyebrow">
          <span className="section-tag section-tag--light">03 · Alur Sistem</span>
          <h2 id="flow-title">Alur Pull yang sederhana dan terpercaya.</h2>
        </div>

        <div className="flow-desktop">
          <div className="flow-stage">
            {phases.map((phase) => (
              <div className="flow-panel" key={phase.title}>
                <PhaseIllustration type={phase.illustration} />
              </div>
            ))}
          </div>

          <div className="flow-copy-stage">
            {phases.map((phase, index) => (
              <div className="flow-copy-wrap" key={phase.title}>
                <PhaseCopy phase={phase} index={index} />
              </div>
            ))}
          </div>

          <div className="flow-progress" aria-hidden="true">
            <div className="flow-progress__track"><i className="flow-progress__fill" /></div>
            <div className="flow-progress__labels">
              {phases.map((phase, index) => (
                <span className="flow-indicator" key={phase.title}>0{index + 1}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flow-mobile">
          {phases.map((phase, index) => (
            <article className="flow-mobile__phase" key={phase.title}>
              <PhaseIllustration type={phase.illustration} />
              <PhaseCopy phase={phase} index={index} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
