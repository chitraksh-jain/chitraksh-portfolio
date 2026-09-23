import React from 'react'
import { Mail, MessageCircle, ArrowUpRight, Globe } from 'lucide-react'

const GMAIL_URL =
  'https://mail.google.com/mail/?view=cm&fs=1&to=chitraksh9257@gmail.com'
const WHATSAPP_URL = 'https://wa.me/919257757440'

export default function Contact() {
  return (
    <footer
      id="contact"
      aria-label="04 Get In Touch"
      style={{
        position: 'relative',
        padding: '8rem 4rem 4rem',
        maxWidth: '1360px',
        margin: '0 auto',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      {/* Section Header Row — Reference A: 04 GET IN TOUCH */}
      <div className="section-header-row" style={{ marginBottom: '1rem' }}>
        <div className="section-title-wrap">
          <span className="section-index-num">04</span>
          <span className="section-tag-label">GET IN TOUCH</span>
        </div>
      </div>

      <div
        style={{
          marginLeft: '4.5rem',
          position: 'relative',
          marginBottom: '5rem',
        }}
      >
        {/* Handwritten Accent Quote — Reference A */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '2rem',
            top: '0rem',
            transform: 'rotate(-4deg)',
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.1,
            pointerEvents: 'none',
            textAlign: 'right',
          }}
        >
          <span>Good</span>
          <br />
          <span>Stories</span>
          <br />
          <span style={{ color: 'var(--accent-red)' }}>Better</span>
          <br />
          <span>People</span>
          {/* Handwritten Red Underline Sweep */}
          <div
            style={{
              width: '90px',
              height: '3px',
              background: 'var(--accent-red)',
              borderRadius: '2px',
              marginTop: '0.4rem',
              marginLeft: 'auto',
            }}
          />
        </div>

        {/* Main Headline — Reference A */}
        <h2
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            color: '#FFFFFF',
            marginBottom: '1.75rem',
            maxWidth: '750px',
          }}
        >
          Let's Create
          <br />
          Something Great
          <span style={{ color: 'var(--accent-red)', marginLeft: '0.15em' }}>
            .
          </span>
        </h2>

        {/* Subtitle Copy — Reference A */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1rem, 1.35vw, 1.2rem)',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            maxWidth: '620px',
            marginBottom: '3rem',
          }}
        >
          Open to freelance projects, social media editing, brand content,
          motion graphics and long-term collaborations.
        </p>

        {/* Action Buttons Row — Reference A [Email Me ↗] [WhatsApp ↗] */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
            marginBottom: '3.5rem',
          }}
        >
          <a
            href={GMAIL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn"
            style={{
              padding: '1.05rem 2.4rem',
              fontSize: '0.82rem',
            }}
          >
            <Mail size={16} />
            <span>Email Me</span>
            <ArrowUpRight size={14} style={{ opacity: 0.6 }} />
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn"
            style={{
              padding: '1.05rem 2.4rem',
              fontSize: '0.82rem',
            }}
          >
            <MessageCircle size={16} />
            <span>WhatsApp</span>
            <ArrowUpRight size={14} style={{ opacity: 0.6 }} />
          </a>
        </div>

        {/* Direct Contact Row — Reference A */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <a
            href="mailto:chitraksh9257@gmail.com"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: 500,
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.25s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
          >
            chitraksh9257@gmail.com
          </a>

          <span style={{ color: 'rgba(255, 255, 255, 0.15)' }}>|</span>

          <a
            href="tel:+919257757440"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: 500,
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.25s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
          >
            +91 9257757440
          </a>
        </div>

        {/* Minimal Footer — Reference A */}
        <div
          style={{
            paddingTop: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          {/* Brand Mark Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                fontWeight: 800,
                color: '#FFFFFF',
              }}
            >
              CJ
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: '#FFFFFF',
                  display: 'block',
                }}
              >
                CHITRAKSH JAIN
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.52rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--text-dim)',
                }}
              >
                VIDEO EDITOR &amp; MOTION DESIGNER
              </span>
            </div>
          </div>

          {/* Worldwide Availability Right — Reference A */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ textAlign: 'right' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.55rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  display: 'block',
                }}
              >
                AVAILABLE FOR SELECT
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.55rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  display: 'block',
                }}
              >
                PROJECTS WORLDWIDE
              </span>
            </div>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
              }}
            >
              <Globe size={18} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
