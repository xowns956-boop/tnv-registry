import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// TNV v0.1 · DataRow — 라벨 · 값 한 줄. 요약 수치 카드(에너지 사용량 등)에 쌓아 쓴다. 진행 막대가 필요하면 MetricRow
// variant: plain(기본 한 줄, 높이 24) · boxed(테두리 작은 칸, text-xs — 온도·전력·이동평균·실시간 같은 2열 요약 칸)
// tone: 값 글자색(지표 색) default · operation · performance · quality · production · electricity · gas
const dataRowVariants = cva("flex items-center justify-between gap-2", {
  variants: {
    variant: {
      plain: "h-6",
      boxed: "rounded-2xs border border-border px-2 py-1 text-xs",
    },
  },
  defaultVariants: {
    variant: "plain",
  },
})

const valueTone = {
  default: "text-foreground",
  operation: "text-chart-operation",
  performance: "text-chart-performance",
  quality: "text-chart-quality",
  production: "text-chart-production",
  electricity: "text-chart-electricity",
  gas: "text-chart-gas",
} as const

function DataRow({
  className,
  label,
  value,
  variant = "plain",
  tone = "default",
  ...props
}: Omit<React.ComponentProps<"div">, "children"> &
  VariantProps<typeof dataRowVariants> & {
    label: React.ReactNode
    // 화면에 보이는 값 글자 (예: "138,140kWh")
    value: React.ReactNode
    tone?: keyof typeof valueTone
  }) {
  const boxed = variant === "boxed"
  return (
    <div data-slot="data-row" data-variant={variant} className={cn(dataRowVariants({ variant }), className)} {...props}>
      <span className={cn("min-w-0 truncate", boxed ? "text-muted-foreground" : "text-sm font-medium text-foreground")}>{label}</span>
      <span className={cn("shrink-0", boxed ? "font-medium" : "text-base font-semibold", valueTone[tone])}>{value}</span>
    </div>
  )
}

export { DataRow, dataRowVariants }
