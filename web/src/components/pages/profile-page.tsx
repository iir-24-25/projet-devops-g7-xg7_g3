"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  FileText,
  Globe,
  Calendar,
  Star,
  Cog,
  Bell,
  Lock,
  Languages,
  Palette,
  Moon,
  Sun,
  Monitor,
  Download,
  Edit,
  ChevronRight,
  Heart,
  Eye,
  Share2,
  Bookmark,
  CheckCircle,
  Building,
  Zap,
  BookOpen,
  Users,
  Coffee,
  Lightbulb,
  PenTool,
  Link,
  TrophyIcon,
} from "lucide-react"

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("resume")
  const [theme, setTheme] = useState("system")
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Hero Section */}
      <div className="relative mb-24 rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-48 h-48 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                <Avatar className="w-full h-full">
                  <AvatarImage
                    src="/placeholder.svg?height=192&width=192&text=MR"
                    alt="Mithun Ray"
                    className="object-cover"
                  />
                  <AvatarFallback className="text-6xl">MR</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-green-500 text-white p-2 rounded-full shadow-lg">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left text-white">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                <h1 className="text-4xl md:text-5xl font-bold">Mithun Ray</h1>
                <Badge className="bg-white/20 text-white hover:bg-white/30 self-center">Pro Member</Badge>
              </div>
              <h2 className="text-xl md:text-2xl font-light mb-4">Senior Product Designer & UI/UX Specialist</h2>
              <p className="text-white/80 max-w-2xl mb-6">
                Passionate about creating intuitive, accessible, and beautiful digital experiences. With over 8 years of
                experience in design leadership and product development, I help teams build user-centered solutions that
                drive business growth.
              </p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button className="bg-white text-blue-700 hover:bg-white/90 transition-all duration-300 hover:shadow-lg">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/20 transition-all duration-300 hover:shadow-lg"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/20 transition-all duration-300 hover:shadow-lg"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Profile
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">8+</div>
              <div className="text-white/80 text-sm">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">120+</div>
              <div className="text-white/80 text-sm">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-white/80 text-sm">Design Awards</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-white/80 text-sm">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="white"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              className="dark:fill-gray-900"
            ></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-20">
        {/* Navigation Tabs */}
        <Tabs defaultValue="resume" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-white dark:bg-gray-800 p-1 shadow-lg rounded-full border">
              <TabsTrigger
                value="resume"
                className="rounded-full px-6 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300 hover:shadow-md"
              >
                <FileText className="mr-2 h-5 w-5" />
                Resume
              </TabsTrigger>
              <TabsTrigger
                value="portfolio"
                className="rounded-full px-6 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300 hover:shadow-md"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Portfolio
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="rounded-full px-6 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300 hover:shadow-md"
              >
                <Cog className="mr-2 h-5 w-5" />
                Settings
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Resume Tab Content */}
          <TabsContent value="resume" className="mt-0 animate-in fade-in-50 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Contact Information */}
                <Card className="overflow-hidden border-none shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">mithun.ray@example.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">San Francisco, California</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                        <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Website</p>
                        <p className="font-medium">www.mithunray.design</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                        <Calendar className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Birthday</p>
                        <p className="font-medium">May 15, 1988</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card className="overflow-hidden border-none shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Professional Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Design Skills */}
                      <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center">
                          <PenTool className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                          Design
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">UI/UX Design</span>
                              <span>95%</span>
                            </div>
                            <Progress value={95} className="h-2 [&>div]:bg-indigo-600" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">Figma</span>
                              <span>98%</span>
                            </div>
                            <Progress value={98} className="h-2 [&>div]:bg-indigo-600" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">Adobe XD</span>
                              <span>90%</span>
                            </div>
                            <Progress value={90} className="h-2 [&>div]:bg-indigo-600" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">Sketch</span>
                              <span>85%</span>
                            </div>
                            <Progress value={85} className="h-2 [&>div]:bg-indigo-600" />
                          </div>
                        </div>
                      </div>

                      {/* Development Skills */}
                      <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center">
                          <Code className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                          Development
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">HTML/CSS</span>
                              <span>92%</span>
                            </div>
                            <Progress value={92} className="h-2 [&>div]:bg-indigo-600" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">JavaScript</span>
                              <span>80%</span>
                            </div>
                            <Progress value={80} className="h-2 [&>div]:bg-indigo-600" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">React</span>
                              <span>75%</span>
                            </div>
                            <Progress value={75} className="h-2 [&>div]:bg-indigo-600" />
                          </div>
                        </div>
                      </div>

                      {/* Soft Skills */}
                      <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center">
                          <Users className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                          Soft Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 px-3 py-1 text-sm">
                            Team Leadership
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 px-3 py-1 text-sm">
                            Communication
                          </Badge>
                          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200 px-3 py-1 text-sm">
                            Problem Solving
                          </Badge>
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 hover:bg-amber-200 px-3 py-1 text-sm">
                            Project Management
                          </Badge>
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-200 px-3 py-1 text-sm">
                            Creativity
                          </Badge>
                          <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 hover:bg-indigo-200 px-3 py-1 text-sm">
                            Adaptability
                          </Badge>
                          <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 hover:bg-teal-200 px-3 py-1 text-sm">
                            Time Management
                          </Badge>
                          <Badge className="bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 hover:bg-pink-200 px-3 py-1 text-sm">
                            Empathy
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Languages */}
                <Card className="overflow-hidden border-none shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Languages className="h-5 w-5" />
                      Languages
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">🇺🇸</span>
                            <span className="font-semibold">English</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            Native
                          </Badge>
                        </div>
                        <Progress value={100} className="h-2 [&>div]:bg-indigo-600" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">🇪🇸</span>
                            <span className="font-semibold">Spanish</span>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            Fluent
                          </Badge>
                        </div>
                        <Progress value={85} className="h-2 [&>div]:bg-indigo-600" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">🇫🇷</span>
                            <span className="font-semibold">French</span>
                          </div>
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                            Intermediate
                          </Badge>
                        </div>
                        <Progress value={60} className="h-2 [&>div]:bg-indigo-600" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">🇯🇵</span>
                            <span className="font-semibold">Japanese</span>
                          </div>
                          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                            Basic
                          </Badge>
                        </div>
                        <Progress value={30} className="h-2 [&>div]:bg-indigo-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Interests */}
                <Card className="overflow-hidden border-none shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Interests & Hobbies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <Coffee className="h-8 w-8 text-amber-600 dark:text-amber-400 mb-2" />
                        <span className="text-center font-medium">Coffee Brewing</span>
                      </div>

                      <div className="flex flex-col items-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                        <span className="text-center font-medium">Reading</span>
                      </div>

                      <div className="flex flex-col items-center p-4 rounded-xl bg-green-50 dark:bg-green-900/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <Globe className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                        <span className="text-center font-medium">Traveling</span>
                      </div>

                      <div className="flex flex-col items-center p-4 rounded-xl bg-purple-50 dark:bg-purple-900/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <Lightbulb className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
                        <span className="text-center font-medium">Innovation</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* About Me */}
                <Card className="overflow-hidden border-none shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <User className="h-5 w-5" />
                      About Me
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4 text-lg">
                      <p>
                        I&apos;m a passionate Senior Product Designer with over 8 years of experience creating user-centered
                        digital experiences that blend aesthetics with functionality. My approach combines strategic
                        thinking with creative problem-solving to deliver designs that not only look beautiful but also
                        achieve business goals.
                      </p>
                      <p>
                        Throughout my career, I&apos;ve collaborated with cross-functional teams to build products that users
                        love. I specialize in UI/UX design, design systems, and leading design teams to create cohesive
                        experiences across multiple platforms and touchpoints.
                      </p>
                      <p>
                        My design philosophy centers on empathy, accessibility, and continuous iteration. I believe that
                        great design should be inclusive and solve real problems for real people. When I&apos;m not
                        designing, you&apos;ll find me exploring new coffee shops, reading design books, or traveling to gain
                        new perspectives.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Work Experience */}
                <Card className="overflow-hidden border-none shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Professional Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-8">
                      {/* Job 1 */}
                      <div className="relative pl-8 pb-8 border-l-2 border-indigo-200 dark:border-indigo-800">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600"></div>
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h3 className="text-xl font-bold">Senior Product Designer</h3>
                              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                <Building className="h-4 w-4" />
                                <span className="font-medium">TechCorp Inc.</span>
                              </div>
                            </div>
                            <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 self-start sm:self-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              2020 - Present
                            </Badge>
                          </div>

                          <div className="mt-4 space-y-4">
                            <p className="text-muted-foreground">
                              Led the design team in creating user-centered interfaces for enterprise software products.
                              Established design systems and processes that improved collaboration between design and
                              development teams.
                            </p>

                            <div>
                              <h4 className="font-medium mb-2">Key Achievements:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                <li>Redesigned the flagship product interface, increasing user engagement by 45%</li>
                                <li>Built and implemented a comprehensive design system used across 5 product lines</li>
                                <li>Led a team of 8 designers across multiple projects and initiatives</li>
                                <li>Reduced design-to-development handoff time by 30% through improved processes</li>
                                <li>Conducted user research that informed product strategy and roadmap decisions</li>
                              </ul>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">UI/UX Design</Badge>
                              <Badge variant="outline">Design Systems</Badge>
                              <Badge variant="outline">Team Leadership</Badge>
                              <Badge variant="outline">Product Strategy</Badge>
                              <Badge variant="outline">User Research</Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Job 2 */}
                      <div className="relative pl-8 pb-8 border-l-2 border-indigo-200 dark:border-indigo-800">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600"></div>
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h3 className="text-xl font-bold">Product Designer</h3>
                              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                <Building className="h-4 w-4" />
                                <span className="font-medium">InnovateLabs</span>
                              </div>
                            </div>
                            <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 self-start sm:self-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              2017 - 2020
                            </Badge>
                          </div>

                          <div className="mt-4 space-y-4">
                            <p className="text-muted-foreground">
                              Designed user interfaces for mobile and web applications across various industries.
                              Collaborated closely with developers and product managers to deliver cohesive user
                              experiences.
                            </p>

                            <div>
                              <h4 className="font-medium mb-2">Key Achievements:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                <li>Designed a healthcare app that improved patient engagement by 60%</li>
                                <li>Created and maintained design guidelines for a fintech startup</li>
                                <li>Led user testing sessions that identified critical usability issues</li>
                                <li>
                                  Collaborated with engineering teams to ensure design feasibility and implementation
                                  quality
                                </li>
                                <li>Mentored junior designers and interns, helping them develop their skills</li>
                              </ul>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">Mobile Design</Badge>
                              <Badge variant="outline">User Research</Badge>
                              <Badge variant="outline">Prototyping</Badge>
                              <Badge variant="outline">Usability Testing</Badge>
                              <Badge variant="outline">Design Thinking</Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Job 3 */}
                      <div className="relative pl-8 border-l-2 border-indigo-200 dark:border-indigo-800">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600"></div>
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h3 className="text-xl font-bold">UI/UX Designer</h3>
                              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                <Building className="h-4 w-4" />
                                <span className="font-medium">DesignWorks Studio</span>
                              </div>
                            </div>
                            <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 self-start sm:self-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              2015 - 2017
                            </Badge>
                          </div>

                          <div className="mt-4 space-y-4">
                            <p className="text-muted-foreground">
                              Created visual designs for websites and applications for a diverse client base. Developed
                              brand identities and style guides while ensuring consistent user experiences.
                            </p>

                            <div>
                              <h4 className="font-medium mb-2">Key Achievements:</h4>
                              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                <li>Designed award-winning e-commerce website that increased conversions by 35%</li>
                                <li>Created brand identity systems for 12+ startups and established businesses</li>
                                <li>Developed responsive web designs that improved mobile engagement</li>
                                <li>Established client presentation processes that improved project approval rates</li>
                              </ul>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">Web Design</Badge>
                              <Badge variant="outline">Branding</Badge>
                              <Badge variant="outline">Client Relations</Badge>
                              <Badge variant="outline">Visual Design</Badge>
                              <Badge variant="outline">Responsive Design</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Education */}
                <Card className="overflow-hidden border-none shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-8">
                      {/* Education 1 */}
                      <div className="relative pl-8 pb-8 border-l-2 border-green-200 dark:border-green-800">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-600"></div>
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h3 className="text-xl font-bold">Master of Design</h3>
                              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                <Building className="h-4 w-4" />
                                <span className="font-medium">California Institute of Design</span>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 self-start sm:self-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              2013 - 2015
                            </Badge>
                          </div>

                          <div className="mt-4 space-y-4">
                            <p className="text-muted-foreground">
                              Specialized in Interaction Design with focus on human-computer interaction and user
                              experience design. Graduated with honors and received the Outstanding Design Student
                              Award.
                            </p>

                            <div>
                              <h4 className="font-medium mb-2">Thesis & Research:</h4>
                              <p className="text-muted-foreground">
                              &quot;Designing Intuitive Interfaces for Complex Systems: A Case Study in Healthcare
                                Applications&quot;
                              </p>
                              <p className="text-muted-foreground mt-2">
                                Research focused on simplifying complex workflows in medical software through innovative
                                interface design patterns and user-centered methodologies.
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">Interaction Design</Badge>
                              <Badge variant="outline">User Research</Badge>
                              <Badge variant="outline">Design Theory</Badge>
                              <Badge variant="outline">Human-Computer Interaction</Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Education 2 */}
                      <div className="relative pl-8 border-l-2 border-green-200 dark:border-green-800">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-600"></div>
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h3 className="text-xl font-bold">Bachelor of Fine Arts</h3>
                              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                <Building className="h-4 w-4" />
                                <span className="font-medium">University of Creative Arts</span>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 self-start sm:self-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              2009 - 2013
                            </Badge>
                          </div>

                          <div className="mt-4 space-y-4">
                            <p className="text-muted-foreground">
                              Major in Graphic Design with minor in Computer Science. Graduated with honors (GPA:
                              3.92/4.0). Active member of the Design Student Association and Digital Arts Club.
                            </p>

                            <div>
                              <h4 className="font-medium mb-2">Senior Project:</h4>
                              <p className="text-muted-foreground">
                              &quot;Visual Communication in Digital Environments: Exploring the Intersection of Design and
                                Technology&quot;
                              </p>
                              <p className="text-muted-foreground mt-2">
                                Created an interactive digital exhibition that explored how visual design principles
                                translate across different digital platforms and contexts.
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">Graphic Design</Badge>
                              <Badge variant="outline">Typography</Badge>
                              <Badge variant="outline">Digital Media</Badge>
                              <Badge variant="outline">Web Development</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications & Awards */}
                <Card className="overflow-hidden border-none shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Certifications & Awards
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Certification 1 */}
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-purple-100 dark:border-purple-900/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                            <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">Certified UX Professional</h3>
                            <p className="text-purple-600 dark:text-purple-400 font-medium">Nielsen Norman Group</p>
                            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>2019</span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                              Comprehensive certification covering user research, information architecture, interaction
                              design, and usability evaluation methods.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Award 1 */}
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-purple-100 dark:border-purple-900/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                            <Star className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">Design Excellence Award</h3>
                            <p className="text-amber-600 dark:text-amber-400 font-medium">
                              International Design Association
                            </p>
                            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>2021</span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                              Awarded for outstanding contribution to design innovation and excellence in the digital
                              product category.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Certification 2 */}
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-purple-100 dark:border-purple-900/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">Advanced Figma Certification</h3>
                            <p className="text-blue-600 dark:text-blue-400 font-medium">Figma Design Platform</p>
                            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>2020</span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                              Expert-level certification in Figma design tools, systems, and collaborative workflows.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Award 2 */}
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-purple-100 dark:border-purple-900/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                            <TrophyIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">Best Mobile App Design</h3>
                            <p className="text-green-600 dark:text-green-400 font-medium">App Design Awards</p>
                            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>2018</span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                              Recognized for exceptional mobile app design that combined aesthetics with outstanding
                              user experience in the health and wellness category.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Portfolio Tab Content */}
          <TabsContent value="portfolio" className="mt-0 animate-in fade-in-50 duration-500">
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">My Creative Portfolio</h2>
                <p className="text-xl text-muted-foreground">
                  A showcase of my best design work across various industries and platforms. Each project represents a
                  unique challenge and solution in the world of digital design.
                </p>
              </div>

              {/* Portfolio Filters */}
              <div className="flex flex-wrap justify-center gap-3">
                <Button className="rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:shadow-lg">
                  All Projects
                </Button>
                <Button variant="outline" className="rounded-full transition-all duration-300 hover:shadow-lg">
                  UI/UX Design
                </Button>
                <Button variant="outline" className="rounded-full transition-all duration-300 hover:shadow-lg">
                  Mobile Apps
                </Button>
                <Button variant="outline" className="rounded-full transition-all duration-300 hover:shadow-lg">
                  Web Design
                </Button>
                <Button variant="outline" className="rounded-full transition-all duration-300 hover:shadow-lg">
                  Branding
                </Button>
              </div>

              {/* Featured Project */}
              <Card className="overflow-hidden border-none shadow-xl transition-all duration-300 hover:shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-square lg:aspect-auto relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=600&text=Featured+Project"
                    alt="Featured Project"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 lg:hidden">
                      <div className="text-white">
                        <h3 className="text-2xl font-bold">HealthTrack Mobile App</h3>
                        <p className="text-white/80">Complete redesign of a healthcare tracking application</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col">
                    <div className="mb-6">
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-4">
                        Featured Project
                      </Badge>
                      <h3 className="text-3xl font-bold mb-2 hidden lg:block">HealthTrack Mobile App</h3>
                      <p className="text-xl text-muted-foreground hidden lg:block">
                        Complete redesign of a healthcare tracking application
                      </p>
                    </div>

                    <div className="space-y-4 flex-1">
                      <p>
                        HealthTrack needed a complete redesign to improve user engagement and make health data more
                        accessible and actionable for users. The challenge was to simplify complex health metrics while
                        maintaining clinical accuracy.
                      </p>

                      <div>
                        <h4 className="font-semibold mb-2">My Role:</h4>
                        <p className="text-muted-foreground">
                          Lead Designer responsible for user research, information architecture, interaction design, and
                          visual design. Collaborated with product managers, developers, and healthcare professionals.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Key Outcomes:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                          <li>60% increase in daily active users after redesign</li>
                          <li>42% improvement in task completion rates</li>
                          <li>User satisfaction score improved from 3.2/5 to 4.7/5</li>
                          <li>Featured on the App Store&apos;s Health & Fitness category</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">UI/UX Design</Badge>
                        <Badge variant="outline">Mobile App</Badge>
                        <Badge variant="outline">Healthcare</Badge>
                        <Badge variant="outline">iOS & Android</Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:shadow-lg">
                          View Case Study
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>

                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full transition-all duration-300 hover:shadow-lg"
                          >
                            <Heart className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full transition-all duration-300 hover:shadow-lg"
                          >
                            <Bookmark className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full transition-all duration-300 hover:shadow-lg"
                          >
                            <Share2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Portfolio Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card
                    key={item}
                    className="overflow-hidden group border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={`/placeholder.svg?height=300&width=400&text=Project+${item}`}
                        alt={`Project ${item}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button className="bg-white text-blue-700 hover:bg-white/90 transition-all duration-300 hover:shadow-lg">
                          View Project
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-xl">Project Title {item}</h3>
                        <Badge
                          className={`
                          ${
                            item % 3 === 0
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                              : item % 3 === 1
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          }
                        `}
                        >
                          {item % 3 === 0 ? "Web App" : item % 3 === 1 ? "Mobile App" : "Branding"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        A brief description of this project and the design challenges it addressed. This showcases my
                        approach to problem-solving and design thinking.
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1">
                          <Badge variant="outline">UI/UX</Badge>
                          <Badge variant="outline">
                            {item % 3 === 0 ? "Web" : item % 3 === 1 ? "Mobile" : "Brand"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">{24 + item * 3}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm">{120 + item * 15}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 transition-all duration-300 hover:shadow-lg"
                >
                  Load More Projects
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab Content */}
          <TabsContent value="settings" className="mt-0 animate-in fade-in-50 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Settings Navigation */}
              <Card className="lg:col-span-1 overflow-hidden border-none shadow-xl transition-all duration-300 hover:shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Cog className="h-5 w-5" />
                    Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="flex flex-col">
                    <button className="flex items-center gap-3 px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-600 border-l-4 border-blue-600 transition-all duration-300 hover:shadow-inner">
                      <User className="h-5 w-5" />
                      <span className="font-medium">Account Settings</span>
                    </button>
                    <button className="flex items-center gap-3 px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 border-l-4 border-transparent transition-all duration-300 hover:shadow-inner">
                      <Palette className="h-5 w-5" />
                      <span className="font-medium">Appearance</span>
                    </button>
                    <button className="flex items-center gap-3 px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 border-l-4 border-transparent transition-all duration-300 hover:shadow-inner">
                      <Bell className="h-5 w-5" />
                      <span className="font-medium">Notifications</span>
                    </button>
                    <button className="flex items-center gap-3 px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 border-l-4 border-transparent transition-all duration-300 hover:shadow-inner">
                      <Lock className="h-5 w-5" />
                      <span className="font-medium">Privacy & Security</span>
                    </button>
                    <button className="flex items-center gap-3 px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 border-l-4 border-transparent transition-all duration-300 hover:shadow-inner">
                      <Link className="h-5 w-5" />
                      <span className="font-medium">Connected Accounts</span>
                    </button>
                    <button className="flex items-center gap-3 px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 border-l-4 border-transparent transition-all duration-300 hover:shadow-inner">
                      <FileText className="h-5 w-5" />
                      <span className="font-medium">Billing & Subscription</span>
                    </button>
                  </nav>
                </CardContent>
              </Card>

              {/* Settings Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Account Settings */}
                <Card className="overflow-hidden border-none shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Account Settings
                    </CardTitle>
                    <CardDescription className="text-white/80">
                      Manage your personal information and account preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                    {/* Profile Information */}
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Profile Information</h3>
                        <Button variant="outline" size="sm" className="transition-all duration-300 hover:shadow-lg">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="fullName" className="text-base">
                            Full Name
                          </Label>
                          <Input id="fullName" defaultValue="Mithun Ray" className="h-12" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="displayName" className="text-base">
                            Display Name
                          </Label>
                          <Input id="displayName" defaultValue="Mithun Ray" className="h-12" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-base">
                            Email Address
                          </Label>
                          <Input id="email" type="email" defaultValue="mithun.ray@example.com" className="h-12" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-base">
                            Phone Number
                          </Label>
                          <Input id="phone" defaultValue="+1 (555) 123-4567" className="h-12" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-base">
                            Location
                          </Label>
                          <Input id="location" defaultValue="San Francisco, CA" className="h-12" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="website" className="text-base">
                            Website
                          </Label>
                          <Input id="website" defaultValue="www.mithunray.design" className="h-12" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-base">
                          Professional Bio
                        </Label>
                        <textarea
                          id="bio"
                          className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          defaultValue="Senior Product Designer with over 8 years of experience in creating user-centered digital experiences. Passionate about solving complex design problems and building intuitive interfaces that enhance user engagement and satisfaction. Specialized in UI/UX design, design systems, and leading design teams to create cohesive experiences across multiple platforms."
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Profile Photo */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Profile Photo</h3>

                      <div className="flex flex-col sm:flex-row gap-6 items-center">
                        <div className="relative">
                          <Avatar className="w-32 h-32 border-4 border-gray-100 dark:border-gray-800">
                            <AvatarImage src="/placeholder.svg?height=128&width=128&text=MR" alt="Mithun Ray" />
                            <AvatarFallback className="text-4xl">MR</AvatarFallback>
                          </Avatar>
                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute bottom-0 right-0 rounded-full bg-white dark:bg-gray-800 shadow-md transition-all duration-300 hover:shadow-lg"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="font-medium">Upload a new photo</h4>
                            <p className="text-sm text-muted-foreground">
                              Your photo should be in PNG or JPG format, at least 400x400 pixels, and less than 2MB in
                              size.
                            </p>
                          </div>

                          <div className="flex gap-3">
                            <Button className="transition-all duration-300 hover:shadow-lg">Upload Photo</Button>
                            <Button
                              variant="outline"
                              className="text-red-600 hover:text-red-700 transition-all duration-300 hover:shadow-lg"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Theme Settings */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Theme Settings</h3>

                      <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="space-y-1">
                            <Label className="text-base">Theme Preference</Label>
                            <p className="text-sm text-muted-foreground">Choose how the application appears to you</p>
                          </div>
                          <div className="flex items-center gap-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                            <button
                              onClick={() => setTheme("light")}
                              className={`p-3 rounded-full flex items-center gap-2 ${theme === "light" ? "bg-white dark:bg-gray-700 shadow-md" : ""}`}
                            >
                              <Sun className="h-5 w-5" />
                              <span className="font-medium">Light</span>
                            </button>
                            <button
                              onClick={() => setTheme("dark")}
                              className={`p-3 rounded-full flex items-center gap-2 ${theme === "dark" ? "bg-white dark:bg-gray-700 shadow-md" : ""}`}
                            >
                              <Moon className="h-5 w-5" />
                              <span className="font-medium">Dark</span>
                            </button>
                            <button
                              onClick={() => setTheme("system")}
                              className={`p-3 rounded-full flex items-center gap-2 ${theme === "system" ? "bg-white dark:bg-gray-700 shadow-md" : ""}`}
                            >
                              <Monitor className="h-5 w-5" />
                              <span className="font-medium">System</span>
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label htmlFor="notifications" className="text-base">
                              Email Notifications
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Receive email notifications about account activity
                            </p>
                          </div>
                          <Switch id="notifications" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label htmlFor="marketing" className="text-base">
                              Marketing Emails
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Receive emails about new features and offers
                            </p>
                          </div>
                          <Switch id="marketing" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Privacy Settings */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">Privacy Settings</h3>

                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label htmlFor="profile-visibility" className="text-base">
                              Profile Visibility
                            </Label>
                            <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                          </div>
                          <Switch id="profile-visibility" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label htmlFor="activity-status" className="text-base">
                              Activity Status
                            </Label>
                            <p className="text-sm text-muted-foreground">Show when you&apos;re active on the platform</p>
                          </div>
                          <Switch id="activity-status" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label htmlFor="data-collection" className="text-base">
                              Data Collection
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Allow us to collect usage data to improve your experience
                            </p>
                          </div>
                          <Switch id="data-collection" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-3 p-6 border-t">
                    <Button variant="outline" className="transition-all duration-300 hover:shadow-lg">
                      Cancel
                    </Button>
                    <Button className="transition-all duration-300 hover:shadow-lg">Save Changes</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
