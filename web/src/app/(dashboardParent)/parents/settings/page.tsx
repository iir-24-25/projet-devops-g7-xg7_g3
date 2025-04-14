"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import {
  User,
  Lock,
  Upload,
  Save,
  Bell,
  Mail,
  Phone,
  Check,
  AlertTriangle,
  Eye,
  EyeOff,
  Info,
  Globe,
  Home,
  Shield,
  Smartphone,
  Calendar,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface ParentInfo {
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  image: string | null;
  ville: string;
}

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formState, setFormState] = useState<ParentInfo>({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    image: null,
    ville: "",
  });
  const [avatarSrc, setAvatarSrc] = useState("/placeholder.svg?height=100&width=100");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");
  const [loading, setLoading] = useState(true);

  // Récupérer les informations du parent depuis l'API
  useEffect(() => {
    const fetchParentInfo = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const idParent = localStorage.getItem("id");

        if (!token || !idParent) {
          throw new Error("Authentification requise");
        }

        const response = await fetch(`http://localhost:8080/parents/info?idParent=${idParent}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des informations du parent");
        }

        const data: ParentInfo = await response.json();
        setFormState({
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          tel: data.tel,
          image: data.image,
          ville: data.ville,
        });

        // Mettre à jour l'avatar si une image est présente
        if (data.image) {
          setAvatarSrc(`data:image/jpeg;base64,${data.image}`);
        }
      } catch (err) {
        setProfileError(err instanceof Error ? err.message : "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchParentInfo();
  }, []);

  // Évaluer la force du mot de passe
  useEffect(() => {
    if (!passwordForm.newPassword) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (passwordForm.newPassword.length >= 8) strength += 25;
    if (/\d/.test(passwordForm.newPassword)) strength += 25;
    if (/[a-z]/.test(passwordForm.newPassword) && /[A-Z]/.test(passwordForm.newPassword)) strength += 25;
    if (/[^a-zA-Z0-9]/.test(passwordForm.newPassword)) strength += 25;

    setPasswordStrength(strength);
  }, [passwordForm.newPassword]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setProfileError("Veuillez sélectionner une image.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setProfileError("L'image est trop grande. Veuillez sélectionner une image de moins de 5 Mo.");
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const base64Image = (event.target?.result as string).split(",")[1]; // Supprimer le préfixe "data:image/jpeg;base64,"
          setAvatarSrc(event.target?.result as string);

          // Simuler l'envoi de l'image à l'API (à implémenter si une API existe)
          setProfileSuccess("Votre photo de profil a été mise à jour avec succès.");
          setTimeout(() => setProfileSuccess(""), 3000);
        } catch (err) {
          setProfileError("Erreur lors du téléchargement de l'image.");
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess("");

    try {
      // Simuler la mise à jour des informations du profil
      // À remplacer par une requête API réelle si disponible
      setProfileSuccess("Vos informations ont été mises à jour avec succès.");
      setTimeout(() => setProfileSuccess(""), 3000);
    } catch (err) {
      setProfileError("Erreur lors de la mise à jour des informations.");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    // Validation locale
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Le mot de passe doit comporter au moins 8 caractères.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const idParent = localStorage.getItem("id");

      if (!token || !idParent) {
        throw new Error("Authentification requise");
      }

      const response = await fetch("http://localhost:8080/personne/modifierPassword/byOldPassowrd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idPersonne: parseInt(idParent),
          passwordNew: passwordForm.newPassword,
          passwordOld: passwordForm.currentPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la mise à jour du mot de passe");
      }

      setPasswordSuccess("Votre mot de passe a été mis à jour avec succès.");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setPasswordSuccess(""), 3000);
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Une erreur est survenue");
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-gray-600">Chargement des données...</span>
      </div>
    );
  }

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-blue-50 dark:bg-blue-900/20 p-1 rounded-xl">
          <TabsTrigger
            value="account"
            className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-blue-800 dark:data-[state=active]:text-white"
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-blue-800 dark:data-[state=active]:text-white"
          >
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-blue-800 dark:data-[state=active]:text-white"
          >
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <motion.div variants={item}>
            <form onSubmit={handleProfileSubmit}>
              <Card className="border-none shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription className="text-white/80">Update your personal information</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex flex-col items-center">
                      <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                        <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                          <AvatarImage src={avatarSrc || "/placeholder.svg"} alt="Profile picture" />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white text-xl">
                            {formState.prenom.charAt(0)}
                            {formState.nom.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full transition-all flex items-center justify-center">
                          <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            {isUploading ? (
                              <div className="h-8 w-8 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                            ) : (
                              <Upload className="h-6 w-6" />
                            )}
                          </div>
                        </div>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 flex items-center gap-1"
                        onClick={handleAvatarClick}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <>
                            <div className="h-3.5 w-3.5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin mr-1"></div>
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-3.5 w-3.5" />
                            <span>Change photo</span>
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="grid gap-4 flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="prenom" className="text-blue-600 dark:text-blue-400">
                            First Name
                          </Label>
                          <Input
                            id="prenom"
                            value={formState.prenom}
                            onChange={(e) => setFormState({ ...formState, prenom: e.target.value })}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nom" className="text-blue-600 dark:text-blue-400">
                            Last Name
                          </Label>
                          <Input
                            id="nom"
                            value={formState.nom}
                            onChange={(e) => setFormState({ ...formState, nom: e.target.value })}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-blue-600 dark:text-blue-400">
                          Email
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tel" className="text-blue-600 dark:text-blue-400">
                          Phone
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <Input
                            id="tel"
                            value={formState.tel}
                            onChange={(e) => setFormState({ ...formState, tel: e.target.value })}
                            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ville" className="text-blue-600 dark:text-blue-400">
                          Ville
                        </Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <Select
                            value={formState.ville}
                            onValueChange={(value) => setFormState({ ...formState, ville: value })}
                          >
                            <SelectTrigger id="ville" className="pl-10">
                              <SelectValue placeholder="Select a city" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MARRAKECH">MARRAKECH</SelectItem>
                              <SelectItem value="RABAT">RABAT</SelectItem>
                              <SelectItem value="CASABLANCA">CASABLANCA</SelectItem>
                              <SelectItem value="FES">FES</SelectItem>
                              <SelectItem value="TANGER">TANGER</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>

                {profileError && (
                  <div className="mx-6 mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg text-red-600 dark:text-red-400 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{profileError}</span>
                  </div>
                )}

                {profileSuccess && (
                  <div className="mx-6 mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg text-green-600 dark:text-green-400 flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>{profileSuccess}</span>
                  </div>
                )}

                <CardFooter className="flex justify-end bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700">
                  <Button type="submit" className="btn-gradient mt-5">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </motion.div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <motion.div variants={item}>
            <form onSubmit={handlePasswordSubmit}>
              <Card className="border-none shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Account Security
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Update your password to secure your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-blue-600 dark:text-blue-400">
                      Current Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-blue-600 dark:text-blue-400">
                      New Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    {passwordForm.newPassword && (
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500">Password strength</span>
                          <span className="text-xs font-medium">
                            {passwordStrength <= 25
                              ? "Weak"
                              : passwordStrength <= 50
                              ? "Medium"
                              : passwordStrength <= 75
                              ? "Good"
                              : "Excellent"}
                          </span>
                        </div>
                        <Progress
                          value={passwordStrength}
                          className={`h-1.5 ${
                            passwordStrength <= 25
                              ? "bg-red-100"
                              : passwordStrength <= 50
                              ? "bg-yellow-100"
                              : passwordStrength <= 75
                              ? "bg-blue-100"
                              : "bg-green-100"
                          }`}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-blue-600 dark:text-blue-400">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/30">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-blue-500 dark:text-blue-400 mt-0.5" />
                      <div className="text-sm text-blue-600 dark:text-blue-400">
                        <p className="font-medium">Tips for a secure password:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-blue-600/80 dark:text-blue-400/80">
                          <li>At least 8 characters</li>
                          <li>Mix uppercase and lowercase letters</li>
                          <li>Include numbers and special characters</li>
                          <li>Avoid easily guessable personal information</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>

                {passwordError && (
                  <div className="mx-6 mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg text-red-600 dark:text-red-400 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{passwordError}</span>
                  </div>
                )}

                {passwordSuccess && (
                  <div className="mx-6 mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg text-green-600 dark:text-green-400 flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>{passwordSuccess}</span>
                  </div>
                )}

                <CardFooter className="flex justify-end bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700">
                  <Button type="submit" className="btn-gradient">
                    <Lock className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </motion.div>

          <motion.div variants={item}>
            <Card className="border-none shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Shield className="h-5 w-5" />
                  Two-Factor Authentication
                </CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <Smartphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">SMS Authentication</h3>
                      <p className="text-sm text-muted-foreground">Receive a verification code via SMS</p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <Separator className="my-4" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Authentication</h3>
                      <p className="text-sm text-muted-foreground">Receive a verification code via email</p>
                    </div>
                  </div>
                  <Switch checked={true} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <motion.div variants={item}>
            <Card className="border-none shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription className="text-white/80">
                  Customize how and when you want to be notified
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 text-blue-600 dark:text-blue-400">Notification Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <Label htmlFor="email-notifications" className="font-medium">
                            Email
                          </Label>
                          <p className="text-sm text-muted-foreground">Receive notifications by email</p>
                        </div>
                      </div>
                      <Switch id="email-notifications" checked={true} onCheckedChange={() => {}} />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <Label htmlFor="sms-notifications" className="font-medium">
                            SMS
                          </Label>
                          <p className="text-sm text-muted-foreground">Receive notifications by SMS</p>
                        </div>
                      </div>
                      <Switch id="sms-notifications" checked={true} onCheckedChange={() => {}} />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                          <Bell className="h-5 w-5" />
                        </div>
                        <div>
                          <Label htmlFor="app-notifications" className="font-medium">
                            Application
                          </Label>
                          <p className="text-sm text-muted-foreground">Receive in-app notifications</p>
                        </div>
                      </div>
                      <Switch id="app-notifications" checked={true} onCheckedChange={() => {}} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4 text-blue-600 dark:text-blue-400">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400">
                          <Bell className="h-5 w-5" />
                        </div>
                        <div>
                          <Label htmlFor="absences-notifications" className="font-medium">
                            Absences
                          </Label>
                          <p className="text-sm text-muted-foreground">Notifications about your children&apos;s absences</p>
                        </div>
                      </div>
                      <Switch id="absences-notifications" checked={true} onCheckedChange={() => {}} />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div>
                          <Label htmlFor="grades-notifications" className="font-medium">
                            Grades
                          </Label>
                          <p className="text-sm text-muted-foreground">Notifications about your children&apos;s grades</p>
                        </div>
                      </div>
                      <Switch id="grades-notifications" checked={true} onCheckedChange={() => {}} />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <Label htmlFor="events-notifications" className="font-medium">
                            Events
                          </Label>
                          <p className="text-sm text-muted-foreground">Notifications about school events</p>
                        </div>
                      </div>
                      <Switch id="events-notifications" checked={true} onCheckedChange={() => {}} />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                        <div>
                          <Label htmlFor="messages-notifications" className="font-medium">
                            Messages
                          </Label>
                          <p className="text-sm text-muted-foreground">Notifications about messages from teachers</p>
                        </div>
                      </div>
                      <Switch id="messages-notifications" checked={true} onCheckedChange={() => {}} />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/30">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-500 dark:text-blue-400 mt-0.5" />
                    <div className="text-sm text-blue-600 dark:text-blue-400">
                      <p>
                        You can change your notification preferences at any time. Important notifications about your
                        account security will always be sent.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700">
                <Button className="btn-gradient">
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}