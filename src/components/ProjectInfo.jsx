import React, { useState, useEffect, useRef } from 'react'

export default function ProjectInfo({ project }) {
  const [displayedProject, setDisplayedProject] = useState(project)
  const [transitionState, setTransitionState] = useState('idle') // 'exiting' | 'entering' | 'idle'
  const prevIdRef = useRef(project?.id)

  useEffect(() => {
    if (!project || project.id === prevIdRef.current) return

    // Trigger smooth editorial transition
    setTransitionState('exiting')
    const timerOut = setTimeout(() => {
      setDisplayedProject(project)
      prevIdRef.current = project.id
      setTransitionState('entering')

      const timerIn = setTimeout(() => {
        setTransitionState('idle')
      }, 350)
      return () => clearTimeout(timerIn)
    }, 200)

    return () => clearTimeout(timerOut)
  }, [project])

  if (!displayedProject) return null

  // Transition styles
  const isExiting = transitionState === 'exiting'
  const isEntering = transitionState === 'entering'

  const transitionStyle = {
    opacity: isExiting ? 0 : 1,
    transform: isExiting
      ? 'translateY(-10px) scale(0.98)'
      : isEntering
      ? 'translateY(12px) scale(0.98)'
      : 'translateY(0) scale(1)',
    filter: isExiting || isEntering ? 'blur(6px)' : 'blur(0px)',
    transition: 'opacity 0.28s var(--ease-cinematic), transform 0.28s var(--ease-cinematic), filter 0.28s var(--ease-cinematic)',
    willChange: 'opacity, transform, filter',
  }

  return (
    <div
      aria-live="polite"
      aria-label={`Current featured project: ${displayedProject.title}`}
      style={{
        ...transitionStyle,
        textAlign: 'center',
        maxWidth: '680px',
        margin: '0 auto',
        padding: '0 1.5rem',
        pointerEvents: 'none',
      }}
    >
      {/* Editorial Index & Category Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.85rem',
          marginBottom: '0.65rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-editorial)',
            fontWeight: 800,
            fontSize: '0.75rem',
            color: 'var(--accent-red-bright)',
            letterSpacing: '0.08em',
          }}
        >
          {displayedProject.index}
        </span>
        <span
          style={{
            width: '24px',
            height: '1px',
            background: 'rgba(255, 255, 255, 0.15)',
          }}
        />
        <span
          className="label-editorial"
          style={{
            color: 'var(--text-secondary)',
            letterSpacing: '0.22em',
          }}
        >
          {displayedProject.category}
        </span>
      </div>

      {/* Main Title */}
      <h3
        style={{
          fontFamily: 'var(--font-editorial)',
          fontWeight: 800,
          fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
          letterSpacing: '-0.025em',
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          marginBottom: '0.35rem',
        }}
      >
        {displayedProject.title}
      </h3>

      {/* Category Subtitle */}
      <p
        style={{
          fontFamily: 'var(--font-editorial)',
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--accent-red-bright)',
          opacity: 0.9,
          marginBottom: '0.85rem',
        }}
      >
        {displayedProject.categoryLabel}
      </p>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-editorial)',
          fontWeight: 400,
          fontSize: 'clamp(0.85rem, 1.1vw, 0.98rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: '520px',
          margin: '0 auto 1rem',
        }}
      >
        {displayedProject.description}
      </p>

      {/* Tools & Duration Pills */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}
      >
        {displayedProject.tools.map((tool) => (
          <span
            key={tool}
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {tool}
          </span>
        ))}

        {displayedProject.duration && (
          <span
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {displayedProject.duration}
          </span>
        )}
      </div>
    </div>
  )
}
