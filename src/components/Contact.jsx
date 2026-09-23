import React, { useRef, useState, useEffect } from 'react'
import { Mail, MessageCircle } from 'lucide-react'

const GMAIL_URL = 'https://mail.google.com/mail/?view=cm&fs=1&to=chitraksh9257@gmail.com'
const WHATSAPP_URL = 'https://wa.me/919257757440'

const OPEN_TO = [
  'Freelance Projects',
  'Social Media Editing',
  'Brand Content',
  'Motion Graphics',
  'Long-term Collaborations',
]

export default function Contact() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.25 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-label="Contact"
      style={{
        position: 'relative',
        padding: '10rem 1.5rem 8rem',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80vw',
        height: '60vh',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(192,57,43,0.07) 0%, transparent 70%)',
        animation: 'breathe 20s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '30%',
        left: '20%',
        width: '40vw',
        height: '40vh',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(30,30,30,0.6) 0%, transparent 70%)',
        animation: 'breathe2 16s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
        {/* Label */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          marginBottom: '1.5rem',
        }}>
          <span className="label" style={{ color: 'var(--text-dim)' }}>Get in Touch</span>
        </div>

        {/* Big headline */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.9s ease 0.1s, transform 0.9s var(--transition-slow) 0.1s',
          marginBottom: '1.5rem',
        }}>
          <h2
            className="heading-xl"
            style={{
              background: 'linear-gradient(135deg, #e8e8e8 40%, #666 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.05,
            }}
          >
            LET'S CREATE
            <br />
            SOMETHING
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #e8e8e8 0%, var(--accent) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              GREAT.
            </span>
          </h2>
        </div>

        {/* Open to list */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
          marginBottom: '3rem',
        }}>
          <p style={{
            fontFamily: 'var(--font)',
            fontWeight: 300,
            fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.8,
          }}>
            Open to {OPEN_TO.join(' · ')}
          </p>
        </div>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '3rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease 0.4s, transform 0.8s var(--transition-slow) 0.4s',
        }}>
          {/* Email */}
          <a
            href={GMAIL_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email Chitraksh via Gmail"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontFamily: 'var(--font)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#080808',
              background: 'var(--text)',
              padding: '1rem 2rem',
              borderRadius: '100px',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
              boxShadow: '0 4px 24px rgba(232,232,232,0.15)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)'
              e.currentTarget.style.boxShadow = '0 8px 40px rgba(232,232,232,0.25)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(232,232,232,0.15)'
            }}
          >
            <Mail size={16} />
            Email Me
          </a>

          {/* WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Chitraksh"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontFamily: 'var(--font)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              background: 'transparent',
              padding: '1rem 2rem',
              borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.15)',
              textDecoration: 'none',
              backdropFilter: 'blur(8px)',
              transition: 'transform 0.2s ease, border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>

        {/* Contact info */}
        <div style={{
          opacity: visible ? 0.5 : 0,
          transition: 'opacity 0.8s ease 0.6s',
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <a
            href="mailto:chitraksh9257@gmail.com"
            style={{
              fontFamily: 'var(--font)',
              fontWeight: 400,
              fontSize: '0.75rem',
              letterSpacing: '0.04em',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.target.style.color = 'var(--text)')}
            onMouseLeave={e => (e.target.style.color = 'var(--text-muted)')}
          >
            chitraksh9257@gmail.com
          </a>
          <a
            href="tel:+919257757440"
            style={{
              fontFamily: 'var(--font)',
              fontWeight: 400,
              fontSize: '0.75rem',
              letterSpacing: '0.04em',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.target.style.color = 'var(--text)')}
            onMouseLeave={e => (e.target.style.color = 'var(--text-muted)')}
          >
            +91 9257757440
          </a>
        </div>
      </div>

      {/* Footer signature */}
      <div style={{
        marginTop: '8rem',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '6rem auto 0',
        padding: '2rem 0 0',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <span style={{
          fontFamily: 'var(--font)',
          fontWeight: 800,
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          color: 'var(--text-dim)',
        }}>
          CHITRAKSH JAIN
        </span>
        <span style={{
          fontFamily: 'var(--font)',
          fontWeight: 400,
          fontSize: '0.6rem',
          letterSpacing: '0.1em',
          color: 'var(--text-dim)',
          textTransform: 'uppercase',
        }}>
          Video Editor · 2024
        </span>
        <span style={{
          fontFamily: 'var(--font)',
          fontWeight: 400,
          fontSize: '0.6rem',
          letterSpacing: '0.1em',
          color: 'var(--text-dim)',
          textTransform: 'uppercase',
        }}>
          Premiere Pro · After Effects · Motion Graphics
        </span>
      </div>
    </section>
  )
}
