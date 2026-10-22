"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Toggle as TogglePrimitive } from "radix-ui"

// TNV v0.1 · Figma "- Toggles › Toggle" (50:123) — variant: default·outline·solid·pill / size: default·sm / pressed
const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-2 text-sm font-medium whitespace-nowrap text-foreground transition-colors outline-none focus-visible:ring-3 focus-visible:ring-alpha-ring-50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "rounded-md bg-transparent hover:bg-muted data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
        outline:
          "rounded-md border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
        solid:
          "gap-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-primary-hover",
        pill:
          "gap-1.5 rounded-full border border-border bg-background hover:bg-accent hover:text-accent-foreground data-[state=on]:border-primary data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
      },
      size: {
        default: "h-9 min-w-9 px-2",
        sm: "h-8 min-w-8 px-1.5",
      },
    },
    compoundVariants: [
      { variant: ["solid", "pill"], size: "default", className: "px-3" },
      { variant: ["solid", "pill"], size: "sm", className: "px-2.5" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
