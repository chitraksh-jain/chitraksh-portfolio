import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'

// Continuous 3D Cover-Flow math helper (Reference A)
function calculate3DTransform(distUnits, isLeft) {
  const u = Math.abs(distUnits)

  if (u <= 0.05) {
    // Exact Center (Reference A Center Hero Card)
    return {
      scale: 1.42,
      opacity: 1.0,
      blur: 0,
      brightness: 1.08,
      translateY: -24,
      rotateY: 0,
      translateZ: 50,
      zIndex: 10,
    }
  } else if (u <= 1) {
    const t = u
    return {
      scale: 1.42 - t * 0.22, // 1.42 -> 1.20
      opacity: 1.0 - t * 0.18, // 1.0 -> 0.82
      blur: t * 0.8,
      brightness: 1.08 - t * 0.18,
      translateY: -24 + t * 18, // -24 -> -6px
      rotateY: isLeft ? 8 * t : -8 * t,
      translateZ: 50 - t * 35,
      zIndex: 8,
    }
  } else if (u <= 2) {
    const t = u - 1
    return {
      scale: 1.20 - t * 0.14, // 1.20 -> 1.06
      opacity: 0.82 - t * 0.25, // 0.82 -> 0.57
      blur: 0.8 + t * 2.0,
      brightness: 0.90 - t * 0.18,
      translateY: -6 + t * 6,
      rotateY: isLeft ? 8 : -8,
      translateZ: 15 - t * 25,
      zIndex: 6,
    }
  } else {
    const t = Math.min(1, u - 2)
    return {
      scale: Math.max(0.90, 1.06 - t * 0.12),
      opacity: Math.max(0.2, 0.57 - t * 0.28),
      blur: 2.8 + t * 3.5,
      brightness: Math.max(0.48, 0.72 - t * 0.2),
      translateY: 0,
      rotateY: isLeft ? 10 : -10,
      translateZ: -10 - t * 30,
      zIndex: 4 - Math.round(t * 2),
    }
  }
}

export default function VideoCard({
  project,
  index,
  activeIndex,
  currentTranslateX,
  viewportWidth,
  CARD_WIDTH,
  CARD_GAP,
  onSelect,
}) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const controlsTimerRef = useRef(null)

  // Distance calculation from viewport center
  const cardCenterX =
    currentTranslateX + index * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2
  const viewportCenter = viewportWidth / 2
  const distancePx = cardCenterX - viewportCenter
  const distUnits = distancePx / (CARD_WIDTH + CARD_GAP)
  const isLeft = distancePx < 0

  // 3D coverflow values
  const {
    scale,
    opacity,
    blur,
    brightness,
    translateY,
    rotateY,
    translateZ,
    zIndex,
  } = calculate3DTransform(distUnits, isLeft)

  const isActive = index === activeIndex
  const isClose = Math.abs(distUnits) < 1.4

  // Active video autoplay
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isActive) {
      video.play().catch(() => {})
    } else {
      video.pause()
      if (!isClose) video.currentTime = 0
    }
  }, [isActive, isClose])

  const togglePlay = useCallback((e) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [])

  const toggleMute = useCallback((e) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }, [])

  const handleFullscreen = useCallback((e) => {
    e.stopPropagation()
    const video = videoRef.current
    if (video?.requestFullscreen) video.requestFullscreen().catch(() => {})
  }, [])

  const handleMouseMove = () => {
    setShowControls(true)
    clearTimeout(controlsTimerRef.current)
    controlsTimerRef.current = setTimeout(() => setShowControls(false), 2400)
  }

  // Active glow (white ambient halo + soft red accent matching Reference A)
  const activeGlow = isActive
    ? '0 32px 100px -15px rgba(0, 0, 0, 0.98), 0 0 50px rgba(255, 255, 255, 0.12), 0 0 80px rgba(217, 56, 41, 0.16)'
    : '0 16px 40px rgba(0, 0, 0, 0.8)'

  const cardBorder = isActive
    ? '1px solid rgba(255, 255, 255, 0.28)'
    : '1px solid rgba(255, 255, 255, 0.06)'

  const finalScale = hovered && isActive ? scale * 1.02 : scale

  return (
    <div
      onClick={isActive ? togglePlay : () => onSelect?.(index)}
      onMouseEnter={() => {
        setHovered(true)
        handleMouseMove()
      }}
      onMouseLeave={() => {
        setHovered(false)
        setShowControls(false)
      }}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: `${CARD_WIDTH}px`,
        height: `${Math.round(CARD_WIDTH * (16 / 9))}px`,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: `translate3d(0, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${finalScale})`,
        transformStyle: 'preserve-3d',
        opacity,
        filter: `blur(${blur}px) brightness(${brightness})`,
        boxShadow: activeGlow,
        border: cardBorder,
        zIndex,
        background: 'var(--bg-card)',
        willChange: 'transform, opacity, filter',
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Top Specular Hairline Highlight */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: isActive
            ? 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      {/* Video Element */}
      <video
        ref={videoRef}
        src={project.videoUrl}
        poster={project.posterUrl}
        muted={muted}
        loop
        playsInline
        preload={isClose ? 'metadata' : 'none'}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          position: 'relative',
          zIndex: 1,
        }}
        aria-label={`${project.title} — ${project.category}`}
      />

      {/* High-Resolution Poster Backing (Guarantees zero black boxes!) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${project.posterUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          display: playing ? 'none' : 'block',
          opacity: playing ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Darkening Bottom Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(7, 8, 9, 0.9) 0%, rgba(7, 8, 9, 0.2) 40%, transparent 70%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Index Badge Top-Left — Reference A */}
      <div
        style={{
          position: 'absolute',
          top: '1.1rem',
          left: '1.2rem',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 800,
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)',
          }}
        >
          {project.index}
        </span>
      </div>

      {/* Center Play Button on Active Card (Reference A) */}
      {isActive && !playing && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 4,
            background: 'rgba(0, 0, 0, 0.15)',
          }}
        >
          <div
            style={{
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.75)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Play size={22} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '3px' }} />
          </div>
        </div>
      )}

      {/* Glass Hover Controls Bar */}
      {isActive && (hovered || showControls) && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            bottom: '1.25rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(7, 8, 9, 0.82)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            padding: '0.4rem 0.8rem',
            borderRadius: 'var(--radius-pill)',
            zIndex: 5,
          }}
        >
          <button
            onClick={togglePlay}
            aria-label={playing ? 'Pause' : 'Play'}
            style={{
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.2rem',
            }}
          >
            {playing ? <Pause size={15} /> : <Play size={15} fill="#FFFFFF" />}
          </button>

          <button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            style={{
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.2rem',
            }}
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <button
            onClick={handleFullscreen}
            aria-label="Fullscreen"
            style={{
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.2rem',
            }}
          >
            <Maximize size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
