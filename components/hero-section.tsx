"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { width, height, left, top } = containerRef.current!.getBoundingClientRect()

      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5

      const elements = containerRef.current!.querySelectorAll(".parallax-element")
      elements.forEach((el) => {
        const element = el as HTMLElement
        const speed = Number.parseFloat(element.dataset.speed || "0.1")
        const rotateX = y * 10 * speed
        const rotateY = -x * 10 * speed

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`
      })
    }

    containerRef.current.addEventListener("mousemove", handleMouseMove)

    return () => {
      containerRef.current?.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[#101014]">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-[#00E6A0]/20 via-[#00B2FF]/20 to-[#6C63FF]/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#00E6A0] to-[#00B2FF] opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Heading */}
        <motion.h1
          className="parallax-element text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 max-w-4xl"
          data-speed="0.1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E6A0] via-[#00B2FF] to-[#6C63FF]">
            AI-Powered Tools
          </span>{" "}
          for{" "}
          <span className="relative">
            Productivity
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#00E6A0] to-[#00B2FF]"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            />
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="parallax-element text-lg md:text-xl text-white/80 text-center mb-10 max-w-2xl"
          data-speed="0.15"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Elevating personal productivity with cutting-edge AI solutions designed for the modern workflow.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="parallax-element flex flex-col sm:flex-row gap-4"
          data-speed="0.05"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            className="bg-gradient-to-r from-[#00E6A0] to-[#00B2FF] hover:from-[#00B2FF] hover:to-[#6C63FF] text-black font-medium px-8 py-6"
            size="lg"
          >
            Explore Our Tools
          </Button>
          <Button
            className="bg-white text-black font-medium px-8 py-6 hover:bg-gray-200"
            size="lg"
          >
            Watch Demo
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-sm text-white/60 mb-2">Scroll to explore</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
          <ArrowDown className="text-white/60" size={20} />
        </motion.div>
      </motion.div>

      {/* Decorative images */}
      <motion.div
        className="absolute -bottom-20 -right-20 w-64 h-64 md:w-96 md:h-96 opacity-20 blur-sm"
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 0.2, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <Image src="/images/abstract-1.png" alt="Abstract decoration" fill className="object-contain" />
      </motion.div>

      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 md:w-96 md:h-96 opacity-20 blur-sm"
        initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
        animate={{ opacity: 0.2, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, delay: 1.2 }}
      >
        <Image src="/images/abstract-2.png" alt="Abstract decoration" fill className="object-contain" />
      </motion.div>
    </section>
  )
}
