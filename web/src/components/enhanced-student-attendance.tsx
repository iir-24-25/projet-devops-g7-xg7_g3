import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeIn } from "@/components/animations/fade-in"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export function EnhancedStudentAttendance() {
  const attendanceData = {
    weekly: [
      { day: "Mon", present: 92, absent: 8 },
      { day: "Tue", present: 88, absent: 12 },
      { day: "Wed", present: 95, absent: 5 },
      { day: "Thu", present: 90, absent: 10 },
      { day: "Fri", present: 85, absent: 15 },
    ],
    monthly: [
      { week: "Week 1", present: 90, absent: 10 },
      { week: "Week 2", present: 88, absent: 12 },
      { week: "Week 3", present: 92, absent: 8 },
      { week: "Week 4", present: 87, absent: 13 },
    ],
    courses: [
      { name: "Mathematics", present: 94, absent: 6 },
      { name: "Computer Science", present: 88, absent: 12 },
      { name: "Physics", present: 90, absent: 10 },
      { name: "Literature", present: 85, absent: 15 },
    ],
  }

  const renderAttendanceChart = (data: any[], labelKey: string) => (
    <div className="mt-4 space-y-3">
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>{item[labelKey]}</span>
            <span className="text-xs text-muted-foreground">{item.present}% present</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full",
                item.present >= 90 ? "bg-green-500" : item.present >= 80 ? "bg-yellow-500" : "bg-red-500",
              )}
              style={{ width: `${item.present}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <Card className="border border-border/40 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Student Attendance</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <FadeIn>
          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="courses">By Course</TabsTrigger>
            </TabsList>
            <TabsContent value="weekly" className="mt-4">
              {renderAttendanceChart(attendanceData.weekly, "day")}
            </TabsContent>
            <TabsContent value="monthly" className="mt-4">
              {renderAttendanceChart(attendanceData.monthly, "week")}
            </TabsContent>
            <TabsContent value="courses" className="mt-4">
              {renderAttendanceChart(attendanceData.courses, "name")}
            </TabsContent>
          </Tabs>
        </FadeIn>
      </CardContent>
    </Card>
  )
}
