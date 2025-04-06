import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="relative flex items-center">
            <div className="flex items-center">
              <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mr-1">
                SI
              </div>
              <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                GAP
              </div>
            </div>
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-700"></div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="hidden md:inline-flex text-sm font-medium transition-colors hover:text-blue-600"
          >
            Contact
          </Link>
          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            Télécharger
          </Button>
          <Link href="/login" passHref>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
              Connexion
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}