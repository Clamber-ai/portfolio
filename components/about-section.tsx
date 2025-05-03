"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { CheckCircle } from "lucide-react"
import SectionTransition from "@/components/section-transition"

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const features = [
    "AI-powered productivity solutions",
    "Intuitive user interfaces",
    "Seamless workflow integration",
    "Data privacy and security",
    "Continuous learning and improvement",
  ]

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#6C63FF]/10 to-transparent rounded-full blur-[100px]" />

      <SectionTransition className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left column - Image */}
          <motion.div className="relative" variants={itemVariants}>
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-[#6C63FF]/20">
              <div className="aspect-w-4 aspect-h-3 w-full">
                <Image
                  src="/images/productivity-dashboard.jpg"
                  alt="AI Productivity"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-r from-[#00E6A0] to-[#00B2FF] opacity-30 blur-xl" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-r from-[#00B2FF] to-[#6C63FF] opacity-30 blur-xl" />

            <motion.div
              className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 p-4 md:p-6 bg-[#101014]/80 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg"
              variants={itemVariants}
              custom={1}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00E6A0] to-[#00B2FF] flex items-center justify-center">
                  <span className="text-black font-bold">AI</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Smart Solutions</h4>
                  <p className="text-xs text-white/60">Powered by advanced AI</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Content */}
          <div>
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-sm uppercase tracking-wider text-[#00E6A0] font-medium mb-2">About Clamber AI</h2>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Revolutionizing{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E6A0] via-[#00B2FF] to-[#6C63FF]">
                    Productivity
                  </span>{" "}
                  with AI
                </h3>
                <p className="text-lg text-white/80 mb-8 leading-relaxed">
                  Clamber AI is a cutting-edge SaaS company dedicated to creating AI-powered software tools that enhance
                  personal productivity. Our mission is to help individuals and teams work smarter, not harder, by
                  leveraging the power of artificial intelligence.
                </p>
              </motion.div>

              <motion.div className="space-y-4" variants={itemVariants}>
                {features.map((feature, index) => (
                  <motion.div key={index} className="flex items-center gap-3" variants={itemVariants} custom={index}>
                    <CheckCircle className="text-[#00E6A0] h-5 w-5 flex-shrink-0" />
                    <span className="text-white/90">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="pt-6" variants={itemVariants}>
                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <blockquote className="text-lg italic text-white/80">
                    "Our goal is to create tools that feel like an extension of your mind, anticipating your needs and
                    helping you achieve more with less effort."
                  </blockquote>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src="/images/ceo-portrait.jpg"
                        alt="CEO Portrait"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Jane Doe</p>
                      <p className="text-sm text-white/60">Founder & CEO</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </SectionTransition>
    </section>
  )
}
