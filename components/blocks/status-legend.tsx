import * as React from "react"
import { cn } from "cn"

import { StatusBadge, statusLabel, type StatusBadgeStatus } from "@/components/ui/status-badge"

// TNV v0.1 · StatusLegend — 설비 상태 범례(Run · Idle · Error · Maintenance · Offline). 대시보드 카드 안에 넣는다
const legendOrder: StatusBadgeStatus[] = ["run", "idle", "error", "maintenance", "offline"]

function StatusLegend({ className, ...props }: Omit<React.ComponentProps<"ul">, "children">) {
  return (
    <ul data-slot="status-legend" aria-label="설비 상태 범례" className={cn("flex flex-wrap items-start gap-1", className)} {...props}>
      {legendOrder.map((status) => (
        <li key={status} className="flex">
          <StatusBadge status={status}>{statusLabel[status]}</StatusBadge>
        </li>
      ))}
    </ul>
  )
}

export { StatusLegend }
