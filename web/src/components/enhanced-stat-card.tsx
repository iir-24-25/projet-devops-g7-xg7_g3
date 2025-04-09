import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard } from "@/components/animations/hover-card"
import { ScaleIn } from "@/components/animations/scale-in"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface EnhancedStatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
  delay?: number
}

export function EnhancedStatCard({
  title,
  value,
  icon,
  description,
  trend,
  className,
  delay = 0,
}: EnhancedStatCardProps) {
  return (
    <ScaleIn delay={delay}>
      <HoverCard className={cn("overflow-hidden", className)}>
        <Card className="border border-border/40 bg-gradient-to-br from-card/50 to-card shadow-sm transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            <div className="h-8 w-8 rounded-md bg-primary/10 p-1.5 text-primary">{icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {(description || trend) && (
              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                {trend && (
                  <span className={cn("mr-1 flex items-center", trend.isPositive ? "text-green-500" : "text-red-500")}>
                    {trend.isPositive ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="mr-1 h-3 w-3"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="mr-1 h-3 w-3"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-1.025.275l-4.287-2.475a.75.75 0 01.75-1.3l2.71 1.565a19.422 19.422 0 00-3.013-6.024L7.53 11.533a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {Math.abs(trend.value)}%
                  </span>
                )}
                {description}
              </div>
            )}
          </CardContent>
        </Card>
      </HoverCard>
    </ScaleIn>
  )
}
