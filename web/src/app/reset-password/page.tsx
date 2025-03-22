"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Password validation
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères")
      return
    }

    if (!/[A-Z]/.test(password)) {
      setError("Le mot de passe doit contenir au moins une lettre majuscule")
      return
    }

    if (!/[0-9]/.test(password)) {
      setError("Le mot de passe doit contenir au moins un chiffre")
      return
    }

    if (!/[!@#$%^&*]/.test(password)) {
      setError("Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*)")
      return
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    // If all validations pass, proceed to success page
    router.push("/reset-success")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-light to-secondary-light px-4 py-12">
      <Card className="w-full max-w-md border-t-4 border-t-primary shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-primary">Définir un nouveau mot de passe</CardTitle>
          <CardDescription>Veuillez créer un nouveau mot de passe sécurisé pour votre compte</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Nouveau mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-300 focus:border-primary focus:ring-primary"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-primary hover:text-primary-hover"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  <span className="sr-only">
                    {showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  </span>
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, un chiffre et un caractère
                spécial.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-gray-700">
                Confirmer le mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-gray-300 focus:border-primary focus:ring-primary"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-primary hover:text-primary-hover"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  <span className="sr-only">
                    {showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  </span>
                </Button>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">{error}</div>
            )}

            <Button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white">
              Réinitialiser le mot de passe
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

