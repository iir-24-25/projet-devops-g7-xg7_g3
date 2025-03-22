import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface BenefitCardProps {
  icon: ReactNode
  title: string
  description: string
  colorClass?: string
}

export function BenefitCard({ icon, title, description, colorClass = "green" }: BenefitCardProps) {
  return (
    <Card className={`overflow-hidden border border-${colorClass}-100 shadow-md`}>
      <CardContent className="p-6">
        <div className="mb-5 flex justify-center">
          <div className={`p-3 rounded-full bg-${colorClass}-100 border border-${colorClass}-200`}>{icon}</div>
        </div>
        <h3 className={`text-xl font-semibold mb-3 text-center text-${colorClass}-700`}>{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </CardContent>
    </Card>
  )
}

