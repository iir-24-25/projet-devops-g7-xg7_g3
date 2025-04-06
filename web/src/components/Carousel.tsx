"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"

interface CarouselImage {
  src: string
  alt: string
  title: string
  description: string
}

interface CarouselProps {
  images: CarouselImage[]
}

export function Carousel({ images }: CarouselProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  const goToImage = (index: number) => setCurrentImage(index)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])
  

  return (
    <div className="relative hidden md:block h-full">
      <button 
        onClick={prevImage}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-black/20 hover:bg-black/30 text-white p-1 rounded-full"
        aria-label="Image précédente"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      <button 
        onClick={nextImage}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-black/20 hover:bg-black/30 text-white p-1 rounded-full"
        aria-label="Image suivante"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      
      <div className="relative h-full">
        {images.map((image, index) => (
          <div 
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-500 ease-in-out",
              currentImage === index ? "opacity-100 z-20" : "opacity-0 z-10"
            )}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/60 via-black/40 to-transparent">
              <h3 className="text-2xl font-bold mb-1">{image.title}</h3>
              <p className="text-sm text-white/90">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              currentImage === index ? "bg-white" : "bg-white/50"
            )}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}