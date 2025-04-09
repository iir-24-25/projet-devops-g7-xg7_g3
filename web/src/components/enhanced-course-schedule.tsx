import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SlideIn } from "@/components/animations/slide-in"
import { HoverCard } from "@/components/animations/hover-card"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

export function EnhancedCourseSchedule() {
  const courses = [
    {
      id: 1,
      name: "Advanced Mathematics",
      time: "09:00 - 10:30",
      location: "Room A101",
      instructor: "Dr. Smith",
      students: 28,
      type: "Lecture",
    },
    {
      id: 2,
      name: "Computer Science Fundamentals",
      time: "11:00 - 12:30",
      location: "Lab B202",
      instructor: "Prof. Johnson",
      students: 24,
      type: "Lab",
    },
    {
      id: 3,
      name: "Data Structures",
      time: "14:00 - 15:30",
      location: "Room C303",
      instructor: "Dr. Williams",
      students: 32,
      type: "Lecture",
    },
  ]

  return (
    <Card className="border border-border/40 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Today's Schedule</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0">
        {courses.map((course, index) => (
          <SlideIn key={course.id} direction="right" delay={index * 0.1}>
            <HoverCard>
              <div className="rounded-lg border border-border/40 bg-card/50 p-4 transition-all">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{course.name}</h3>
                  <Badge variant={course.type === "Lecture" ? "default" : "secondary"} className="text-xs">
                    {course.type}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{course.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{course.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      <span>{course.students}</span>
                    </div>
                  </div>
                </div>
              </div>
            </HoverCard>
          </SlideIn>
        ))}
      </CardContent>
    </Card>
  )
}
