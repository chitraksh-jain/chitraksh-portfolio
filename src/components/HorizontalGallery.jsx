import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { reelProjects } from '../data/projects'
import { useScrollGallery } from '../hooks/useScrollGallery'
import VideoCard from './VideoCard'
import ProjectInfo from './ProjectInfo'

const CARD_WIDTH = 300
const CARD_GAP = 36
// Extra scroll height per card (controls how much vertical scroll = one card)
const SCROLL_MULTIPLIER = 260

export default function HorizontalGallery() {
  const { wrapperRef, stickyRef, trackRef, activeIndex, progress } = useScrollGallery(reelProjects.length)
  const [containerWidth, setContainerWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440)
  const [trackX, setTrackX] = useState(containerWidth / 2 - CARD_WIDTH / 2)
  const [sectionVisible, setSectionVisible] = useState(false)
  const animFrameRef = useRef(null)

  useEffect(() => {
    const update = () => setContainerWidth(window.innerWidth)
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  // Mirror the trackRef transform for prop drilling to VideoCard
  useEffect(() => {
    let running = true
    const read = () => {
      if (!running) return
      if (trackRef.current) {
        const t = new DOMMatrix(getComputedStyle(trackRef.current).transform)
        setTrackX(t.m41) // translateX
      }
      animFrameRef.current = requestAnimationFrame(read)
    }
    animFrameRef.current = requestAnimationFrame(read)
    return () => { running = false; cancelAnimationFrame(animFrameRef.current) }
  }, [trackRef])

  // Observe section visibility for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setSectionVisible(true)
    }, { threshold: 0.1 })
    if (wrapperRef.current) observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [wrapperRef])

  // Wrapper height = viewport height + (number of cards * scroll multiplier)
  const wrapperHeight = `calc(100vh + ${reelProjects.length * SCROLL_MULTIPLIER}px)`

  return (
    <section
      id="work"
      aria-label="Horizontal video gallery"
      style={{
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Section heading */}
      <div style={{
        textAlign: 'center',
        padding: '5rem 1.5rem 3rem',
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>
        <span className="label" style={{ color: 'var(--text-dim)' }}>Selected Work</span>
        <h2 style={{
          fontFamily: 'var(--font)',
          fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 4rem)',
          letterSpacing: '-0.03em',
          color: 'var(--text)',
          marginTop: '0.75rem',
        }}>
          The Reel
        </h2>
      </div>

      {/* Scroll-to-horizontal wrapper */}
      <div
        ref={wrapperRef}
        style={{ height: wrapperHeight, position: 'relative' }}
      >
        {/* Sticky container */}
        <div
          ref={stickyRef}
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Subtle glow beneath track */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60vw',
            height: '60vh',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(192,57,43,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Progress bar */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            height: '2px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '1px',
          }}>
            <div style={{
              height: '100%',
              width: `${progress * 100}%`,
              background: 'var(--accent)',
              borderRadius: '1px',
              transition: 'width 0.05s linear',
            }} />
          </div>

          {/* Counter */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            bottom: '3.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font)',
            fontWeight: 600,
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            color: 'var(--text-dim)',
          }}>
            {String(activeIndex + 1).padStart(2, '0')} / {String(reelProjects.length).padStart(2, '0')}
          </div>

          {/* Video track */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: `${534 * 1.45}px`, // max card height
            display: 'flex',
            alignItems: 'center',
          }}>
            <div
              ref={trackRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: `${CARD_GAP}px`,
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: `translateX(${containerWidth / 2 - CARD_WIDTH / 2}px) translateY(-50%)`,
                willChange: 'transform',
              }}
            >
              {reelProjects.map((project, i) => (
                <VideoCard
                  key={project.id}
                  project={project}
                  index={i}
                  activeIndex={activeIndex}
                  trackX={trackX}
                  containerWidth={containerWidth}
                />
              ))}
            </div>
          </div>

          {/* Project info below track */}
          <div style={{
            position: 'absolute',
            bottom: '5rem',
            left: 0,
            right: 0,
          }}>
            <ProjectInfo project={reelProjects[activeIndex]} />
          </div>

          {/* Swipe/scroll hint */}
          <div style={{
            position: 'absolute',
            top: '1.5rem',
            right: '2rem',
            fontFamily: 'var(--font)',
            fontWeight: 500,
            fontSize: '0.55rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--text-dim)',
            opacity: 0.5,
          }}>
            Scroll ↓ to navigate
          </div>
        </div>
      </div>
    </section>
  )
}
