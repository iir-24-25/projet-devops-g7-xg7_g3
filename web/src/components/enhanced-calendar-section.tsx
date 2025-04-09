"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animations/fade-in"
import { useState } from "react"

export function EnhancedCalendarSection() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Example events data
  const events = [
    { date: new Date(2025, 3, 10), type: "assignment", title: "Math Assignment Due" },
    { date: new Date(2025, 3, 12), type: "exam", title: "Computer Science Midterm" },
    { date: new Date(2025, 3, 15), type: "meeting", title: "Student Council Meeting" },
    { date: new Date(2025, 3, 18), type: "assignment", title: "Physics Lab Report" },
    { date: new Date(2025, 3, 22), type: "event", title: "Campus Career Fair" },
  ]

  // Function to check if a date has events
  const hasEvent = (day: Date) => {
    return events.some(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    )
  }

  // Function to get events for selected date
  const getEventsForDate = (selectedDate: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear(),
    )
  }

  // Get badge color based on event type
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "assignment":
        return "default"
      case "exam":
        return "destructive"
      case "meeting":
        return "secondary"
      case "event":
        return "outline"
      default:
        return "default"
    }
  }

  const selectedDateEvents = date ? getEventsForDate(date) : []

  return (
    <Card className="border border-border/40 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Academic Calendar</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <FadeIn>
          <div className="rounded-md border border-border/40 p-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="mx-auto"
              modifiers={{
                event: (date) => hasEvent(date),
              }}
              modifiersStyles={{
                event: {
                  fontWeight: "bold",
                  textDecoration: "underline",
                  color: "var(--primary)",
                },
              }}
            />
          </div>
        </FadeIn>

        {date && (
          <FadeIn delay={0.2}>
            <div className="mt-4 space-y-2">
              <h3 className="font-medium">
                Events for {date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </h3>

              {selectedDateEvents.length > 0 ? (
                <div className="space-y-2">
                  {selectedDateEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md border border-border/40 bg-card/50 p-2"
                    >
                      <span>{event.title}</span>
                      <Badge variant={getBadgeVariant(event.type)}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No events scheduled for this day.</p>
              )}
            </div>
          </FadeIn>
        )}
      </CardContent>
    </Card>
  )
}
