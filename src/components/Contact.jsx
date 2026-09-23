import React from 'react'
import { Mail, MessageCircle, ArrowUpRight } from 'lucide-react'

const GMAIL_URL =
  'https://mail.google.com/mail/?view=cm&fs=1&to=chitraksh9257@gmail.com'
const WHATSAPP_URL = 'https://wa.me/919257757440'

export default function Contact() {
  return (
    <footer
      id="contact"
      aria-label="Contact and Inquiries"
      style={{
        position: 'relative',
        padding: '10rem 1.5rem 5rem',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      {/* Ambient Red Glow in Background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '75vw',
          height: '55vh',
          background:
            'radial-gradient(ellipse at center, rgba(192, 57, 43, 0.12) 0%, rgba(200, 215, 235, 0.03) 45%, transparent 70%)',
          filter: 'blur(75px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Label */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span className="label-editorial" style={{ color: 'var(--accent-red-bright)' }}>
            Available for Select Projects
          </span>
        </div>

        {/* Large Editorial Headline */}
        <h2
          className="heading-section"
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 30%, #8A92A6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.75rem',
          }}
        >
          LET'S CREATE
          <br />
          SOMETHING GREAT.
        </h2>

        {/* Supporting Copy */}
        <p
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            maxWidth: '620px',
            margin: '0 auto 3rem',
          }}
        >
          Open to freelance projects, social media editing, brand content,
          motion graphics and long-term creative collaborations.
        </p>

        {/* Glass Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
            marginBottom: '4rem',
          }}
        >
          {/* Email Me Button (Glass) */}
          <a
            href={GMAIL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn glass-btn-accent"
            style={{
              padding: '1rem 2.2rem',
              fontSize: '0.8rem',
            }}
          >
            <Mail size={16} />
            <span>Email Me</span>
            <ArrowUpRight size={14} style={{ opacity: 0.6 }} />
          </a>

          {/* WhatsApp Button (Glass) */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn"
            style={{
              padding: '1rem 2.2rem',
              fontSize: '0.8rem',
            }}
          >
            <MessageCircle size={16} />
            <span>WhatsApp</span>
            <ArrowUpRight size={14} style={{ opacity: 0.6 }} />
          </a>
        </div>

        {/* Subtle Direct Contact Details */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
            flexWrap: 'wrap',
            paddingBottom: '6rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <a
            href="mailto:chitraksh9257@gmail.com"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: '0.82rem',
              fontWeight: 500,
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.25s',
              letterSpacing: '0.04em',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
          >
            chitraksh9257@gmail.com
          </a>

          <a
            href="tel:+919257757440"
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: '0.82rem',
              fontWeight: 500,
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.25s',
              letterSpacing: '0.04em',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
          >
            +91 9257757440
          </a>
        </div>

        {/* Minimal Editorial Footer */}
        <div
          style={{
            paddingTop: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <span
              style={{
                fontFamily: 'var(--font-editorial)',
                fontWeight: 800,
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
              }}
            >
              CHITRAKSH JAIN
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-editorial)',
                fontSize: '0.62rem',
                fontWeight: 600,
                color: 'var(--text-dim)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: '0.2rem',
              }}
            >
              Video Editor &amp; Motion Graphics
            </span>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: '0.62rem',
              fontWeight: 500,
              color: 'var(--text-dim)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Designed &amp; Developed for Cinematic Motion · 2024
          </div>
        </div>
      </div>
    </footer>
  )
}
