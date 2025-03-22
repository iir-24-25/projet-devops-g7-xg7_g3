"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerifyCodePage() {
  const router = useRouter()
  const [code, setCode] = useState(["", "", "", "", "", ""])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate the code here
    router.push("/reset-password")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-light to-secondary-light px-4 py-12">
      <Card className="w-full max-w-md border-t-4 border-t-primary shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-primary">Reset Password</CardTitle>
          <CardDescription>Please enter the password reset code below that was sent to aj@social.com.</CardDescription>
          <p className="text-sm text-primary hover:text-primary-hover">
            Didn&apos;t receive instructions?{" "}
            <Link href="#" className="underline hover:text-primary-hover">
              Try different method
            </Link>
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="code-0" className="block text-sm font-medium text-gray-700">
                  Code
                </label>
                <div className="flex justify-between gap-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="h-12 w-12 rounded-md border border-gray-300 bg-white text-center text-lg shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  ))}
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white">
                Reset Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

