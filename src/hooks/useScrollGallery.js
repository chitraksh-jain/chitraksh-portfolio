import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * useScrollGallery — 3D Cover-Flow Engine
 * ——————————————————————————————————————
 * Handles smooth inertial scroll translation, 3D perspective rotation,
 * and direct stepper jumps (left/right arrows and category tabs).
 */
export function useScrollGallery(itemCount) {
  const wrapperRef = useRef(null)
  const stickyRef = useRef(null)
  const trackRef = useRef(null)

  const targetXRef = useRef(0)
  const currentXRef = useRef(0)
  const targetProgRef = useRef(0)
  const currentProgRef = useRef(0)

  const [activeIndex, setActiveIndex] = useState(4) // default to card 05 (Sneaker Ad) as in Reference A
  const [stageAlignment, setStageAlignment] = useState(1)
  const [stageExit, setStageExit] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  )
  const [currentTranslateX, setCurrentTranslateX] = useState(0)

  // Card geometry
  const isMobile = viewportWidth < 768
  const CARD_WIDTH = isMobile ? 220 : 280
  const CARD_GAP = isMobile ? 28 : 48
  const STEP = CARD_WIDTH + CARD_GAP

  // Resize listener
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Position calculation helper for index
  const getXForIndex = useCallback(
    (idx) => {
      const startX = viewportWidth / 2 - CARD_WIDTH / 2
      return startX - idx * STEP
    },
    [viewportWidth, CARD_WIDTH, STEP]
  )

  // Jump to specific index (stepper or category tab)
  const jumpToIndex = useCallback(
    (idx) => {
      const clamped = Math.max(0, Math.min(itemCount - 1, idx))
      setActiveIndex(clamped)
      targetXRef.current = getXForIndex(clamped)
    },
    [itemCount, getXForIndex]
  )

  const nextProject = useCallback(() => {
    jumpToIndex(activeIndex + 1)
  }, [activeIndex, jumpToIndex])

  const prevProject = useCallback(() => {
    jumpToIndex(activeIndex - 1)
  }, [activeIndex, jumpToIndex])

  // Continuous RAF loop with smooth inertia
  useEffect(() => {
    let animId
    function loop() {
      // 0.08 damping factor provides smooth fluid momentum
      currentXRef.current += (targetXRef.current - currentXRef.current) * 0.08
      currentProgRef.current += (targetProgRef.current - currentProgRef.current) * 0.08

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${currentXRef.current}px)`
      }
      setCurrentTranslateX(currentXRef.current)

      // Find closest card to viewport center
      const viewCenter = viewportWidth / 2
      let closestIdx = 0
      let minDistance = Infinity

      for (let i = 0; i < itemCount; i++) {
        const cardCenter = currentXRef.current + i * STEP + CARD_WIDTH / 2
        const dist = Math.abs(cardCenter - viewCenter)
        if (dist < minDistance) {
          minDistance = dist
          closestIdx = i
        }
      }
      setActiveIndex(closestIdx)

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [itemCount, STEP, CARD_WIDTH, viewportWidth])

  // Scroll listener tracking vertical scroll
  useEffect(() => {
    const handleScroll = () => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      const rect = wrapper.getBoundingClientRect()
      const wrapperH = wrapper.offsetHeight
      const viewportH = window.innerHeight
      const maxScroll = wrapperH - viewportH

      if (maxScroll <= 0) return

      const scrolled = -rect.top
      const rawProg = scrolled / maxScroll
      const clampedProg = Math.max(0, Math.min(1, rawProg))

      targetProgRef.current = clampedProg

      // Settling zones
      const entryT = Math.min(1, Math.max(0, clampedProg / 0.06))
      setStageAlignment(entryT)

      const exitT = Math.min(1, Math.max(0, (clampedProg - 0.94) / 0.06))
      setStageExit(exitT)

      // Active translation zone
      const travelProg = Math.min(1, Math.max(0, (clampedProg - 0.06) / 0.88))
      const startX = viewportWidth / 2 - CARD_WIDTH / 2
      const endX = startX - (itemCount - 1) * STEP

      targetXRef.current = startX + (endX - startX) * travelProg
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [itemCount, STEP, CARD_WIDTH, viewportWidth])

  return {
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
    STEP,
    jumpToIndex,
    nextProject,
    prevProject,
  }
}
