import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { StaggerIn } from "@/components/animations/stagger-in"
import { HoverCard } from "@/components/animations/hover-card"
import { Calendar, Clock } from "lucide-react"

export function EnhancedCurrentAssignments() {
  const assignments = [
    {
      id: 1,
      title: "Data Structures Project",
      course: "Computer Science",
      dueDate: "Apr 15, 2025",
      progress: 75,
      priority: "High",
      timeLeft: "3 days",
    },
    {
      id: 2,
      title: "Linear Algebra Problem Set",
      course: "Mathematics",
      dueDate: "Apr 12, 2025",
      progress: 30,
      priority: "Medium",
      timeLeft: "1 day",
    },
    {
      id: 3,
      title: "Research Paper",
      course: "Academic Writing",
      dueDate: "Apr 20, 2025",
      progress: 10,
      priority: "Low",
      timeLeft: "1 week",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "default"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress < 30) return "bg-red-500"
    if (progress < 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <Card className="border border-border/40 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Current Assignments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0">
        <StaggerIn direction="up" distance={10}>
          {assignments.map((assignment) => (
            <HoverCard key={assignment.id}>
              <div className="rounded-lg border border-border/40 bg-card/50 p-4 transition-all">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{assignment.title}</h3>
                  <Badge variant={getPriorityColor(assignment.priority) as any}>{assignment.priority}</Badge>
                </div>
                <div className="mb-3 text-sm text-muted-foreground">{assignment.course}</div>
                <div className="mb-3">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span>Progress</span>
                    <span>{assignment.progress}%</span>
                  </div>
                  <Progress
                    value={assignment.progress}
                    className={`h-2 ${getProgressColor(assignment.progress)}`}
                  />

                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{assignment.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{assignment.timeLeft} left</span>
                  </div>
                </div>
              </div>
            </HoverCard>
          ))}
        </StaggerIn>
      </CardContent>
    </Card>
  )
}
