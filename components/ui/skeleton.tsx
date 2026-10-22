import { cn } from "cn"

// TNV v0.1 · Figma "- Skeletons › Skeleton" (12:166)
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-secondary-hover", className)}
      {...props}
    />
  )
}

export { Skeleton }
