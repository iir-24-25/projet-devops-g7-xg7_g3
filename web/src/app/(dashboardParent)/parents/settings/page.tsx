"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
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
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formState, setFormState] = useState({
    firstName: "Martin",
    lastName: "Dupont",
    email: "martin.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    address: "123 School Street",
    city: "Paris",
    postalCode: "75001",
    country: "France",
    language: "en",
    notifications: {
      email: true,
      sms: true,
      app: true,
      absences: true,
      grades: true,
      events: true,
    },
  })

  const [avatarSrc, setAvatarSrc] = useState("/placeholder.svg?height=100&width=100")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [profileSuccess, setProfileSuccess] = useState("")

  // Evaluate password strength
  useEffect(() => {
    if (!passwordForm.newPassword) {
      setPasswordStrength(0)
      return
    }

    let strength = 0
    // Minimum length
    if (passwordForm.newPassword.length >= 8) strength += 25
    // Contains numbers
    if (/\d/.test(passwordForm.newPassword)) strength += 25
    // Contains lowercase and uppercase
    if (/[a-z]/.test(passwordForm.newPassword) && /[A-Z]/.test(passwordForm.newPassword)) strength += 25
    // Contains special characters
    if (/[^a-zA-Z0-9]/.test(passwordForm.newPassword)) strength += 25

    setPasswordStrength(strength)
  }, [passwordForm.newPassword])

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        alert("Please select an image.")
        return
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("The image is too large. Please select an image less than 5MB.")
        return
      }

      // Simulate upload
      setIsUploading(true)

      // Create URL to preview the image
      const reader = new FileReader()
      reader.onload = (event) => {
        setTimeout(() => {
          setAvatarSrc(event.target?.result as string)
          setIsUploading(false)
          // Show success message
          setProfileSuccess("Your profile picture has been updated successfully.")
          setTimeout(() => setProfileSuccess(""), 3000)
        }, 1500) // Simulate upload delay
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Simulate successful update
    setTimeout(() => {
      setProfileSuccess("Your information has been updated successfully.")
      setTimeout(() => setProfileSuccess(""), 3000)
    }, 1000)
  }

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPasswordError("")
    setPasswordSuccess("")

    // Simple validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Passwords do not match.")
      return
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long.")
      return
    }

    // Simulate successful update
    setTimeout(() => {
      setPasswordSuccess("Your password has been updated successfully.")
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setTimeout(() => setPasswordSuccess(""), 3000)
    }, 1000)
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
                            MD
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
                          <Label htmlFor="firstName" className="text-blue-600 dark:text-blue-400">
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            value={formState.firstName}
                            onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-blue-600 dark:text-blue-400">
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            value={formState.lastName}
                            onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
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
                        <Label htmlFor="phone" className="text-blue-600 dark:text-blue-400">
                          Phone
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            value={formState.phone}
                            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="language" className="text-blue-600 dark:text-blue-400">
                          Ville
                        </Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <Select
                            value={formState.language}
                            onValueChange={(value) => setFormState({ ...formState, language: value })}
                          >
                            <SelectTrigger id="language" className="pl-10">
                              <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">MARRAKECH</SelectItem>
                              <SelectItem value="fr">RABAT</SelectItem>
                              <SelectItem value="es">CASABLANCA</SelectItem>
                              <SelectItem value="de">FES</SelectItem>
                              <SelectItem value="de">TANGER</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>

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
                      <Switch
                        id="email-notifications"
                        checked={formState.notifications.email}
                        onCheckedChange={(checked) =>
                          setFormState({
                            ...formState,
                            notifications: { ...formState.notifications, email: checked },
                          })
                        }
                      />
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
                      <Switch
                        id="sms-notifications"
                        checked={formState.notifications.sms}
                        onCheckedChange={(checked) =>
                          setFormState({
                            ...formState,
                            notifications: { ...formState.notifications, sms: checked },
                          })
                        }
                      />
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
                      <Switch
                        id="app-notifications"
                        checked={formState.notifications.app}
                        onCheckedChange={(checked) =>
                          setFormState({
                            ...formState,
                            notifications: { ...formState.notifications, app: checked },
                          })
                        }
                      />
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
                          <p className="text-sm text-muted-foreground">Notifications about your children's absences</p>
                        </div>
                      </div>
                      <Switch
                        id="absences-notifications"
                        checked={formState.notifications.absences}
                        onCheckedChange={(checked) =>
                          setFormState({
                            ...formState,
                            notifications: { ...formState.notifications, absences: checked },
                          })
                        }
                      />
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
                          <p className="text-sm text-muted-foreground">Notifications about your children's grades</p>
                        </div>
                      </div>
                      <Switch
                        id="grades-notifications"
                        checked={formState.notifications.grades}
                        onCheckedChange={(checked) =>
                          setFormState({
                            ...formState,
                            notifications: { ...formState.notifications, grades: checked },
                          })
                        }
                      />
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
                      <Switch
                        id="events-notifications"
                        checked={formState.notifications.events}
                        onCheckedChange={(checked) =>
                          setFormState({
                            ...formState,
                            notifications: { ...formState.notifications, events: checked },
                          })
                        }
                      />
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
                      <Switch id="messages-notifications" checked={true} onCheckedChange={(checked) => {}} />
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
  )
}