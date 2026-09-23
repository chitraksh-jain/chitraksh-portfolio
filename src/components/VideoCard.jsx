import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'

const CARD_WIDTH = 300   // matches useScrollGallery
const CARD_HEIGHT = 534  // 9:16
const CARD_GAP = 36

function lerp(a, b, t) {
  return a + (b - a) * t
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v))
}

export default function VideoCard({
  project,
  index,
  activeIndex,
  trackX,
  containerWidth,
}) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [showCtrl, setShowCtrl] = useState(false)
  const ctrlTimer = useRef(null)

  // Distance from viewport centre in card units
  const cardCenterX = trackX + index * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2
  const viewCenter = containerWidth / 2
  const distFromCenter = cardCenterX - viewCenter
  const distAbs = Math.abs(distFromCenter) / (CARD_WIDTH + CARD_GAP)

  // Interpolated scale / opacity / brightness based on distance
  const t = clamp(1 - distAbs / 3, 0, 1) // t=1 at center, t=0 at 3+ away
  const scale = lerp(0.82, 1.38, t)
  const opacity = lerp(0.28, 1, t)
  const brightness = lerp(0.55, 1, t)
  const isActive = index === activeIndex
  const isCloseToCentre = distAbs < 1.5

  // Play/pause based on active state
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (isActive) {
      // Attempt to play active card
      v.play().catch(() => {})
    } else {
      v.pause()
      if (!isCloseToCentre) {
        v.currentTime = 0
      }
    }
  }, [isActive, isCloseToCentre])

  const togglePlay = useCallback((e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }, [])

  const toggleMute = useCallback((e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])

  const openFullscreen = useCallback((e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (v?.requestFullscreen) v.requestFullscreen().catch(() => {})
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    return () => { v.removeEventListener('play', onPlay); v.removeEventListener('pause', onPause) }
  }, [])

  const showControlsTemp = () => {
    setShowCtrl(true)
    clearTimeout(ctrlTimer.current)
    ctrlTimer.current = setTimeout(() => setShowCtrl(false), 2400)
  }

  // Glow for active card
  const glowShadow = isActive
    ? '0 30px 80px rgba(0,0,0,0.9), 0 0 40px rgba(192,57,43,0.15), 0 0 80px rgba(192,57,43,0.06)'
    : '0 16px 48px rgba(0,0,0,0.7)'

  return (
    <div
      onMouseEnter={() => { setHovered(true); showControlsTemp() }}
      onMouseLeave={() => { setHovered(false); setShowCtrl(false) }}
      onMouseMove={showControlsTemp}
      onClick={isActive ? togglePlay : undefined}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: `${CARD_WIDTH}px`,
        height: `${CARD_HEIGHT}px`,
        borderRadius: '14px',
        overflow: 'hidden',
        cursor: isActive ? 'pointer' : 'default',
        transform: `scale(${scale})`,
        opacity,
        filter: `brightness(${brightness})`,
        boxShadow: glowShadow,
        border: isActive
          ? '1px solid rgba(255,255,255,0.12)'
          : '1px solid rgba(255,255,255,0.04)',
        transition: 'transform 0.08s linear, opacity 0.08s linear, filter 0.08s linear, box-shadow 0.4s ease, border-color 0.4s ease',
        willChange: 'transform, opacity',
        background: '#0a0a0a',
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={project.videoUrl}
        poster={project.posterUrl || undefined}
        preload={isCloseToCentre ? 'metadata' : 'none'}
        muted
        loop
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        aria-label={`${project.title} — ${project.category}`}
      />

      {/* Gradient overlay always visible at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '55%',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
        pointerEvents: 'none',
      }} />

      {/* Index badge */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        fontFamily: 'var(--font)',
        fontWeight: 800,
        fontSize: '0.65rem',
        letterSpacing: '0.12em',
        color: 'rgba(255,255,255,0.4)',
      }}>
        {project.index}
      </div>

      {/* Category badge */}
      {isActive && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          fontFamily: 'var(--font)',
          fontWeight: 600,
          fontSize: '0.5rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          background: 'rgba(192,57,43,0.1)',
          border: '1px solid rgba(192,57,43,0.2)',
          borderRadius: '100px',
          padding: '0.25rem 0.6rem',
          animation: 'fadeIn 0.4s ease',
        }}>
          Active
        </div>
      )}

      {/* Bottom title (always slightly visible) */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '1rem',
        right: '1rem',
      }}>
        <p style={{
          fontFamily: 'var(--font)',
          fontWeight: 700,
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.85)',
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
          marginBottom: '0.25rem',
        }}>
          {project.title}
        </p>
        {isActive && (
          <p style={{
            fontFamily: 'var(--font)',
            fontWeight: 400,
            fontSize: '0.55rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            animation: 'fadeIn 0.5s ease',
          }}>
            {project.tools.join(' · ')}
          </p>
        )}
      </div>

      {/* Controls overlay */}
      {(hovered || showCtrl) && isActive && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            gap: '0.5rem',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <button
            onClick={togglePlay}
            aria-label={playing ? 'Pause' : 'Play'}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#e8e8e8',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {playing ? <Pause size={16} /> : <Play size={16} fill="#e8e8e8" style={{ marginLeft: '2px' }} />}
          </button>
          <button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#e8e8e8',
              cursor: 'pointer',
            }}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button
            onClick={openFullscreen}
            aria-label="Fullscreen"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#e8e8e8',
              cursor: 'pointer',
            }}
          >
            <Maximize size={15} />
          </button>
        </div>
      )}
    </div>
  )
}
