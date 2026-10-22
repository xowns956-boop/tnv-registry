import * as React from "react"
import { cn } from "cn"

// TNV v0.1 · Figma "- Layout › Toolbar" (2044:210)
// 테두리 있는 버튼 줄. 안에는 Button size="sm"을 넣고, 묶음 사이는 ToolbarSeparator로 나눈다.
function Toolbar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="toolbar"
      data-slot="toolbar"
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-border bg-background p-2",
        className
      )}
      {...props}
    />
  )
}

function ToolbarSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      data-slot="toolbar-separator"
      className={cn("h-5 w-px shrink-0 bg-border", className)}
      {...props}
    />
  )
}

export { Toolbar, ToolbarSeparator }
