import * as React from "react"
import { cn } from "cn"

import { Progress } from "@/components/ui/progress"

// TNV v0.1 · Figma "- Progress › MetricRow" (6003:7046) — 지표 한 줄. size: sm·md / tone: primary·operation·production
// sm = 라벨 · 값 한 줄 + Progress sm (공장 카드 가동률·생산량)
// md = 라벨 위, 값 + 목표(target) + Progress md(% 라벨) (월별 생산량)
const valueTone = {
  primary: "text-primary-text",
  operation: "text-chart-operation",
  production: "text-chart-production",
} as const

function MetricRow({
  className,
  label,
  value,
  target,
  percent,
  size = "sm",
  tone = "primary",
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  label: React.ReactNode
  // 화면에 보이는 값 글자 (예: "82%", "312,400")
  value: React.ReactNode
  // md 전용: 오른쪽 목표 값 (예: "450,000")
  target?: React.ReactNode
  // 막대 길이 0~100
  percent: number
  size?: "sm" | "md"
  tone?: keyof typeof valueTone
}) {
  if (size === "md") {
    return (
      <div data-slot="metric-row" data-size="md" className={cn("flex flex-col gap-2", className)} {...props}>
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className={cn("text-base font-semibold", valueTone[tone])}>{value}</span>
            {target != null && <span className="text-sm text-muted-foreground">{target}</span>}
          </div>
          <Progress size="md" tone={tone} value={percent} showLabel />
        </div>
      </div>
    )
  }
  return (
    <div data-slot="metric-row" data-size="sm" className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className={cn("text-sm font-semibold", valueTone[tone])}>{value}</span>
      </div>
      <Progress size="sm" tone={tone} value={percent} />
    </div>
  )
}

export { MetricRow }
