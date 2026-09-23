import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'

// Continuous interpolation math helper
function interpolateCurve(u) {
  // u = distance in card units from center (0 = center, 1 = 1 card away, etc.)
  if (u <= 0) {
    return {
      scale: 1.40,
      opacity: 1.0,
      blur: 0,
      brightness: 1.06,
      translateY: -14,
      zIndex: 10,
    }
  } else if (u <= 1) {
    // 0 -> 1
    const t = u
    return {
      scale: 1.40 - t * 0.16, // 1.40 -> 1.24
      opacity: 1.0 - t * 0.15, // 1.0 -> 0.85
      blur: t * 0.6, // 0 -> 0.6px
      brightness: 1.06 - t * 0.14, // 1.06 -> 0.92
      translateY: -14 + t * 10, // -14 -> -4px
      zIndex: 8,
    }
  } else if (u <= 2) {
    // 1 -> 2
    const t = u - 1
    return {
      scale: 1.24 - t * 0.14, // 1.24 -> 1.10
      opacity: 0.85 - t * 0.20, // 0.85 -> 0.65
      blur: 0.6 + t * 2.0, // 0.6 -> 2.6px
      brightness: 0.92 - t * 0.14, // 0.92 -> 0.78
      translateY: -4 + t * 4, // -4 -> 0px
      zIndex: 6,
    }
  } else if (u <= 3) {
    // 2 -> 3
    const t = u - 2
    return {
      scale: 1.10 - t * 0.12, // 1.10 -> 0.98
      opacity: 0.65 - t * 0.25, // 0.65 -> 0.40
      blur: 2.6 + t * 3.0, // 2.6 -> 5.6px
      brightness: 0.78 - t * 0.18, // 0.78 -> 0.60
      translateY: 0,
      zIndex: 4,
    }
  } else {
    // 3 -> 4+
    const t = Math.min(1, u - 3)
    return {
      scale: 0.98 - t * 0.10, // 0.98 -> 0.88
      opacity: Math.max(0.12, 0.40 - t * 0.22), // 0.40 -> 0.18
      blur: 5.6 + t * 4.0, // 5.6 -> 9.6px
      brightness: Math.max(0.45, 0.60 - t * 0.15),
      translateY: 0,
      zIndex: 2,
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
}) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const controlsTimerRef = useRef(null)

  // Distance from viewport center
  const cardCenterX =
    currentTranslateX + index * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2
  const viewportCenter = viewportWidth / 2
  const distancePx = Math.abs(cardCenterX - viewportCenter)
  const u = distancePx / (CARD_WIDTH + CARD_GAP)

  // Calculate dynamic continuous values
  const { scale, opacity, blur, brightness, translateY, zIndex } =
    interpolateCurve(u)

  const isActive = index === activeIndex
  const isClose = u < 1.6

  // Autoplay handling for active card
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isActive) {
      video.play().catch(() => {})
    } else {
      video.pause()
      if (!isClose) {
        video.currentTime = 0
      }
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

  // Active glow effect
  const cardShadow = isActive
    ? '0 30px 90px rgba(0, 0, 0, 0.95), 0 0 45px rgba(192, 57, 43, 0.22), 0 0 90px rgba(192, 57, 43, 0.08)'
    : '0 16px 50px rgba(0, 0, 0, 0.8)'

  const cardBorder = isActive
    ? '1px solid rgba(255, 255, 255, 0.22)'
    : '1px solid rgba(255, 255, 255, 0.05)'

  // Combined scale (micro-scale 1.02 on hover if active)
  const finalScale = hovered && isActive ? scale * 1.02 : scale

  return (
    <div
      onClick={isActive ? togglePlay : undefined}
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
        cursor: isActive ? 'pointer' : 'default',
        transform: `translateY(${translateY}px) scale(${finalScale})`,
        opacity,
        filter: `blur(${blur}px) brightness(${brightness})`,
        boxShadow: cardShadow,
        border: cardBorder,
        zIndex,
        background: 'var(--bg-card)',
        willChange: 'transform, opacity, filter',
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Top specular hairline edge */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: isActive
            ? 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 40%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.12) 40%, transparent 100%)',
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

      {/* High-res Poster Backing (Guarantees zero black boxes!) */}
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

      {/* Bottom Vignette Overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60%',
          background:
            'linear-gradient(to top, rgba(8, 9, 11, 0.95) 0%, rgba(8, 9, 11, 0.5) 60%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Top Badges */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          right: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-editorial)',
            fontWeight: 800,
            fontSize: '0.65rem',
            letterSpacing: '0.14em',
            color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          {project.index}
        </span>

        {isActive && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'rgba(192, 57, 43, 0.18)',
              border: '1px solid rgba(192, 57, 43, 0.35)',
              backdropFilter: 'blur(12px)',
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-pill)',
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'var(--accent-red-bright)',
                boxShadow: '0 0 6px var(--accent-red-bright)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '0.52rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
              }}
            >
              Active
            </span>
          </div>
        )}
      </div>

      {/* Bottom Project Title in Card */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1.1rem',
          right: '1.1rem',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: '0.55rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--accent-red-bright)',
            display: 'block',
            marginBottom: '0.2rem',
          }}
        >
          {project.category}
        </span>
        <h4
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: '0.88rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h4>
      </div>

      {/* Glass Play Overlay when Paused (Active Card) */}
      {isActive && !playing && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 4,
            background: 'rgba(0, 0, 0, 0.25)',
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Play size={20} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '3px' }} />
          </div>
        </div>
      )}

      {/* Floating Hover Glass Controls */}
      {isActive && (hovered || showControls) && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            gap: '0.5rem',
            zIndex: 5,
            animation: 'lensFocus 0.25s ease',
          }}
        >
          <button
            onClick={togglePlay}
            aria-label={playing ? 'Pause' : 'Play'}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(8, 9, 11, 0.75)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 10px 24px rgba(0,0,0,0.6)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {playing ? <Pause size={16} /> : <Play size={16} fill="#FFFFFF" style={{ marginLeft: '2px' }} />}
          </button>

          <button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(8, 9, 11, 0.75)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 10px 24px rgba(0,0,0,0.6)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          <button
            onClick={handleFullscreen}
            aria-label="Fullscreen"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(8, 9, 11, 0.75)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 10px 24px rgba(0,0,0,0.6)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Maximize size={15} />
          </button>
        </div>
      )}
    </div>
  )
}
