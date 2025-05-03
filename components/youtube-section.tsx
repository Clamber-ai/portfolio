"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Play, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import SectionTransition from "@/components/section-transition"

export default function YoutubeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const [activeVideo, setActiveVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

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

  const videos = [
    {
      id: 1,
      title: "Introduction to AI Productivity Tools",
      thumbnail: "/images/youtube-1.jpg",
      duration: "10:24",
      views: "15K",
      date: "2 weeks ago",
    },
    {
      id: 2,
      title: "How to Optimize Your Workflow with AI",
      thumbnail: "/images/youtube-2.jpg",
      duration: "15:37",
      views: "8.5K",
      date: "1 month ago",
    },
    {
      id: 3,
      title: "The Future of AI in Personal Productivity",
      thumbnail: "/images/youtube-3.jpg",
      duration: "20:15",
      views: "12K",
      date: "3 weeks ago",
    },
  ]

  const handlePlayVideo = () => {
    setIsPlaying(true)
    // In a real implementation, this would trigger the video to play
  }

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-[#0c0c10]">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/images/youtube-bg.jpg')] bg-cover bg-center opacity-5" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#101014] via-transparent to-[#101014]" />

      <SectionTransition className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="flex items-center justify-center gap-2 mb-4" variants={itemVariants}>
            <Youtube className="text-[#FF0000] h-6 w-6" />
            <h2 className="text-sm uppercase tracking-wider text-[#00E6A0] font-medium">Our YouTube Channel</h2>
          </motion.div>
          <motion.h3 className="text-3xl md:text-4xl lg:text-5xl font-bold" variants={itemVariants}>
            Watch Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E6A0] via-[#00B2FF] to-[#6C63FF]">
              Latest Videos
            </span>
          </motion.h3>
          <motion.p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto" variants={itemVariants}>
            Subscribe to our YouTube channel for tutorials, insights, and updates on AI productivity tools and
            techniques.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Featured video */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="relative rounded-2xl overflow-hidden group">
              <div className="aspect-w-16 aspect-h-9">
                {isPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1`}
                    title={videos[activeVideo].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                ) : (
                  <Image
                    src={videos[activeVideo].thumbnail || "/placeholder.svg"}
                    alt={videos[activeVideo].title}
                    width={1280}
                    height={720}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              {!isPlaying && (
                <div
                  className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                  onClick={handlePlayVideo}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00E6A0] to-[#00B2FF] flex items-center justify-center">
                      <Play className="h-8 w-8 text-black fill-black ml-1" />
                    </div>
                  </motion.div>
                </div>
              )}
              {!isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h4 className="text-xl md:text-2xl font-bold mb-2">{videos[activeVideo].title}</h4>
                  <div className="flex items-center gap-4 text-sm text-white/70">
                    <span>{videos[activeVideo].views} views</span>
                    <span>•</span>
                    <span>{videos[activeVideo].date}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Video list */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h4 className="text-xl font-bold mb-4">More Videos</h4>
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                className={`flex gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeVideo === index ? "bg-white/10 border border-white/20 scale-[1.02]" : "hover:bg-white/5"
                }`}
                onClick={() => {
                  setActiveVideo(index)
                  setIsPlaying(false)
                }}
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
                  <div className="absolute bottom-1 right-1 bg-black/70 text-xs px-1 rounded">{video.duration}</div>
                </div>
                <div className="flex flex-col justify-between">
                  <h5 className="font-medium line-clamp-2">{video.title}</h5>
                  <div className="text-xs text-white/60">
                    <p>{video.views} views</p>
                    <p>{video.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="pt-4">
              <Button
                variant="outline"
                className="w-full border-white/20 hover:bg-white/10"
                onClick={() => window.open("https://www.youtube.com/channel/UCSsHJIS4-VtR-k4OaL0w9VA", "_blank")}
              >
                <Youtube className="mr-2 h-4 w-4" />
                Visit Our Channel
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </SectionTransition>
    </section>
  )
}
