"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { BarChart3, Camera, FileText } from "lucide-react"
import { Wifi } from "@/components/icons"

export function FeaturesSection() {
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
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

  const rotateIn = {
    hidden: { opacity: 0, rotate: -5 },
    visible: { opacity: 1, rotate: 0, transition: { duration: 0.8 } },
  }

  return (
    <motion.section
      id="features"
      ref={featuresRef}
      initial="hidden"
      animate={featuresInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="w-full py-12 md:py-24 lg:py-32 bg-white"
    >
      <div className="container px-4 md:px-6">
        <motion.div variants={bounceIn} className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-blue-600 px-3 py-1 text-sm text-white">Fonctionnalités</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-gray-800">
              Fonctionnalités principales
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              SIGAP combine des technologies de pointe pour offrir une solution complète de gestion des présences.
            </p>
          </div>
        </motion.div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
          <motion.div variants={fadeInLeft} className="grid gap-6">
            <motion.div
              variants={rotateIn}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="flex items-start gap-4 p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <Wifi className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-800">Détection de présence via ESP32</h3>
                <p className="text-gray-600">
                  Utilisation de la triangulation Bluetooth et ESP32 pour détecter automatiquement les présences dans un
                  espace défini.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={rotateIn}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="flex items-start gap-4 p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <Camera className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-800">Caméra pour la validation des absences</h3>
                <p className="text-gray-600">
                  Système de vérification par caméra avec reconnaissance faciale pour confirmer les présences et
                  absences.
                </p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div variants={fadeInRight} className="grid gap-6">
            <motion.div
              variants={rotateIn}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="flex items-start gap-4 p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-800">Tableau de bord en temps réel</h3>
                <p className="text-gray-600">
                  Visualisation instantanée des données de présence avec statistiques et tendances pour une prise de
                  décision éclairée.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={rotateIn}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="flex items-start gap-4 p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <FileText className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-800">Alertes automatiques et rapports PDF</h3>
                <p className="text-gray-600">
                  Génération de notifications en cas d&apos;absence et création de rapports détaillés exportables en
                  PDF.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

