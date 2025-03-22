import { Button } from "@/components/ui/button"
import { ImageCarousel } from "@/components/image-carousel"
import { BenefitCard } from "@/components/benefit-card"
import { Download, LogIn, Wifi, Brain, Lock, BarChart3 } from "lucide-react"

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-green-50 to-white">
      {/* Header avec couleurs améliorées */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-green-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
                <path d="m9 16 2 2 4-4" />
              </svg>
            </div>
            <span className="text-xl font-bold text-green-600">AbsenceValidator</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2 border-green-200 hover:bg-green-50">
              <Download size={18} className="text-green-600" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <LogIn size={18} />
              <span className="hidden sm:inline">Login</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-700">Solution de Validation des Absences</h1>
            <p className="text-lg max-w-2xl mx-auto text-gray-600 mb-8">
              Notre solution de validation des absences utilise la triangulation WiFi et l'IA pour automatiser le suivi
              des présences en toute sécurité et fiabilité.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="px-8 bg-green-600 hover:bg-green-700">
                Commencer
              </Button>
            </div>
            <div className="mt-12">
              <img
                src="/images/hero-image.jpg"
                alt="Validation des absences"
                className="rounded-xl shadow-xl max-w-3xl mx-auto w-full"
              />
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3 text-green-700">Comment ça fonctionne</h2>
              <p className="text-xl text-yellow-600 font-semibold mb-2">Smart Absence Validation</p>
              <div className="w-20 h-1 mx-auto bg-green-500 rounded-full"></div>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="relative aspect-video bg-white rounded-xl overflow-hidden shadow-xl">
                {/* Image de présentation de la vidéo */}
                <img
                  src="/images/video-preview.jpg"
                  alt="Vidéo de présentation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-green-900/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Points clés sous la vidéo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <div className="bg-white p-4 rounded-lg shadow-md border border-green-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                      1
                    </div>
                    <h3 className="font-semibold text-green-800">Détection</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Détection automatique des appareils via triangulation WiFi</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border border-yellow-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold">
                      2
                    </div>
                    <h3 className="font-semibold text-yellow-800">Analyse</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Traitement des données par notre algorithme d'IA avancé</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border border-green-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                      3
                    </div>
                    <h3 className="font-semibold text-green-800">Validation</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Confirmation automatique des présences et gestion des exceptions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3 text-green-700">Fonctionnalités</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explorez les fonctionnalités qui font de notre solution un outil indispensable pour la gestion des
                présences.
              </p>
              <div className="w-20 h-1 mx-auto mt-4 bg-yellow-500 rounded-full"></div>
            </div>
            <ImageCarousel />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3 text-green-700">Avantages</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Notre solution offre de nombreux avantages pour simplifier et sécuriser la gestion des présences.
              </p>
              <div className="w-20 h-1 mx-auto mt-4 bg-green-500 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <BenefitCard
                icon={<Wifi className="h-10 w-10 text-green-600" />}
                title="Détection automatique"
                description="Des présences via WiFi sans intervention manuelle"
                colorClass="green"
              />
              <BenefitCard
                icon={<Brain className="h-10 w-10 text-yellow-600" />}
                title="Intelligence artificielle"
                description="Pour une précision et fiabilité optimales"
                colorClass="yellow"
              />
              <BenefitCard
                icon={<Lock className="h-10 w-10 text-green-600" />}
                title="Respect de la vie privée"
                description="Conformité aux réglementations en vigueur"
                colorClass="green"
              />
              <BenefitCard
                icon={<BarChart3 className="h-10 w-10 text-yellow-600" />}
                title="Tableaux de bord interactifs"
                description="Pour un suivi des absences en temps réel"
                colorClass="yellow"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-300"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                    <path d="m9 16 2 2 4-4" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-green-300">AbsenceValidator</span>
              </div>
              <p className="text-gray-300">
                Solution innovante de validation des absences par triangulation WiFi et IA.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-green-300">Contact & Support</h3>
              <ul className="space-y-2">
                <li className="text-gray-300">+33 1 23 45 67 89</li>
                <li className="text-gray-300">support@absencevalidator.com</li>
                <li className="text-gray-300">FAQ & Aide</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-green-300">Réseaux sociaux</h3>
              <ul className="space-y-2">
                <li className="text-gray-300">LinkedIn</li>
                <li className="text-gray-300">Twitter</li>
                <li className="text-gray-300">Facebook</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-green-300">Mentions légales</h3>
              <ul className="space-y-2">
                <li className="text-gray-300">Conditions d'utilisation</li>
                <li className="text-gray-300">Politique de confidentialité</li>
                <li className="text-gray-300">Conformité RGPD</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-green-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} AbsenceValidator. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

