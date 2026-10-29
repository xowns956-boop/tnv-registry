import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// TNV v0.1 · StatusBadge — 설비·공정 상태 배지. status: run(정상 가동) · idle(대기) · error(오류) · maintenance(점검) · offline(꺼짐)
// size: default(높이 20) · sm(높이 16, 표 칸·판정 표시용). 문구를 바꾸려면 children(예: 양호 · 유의 · 불량)
const statusBadgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center rounded-2xs text-xs whitespace-nowrap",
  {
    variants: {
      status: {
        run: "bg-success-subtle text-success-subtle-foreground",
        idle: "bg-warning-subtle text-warning-subtle-foreground",
        error: "bg-destructive-subtle text-destructive-subtle-foreground",
        maintenance: "bg-ees-maintenance-subtle text-ees-maintenance-subtle-foreground",
        offline: "bg-dark-subtle text-dark-subtle-foreground",
      },
      size: {
        default: "h-5 px-2 py-0.5 font-medium",
        sm: "h-4 px-1.5 font-normal",
      },
    },
    defaultVariants: {
      status: "run",
      size: "default",
    },
  }
)

type StatusBadgeStatus = NonNullable<VariantProps<typeof statusBadgeVariants>["status"]>

// children이 없을 때 보이는 상태 이름
const statusLabel: Record<StatusBadgeStatus, string> = {
  run: "Run",
  idle: "Idle",
  error: "Error",
  maintenance: "Maintenance",
  offline: "Offline",
}

function StatusBadge({
  className,
  status = "run",
  size = "default",
  children,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof statusBadgeVariants>) {
  const key = status ?? "run"
  return (
    <span
      data-slot="status-badge"
      data-status={key}
      data-size={size}
      className={cn(statusBadgeVariants({ status: key, size }), className)}
      {...props}
    >
      {children ?? statusLabel[key]}
    </span>
  )
}

export { StatusBadge, statusBadgeVariants, statusLabel, type StatusBadgeStatus }
