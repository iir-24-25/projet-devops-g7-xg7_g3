"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload } from "lucide-react"
import { format, parse } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface JustifyAbsenceDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  absence?: any // Les données de l'absence sélectionnée
}

export function JustifyAbsenceDialog({ open = false, onOpenChange, absence }: JustifyAbsenceDialogProps) {
  const [date, setDate] = useState<Date | undefined>()
  const [isOpen, setIsOpen] = useState(open)

  // Synchroniser l'état local avec la prop open
  useEffect(() => {
    setIsOpen(open)
  }, [open])

  // Pré-remplir les champs si une absence est sélectionnée
  useEffect(() => {
    if (absence) {
      // Convertir la date au format Date si nécessaire
      if (absence.date) {
        const parsedDate = parse(absence.date, "dd/MM/yyyy", new Date())
        setDate(parsedDate)
      }
    }
  }, [absence])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique pour envoyer les données
    console.log("Soumettre la justification:", { absence, date })
    if (onOpenChange) {
      onOpenChange(false)
    } else {
      setIsOpen(false)
    }
    // Afficher une notification de succès (à implémenter selon vos besoins)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange || setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => (onOpenChange ? onOpenChange(true) : setIsOpen(true))}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          Justifier une absence
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] dark:bg-gray-900 dark:border-gray-800">
        <DialogHeader>
          <DialogTitle className="dark:text-white">Justify an Absence</DialogTitle>
          <DialogDescription className="dark:text-gray-400">
            Please fill out this form to justify your child&apos;s absence.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="student" className="text-right dark:text-white">
                Student
              </Label>
              <Select defaultValue="thomas">
                <SelectTrigger
                  id="student"
                  className="col-span-3 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <SelectValue placeholder="Sélectionner un élève" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  <SelectItem value="thomas">Thomas Dupont</SelectItem>
                  <SelectItem value="sophie">Sophie Dupont</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right dark:text-white">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "col-span-3 justify-start text-left font-normal dark:bg-gray-800 dark:border-gray-700 dark:text-white",
                      !date && "text-muted-foreground dark:text-gray-400",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 dark:bg-gray-800 dark:border-gray-700" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="dark:bg-gray-800 dark:text-white"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right dark:text-white">
                Duration
              </Label>
              <Select defaultValue={absence?.duration.toLowerCase().replace(" ", "-") || "full-day"}>
                <SelectTrigger
                  id="duration"
                  className="col-span-3 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <SelectValue placeholder="Sélectionner la durée" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  <SelectItem value="full-day">Full day</SelectItem>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="hours">Few hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right dark:text-white">
                Reason
              </Label>
              <Select defaultValue="medical">
                <SelectTrigger id="reason" className="col-span-3 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  <SelectValue placeholder="Sélectionner un motif" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  <SelectItem value="medical">Medical reason</SelectItem>
                  <SelectItem value="family">Family reason</SelectItem>
                  <SelectItem value="transport">Transportation issue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="details" className="text-right dark:text-white">
                Details
              </Label>
              <Textarea
                id="details"
                placeholder="Please provide additional details about the absence..."
                className="col-span-3 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="document" className="text-right dark:text-white">
                Document
              </Label>
              <div className="col-span-3">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload a document
                  </Button>
                  <span className="text-xs text-muted-foreground dark:text-gray-400">PDF, JPG or PNG (max 5 MB)</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => (onOpenChange ? onOpenChange(false) : setIsOpen(false))}
              className="dark:border-gray-700 dark:text-white"
            >
              Cancel
            </Button>
            <Button type="submit">Submit Justification</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
