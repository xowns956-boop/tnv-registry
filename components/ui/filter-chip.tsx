import * as React from "react"
import { cn } from "cn"
import { XIcon } from "lucide-react"

// TNV v0.1 · Figma "- Chips › FilterChip" (62:237) — Show Remove: bool
function FilterChip({
  className,
  children,
  onRemove,
  removeLabel = "지우기",
  ...props
}: React.ComponentProps<"span"> & {
  onRemove?: () => void
  removeLabel?: string
}) {
  return (
    <span
      data-slot="filter-chip"
      className={cn(
        "inline-flex h-6.5 shrink-0 items-center gap-1.5 rounded-md border border-alpha-primary-30 bg-accent py-1 pr-2 pl-2.5 text-xs font-medium whitespace-nowrap text-accent-foreground",
        !onRemove && "pr-2.5",
        className
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label={typeof children === "string" ? `${children} ${removeLabel}` : removeLabel}
          onClick={onRemove}
          className="-mr-0.5 inline-flex size-3 items-center justify-center rounded-3xs opacity-70 outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-alpha-ring-50"
        >
          <XIcon className="size-3" aria-hidden="true" />
        </button>
      )}
    </span>
  )
}

export { FilterChip }
