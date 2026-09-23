import React from 'react'

export default function Navbar({ scrolled, onNavigate }) {
  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate(targetId)
    } else {
      const el = document.getElementById(targetId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      aria-label="Navigation header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scrolled ? '1rem 3rem' : '1.75rem 3rem',
        transition: 'all 0.4s var(--ease-cinematic)',
        background: scrolled ? 'rgba(7, 8, 9, 0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(140%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid transparent',
      }}
    >
      {/* Brand Identity — Reference A */}
      <a
        href="#"
        onClick={(e) => handleNavClick(e, 'hero')}
        aria-label="Chitraksh Jain — home"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          textDecoration: 'none',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '9px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            CJ
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: '0.88rem',
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
            }}
          >
            CHITRAKSH JAIN
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '0.52rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--accent-red)',
              lineHeight: 1,
            }}
          >
            VIDEO EDITOR
          </span>
        </div>
      </a>

      {/* Floating Glass Pill Navigation Menu — Reference A */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          background: 'rgba(255, 255, 255, 0.035)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px) saturate(135%)',
          WebkitBackdropFilter: 'blur(20px) saturate(135%)',
          padding: '0.45rem 1.4rem',
          borderRadius: 'var(--radius-pill)',
          boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 10px 24px rgba(0,0,0,0.5)',
        }}
      >
        <button
          onClick={(e) => handleNavClick(e, 'showreel')}
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: '0.65rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            transition: 'color 0.25s',
            padding: '0.25rem 0.2rem',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
        >
          SHOWREEL
        </button>

        <button
          onClick={(e) => handleNavClick(e, 'gallery-stage')}
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: '0.65rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            transition: 'color 0.25s',
            padding: '0.25rem 0.2rem',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
        >
          WORK
        </button>

        <button
          onClick={(e) => handleNavClick(e, 'longform')}
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: '0.65rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            transition: 'color 0.25s',
            padding: '0.25rem 0.2rem',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
        >
          LONG-FORM
        </button>

        <button
          onClick={(e) => handleNavClick(e, 'contact')}
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '0.65rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '0.35rem 0.95rem',
            borderRadius: 'var(--radius-pill)',
            transition: 'all 0.25s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
          }}
        >
          CONTACT
        </button>
      </nav>
    </header>
  )
}
