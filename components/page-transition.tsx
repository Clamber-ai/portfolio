"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface PageTransitionProps {
  isLoaded: boolean
}

export default function PageTransition({ isLoaded }: PageTransitionProps) {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShowLoader(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isLoaded])

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#101014]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className="relative w-24 h-24 mb-8"
          >
            <Image src="/logo.svg" alt="Clamber AI" fill priority />
          </motion.div>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-full max-w-xs h-1 bg-gradient-to-r from-[#00E6A0] via-[#00B2FF] to-[#6C63FF] rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
