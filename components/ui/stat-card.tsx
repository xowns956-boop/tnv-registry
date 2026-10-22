import * as React from "react"
import { cn } from "cn"
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// TNV v0.1 · Figma "- Cards › StatCard" (38:344) — trend: up·down / tone: default·emphasis / Show Badge · Show Footer
// tone="emphasis"는 card-emphasis 바탕 + card-emphasis-foreground 글자 (옆 카드와 살짝만 구분).
// badge를 주면 오른쪽 위 배지가 보이고, summary·detail을 주면 아래 설명이 보인다.
function StatCard({
  label,
  value,
  badge,
  summary,
  detail,
  trend = "up",
  tone = "default",
  className,
  ...props
}: Omit<React.ComponentProps<typeof Card>, "children"> & {
  label: React.ReactNode
  value: React.ReactNode
  badge?: React.ReactNode
  summary?: React.ReactNode
  detail?: React.ReactNode
  trend?: "up" | "down"
  tone?: "default" | "emphasis"
}) {
  const TrendIcon = trend === "up" ? TrendingUpIcon : TrendingDownIcon
  const emphasis = tone === "emphasis"

  return (
    <Card
      data-slot="stat-card"
      data-trend={trend}
      data-tone={tone}
      className={cn("shadow-xs", emphasis && "border-card-emphasis bg-card-emphasis text-card-emphasis-foreground", className)}
      {...props}
    >
      <CardHeader>
        <CardDescription className={cn(emphasis && "text-card-emphasis-foreground")}>{label}</CardDescription>
        <CardTitle className={cn("text-3xl font-semibold tabular-nums", emphasis && "text-card-emphasis-foreground")}>{value}</CardTitle>
        {badge && (
          <CardAction>
            <Badge variant="outline" className={cn(emphasis && "border-card-emphasis-foreground text-card-emphasis-foreground")}>
              <TrendIcon className="size-3" aria-hidden="true" />
              {badge}
            </Badge>
          </CardAction>
        )}
      </CardHeader>
      {(summary || detail) && (
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {summary && (
            <div className={cn("flex items-center gap-2 font-medium text-card-foreground", emphasis && "text-card-emphasis-foreground")}>
              {summary}
              <TrendIcon className="size-4" aria-hidden="true" />
            </div>
          )}
          {detail && <div className={cn("text-muted-foreground", emphasis && "text-card-emphasis-foreground")}>{detail}</div>}
        </CardFooter>
      )}
    </Card>
  )
}

// TNV v0.1 · Figma "- Cards › SectionCards" (38:345) — StatCard 여러 개를 한 줄에 (좁으면 줄바꿈)
function SectionCards({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="section-cards"
      className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4", className)}
      {...props}
    />
  )
}

export { StatCard, SectionCards }
