"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
  })

  useEffect(() => {
    if (!contentRef.current) return

    const updateHeight = () => {
      if (contentRef.current && scrollRef.current) {
        scrollRef.current.style.height = `${contentRef.current.scrollHeight}px`
      }
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)

    const resizeObserver = new ResizeObserver(updateHeight)
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current)
    }

    return () => {
      window.removeEventListener("resize", updateHeight)
      if (contentRef.current) {
        resizeObserver.unobserve(contentRef.current)
      }
    }
  }, [])

  const y = useTransform(smoothProgress, [0, 1], [0, -contentRef.current?.scrollHeight || 0 + window.innerHeight])

  // Disable smooth scrolling on mobile
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
    return <>{children}</>
  }

  return (
    <>
      <div ref={scrollRef} className="h-screen w-full" />
      <motion.div ref={contentRef} style={{ y }} className="fixed top-0 left-0 w-full will-change-transform">
        {children}
      </motion.div>
    </>
  )
}
