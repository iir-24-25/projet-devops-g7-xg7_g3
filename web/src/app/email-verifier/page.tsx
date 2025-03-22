import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RequestResetPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-light to-secondary-light px-4 py-12">
      <Card className="w-full max-w-md border-t-4 border-t-primary shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-primary">Réinitialisation de mot de passe</CardTitle>
          <CardDescription>Entrez votre adresse email pour recevoir un lien de réinitialisation</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/verify">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  className="border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white">
                Envoyer le lien
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
