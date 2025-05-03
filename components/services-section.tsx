"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, Calendar, FileText, Sparkles } from "lucide-react"
import SectionTransition from "@/components/section-transition"
import Image from "next/image"

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const services = [
    {
      icon: <Brain className="w-10 h-10" />,
      title: "AI Writing Assistant",
      description:
        "Enhance your writing with our AI-powered assistant that helps with grammar, style, and content suggestions.",
      gradient: "from-[#00E6A0] to-[#00B2FF]",
      image: "/images/ai-writing.jpg",
    },
    {
      icon: <Calendar className="w-10 h-10" />,
      title: "Smart Calendar",
      description:
        "Optimize your schedule with our intelligent calendar that learns your preferences and suggests the best times for tasks.",
      gradient: "from-[#00B2FF] to-[#6C63FF]",
      image: "/images/smart-calendar.jpg",
    },
    {
      icon: <FileText className="w-10 h-10" />,
      title: "Document Analyzer",
      description:
        "Extract key insights from documents and generate summaries with our powerful document analysis tool.",
      gradient: "from-[#6C63FF] to-[#00E6A0]",
      image: "/images/document-analyzer.jpg",
    },
    {
      icon: <Sparkles className="w-10 h-10" />,
      title: "Idea Generator",
      description:
        "Never run out of ideas with our AI-powered brainstorming tool that helps you generate creative concepts.",
      gradient: "from-[#00E6A0] to-[#6C63FF]",
      image: "/images/idea-generator.jpg",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#00E6A0]/10 to-transparent rounded-full blur-[100px]" />

      <SectionTransition className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-sm uppercase tracking-wider text-[#00E6A0] font-medium mb-2"
            variants={itemVariants}
          >
            Our Services
          </motion.h2>
          <motion.h3 className="text-3xl md:text-4xl lg:text-5xl font-bold" variants={itemVariants}>
            AI-Powered{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E6A0] via-[#00B2FF] to-[#6C63FF]">
              Productivity Tools
            </span>
          </motion.h3>
          <motion.p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto" variants={itemVariants}>
            Our suite of intelligent tools is designed to streamline your workflow and boost your productivity.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300 group"
              variants={itemVariants}
              custom={index}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101014] to-transparent" />
              </div>
              <div className="p-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.gradient} p-3 mb-6 text-black`}>
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                <p className="text-white/70">{service.description}</p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <button className="text-sm font-medium text-white/80 group-hover:text-white flex items-center gap-2 transition-colors duration-300">
                    Learn more
                    <motion.span
                      initial={{ x: 0 }}
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                    >
                      →
                    </motion.span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <button className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-full px-8 py-3 text-white font-medium transition-colors duration-300">
            View All Services
          </button>
        </motion.div>
      </SectionTransition>
    </section>
  )
}
