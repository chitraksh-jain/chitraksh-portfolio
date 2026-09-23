import React, { useRef, useState, useEffect, useCallback } from 'react'
import { longFormProjects } from '../data/projects'
import { Play, Pause, Volume2, VolumeX, Maximize, Clock, Eye } from 'lucide-react'

function LongFormCard({ project, isFeatured }) {
  const videoRef = useRef(null)
  const cardRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [progress, setProgress] = useState(0)

  // Pause when out of view and trigger entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (!entry.isIntersecting && videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause()
        }
      },
      { threshold: 0.15 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

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

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [])

  const togglePlay = useCallback((e) => {
    e?.stopPropagation()
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

  const handleFullscreen = useCallback((e) => {
    e?.stopPropagation()
    const video = videoRef.current
    if (video?.requestFullscreen) video.requestFullscreen().catch(() => {})
  }, [])

  return (
    <div
      ref={cardRef}
      onClick={togglePlay}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'var(--bg-card)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: hovered
          ? '0 30px 80px -15px rgba(0, 0, 0, 0.95), 0 0 35px rgba(192, 57, 43, 0.15)'
          : '0 20px 50px -10px rgba(0, 0, 0, 0.75)',
        transform: hovered
          ? 'scale(1.02) translateY(-4px)'
          : inView
          ? 'scale(1) translateY(0)'
          : 'scale(0.96) translateY(24px)',
        opacity: inView ? 1 : 0.4,
        filter: inView ? 'blur(0)' : 'blur(8px)',
        transition: 'all 0.6s var(--ease-cinematic)',
      }}
    >
      {/* Top Hairline Reflection */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.22) 50%, transparent 100%)',
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
        playsInline
        preload="metadata"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          position: 'relative',
          zIndex: 1,
        }}
        aria-label={project.title}
      />

      {/* Poster Fallback (Guarantees zero black boxes!) */}
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

      {/* Gradient Darkening Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(8, 9, 11, 0.95) 0%, rgba(8, 9, 11, 0.4) 50%, transparent 80%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Duration & Views Badges */}
      <div
        style={{
          position: 'absolute',
          top: '1.25rem',
          left: '1.25rem',
          right: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 3,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(8, 9, 11, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '0.3rem 0.7rem',
            borderRadius: 'var(--radius-pill)',
          }}
        >
          <Clock size={12} color="var(--accent-red-bright)" />
          <span
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: '0.62rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '0.05em',
            }}
          >
            {project.duration}
          </span>
        </div>

        {project.views && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(8, 9, 11, 0.75)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '0.3rem 0.7rem',
              borderRadius: 'var(--radius-pill)',
            }}
          >
            <Eye size={12} color="var(--text-secondary)" />
            <span
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '0.62rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
              }}
            >
              {project.views}
            </span>
          </div>
        )}
      </div>

      {/* Play/Pause Central Indicator on Hover or when Paused */}
      {(!playing || hovered) && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease',
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {playing ? (
              <Pause size={20} color="#FFFFFF" />
            ) : (
              <Play size={22} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '3px' }} />
            )}
          </div>
        </div>
      )}

      {/* Bottom Editorial Content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '1.75rem',
          zIndex: 3,
        }}
      >
        <span
          className="label-editorial"
          style={{
            color: 'var(--accent-red-bright)',
            display: 'block',
            marginBottom: '0.35rem',
          }}
        >
          {project.category}
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-editorial)',
            fontWeight: 800,
            fontSize: isFeatured ? 'clamp(1.25rem, 2vw, 1.8rem)' : '1.15rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '0.5rem',
          }}
        >
          {project.title}
        </h3>

        {isFeatured && (
          <p
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: '0.85rem',
              fontWeight: 400,
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              maxWidth: '620px',
              marginBottom: '0.85rem',
            }}
          >
            {project.description}
          </p>
        )}

        {/* Progress Bar (Visible when playing) */}
        <div
          style={{
            width: '100%',
            height: '2px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '1px',
            overflow: 'hidden',
            marginTop: '0.5rem',
            opacity: playing ? 1 : 0,
            transition: 'opacity 0.25s',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'var(--accent-red-bright)',
            }}
          />
        </div>
      </div>

      {/* Floating Glass Control Buttons on Hover */}
      {hovered && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            right: '1.5rem',
            display: 'flex',
            gap: '0.5rem',
            zIndex: 4,
          }}
        >
          <button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(8, 9, 11, 0.75)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
            }}
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <button
            onClick={handleFullscreen}
            aria-label="Fullscreen"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(8, 9, 11, 0.75)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
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

export default function LongForm() {
  const featured = longFormProjects[0]
  const supporting = longFormProjects.slice(1)

  return (
    <section
      id="longform"
      aria-label="Long-Form Video Work"
      style={{
        padding: '8rem 1.5rem 6rem',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Editorial Header */}
      <div style={{ marginBottom: '3.5rem' }}>
        <span className="label-editorial" style={{ color: 'var(--accent-red-bright)' }}>
          Long-Form Storytelling
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-editorial)',
            fontWeight: 800,
            fontSize: 'clamp(2.2rem, 4.5vw, 4.2rem)',
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginTop: '0.5rem',
            marginBottom: '0.6rem',
          }}
        >
          YouTube &amp; Narrative Work
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
            fontWeight: 400,
            color: 'var(--text-secondary)',
          }}
        >
          High-retention YouTube editing · Multicam Podcasts · Documentary storytelling
        </p>
      </div>

      {/* Flagship Featured Video */}
      <div style={{ marginBottom: '2rem' }}>
        {featured && <LongFormCard project={featured} isFeatured={true} />}
      </div>

      {/* Supporting Videos (Side by Side) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}
      >
        {supporting.map((proj) => (
          <LongFormCard key={proj.id} project={proj} isFeatured={false} />
        ))}
      </div>
    </section>
  )
}
