"use client";

import { useState, useEffect } from "react";
import { Store, FileText, Users, Settings, LogOut, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Added import for Image component

interface AdminInfo {
  nom: string;
  prenom: string;
  email: string;
  image: string; // Base64 encoded image
}

interface ProfileDropdownProps {
  user?: AdminInfo;
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
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
        if (!data.nom || !data.prenom || !data.email) throw new Error("Données administrateur incomplètes");

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

  // Handle hydration and outside click
  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("profile-dropdown");
      if (dropdown && !dropdown.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Event handlers
  const toggleDropdown = () => setIsOpen(prev => !prev);
  const handleLogout = () => {
    router.push("/dashboard");
    setIsOpen(false);
  };
  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  // Determine display user data (API or props)
  const displayUser = adminInfo || user;

  // Render states
  if (loading) return <div className="p-4">Chargement...</div>;
  if (error || !displayUser) return <div className="p-4 text-red-600">Erreur: {error || "Aucune donnée utilisateur disponible"}</div>;

  const getImageSrc = (image: string) => 
    image.startsWith("data:") ? image : `data:image/jpeg;base64,${image}`;

  return (
    <div className="relative" id="profile-dropdown">
      <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
          {displayUser.image ? (
            <Image
              src={getImageSrc(displayUser.image)}
              alt={`${displayUser.prenom} ${displayUser.nom}`}
              width={40}
              height={40}
              className="object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-sm flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
          <div className="p-4 flex items-center space-x-3 border-b border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
              {displayUser.image ? (
                <Image
                  src={getImageSrc(displayUser.image)}
                  alt={`${displayUser.prenom} ${displayUser.nom}`}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-sm flex items-center justify-center">
                  <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-base dark:text-white">{`${displayUser.prenom} ${displayUser.nom}`}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{displayUser.email}</p>
            </div>
          </div>

          {mounted && (
            <div className="mx-4 my-3 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex justify-between">
              {["light", "dark", "system"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTheme(mode)}
                  className={`flex items-center justify-center p-2 rounded-md transition ${
                    theme === mode
                      ? "bg-white dark:bg-gray-600 shadow-sm text-black dark:text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {mode === "light" && <Sun className="w-5 h-5" />}
                  {mode === "dark" && <Moon className="w-5 h-5" />}
                  {mode === "system" && <Monitor className="w-5 h-5" />}
                </button>
              ))}
            </div>
          )}

          <nav className="mt-2 flex flex-col">
            {[
              { path: "/courses", icon: Store, label: "Vos cours" },
              { path: "/help", icon: FileText, label: "Documentation" },
              { path: "/students", icon: Users, label: "Affiliation" },
              { path: "/settings", icon: Settings, label: "Paramètres" },
            ].map(({ path, icon: Icon, label }) => (
              <button
                key={path}
                onClick={() => handleNavigation(path)}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition text-left w-full"
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 w-full text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition border-t border-gray-100 dark:border-gray-700"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}