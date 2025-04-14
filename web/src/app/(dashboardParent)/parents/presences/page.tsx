"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Filter, ArrowUpDown } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Define primary color constants
const primary = {
  light: "rgba(147, 51, 234, 0.7)",
  DEFAULT: "rgb(147, 51, 234)",
  dark: "rgb(126, 34, 206)",
}

// Define props interface for StaticBadge
interface StaticBadgeProps {
  variant: "destructive" | "success" | "warning" | "default"
  children: React.ReactNode
}

// Custom StaticBadge component to avoid popups
const StaticBadge = ({ variant, children }: StaticBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${variant === "destructive" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" :
          variant === "success" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
          variant === "warning" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}`}
    >
      {children}
    </span>
  )
}

// Interfaces for API data
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

interface Absence {
  nom: string
  prenom: string
  moduleTitre: string
  semestre: string
  dateAbsences: string
  salle: string
  isJustif: string
}

export default function PresencesPage() {
  const [children, setChildren] = useState<Child[]>([])
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null)
  const [absences, setAbsences] = useState<Absence[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  // Fetch children on mount
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("authToken")
        const id = localStorage.getItem("id")
        const response = await axios.get(`http://localhost:8080/Etudiant/allEnfant?idParent=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setChildren(response.data)
        if (response.data.length > 0) {
          setSelectedChildId(response.data[0].id)
        }
      } catch (err) {
        setError("Erreur lors du chargement des enfants")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchChildren()
  }, [])

  // Fetch absences when selectedChildId changes
  useEffect(() => {
    if (!selectedChildId) return

    const fetchAbsences = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("authToken")
        const response = await axios.get(`http://localhost:8080/Absences/AllAbsencesEtud?idEtud=${selectedChildId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setAbsences(response.data)
      } catch (err) {
        setError("Erreur lors du chargement des absences")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAbsences()
  }, [selectedChildId])

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "dd/MM/yyyy", { locale: fr })
  }

  // Map isJustif to status
  const getStatus = (isJustif: string) => {
    if (isJustif === "true") return "Justifiée"
    if (isJustif === "false") return "Non justifiée"
    return "En attente" // Fallback, adjust if needed
  }

  // Map status to badge variant
  const getBadgeVariant = (isJustif: string): "destructive" | "success" | "warning" => {
    if (isJustif === "true") return "success"
    if (isJustif === "false") return "destructive"
    return "warning"
  }

  if (loading) {
    return <div className="text-center dark:text-white">Chargement...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div>
            <Select
              value={selectedChildId?.toString() || ""}
              onValueChange={(value) => setSelectedChildId(Number(value))}
            >
              <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <SelectValue placeholder="Sélectionner un enfant" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                {children.map((child) => (
                  <SelectItem
                    key={child.id}
                    value={child.id.toString()}
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    {child.prenom} {child.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="absences" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="absences">Absences</TabsTrigger>
            <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
          </TabsList>

          <TabsContent value="absences" className="space-y-6">
            {/* Absence History */}
            <Card className="border-none shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="dark:text-white">Historique des absences</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                          <Filter className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                        <DropdownMenuLabel className="dark:text-white">Filtrer par</DropdownMenuLabel>
                        <DropdownMenuSeparator className="dark:border-gray-700" />
                        <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                          Toutes les absences
                        </DropdownMenuItem>
                        <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                          Non justifiées
                        </DropdownMenuItem>
                        <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                          Justifiées
                        </DropdownMenuItem>
                        <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                          En attente
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-md border dark:border-gray-700">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50 dark:bg-gray-700">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <span>Date</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider dark:text-gray-400">
                          Module
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider dark:text-gray-400">
                          Durée
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider dark:text-gray-400">
                          Statut
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-white dark:bg-gray-800 dark:divide-gray-700">
                      {absences.map((absence, index) => (
                        <tr
                          key={`${absence.dateAbsences}-${index}`}
                          className="hover:bg-muted/30 transition-colors dark:hover:bg-gray-700/50"
                        >
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium dark:text-white">
                              {formatDate(absence.dateAbsences)}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm dark:text-white">{absence.moduleTitre}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm dark:text-white">Non spécifié</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <StaticBadge variant={getBadgeVariant(absence.isJustif)}>
                              {getStatus(absence.isJustif)}
                            </StaticBadge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm text-muted-foreground dark:text-gray-400">
                    Affichage de {absences.length} absence(s)
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                    >
                      Précédent
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistiques" className="space-y-6">
            {/* Attendance Chart */}
            <Card className="border-none shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Statistiques de présence</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Taux de présence au cours des derniers mois
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <div className="relative w-64 h-64 mx-auto">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-light shadow-lg"></div>
                      <div
                        className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-700"
                        style={{
                          clipPath: "polygon(50% 50%, 100% 50%, 100% 0, 50% 0)",
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <div className="text-3xl font-bold dark:text-white">78%</div>
                        <div className="text-sm text-muted-foreground dark:text-gray-400">Présent</div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-3 dark:text-white">Distribution de présence</h4>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-primary-light mr-2"></div>
                            <span className="mr-2 flex-1 dark:text-white">Présent</span>
                            <span className="font-semibold dark:text-white">78%</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 mr-2"></div>
                            <span className="mr-2 flex-1 dark:text-white">Absent</span>
                            <span className="font-semibold dark:text-white">22%</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3 dark:text-white">Détails des absences</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="dark:text-white">Total absences :</span>
                            <span className="font-medium dark:text-white">8 jours</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="dark:text-white">Absences justifiées :</span>
                            <span className="font-medium dark:text-white">5 jours</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="dark:text-white">Absences non justifiées :</span>
                            <span className="font-medium dark:text-white">3 jours</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3 dark:text-white">Comparaison de classe</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="dark:text-white">Thomas</span>
                              <span className="dark:text-white">78%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div
                                className="bg-gradient-to-r from-primary to-primary-light h-2.5 rounded-full"
                                style={{ width: "78%" }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="dark:text-white">Moyenne de la classe</span>
                              <span className="dark:text-white">92%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div
                                className="bg-gradient-to-r from-green-400 to-green-500 h-2.5 rounded-full"
                                style={{ width: "92%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Évolution mensuelle</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Taux de présence au cours des 6 derniers mois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-between">
                  {[
                    { month: "Oct", value: 95 },
                    { month: "Nov", value: 88 },
                    { month: "Déc", value: 82 },
                    { month: "Jan", value: 90 },
                    { month: "Fév", value: 85 },
                    { month: "Mar", value: 78 },
                  ].map((item) => (
                    <div key={item.month} className="flex flex-col items-center group">
                      <div className="relative">
                        <div
                          className="w-16 bg-gradient-to-t from-primary/70 to-primary rounded-t-md transition-all duration-300 group-hover:from-primary/80 group-hover:to-primary group-hover:shadow-lg"
                          style={{ height: `${item.value * 2}px` }}
                        ></div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {item.value}%
                        </div>
                      </div>
                      <div className="mt-2 text-sm font-medium dark:text-white">{item.month}</div>
                      <div className="text-xs text-muted-foreground dark:text-gray-400">{item.value}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}