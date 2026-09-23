import React, { useState, useEffect, useRef } from 'react'

export default function ProjectInfo({ project, prevProject }) {
  const [displayed, setDisplayed] = useState(project)
  const [animOut, setAnimOut] = useState(false)
  const [animIn, setAnimIn] = useState(false)
  const prevId = useRef(project?.id)

  useEffect(() => {
    if (!project || project.id === prevId.current) return
    // Transition: out → in
    setAnimOut(true)
    const t1 = setTimeout(() => {
      setDisplayed(project)
      setAnimOut(false)
      setAnimIn(true)
      prevId.current = project.id
      const t2 = setTimeout(() => setAnimIn(false), 600)
      return () => clearTimeout(t2)
    }, 280)
    return () => clearTimeout(t1)
  }, [project])

  if (!displayed) return null

  const outStyle = {
    opacity: 0,
    transform: 'translateY(12px)',
    filter: 'blur(4px)',
    transition: 'opacity 0.28s ease, transform 0.28s ease, filter 0.28s ease',
  }
  const inStyle = {
    opacity: 1,
    transform: 'translateY(0)',
    filter: 'blur(0)',
    transition: 'opacity 0.6s ease, transform 0.6s ease, filter 0.6s ease',
  }
  const idleStyle = {
    opacity: 1,
    transform: 'translateY(0)',
    filter: 'blur(0)',
  }

  const currentStyle = animOut ? outStyle : animIn ? inStyle : idleStyle

  return (
    <div
      aria-live="polite"
      aria-label={`Active project: ${displayed.title}`}
      style={{
        ...currentStyle,
        padding: '2.5rem 1.5rem 0',
        maxWidth: '700px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      {/* Index + Category */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <span style={{
          fontFamily: 'var(--font)',
          fontWeight: 800,
          fontSize: '0.65rem',
          color: 'var(--accent)',
          letterSpacing: '0.05em',
        }}>
          {displayed.index}
        </span>
        <span style={{ width: '24px', height: '1px', background: 'var(--text-dim)' }} />
        <span style={{
          fontFamily: 'var(--font)',
          fontWeight: 600,
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}>
          {displayed.category}
        </span>
      </div>

      {/* Title */}
      <h2 style={{
        fontFamily: 'var(--font)',
        fontWeight: 700,
        fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
        color: 'var(--text)',
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
        marginBottom: '0.75rem',
      }}>
        {displayed.title}
      </h2>

      {/* Category label */}
      <p style={{
        fontFamily: 'var(--font)',
        fontWeight: 400,
        fontSize: '0.7rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        marginBottom: '1rem',
        opacity: 0.7,
      }}>
        {displayed.categoryLabel}
      </p>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font)',
        fontWeight: 300,
        fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
        color: 'var(--text-muted)',
        lineHeight: 1.75,
        maxWidth: '440px',
        margin: '0 auto 1.25rem',
      }}>
        {displayed.description}
      </p>

      {/* Tools */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {displayed.tools.map(tool => (
          <span key={tool} style={{
            fontFamily: 'var(--font)',
            fontWeight: 500,
            fontSize: '0.55rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-dim)',
            padding: '0.25rem 0.65rem',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '100px',
          }}>
            {tool}
          </span>
        ))}
        {displayed.duration && (
          <span style={{
            fontFamily: 'var(--font)',
            fontWeight: 500,
            fontSize: '0.55rem',
            letterSpacing: '0.12em',
            color: 'var(--text-dim)',
            padding: '0.25rem 0.65rem',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '100px',
          }}>
            {displayed.duration}
          </span>
        )}
      </div>
    </div>
  )
}
