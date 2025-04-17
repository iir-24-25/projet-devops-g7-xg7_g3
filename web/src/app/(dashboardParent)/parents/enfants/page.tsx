"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { GraduationCap, MapPin, User, Download, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import html2canvas from "html2canvas"
import { useToast } from "@/hooks/use-toast-parent"
import React from "react"

interface Child {
  id: number
  nom: string
  prenom: string
  email: string
  tel: string
  gender: string
  niveau: string
  addressMAC: string
  filiere: string
  image: string | null
}

interface Schedule {
  titre: string
  salle: string
  nameGroup: string
  filiere: string
  niveau: string
  semestre: string
  jour: string
  seance: string
}

interface Absences {
  absenceNoJustif: number
  totalAbsence: number
  absenceJustif: number
}

export default function EnfantsPage() {
  const { toast } = useToast()
  const [isDownloading, setIsDownloading] = useState(false)
  const [currentWeek, setCurrentWeek] = useState<{ start: Date; end: Date } | null>(null)
  const [children, setChildren] = useState<Child[]>([])
  const [schedules, setSchedules] = useState<{ [key: string]: Schedule[] }>({})
  const [absences, setAbsences] = useState<{ [key: string]: Absences }>({})
  const [loading, setLoading] = useState(true)

  const idParent = localStorage.getItem("id")
  const token = localStorage.getItem("authToken")

  // Format date to DD/MM/YYYY
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  // Get week range (Monday to Sunday)
  const getWeekRange = (date: Date): { start: Date; end: Date } => {
    const start = new Date(date)
    const day = start.getDay()
    const diffToMonday = day === 0 ? -6 : 1 - day
    start.setDate(start.getDate() + diffToMonday)
    start.setHours(0, 0, 0, 0)

    const end = new Date(start)
    end.setDate(end.getDate() + 6)
    end.setHours(23, 59, 59, 999)

    return { start, end }
  }

  // Initialize current week
  useEffect(() => {
    const today = new Date()
    setCurrentWeek(getWeekRange(today))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (!idParent || !token) {
        toast({
          title: "Erreur d'authentification",
          description: "Veuillez vous connecter pour accéder aux données.",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      try {
        setLoading(true)

        // Fetch children
        const childrenResponse = await fetch(`http://localhost:8080/Etudiant/allEnfant?idParent=${idParent}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!childrenResponse.ok) {
          throw new Error("Erreur lors du chargement des enfants")
        }
        const childrenData: Child[] = await childrenResponse.json()
        childrenData.forEach((child) => {
          console.log(`Child ${child.prenom} ${child.nom} image:`, child.image)
        })
        setChildren(childrenData)

        // Fetch schedules and absences for each child
        const schedulePromises = childrenData.map(async (child) => {
          const scheduleResponse = await fetch(`http://localhost:8080/api/seance/enfant/all?idEnfant=${child.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          if (!scheduleResponse.ok) {
            throw new Error(`Erreur lors du chargement des emplois du temps pour l'enfant ${child.id}`)
          }
          const scheduleData: Schedule[] = await scheduleResponse.json()
          return { id: child.id, schedules: scheduleData }
        })

        const absencePromises = childrenData.map(async (child) => {
          const absenceResponse = await fetch(`http://localhost:8080/Absences/statisticParent?idEnfant=${child.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          if (!absenceResponse.ok) {
            throw new Error(`Erreur lors du chargement des absences pour l'enfant ${child.id}`)
          }
          const absenceData: Absences = await absenceResponse.json()
          return { id: child.id, absences: absenceData }
        })

        const schedulesData = await Promise.all(schedulePromises)
        const absencesData = await Promise.all(absencePromises)

        const schedulesMap = schedulesData.reduce((acc, { id, schedules }) => {
          acc[id] = schedules
          return acc
        }, {} as { [key: string]: Schedule[] })

        const absencesMap = absencesData.reduce((acc, { id, absences }) => {
          acc[id] = absences
          return acc
        }, {} as { [key: string]: Absences })

        setSchedules(schedulesMap)
        setAbsences(absencesMap)
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les données des enfants.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [idParent, token, toast])

  const getImageSrc = (image: string | null): string => {
    if (!image) {
      return "/placeholder.svg"
    }
    if (image.startsWith("/9j/") || image.startsWith("iVBORw0KGgo")) {
      return `data:image/jpeg;base64,${image}`
    }
    return image
  }

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

  const handleDownload = async (childId: number) => {
    try {
      setIsDownloading(true)
      setTimeout(async () => {
        const activeTab = document.querySelector(`[role="tabpanel"][data-state="active"]`)
        const element = activeTab?.querySelector(`#timetable-to-download-${childId}`)
        if (!element) {
          throw new Error("Élément non trouvé")
        }
        if (!(element instanceof HTMLElement)) {
          throw new Error("L'élément n'est pas un HTMLElement")
        }

        const canvas = await html2canvas(element, {
          scale: 3,
          backgroundColor: "#ffffff",
          logging: false,
          useCORS: true,
          allowTaint: true,
        })

        const image = canvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.href = image
        link.download = `emploi-du-temps-${currentWeek ? formatDate(currentWeek.start).replace(/\//g, "-") : "week"}-${childId}.png`
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
    if (!currentWeek) return
    const newStart = new Date(currentWeek.start)
    newStart.setDate(newStart.getDate() - 7)
    const newWeek = getWeekRange(newStart)
    setCurrentWeek(newWeek)
    toast({
      title: "Semaine précédente",
      description: `Affichage de la semaine du ${formatDate(newWeek.start)} au ${formatDate(newWeek.end)}`,
    })
  }

  const handleNextWeek = () => {
    if (!currentWeek) return
    const newStart = new Date(currentWeek.start)
    newStart.setDate(newStart.getDate() + 7)
    const newWeek = getWeekRange(newStart)
    setCurrentWeek(newWeek)
    toast({
      title: "Semaine suivante",
      description: `Affichage de la semaine du ${formatDate(newWeek.start)} au ${formatDate(newWeek.end)}`,
    })
  }

  const seanceTimes = [
    { num: "1", time: "8h30-10h00" },
    { num: "2", time: "10h15-11h45" },
    { num: "3", time: "12h00-13h30" },
    { num: "4", time: "14h00-15h30" },
    { num: "5", time: "15h45-17h15" },
    { num: "6", time: "17h30-19h00" },
  ]

  const days = ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI"]

  if (loading) {
    return <div className="p-6 text-center">Chargement...</div>
  }

  if (children.length === 0) {
    return <div className="p-6 text-center">Aucun enfant trouvé.</div>
  }

  return (
    <motion.div className="space-y-8 p-6" variants={container} initial="hidden" animate="show">
      {/* Page Title */}
      <motion.h1
        variants={item}
        className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"
      >
        Mes Enfants
      </motion.h1>

      {/* Tabs for Children */}
      <Tabs defaultValue={children[0].id.toString()}>
        <TabsList
          className={`grid h-15 w-full grid-cols-${Math.min(children.length, 2)} gap-3 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl mb-10`}
        >
          {children.map((child) => (
            <TabsTrigger
              key={child.id}
              value={child.id.toString()}
              className="rounded-xl py-3 px-4 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg dark:data-[state=active]:from-blue-700 dark:data-[state=active]:to-indigo-700"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={getImageSrc(child.image)} alt={`${child.prenom} ${child.nom}`} />
                  <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {child.prenom[0]}
                    {child.nom[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{`${child.prenom} ${child.nom}`}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {children.map((child) => (
          <TabsContent key={child.id} value={child.id.toString()} className="space-y-8">
            {/* Profile Card */}
            <motion.div variants={item}>
              <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="pb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
                      <AvatarImage src={getImageSrc(child.image)} alt={`${child.prenom} ${child.nom}`} />
                      <AvatarFallback className="bg-white/20 text-white text-2xl">
                        {child.prenom[0]}
                        {child.nom[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <CardTitle className="text-3xl font-semibold">{`${child.prenom} ${child.nom}`}</CardTitle>
                      <CardDescription className="text-lg text-white/90">{child.filiere}</CardDescription>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center text-sm text-white/80">
                          <User className="mr-2 h-5 w-5" />
                          <span>ID: STD-{child.id}</span>
                        </div>
                        <div className="flex items-center text-sm text-white/80">
                          <GraduationCap className="mr-2 h-5 w-5" />
                          <span>{child.niveau.replace("NIVEAU_", "Niveau ")}</span>
                        </div>
                        <div className="flex items-center text-sm text-white/80">
                          <MapPin className="mr-2 h-5 w-5" />
                          <span>Groupe: G1</span>
                        </div>
                      </div>
                    </div>
                    <div className="md:ml-auto">
                      <Link href="/parents/presences">
                        <Button className="bg-white text-blue-600 hover:bg-blue-100 transition-colors">
                          Voir les Présences
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
                      Informations Personnelles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <dl className="space-y-3 text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-blue-500" />
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Genre</dt>
                          <dd className="text-base">{child.gender === "MALE" ? "Homme" : "Femme"}</dd>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-blue-500" />
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Adresse MAC</dt>
                          <dd className="text-base">{child.addressMAC}</dd>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-blue-500" />
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Téléphone</dt>
                          <dd className="text-base">{child.tel}</dd>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-blue-500" />
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                          <dd className="text-base">{child.email}</dd>
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
                      Justifications et Absences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-700 dark:text-gray-300">Total des absences</span>
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            {absences[child.id]?.totalAbsence || 0} jours
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full"
                            style={{ width: `${Math.min((absences[child.id]?.totalAbsence || 0) * 50, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-700 dark:text-gray-300">Absences justifiées</span>
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            {absences[child.id]?.absenceJustif || 0} jours
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                            style={{
                              width: `${
                                absences[child.id]?.totalAbsence
                                  ? ((absences[child.id]?.absenceJustif || 0) / absences[child.id].totalAbsence) * 100
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-700 dark:text-gray-300">Absences non justifiées</span>
                          <span className="font-semibold text-red-600 dark:text-red-400">
                            {absences[child.id]?.absenceNoJustif || 0} jours
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-red-500 to-pink-500 h-3 rounded-full"
                            style={{
                              width: `${
                                absences[child.id]?.totalAbsence
                                  ? ((absences[child.id]?.absenceNoJustif || 0) / absences[child.id].totalAbsence) * 100
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Link href="/parents/presences">
                        <Button
                          variant="outline"
                          className="w-full text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20"
                        >
                          Voir Toutes les Absences
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Schedule Section */}
            <motion.div variants={item}>
              <Card className="border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between py-3">
                  <div>
                    <CardTitle className="flex items-center text-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                      <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                      Emploi du Temps
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                      {currentWeek
                        ? `Semaine du ${formatDate(currentWeek.start)} au ${formatDate(currentWeek.end)}`
                        : "Chargement..."}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePreviousWeek}
                      className="h-8 w-8 text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNextWeek}
                      className="h-8 w-8 text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleDownload(child.id)}
                      disabled={isDownloading}
                      className="h-8 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
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
                          Télécharger
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="overflow-x-auto">
                    <div
                      id={`timetable-to-download-${child.id}`}
                      className="min-w-full bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">Cours actif</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">2022-2023</div>
                      </div>

                      <div className="grid grid-cols-7 gap-2 text-sm">
                        {/* Header Row */}
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md flex items-center justify-center">
                          <div className="font-semibold text-gray-700 dark:text-gray-300">Horaire</div>
                        </div>
                        {seanceTimes.map((seance) => (
                          <div
                            key={seance.num}
                            className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md text-center"
                          >
                            <div className="text-blue-600 dark:text-blue-400 font-semibold">S{seance.num}</div>
                            <div className="text-gray-600 dark:text-gray-400">{seance.time}</div>
                          </div>
                        ))}

                        {days.map((day) => (
                          <React.Fragment key={day}>
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md flex items-center justify-center">
                              <span className="text-blue-600 dark:text-blue-400 font-semibold">{day.slice(0, 3)}</span>
                            </div>
                            {seanceTimes.map((seance) => {
                              const course = schedules[child.id]?.find(
                                (s) => s.jour.toUpperCase() === day && s.seance === `S${seance.num}`
                              )
                              return (
                                <div key={`${day}-${seance.num}`} className="p-2">
                                  {course ? (
                                    <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white p-2 rounded-md h-20 flex flex-col justify-center text-center">
                                      <span className="truncate font-semibold">{course.titre}</span>
                                      <span className="truncate">Salle: {course.salle}</span>
                                      <span className="truncate">Prof: Inconnu</span>
                                    </div>
                                  ) : (
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-md h-20"></div>
                                  )}
                                </div>
                              )
                            })}
                          </React.Fragment>
                        ))}
                      </div>

                      <div className="flex justify-end mt-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400">MàJ: 12/04/2023</div>
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
                    Professeurs
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Liste des professeurs de {child.prenom}
                  </CardDescription>
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
        ))}
      </Tabs>
    </motion.div>
  )
}