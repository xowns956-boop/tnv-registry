import * as React from "react"
import { cn } from "cn"

// TNV v0.1 · Figma "- Cards › Card" (6003:7020) — variant: default·panel / size: default·sm
// default = 흰 카드(테두리 1 + shadow-sm, 둥글기 16, 여백·간격 16 · sm 12)
// panel = 대시보드 좌우 반투명 큰 패널(테두리 2 + shadow-panel, 여백 14 · 간격 12, 제목 text-2xl)
function Card({
  className,
  size = "default",
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm"; variant?: "default" | "panel" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl border border-border bg-card py-(--card-spacing) text-sm text-card-foreground shadow-sm [--card-spacing:--spacing(4)] [--card-title-size:var(--text-base)] [--card-title-leading:var(--text-base--line-height)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:[--card-title-size:var(--text-sm)] data-[size=sm]:[--card-title-leading:var(--text-sm--line-height)] *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        "data-[variant=panel]:gap-3 data-[variant=panel]:border-2 data-[variant=panel]:bg-alpha-panel data-[variant=panel]:shadow-panel data-[variant=panel]:[--card-spacing:--spacing(3.5)] data-[variant=panel]:[--card-title-size:var(--text-2xl)] data-[variant=panel]:[--card-title-leading:var(--text-2xl--line-height)]",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-(length:--card-title-size) leading-(--card-title-leading) font-semibold text-card-foreground",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-2 px-(--card-spacing) [.border-t]:pt-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
