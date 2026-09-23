import React from 'react'
import { reelProjects } from '../data/projects'
import { useScrollGallery } from '../hooks/useScrollGallery'
import VideoCard from './VideoCard'
import ProjectInfo from './ProjectInfo'
import { Film } from 'lucide-react'

// Vertical scroll distance per project card
const SCROLL_PER_CARD = 320

export default function HorizontalGallery() {
  const {
    wrapperRef,
    stickyRef,
    trackRef,
    activeIndex,
    stageAlignment,
    stageExit,
    currentTranslateX,
    viewportWidth,
    CARD_WIDTH,
    CARD_GAP,
  } = useScrollGallery(reelProjects.length)

  // Total wrapper height creates the vertical scrolling travel distance
  const wrapperHeight = `calc(100vh + ${reelProjects.length * SCROLL_PER_CARD}px)`

  // Stage entrance and exit interpolation
  const stageOpacity = Math.max(0, stageAlignment - stageExit * 0.4)
  const stageScale = 0.94 + stageAlignment * 0.06 - stageExit * 0.04
  const stageBlur = Math.max(0, (1 - stageAlignment) * 8 + stageExit * 6)

  return (
    <section
      id="gallery-stage"
      aria-label="Horizontal Video Experience"
      style={{
        position: 'relative',
        zIndex: 3,
      }}
    >
      {/* Outer scroll wrapper */}
      <div
        ref={wrapperRef}
        style={{
          height: wrapperHeight,
          position: 'relative',
        }}
      >
        {/* Fullscreen 100vh Sticky Stage Container */}
        <div
          ref={stickyRef}
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '4.5rem 0 2rem',
            opacity: stageOpacity,
            transform: `scale(${stageScale})`,
            filter: `blur(${stageBlur}px)`,
            willChange: 'transform, opacity, filter',
            transition: 'opacity 0.08s linear, transform 0.08s linear',
          }}
        >
          {/* Subtle Ambient Backlight Glow Focused on Center */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '42%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '70vw',
              height: '65vh',
              background:
                'radial-gradient(ellipse at center, rgba(192, 57, 43, 0.12) 0%, rgba(200, 215, 235, 0.04) 40%, transparent 75%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Top Stage Header */}
          <div
            style={{
              textAlign: 'center',
              zIndex: 1,
              position: 'relative',
              padding: '0 1.5rem',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                marginBottom: '0.35rem',
              }}
            >
              <Film size={12} color="var(--accent-red-bright)" />
              <span className="label-editorial" style={{ color: 'var(--text-muted)' }}>
                Interactive Reel Experience
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-editorial)',
                fontWeight: 800,
                fontSize: 'clamp(1.5rem, 2.4vw, 2.4rem)',
                letterSpacing: '-0.025em',
                color: 'var(--text-primary)',
              }}
            >
              Selected Social &amp; Brand Reels
            </h2>
          </div>

          {/* Middle: Horizontal Cards Track */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: `${Math.round(CARD_WIDTH * (16 / 9) * 1.45)}px`,
              display: 'flex',
              alignItems: 'center',
              zIndex: 2,
            }}
          >
            <div
              ref={trackRef}
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                display: 'flex',
                alignItems: 'center',
                gap: `${CARD_GAP}px`,
                transform: `translateX(${currentTranslateX}px) translateY(-50%)`,
                willChange: 'transform',
              }}
            >
              {reelProjects.map((project, idx) => (
                <VideoCard
                  key={project.id}
                  project={project}
                  index={idx}
                  activeIndex={activeIndex}
                  currentTranslateX={currentTranslateX}
                  viewportWidth={viewportWidth}
                  CARD_WIDTH={CARD_WIDTH}
                  CARD_GAP={CARD_GAP}
                />
              ))}
            </div>
          </div>

          {/* Bottom Area: Coupled Project Info & Progress Indicator */}
          <div
            style={{
              zIndex: 3,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            {/* Dynamic Editorial Metadata */}
            <ProjectInfo project={reelProjects[activeIndex]} />

            {/* Subtle Progress Bar & Counter */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                marginTop: '0.25rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: 'var(--accent-red-bright)',
                }}
              >
                {String(activeIndex + 1).padStart(2, '0')}
              </span>

              {/* Progress Line */}
              <div
                style={{
                  width: '120px',
                  height: '2px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '1px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${((activeIndex + 1) / reelProjects.length) * 100}%`,
                    background: 'var(--accent-red-bright)',
                    transition: 'width 0.25s ease',
                  }}
                />
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: 'var(--text-muted)',
                }}
              >
                {String(reelProjects.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
