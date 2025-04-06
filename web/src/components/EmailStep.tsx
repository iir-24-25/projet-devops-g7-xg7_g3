"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail } from 'lucide-react'
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

interface StepProps {
  step: number
  currentStep: number
  direction: "next" | "prev"
  isAnimating: boolean
  onNext: () => void
  email: string
  setEmail: (email: string) => void
}

export function EmailStep({ 
  step, 
  currentStep, 
  direction, 
  isAnimating, 
  onNext,
  email,
  setEmail
}: StepProps) {
  const getStepClassName = () => {
    if (step === currentStep) return "opacity-100 translate-x-0 scale-100 z-20"
    
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
    <div 
      className={`space-y-6 transition-all duration-400 ease-in-out w-full ${getStepClassName()} ${
        isAnimating ? "pointer-events-none" : ""
      }`}
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
          onClick={onNext}
          disabled={!email}
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
  )
}