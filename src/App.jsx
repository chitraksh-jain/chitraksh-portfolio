import React, { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import './styles/globals.css'
import './styles/animations.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Showreel from './components/Showreel'
import HorizontalGallery from './components/HorizontalGallery'
import LongForm from './components/LongForm'
import Contact from './components/Contact'

export default function App() {
  const [scrollY, setScrollY] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const lenisRef = useRef(null)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    const onScroll = ({ scroll }) => {
      setScrollY(scroll)
      setScrolled(scroll > 50)
    }

    lenis.on('scroll', onScroll)

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // Smooth navigation jump handler
  const handleNavigate = (targetId) => {
    const el = document.getElementById(targetId)
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0, duration: 1.4 })
    }
  }

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-deep)',
        minHeight: '100vh',
        position: 'relative',
        color: 'var(--text-primary)',
      }}
    >
      {/* 35mm Fine Film Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Layered Cinematic Ambient Lighting */}
      <div className="ambient-lighting" aria-hidden="true">
        <div className="ambient-light-silver" />
        <div className="ambient-light-red" />
        <div className="ambient-vignette" />
      </div>

      {/* Floating Glass Navigation */}
      <Navbar scrolled={scrolled} onNavigate={handleNavigate} />

      {/* Main Experience Flow */}
      <main>
        <Hero scrollY={scrollY} />
        <Showreel />
        <HorizontalGallery />
        <LongForm />
      </main>

      {/* Contact & Footer */}
      <Contact />
    </div>
  )
}
