import * as React from "react"
import { cn } from "cn"
import { CheckIcon, XIcon } from "lucide-react"

// TNV v0.1 · Figma "- Steppers" (2043:178 Stepper · 2043:86 StepperItem · 2043:95 StepperSeparator)
// state: disabled·invalid·upcoming·current·done / orientation: horizontal·vertical
// Figma의 vertical = 동그라미 위·글자 아래(가로로 나열), horizontal = 동그라미 옆에 글자(세로로 나열).
type StepState = "disabled" | "invalid" | "upcoming" | "current" | "done"
type StepOrientation = "horizontal" | "vertical"

const StepperContext = React.createContext<StepOrientation>("vertical")

function Stepper({
  orientation = "vertical",
  className,
  ...props
}: React.ComponentProps<"ol"> & { orientation?: StepOrientation }) {
  return (
    <StepperContext.Provider value={orientation}>
      <ol
        data-slot="stepper"
        data-orientation={orientation}
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-row items-start" : "flex-col items-start",
          className
        )}
        {...props}
      />
    </StepperContext.Provider>
  )
}

const indicatorByState: Record<StepState, string> = {
  done: "bg-primary text-primary-foreground",
  current: "bg-primary text-primary-foreground ring-4 ring-alpha-ring-50",
  upcoming: "border border-border bg-card text-muted-foreground",
  invalid: "bg-alpha-destructive-solid text-destructive-foreground",
  disabled: "bg-muted text-muted-foreground",
}

const labelByState: Record<StepState, string> = {
  done: "font-medium text-foreground",
  current: "font-semibold text-foreground",
  upcoming: "font-medium text-muted-foreground",
  invalid: "font-medium text-destructive-text",
  disabled: "font-medium text-muted-foreground",
}

function StepperItem({
  state = "upcoming",
  index,
  label,
  optional,
  className,
  ...props
}: Omit<React.ComponentProps<"li">, "children"> & {
  state?: StepState
  index: React.ReactNode
  label: React.ReactNode
  /** Figma "Show Optional" — 단계 이름 아래 작은 보조 문구 */
  optional?: React.ReactNode
}) {
  const orientation = React.useContext(StepperContext)
  return (
    <li
      data-slot="stepper-item"
      data-state={state}
      aria-current={state === "current" ? "step" : undefined}
      aria-disabled={state === "disabled" || undefined}
      className={cn(
        "flex shrink-0",
        orientation === "vertical" ? "flex-col items-center gap-2 text-center" : "flex-row items-center gap-3",
        state === "disabled" && "opacity-50",
        className
      )}
      {...props}
    >
      <span
        data-slot="stepper-indicator"
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
          indicatorByState[state]
        )}
      >
        {state === "done" ? (
          <CheckIcon className="size-4" aria-hidden="true" />
        ) : state === "invalid" ? (
          <XIcon className="size-4" aria-hidden="true" />
        ) : (
          index
        )}
      </span>
      <span className="flex flex-col">
        <span className={cn("text-sm", labelByState[state])}>{label}</span>
        {optional && <span className="text-xs text-muted-foreground">{optional}</span>}
      </span>
    </li>
  )
}

function StepperSeparator({
  state = "upcoming",
  className,
  ...props
}: React.ComponentProps<"li"> & { state?: "upcoming" | "done" }) {
  const orientation = React.useContext(StepperContext)
  return (
    <li
      role="presentation"
      aria-hidden="true"
      data-slot="stepper-separator"
      data-state={state}
      className={cn(
        "flex shrink-0",
        orientation === "vertical" ? "h-7 w-16 items-center" : "h-6 w-7 justify-center",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          state === "done" ? "bg-primary" : "bg-border",
          orientation === "vertical" ? "h-0.5 w-full" : "h-full w-0.5"
        )}
      />
    </li>
  )
}

export { Stepper, StepperItem, StepperSeparator, type StepState }
