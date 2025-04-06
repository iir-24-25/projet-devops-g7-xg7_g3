// app/forgot-password/page.tsx
"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Carousel } from "@/components/Carousel"
import { ProgressSteps } from "@/components/ProgressSteps"
import { EmailStep } from "@/components/EmailStep"
import { VerificationStep } from "@/components/VerificationStep"
import {PasswordStep} from "@/components/PasswordStep"

const carouselImages = [
  {
    src: "/images/academicExcellence.webp",
    alt: "Campus virtuel",
    title: "Apprentissage Virtuel",
    description: "Salles de classe numériques interactives pour l'éducation à distance"
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
    description: "Accédez aux outils d'apprentissage les plus innovants"
  }
]

export default function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<"next" | "prev">("next")
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", ""])
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-5xl">
        <Card className="overflow-hidden border-0 shadow-xl">
          <div className="grid md:grid-cols-2">
            <Carousel images={carouselImages} />
            
            <div className="p-4 sm:p-6 md:p-8 bg-white">
              <div className="flex flex-col h-full justify-center">
                <ProgressSteps currentStep={currentStep} />
                
                <div className="relative overflow-hidden">
                  <EmailStep 
                    step={1}
                    currentStep={currentStep}
                    direction={direction}
                    isAnimating={isAnimating}
                    onNext={goToNextStep}
                    email={email}
                    setEmail={setEmail}
                  />
                  
                  <VerificationStep
                    step={2}
                    currentStep={currentStep}
                    direction={direction}
                    isAnimating={isAnimating}
                    onNext={goToNextStep}
                    onPrev={goToPreviousStep}
                    email={email}
                    verificationCode={verificationCode}
                    setVerificationCode={setVerificationCode}
                  />
                  
                  <PasswordStep
                    step={3}
                    currentStep={currentStep}
                    direction={direction}
                    isAnimating={isAnimating}
                    onPrev={goToPreviousStep}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}