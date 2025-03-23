"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerifyCodePage() {
  const router = useRouter()
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")

  // Vérifier l'email au chargement de la page
  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail")

    if (!storedEmail) {
      router.push("/email-verifier")
    }
  }, [router])


  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const enteredCode = code.join("")
    const storedCode = localStorage.getItem("resetCode")
    const storedTimestamp = localStorage.getItem("resetCodeTimestamp")

    // Vérifier si le code a expiré (60 minutes = 3600000 millisecondes)
    const currentTime = Date.now()
    const expirationTime = 60 * 60 * 1000 // 60 minutes en millisecondes
    if (storedTimestamp && currentTime - parseInt(storedTimestamp) > expirationTime) {
      setError("Le code a expiré. Veuillez demander un nouveau code.")
      localStorage.removeItem("resetCode")
      localStorage.removeItem("resetEmail")
      localStorage.removeItem("resetCodeTimestamp")
      return
    }

    if (enteredCode === storedCode) {
      localStorage.removeItem("resetCode")
      localStorage.removeItem("resetCodeTimestamp")
      router.push("/reset-password")
    } else {
      setError("Code incorrect. Veuillez réessayer.")
    }
  }

  const email = localStorage.getItem("resetEmail") || "votre email"

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-light to-secondary-light px-4 py-12">
      <Card className="w-full max-w-md border-t-4 border-t-primary shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-primary">Reset Password</CardTitle>
          <CardDescription>
            Please enter the password reset code below that was sent to {email}.
          </CardDescription>
          <p className="text-sm text-primary hover:text-primary-hover">
            Didn't receive instructions?{" "}
            <Link href="#" className="underline hover:text-primary-hover">
              Try different method
            </Link>
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="code-0" className="block text-sm font-medium text-gray-700">
                  Code
                </label>
                <div className="flex justify-between gap-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="h-12 w-12 rounded-md border border-gray-300 bg-white text-center text-lg shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  ))}
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white">
                Reset Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}