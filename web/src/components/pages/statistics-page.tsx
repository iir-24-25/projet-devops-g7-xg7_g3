import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2 } from "lucide-react"

export function StatisticsPage() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-[#1e3a8a]" />
          Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-gray-500">Your statistics content will appear here.</p>
      </CardContent>
    </Card>
  )
}
