"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

interface SectionTransitionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function SectionTransition({ children, className = "", delay = 0 }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [100, 0, 0, -100])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay }}
      style={{ opacity, y }}
    >
      {children}
    </motion.div>
  )
}
