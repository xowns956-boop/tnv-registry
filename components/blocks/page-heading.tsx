import * as React from "react"
import { cn } from "cn"

// TNV v0.1 · Figma "03_Patterns › PageHeading" (37:74) — Title · Description · Show Description · Show Secondary · Show Primary
// actions에는 Button(보조는 variant="outline", 주요는 기본) 을 넣는다. 주요 버튼은 하나만.
function PageHeading({
  title,
  description,
  actions,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  title: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
}) {
  return (
    <div data-slot="page-heading" className={cn("flex flex-wrap items-center gap-4", className)} {...props}>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  )
}

export { PageHeading }
