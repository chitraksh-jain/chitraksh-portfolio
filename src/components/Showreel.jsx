import React, { useRef, useState, useEffect, useCallback } from 'react'
import { showreel } from '../data/projects'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipForward,
} from 'lucide-react'

export default function Showreel() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const progressTrackRef = useRef(null)
  const controlsTimeoutRef = useRef(null)

  const [inView, setInView] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Intersection observer entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Video listeners
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }
    const handlePlay = () => setPlaying(true)
    const handlePause = () => setPlaying(false)
    const handleEnded = () => {
      setPlaying(false)
      setProgress(0)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [])

  const toggleMute = useCallback((e) => {
    e?.stopPropagation()
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }, [])

  const handleScrub = useCallback((e) => {
    e.stopPropagation()
    const video = videoRef.current
    const track = progressTrackRef.current
    if (!video || !track || !video.duration) return

    const rect = track.getBoundingClientRect()
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const pct = clickX / rect.width
    video.currentTime = pct * video.duration
  }, [])

  const toggleFullscreen = useCallback((e) => {
    e?.stopPropagation()
    const el = sectionRef.current
    if (!document.fullscreenElement) {
      el?.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.().catch(() => {})
    }
  }, [])

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  const handleMouseMove = useCallback(() => {
    setShowControls(true)
    clearTimeout(controlsTimeoutRef.current)
    controlsTimeoutRef.current = setTimeout(() => {
      if (playing) setShowControls(false)
    }, 2800)
  }, [playing])

  return (
    <section
      id="showreel"
      ref={sectionRef}
      aria-label="01 Showreel 2024"
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        padding: '5rem 4rem 7rem',
        maxWidth: '1360px',
        margin: '0 auto',
        zIndex: 2,
      }}
    >
      {/* Section Header Row — Reference A: 01 SHOWREEL 2024 + Badge */}
      <div className="section-header-row">
        <div className="section-title-wrap">
          <span className="section-index-num">01</span>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.6rem, 2.5vw, 2.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            SHOWREEL 2024
          </h2>
        </div>

        <div className="section-pill-badge">
          {showreel.badge}
        </div>
      </div>

      {/* Cinematic 16:9 Video Frame — Reference A */}
      <div
        onClick={togglePlay}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          cursor: 'pointer',
          background: 'var(--bg-card)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow:
            '0 30px 100px -20px rgba(0, 0, 0, 0.95), 0 0 50px rgba(217, 56, 41, 0.08)',
          transform: inView ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(40px)',
          opacity: inView ? 1 : 0.25,
          filter: inView ? 'blur(0)' : 'blur(12px)',
          transition: 'all 1s var(--ease-cinematic)',
          marginBottom: '3.5rem',
        }}
      >
        {/* Specular Top Reflection */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />

        {/* Video Element */}
        <video
          ref={videoRef}
          src={showreel.videoUrl}
          poster={showreel.posterUrl}
          playsInline
          muted={muted}
          preload="metadata"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          aria-label={showreel.title}
        />

        {/* Poster Backing Fallback */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${showreel.posterUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            display: playing ? 'none' : 'block',
            opacity: playing ? 0 : 0.95,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Cinematic Quote Overlay — Reference A */}
        <div
          style={{
            position: 'absolute',
            left: '3.5rem',
            bottom: '5.5rem',
            zIndex: 2,
            maxWidth: '300px',
            pointerEvents: 'none',
            opacity: playing ? 0.35 : 0.9,
            transition: 'opacity 0.4s ease',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
              fontWeight: 800,
              letterSpacing: '0.12em',
              lineHeight: 1.35,
              color: 'rgba(255, 255, 255, 0.85)',
              textShadow: '0 4px 16px rgba(0, 0, 0, 0.9)',
            }}
          >
            STORIES
            <br />
            THROUGH
            <br />
            A DIFFERENT
            <br />
            LENS.
          </p>
        </div>

        {/* Custom Glass Player Controls Bar — Reference A */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 4,
            padding: '2.5rem 2rem 1.25rem',
            background:
              'linear-gradient(to top, rgba(7, 8, 9, 0.95) 0%, rgba(7, 8, 9, 0.5) 60%, transparent 100%)',
            opacity: showControls || !playing ? 1 : 0,
            transform: showControls || !playing ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.35s var(--ease-cinematic)',
            pointerEvents: showControls || !playing ? 'all' : 'none',
          }}
        >
          {/* Controls Cluster */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Play/Pause Button */}
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
              {playing ? <Pause size={18} /> : <Play size={18} fill="#FFFFFF" />}
            </button>

            {/* Skip / Next */}
            <button
              onClick={() => {
                if (videoRef.current) videoRef.current.currentTime += 5
              }}
              aria-label="Skip forward 5s"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0.2rem',
              }}
            >
              <SkipForward size={16} />
            </button>

            {/* Red Progress Timeline Scrubber */}
            <div
              ref={progressTrackRef}
              onClick={handleScrub}
              role="slider"
              aria-label="Timeline progress"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{
                flex: 1,
                height: '3px',
                borderRadius: '2px',
                background: 'rgba(255, 255, 255, 0.16)',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: `${progress}%`,
                  background: 'var(--accent-red)',
                  borderRadius: '2px',
                }}
              />
            </div>

            {/* Mute / Unmute */}
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
              {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
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
              {isFullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
            </button>
          </div>
        </div>
      </div>

      {/* 4-Column Impact Metrics Bar — Reference A */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '2.5rem 0',
        }}
      >
        {showreel.metrics.map((item, idx) => (
          <div
            key={item.label}
            style={{
              padding: '0 2rem',
              borderRight:
                idx < showreel.metrics.length - 1
                  ? '1px solid rgba(255, 255, 255, 0.08)'
                  : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2rem, 3.2vw, 3rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: '#FFFFFF',
              }}
            >
              {item.value}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
