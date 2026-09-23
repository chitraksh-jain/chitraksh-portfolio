import React, { useEffect, useState } from 'react'

const SKILLS = [
  'Adobe Premiere Pro',
  'After Effects',
  'Motion Graphics',
  'Post-Production',
  'Social Media Content',
]

export default function Hero({ scrollY }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Parallax fade and upward shift as user begins scrolling
  const progress = Math.min(Math.max((scrollY || 0) / 450, 0), 1)
  const heroOpacity = 1 - progress * 0.95
  const heroTranslate = -progress * 70
  const heroScale = 1 - progress * 0.05
  const heroBlur = progress * 6

  return (
    <section
      id="hero"
      aria-label="Chitraksh Jain — Video Editor"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '7rem 1.5rem 4rem',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '920px',
          textAlign: 'center',
          transform: `translateY(${heroTranslate}px) scale(${heroScale})`,
          opacity: heroOpacity,
          filter: `blur(${heroBlur}px)`,
          transition: 'transform 0.08s linear, opacity 0.08s linear, filter 0.08s linear',
          willChange: 'transform, opacity, filter',
        }}
      >
        {/* Role Pill */}
        <div
          className={mounted ? 'anim-editorial-reveal anim-delay-1' : ''}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1.1rem',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(255, 255, 255, 0.035)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(16px)',
            marginBottom: '1.75rem',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--accent-red-bright)',
              boxShadow: '0 0 8px var(--accent-red-bright)',
              animation: 'statusDotBlink 2.4s ease-in-out infinite',
            }}
          />
          <span className="label-editorial" style={{ color: 'var(--text-primary)', letterSpacing: '0.22em' }}>
            Video Editor &amp; Motion Designer
          </span>
        </div>

        {/* Name Display */}
        <div className={mounted ? 'anim-editorial-reveal anim-delay-2' : ''}>
          <h1
            className="heading-display"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 30%, #8A92A6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 10px 40px rgba(0,0,0,0.6)',
              marginBottom: '1.5rem',
            }}
          >
            CHITRAKSH
            <br />
            JAIN
          </h1>
        </div>

        {/* Editorial Subtitle */}
        <div
          className={mounted ? 'anim-editorial-reveal anim-delay-3' : ''}
          style={{ maxWidth: '580px', margin: '0 auto 2.25rem' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(1.05rem, 1.6vw, 1.28rem)',
              fontWeight: 400,
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              letterSpacing: '-0.01em',
            }}
          >
            Turning raw footage into compelling visual stories.
            <br />
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              50+ reels edited across social, brand and creative content.
            </span>
          </p>
        </div>

        {/* Skills Tagline */}
        <div
          className={mounted ? 'anim-editorial-reveal anim-delay-4' : ''}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.65rem',
          }}
        >
          {SKILLS.map((skill) => (
            <span
              key={skill}
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll to explore hint */}
      <div
        className={mounted ? 'anim-editorial-reveal anim-delay-5' : ''}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem',
          opacity: Math.max(0, 1 - progress * 3),
          transition: 'opacity 0.2s',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: '0.58rem',
            fontWeight: 700,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          Scroll to explore
        </span>
        <div style={{ animation: 'scrollIndicatorPulse 2.4s ease-in-out infinite' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 4V18M12 18L6 12M12 18L18 12"
              stroke="var(--text-muted)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
