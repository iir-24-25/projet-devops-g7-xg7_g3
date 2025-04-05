"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function HeroSection() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  }

  return (
    <motion.section
      ref={heroRef}
      initial="hidden"
      animate={heroInView ? "visible" : "hidden"}
      variants={fadeIn}
      className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-100 opacity-50"></div>
        <div className="absolute top-20 -left-20 w-60 h-60 rounded-full bg-blue-100 opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-100 opacity-40"></div>
      </div>

      <div className="container px-4 md:px-6 relative">
        <motion.div variants={fadeIn} className="flex flex-col md:flex-row justify-between items-center gap-12">
          <motion.div
            className="space-y-6 max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 font-medium">
              Nouvelle génération de gestion de présence
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-gray-900">
              Réinventer la gestion des présences avec{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                l&apos;intelligence artificielle
              </span>
            </h1>
            <p className="text-gray-600 md:text-xl">
              SIGAP utilise la triangulation ESP32 et BT, le machine learning et une interface intuitive pour
              automatiser la gestion des absences en entreprise ou en établissement scolaire.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
              >
                Découvrir le projet
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Voir la démo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            className="relative w-full md:w-2/5 h-[300px] rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-90 z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-white text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Tableau de bord intelligent</h3>
                <p className="text-white/80">Visualisez vos données en temps réel</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

