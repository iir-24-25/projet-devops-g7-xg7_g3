import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function ResetSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-light to-secondary-light px-4 py-12">
      <Card className="w-full max-w-md border-t-4 border-t-primary shadow-lg">
        <CardHeader className="space-y-1">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary-light border-2 border-secondary">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-center text-2xl font-bold text-primary">Mot de passe réinitialisé</CardTitle>
          <CardDescription className="text-center">Votre mot de passe a été réinitialisé avec succès</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600">Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.</p>
        </CardContent>
        <CardFooter>
          <Link href="/login" className="w-full">
            <Button className="w-full bg-primary hover:bg-primary-hover text-white">Se connecter</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

