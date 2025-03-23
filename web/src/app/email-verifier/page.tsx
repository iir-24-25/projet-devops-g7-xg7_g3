"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RequestResetPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateEmail(email)) {
      setError("Veuillez entrer une adresse email valide.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`http://localhost:8080/reset-password?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const code = await response.json()

      if (response.ok && code !== -1) {
        localStorage.setItem("resetCode", code)
        localStorage.setItem("resetEmail", email)
        localStorage.setItem("resetCodeTimestamp", Date.now().toString())

        setSuccess("Un code de réinitialisation a été envoyé à votre adresse email.")
        setTimeout(() => router.push("/verify"), 2000) // Redirection après 2s
      } else {
        setError("Email non reconnu. Veuillez vérifier votre adresse email.")
      }
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-light to-secondary-light px-4 py-12">
      <Card className="w-full max-w-md border-t-4 border-t-primary shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-primary">Réinitialisation de mot de passe</CardTitle>
          <CardDescription>Entrez votre adresse email pour recevoir un code de réinitialisation.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-hover text-white"
                disabled={isLoading}
              >
                {isLoading ? "Envoi en cours..." : "Envoyer le code"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/login" className="text-sm text-primary hover:text-primary-hover hover:underline">
            Retour à la connexion
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
