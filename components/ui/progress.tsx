"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Progress as ProgressPrimitive } from "radix-ui"

// TNV v0.1 · Figma "- Progress › Progress" (48:41) — size: sm(8)·md(14) / tone: primary·operation(가동률)·production(생산량) / Show Label(md 전용)
const progressVariants = cva("relative flex w-full items-center overflow-hidden rounded-full", {
  variants: {
    size: {
      sm: "h-2",
      md: "h-3.5",
    },
    tone: {
      primary: "bg-alpha-primary-20 [--progress-fill:var(--primary)]",
      operation: "bg-alpha-operation-20 [--progress-fill:var(--chart-operation)]",
      production: "bg-alpha-production-20 [--progress-fill:var(--chart-production)]",
    },
  },
  defaultVariants: {
    size: "sm",
    tone: "primary",
  },
})

function Progress({
  className,
  value,
  size = "sm",
  tone = "primary",
  showLabel = false,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressVariants> & {
    // md에서 채워진 막대 안 왼쪽에 % 표시 (다크에서도 밝은 막대 위라 진한 글자 progress-label)
    showLabel?: boolean
  }) {
  const v = Math.round(value || 0)
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      data-size={size}
      className={cn(progressVariants({ size, tone }), className)}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="size-full flex-1 rounded-full bg-(--progress-fill) transition-all"
        style={{ transform: `translateX(-${100 - v}%)` }}
      />
      {showLabel && size === "md" && (
        <span
          data-slot="progress-label"
          className="pointer-events-none absolute left-1.5 text-xs leading-none font-semibold text-progress-label"
        >
          {v}%
        </span>
      )}
    </ProgressPrimitive.Root>
  )
}

export { Progress, progressVariants }
