"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Briefcase, CheckCircle, Globe, Linkedin, Mail, MessageCircle, Twitter } from "lucide-react"

export function TeamSection() {
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

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
      ref={teamRef}
      initial="hidden"
      animate={teamInView ? "visible" : "hidden"}
      variants={fadeIn}
      className="w-full py-12 md:py-24 lg:py-32 bg-white"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div className="space-y-2" variants={bounceIn}>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-gray-800">Notre équipe</h2>
            <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed mx-auto">
              Découvrez les experts passionnés qui développent SIGAP pour révolutionner la gestion des présences.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto"
          >
            {/* Team Member 1 - KIAA Khalid (Chef du projet) */}
            <motion.div
              variants={scaleIn}
              className="flex flex-col items-center space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm bg-white group relative h-[400px] overflow-hidden md:col-span-5 lg:col-span-1 lg:order-2"
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100">
                <Image src="/images/khalid-profile.jpeg" alt="KIAA Khalid" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">KIAA Khalid</h3>
              <p className="text-blue-600 font-medium">Chef du projet</p>
              <p className="text-center text-gray-600">
                Je crée des expériences numériques exceptionnelles avec des technologies modernes. Concentré sur la
                création d\'applications réactives et conviviales avec un code propre.
              </p>

              {/* Hover content */}
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm p-6 flex flex-col justify-center items-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                <div className="grid grid-cols-1 gap-2 mb-4 w-full">
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Analyse des systèmes</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Développement backend</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Gestion de l’équipe technique</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Programmation embarquée (ESP32)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Intégration backend / frontend</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Hébergement de projet (cloud / VPS)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Gestion de version avec Git et GitHub</span>
                  </div>
                </div>

                <div className="flex justify-center space-x-3">
                  <Link href="https://kiaa-khalid.vercel.app/" className="text-gray-500 hover:text-blue-600">
                    <Briefcase className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/khalid-kiaa-bitkal/"
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link href="https://wa.me/+212624617827" className="text-gray-500 hover:text-blue-600">
                    <MessageCircle className="h-5 w-5" />
                  </Link>
                  <Link href="mailto:kiaakhalid4@gmail.com" className="text-gray-500 hover:text-blue-600">
                    <Mail className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Team Member 2 - Thomas Dubois */}
            <motion.div
              variants={scaleIn}
              className="flex flex-col items-center space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm bg-white group relative h-[400px] overflow-hidden md:col-span-2 lg:col-span-1 lg:order-1"
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100">
                <Image src="/placeholder.svg?height=128&width=128" alt="Thomas Dubois" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Thomas Dubois</h3>
              <p className="text-blue-600 font-medium">Ingénieur IoT</p>
              <p className="text-center text-gray-600">
                Spécialiste des systèmes embarqués et de la triangulation ESP32 pour la détection de présence.
              </p>

              {/* Hover content */}
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm p-6 flex flex-col justify-center items-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                <h3 className="text-xl font-bold text-gray-800 mt-4">Thomas Dubois</h3>
                <p className="text-blue-600 font-medium mb-2">Ingénieur IoT</p>
                <p className="text-center text-gray-600 mb-4">
                  Spécialiste des systèmes embarqués et de la triangulation ESP32 pour la détection de présence. Expert
                  en développement de solutions IoT avec 8 ans d\'expérience dans le secteur.
                </p>
                <div className="flex justify-center space-x-3">
                  <Link href="#" className="text-gray-500 hover:text-blue-600">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-blue-600">
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-blue-600">
                    <Globe className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Team Member 3 - Léa Nguyen */}
            <motion.div
              variants={scaleIn}
              className="flex flex-col items-center space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm bg-white group relative h-[400px] overflow-hidden md:col-span-3 lg:col-span-1 lg:order-3"
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100">
                <Image src="/placeholder.svg?height=128&width=128" alt="Léa Nguyen" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Léa Nguyen</h3>
              <p className="text-blue-600 font-medium">Développeuse Full-Stack</p>
              <p className="text-center text-gray-600">
                Experte en développement d\'interfaces utilisateur intuitives et de systèmes backend robustes.
              </p>

              {/* Hover content */}
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm p-6 flex flex-col justify-center items-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                <h3 className="text-xl font-bold text-gray-800 mt-4">Léa Nguyen</h3>
                <p className="text-blue-600 font-medium mb-2">Développeuse Full-Stack</p>
                <p className="text-center text-gray-600 mb-4">
                  Experte en développement d\'interfaces utilisateur intuitives et de systèmes backend robustes.
                  Contributrice active à plusieurs projets open-source et passionnée par les technologies web modernes.
                </p>
                <div className="flex justify-center space-x-3">
                  <Link href="#" className="text-gray-500 hover:text-blue-600">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-blue-600">
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-blue-600">
                    <Globe className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Team Member 4 - Alexandre Moreau */}
            <motion.div
              variants={scaleIn}
              className="flex flex-col items-center space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm bg-white group relative h-[400px] overflow-hidden md:col-span-2 lg:col-span-1 lg:order-4 lg:col-start-2 lg:mx-auto"
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Alexandre Moreau"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Alexandre Moreau</h3>
              <p className="text-blue-600 font-medium">Data Scientist</p>
              <p className="text-center text-gray-600">
                Spécialiste en machine learning et analyse de données pour l\'optimisation des algorithmes de détection.
              </p>

              {/* Hover content */}
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm p-6 flex flex-col justify-center items-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                <h3 className="text-xl font-bold text-gray-800 mt-4">Alexandre Moreau</h3>
                <p className="text-blue-600 font-medium mb-2">Data Scientist</p>
                <p className="text-center text-gray-600 mb-4">
                  Spécialiste en machine learning et analyse de données pour l\'optimisation des algorithmes de
                  détection. Titulaire d\'un doctorat en intelligence artificielle et auteur de plusieurs publications
                  scientifiques.
                </p>
                <div className="flex justify-center space-x-3">
                  <Link href="#" className="text-gray-500 hover:text-blue-600">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-blue-600">
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-blue-600">
                    <Globe className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Team Member 5 - Julie Lambert */}
            <motion.div
              variants={scaleIn}
              className="flex flex-col items-center space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm bg-white group relative h-[400px] overflow-hidden md:col-span-3 lg:col-span-1 lg:order-5 lg:mx-auto"
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100">
                <Image src="/placeholder.svg?height=128&width=128" alt="Julie Lambert" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Julie Lambert</h3>
              <p className="text-blue-600 font-medium">UX/UI Designer</p>
              <p className="text-center text-gray-600">
                Créatrice d\'expériences utilisateur fluides et intuitives pour maximiser l\'adoption du système.
              </p>

              {/* Hover content */}
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm p-6 flex flex-col justify-center items-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                <h3 className="text-xl font-bold text-gray-800 mt-4">Julie Lambert</h3>
                <p className="text-blue-600 font-medium mb-2">UX/UI Designer</p>
                <p className="text-center text-gray-600 mb-4">
                  Créatrice d\'expériences utilisateur fluides et intuitives pour maximiser l\'adoption du système. Formée
                  aux méthodes de design thinking et spécialiste de l\'accessibilité numérique.
                </p>
                <div className="flex justify-center space-x-3">
                  <Link href="#" className="text-gray-500 hover:text-blue-600">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-blue-600">
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-blue-600">
                    <Globe className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}