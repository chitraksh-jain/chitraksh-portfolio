import React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function ProjectInfo({
  project,
  activeIndex,
  totalProjects,
  onPrev,
  onNext,
}) {
  if (!project) return null

  return (
    <div
      aria-live="polite"
      aria-label={`Current project: ${project.title}`}
      style={{
        textAlign: 'center',
        maxWidth: '680px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Category Red Tag — Reference A */}
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.68rem',
          fontWeight: 800,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--accent-red)',
          display: 'block',
          marginBottom: '0.45rem',
        }}
      >
        {project.category}
      </span>

      {/* Project Title — Reference A */}
      <h3
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 800,
          fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)',
          letterSpacing: '-0.025em',
          color: '#FFFFFF',
          lineHeight: 1.15,
          marginBottom: '0.5rem',
        }}
      >
        {project.title}
      </h3>

      {/* Short Description — Reference A */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 400,
          fontSize: 'clamp(0.85rem, 1.1vw, 0.98rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.55,
          maxWidth: '520px',
          margin: '0 auto 1rem',
        }}
      >
        {project.description}
      </p>

      {/* Tool Pills — Reference A */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
        }}
      >
        {project.tools.map((tool) => (
          <span
            key={tool}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(255, 255, 255, 0.035)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
            }}
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Interactive Stepper Navigation Controls — Reference A: (←) 05 / 10 (→) */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '1.25rem',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
          padding: '0.35rem 0.85rem',
          borderRadius: 'var(--radius-pill)',
        }}
      >
        {/* Left Arrow Button */}
        <button
          onClick={onPrev}
          aria-label="Previous project"
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FFFFFF'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
          }}
        >
          <ArrowLeft size={13} />
        </button>

        {/* Counter: 05 / 10 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: 'var(--accent-red)',
            }}
          >
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              color: 'var(--text-dim)',
            }}
          >
            /
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
            }}
          >
            {String(totalProjects).padStart(2, '0')}
          </span>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={onNext}
          aria-label="Next project"
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FFFFFF'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
          }}
        >
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  )
}
