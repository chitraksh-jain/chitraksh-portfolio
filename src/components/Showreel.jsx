import React, { useRef, useState, useEffect, useCallback } from 'react'
import { showreel } from '../data/projects'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Film,
} from 'lucide-react'

export default function Showreel() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const progressTrackRef = useRef(null)
  const controlsTimeoutRef = useRef(null)

  const [inView, setInView] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState(0.8)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Intersection Observer for scroll entrance
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

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
        setCurrentTime(video.currentTime)
      }
    }
    const handleLoadedMetadata = () => {
      setDuration(video.duration || 0)
    }
    const handlePlay = () => setPlaying(true)
    const handlePause = () => setPlaying(false)
    const handleEnded = () => {
      setPlaying(false)
      setProgress(0)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
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

  const handleVolumeChange = useCallback((e) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    const val = parseFloat(e.target.value)
    video.volume = val
    video.muted = val === 0
    setVolume(val)
    setMuted(val === 0)
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

  const formatTime = (timeInSec) => {
    if (!timeInSec || isNaN(timeInSec)) return '0:00'
    const m = Math.floor(timeInSec / 60)
    const s = Math.floor(timeInSec % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <section
      id="showreel"
      ref={sectionRef}
      aria-label="Director Showreel"
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        padding: '5rem 1.5rem 8rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 2,
      }}
    >
      {/* Editorial Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '2.5rem',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.8s var(--ease-cinematic)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.6rem',
          }}
        >
          <Film size={12} color="var(--accent-red-bright)" />
          <span className="label-editorial" style={{ color: 'var(--text-muted)' }}>
            Cinematic Reel · {showreel.year}
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-editorial)',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.2vw, 3rem)',
            letterSpacing: '-0.025em',
            color: 'var(--text-primary)',
          }}
        >
          {showreel.title}
        </h2>
      </div>

      {/* Cinematic 16:9 Frame (75% to 85% width) */}
      <div
        onClick={togglePlay}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1080px',
          aspectRatio: '16/9',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          cursor: 'pointer',
          background: 'var(--bg-card)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: inView
            ? '0 30px 100px -20px rgba(0, 0, 0, 0.95), 0 0 50px rgba(192, 57, 43, 0.08)'
            : '0 20px 40px rgba(0, 0, 0, 0.6)',
          transform: inView ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(50px)',
          opacity: inView ? 1 : 0.2,
          filter: inView ? 'blur(0)' : 'blur(12px)',
          transition: 'all 1.1s var(--ease-cinematic)',
        }}
      >
        {/* Subtle Top Specular Reflection */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.25) 50%, transparent 100%)',
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

        {/* Poster Fallback Backing */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${showreel.posterUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            display: playing ? 'none' : 'block',
            opacity: playing ? 0 : 0.9,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Big Central Glass Play Button (When Paused) */}
        {!playing && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 100%)',
              zIndex: 2,
              transition: 'opacity 0.3s ease',
            }}
          >
            <div
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px) saturate(140%)',
                WebkitBackdropFilter: 'blur(20px) saturate(140%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s var(--ease-cinematic), background 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)'
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <Play size={26} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '4px' }} />
            </div>
          </div>
        )}

        {/* Custom Glass Controls Bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 4,
            padding: '2.5rem 1.5rem 1.25rem',
            background: 'linear-gradient(to top, rgba(8, 9, 11, 0.95) 0%, rgba(8, 9, 11, 0.6) 60%, transparent 100%)',
            opacity: showControls || !playing ? 1 : 0,
            transform: showControls || !playing ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.35s var(--ease-cinematic)',
            pointerEvents: showControls || !playing ? 'all' : 'none',
          }}
        >
          {/* Progress Timeline Scrubber */}
          <div
            ref={progressTrackRef}
            onClick={handleScrub}
            role="slider"
            aria-label="Seek time"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{
              width: '100%',
              height: '4px',
              borderRadius: '2px',
              background: 'rgba(255, 255, 255, 0.14)',
              cursor: 'pointer',
              marginBottom: '1rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'height 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.height = '6px')}
            onMouseLeave={(e) => (e.currentTarget.style.height = '4px')}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #A0A8B8 0%, var(--accent-red-bright) 100%)',
                borderRadius: '2px',
              }}
            />
          </div>

          {/* Controls Cluster */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={togglePlay}
                aria-label={playing ? 'Pause' : 'Play'}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.2rem',
                }}
              >
                {playing ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
              </button>

              <button
                onClick={toggleMute}
                aria-label={muted ? 'Unmute' : 'Mute'}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.2rem',
                }}
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Volume slider"
                style={{
                  width: '65px',
                  accentColor: 'var(--accent-red-bright)',
                  cursor: 'pointer',
                }}
              />

              <span
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'var(--text-secondary)',
                  marginLeft: '0.4rem',
                }}
              >
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div>
              <button
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.2rem',
                }}
              >
                {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <p
        style={{
          fontFamily: 'var(--font-editorial)',
          fontSize: '0.62rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
          marginTop: '1.25rem',
          opacity: inView ? 0.7 : 0,
          transition: 'opacity 0.8s ease 0.3s',
        }}
      >
        Single click to play / pause · Full sound available
      </p>
    </section>
  )
}
