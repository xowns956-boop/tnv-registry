"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Tabs as TabsPrimitive } from "radix-ui"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

// TNV v0.1 · Figma "- Tabs › TabsList" (51:139) · TabsTrigger (24:15) — variant: default·line·solid
const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center text-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "justify-center rounded-lg bg-muted p-[3px] group-data-horizontal/tabs:h-[34px]",
        line: "justify-start border-b border-border bg-transparent",
        // solid: 칸 사이 8, 각 탭이 따로 선 버튼형(대시보드 상단 전환)
        solid: "justify-start gap-2 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex items-center justify-center gap-1.5 text-sm font-medium whitespace-nowrap text-foreground transition-colors outline-none focus-visible:ring-3 focus-visible:ring-alpha-ring-50 disabled:pointer-events-none disabled:opacity-50 group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // default: 둥근 바 안의 알약, 선택되면 흰 바탕(tab-active) + shadow-sm
        "group-data-[variant=default]/tabs-list:h-7 group-data-[variant=default]/tabs-list:flex-1 group-data-[variant=default]/tabs-list:rounded-md group-data-[variant=default]/tabs-list:border group-data-[variant=default]/tabs-list:border-transparent group-data-[variant=default]/tabs-list:px-2 group-data-[variant=default]/tabs-list:py-1 group-data-[variant=default]/tabs-list:focus-visible:border-ring group-data-[variant=default]/tabs-list:data-active:bg-alpha-tab-active group-data-[variant=default]/tabs-list:data-active:shadow-sm",
        // line: 밑줄형, 선택되면 primary 글자 + 2px 밑줄
        "group-data-[variant=line]/tabs-list:-mb-px group-data-[variant=line]/tabs-list:rounded-sm group-data-[variant=line]/tabs-list:border-b-2 group-data-[variant=line]/tabs-list:border-transparent group-data-[variant=line]/tabs-list:px-3 group-data-[variant=line]/tabs-list:py-2 group-data-[variant=line]/tabs-list:data-active:rounded-none group-data-[variant=line]/tabs-list:data-active:border-primary group-data-[variant=line]/tabs-list:data-active:text-primary-text",
        // solid: 꺼짐 = muted 바탕 + 테두리 + muted-emphasis 글자, 선택 = primary 바탕 + primary-glow 그림자. 글자 text-base semibold, 여백 8/16, 둥글기 10
        "group-data-[variant=solid]/tabs-list:rounded-md group-data-[variant=solid]/tabs-list:border group-data-[variant=solid]/tabs-list:border-border group-data-[variant=solid]/tabs-list:bg-muted group-data-[variant=solid]/tabs-list:px-4 group-data-[variant=solid]/tabs-list:py-2 group-data-[variant=solid]/tabs-list:text-base group-data-[variant=solid]/tabs-list:font-semibold group-data-[variant=solid]/tabs-list:text-muted-emphasis group-data-[variant=solid]/tabs-list:data-active:border-transparent group-data-[variant=solid]/tabs-list:data-active:bg-primary group-data-[variant=solid]/tabs-list:data-active:text-primary-foreground group-data-[variant=solid]/tabs-list:data-active:shadow-primary-glow",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
