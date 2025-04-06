// components/PasswordStep.tsx
"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Check, Lock } from 'lucide-react'
import { cn } from "@/lib/utils"

interface PasswordStepProps {
  step: number
  currentStep: number
  direction: "next" | "prev"
  isAnimating: boolean
  onPrev: () => void
  password: string
  setPassword: (password: string) => void
  confirmPassword: string
  setConfirmPassword: (password: string) => void
}

export function PasswordStep({
  step,
  currentStep,
  direction,
  isAnimating,
  onPrev,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword
}: PasswordStepProps) {
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

  const isPasswordValid = (
    password.length >= 8 && 
    /[A-Z]/.test(password) && 
    /[0-9]/.test(password) && 
    password === confirmPassword
  )

  return (
    <div 
      className={`space-y-6 transition-all duration-400 ease-in-out w-full ${getStepClassName()} ${
        isAnimating ? "pointer-events-none" : ""
      }`}
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
          onClick={onPrev}
        >
          Retour
        </Button>
        <Button 
          className="h-12 flex-1 bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          disabled={!isPasswordValid}
        >
          Réinitialiser le mot de passe
        </Button>
      </div>
    </div>
  )
}