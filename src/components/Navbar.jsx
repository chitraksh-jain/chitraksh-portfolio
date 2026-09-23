import React, { useEffect, useRef } from 'react'

export default function Navbar({ scrolled }) {
  const navRef = useRef(null)

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      ref={navRef}
      aria-label="Primary navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 2.5rem',
        background: scrolled
          ? 'rgba(8,8,8,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        aria-label="Chitraksh Jain — home"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1px',
          textDecoration: 'none',
        }}
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
      >
        <span style={{
          fontFamily: 'var(--font)',
          fontWeight: 800,
          fontSize: '1.1rem',
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          lineHeight: 1,
        }}>
          CJ
        </span>
        <span style={{
          fontFamily: 'var(--font)',
          fontWeight: 400,
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          lineHeight: 1,
        }}>
          Chitraksh Jain
        </span>
      </a>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <button
          onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            fontFamily: 'var(--font)',
            fontWeight: 500,
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            transition: 'color 0.2s',
            background: 'none',
            border: 'none',
          }}
          onMouseEnter={e => (e.target.style.color = 'var(--text)')}
          onMouseLeave={e => (e.target.style.color = 'var(--text-muted)')}
        >
          Work
        </button>
        <button
          onClick={scrollToContact}
          aria-label="Contact Chitraksh"
          style={{
            fontFamily: 'var(--font)',
            fontWeight: 600,
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--text)',
            cursor: 'pointer',
            padding: '0.45rem 1rem',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '100px',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(8px)',
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
          }}
        >
          Contact
        </button>
      </div>
    </nav>
  )
}
