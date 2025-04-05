import Link from "next/link"
import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="w-full bg-gray-50 border-t">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* À propos */}
          <div className="space-y-4">
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
            <p className="text-gray-600 text-sm">
              SIGAP révolutionne la gestion des présences grâce à l&apos;intelligence artificielle et la technologie ESP32,
              offrant une solution complète pour les entreprises et établissements scolaires.
            </p>
            <div className="flex space-x-3">
              <Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link href="#why" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Pourquoi SIGAP
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Télécharger
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Informations légales</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Conditions d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  RGPD
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                <span className="text-gray-600 text-sm">123 Avenue de l'Innovation, 75000 Paris, France</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <span className="text-gray-600 text-sm">+33 (0)1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="text-gray-600 text-sm">contact@sigap.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} SIGAP. Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Aide
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Support
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

