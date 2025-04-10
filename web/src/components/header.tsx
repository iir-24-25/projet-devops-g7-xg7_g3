"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assurez-vous que ce chemin correspond à votre structure
import { useRouter } from "next/navigation";

interface AdminInfo {
  nom: string;
  prenom: string;
  email: string;
  image: string; // Base64 encoded image
}

export function Header() {
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch admin info from API
  useEffect(() => {
    const fetchAdminInfo = async () => {
      const authToken = localStorage.getItem("authToken");
      const adminId = localStorage.getItem("id");

      if (!authToken) {
        setError("Aucun token d'authentification trouvé");
        setLoading(false);
        return;
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`http://localhost:8080/info/admin?id=${adminId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`Erreur serveur: ${response.status} - ${await response.text()}`);
        
        const data: AdminInfo = await response.json();
        if (!data.prenom) throw new Error("Prénom de l'administrateur manquant");

        setAdminInfo(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setError(error instanceof Error ? error.message : "Une erreur inconnue est survenue");
        setLoading(false);
      }
    };

    fetchAdminInfo();
  }, []);

  // Define navigation handler
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // Render states
  if (loading) return <div className="p-4">Chargement...</div>;
  if (error || !adminInfo) return <div className="p-4 text-red-600">Erreur: {error || "Aucune donnée disponible"}</div>;

  return (
    <div className="lg:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:shadow-xl hover:border-blue-300/70 dark:hover:border-blue-600/70 overflow-hidden transform hover:-translate-y-1">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
        <div className="col-span-1 md:col-span-2 lg:col-span-2 p-6 bg-gradient-to-br from-white/90 via-blue-50/80 to-indigo-50/80 dark:from-gray-800/90 dark:via-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <motion.div
                className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg"
                initial={{ rotate: -10, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.3,
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
              </motion.div>
              <motion.h1
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Hi, {adminInfo.prenom} 👋
              </motion.h1>
            </div>
            <motion.h2
              className="text-xl font-medium text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              What do you want to learn today with your partner?
            </motion.h2>
            <motion.p
              className="text-gray-600 dark:text-gray-300 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Discover courses, track progress, and achieve your learning goals seamlessly.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Button
                variant="default"
                className="mt-2 group shadow-md hover:shadow-lg hover:shadow-blue-500/20 bg-blue-500 hover:bg-blue-600"
                onClick={() => handleNavigation("/courses")}
              >
                Explore Courses
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </div>
        <div className="col-span-1 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <motion.img
            src="/images/creative-illustration.png"
            alt="Illustration d'apprentissage"
            className="max-h-[200px] object-contain relative z-10 drop-shadow-xl"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              delay: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            whileHover={{
              scale: 1.05,
              rotate: 2,
              transition: { duration: 0.3 },
            }}
          />
        </div>
      </div>
    </div>
  );
}