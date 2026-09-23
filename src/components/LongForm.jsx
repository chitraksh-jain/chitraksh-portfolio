import React, { useRef, useState, useEffect, useCallback } from 'react'
import { longFormProjects } from '../data/projects'
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'

function LongFormCard({ project, index }) {
  const videoRef = useRef(null)
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
        else {
          // Pause when scrolled out
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause()
          }
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTimeUpdate = () => {
      if (v.duration) setProgress((v.currentTime / v.duration) * 100)
    }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    v.addEventListener('timeupdate', onTimeUpdate)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    return () => {
      v.removeEventListener('timeupdate', onTimeUpdate)
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
    }
  }, [])

  const togglePlay = useCallback((e) => {
    e?.stopPropagation?.()
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }, [])

  const toggleMute = useCallback((e) => {
    e?.stopPropagation?.()
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])

  const handleFullscreen = useCallback((e) => {
    e?.stopPropagation?.()
    const v = videoRef.current
    if (v?.requestFullscreen) v.requestFullscreen().catch(() => {})
  }, [])

  const isFirst = index === 0
  const delay = index * 0.15

  return (
    <div
      ref={sectionRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.98)',
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s var(--transition-slow) ${delay}s`,
        position: 'relative',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        cursor: 'pointer',
        flex: isFirst ? '1 1 100%' : '1 1 calc(50% - 0.75rem)',
        minWidth: isFirst ? '100%' : '280px',
        aspectRatio: '16/9',
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={project.videoUrl}
        poster={project.posterUrl || undefined}
        preload="metadata"
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transform: hovered ? 'scale(1.03)' : 'scale(1)',
          transition: 'transform 0.5s var(--transition-slow)',
        }}
        aria-label={project.title}
      />

      {/* Hover/info overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.9) 100%)',
        opacity: hovered ? 1 : 0.6,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* Title info */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '1.5rem',
        transform: hovered ? 'translateY(0)' : 'translateY(4px)',
        transition: 'transform 0.4s ease',
      }}>
        <span style={{
          fontFamily: 'var(--font)',
          fontWeight: 600,
          fontSize: '0.55rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          opacity: 0.85,
        }}>
          {project.category}
        </span>
        <h3 style={{
          fontFamily: 'var(--font)',
          fontWeight: 700,
          fontSize: isFirst ? 'clamp(1.2rem, 2vw, 1.8rem)' : '1rem',
          color: 'var(--text)',
          letterSpacing: '-0.015em',
          lineHeight: 1.2,
          marginTop: '0.3rem',
          marginBottom: '0.5rem',
        }}>
          {project.title}
        </h3>
        {hovered && (
          <p style={{
            fontFamily: 'var(--font)',
            fontWeight: 300,
            fontSize: '0.8rem',
            color: 'rgba(232,232,232,0.6)',
            lineHeight: 1.6,
            animation: 'fadeIn 0.3s ease',
          }}>
            {project.description}
          </p>
        )}
        {/* Progress bar */}
        <div style={{
          width: '100%',
          height: '2px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '1px',
          marginTop: '0.75rem',
          opacity: playing ? 1 : 0,
          transition: 'opacity 0.3s',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'var(--accent)',
            borderRadius: '1px',
            transition: 'width 0.1s linear',
          }} />
        </div>
      </div>

      {/* Play button centre */}
      {(!playing || hovered) && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          opacity: hovered ? 1 : 0.7,
          transition: 'opacity 0.3s',
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {playing
              ? <Pause size={20} color="#e8e8e8" />
              : <Play size={20} color="#e8e8e8" fill="#e8e8e8" style={{ marginLeft: '3px' }} />
            }
          </div>
        </div>
      )}

      {/* Corner controls */}
      {hovered && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            display: 'flex',
            gap: '0.5rem',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#e8e8e8',
              cursor: 'pointer',
            }}
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <button
            onClick={handleFullscreen}
            aria-label="Fullscreen"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#e8e8e8',
              cursor: 'pointer',
            }}
          >
            <Maximize size={14} />
          </button>
        </div>
      )}

      {/* Duration badge */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        fontFamily: 'var(--font)',
        fontWeight: 500,
        fontSize: '0.55rem',
        letterSpacing: '0.1em',
        color: 'rgba(255,255,255,0.55)',
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(8px)',
        padding: '0.2rem 0.5rem',
        borderRadius: '4px',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        {project.duration}
      </div>
    </div>
  )
}

export default function LongForm() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="longform"
      ref={sectionRef}
      aria-label="Long-form work"
      style={{
        padding: '8rem 1.5rem 6rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{
        marginBottom: '3.5rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>
        <span className="label" style={{ color: 'var(--text-dim)' }}>Long-Form Work</span>
        <h2 style={{
          fontFamily: 'var(--font)',
          fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 4rem)',
          letterSpacing: '-0.03em',
          color: 'var(--text)',
          marginTop: '0.75rem',
          marginBottom: '0.5rem',
        }}>
          YouTube &amp; Beyond
        </h2>
        <p style={{
          fontFamily: 'var(--font)',
          fontWeight: 300,
          fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
          color: 'var(--text-muted)',
        }}>
          YouTube Edits · Podcasts · Storytelling
        </p>
      </div>

      {/* Video grid: first card full-width, rest side by side */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        {longFormProjects.map((project, i) => (
          <LongFormCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
