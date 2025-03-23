"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { GraduationCap, Fingerprint, User, Lock, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 3D school-themed images for the slideshow
const slideImages = [
  {
    src: "/images/3d-campus.png",
    alt: "3D Campus Building",
    title: "Modern Campus",
    description: "Experience our state-of-the-art facilities",
  },
  {
    src: "/images/3d-classroom.png",
    alt: "3D Virtual Classroom",
    title: "Virtual Learning",
    description: "Interactive digital classrooms for remote education",
  },
  {
    src: "/images/3d-graduation.png",
    alt: "3D Graduation Scene",
    title: "Academic Excellence",
    description: "Celebrating student achievements and success",
  },
];

export default function LoginPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      const userType = data.type;
      if (userType.includes("Professuer")) {
        router.push("/prof");
      } else if (userType.includes("Etudiant")) {
        router.push("/admin");
      } else if (userType.includes("Parents")) {
        router.push("/parents");
      } else {
        setError("Unknown user type");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl"
      >
        <Card className="overflow-hidden shadow-xl rounded-xl transition-all duration-300 hover:shadow-2xl">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left side - Slideshow */}
            <div className="relative h-[300px] md:h-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 z-10" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slideImages[currentSlide].src || "/placeholder.svg"}
                    alt={slideImages[currentSlide].alt}
                    fill
                    className="object-cover"
                    priority={currentSlide === 0}
                  />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${currentSlide}`} // Fixed template literal syntax
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute bottom-0 left-0 z-20 p-6 text-white"
                >
                  <h1 className="text-3xl font-bold mb-2">{slideImages[currentSlide].title}</h1>
                  <p className="text-lg opacity-90 max-w-md">{slideImages[currentSlide].description}</p>
                </motion.div>
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={goToPrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white p-2 rounded-full transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white p-2 rounded-full transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>

              <div className="absolute bottom-4 right-4 z-20 flex space-x-2">
                {slideImages.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    animate={index === currentSlide ? { width: 16 } : { width: 8 }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      index === currentSlide ? "bg-white" : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${index + 1}`} // Fixed template literal syntax
                  />
                ))}
              </div>
            </div>

            {/* Right side - Login Form */}
            <motion.div
              className="p-6 md:p-8 flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div
                className="flex items-center gap-3 mb-6"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <GraduationCap className="h-8 w-8 text-emerald-600" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                  <p className="text-gray-500">Sign in to your account</p>
                </div>
              </motion.div>

              <Tabs defaultValue="credentials" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger
                    value="credentials"
                    className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800 transition-all duration-300 hover:bg-gray-100"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Credentials
                  </TabsTrigger>
                  <TabsTrigger
                    value="fingerprint"
                    className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800 transition-all duration-300 hover:bg-gray-100"
                  >
                    <Fingerprint className="h-4 w-4 mr-2" />
                    Fingerprint
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="credentials" className="space-y-4">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="email" className="text-sm font-medium">
                      School Email
                    </label>
                    <div className="relative">
                      <User
                        className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${
                          activeInput === "email" ? "text-emerald-600" : "text-gray-500"
                        }`}
                      />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.name@school.edu"
                        className="pl-10 border-gray-300 focus:border-transparent focus:outline-none focus:ring-0 transition-all duration-300"
                        onFocus={() => setActiveInput("email")}
                        onBlur={() => setActiveInput(null)}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 bg-emerald-600 rounded"
                        initial={{ width: 0 }}
                        animate={{ width: activeInput === "email" ? "100%" : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${
                          activeInput === "password" ? "text-emerald-600" : "text-gray-500"
                        }`}
                      />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 border-gray-300 focus:border-transparent focus:outline-none focus:ring-0 transition-all duration-300"
                        onFocus={() => setActiveInput("password")}
                        onBlur={() => setActiveInput(null)}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 bg-emerald-600 rounded"
                        initial={{ width: 0 }}
                        animate={{ width: activeInput === "password" ? "100%" : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <div className="flex items-center space-x-2 group cursor-pointer">
                      <Checkbox
                        id="remember"
                        className="border-gray-300 text-emerald-600 focus:ring-0 focus:outline-none transition-all duration-300"
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:text-emerald-700 transition-colors duration-200"
                      >
                        Remember me
                      </label>
                    </div>
                    <motion.a
                      href="/email-verifier"
                      className="text-sm text-emerald-600 hover:text-emerald-800 relative"
                      whileHover={{ scale: 1.05 }}
                    >
                      Forgot password?
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded"
                        initial={{ scaleX: 0, originX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "#047857" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogin}
                      disabled={loading}
                      className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-all duration-300 cursor-pointer ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? "Signing In..." : "Sign In"}
                      {!loading && (
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-2 h-4 w-4"
                          initial={{ x: 0 }}
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </motion.svg>
                      )}
                    </motion.button>
                  </motion.div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-sm text-center"
                    >
                      {error}
                    </motion.p>
                  )}
                </TabsContent>

                <TabsContent value="fingerprint" className="space-y-4">
                  <motion.div
                    className="flex flex-col items-center justify-center py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="bg-gray-100 p-6 rounded-full mb-4 relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      animate={{
                        boxShadow: [
                          "0px 0px 0px rgba(5, 150, 105, 0)",
                          "0px 0px 20px rgba(5, 150, 105, 0.5)",
                          "0px 0px 0px rgba(5, 150, 105, 0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-emerald-100 rounded-full"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0, 0.3, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <Fingerprint className="h-16 w-16 text-emerald-600 relative z-10" />
                    </motion.div>
                    <h3 className="text-lg font-medium text-center">Fingerprint Authentication</h3>
                    <p className="text-gray-500 text-center mt-2 mb-6">Place your registered finger on the scanner</p>
                    <motion.button
                      whileHover={{ scale: 1.05, borderColor: "#059669" }}
                      whileTap={{ scale: 0.95 }}
                      className="border border-gray-300 hover:border-emerald-600 text-gray-700 hover:text-emerald-700 py-2 px-4 rounded-md transition-all duration-300 cursor-pointer focus:outline-none"
                    >
                      Use password instead
                    </motion.button>
                  </motion.div>
                </TabsContent>
              </Tabs>

              <motion.div
                className="mt-6 text-center text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Don&apos;t have an account?{" "}
                <motion.a
                  href="#"
                  className="font-medium text-emerald-600 hover:text-emerald-800 relative inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  Contact your administrator
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}