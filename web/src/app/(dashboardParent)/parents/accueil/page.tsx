// src/app/(dashboardParent)/parents/accueil/page.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, ArrowRight, BookOpen, Users, AlertTriangle, Clock, Mail, User, Layers, Network, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/parent/theme-provider";
import { useTheme } from "next-themes";

interface Enfant {
  id: number | string;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  gender: string;
  niveau: string;
  addressMAC: string;
  filiere: string;
  image: string | null;
}

interface AbsenceStat {
  absenceNoJustif: number;
  totalAbsence: number;
  absenceJustif: number;
}

interface AbsenceDetail {
  nom: string;
  prenom: string;
  moduleTitre: string;
  semestre: string;
  dateAbsences: string;
  salle: string;
  isJustif: string;
}

interface TodayCourse {
  time: string;
  name: string;
  teacher: string;
  room: string;
  color: string;
}

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [enfants, setEnfants] = useState<Enfant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEnfant, setSelectedEnfant] = useState<Enfant | null>(null);
  const [stats, setStats] = useState<AbsenceStat | null>(null);
  const [absences, setAbsences] = useState<AbsenceDetail[]>([]);
  const [todayCourses, setTodayCourses] = useState<TodayCourse[]>([]);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: mounted
      ? {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        }
      : { opacity: 0 },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const idParent = localStorage.getItem("id");

        if (!token || !idParent) {
          throw new Error("Authentication required");
        }

        const enfantsResponse = await fetch(
          `http://localhost:8080/Etudiant/allEnfant?idParent=${idParent}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!enfantsResponse.ok) {
          throw new Error(`Failed to fetch children data: ${enfantsResponse.statusText}`);
        }

        const enfantsData: Enfant[] = await enfantsResponse.json();
        console.log("API Response:", enfantsData);
        const validEnfants = enfantsData.filter((enfant) => enfant.id !== undefined && enfant.id !== null);
        setEnfants(validEnfants);

        if (validEnfants.length > 0) {
          setSelectedEnfant(validEnfants[0]);
          fetchEnfantDetails(validEnfants[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (mounted) {
      fetchData();
    }
  }, [mounted]);

  const fetchEnfantDetails = async (enfant: Enfant) => {
    try {
      const token = localStorage.getItem("authToken");

      const statsResponse = await fetch(
        `http://localhost:8080/Absences/statisticParent?idEnfant=${enfant.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (statsResponse.ok) {
        const statsData: AbsenceStat = await statsResponse.json();
        setStats(statsData);
      }

      const absencesResponse = await fetch(
        `http://localhost:8080/api/seance/enfant?idEtud=${enfant.id}&jour=LUNDI`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (absencesResponse.ok) {
        const absencesData: AbsenceDetail[] = await absencesResponse.json();
        setAbsences(absencesData);
      }

      generateTodayCourses(enfant);
    } catch (err) {
      console.error("Error fetching enfant details:", err);
    }
  };

  const generateTodayCourses = (enfant: Enfant) => {
    const colors = [
      "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-200",
      "bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900/20 dark:border-purple-700 dark:text-purple-200",
      "bg-green-100 border-green-300 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-200",
      "bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-900/20 dark:border-amber-700 dark:text-amber-200",
      "bg-pink-100 border-pink-300 text-pink-800 dark:bg-pink-900/20 dark:border-pink-700 dark:text-pink-200",
      "bg-red-100 border-red-300 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-200",
    ];

    const modules = [
      `Module 1 - ${enfant.filiere} ${enfant.niveau}`,
      `Module 2 - ${enfant.filiere} ${enfant.niveau}`,
      `Module 3 - ${enfant.filiere} ${enfant.niveau}`,
      `Module 4 - ${enfant.filiere} ${enfant.niveau}`,
    ];

    const times = [
      "08:00 - 09:00",
      "09:00 - 10:00",
      "10:00 - 11:00",
      "11:00 - 12:00",
      "14:00 - 15:00",
      "15:00 - 16:00",
    ];

    const rooms = ["A101", "B201", "C301", "D401", "E501"];

    const todayCoursesData = times.map((time, index) => ({
      time,
      name: modules[index % modules.length],
      teacher: `Prof. ${enfant.filiere.charAt(0)}${enfant.niveau.charAt(enfant.niveau.length - 1)}${index}`,
      room: rooms[index % rooms.length],
      color: colors[index % colors.length],
    }));

    setTodayCourses(todayCoursesData);
  };

  const handleTabChange = (enfantId: string) => {
    const enfant = enfants.find((e) => e.id.toString() === enfantId);
    if (enfant) {
      setSelectedEnfant(enfant);
      fetchEnfantDetails(enfant);
    }
  };

  const formatDate = (dateString: string) => {
    if (!mounted) return "Chargement...";

    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    };

    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  // Helper function to format Base64 image
  const getImageSrc = (image: string | null) => {
    if (!image) return "/default-avatar.png";
    return `data:image/jpeg;base64,${image}`;
  };

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (enfants.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Aucun enfant trouvé</div>
      </div>
    );
  }

  const defaultTabValue = enfants[0].id.toString();

  return (
    <ThemeProvider>
      <motion.div className="space-y-6 p-4 md:p-6" variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-gradient">Mes Enfants</CardTitle>
              <CardDescription>Sélectionnez un enfant pour voir ses informations</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={defaultTabValue} className="w-full" onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  {enfants.map((enfant) => (
                    <TabsTrigger
                      key={enfant.id}
                      value={enfant.id.toString()}
                      className="flex items-center gap-2"
                    >
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={getImageSrc(enfant.image)} alt={`${enfant.prenom} ${enfant.nom}`} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white text-xs">
                          {enfant.prenom.charAt(0)}
                          {enfant.nom.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                <strong>Email:</strong> {enfant.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                <strong>Téléphone:</strong> {enfant.tel}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                <strong>Genre:</strong> {enfant.gender === "MALE" ? "Masculin" : "Féminin"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Layers className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                <strong>Niveau:</strong> {enfant.niveau.replace("NIVEAU_", "Niveau ")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Network className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                <strong>Adresse MAC:</strong> {enfant.addressMAC}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                <strong>Filière:</strong> {enfant.filiere}
                              </span>
                            </div>
                          </div>
                      <span>
                        {enfant.prenom} {enfant.nom}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {enfants.map((enfant) => (
                  <TabsContent key={enfant.id} value={enfant.id.toString()} className="space-y-6 mt-15">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <Card className="border-none shadow-md overflow-hidden">
                        <CardHeader className="pb-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                          <div className="flex justify-between items-center">
                            <CardTitle>Profil</CardTitle>
                            <Link href="/dashboard/enfants">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                              >
                                Détails
                              </Button>
                            </Link>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                              <AvatarImage src={getImageSrc(enfant.image)} alt={`${enfant.prenom} ${enfant.nom}`} />
                              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white text-lg">
                                {enfant.prenom.charAt(0)}
                                {enfant.nom.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h2 className="text-xl font-bold text-gradient">
                                {enfant.prenom} {enfant.nom}
                              </h2>
                              <div className="flex flex-col gap-1 mt-1">
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Users className="mr-1 h-3 w-3" />
                                  <span>
                                    {enfant.filiere} - {enfant.niveau}
                                  </span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <BookOpen className="mr-1 h-3 w-3" />
                                  <span>MAC: {enfant.addressMAC}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card className="overflow-hidden border-none shadow-md">
                          <CardContent className="p-0">
                            <div className="flex items-start">
                              <div className="p-4 flex-1">
                                <h3 className="text-base font-semibold mb-1">Absences</h3>
                                <div className="text-2xl font-bold text-red-500">
                                  {stats?.totalAbsence || 0}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">Ce mois-ci</div>
                              </div>
                              <div className="bg-gradient-to-br from-red-500 to-pink-500 p-4 flex items-center justify-center">
                                <Bell className="h-6 w-6 text-white" />
                              </div>
                            </div>
                            <div className="bg-red-50 dark:bg-red-900/20 p-2 border-t border-red-100 dark:border-red-900/30">
                              <Link
                                href="/dashboard/presences"
                                className="text-xs text-red-600 dark:text-red-400 font-medium hover:underline flex items-center"
                              >
                                <span>Voir les détails</span>
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="overflow-hidden border-none shadow-md">
                          <CardContent className="p-0">
                            <div className="flex items-start">
                              <div className="p-4 flex-1">
                                <h3 className="text-base font-semibold mb-1">Non justifiées</h3>
                                <div className="text-2xl font-bold text-orange-500">
                                  {stats?.absenceNoJustif || 0}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Sur {stats?.totalAbsence || 0} absences
                                </div>
                              </div>
                              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 flex items-center justify-center">
                                <AlertTriangle className="h-6 w-6 text-white" />
                              </div>
                            </div>
                            <div className="bg-orange-50 dark:bg-orange-900/20 p-2 border-t border-orange-100 dark:border-orange-900/30">
                              <Link
                                href="/dashboard/presences"
                                className="text-xs text-orange-600 dark:text-orange-400 font-medium hover:underline flex items-center"
                              >
                                <span>Justifier maintenant</span>
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="overflow-hidden border-none shadow-md">
                          <CardContent className="p-0">
                            <div className="flex items-start">
                              <div className="p-4 flex-1">
                                <h3 className="text-base font-semibold mb-1">Justifiées</h3>
                                <div className="text-2xl font-bold text-green-500">
                                  {stats?.absenceJustif || 0}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Sur {stats?.totalAbsence || 0} absences
                                </div>
                              </div>
                              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 flex items-center justify-center">
                                <CheckCircle className="h-6 w-6 text-white" />
                              </div>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-2 border-t border-green-100 dark:border-green-900/30">
                              <Link
                                href="/dashboard/presences"
                                className="text-xs text-green-600 dark:text-green-400 font-medium hover:underline flex items-center"
                              >
                                <span>Justifier une absence</span>
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="overflow-hidden border-none shadow-md">
                          <CardContent className="p-0">
                            <div className="flex items-start">
                              <div className="p-4 flex-1">
                                <h3 className="text-base font-semibold mb-1">Notifications</h3>
                                <div className="text-2xl font-bold text-amber-500">
                                  {absences.filter((a) => a.isJustif === "false").length}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">Non lues</div>
                              </div>
                              <div className="bg-gradient-to-br from-amber-500 to-yellow-500 p-4 flex items-center justify-center">
                                <Bell className="h-6 w-6 text-white" />
                              </div>
                            </div>
                            <div className="bg-amber-50 dark:bg-amber-900/20 p-2 border-t border-amber-100 dark:border-amber-900/30">
                              <Link
                                href="/dashboard/notifications"
                                className="text-xs text-amber-600 dark:text-amber-400 font-medium hover:underline flex items-center"
                              >
                                <span>Voir les notifications</span>
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <motion.div variants={item}>
                      <Card className="border-none shadow-md">
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <div>
                              <CardTitle className="text-gradient">Emploi du temps aujourd'hui</CardTitle>
                              <CardDescription>Programme pour aujourd'hui</CardDescription>
                            </div>
                            <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500">
                              {new Date().toLocaleDateString("fr-FR", { weekday: "long" }).charAt(0).toUpperCase() +
                                new Date().toLocaleDateString("fr-FR", { weekday: "long" }).slice(1)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {todayCourses.map((course, index) => (
                              <div
                                key={index}
                                className={`p-3 rounded-lg border ${course.color} transition-all hover:shadow-md`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center p-2 bg-white/60 dark:bg-black/20 rounded-md">
                                      <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                      <h3 className="font-medium">{course.name}</h3>
                                      <p className="text-xs opacity-80">
                                        {course.room} • {course.teacher}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-sm font-medium">{course.time}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 flex justify-center">
                            <Link href="/dashboard/enfants">
                              <Button className="btn-gradient">Voir l'emploi du temps complet</Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <Card className="border-none shadow-md">
                      <CardHeader>
                        <div>
                          <CardTitle className="text-gradient">Dernières absences</CardTitle>
                          <CardDescription>Historique récent des absences</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {absences.slice(0, 3).map((absence, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors dark:bg-gray-800/50 dark:hover:bg-gray-800"
                            >
                              <div className="flex items-center space-x-4">
                                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                  <AvatarImage src={getImageSrc(enfant.image)} alt={`${enfant.prenom} ${enfant.nom}`} />
                                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                                    {enfant.prenom.charAt(0)}
                                    {enfant.nom.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-medium">{absence.moduleTitre}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {formatDate(absence.dateAbsences)} • {absence.salle}
                                  </p>
                                </div>
                              </div>
                              <Badge
                                variant={absence.isJustif === "true" ? "default" : "destructive"}
                                className={
                                  absence.isJustif === "true"
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                    : "bg-gradient-to-r from-red-500 to-pink-500"
                                }
                              >
                                {absence.isJustif === "true" ? "Justifiée" : "Non justifiée"}
                              </Badge>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex justify-center">
                          <Link href="/dashboard/presences">
                            <Button className="btn-gradient">Voir toutes les absences</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </ThemeProvider>
  );
}