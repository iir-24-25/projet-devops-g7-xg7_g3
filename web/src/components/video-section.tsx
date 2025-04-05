"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useRef } from "react"

export function VideoSection() {
  const [videoRef, videoInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const videoElementRef = useRef<HTMLVideoElement>(null)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const bounceIn = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  }

  useEffect(() => {
    // Démarrer la vidéo automatiquement lorsqu'elle est visible
    if (videoInView && videoElementRef.current) {
      videoElementRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error)
      })
    }
  }, [videoInView])

  return (
    <motion.section
      ref={videoRef}
      initial="hidden"
      animate={videoInView ? "visible" : "hidden"}
      variants={fadeIn}
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
    >
      <div className="container px-4 md:px-6 text-center">
        <motion.div variants={bounceIn} className="mb-10">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight mb-4 text-gray-800">
            Découvrez SIGAP en action
          </h2>
          <p className="text-gray-600 md:text-xl max-w-[800px] mx-auto">
            Regardez comment notre solution transforme la gestion des présences au quotidien.
          </p>
        </motion.div>

        <motion.div variants={scaleIn} className="max-w-4xl mx-auto relative rounded-xl overflow-hidden shadow-2xl">
          <div className="aspect-video">
            <video
              ref={videoElementRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              loop
              controls
            >
              <source
                src="/images/videoSchoolV1.mp4"
                type="video/mp4"
              />
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="mt-10 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-700">Installation facile</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-700">Configuration rapide</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-700">Résultats immédiats</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

