"use client"

import { Mail, Check, Lock } from 'lucide-react'
import { cn } from "@/lib/utils"

interface ProgressStepsProps {
  currentStep: number
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = [
    {
      number: 1,
      label: "Email",
      icon: <Mail className="h-5 w-5" />
    },
    {
      number: 2,
      label: "Vérification",
      icon: <span className="text-lg">#</span>
    },
    {
      number: 3,
      label: "Mot de passe",
      icon: <Lock className="h-5 w-5" />
    }
  ]

  return (
    <div className="flex justify-between mb-8 relative">
      <div className="absolute top-1/2 left-1 right-10 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
      
      {steps.map((step) => (
        <div key={step.number} className="flex flex-col items-center relative z-10">
          <div 
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium mb-2 transition-all duration-300",
              currentStep === step.number 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200/50" 
                : currentStep > step.number
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-400 border border-gray-200"
            )}
          >
            {currentStep > step.number ? <Check className="h-5 w-5" /> : step.icon}
          </div>
          <span className={cn(
            "text-xs font-medium transition-colors duration-300",
            currentStep === step.number ? "text-gray-900" : "text-gray-500"
          )}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  )
}