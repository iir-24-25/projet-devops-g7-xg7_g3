"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, ArrowRight, BookOpen, Users, AlertTriangle, Clock, Mail, User, Layers, Network, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState, useMemo } from "react";
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

  // Obtenir le jour actuel en français et en majuscules
  const currentDay = useMemo(() => {
    const day = new Date().toLocaleDateString("fr-FR", { weekday: "long" });
    return day.charAt(0).toUpperCase() + day.slice(1).toUpperCase(); // Ex: "LUNDI", "MARDI"
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: mounted ? { opacity: 1, transition: { staggerChildren: 0.1 } } : { opacity: 0 },
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
          throw new Error("Authentification requise");
        }

        const enfantsResponse = await fetch(
          `http://localhost:8080/Etudiant/allEnfant?idParent=${idParent}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!enfantsResponse.ok) {
          throw new Error(`Erreur lors de la récupération des enfants: ${enfantsResponse.statusText}`);
        }

        const enfantsData: Enfant[] = await enfantsResponse.json();
        const validEnfants = enfantsData.filter((enfant) => enfant.id !== undefined && enfant.id !== null);
        setEnfants(validEnfants);

        if (validEnfants.length > 0) {
          setSelectedEnfant(validEnfants[0]);
          fetchEnfantDetails(validEnfants[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur inconnue est survenue");
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

      // Récupérer les statistiques d'absence
      const statsResponse = await fetch(
        `http://localhost:8080/Absences/statisticParent?idEnfant=${enfant.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (statsResponse.ok) {
        const statsData: AbsenceStat = await statsResponse.json();
        setStats(statsData);
      }

      // Récupérer toutes les absences de l'étudiant
      const absencesResponse = await fetch(
        `http://localhost:8080/Absences/AllAbsencesEtud?idEtud=${enfant.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (absencesResponse.ok) {
        const absencesData: AbsenceDetail[] = await absencesResponse.json();
        setAbsences(absencesData);
      }

      generateTodayCourses(enfant);
    } catch (err) {
      console.error("Erreur lors de la récupération des détails de l&apos;enfant:", err);
    }
  };

  const generateTodayCourses = (enfant: Enfant) => {
    const colors = [
      "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-200",
      "bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900/20 dark:border-purple-700 dark:text-purple-200",
      "bg-green-100 border-green-300 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-200",
      "bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-900/20 dark:border-amber-700 dark:text-amber-200",
    ];

    const modules = [
      `Module 1 - ${enfant.filiere} ${enfant.niveau}`,
      `Module 2 - ${enfant.filiere} ${enfant.niveau}`,
      `Module 3 - ${enfant.filiere} ${enfant.niveau}`,
      `Module 4 - ${enfant.filiere} ${enfant.niveau}`,
    ];

    const times = ["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00"];
    const rooms = ["A101", "B201", "C301", "D401"];

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

  const getImageSrc = (image: string | null) => {
    return image ? `data:image/jpeg;base64,${image}` : "/default-avatar.png";
  };

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        <span className="ml-4 text-gray-600">Chargement des données...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="border-none shadow-md p-6">
          <CardContent>
            <div className="text-red-500 text-center">{error}</div>
            <Button
              className="mt-4 btn-gradient"
              onClick={() => window.location.reload()}
            >
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (enfants.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="border-none shadow-md p-6">
          <CardContent>
            <div className="text-gray-500 text-center">Aucun enfant trouvé</div>
            <Link href="/parents/enfants">
              <Button className="mt-4 btn-gradient">Ajouter un enfant</Button>
            </Link>
          </CardContent>
        </Card>
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
              <CardTitle className="text-gradient">Tableau de bord</CardTitle>
              <CardDescription>Gérez les informations de vos enfants</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={defaultTabValue} onValueChange={handleTabChange}>
                {/* Liste des onglets pour les enfants */}
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
                      <span>
                        {enfant.prenom} {enfant.nom}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Contenu des onglets */}
                {enfants.map((enfant) => (
                  <TabsContent key={enfant.id} value={enfant.id.toString()} className="space-y-6 mt-11">
                    {/* Section Profil et Statistiques */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Carte Profil */}
                      <Card className="border-none shadow-md ">
                        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3">
                          <CardTitle>Profil</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                              <AvatarImage src={getImageSrc(enfant.image)} />
                              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white text-lg">
                                {enfant.prenom.charAt(0)}
                                {enfant.nom.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h2 className="text-xl font-bold">{enfant.prenom} {enfant.nom}</h2>
                              <p className="text-sm text-muted-foreground">{enfant.filiere} - {enfant.niveau}</p>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{enfant.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{enfant.tel}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Network className="h-4 w-4 text-muted-foreground" />
                              <span>MAC: {enfant.addressMAC}</span>
                            </div>
                          </div>
                          <Link href="/parents/enfants">
                            <Button className="mt-4 btn-gradient w-full">Voir les détails</Button>
                          </Link>
                        </CardContent>
                      </Card>

                      {/* Cartes Statistiques */}
                      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          {
                            title: "Absences",
                            value: stats?.totalAbsence || 0,
                            icon: Bell,
                            color: "from-red-500 to-pink-500",
                            link: "/parents/presences",
                            linkText: "Voir les détails",
                          },
                          {
                            title: "Non justifiées",
                            value: stats?.absenceNoJustif || 0,
                            icon: AlertTriangle,
                            color: "from-orange-500 to-red-500",
                            link: "/parents/presences",
                            linkText: "Justifier maintenant",
                          },
                          {
                            title: "Justifiées",
                            value: stats?.absenceJustif || 0,
                            icon: CheckCircle,
                            color: "from-green-500 to-emerald-500",
                            link: "/parents/presences",
                            linkText: "Justifier une absence",
                          },
                          {
                            title: "Notifications",
                            value: absences.filter((a) => a.isJustif === "false").length,
                            icon: Bell,
                            color: "from-amber-500 to-yellow-500",
                            link: "/parents/notifications",
                            linkText: "Voir les notifications",
                          },
                        ].map((stat, index) => (
                          <Card key={index} className="border-none shadow-md overflow-hidden">
                            <CardContent className="p-0">
                              <div className="flex items-start">
                                <div className="p-4 flex-1">
                                  <h3 className="text-base font-semibold">{stat.title}</h3>
                                  <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {stat.title === "Notifications" ? "Non lues" : "Ce mois-ci"}
                                  </div>
                                </div>
                                <div className={`bg-gradient-to-br ${stat.color} p-4 flex items-center justify-center`}>
                                  <stat.icon className="h-6 w-6 text-white" />
                                </div>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-800/50 p-2 border-t">
                                <Link href={stat.link} className="text-xs font-medium hover:underline flex items-center">
                                  <span>{stat.linkText}</span>
                                  <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Emploi du temps */}
                    <Card className="border-none shadow-md">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-gradient">Emploi du temps aujourd&apos;hui</CardTitle>
                            <CardDescription>Programme pour {currentDay.toLowerCase()}</CardDescription>
                          </div>
                          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500">
                            {currentDay.charAt(0) + currentDay.slice(1).toLowerCase()}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {todayCourses.length > 0 ? (
                            todayCourses.map((course, index) => (
                              <div
                                key={index}
                                className={`p-3 rounded-lg border ${course.color} transition-all hover:shadow-md`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/60 dark:bg-black/20 rounded-md">
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
                            ))
                          ) : (
                            <p className="text-center text-gray-500">Aucun cours prévu aujourd&apos;hui</p>
                          )}
                        </div>
                        <div className="mt-4 flex justify-center">
                          <Link href="/parents/enfants">
                            <Button className="btn-gradient">Voir l&apos;emploi du temps complet</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Dernières absences */}
                    <Card className="border-none shadow-md">
                      <CardHeader>
                        <CardTitle className="text-gradient">Dernières absences</CardTitle>
                        <CardDescription>Historique récent des absences</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {absences.length > 0 ? (
                            absences.slice(0, 3).map((absence, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800"
                              >
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                    <AvatarImage src={getImageSrc(enfant.image)} />
                                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                                      {absence.prenom.charAt(0)}
                                      {absence.nom.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="font-medium">{absence.moduleTitre}</h3>
                                    <p className="text-sm text-muted-foreground">
                                      {formatDate(absence.dateAbsences)} • {absence.salle} • {absence.semestre}
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
                            ))
                          ) : (
                            <p className="text-center text-gray-500">Aucune absence récente</p>
                          )}
                        </div>
                        <div className="mt-4 flex justify-center">
                          <Link href="/parents/presences">
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