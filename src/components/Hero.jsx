import React, { useEffect, useRef, useState } from 'react'

const SKILLS = ['Premiere Pro', 'After Effects', 'Motion Graphics', 'Post-Production']

export default function Hero() {
  const [visible, setVisible] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    // Small delay so everything doesn't fire on paint
    const t = setTimeout(() => setVisible(true), 120)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Hero — Chitraksh Jain"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '0 1.5rem',
      }}
    >
      {/* Animated radial background */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Dark graphite orb 1 */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '-15%',
          width: '70vw',
          height: '70vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30,30,30,0.7) 0%, transparent 70%)',
          animation: 'breathe 18s ease-in-out infinite',
        }} />
        {/* Muted red accent glow */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,57,43,0.06) 0%, transparent 70%)',
          animation: 'breathe2 22s ease-in-out infinite',
        }} />
        {/* Grey center orb */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '30%',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20,20,20,0.5) 0%, transparent 70%)',
          animation: 'breathe 26s ease-in-out infinite reverse',
        }} />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '900px',
        width: '100%',
      }}>
        {/* Role label */}
        <div
          className={visible ? 'animate-fade-up delay-100' : ''}
          style={{ opacity: visible ? undefined : 0 }}
        >
          <span className="label" style={{ color: 'var(--accent)', letterSpacing: '0.22em' }}>
            Video Editor
          </span>
        </div>

        {/* Name */}
        <div
          className={visible ? 'animate-fade-up delay-200' : ''}
          style={{ opacity: visible ? undefined : 0, marginTop: '1rem' }}
        >
          <h1
            className="display"
            style={{
              background: 'linear-gradient(135deg, #e8e8e8 40%, #888 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            CHITRAKSH
            <br />
            JAIN
          </h1>
        </div>

        {/* Divider line */}
        <div
          className={visible ? 'animate-fade-in delay-400' : ''}
          style={{
            opacity: visible ? undefined : 0,
            width: '40px',
            height: '1px',
            background: 'var(--accent)',
            margin: '2rem auto',
          }}
        />

        {/* Description */}
        <div
          className={visible ? 'animate-fade-up delay-500' : ''}
          style={{ opacity: visible ? undefined : 0 }}
        >
          <p style={{
            fontFamily: 'var(--font)',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.75,
            maxWidth: '520px',
            margin: '0 auto',
          }}>
            Turning raw footage into compelling visual stories.<br />
            <span style={{ color: 'rgba(232,232,232,0.55)' }}>
              50+ reels edited across social, brand and creative content.
            </span>
          </p>
        </div>

        {/* Skills */}
        <div
          className={visible ? 'animate-fade-up delay-600' : ''}
          style={{
            opacity: visible ? undefined : 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            justifyContent: 'center',
            marginTop: '2rem',
          }}
        >
          {SKILLS.map((skill, i) => (
            <span
              key={skill}
              style={{
                fontFamily: 'var(--font)',
                fontWeight: 500,
                fontSize: '0.6rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                padding: '0.35rem 0.8rem',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '100px',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={visible ? 'animate-fade-in delay-800' : ''}
        style={{
          opacity: visible ? undefined : 0,
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'pulseDown 2.4s ease-in-out infinite',
        }}
        aria-hidden="true"
      >
        <span style={{
          fontFamily: 'var(--font)',
          fontWeight: 500,
          fontSize: '0.55rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
        }}>
          Scroll to explore
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M4 9l4 4 4-4" stroke="rgba(107,107,107,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  )
}
