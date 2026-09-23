import React from 'react'
import { reelProjects, categoryTabs } from '../data/projects'
import { useScrollGallery } from '../hooks/useScrollGallery'
import VideoCard from './VideoCard'
import ProjectInfo from './ProjectInfo'
import { ArrowRight } from 'lucide-react'

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
    jumpToIndex,
    nextProject,
    prevProject,
  } = useScrollGallery(reelProjects.length)

  const wrapperHeight = `calc(100vh + ${reelProjects.length * SCROLL_PER_CARD}px)`

  // Current active project
  const activeProj = reelProjects[activeIndex] || reelProjects[0]

  // Stage entrance/exit opacity & scale
  const stageOpacity = Math.max(0, stageAlignment - stageExit * 0.35)
  const stageScale = 0.95 + stageAlignment * 0.05 - stageExit * 0.03

  // Handle clicking a category tab to jump to the matching project
  const handleCategoryClick = (categoryKey) => {
    const targetIdx = reelProjects.findIndex((p) => p.category === categoryKey)
    if (targetIdx !== -1) {
      jumpToIndex(targetIdx)
    }
  }

  return (
    <section
      id="gallery-stage"
      aria-label="02 Selected Work"
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
          className="coverflow-stage"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '5rem 3rem 2rem',
            opacity: stageOpacity,
            transform: `scale(${stageScale})`,
            willChange: 'transform, opacity',
            transition: 'opacity 0.08s linear, transform 0.08s linear',
          }}
        >
          {/* Ambient Ghost Watermark — Reference A (WORK) */}
          <div className="watermark-ghost" aria-hidden="true">
            WORK
          </div>

          {/* Volcanic Ember / Red Floor Glow — Reference A */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '-10vh',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80vw',
              height: '35vh',
              background:
                'radial-gradient(ellipse at bottom, rgba(217, 56, 41, 0.16) 0%, rgba(217, 56, 41, 0.04) 50%, transparent 80%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Top Section Header Row — Reference A: 02 SELECTED WORK */}
          <div style={{ position: 'relative', zIndex: 3, width: '100%' }}>
            <div className="section-header-row" style={{ marginBottom: '0.4rem' }}>
              <div className="section-title-wrap">
                <span className="section-index-num">02</span>
                <span className="section-tag-label">SELECTED WORK</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--text-muted)',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                <span>SCROLL TO EXPLORE</span>
                <ArrowRight size={13} />
              </div>
            </div>

            <div style={{ marginLeft: '4.5rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 900,
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.8rem)',
                  letterSpacing: '-0.025em',
                  color: '#FFFFFF',
                  marginBottom: '0.25rem',
                }}
              >
                Featured Projects
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  color: 'var(--text-secondary)',
                }}
              >
                A mix of social media, ads, motion graphics, SaaS and cinematic
                content.
              </p>
            </div>
          </div>

          {/* Middle: 3D Cover-Flow Cards Track */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: `${Math.round(CARD_WIDTH * (16 / 9) * 1.38)}px`,
              display: 'flex',
              alignItems: 'center',
              zIndex: 2,
            }}
          >
            {/* Center Halo Backlight */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '45vw',
                height: '45vh',
                background:
                  'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.08) 0%, rgba(217, 56, 41, 0.14) 40%, transparent 70%)',
                filter: 'blur(50px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

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
                transformStyle: 'preserve-3d',
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
                  onSelect={(i) => jumpToIndex(i)}
                />
              ))}
            </div>
          </div>

          {/* Lower Stage: Active Project Info & Category Matrix — Reference A */}
          <div
            style={{
              position: 'relative',
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
            }}
          >
            {/* Active Project Info & Stepper Controls (←) 05 / 10 (→) */}
            <ProjectInfo
              project={activeProj}
              activeIndex={activeIndex}
              totalProjects={reelProjects.length}
              onPrev={prevProject}
              onNext={nextProject}
            />

            {/* Bottom 6-Category Thumbnail Selector Matrix — Reference A */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.85rem',
                flexWrap: 'wrap',
                maxWidth: '1240px',
                width: '100%',
                paddingTop: '0.5rem',
              }}
            >
              {categoryTabs.map((cat) => {
                const isSelected = activeProj.category === cat.categoryKey
                return (
                  <div
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.categoryKey)}
                    style={{
                      flex: '1 1 160px',
                      maxWidth: '185px',
                      borderRadius: 'var(--radius-sm)',
                      background: isSelected
                        ? 'rgba(217, 56, 41, 0.12)'
                        : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected
                        ? '1px solid var(--accent-red)'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(12px)',
                      padding: '0.65rem 0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.2rem',
                      boxShadow: isSelected
                        ? '0 8px 24px rgba(217, 56, 41, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)'
                        : 'none',
                      transition: 'all 0.3s var(--ease-cinematic)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor =
                          'rgba(255, 255, 255, 0.2)'
                        e.currentTarget.style.background =
                          'rgba(255, 255, 255, 0.06)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor =
                          'rgba(255, 255, 255, 0.08)'
                        e.currentTarget.style.background =
                          'rgba(255, 255, 255, 0.03)'
                      }
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.55rem',
                        fontWeight: 800,
                        letterSpacing: '0.1em',
                        color: isSelected ? 'var(--accent-red)' : 'var(--text-dim)',
                      }}
                    >
                      {cat.index}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                        lineHeight: 1.1,
                      }}
                    >
                      {cat.name}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.52rem',
                        fontWeight: 400,
                        color: 'var(--text-muted)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {cat.subtitle}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
