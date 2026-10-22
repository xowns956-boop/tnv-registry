import * as React from "react"
import { cn } from "cn"

// TNV v0.1 · Figma "- Inputs › Input" (10:66) — state: default·focus·disabled·invalid(aria-invalid)
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-alpha-field px-3 py-2 text-sm text-foreground shadow-xs transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-alpha-ring-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-alpha-destructive-20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
