"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import CustomCursor from "@/components/custom-cursor"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import PortfolioSection from "@/components/portfolio-section"
import YoutubeSection from "@/components/youtube-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import PageTransition from "@/components/page-transition"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [isLoaded, setIsLoaded] = useState(false)
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({
    hero: null,
    about: null,
    services: null,
    portfolio: null,
    youtube: null,
    contact: null,
  })

  useEffect(() => {
    // Initial page load animation
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      Object.entries(sectionsRef.current).forEach(([key, section]) => {
        if (!section) return

        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(key)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const navItems = [
    { name: "Home", section: "hero" },
    { name: "About", section: "about" },
    { name: "Services", section: "services" },
    { name: "Portfolio", section: "portfolio" },
    { name: "YouTube", section: "youtube" },
    { name: "Contact", section: "contact" },
  ]

  const scrollToSection = (section: string) => {
    setMobileMenuOpen(false)
    sectionsRef.current[section]?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="relative bg-[#101014] text-white min-h-screen overflow-hidden">
      <PageTransition isLoaded={isLoaded} />
      <CustomCursor />

      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center backdrop-blur-md bg-[#101014]/70">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <Image src="/logo.svg" alt="Clamber AI" width={40} height={40} className="w-10 h-10" priority />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00E6A0] via-[#00B2FF] to-[#6C63FF]">
            Clamber AI
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.section}
              onClick={() => scrollToSection(item.section)}
              className={cn(
                "text-sm font-medium relative transition-colors duration-300",
                activeSection === item.section ? "text-white" : "text-white/60 hover:text-white",
              )}
            >
              {item.name}
              {activeSection === item.section && (
                <motion.span
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00E6A0] via-[#00B2FF] to-[#6C63FF]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-0 w-full z-40 bg-[#101014] border-b border-white/10 md:hidden"
          >
            <nav className="flex flex-col p-6">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => scrollToSection(item.section)}
                  className={cn(
                    "py-3 text-left text-lg font-medium transition-colors duration-300",
                    activeSection === item.section ? "text-white" : "text-white/60",
                  )}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div ref={(el) => (sectionsRef.current.hero = el)} className="section">
        <HeroSection />
      </div>

      <div ref={(el) => (sectionsRef.current.about = el)} className="section">
        <AboutSection />
      </div>

      <div ref={(el) => (sectionsRef.current.services = el)} className="section">
        <ServicesSection />
      </div>

      <div ref={(el) => (sectionsRef.current.portfolio = el)} className="section">
        <PortfolioSection />
      </div>

      <div ref={(el) => (sectionsRef.current.youtube = el)} className="section">
        <YoutubeSection />
      </div>

      <div ref={(el) => (sectionsRef.current.contact = el)} className="section">
        <ContactSection />
      </div>

      <Footer />
    </main>
  )
}
