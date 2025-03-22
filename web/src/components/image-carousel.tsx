"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

const carouselImages = [
  {
    src: "/images/device-detection.jpg",
    alt: "Détection des appareils",
    title: "Détection des appareils",
    description: "Identifiez automatiquement les présences via la technologie WiFi",
  },
  {
    src: "/images/dashboard.jpg",
    alt: "Tableau de bord",
    title: "Tableau de bord",
    description: "Visualisez toutes les données de présence en un coup d'œil",
  },
  {
    src: "/images/absence-management.jpg",
    alt: "Gestion des absences",
    title: "Gestion des absences",
    description: "Gérez facilement les absences et les justificatifs",
  },
  {
    src: "/images/reports.jpg",
    alt: "Rapports et statistiques",
    title: "Rapports et statistiques",
    description: "Analysez les tendances et générez des rapports détaillés",
  },
]

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fonction pour passer à la diapositive suivante
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1))
  }

  // Fonction pour passer à la diapositive précédente
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1))
  }

  // Défilement automatique
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide()
    }, 4000) // 4 secondes par image

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div className="flex" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {carouselImages.map((image, index) => (
            <div key={index} className="min-w-full">
              <Card className="overflow-hidden border-0">
                <div className="relative aspect-video">
                  <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent flex flex-col justify-end p-6 text-white">
                    <h3 className="font-bold text-xl mb-2">{image.title}</h3>
                    <p className="text-white/90 text-sm">{image.description}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white"
        aria-label="Précédent"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white"
        aria-label="Suivant"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-4 gap-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn("w-3 h-3 rounded-full", index === currentIndex ? "bg-green-600" : "bg-gray-300")}
            aria-label={`Aller à la diapositive ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

