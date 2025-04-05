"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Clock, CheckCircle, Shield } from "lucide-react"

export function WhySigapSection() {
  const [whyRef, whyInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
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

  return (
    <motion.section
      id="why"
      ref={whyRef}
      initial="hidden"
      animate={whyInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
    >
      <div className="container px-4 md:px-6">
        <motion.div variants={bounceIn} className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-blue-600 px-3 py-1 text-sm text-white">Avantages</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-gray-800">Pourquoi SIGAP ?</h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Notre solution offre des avantages concrets pour les entreprises et établissements scolaires.
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3"
        >
          <motion.div
            variants={scaleIn}
            whileHover={{
              y: -10,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            className="flex flex-col items-center space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm transition-all hover:shadow-md bg-white"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Gain de temps</h3>
            <p className="text-center text-gray-600">
              Automatisez le processus de pointage et réduisez jusqu&apos;à 95% le temps consacré à la gestion des
              présences.
            </p>
          </motion.div>
          <motion.div
            variants={scaleIn}
            whileHover={{
              y: -10,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            className="flex flex-col items-center space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm transition-all hover:shadow-md bg-white"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Précision</h3>
            <p className="text-center text-gray-600">
              Éliminez les erreurs humaines et assurez un suivi précis des présences grâce à notre technologie de
              pointe.
            </p>
          </motion.div>
          <motion.div
            variants={scaleIn}
            whileHover={{
              y: -10,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            className="flex flex-col items-center space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm transition-all hover:shadow-md bg-white"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Respect de la vie privée</h3>
            <p className="text-center text-gray-600">
              Conformité RGPD et protection des données personnelles avec des protocoles de sécurité avancés.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

