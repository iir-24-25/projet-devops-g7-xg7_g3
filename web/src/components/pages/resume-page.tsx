"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Upload, Download, Eye, Edit, Trash2, Plus, FileUp, Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ResumePage() {
  const [activeTab, setActiveTab] = useState("myResumes")
  const [resumes, setResumes] = useState([
    {
      id: 1,
      name: "Professional_Resume_2024.pdf",
      size: "1.2 MB",
      lastModified: "March 15, 2024",
      status: "active",
      type: "pdf",
    },
    {
      id: 2,
      name: "Technical_CV_2023.docx",
      size: "890 KB",
      lastModified: "December 10, 2023",
      status: "draft",
      type: "docx",
    },
  ])
  const [editingResume, setEditingResume] = useState<number | null>(null)
  const [newResumeName, setNewResumeName] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const newResume = {
        id: resumes.length + 1,
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        lastModified: new Date().toLocaleDateString(),
        status: "draft",
        type: file.name.split(".").pop() || "",
      }
      setResumes([...resumes, newResume])
    }
  }

  const handleDeleteResume = (id: number) => {
    setResumes(resumes.filter((resume) => resume.id !== id))
  }

  const handleEditResume = (id: number) => {
    const resume = resumes.find((r) => r.id === id)
    if (resume) {
      setNewResumeName(resume.name)
      setEditingResume(id)
    }
  }

  const handleSaveResumeName = (id: number) => {
    setResumes(resumes.map((resume) => (resume.id === id ? { ...resume, name: newResumeName } : resume)))
    setEditingResume(null)
  }

  const handleCancelEdit = () => {
    setEditingResume(null)
  }

  const handleSetActive = (id: number) => {
    setResumes(
      resumes.map((resume) =>
        resume.id === id
          ? { ...resume, status: "active" }
          : { ...resume, status: resume.status === "active" ? "draft" : resume.status },
      ),
    )
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Resume Management
          </CardTitle>
          <CardDescription>Upload, manage, and share your professional resumes and CVs</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="myResumes" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="myResumes">My Resumes</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="myResumes">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Your Resumes</h3>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />
                    <Button onClick={handleUploadClick} className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Resume
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {resumes.map((resume) => (
                    <Card key={resume.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-center justify-between p-4 border-b">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              {editingResume === resume.id ? (
                                <div className="flex items-center gap-2">
                                  <Input
                                    value={newResumeName}
                                    onChange={(e) => setNewResumeName(e.target.value)}
                                    className="h-8 w-64"
                                  />
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8"
                                    onClick={() => handleSaveResumeName(resume.id)}
                                  >
                                    <Check className="h-4 w-4 text-green-600" />
                                  </Button>
                                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleCancelEdit}>
                                    <X className="h-4 w-4 text-red-600" />
                                  </Button>
                                </div>
                              ) : (
                                <h4 className="font-medium">{resume.name}</h4>
                              )}
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span>{resume.size}</span>
                                <span>•</span>
                                <span>Last modified: {resume.lastModified}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {resume.status === "active" ? (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="outline">Draft</Badge>
                            )}
                          </div>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <Download className="h-4 w-4" />
                              Download
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => handleEditResume(resume.id)}
                            >
                              <Edit className="h-4 w-4" />
                              Rename
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            {resume.status !== "active" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1 text-green-600"
                                onClick={() => handleSetActive(resume.id)}
                              >
                                <Check className="h-4 w-4" />
                                Set as Active
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1 text-red-600"
                              onClick={() => handleDeleteResume(resume.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {resumes.length === 0 && (
                    <div className="text-center py-12 border rounded-lg border-dashed">
                      <FileUp className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No resumes uploaded yet</h3>
                      <p className="text-muted-foreground mb-4">Upload your first resume to get started</p>
                      <Button onClick={handleUploadClick}>
                        <Plus className="h-4 w-4 mr-2" />
                        Upload Resume
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="templates">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Resume Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FileText className="h-12 w-12 text-gray-400" />
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-1">Template {i}</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Professional {i % 2 === 0 ? "modern" : "classic"} resume template
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Use Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Resume Settings</h3>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="defaultFormat">Default Format</Label>
                    <select
                      id="defaultFormat"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="pdf">PDF</option>
                      <option value="docx">DOCX</option>
                      <option value="txt">TXT</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="privacy">Privacy</Label>
                    <select
                      id="privacy"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="private">Private</option>
                      <option value="public">Public</option>
                      <option value="shared">Shared with specific users</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="autoUpdate">Auto-Update</Label>
                    <select
                      id="autoUpdate"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="off">Off</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                    </select>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
