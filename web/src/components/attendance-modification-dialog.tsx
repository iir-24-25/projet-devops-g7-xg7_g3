"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Clock, AlertCircle, User, FileText } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AttendanceModificationDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  student: any
  dayIndex: number | null
  dayName: string | null
  week: string
}

export function AttendanceModificationDialog({
  isOpen,
  onClose,
  onSave,
  student,
  dayIndex,
  dayName,
  week,
}: AttendanceModificationDialogProps) {
  const [status, setStatus] = useState<"present" | "absent" | "late" | "excused">("present")
  const [reason, setReason] = useState("")
  const [notes, setNotes] = useState("")
  const [documentUrl, setDocumentUrl] = useState("")
  const [documentType, setDocumentType] = useState("medical")
  const [modifiedBy, setModifiedBy] = useState("Current User")
  const [modificationTime, setModificationTime] = useState(new Date().toISOString())
  const [activeTab, setActiveTab] = useState("details")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmationVisible, setConfirmationVisible] = useState(false)

  // Reset form when dialog opens with a specific student
  useEffect(() => {
    if (isOpen && student) {
      // If we have a student and dayIndex, set the initial status based on their current attendance
      if (student && dayIndex !== null && student.attendance[week]) {
        const currentStatus = student.attendance[week][dayIndex]
        setStatus(currentStatus as "present" | "absent")
      } else {
        setStatus("present")
      }

      setReason("")
      setNotes("")
      setDocumentUrl("")
      setDocumentType("medical")
      setModifiedBy("Current User")
      setModificationTime(new Date().toISOString())
      setActiveTab("details")
      setConfirmationVisible(false)
    }
  }, [isOpen, student, dayIndex, week])

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const data = {
        studentId: student?.id,
        studentName: student?.name,
        week,
        dayIndex,
        dayName,
        previousStatus: dayIndex !== null ? student?.attendance[week]?.[dayIndex] : undefined,
        newStatus: status,
        reason,
        notes,
        documentUrl,
        documentType,
        modifiedBy,
        modificationTime: new Date().toISOString(),
      }

      onSave(data)
      setIsSubmitting(false)
      setConfirmationVisible(true)

      // Close after showing confirmation
      setTimeout(() => {
        setConfirmationVisible(false)
        onClose()
      }, 1500)
    }, 800)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-b">
          <DialogTitle className="text-xl font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md">
              <Clock className="h-5 w-5" />
            </div>
            Modify Attendance Record
          </DialogTitle>
          <DialogDescription className="text-blue-700/70 dark:text-blue-400/70">
            {student ? (
              <>
                Update attendance record for <span className="font-medium">{student.name}</span> on {dayName}, {week}
              </>
            ) : (
              <>Update attendance records for students</>
            )}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b px-6">
            <TabsList className="w-full justify-start -mb-px">
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:shadow-none"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="documentation"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:shadow-none"
              >
                Documentation
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:shadow-none"
              >
                Audit Trail
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6 pt-4 max-h-[60vh] overflow-y-auto">
            <TabsContent value="details" className="mt-0 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium">
                    Attendance Status
                  </Label>
                  <RadioGroup
                    value={status}
                    onValueChange={(value) => setStatus(value as "present" | "absent" | "late" | "excused")}
                    className="flex flex-wrap gap-3"
                  >
                    <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg border border-green-100 dark:border-green-800 transition-all hover:shadow-sm">
                      <RadioGroupItem value="present" id="present" className="text-green-600 dark:text-green-400" />
                      <Label
                        htmlFor="present"
                        className="flex items-center gap-1 text-green-800 dark:text-green-300 cursor-pointer"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Present
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg border border-red-100 dark:border-red-800 transition-all hover:shadow-sm">
                      <RadioGroupItem value="absent" id="absent" className="text-red-600 dark:text-red-400" />
                      <Label
                        htmlFor="absent"
                        className="flex items-center gap-1 text-red-800 dark:text-red-300 cursor-pointer"
                      >
                        <XCircle className="h-4 w-4" />
                        Absent
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg border border-amber-100 dark:border-amber-800 transition-all hover:shadow-sm">
                      <RadioGroupItem value="late" id="late" className="text-amber-600 dark:text-amber-400" />
                      <Label
                        htmlFor="late"
                        className="flex items-center gap-1 text-amber-800 dark:text-amber-300 cursor-pointer"
                      >
                        <Clock className="h-4 w-4" />
                        Late
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg border border-blue-100 dark:border-blue-800 transition-all hover:shadow-sm">
                      <RadioGroupItem value="excused" id="excused" className="text-blue-600 dark:text-blue-400" />
                      <Label
                        htmlFor="excused"
                        className="flex items-center gap-1 text-blue-800 dark:text-blue-300 cursor-pointer"
                      >
                        <FileText className="h-4 w-4" />
                        Excused
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {(status === "absent" || status === "late" || status === "excused") && (
                  <div className="space-y-2">
                    <Label htmlFor="reason" className="text-sm font-medium">
                      Reason
                    </Label>
                    <Select value={reason} onValueChange={setReason}>
                      <SelectTrigger id="reason" className="w-full">
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="family">Family Emergency</SelectItem>
                        <SelectItem value="transportation">Transportation Issues</SelectItem>
                        <SelectItem value="weather">Weather Conditions</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional information here..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documentation" className="mt-0 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="documentType" className="text-sm font-medium">
                    Document Type
                  </Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger id="documentType">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical Certificate</SelectItem>
                      <SelectItem value="letter">Excuse Letter</SelectItem>
                      <SelectItem value="email">Email Confirmation</SelectItem>
                      <SelectItem value="other">Other Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documentUrl" className="text-sm font-medium">
                    Document URL or Reference
                  </Label>
                  <Input
                    id="documentUrl"
                    placeholder="Enter document reference or URL"
                    value={documentUrl}
                    onChange={(e) => setDocumentUrl(e.target.value)}
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                  <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4" />
                    Document Upload
                  </h4>
                  <p className="text-sm text-blue-700/70 dark:text-blue-400/70 mb-3">
                    You can attach supporting documents such as medical certificates or excuse letters.
                  </p>
                  <Button variant="outline" size="sm" className="w-full border-blue-200 dark:border-blue-800">
                    Upload Document
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <User className="h-4 w-4" />
                    Modification Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Modified By:</span>
                      <span className="font-medium">{modifiedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Modification Time:</span>
                      <span className="font-medium">{formatDate(modificationTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Previous Status:</span>
                      <span className="font-medium capitalize">{dayIndex !== null ? student?.attendance[week]?.[dayIndex] : "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">New Status:</span>
                      <span className="font-medium capitalize">{status}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Modification History</h4>
                  <div className="border border-gray-100 dark:border-gray-800 rounded-lg divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                    <div className="p-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Admin User</span>
                        <span className="text-muted-foreground text-xs">Yesterday, 15:30</span>
                      </div>
                      <p className="text-muted-foreground">
                        Changed status from <span className="text-red-600 dark:text-red-400">absent</span> to{" "}
                        <span className="text-green-600 dark:text-green-400">present</span>
                      </p>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">System</span>
                        <span className="text-muted-foreground text-xs">2 days ago, 09:15</span>
                      </div>
                      <p className="text-muted-foreground">
                        Automatically marked as <span className="text-red-600 dark:text-red-400">absent</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <AnimatePresence>
          {confirmationVisible && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-4 rounded-lg flex items-center gap-3 shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <CheckCircle className="h-6 w-6" />
                <span className="font-medium">Attendance record updated successfully!</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogFooter className="p-4 bg-gray-50 dark:bg-gray-900/20 border-t">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
