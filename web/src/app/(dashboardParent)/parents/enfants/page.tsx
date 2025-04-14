"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { GraduationCap, MapPin, User, Download, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import html2canvas from "html2canvas"
import { useToast } from "@/hooks/use-toast-parent"

export default function EnfantsPage() {
  const { toast } = useToast()
  const [isDownloading, setIsDownloading] = useState(false)
  const [currentWeek, setCurrentWeek] = useState("10 au 16 avril 2023")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      setTimeout(async () => {
        const activeTab = document.querySelector('[role="tabpanel"][data-state="active"]')
        const element = activeTab?.querySelector('[id^="timetable-to-download"]')
        if (!element) {
          throw new Error("Élément non trouvé")
        }
        if (!(element instanceof HTMLElement)) {
          throw new Error("L'élément n'est pas un HTMLElement")
        }

        const canvas = await html2canvas(element, {
          scale: 2,
          backgroundColor: "#ffffff",
          logging: false,
          useCORS: true,
          allowTaint: true,
        })

        const image = canvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.href = image
        link.download = `emploi-du-temps-${currentWeek.replace(/ /g, "-")}.png`
        link.click()

        toast({
          title: "Téléchargement réussi",
          description: "L'emploi du temps a été téléchargé avec succès.",
        })
      }, 100)
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error)
      toast({
        title: "Erreur de téléchargement",
        description: "Une erreur est survenue lors du téléchargement de l'emploi du temps.",
        variant: "destructive",
      })
    } finally {
      setTimeout(() => setIsDownloading(false), 1000)
    }
  }

  const handlePreviousWeek = () => {
    setCurrentWeek("3 au 9 avril 2023")
    toast({
      title: "Semaine précédente",
      description: "Affichage de la semaine du 3 au 9 avril 2023",
    })
  }

  const handleNextWeek = () => {
    setCurrentWeek("17 au 23 avril 2023")
    toast({
      title: "Semaine suivante",
      description: "Affichage de la semaine du 17 au 23 avril 2023",
    })
  }

  return (
    <motion.div className="space-y-8 p-6" variants={container} initial="hidden" animate="show">
      {/* Page Title */}
      <motion.h1
        variants={item}
        className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"
      >
        My Children
      </motion.h1>

      {/* Tabs for Children */}
      <Tabs defaultValue="thomas">
        <TabsList className="grid h-15 w-full grid-cols-2 gap-3 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl mb-10">
          <TabsTrigger
            value="thomas"
            className="rounded-xl py-3 px-4 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg dark:data-[state=active]:from-blue-700 dark:data-[state=active]:to-indigo-700"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=42&width=42" alt="Thomas Dupont" />
                <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  TD
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">Thomas Dupont</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="sophie"
            className="rounded-xl py-3 px-4 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg dark:data-[state=active]:from-pink-700 dark:data-[state=active]:to-purple-700"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sophie Dupont" />
                <AvatarFallback className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                  SD
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">Sophie Dupont</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Thomas Tab Content */}
        <TabsContent value="thomas" className="space-y-8">
          {/* Profile Card */}
          <motion.div variants={item}>
            <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="pb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
                    <AvatarImage src="/placeholder.svg?height=120&width=120" alt="Thomas Dupont" />
                    <AvatarFallback className="bg-white/20 text-white text-2xl">TD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <CardTitle className="text-3xl font-semibold">Thomas Dupont</CardTitle>
                    <CardDescription className="text-lg text-white/90">Classe 3A</CardDescription>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center text-sm text-white/80">
                        <User className="mr-2 h-5 w-5" />
                        <span>ID: STD-3421</span>
                      </div>
                      <div className="flex items-center text-sm text-white/80">
                        <GraduationCap className="mr-2 h-5 w-5" />
                        <span>3ème année</span>
                      </div>
                      <div className="flex items-center text-sm text-white/80">
                        <MapPin className="mr-2 h-5 w-5" />
                        <span>Groupe A</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:ml-auto">
                    <Link href="/dashboard/presences">
                      <Button className="bg-white text-blue-600 hover:bg-blue-100 transition-colors">
                        View Attendance
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Personal Info and Absences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={item}>
              <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <dl className="space-y-3 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-blue-500" />
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of birth</dt>
                        <dd className="text-base">15 Juin 2012</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</dt>
                        <dd className="text-base">123 Rue des Écoles, 75001 Paris</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-blue-500" />
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Emergency phone</dt>
                        <dd className="text-base">+33 6 12 34 56 78</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-blue-500" />
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Blood type</dt>
                        <dd className="text-base">A+</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-blue-500" />
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Allergies</dt>
                        <dd className="text-base">Arachides</dd>
                      </div>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                    Justifications and Absences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-700 dark:text-gray-300">Total absences</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">8 jours</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full" style={{ width: "100%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-700 dark:text-gray-300">Justified absences</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">5 jours</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{ width: "62.5%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-700 dark:text-gray-300">Unjustified absences</span>
                        <span className="font-semibold text-red-600 dark:text-red-400">3 jours</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 h-3 rounded-full" style={{ width: "37.5%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link href="/dashboard/presences">
                      <Button variant="outline" className=" mt-11 w-full text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20">
                        View All Absences
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Schedule Section */}
          <motion.div variants={item}>
            <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                    <Calendar className="mr-2 h-6 w-6 text-blue-600" />
                    Schedule
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Week of {currentWeek}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                  >
                    {isDownloading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Téléchargement...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-5 w-5" />
                        Download
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div id="timetable-to-download" className="min-w-full bg-white dark:bg-gray-900 p-5 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mr-3"></div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Cours actif</span>
                      </div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Année scolaire 2022-2023</div>
                    </div>

                    <div className="grid grid-cols-7 gap-3">
                      {/* Header Row */}
                      <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg flex items-center justify-center">
                        <div className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Horaire</div>
                      </div>
                      {[
                        { num: "1", time: "8h30 à 10h00" },
                        { num: "2", time: "10h15 à 11h45" },
                        { num: "3", time: "12h00 à 13h30" },
                        { num: "4", time: "14h00 à 15h30" },
                        { num: "5", time: "15h45 à 17h15" },
                        { num: "6", time: "17h30 à 19h00" },
                      ].map((seance) => (
                        <div key={seance.num} className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg text-center">
                          <div className="text-blue-600 dark:text-blue-400 font-semibold">Séance {seance.num}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{seance.time}</div>
                        </div>
                      ))}

                      {/* Lundi */}
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">Lundi</span>
                      </div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Management</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre Salle A1</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Ahmed</span>
                          </div>
                          <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-300"></div>
                        </div>
                      </div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Datawerhouse</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre LR</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Karim</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-violet-400 to-purple-400 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Administration Windows</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre LR</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Youssef</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>

                      {/* Mardi */}
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">Mardi</span>
                      </div>
                      <div className="p-2 col-span-2 relative group">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Programmation mobile</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Guéliz LI 31</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Nada</span>
                          </div>
                          <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-300"></div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Anglais B</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Guéliz Salle 303</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Sarah</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>

                      {/* Mercredi */}
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">Mercredi</span>
                      </div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">J2EE1 (Struts, Hibernate)</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre LI4</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Mohammed</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">PFA</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Guéliz Salle 201</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Rachid</span>
                          </div>
                          <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-300"></div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>

                      {/* Jeudi */}
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">Jeudi</span>
                      </div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Entrepreneuriat</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre Salle A1</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Fatima</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">BIG DATA</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre LI 4</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Hassan</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>

                      {/* Vendredi */}
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">Vendredi</span>
                      </div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Génie Logiciel</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre Salle D2</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Laila</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-purple-500 to-violet-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">DEVOPS</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre LI 1</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Jamal</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>

                      {/* Samedi */}
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">Samedi</span>
                      </div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Communication...</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre Salle B3</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Amina</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Virtualisation</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre LI 1</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Kamal</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Administration ORACLE2</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre LR</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Samir</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Dernière mise à jour: 12/04/2023</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Teachers Section */}
          <motion.div variants={item}>
            <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                  Teachers
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">List of Thomas's teachers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    { name: "M. Dubois", subject: "Mathématiques", email: "dubois@ecole.fr", room: "A102" },
                    { name: "Mme Martin", subject: "Français", email: "martin@ecole.fr", room: "B201" },
                    { name: "M. Bernard", subject: "Sciences", email: "bernard@ecole.fr", room: "C305" },
                    { name: "Mme Petit", subject: "Histoire", email: "petit@ecole.fr", room: "A104" },
                    { name: "M. Thomas", subject: "Anglais", email: "thomas@ecole.fr", room: "B205" },
                    { name: "M. Robert", subject: "Éducation Physique", email: "robert@ecole.fr", room: "Gymnase" },
                  ].map((teacher, index) => (
                    <div
                      key={index}
                      className="flex items-start p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarFallback
                          className={`text-white font-semibold ${
                            teacher.subject === "Mathématiques"
                              ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                              : teacher.subject === "Français"
                              ? "bg-gradient-to-r from-purple-500 to-violet-500"
                              : teacher.subject === "Sciences"
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : teacher.subject === "Histoire"
                              ? "bg-gradient-to-r from-amber-500 to-orange-500"
                              : teacher.subject === "Anglais"
                              ? "bg-gradient-to-r from-pink-500 to-rose-500"
                              : "bg-gradient-to-r from-red-500 to-pink-500"
                          }`}
                        >
                          {teacher.name.split(" ")[0][0]}
                          {teacher.name.split(" ")[1][0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-800 dark:text-white">{teacher.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{teacher.subject}</p>
                        <div className="flex flex-col text-xs text-gray-500 dark:text-gray-400">
                          <span>{teacher.email}</span>
                          <span>Salle: {teacher.room}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Sophie Tab Content */}
        <TabsContent value="sophie" className="space-y-8">
          {/* Profile Card */}
          <motion.div variants={item}>
            <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="pb-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-t-xl">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
                    <AvatarImage src="/placeholder.svg?height=120&width=120" alt="Sophie Dupont" />
                    <AvatarFallback className="bg-white/20 text-white text-2xl">SD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <CardTitle className="text-3xl font-semibold">Sophie Dupont</CardTitle>
                    <CardDescription className="text-lg text-white/90">Classe 5B</CardDescription>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center text-sm text-white/80">
                        <User className="mr-2 h-5 w-5" />
                        <span>ID: STD-4532</span>
                      </div>
                      <div className="flex items-center text-sm text-white/80">
                        <GraduationCap className="mr-2 h-5 w-5" />
                        <span>5ème année</span>
                      </div>
                      <div className="flex items-center text-sm text-white/80">
                        <MapPin className="mr-2 h-5 w-5" />
                        <span>Groupe B</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:ml-auto">
                    <Link href="/dashboard/presences">
                      <Button className="bg-white text-pink-600 hover:bg-pink-100 transition-colors">
                        View Attendance
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Personal Info and Absences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={item}>
              <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <dl className="space-y-3 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-pink-500" />
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of birth</dt>
                        <dd className="text-base">23 Mars 2010</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-pink-500" />
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</dt>
                        <dd className="text-base">123 Rue des Écoles, 75001 Paris</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-pink-500" />
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Emergency phone</dt>
                        <dd className="text-base">+33 6 12 34 56 78</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-pink-500" />
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Blood type</dt>
                        <dd className="text-base">O+</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-pink-500" />
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Allergies</dt>
                        <dd className="text-base">Aucune</dd>
                      </div>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                    Justifications and Absences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-700 dark:text-gray-300">Total absences</span>
                        <span className="font-semibold text-pink-600 dark:text-pink-400">2 jours</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full" style={{ width: "100%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-700 dark:text-gray-300">Justified absences</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">2 jours</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{ width: "100%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-700 dark:text-gray-300">Unjustified absences</span>
                        <span className="font-semibold text-red-600 dark:text-red-400">0 jours</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 h-3 rounded-full" style={{ width: "0%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link href="/dashboard/presences">
                      <Button variant="outline" className="w-full text-pink-600 border-pink-600 hover:bg-pink-50 dark:text-pink-400 dark:border-pink-400 dark:hover:bg-pink-900/20">
                        View All Absences
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Schedule Section */}
          <motion.div variants={item}>
            <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-xl bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                    <Calendar className="mr-2 h-6 w-6 text-pink-600" />
                    Schedule
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Week of {currentWeek}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={handlePreviousWeek} className="text-pink-600 border-pink-600 hover:bg-pink-50">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleNextWeek} className="text-pink-600 border-pink-600 hover:bg-pink-50">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700"
                  >
                    {isDownloading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Téléchargement...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-5 w-5" />
                        Download
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div id="timetable-to-download-sophie" className="min-w-full bg-white dark:bg-gray-900 p-5 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mr-3"></div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Cours actif</span>
                      </div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Année scolaire 2022-2023</div>
                    </div>

                    <div className="grid grid-cols-7 gap-3">
                      {/* Header Row */}
                      <div className="p-3 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center">
                        <div className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Horaire</div>
                      </div>
                      {[
                        { num: "1", time: "8h30 à 10h00" },
                        { num: "2", time: "10h15 à 11h45" },
                        { num: "3", time: "12h00 à 13h30" },
                        { num: "4", time: "14h00 à 15h30" },
                        { num: "5", time: "15h45 à 17h15" },
                        { num: "6", time: "17h30 à 19h00" },
                      ].map((seance) => (
                        <div key={seance.num} className="p-3 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-lg text-center">
                          <div className="text-pink-600 dark:text-pink-400 font-semibold">Séance {seance.num}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{seance.time}</div>
                        </div>
                      ))}

                      {/* Lundi */}
                      <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-pink-600 dark:text-pink-400 font-semibold">Lundi</span>
                      </div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Management</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre Salle A1</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Ahmed</span>
                          </div>
                          <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-300"></div>
                        </div>
                      </div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Datawerhouse</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre LR</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Karim</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-violet-400 to-purple-400 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Administration Windows</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre LR</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Youssef</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>

                      {/* Mardi */}
                      <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-pink-600 dark:text-pink-400 font-semibold">Mardi</span>
                      </div>
                      <div className="p-2 col-span-2 relative group">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Programmation mobile</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Guéliz LI 31</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Nada</span>
                          </div>
                          <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-300"></div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Anglais B</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Guéliz Salle 303</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Sarah</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>

                      {/* Mercredi */}
                      <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-pink-600 dark:text-pink-400 font-semibold">Mercredi</span>
                      </div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">J2EE1 (Struts, Hibernate)</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre LI4</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Mohammed</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">PFA</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Guéliz Salle 201</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Rachid</span>
                          </div>
                          <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-300"></div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>

                      {/* Jeudi */}
                      <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-pink-600 dark:text-pink-400 font-semibold">Jeudi</span>
                      </div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Entrepreneuriat</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre Salle A1</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Fatima</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">BIG DATA</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre LI 4</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Hassan</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>

                      {/* Vendredi */}
                      <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-pink-600 dark:text-pink-400 font-semibold">Vendredi</span>
                      </div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Génie Logiciel</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre Salle D2</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Laila</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-purple-500 to-violet-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">DEVOPS</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre LI 1</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Jamal</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>

                      {/* Samedi */}
                      <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-pink-600 dark:text-pink-400 font-semibold">Samedi</span>
                      </div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Communication...</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre Salle B3</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Amina</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Virtualisation</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre LI 1</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Kamal</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 relative group">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-lg h-full shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                          <div className="font-semibold">Administration ORACLE2</div>
                          <div className="text-xs flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-white/80" />
                            <span>Centre LR</span>
                          </div>
                          <div className="text-xs flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-white/80" />
                            <span>Prof: Samir</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"></div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Dernière mise à jour: 12/04/2023</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Teachers Section */}
          <motion.div variants={item}>
            <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                  Teachers
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">List of Sophie's teachers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    { name: "M. Dubois", subject: "Mathématiques", email: "dubois@ecole.fr", room: "A102" },
                    { name: "Mme Martin", subject: "Français", email: "martin@ecole.fr", room: "B201" },
                    { name: "M. Bernard", subject: "Sciences", email: "bernard@ecole.fr", room: "C305" },
                    { name: "Mme Petit", subject: "Histoire", email: "petit@ecole.fr", room: "A104" },
                    { name: "M. Thomas", subject: "Anglais", email: "thomas@ecole.fr", room: "B205" },
                    { name: "M. Robert", subject: "Éducation Physique", email: "robert@ecole.fr", room: "Gymnase" },
                  ].map((teacher, index) => (
                    <div
                      key={index}
                      className="flex items-start p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarFallback
                          className={`text-white font-semibold ${
                            teacher.subject === "Mathématiques"
                              ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                              : teacher.subject === "Français"
                              ? "bg-gradient-to-r from-purple-500 to-violet-500"
                              : teacher.subject === "Sciences"
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : teacher.subject === "Histoire"
                              ? "bg-gradient-to-r from-amber-500 to-orange-500"
                              : teacher.subject === "Anglais"
                              ? "bg-gradient-to-r from-pink-500 to-rose-500"
                              : "bg-gradient-to-r from-red-500 to-pink-500"
                          }`}
                        >
                          {teacher.name.split(" ")[0][0]}
                          {teacher.name.split(" ")[1][0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-800 dark:text-white">{teacher.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{teacher.subject}</p>
                        <div className="flex flex-col text-xs text-gray-500 dark:text-gray-400">
                          <span>{teacher.email}</span>
                          <span>Salle: {teacher.room}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}