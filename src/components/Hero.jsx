import React from 'react'
import { heroSoftware } from '../data/projects'
import { ArrowDown } from 'lucide-react'

export default function Hero({ scrollY }) {
  // Parallax fade and upward shift as user begins scrolling
  const progress = Math.min(Math.max((scrollY || 0) / 480, 0), 1)
  const heroOpacity = 1 - progress * 0.95
  const heroTranslate = -progress * 65
  const heroScale = 1 - progress * 0.04
  const heroBlur = progress * 6

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      aria-label="Chitraksh Jain — Video Editor"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8rem 4rem 4rem',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      {/* Cinematic Editing Suite Background Atmosphere (Reference A) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(ellipse at 70% 40%, rgba(217, 56, 41, 0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 25%, rgba(100, 140, 200, 0.08) 0%, transparent 50%), url("https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          opacity: 0.22,
          filter: 'contrast(125%) brightness(65%) saturate(120%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Dark Vignette & Gradient Masks */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(7, 8, 9, 0.96) 35%, rgba(7, 8, 9, 0.7) 65%, rgba(7, 8, 9, 0.9) 100%), linear-gradient(to bottom, rgba(7, 8, 9, 0.5) 0%, transparent 40%, rgba(7, 8, 9, 0.98) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Main Left-Aligned Content Container — Reference A */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '780px',
          transform: `translateY(${heroTranslate}px) scale(${heroScale})`,
          opacity: heroOpacity,
          filter: `blur(${heroBlur}px)`,
          transition: 'transform 0.08s linear, opacity 0.08s linear, filter 0.08s linear',
          willChange: 'transform, opacity, filter',
        }}
      >
        {/* Top Tagline */}
        <div style={{ marginBottom: '1.25rem' }}>
          <span
            className="section-tag-label"
            style={{
              color: 'var(--text-secondary)',
              letterSpacing: '0.24em',
              fontSize: '0.72rem',
            }}
          >
            VIDEO EDITOR &amp; MOTION DESIGNER
          </span>
        </div>

        {/* Headline — Reference A */}
        <h1
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(3.5rem, 7vw, 6.8rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.94,
            color: '#FFFFFF',
            textShadow: '0 12px 40px rgba(0,0,0,0.85)',
            marginBottom: '1.75rem',
          }}
        >
          CHITRAKSH
          <br />
          JAIN
        </h1>

        {/* Subtitle Copy — Reference A */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1.05rem, 1.45vw, 1.25rem)',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '560px',
            marginBottom: '2.5rem',
          }}
        >
          Turning raw footage into compelling visual stories for brands,
          creators and 50+ viral reels.
        </p>

        {/* Software Badges Row — Reference A [Pr], [Ae], [Ps] */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {heroSoftware.map((item) => (
            <div key={item.code} className="software-badge">
              <div
                className="software-icon-box"
                style={{
                  background: item.bg,
                  color: item.color,
                  border: `1px solid ${item.border}`,
                }}
              >
                {item.code}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    lineHeight: 1.15,
                  }}
                >
                  {item.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.55rem',
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                    lineHeight: 1,
                    letterSpacing: '0.04em',
                  }}
                >
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Right Scroll To Explore — Reference A */}
      <div
        onClick={() => scrollToSection('showreel')}
        style={{
          position: 'absolute',
          bottom: '3.5rem',
          left: '4rem',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          cursor: 'pointer',
          opacity: Math.max(0, 1 - progress * 2.5),
          transition: 'opacity 0.25s',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          SCROLL TO EXPLORE
        </span>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            transition: 'all 0.25s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.color = '#FFFFFF'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
            e.currentTarget.style.color = 'var(--text-secondary)'
          }}
        >
          <ArrowDown size={14} />
        </div>
      </div>
    </section>
  )
}
