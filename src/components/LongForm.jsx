import React, { useRef, useState, useEffect, useCallback } from 'react'
import { longFormProjects } from '../data/projects'
import { Play, Volume2, VolumeX, Maximize } from 'lucide-react'

function LongFormCard({ project, isFeatured }) {
  const videoRef = useRef(null)
  const cardRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [progress, setProgress] = useState(0)

  // Pause when scrolled out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
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
        border: '1px solid rgba(255, 255, 255, 0.09)',
        boxShadow: hovered
          ? '0 30px 80px -15px rgba(0, 0, 0, 0.95), 0 0 35px rgba(217, 56, 41, 0.15)'
          : '0 20px 50px -10px rgba(0, 0, 0, 0.8)',
        transform: hovered ? 'scale(1.02) translateY(-4px)' : 'scale(1) translateY(0)',
        transition: 'all 0.45s var(--ease-cinematic)',
      }}
    >
      {/* Top Hairline Specular Edge */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.25) 50%, transparent 100%)',
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

      {/* Darkening Bottom Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(7, 8, 9, 0.95) 0%, rgba(7, 8, 9, 0.35) 50%, transparent 80%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Duration & Views Badges — Reference A */}
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
        {/* Duration badge */}
        <div
          style={{
            background: 'rgba(7, 8, 9, 0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-pill)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.62rem',
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '0.06em',
          }}
        >
          {project.duration}
        </div>

        {/* View count badge */}
        {project.views && (
          <div
            style={{
              background: 'rgba(7, 8, 9, 0.8)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.62rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
            }}
          >
            {project.views}
          </div>
        )}
      </div>

      {/* Central Play Button Overlay — Reference A */}
      {!playing && (
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
              width: isFeatured ? '68px' : '54px',
              height: isFeatured ? '68px' : '54px',
              borderRadius: '50%',
              background: 'rgba(217, 56, 41, 0.85)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 16px 36px rgba(217, 56, 41, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease',
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <Play
              size={isFeatured ? 24 : 18}
              color="#FFFFFF"
              fill="#FFFFFF"
              style={{ marginLeft: '3px' }}
            />
          </div>
        </div>
      )}

      {/* Bottom Editorial Content — Reference A */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: isFeatured ? '2rem' : '1.5rem',
          zIndex: 3,
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 800,
            fontSize: isFeatured ? 'clamp(1.3rem, 2.2vw, 1.85rem)' : '1.15rem',
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '0.35rem',
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: isFeatured ? '0.88rem' : '0.78rem',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            maxWidth: '620px',
          }}
        >
          {project.description}
        </p>

        {/* Progress Bar (Visible when playing) */}
        <div
          style={{
            width: '100%',
            height: '2px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '1px',
            overflow: 'hidden',
            marginTop: '0.65rem',
            opacity: playing ? 1 : 0,
            transition: 'opacity 0.25s',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'var(--accent-red)',
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
            bottom: '1.25rem',
            right: '1.25rem',
            display: 'flex',
            gap: '0.5rem',
            zIndex: 4,
          }}
        >
          <button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(7, 8, 9, 0.8)',
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
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(7, 8, 9, 0.8)',
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
      aria-label="03 Long-Form Content"
      style={{
        padding: '8rem 4rem 6rem',
        maxWidth: '1360px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Section Header Row — Reference A: 03 LONG-FORM CONTENT */}
      <div className="section-header-row" style={{ marginBottom: '0.5rem' }}>
        <div className="section-title-wrap">
          <span className="section-index-num">03</span>
          <span className="section-tag-label">LONG-FORM CONTENT</span>
        </div>
      </div>

      <div style={{ marginLeft: '4.5rem', marginBottom: '3.5rem' }}>
        <h2
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 3.8vw, 3.8rem)',
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            marginBottom: '0.35rem',
          }}
        >
          YouTube &amp; Beyond
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
            fontWeight: 400,
            color: 'var(--text-secondary)',
          }}
        >
          In-depth edits, podcasts, documentaries and storytelling.
        </p>
      </div>

      {/* Flagship Featured Video (Reference A) */}
      <div style={{ marginBottom: '2.5rem' }}>
        {featured && <LongFormCard project={featured} isFeatured={true} />}
      </div>

      {/* Supporting Videos Row (2 Columns — Reference A) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
        }}
      >
        {supporting.map((proj) => (
          <LongFormCard key={proj.id} project={proj} isFeatured={false} />
        ))}
      </div>
    </section>
  )
}
