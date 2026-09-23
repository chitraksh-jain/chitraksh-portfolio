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
        padding: scrolled ? '1rem 2.5rem' : '1.5rem 2.5rem',
        transition: 'all 0.4s var(--ease-cinematic)',
        background: scrolled ? 'rgba(8, 9, 11, 0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(140%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid transparent',
      }}
    >
      {/* Brand Mark */}
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
            width: '34px',
            height: '34px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-editorial)',
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
              fontFamily: 'var(--font-editorial)',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
            }}
          >
            CHITRAKSH JAIN
          </span>
          <span
            style={{
              fontFamily: 'var(--font-editorial)',
              fontWeight: 500,
              fontSize: '0.55rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--accent-red-bright)',
              lineHeight: 1,
            }}
          >
            Video Editor
          </span>
        </div>
      </a>

      {/* Nav Actions */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
        <button
          onClick={(e) => handleNavClick(e, 'showreel')}
          style={{
            fontFamily: 'var(--font-editorial)',
            fontWeight: 600,
            fontSize: '0.65rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            transition: 'color 0.25s',
            padding: '0.4rem 0.2rem',
          }}
          onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
        >
          Showreel
        </button>

        <button
          onClick={(e) => handleNavClick(e, 'gallery-stage')}
          style={{
            fontFamily: 'var(--font-editorial)',
            fontWeight: 600,
            fontSize: '0.65rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            transition: 'color 0.25s',
            padding: '0.4rem 0.2rem',
          }}
          onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
        >
          Work
        </button>

        <button
          onClick={(e) => handleNavClick(e, 'longform')}
          style={{
            fontFamily: 'var(--font-editorial)',
            fontWeight: 600,
            fontSize: '0.65rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            transition: 'color 0.25s',
            padding: '0.4rem 0.2rem',
          }}
          onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
        >
          Long-Form
        </button>

        <button
          onClick={(e) => handleNavClick(e, 'contact')}
          className="glass-btn"
          style={{
            padding: '0.55rem 1.25rem',
            fontSize: '0.65rem',
            borderRadius: 'var(--radius-pill)',
          }}
        >
          Contact
        </button>
      </nav>
    </header>
  )
}
