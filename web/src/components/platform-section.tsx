"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function PlatformSection() {
  const [platformRef, platformInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  }

  return (
    <motion.section
      ref={platformRef}
      initial="hidden"
      animate={platformInView ? "visible" : "hidden"}
      variants={fadeIn}
      className="w-full py-12 md:py-24 lg:py-32 bg-white"
    >
      <div className="container px-4 md:px-6">
        <motion.div variants={fadeIn} className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-gray-800">La Plateforme SIGAP</h2>
          <p className="max-w-[800px] mx-auto text-gray-600 mt-4">
            Obtenez des résultats précis à une vitesse sans précédent avec notre solution flexible et complète.
            Accélérez vos processus de gestion avec la combinaison de l&apos;IA et de capteurs avancés.
          </p>
          <Link href="#" className="inline-flex items-center text-blue-600 mt-2 hover:underline">
            Aperçu de la plateforme SIGAP <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid gap-16 md:gap-24">
          {/* Détection Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div variants={fadeInLeft} className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">Détection Intelligente</h3>
              <p className="text-gray-600">
                Exploitez les capacités de détection optimisées pour la reconnaissance automatique des présences grâce à
                notre système de triangulation ESP32 intégré.
              </p>
              <Link href="#" className="inline-flex items-center text-blue-600 hover:underline">
                En savoir plus <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div variants={fadeInRight} className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/esp32-module.png"
                alt="Module ESP32 pour la détection SIGAP"
                fill
                className="object-contain bg-white p-4"
              />
            </motion.div>
          </div>

          {/* Tableau de bord Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              variants={fadeInRight}
              className="relative h-[300px] rounded-lg overflow-hidden shadow-lg md:order-1 order-2"
            >
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Tableau de bord SIGAP"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div variants={fadeInLeft} className="space-y-4 md:order-2 order-1">
              <h3 className="text-2xl font-bold text-gray-800">Tableau de Bord</h3>
              <p className="text-gray-600">
                Créez des tableaux de bord puissants avec IA et apprentissage automatique pour visualiser les données de
                présence en temps réel pour vos équipes et étudiants.
              </p>
              <Link href="#" className="inline-flex items-center text-blue-600 hover:underline">
                Aperçu du tableau de bord <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          {/* Sécurité Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div variants={fadeInLeft} className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">Sécurité</h3>
              <p className="text-gray-600">
                Modernisez votre système de sécurité avec des analyses basées sur l&apos;IA pour détecter, investiguer
                et répondre aux problèmes avant qu&apos;ils ne surviennent.
              </p>
              <Link href="#" className="inline-flex items-center text-blue-600 hover:underline">
                Aperçu de la sécurité <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div variants={fadeInRight} className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
              <Image src="/placeholder.svg?height=300&width=500" alt="Sécurité SIGAP" fill className="object-cover" />
            </motion.div>
          </div>

          {/* Rapports Section */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              variants={fadeInRight}
              className="relative h-[300px] rounded-lg overflow-hidden shadow-lg md:order-1 order-2"
            >
              <Image src="/placeholder.svg?height=300&width=500" alt="Rapports SIGAP" fill className="object-cover" />
            </motion.div>
            <motion.div variants={fadeInLeft} className="space-y-4 md:order-2 order-1">
              <h3 className="text-2xl font-bold text-gray-800">Rapports et Analyses</h3>
              <p className="text-gray-600">
                Accélérez la résolution des problèmes avec des rapports ouverts, flexibles et unifiés alimentés par
                l&apos;IA avancée et l&apos;analytique.
              </p>
              <Link href="#" className="inline-flex items-center text-blue-600 hover:underline">
                Aperçu des rapports <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

