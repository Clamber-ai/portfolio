"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowRight, ExternalLink } from "lucide-react"
import SectionTransition from "@/components/section-transition"

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const [activeCategory, setActiveCategory] = useState("all")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

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

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Design" },
    { id: "mobile", name: "Mobile Apps" },
    { id: "ai", name: "AI Solutions" },
  ]

  const projects = [
    {
      id: 1,
      title: "Productivity Dashboard",
      category: "web",
      image: "/images/portfolio-1.jpg",
      description: "A comprehensive dashboard for tracking productivity metrics.",
    },
    {
      id: 2,
      title: "Task Manager Mobile App",
      category: "mobile",
      image: "/images/portfolio-2.jpg",
      description: "An intuitive mobile app for managing tasks and projects.",
    },
    {
      id: 3,
      title: "AI Content Generator",
      category: "ai",
      image: "/images/portfolio-3.jpg",
      description: "An AI-powered tool for generating high-quality content.",
    },
    {
      id: 4,
      title: "E-commerce Website",
      category: "web",
      image: "/images/portfolio-4.jpg",
      description: "A modern e-commerce website with advanced features.",
    },
    {
      id: 5,
      title: "AI Meeting Assistant",
      category: "ai",
      image: "/images/portfolio-5.jpg",
      description: "An AI tool that transcribes and summarizes meetings.",
    },
    {
      id: 6,
      title: "Fitness Tracking App",
      category: "mobile",
      image: "/images/portfolio-6.jpg",
      description: "A mobile app for tracking fitness goals and progress.",
    },
  ]

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#00B2FF]/10 to-transparent rounded-full blur-[100px]" />

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
            Our Portfolio
          </motion.h2>
          <motion.h3 className="text-3xl md:text-4xl lg:text-5xl font-bold" variants={itemVariants}>
            Showcasing Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E6A0] via-[#00B2FF] to-[#6C63FF]">
              Design Excellence
            </span>
          </motion.h3>
          <motion.p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto" variants={itemVariants}>
            Explore our portfolio of innovative designs and solutions that demonstrate our expertise in creating
            exceptional digital experiences.
          </motion.p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-[#00E6A0] to-[#00B2FF] text-black"
                  : "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white"
              }`}
              onClick={() => setActiveCategory(category.id)}
              variants={itemVariants}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors duration-300"
                variants={itemVariants}
                layout
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={450}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-bold">{project.title}</h4>
                    <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white/70">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-white/70 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <button className="text-sm font-medium text-white/80 group-hover:text-white flex items-center gap-2 transition-colors duration-300">
                      View Project
                      <ExternalLink size={16} />
                    </button>
                    <motion.div
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredProject === project.id ? 1 : 0,
                        scale: hoveredProject === project.id ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight size={16} className="text-white" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <button className="bg-gradient-to-r from-[#00E6A0] to-[#00B2FF] hover:from-[#00B2FF] hover:to-[#6C63FF] text-black font-medium rounded-full px-8 py-3 transition-colors duration-300">
            View All Projects
          </button>
        </motion.div>
      </SectionTransition>
    </section>
  )
}
