import React, { useEffect, useState } from 'react'
import './styles/globals.css'
import './styles/animations.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Showreel from './components/Showreel'
import HorizontalGallery from './components/HorizontalGallery'
import LongForm from './components/LongForm'
import Contact from './components/Contact'

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', position: 'relative' }}>
      <Navbar scrolled={scrolled} />
      <Hero />
      <Showreel />
      <HorizontalGallery />
      <LongForm />
      <Contact />
    </div>
  )
}
