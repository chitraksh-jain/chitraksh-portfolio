import React, { useRef, useState, useEffect, useCallback } from 'react'
import { showreel } from '../data/projects'
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCcw
} from 'lucide-react'

export default function Showreel() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const controlsTimerRef = useRef(null)

  const [visible, setVisible] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState(0.7)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrent] = useState(0)

  // Intersection observer reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.25 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
        setCurrent(video.currentTime)
      }
    }
    const onLoadedMeta = () => setDuration(video.duration)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => { setPlaying(false); setProgress(0) }
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('loadedmetadata', onLoadedMeta)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('ended', onEnded)
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('loadedmetadata', onLoadedMeta)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('ended', onEnded)
    }
  }, [])

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }, [])

  const toggleMute = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])

  const handleVolume = useCallback((e) => {
    const v = videoRef.current
    if (!v) return
    const vol = parseFloat(e.target.value)
    v.volume = vol
    v.muted = vol === 0
    setVolume(vol)
    setMuted(vol === 0)
  }, [])

  const handleProgress = useCallback((e) => {
    const v = videoRef.current
    if (!v || !v.duration) return
    const rect = progressRef.current.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    v.currentTime = pct * v.duration
  }, [])

  const toggleFullscreen = useCallback(() => {
    const wrapper = sectionRef.current
    if (!document.fullscreenElement) {
      wrapper?.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }, [])

  useEffect(() => {
    const onChange = () => setFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true)
    clearTimeout(controlsTimerRef.current)
    controlsTimerRef.current = setTimeout(() => {
      if (playing) setShowControls(false)
    }, 2800)
  }, [playing])

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <section
      id="showreel"
      aria-label="Showreel"
      style={{
        padding: '6rem 1.5rem 8rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Section label */}
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        textAlign: 'center',
      }}>
        <span className="label" style={{ color: 'var(--text-dim)' }}>Showreel 2024</span>
      </div>

      {/* Video wrapper */}
      <div
        ref={sectionRef}
        onMouseMove={showControlsTemporarily}
        onMouseEnter={showControlsTemporarily}
        onMouseLeave={() => playing && setShowControls(false)}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1100px',
          aspectRatio: '16/9',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.93)',
          filter: visible ? 'blur(0)' : 'blur(8px)',
          transition: 'opacity 1s var(--transition-slow), transform 1s var(--transition-slow), filter 1s var(--transition-slow)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 60px rgba(192,57,43,0.06)',
          border: '1px solid rgba(255,255,255,0.05)',
          cursor: 'pointer',
        }}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={showreel.videoUrl}
          poster={showreel.posterUrl || undefined}
          preload="metadata"
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          aria-label="Chitraksh Jain showreel"
        />

        {/* Big play overlay when paused */}
        {!playing && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.3)',
            transition: 'opacity 0.3s',
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s',
            }}>
              <Play size={26} color="#e8e8e8" fill="#e8e8e8" style={{ marginLeft: '3px' }} />
            </div>
          </div>
        )}

        {/* Controls bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          opacity: showControls ? 1 : 0,
          transform: showControls ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
          padding: '2rem 1.25rem 1rem',
          pointerEvents: showControls ? 'all' : 'none',
        }}>
          {/* Progress bar */}
          <div
            ref={progressRef}
            onClick={(e) => { e.stopPropagation(); handleProgress(e) }}
            role="slider"
            aria-label="Video progress"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{
              width: '100%',
              height: '3px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '2px',
              cursor: 'pointer',
              marginBottom: '0.75rem',
              position: 'relative',
            }}
          >
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${progress}%`,
              background: 'var(--accent)',
              borderRadius: '2px',
              transition: 'width 0.1s linear',
            }} />
          </div>

          {/* Controls row */}
          <div
            onClick={e => e.stopPropagation()}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <button onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'} style={{ color: '#e8e8e8', lineHeight: 0 }}>
              {playing ? <Pause size={18} /> : <Play size={18} fill="#e8e8e8" />}
            </button>
            <button onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'} style={{ color: '#e8e8e8', lineHeight: 0 }}>
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={handleVolume}
              aria-label="Volume"
              style={{ width: '70px', accentColor: 'var(--accent)', cursor: 'pointer' }}
            />
            <span style={{ fontFamily: 'var(--font)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', marginLeft: '0.25rem', letterSpacing: '0.05em' }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <div style={{ flex: 1 }} />
            <button onClick={toggleFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'} style={{ color: '#e8e8e8', lineHeight: 0 }}>
              {fullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Subtle label below */}
      <p style={{
        fontFamily: 'var(--font)',
        fontSize: '0.6rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--text-dim)',
        opacity: visible ? 0.6 : 0,
        transition: 'opacity 1.2s ease 0.4s',
      }}>
        Click to play · Click again to pause
      </p>
    </section>
  )
}
