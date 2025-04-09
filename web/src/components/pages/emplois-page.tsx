"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Users, Briefcase, Download, Printer, Palette } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Event {
  id: number;
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  color: string;
  day: number;
  description: string;
  attendees: string[];
  organizer: string;
  professor: string;
  professorImage: string;
}

type PrintTheme = "default" | "colorful" | "dark" | "minimal";
type PrintOrientation = "landscape" | "portrait";
type PrintSize = "a4" | "a3" | "letter";

export function EmploisPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentView, setCurrentView] = useState("week")
  const [currentMonth, setCurrentMonth] = useState("March 2025")
  const [currentDate, setCurrentDate] = useState("March 5")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const scheduleRef = useRef<HTMLDivElement>(null)
  const [showPrintOptions, setShowPrintOptions] = useState(false)
  const [printTheme, setPrintTheme] = useState<PrintTheme>("default")
  const [printOrientation, setPrintOrientation] = useState<PrintOrientation>("landscape")
  const [printSize, setPrintSize] = useState<PrintSize>("a4")
  const [isPrinting, setIsPrinting] = useState(false)

  // ... rest of your component code

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }

  // Update the time slots and events data to match the EMSI schedule
  const timeSlots = [
    { id: 1, name: "Séance 1", time: "8h30 à 10h00" },
    { id: 2, name: "Séance 2", time: "10h15 à 11h45" },
    { id: 3, name: "Séance 3", time: "12h00 à 13h30" },
    { id: 4, name: "Séance 4", time: "14h00 à 15h30" },
    { id: 5, name: "Séance 5", time: "15h45 à 17h15" },
    { id: 6, name: "Séance 6", time: "17h30 à 19h00" },
  ]

  // Replace the weekDays array with:
  const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
  const weekDates = [4, 5, 6, 7, 8, 9] // Removed Sunday (10)

  // Replace the events array with the EMSI schedule data:
  const events = [
    // Monday (Lundi) - Day 0
    {
      id: 1,
      title: "Management",
      location: "Centre Salle A1",
      startTime: "8h30",
      endTime: "10h00",
      color: "bg-blue-500",
      day: 0,
      description: "Management course for 4IIR G7",
      attendees: ["4IIR G7 Students"],
      organizer: "EMSI",
      professor: "Dr. Ahmed Bennani",
      professorImage: "/placeholder.svg?height=40&width=40&text=AB",
    },
    {
      id: 2,
      title: "Datawerhouse",
      location: "Centre LR",
      startTime: "10h15",
      endTime: "11h45",
      color: "bg-green-500",
      day: 0,
      description: "Datawerhouse course for 4IIR G7",
      attendees: ["4IIR G7 Students"],
      organizer: "EMSI",
      professor: "Dr. Karim Tahiri",
      professorImage: "/placeholder.svg?height=40&width=40&text=KT",
    },
    {
      id: 3,
      title: "Administration Windows",
      location: "Centre LR",
      startTime: "14h00",
      endTime: "15h30",
      color: "bg-purple-500",
      day: 0,
      description: "Administration Windows course for 4IIR G7",
      attendees: ["4IIR G7 Students"],
      organizer: "EMSI",
      professor: "Prof. Youssef Alami",
      professorImage: "/placeholder.svg?height=40&width=40&text=YA",
    },

    // Tuesday (Mardi) - Day 1
    {
      id: 4,
      title: "Programmation mobile",
      location: "Guéliz LI 31",
      startTime: "10h15",
      endTime: "11h45",
      color: "bg-yellow-500",
      day: 1,
      description: "Programmation mobile course for 4IIR G7",
      attendees: ["4IIR G7 Students"],
      organizer: "EMSI",
      professor: "Dr. Nadia Chaoui",
      professorImage: "/placeholder.svg?height=40&width=40&text=NC",
    },
    {
      id: 5,
      title: "Anglais 8",
      location: "Guéliz Salle 303",
      startTime: "14h00",
      endTime: "15h30",
      color: "bg-indigo-500",
      day: 1,
      description: "English course for 4IIR G7",
      attendees: ["4IIR G7 Students"],
      organizer: "EMSI",
      professor: "Prof. Sarah Johnson",
      professorImage: "/placeholder.svg?height=40&width=40&text=SJ",
    },

    // Wednesday (Mercredi) - Day 2
    {
      id: 6,
      title: "J2EE1 (Strust, Hibernate)",
      location: "Centre L14",
      startTime: "10h15",
      endTime: "11h45",
      color: "bg-pink-500",
      day: 2,
      description: "J2EE1 course for 4IIR G7",
      attendees: ["4IIR G7 Students"],
      organizer: "EMSI",
      professor: "Dr. Mohammed Ouahbi",
      professorImage: "/placeholder.svg?height=40&width=40&text=MO",
    },
    {
      id: 7,
      title: "PFA",
      location: "Guéliz Salle 201",
      startTime: "14h00",
      endTime: "15h30",
      color: "bg-teal-500",
      day: 2,
      description: "PFA (Projet de Fin d'Année) for 4IIR G7",
      attendees: ["4IIR G7 Students"],
      organizer: "EMSI",
      professor: "Prof. Rachid Benali",
      professorImage: "/placeholder.svg?height=40&width=40&text=RB",
    },

    // Thursday (Jeudi) - Day 3
    {
      id: 8,
      title: "Entrepreneuriat",
      location: "Centre Salle A1",
      startTime: "10h15",
      endTime: "11h45",
      color: "bg-orange-500",
      day: 3,
      description: "Entrepreneuriat course for 4IIR G7",
      attendees: ["4IIR G7 Students"],
      organizer: "EMSI",
      professor: "Dr. Fatima Zahra",
      professorImage: "/placeholder.svg?height=40&width=40&text=FZ",
    },
    {
      id: 9,
      title: "BIG DATA",
      location: "Centre LI 4",
      startTime: "14h00",
      endTime: "15h30",
      color: "bg-cyan-500",
      day: 3,
      description: "BIG DATA course for 4IIR G7",
      attendees: ["4IIR G7 Students"],
      organizer: "EMSI",
      professor: "Prof. Hassan Berrada",
      professorImage: "/placeholder.svg?height=40&width=40&text=HB",
    },
    {
      id: 10,
      title: "Sécurité des réseaux",
      location: "Centre Salle C3",
      startTime: "15h00",
      endTime: "16h30",
      color: "bg-red-500",
      day: 3,
      description: "Network Security course for 4IIR G7",
      attendees: ["4IIR G7 Students"],
      organizer: "EMSI",
      professor: "Dr. Omar Kadiri",
      professorImage: "/placeholder.svg?height=40&width=40&text=OK",
    },

    // Friday (Vendredi) - Day 4
    {
      id: 11,
      title: "Génie Logiciel",
      location: "Centre Salle D2",
      startTime: "10h15",
      endTime: "11h45",
      color: "bg-emerald-500",
      day: 4,
      description: "Software Engineering course for 4IIR G7",
      attendees: ["4IIR G7 Students"],
      organizer: "EMSI",
      professor: "Prof. Laila Moussaoui",
      professorImage: "/placeholder.svg?height=40&width=40&text=LM",
    },
    {
      id: 12,
      title: "DEVOPS",
      location: "Centre LI 1",
      startTime: "15h45",
      endTime: "17h15",
      color: "bg-violet-500",
      day: 4,
      description: "DEVOPS course for 4IIR G7",
      attendees: ["4IIR G7 Students"],
      organizer: "EMSI",
      professor: "Dr. Jamal Eddine",
      professorImage: "/placeholder.svg?height=40&width=40&text=JE",
    },

    // Saturday (Samedi) - Day 5
    {
      id: 13,
      title: "Communication professionnelle 2",
      location: "Centre Salle B3",
      startTime: "8h30",
      endTime: "10h00",
      color: "bg-amber-500",
      day: 5,
      description: "Professional Communication course for 4IIR G7",
      attendees: ["4IIR G7 Students"],
      organizer: "EMSI",
      professor: "Prof. Amina Tazi",
      professorImage: "/placeholder.svg?height=40&width=40&text=AT",
    },
    {
      id: 14,
      title: "Virtualisation",
      location: "Centre LI 1",
      startTime: "10h15",
      endTime: "11h45",
      color: "bg-lime-500",
      day: 5,
      description: "Virtualization course for 4IIR G7",
      attendees: ["4IIR G7 Students"],
      organizer: "EMSI",
      professor: "Dr. Kamal Idrissi",
      professorImage: "/placeholder.svg?height=40&width=40&text=KI",
    },
    {
      id: 15,
      title: "Administration ORACLE2",
      location: "Centre LR",
      startTime: "12h00",
      endTime: "13h30",
      color: "bg-sky-500",
      day: 5,
      description: "ORACLE2 Administration course for 4IIR G7",
      attendees: ["4IIR G7 Students"],
      organizer: "EMSI",
      professor: "Prof. Samir Khalil",
      professorImage: "/placeholder.svg?height=40&width=40&text=SK",
    },
  ]

  // Function to download the schedule as PDF with enhanced styling
  const downloadAsPDF = () => {
    setIsPrinting(true)

    if (scheduleRef.current) {
      // Add print-specific class for styling during capture
      scheduleRef.current.classList.add(`print-theme-${printTheme}`)

      html2canvas(scheduleRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: printTheme === "dark" ? "#1f2937" : "#ffffff",
      }).then((canvas) => {
        // Remove print-specific class after capture
        scheduleRef.current.classList.remove(`print-theme-${printTheme}`)

        const imgData = canvas.toDataURL("image/png")
        const pdf = new jsPDF({
          orientation: printOrientation,
          unit: "mm",
          format: printSize,
        })

        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()

        const imgWidth = pageWidth - 20 // 10mm margin on each side
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        // Add a decorative header
        if (printTheme !== "minimal") {
          pdf.setFillColor(
            printTheme === "dark" ? 40 : 220,
            printTheme === "dark" ? 50 : 230,
            printTheme === "dark" ? 80 : 240,
          )
          pdf.rect(0, 0, pageWidth, 20, "F")

          pdf.setTextColor(
            printTheme === "dark" ? 255 : 0,
            printTheme === "dark" ? 255 : 0,
            printTheme === "dark" ? 255 : 0,
          )
          pdf.setFontSize(14)
          pdf.text("EMSI - Emploi du Temps 4IIR G7", pageWidth / 2, 12, { align: "center" })

          // Add date
          pdf.setFontSize(10)
          const today = new Date()
          pdf.text(`Généré le: ${today.toLocaleDateString()}`, pageWidth - 15, 8, { align: "right" })
        }

        // Add the schedule image
        pdf.addImage(imgData, "PNG", 10, printTheme !== "minimal" ? 25 : 10, imgWidth, imgHeight)

        // Add a footer
        if (printTheme !== "minimal") {
          const footerY = pageHeight - 10
          pdf.setFontSize(8)
          pdf.setTextColor(100, 100, 100)
          pdf.text("© EMSI 2025 - Tous droits réservés", pageWidth / 2, footerY, { align: "center" })

          // Add page numbers
          pdf.text("Page 1/1", pageWidth - 15, footerY, { align: "right" })
        }

        pdf.save("emploi-du-temps-4IIR-G7.pdf")
        setIsPrinting(false)
      })
    }
  }

  // Function to print the schedule
  const printSchedule = () => {
    window.print()
  }

  // Add print styles
  useEffect(() => {
    // Create a style element
    const style = document.createElement("style")
    style.innerHTML = `
    @media print {
      body * {
        visibility: hidden;
      }
      #schedule-print-area, #schedule-print-area * {
        visibility: visible;
      }
      #schedule-print-area {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }
      .no-print {
        display: none !important;
      }
      
      .print-theme-colorful .bg-blue-500, .print-theme-colorful .bg-green-500,
      .print-theme-colorful .bg-purple-500, .print-theme-colorful .bg-yellow-500,
      .print-theme-colorful .bg-indigo-500, .print-theme-colorful .bg-pink-500,
      .print-theme-colorful .bg-teal-500, .print-theme-colorful .bg-orange-500,
      .print-theme-colorful .bg-cyan-500, .print-theme-colorful .bg-red-500,
      .print-theme-colorful .bg-emerald-500, .print-theme-colorful .bg-violet-500,
      .print-theme-colorful .bg-amber-500, .print-theme-colorful .bg-lime-500,
      .print-theme-colorful .bg-sky-500 {
        background-color: currentColor !important;
        color: white !important;
        border: 2px solid #fff !important;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
      }
      
      .print-theme-dark {
        background-color: #1f2937 !important;
        color: white !important;
      }
      
      .print-theme-dark th, .print-theme-dark td {
        border-color: #374151 !important;
      }
      
      .print-theme-minimal * {
        color: black !important;
        border-color: #e5e7eb !important;
      }
    }
  `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Function to get events for a specific day
  const getEventsForDay = (dayIndex) => {
    return events.filter((event) => event.day === dayIndex)
  }

  // Function to get today's events (for demo purposes using day 0)
  const getTodayEvents = () => {
    return getEventsForDay(0)
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-blue-800 dark:text-blue-300">
                Emploi du Temps - 4IIR G7
              </CardTitle>
              <p className="text-sm text-blue-600/70 dark:text-blue-400/70 mt-1">Semestre 2 | 2024-2025</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0 no-print">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 shadow-sm"
              onClick={() => setShowPrintOptions(true)}
            >
              <Download className="h-4 w-4" />
              Options d'export
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 shadow-sm"
              onClick={printSchedule}
            >
              <Printer className="h-4 w-4" />
              Imprimer
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <Tabs defaultValue="week" onValueChange={setCurrentView}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <TabsList className="bg-blue-100 dark:bg-blue-900/30 no-print">
                  <TabsTrigger value="day" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    Jour
                  </TabsTrigger>
                  <TabsTrigger value="week" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    Semaine
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="text-sm text-muted-foreground">EMSI - École Marocaine des Sciences de l'Ingénieur</div>
            </div>

            <TabsContent value="day" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Day view content */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border shadow-md p-4">
                  <h3 className="text-lg font-bold mb-4 text-blue-800 dark:text-blue-300">Lundi</h3>
                  <div className="space-y-4">
                    {getTodayEvents().map((event) => (
                      <div
                        key={event.id}
                        className={`${event.color} rounded-lg p-4 text-white shadow-md`}
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold">{event.title}</h4>
                          <Badge className="bg-white/20 text-white">
                            {event.startTime} - {event.endTime}
                          </Badge>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border border-white/30">
                              <AvatarImage src={event.professorImage} alt={event.professor} />
                              <AvatarFallback className="text-xs">
                                {event.professor
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{event.professor}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Événements à venir section - Only in day view */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-blue-800 dark:text-blue-300 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Événements à venir
                  </h3>
                  <div className="space-y-4">
                    {events.slice(0, 3).map((event) => (
                      <Card key={event.id} className="overflow-hidden border-0 shadow-md bg-white dark:bg-gray-800">
                        <div className="flex flex-col h-full">
                          <div className={`${event.color} h-2 w-full`}></div>
                          <CardContent className="p-4 flex-1 flex flex-col">
                            <div className="mb-3">
                              <Badge className="mb-2 px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 font-medium">
                                {weekDays[event.day]}
                              </Badge>
                              <h4 className="font-bold text-base text-blue-800 dark:text-blue-300">{event.title}</h4>
                            </div>
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center text-muted-foreground">
                                <Clock className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                <span className="text-sm truncate">{`${event.startTime} - ${event.endTime}`}</span>
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <MapPin className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                <span className="text-sm truncate">{event.location}</span>
                              </div>
                            </div>
                            <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8 border-2 border-blue-100 dark:border-blue-900">
                                  <AvatarImage src={event.professorImage} alt={event.professor} />
                                  <AvatarFallback className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs">
                                    {event.professor
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium truncate">{event.professor}</span>
                              </div>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="week" className="mt-0">
              <div
                ref={scheduleRef}
                id="schedule-print-area"
                className={`bg-white dark:bg-gray-800 rounded-xl border shadow-md ${isPrinting ? `print-theme-${printTheme}` : ""}`}
              >
                {/* Week Header - showing hours in column headers */}
                <div className="grid grid-cols-[100px_repeat(6,1fr)] border-b sticky top-0 bg-white dark:bg-gray-800 z-10">
                  <div className="p-2 text-center text-muted-foreground text-xs"></div>
                  {timeSlots.map((slot, i) => (
                    <div key={i} className="p-2 text-center border-l">
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">{slot.name}</div>
                      <div className="text-xs">{slot.time}</div>
                    </div>
                  ))}
                </div>

                {/* Time Grid - Days as rows and hours as columns */}
                <div className="grid grid-cols-[100px_repeat(6,1fr)]">
                  {/* Day Labels - as row headers */}
                  <div className="text-muted-foreground">
                    {weekDays.map((day, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-24 border-b pr-2 text-right flex items-center justify-end",
                          i % 2 === 0 ? "bg-blue-50/50 dark:bg-blue-900/10" : "",
                        )}
                      >
                        <div className="font-medium text-blue-700 dark:text-blue-300">{day}</div>
                      </div>
                    ))}
                  </div>

                  {/* Time Slot Columns */}
                  {timeSlots.map((slot, timeIndex) => (
                    <div key={timeIndex} className="border-l relative">
                      {weekDays.map((_, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={cn("h-24 border-b", dayIndex % 2 === 0 ? "bg-blue-50/50 dark:bg-blue-900/10" : "")}
                        ></div>
                      ))}

                      {/* Events */}
                      {events
                        .filter((event) => {
                          // Match events that belong to this time slot
                          const eventStartHour = Number.parseInt(event.startTime.split("h")[0])
                          const eventStartMinute = Number.parseInt(event.startTime.split("h")[1] || "0")
                          const slotStartHour = Number.parseInt(slot.time.split("à")[0].trim().split("h")[0])
                          const slotStartMinute = Number.parseInt(slot.time.split("à")[0].trim().split("h")[1] || "0")

                          return eventStartHour === slotStartHour && eventStartMinute === slotStartMinute
                        })
                        .map((event, i) => {
                          // Only show events for days 0-5 (Monday-Saturday)
                          if (event.day > 5) return null

                          return (
                            <div
                              key={i}
                              className={`absolute ${event.color} rounded-lg p-3 text-white text-xs shadow-lg`}
                              style={{
                                top: `${event.day * 96 + 4}px`, // Position based on day index (adjusted for new height)
                                left: "4px",
                                right: "4px",
                                height: "88px", // Fixed height for events (adjusted)
                              }}
                              onClick={() => handleEventClick(event)}
                            >
                              <div className="font-bold">{event.title}</div>
                              <div className="flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3" />
                                <span className="opacity-90 text-[10px]">{event.location}</span>
                              </div>
                              <div className="flex items-center mt-2">
                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mr-1">
                                  <span className="text-[8px]">Prof</span>
                                </div>
                                <span className="text-[10px] font-medium">{event.professor.split(" ")[1]}</span>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-blue-100 dark:border-blue-900 transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-2 ${selectedEvent.color} -mx-6 -mt-6 rounded-t-xl mb-6`}></div>

            <div className="flex items-start gap-4 mb-6">
              <Avatar className="h-16 w-16 rounded-xl border-2 border-blue-100 dark:border-blue-900 shadow-md">
                <AvatarImage src={selectedEvent.professorImage} alt={selectedEvent.professor} />
                <AvatarFallback className="text-lg bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {selectedEvent.professor
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300">{selectedEvent.title}</h3>
                <p className="text-sm text-blue-600/70 dark:text-blue-400/70">{selectedEvent.professor}</p>
              </div>
            </div>

            <div className="space-y-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
              <p className="flex items-center">
                <MapPin className="mr-3 h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="font-medium">{selectedEvent.location}</span>
              </p>
              <p className="flex items-center">
                <Calendar className="mr-3 h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="font-medium">{`${weekDays[selectedEvent.day]}, ${weekDates[selectedEvent.day]} ${currentMonth}`}</span>
              </p>
              <p className="flex items-center">
                <Clock className="mr-3 h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="font-medium">{`${selectedEvent.startTime} - ${selectedEvent.endTime}`}</span>
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <p className="flex items-start">
                <Users className="mr-3 h-5 w-5 mt-1 text-blue-600 dark:text-blue-400" />
                <span>
                  <span className="font-semibold block text-blue-800 dark:text-blue-300">Participants:</span>
                  {selectedEvent.attendees.join(", ") || "No attendees"}
                </span>
              </p>
              <p className="flex items-start">
                <Briefcase className="mr-3 h-5 w-5 mt-1 text-blue-600 dark:text-blue-400" />
                <span>
                  <span className="font-semibold block text-blue-800 dark:text-blue-300">Organisateur:</span>
                  {selectedEvent.organizer}
                </span>
              </p>
            </div>

            <div className="border-t border-blue-100 dark:border-blue-900 pt-4">
              <p className="font-semibold mb-2 text-blue-800 dark:text-blue-300">Description:</p>
              <p className="text-muted-foreground">{selectedEvent.description}</p>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                onClick={() => setSelectedEvent(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              >
                Fermer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Print Options Dialog */}
      <Dialog open={showPrintOptions} onOpenChange={setShowPrintOptions}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-blue-600" />
              Options d'export PDF
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="theme" className="text-right">
                Thème:
              </label>
              <Select value={printTheme} onValueChange={setPrintTheme} className="col-span-3">
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Choisir un thème" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Standard</SelectItem>
                  <SelectItem value="colorful">Coloré</SelectItem>
                  <SelectItem value="dark">Sombre</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="orientation" className="text-right">
                Orientation:
              </label>
              <Select value={printOrientation} onValueChange={setPrintOrientation} className="col-span-3">
                <SelectTrigger id="orientation">
                  <SelectValue placeholder="Choisir une orientation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="landscape">Paysage</SelectItem>
                  <SelectItem value="portrait">Portrait</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="size" className="text-right">
                Format:
              </label>
              <Select value={printSize} onValueChange={setPrintSize} className="col-span-3">
                <SelectTrigger id="size">
                  <SelectValue placeholder="Choisir un format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a4">A4</SelectItem>
                  <SelectItem value="a3">A3</SelectItem>
                  <SelectItem value="letter">Letter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPrintOptions(false)}>
              Annuler
            </Button>
            <Button
              onClick={() => {
                setShowPrintOptions(false)
                downloadAsPDF()
              }}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isPrinting}
            >
              {isPrinting ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Génération...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Télécharger PDF
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
