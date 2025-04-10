"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Users, Briefcase, Download, Printer, Palette, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ApiEvent {
  nom: string;
  prenom: string;
  titre: string;
  salle: string;
  filiere: string;
  niveau: string;
  seance: string;
  jour: string;
  semestre: string;
}

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
  const [currentMonth] = useState("April 2025")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const scheduleRef = useRef<HTMLDivElement>(null)
  const [showPrintOptions, setShowPrintOptions] = useState(false)
  const [printTheme, setPrintTheme] = useState<PrintTheme>("default")
  const [printOrientation, setPrintOrientation] = useState<PrintOrientation>("landscape")
  const [printSize, setPrintSize] = useState<PrintSize>("a4")
  const [isPrinting, setIsPrinting] = useState(false)
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  const getWeekDays = () => {
    const today = new Date();
    const currentDayIndex = today.getDay() - 1;
    const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const shiftedDays = [
      days[currentDayIndex >= 0 ? currentDayIndex : 0],
      ...days.slice(1),
      ...days.slice(0, currentDayIndex >= 0 ? currentDayIndex : 0)
    ];
    return shiftedDays.slice(0, 6);
  };

  const getShortWeekDays = () => {
    const today = new Date();
    const currentDayIndex = today.getDay() - 1;
    const shortDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const shiftedShortDays = [
      shortDays[currentDayIndex >= 0 ? currentDayIndex : 0],
      ...shortDays.slice(1),
      ...shortDays.slice(0, currentDayIndex >= 0 ? currentDayIndex : 0)
    ];
    return shiftedShortDays.slice(0, 6);
  };

  const weekDays = getWeekDays();
  const shortWeekDays = getShortWeekDays();
  const weekDates = [9, 10, 11, 12, 13, 14];

  const timeSlots = [
    { id: 1, name: "Séance 1", time: "8h30 à 10h00", start: "8h30", end: "10h00" },
    { id: 2, name: "Séance 2", time: "10h15 à 11h45", start: "10h15", end: "11h45" },
    { id: 3, name: "Séance 3", time: "12h00 à 13h30", start: "12h00", end: "13h30" },
    { id: 4, name: "Séance 4", time: "14h00 à 15h30", start: "14h00", end: "15h30" },
    { id: 5, name: "Séance 5", time: "15h45 à 17h15", start: "15h45", end: "17h15" },
    { id: 6, name: "Séance 6", time: "17h30 à 19h00", start: "17h30", end: "19h00" },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          throw new Error('Token d\'authentification manquant');
        }

        const response = await fetch('http://localhost:8080/api/module/professeur/semestre?id=61999&semestre=PREMIER', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const apiEvents: ApiEvent[] = await response.json();
        
        const convertedEvents = apiEvents.map((apiEvent, index) => ({
          id: index,
          title: apiEvent.titre,
          location: apiEvent.salle,
          startTime: getTimeFromSeance(apiEvent.seance).start,
          endTime: getTimeFromSeance(apiEvent.seance).end,
          color: getRandomColor(),
          day: convertDayToIndex(apiEvent.jour),
          description: `${apiEvent.titre} - ${apiEvent.filiere} ${apiEvent.niveau}`,
          attendees: [`${apiEvent.filiere} ${apiEvent.niveau}`],
          organizer: "EMSI",
          professor: `${apiEvent.prenom} ${apiEvent.nom}`,
          professorImage: `/placeholder.svg?height=40&width=40&text=${apiEvent.prenom[0]}${apiEvent.nom[0]}`,
        }));

        setEvents(convertedEvents);
        setIsLoaded(true);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const convertDayToIndex = (day: string): number => {
    const days = ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI"]
    return days.indexOf(day.toUpperCase())
  }

  const getTimeFromSeance = (seance: string): { start: string; end: string } => {
    const seances: Record<string, { start: string; end: string }> = {
      S1: { start: "8h30", end: "10h00" },
      S2: { start: "10h15", end: "11h45" },
      S3: { start: "12h00", end: "13h30" },
      S4: { start: "14h00", end: "15h30" },
      S5: { start: "15h45", end: "17h15" },
      S6: { start: "17h30", end: "19h00" },
    }
    return seances[seance] || { start: "8h30", end: "10h00" }
  }

  const getRandomColor = (): string => {
    const colors = [
      "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-yellow-500",
      "bg-indigo-500", "bg-pink-500", "bg-teal-500", "bg-orange-500",
      "bg-cyan-500", "bg-red-500", "bg-emerald-500", "bg-violet-500",
      "bg-amber-500", "bg-lime-500", "bg-sky-500"
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
  }

  const getCurrentDayIndex = () => {
    const todayIndex = new Date().getDay() - 1;
    return todayIndex >= 0 ? todayIndex : 0;
  };

  const getTodayEvents = () => {
    return getEventsForDay(getCurrentDayIndex());
  };

  const getEventsForDay = (dayIndex: number) => {
    return events.filter((event) => event.day === dayIndex)
  }

  const getUpcomingEvents = () => {
    const todayIndex = getCurrentDayIndex();
    return events
      .filter(event => event.day !== todayIndex)
      .sort((a, b) => a.day - b.day || a.startTime.localeCompare(b.startTime))
      .slice(0, 3);
  };

  const downloadAsPDF = () => {
    setIsPrinting(true)

    if (scheduleRef.current) {
      scheduleRef.current.classList.add(`print-theme-${printTheme}`)

      html2canvas(scheduleRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: printTheme === "dark" ? "#1f2937" : "#ffffff",
      }).then((canvas) => {
        scheduleRef.current?.classList.remove(`print-theme-${printTheme}`)

        const imgData = canvas.toDataURL("image/png")
        const pdf = new jsPDF({
          orientation: printOrientation,
          unit: "mm",
          format: printSize,
        })

        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()

        const imgWidth = pageWidth - 20
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        if (printTheme !== "minimal") {
          pdf.setFillColor(
            printTheme === "dark" ? 40 : 220,
            printTheme === "dark" ? 50 : 230,
            printTheme === "dark" ? 80 : 240
          )
          pdf.rect(0, 0, pageWidth, 20, "F")

          pdf.setTextColor(
            printTheme === "dark" ? 255 : 0,
            printTheme === "dark" ? 255 : 0,
            printTheme === "dark" ? 255 : 0
          )
          pdf.setFontSize(14)
          pdf.text("EMSI - Emploi du Temps", pageWidth / 2, 12, { align: "center" })
          pdf.setFontSize(10)
          const today = new Date()
          pdf.text(`Généré le: ${today.toLocaleDateString()}`, pageWidth - 15, 8, { align: "right" })
        }

        pdf.addImage(imgData, "PNG", 10, printTheme !== "minimal" ? 25 : 10, imgWidth, imgHeight)

        if (printTheme !== "minimal") {
          const footerY = pageHeight - 10
          pdf.setFontSize(8)
          pdf.setTextColor(100, 100, 100)
          pdf.text("© EMSI 2025 - Tous droits réservés", pageWidth / 2, footerY, { align: "center" })
          pdf.text("Page 1/1", pageWidth - 15, footerY, { align: "right" })
        }

        pdf.save("emploi-du-temps.pdf")
        setIsPrinting(false)
      })
    }
  }

  const printSchedule = () => {
    window.print()
  }

  useEffect(() => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    )
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
                Emploi du Temps
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
              Options d&apos;export
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
              <div className="text-sm text-muted-foreground">EMSI - École Marocaine des Sciences de l&apos;Ingénieur</div>
            </div>

            <TabsContent value="day" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl border shadow-md p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300">
                      {weekDays[getCurrentDayIndex()]} - {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                    </h3>
                  </div>
                  {getTodayEvents().length > 0 ? (
                    <div className="space-y-3">
                      {getTodayEvents().map((event) => (
                        <div
                          key={event.id}
                          className={`${event.color} rounded-lg p-3 text-white shadow-md cursor-pointer`}
                          onClick={() => handleEventClick(event)}
                        >
                          <div className="flex items-start gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="font-bold truncate text-sm">{event.title}</h4>
                                <Badge className="bg-white/20 text-white text-xs whitespace-nowrap">
                                  {event.startTime} - {event.endTime}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-xs">
                                <MapPin className="h-3 w-3 flex-shrink-0" />
                                <span className="truncate">{event.location}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-xs">
                                <Avatar className="h-4 w-4 border border-white/30 flex-shrink-0">
                                  <AvatarImage src={event.professorImage} alt={event.professor} />
                                  <AvatarFallback className="text-[8px]">
                                    {event.professor
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="truncate">{event.professor}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <p>Aucun cours prévu aujourd&apos;hui</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4 text-blue-800 dark:text-blue-300 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Événements à venir
                  </h3>
                  <div className="space-y-3">
                    {getUpcomingEvents().map((event) => (
                      <div
                        key={event.id}
                        className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm overflow-hidden cursor-pointer"
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="flex flex-col h-full">
                          <div className={`${event.color} h-2 w-full`}></div>
                          <div className="p-3 flex-1 flex flex-col min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <Badge className="px-1.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-medium truncate">
                                {shortWeekDays[event.day]}
                              </Badge>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {event.startTime} - {event.endTime}
                              </span>
                            </div>
                            <h4 className="font-semibold text-sm text-blue-800 dark:text-blue-300 truncate mb-1">
                              {event.title}
                            </h4>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground truncate">
                              <MapPin className="h-3 w-3 flex-shrink-0" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-2 text-xs truncate">
                              <Avatar className="h-4 w-4 border border-blue-100 dark:border-blue-900 flex-shrink-0">
                                <AvatarImage src={event.professorImage} alt={event.professor} />
                                <AvatarFallback className="text-[8px]">
                                  {event.professor
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{event.professor}</span>
                            </div>
                          </div>
                        </div>
                      </div>
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
                <div className="grid grid-cols-[100px_repeat(6,1fr)] border-b sticky top-0 bg-white dark:bg-gray-800 z-10">
                  <div className="p-2 text-center text-muted-foreground text-xs"></div>
                  {timeSlots.map((slot) => (
                    <div key={slot.id} className="p-2 text-center border-l">
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">{slot.name}</div>
                      <div className="text-xs">{slot.time}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-[100px_repeat(6,1fr)]">
                  <div className="text-muted-foreground">
                    {shortWeekDays.map((day, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-24 border-b pr-2 text-right flex items-center justify-end",
                          i % 2 === 0 ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                        )}
                      >
                        <div className="font-medium text-blue-700 dark:text-blue-300">{day}</div>
                      </div>
                    ))}
                  </div>
                  {timeSlots.map((slot) => (
                    <div key={slot.id} className="border-l relative">
                      {shortWeekDays.map((_, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={cn("h-24 border-b", dayIndex % 2 === 0 ? "bg-blue-50/50 dark:bg-blue-900/10" : "")}
                        ></div>
                      ))}
                      {events
                        .filter((event) => {
                          const eventStartHour = Number.parseInt(event.startTime.split("h")[0])
                          const eventStartMinute = Number.parseInt(event.startTime.split("h")[1] || "0")
                          const slotStartHour = Number.parseInt(slot.start.split("h")[0])
                          const slotStartMinute = Number.parseInt(slot.start.split("h")[1] || "0")
                          return eventStartHour === slotStartHour && eventStartMinute === slotStartMinute
                        })
                        .map((event) => {
                          if (event.day > 5) return null
                          return (
                            <div
                              key={event.id}
                              className="absolute"
                              style={{
                                top: `${event.day * 96 + 4}px`,
                                left: "4px",
                                right: "4px",
                                height: "88px",
                              }}
                              onClick={() => handleEventClick(event)}
                            >
                              <div className={`${event.color} rounded-lg p-2 text-white shadow-md h-full overflow-hidden`}>
                                <div className="font-bold truncate text-sm">{event.title}</div>
                                <div className="flex items-center gap-1 mt-1">
                                  <MapPin className="h-3 w-3 flex-shrink-0" />
                                  <span className="text-xs opacity-90 truncate">{event.location}</span>
                                </div>
                                <div className="flex items-center mt-1">
                                  <Avatar className="h-4 w-4 mr-1 border border-white/30 flex-shrink-0">
                                    <AvatarImage src={event.professorImage} alt={event.professor} />
                                    <AvatarFallback className="text-[8px]">
                                      {event.professor
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs font-medium truncate">{event.professor.split(" ")[1]}</span>
                                </div>
                                <div className="text-xs mt-1 truncate">
                                  {event.startTime} - {event.endTime}
                                </div>
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

      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-blue-100 dark:border-blue-900"
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
                  {selectedEvent.attendees.join(", ")}
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

      <Dialog open={showPrintOptions} onOpenChange={setShowPrintOptions}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-blue-600" />
              Options d&apos;export PDF
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="theme" className="text-right">
                Thème:
              </label>
              <Select
                value={printTheme}
                onValueChange={(value) => setPrintTheme(value as PrintTheme)}
              >
                <SelectTrigger className="col-span-3" id="theme">
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
              <Select 
                value={printOrientation}
                onValueChange={(value) => setPrintOrientation(value as PrintOrientation)}
              >
                <SelectTrigger id="orientation" className="col-span-3">
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
              <Select
                value={printSize}
                onValueChange={(value) => setPrintSize(value as PrintSize)}
              >
                <SelectTrigger id="size" className="col-span-3">
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
                  <Loader2 className="h-4 w-4 animate-spin" />
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

export default EmploisPage