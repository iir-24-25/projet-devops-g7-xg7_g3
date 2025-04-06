"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Mail, ChevronLeft, ChevronRight, Check, Lock } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const carouselImages = [
  {
    src: "/images/academicExcellence.webp",
    alt: "Campus virtuel",
    title: "Apprentissage Virtuel",
    description: "Salles de classe numériques interactives pour l&apos;éducation à distance"
  },
  {
    src: "/images/VirtualLearning.jpg",
    alt: "Collaboration en ligne",
    title: "Collaboration Globale",
    description: "Connectez-vous avec des experts et des étudiants du monde entier"
  },
  {
    src: "/images/modernCampusExperience.jpeg",
    alt: "Technologie éducative",
    title: "Technologie Avancée",
    description: "Accédez aux outils d&apos;apprentissage les plus innovants"
  }
]

export default function ForgotPassword() {
  const [currentImage, setCurrentImage] = useState(0)
  const [currentStep, setCurrentStep] = useState(1)
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", ""])
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<"next" | "prev">("next")
  
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % carouselImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const goToNextStep = () => {
    setDirection("next")
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, 3))
      setIsAnimating(false)
    }, 400)
  }

  const goToPreviousStep = () => {
    setDirection("prev")
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentStep(prev => Math.max(prev - 1, 1))
      setIsAnimating(false)
    }, 400)
  }

  const handleCodeChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return

    const newCode = [...verificationCode]
    newCode[index] = value

    setVerificationCode(newCode)

    // Auto-focus next input
    if (value && index < 4) {
      codeInputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    const digits = pastedData.replace(/\D/g, "").split("").slice(0, 5)
    
    const newCode = [...verificationCode]
    digits.forEach((digit, index) => {
      if (index < 5) newCode[index] = digit
    })
    
    setVerificationCode(newCode)
    
    // Focus the appropriate input after paste
    if (digits.length < 5) {
      codeInputRefs.current[digits.length]?.focus()
    }
  }

  const getStepClassName = (step: number) => {
    if (step === currentStep) {
      return "opacity-100 translate-x-0 scale-100 z-20"
    }
    
    if (direction === "next") {
      return step < currentStep 
        ? "opacity-0 -translate-x-full scale-95 absolute z-10" 
        : "opacity-0 translate-x-full scale-95 absolute z-10"
    } else {
      return step > currentStep 
        ? "opacity-0 translate-x-full scale-95 absolute z-10" 
        : "opacity-0 -translate-x-full scale-95 absolute z-10"
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-5xl">
        <Card className="overflow-hidden border-0 shadow-xl">
          <div className="grid md:grid-cols-2">
            {/* Carousel Section */}
            <div className="relative hidden md:block h-full">
              {/* Navigation Arrows */}
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
              
              {/* Images */}
              <div className="relative h-full">
                {carouselImages.map((image, index) => (
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
              
              {/* Indicators */}
              <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center space-x-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-all",
                      currentImage === index ? "bg-white" : "bg-white/50"
                    )}
                    aria-label={`Aller à l&apos;image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Form Section */}
            <div className="p-4 sm:p-6 md:p-8 bg-white">
              <div className="flex flex-col h-full justify-center">
                {/* Progress Steps */}
                <div className="flex justify-between mb-8 relative">
                  <div className="absolute top-1/2 left-1 right-10 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
                  
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex flex-col items-center relative z-10">
                      <div 
                        className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium mb-2 transition-all duration-300",
                          currentStep === step 
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-200/50" 
                            : currentStep > step
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-400 border border-gray-200"
                        )}
                      >
                        {currentStep > step ? <Check className="h-5 w-5" /> : (
                          step === 1 ? <Mail className="h-5 w-5" /> : 
                          step === 2 ? <span className="text-lg">#</span> : 
                          <Lock className="h-5 w-5" />
                        )}
                      </div>
                      <span className={cn(
                        "text-xs font-medium transition-colors duration-300",
                        currentStep === step ? "text-gray-900" : "text-gray-500"
                      )}>
                        {step === 1 ? "Email" : step === 2 ? "Vérification" : "Mot de passe"}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="relative overflow-hidden">
                  {/* Step 1: Email */}
                  <div 
                    className={cn(
                      "space-y-6 transition-all duration-400 ease-in-out w-full",
                      getStepClassName(1),
                      isAnimating ? "pointer-events-none" : ""
                    )}
                  >
                    <div className="text-center mb-4">
                      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Récupération de compte</h1>
                      <p className="text-gray-600">Veuillez saisir votre adresse e-mail professionnelle ci-dessous</p>
                    </div>
                    
                    <Separator className="bg-gray-200" />
                    
                    <div className="space-y-2 pt-4">
                      <Label htmlFor="email" className="text-base font-medium text-gray-800">
                        Adresse e-mail
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="nom@entreprise.com" 
                          className="pl-10 h-12 border-0 bg-gray-100 focus:ring-0 shadow-sm"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required 
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Nous vous enverrons un code de vérification à cette adresse
                      </p>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        className="h-12 w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        onClick={goToNextStep}
                      >
                        Envoyer le code
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-center pt-4">
                      <Link 
                        href="/login" 
                        className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à la page de connexion
                      </Link>
                    </div>
                  </div>
                  
                  {/* Step 2: Verification Code */}
                  <div 
                    className={cn(
                      "space-y-6 transition-all duration-400 ease-in-out w-full",
                      getStepClassName(2),
                      isAnimating ? "pointer-events-none" : ""
                    )}
                  >
                    <div className="text-center mb-4">
                      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Vérification</h1>
                      <p className="text-gray-600">
                        Veuillez saisir le code à 5 chiffres envoyé à <span className="font-medium">{email || "votre adresse e-mail"}</span>
                      </p>
                    </div>
                    
                    <Separator className="bg-gray-200" />
                    
                    <div className="space-y-4 pt-4">
                      <Label htmlFor="verification-code" className="text-base font-medium text-gray-800 block text-center">
                        Code de vérification
                      </Label>
                      <div className="flex justify-center gap-2">
                        {verificationCode.map((digit, index) => (
                          <Input
                            key={index}
                            ref={(el: HTMLInputElement | null) => { codeInputRefs.current[index] = el }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            className="h-14 w-10 sm:w-12 text-center text-xl font-bold border-0 bg-gray-100 focus:ring-0 shadow-sm"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Vous n&apos;avez pas reçu de code ? <button className="text-blue-600 font-medium hover:text-blue-700">Renvoyer</button>
                      </p>
                    </div>
                    
                    <div className="pt-4 flex gap-4">
                      <Button 
                        variant="outline"
                        className="h-12 flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        onClick={goToPreviousStep}
                      >
                        Retour
                      </Button>
                      <Button 
                        className="h-12 flex-1 bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        onClick={goToNextStep}
                        disabled={verificationCode.some(digit => !digit)}
                      >
                        Vérifier
                      </Button>
                    </div>
                  </div>
                  
                  {/* Step 3: New Password */}
                  <div 
                    className={cn(
                      "space-y-6 transition-all duration-400 ease-in-out w-full",
                      getStepClassName(3),
                      isAnimating ? "pointer-events-none" : ""
                    )}
                  >
                    <div className="text-center mb-4">
                      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Nouveau mot de passe</h1>
                      <p className="text-gray-600">
                        Créez un nouveau mot de passe sécurisé pour votre compte
                      </p>
                    </div>
                    
                    <Separator className="bg-gray-200" />
                    
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password" className="text-base font-medium text-gray-800">
                          Nouveau mot de passe
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input 
                            id="new-password" 
                            type="password" 
                            placeholder="••••••••" 
                            className="pl-10 h-12 border-0 bg-gray-100 focus:ring-0 shadow-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-base font-medium text-gray-800">
                          Confirmer le mot de passe
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input 
                            id="confirm-password" 
                            type="password" 
                            placeholder="••••••••" 
                            className="pl-10 h-12 border-0 bg-gray-100 focus:ring-0 shadow-sm"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        <p className="text-sm font-medium text-gray-800">Exigences de sécurité :</p>
                        <ul className="text-xs space-y-1 text-gray-500">
                          <li className={cn("flex items-center gap-1", password.length >= 8 ? "text-green-600" : "")}>
                            <Check className={cn("h-3 w-3", password.length >= 8 ? "text-green-600" : "text-gray-300")} />
                            Au moins 8 caractères
                          </li>
                          <li className={cn("flex items-center gap-1", /[A-Z]/.test(password) ? "text-green-600" : "")}>
                            <Check className={cn("h-3 w-3", /[A-Z]/.test(password) ? "text-green-600" : "text-gray-300")} />
                            Au moins une majuscule
                          </li>
                          <li className={cn("flex items-center gap-1", /[0-9]/.test(password) ? "text-green-600" : "")}>
                            <Check className={cn("h-3 w-3", /[0-9]/.test(password) ? "text-green-600" : "text-gray-300")} />
                            Au moins un chiffre
                          </li>
                          <li className={cn("flex items-center gap-1", password === confirmPassword && password !== "" ? "text-green-600" : "")}>
                            <Check className={cn("h-3 w-3", password === confirmPassword && password !== "" ? "text-green-600" : "text-gray-300")} />
                            Les mots de passe correspondent
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex gap-4">
                      <Button 
                        variant="outline"
                        className="h-12 flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        onClick={goToPreviousStep}
                      >
                        Retour
                      </Button>
                      <Button 
                        className="h-12 flex-1 bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        disabled={
                          password.length < 8 || 
                          !(/[A-Z]/.test(password)) || 
                          !(/[0-9]/.test(password)) || 
                          password !== confirmPassword
                        }
                      >
                        Réinitialiser le mot de passe
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="text-center text-xs text-gray-500 mt-6">
          <p>© 2025. Tous droits réservés.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="#" className="hover:text-gray-700">Aide</Link>
            <Link href="#" className="hover:text-gray-700">Confidentialité</Link>
            <Link href="#" className="hover:text-gray-700">Conditions</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

