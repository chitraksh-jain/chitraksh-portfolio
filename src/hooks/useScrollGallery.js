import { useEffect, useRef, useState } from 'react'

/**
 * useScrollGallery
 * ————————————————
 * Transforms vertical page scroll into smooth inertial horizontal translation.
 *
 * Architecture:
 * 1. Dedicated stage settling zone (progress 0 -> 0.08):
 *    The stage aligns with viewport, scales to 1, blur to 0.
 *    Card 0 remains centered.
 * 2. Active translation zone (progress 0.08 -> 0.92):
 *    Translates smoothly from Card 0 to Last Card using damped inertia.
 * 3. Exit settling zone (progress 0.92 -> 1.0):
 *    Last card settles, stage gently dissolves, resuming vertical scroll.
 */
export function useScrollGallery(itemCount) {
  const wrapperRef = useRef(null)
  const stickyRef = useRef(null)
  const trackRef = useRef(null)

  // Target and current interpolated horizontal translation
  const targetXRef = useRef(0)
  const currentXRef = useRef(0)

  // Target and current progress (0 to 1)
  const targetProgRef = useRef(0)
  const currentProgRef = useRef(0)

  const [activeIndex, setActiveIndex] = useState(0)
  const [stageAlignment, setStageAlignment] = useState(0) // 0 (hidden) to 1 (settled)
  const [stageExit, setStageExit] = useState(0) // 0 to 1 as it exits
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  )
  const [currentTranslateX, setCurrentTranslateX] = useState(0)

  // Card geometry
  const isMobile = viewportWidth < 768
  const CARD_WIDTH = isMobile ? 240 : 300
  const CARD_GAP = isMobile ? 24 : 40
  const STEP = CARD_WIDTH + CARD_GAP

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Inertial RAF animation loop
  useEffect(() => {
    let animId
    function loop() {
      // Smooth damping: 0.08 factor creates tactile inertia without lag
      currentXRef.current += (targetXRef.current - currentXRef.current) * 0.08
      currentProgRef.current += (targetProgRef.current - currentProgRef.current) * 0.08

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${currentXRef.current}px)`
      }
      setCurrentTranslateX(currentXRef.current)

      // Calculate which card is closest to viewport center
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

  // Scroll listener tracking vertical scroll distance through the pinned zone
  useEffect(() => {
    const handleScroll = () => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      const rect = wrapper.getBoundingClientRect()
      const wrapperH = wrapper.offsetHeight
      const viewportH = window.innerHeight
      const maxScroll = wrapperH - viewportH

      if (maxScroll <= 0) return

      // Progress through the pinned section: 0 when top touches top, 1 when bottom touches bottom
      const scrolled = -rect.top
      const rawProg = scrolled / maxScroll
      const clampedProg = Math.max(0, Math.min(1, rawProg))

      targetProgRef.current = clampedProg

      // 1. Entry Settling Zone (0.0 to 0.08)
      // Controls stage fade-in and scale into full alignment
      const entryT = Math.min(1, Math.max(0, clampedProg / 0.08))
      setStageAlignment(entryT)

      // 2. Exit Settling Zone (0.92 to 1.0)
      const exitT = Math.min(1, Math.max(0, (clampedProg - 0.92) / 0.08))
      setStageExit(exitT)

      // 3. Horizontal Travel Zone (0.08 to 0.92)
      // Clamped normalized progress for horizontal translation
      const travelProg = Math.min(1, Math.max(0, (clampedProg - 0.08) / 0.84))

      // Card 0 center aligned with viewport center:
      const startX = viewportWidth / 2 - CARD_WIDTH / 2
      // Last card center aligned with viewport center:
      const endX = startX - (itemCount - 1) * STEP

      const calculatedTargetX = startX + (endX - startX) * travelProg
      targetXRef.current = calculatedTargetX
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
  }
}
