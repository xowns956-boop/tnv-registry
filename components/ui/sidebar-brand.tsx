import * as React from "react"
import { cn } from "cn"

import { Badge } from "@/components/ui/badge"

// TNV v0.1 · Figma "- Sidebar › SidebarBrand" (43:109) — Name · Subtitle · Show Badge · Show Subtitle · collapsed
// 사이드바가 접히면(collapsible="icon") 로고만 남는다. 높이는 Figma대로 48(머리 칸 64)로 고정해 접혀도, 부제가 있어도 같다.
function SidebarBrand({
  name,
  subtitle,
  badge,
  logo,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  name: React.ReactNode
  subtitle?: React.ReactNode
  badge?: React.ReactNode
  /** 로고 자리. 없으면 이름 첫 글자 */
  logo?: React.ReactNode
}) {
  const initial = typeof name === "string" ? name.slice(0, 1) : null

  return (
    <div
      data-slot="sidebar-brand"
      className={cn("flex h-12 items-center gap-2 p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0", className)}
      {...props}
    >
      <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sidebar-primary text-sm text-sidebar-primary-foreground">
        {logo ?? initial}
      </span>
      <span className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
        <span className="flex items-center gap-1.5">
          <span className="truncate text-sm font-semibold text-sidebar-foreground">{name}</span>
          {badge && <Badge variant="outline">{badge}</Badge>}
        </span>
        {subtitle && <span className="truncate text-xs text-muted-foreground">{subtitle}</span>}
      </span>
    </div>
  )
}

export { SidebarBrand }
