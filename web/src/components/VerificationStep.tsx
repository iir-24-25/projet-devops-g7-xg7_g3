"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useRef } from "react"

interface VerificationStepProps {
  step: number
  currentStep: number
  direction: "next" | "prev"
  isAnimating: boolean
  onNext: () => void
  onPrev: () => void
  email: string
  verificationCode: string[]
  setVerificationCode: (code: string[]) => void
}

export function VerificationStep({
  step,
  currentStep,
  direction,
  isAnimating,
  onNext,
  onPrev,
  email,
  verificationCode,
  setVerificationCode
}: VerificationStepProps) {
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleCodeChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return

    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)

    if (value && index < 4) {
      codeInputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
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
    
    if (digits.length < 5) {
      codeInputRefs.current[digits.length]?.focus()
    }
  }

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
              ref={(el) => { codeInputRefs.current[index] = el }}
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
          onClick={onPrev}
        >
          Retour
        </Button>
        <Button 
          className="h-12 flex-1 bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          onClick={onNext}
          disabled={verificationCode.some(digit => !digit)}
        >
          Vérifier
        </Button>
      </div>
    </div>
  )
}