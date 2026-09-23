import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * useScrollGallery
 * ————————————————
 * Pins the gallery section while the user scrolls vertically,
 * and converts that vertical scroll distance into a horizontal
 * translateX offset for the video track.
 *
 * Returns:
 *  - wrapperRef   → attach to the tall outer wrapper <div>
 *  - stickyRef    → attach to the sticky inner container
 *  - trackRef     → attach to the horizontally-moving track
 *  - activeIndex  → currently centred video index (0-based)
 *  - progress     → 0..1 overall scroll progress through gallery
 */
export function useScrollGallery(itemCount) {
  const wrapperRef = useRef(null)
  const stickyRef = useRef(null)
  const trackRef = useRef(null)
  const rafRef = useRef(null)
  const currentXRef = useRef(0)
  const targetXRef = useRef(0)

  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  // Card width + gap constants (must match VideoCard CSS)
  const CARD_WIDTH = typeof window !== 'undefined' && window.innerWidth < 768 ? 220 : 300
  const CARD_GAP = typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 36

  const STEP = CARD_WIDTH + CARD_GAP

  const animate = useCallback(() => {
    // Smooth lerp toward target
    currentXRef.current += (targetXRef.current - currentXRef.current) * 0.075
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${currentXRef.current}px)`
    }
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate])

  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      const rect = wrapper.getBoundingClientRect()
      const wrapperH = wrapper.offsetHeight
      const viewportH = window.innerHeight

      // How far into the sticky zone are we?
      const scrolled = -rect.top
      const maxScroll = wrapperH - viewportH

      if (scrolled < 0 || maxScroll <= 0) return

      const prog = Math.min(1, Math.max(0, scrolled / maxScroll))
      setProgress(prog)

      // Total track width to translate
      const totalTrackWidth = itemCount * STEP
      const viewportWidth = window.innerWidth
      // Centre first card → translate right by half viewport minus half card
      const startOffset = viewportWidth / 2 - CARD_WIDTH / 2
      const endOffset = startOffset - (itemCount - 1) * STEP

      const tx = startOffset + (endOffset - startOffset) * prog
      targetXRef.current = tx

      // Determine active index: which card centre is closest to viewport centre
      const viewCenter = viewportWidth / 2
      // Position of card i centre = tx + i*STEP + CARD_WIDTH/2
      let closest = 0
      let minDist = Infinity
      for (let i = 0; i < itemCount; i++) {
        const cardCenter = tx + i * STEP + CARD_WIDTH / 2
        const dist = Math.abs(cardCenter - viewCenter)
        if (dist < minDist) { minDist = dist; closest = i }
      }
      setActiveIndex(closest)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [itemCount, CARD_WIDTH, CARD_GAP, STEP])

  return { wrapperRef, stickyRef, trackRef, activeIndex, progress }
}
