"use client"

import * as React from "react"
import { cn } from "cn"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

// TNV v0.1 · Figma "- Inputs › NumberInput" (2024:3)
// 36px 입력칸 + 오른쪽 위/아래 버튼(테두리 왼쪽 1px). 키보드 ↑/↓는 input type="number" 기본 동작.
type NumberInputProps = Omit<React.ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange"> & {
  value?: number | null
  defaultValue?: number | null
  onValueChange?: (value: number | null) => void
  min?: number
  max?: number
  step?: number
  incrementLabel?: string
  decrementLabel?: string
}

function NumberInput({
  className,
  value: valueProp,
  defaultValue = null,
  onValueChange,
  min,
  max,
  step = 1,
  disabled,
  incrementLabel = "값 늘리기",
  decrementLabel = "값 줄이기",
  ...props
}: NumberInputProps) {
  const [inner, setInner] = React.useState<number | null>(defaultValue)
  const value = valueProp !== undefined ? valueProp : inner

  const commit = (next: number | null) => {
    if (next !== null) {
      if (min !== undefined) next = Math.max(min, next)
      if (max !== undefined) next = Math.min(max, next)
    }
    if (valueProp === undefined) setInner(next)
    onValueChange?.(next)
  }

  const nudge = (dir: 1 | -1) => commit((value ?? 0) + dir * step)

  return (
    <div
      data-slot="number-input"
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "flex h-9 w-full min-w-0 items-stretch overflow-hidden rounded-md border border-input bg-alpha-field shadow-xs transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-alpha-ring-50 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-alpha-destructive-20 data-disabled:opacity-50",
        className
      )}
    >
      <input
        type="number"
        inputMode="decimal"
        data-slot="number-input-control"
        value={value ?? ""}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(e) => commit(e.target.value === "" ? null : Number(e.target.value))}
        className="min-w-0 flex-1 appearance-none bg-transparent py-2 pl-3 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
        {...props}
      />
      <div className="flex w-6 flex-col border-l border-border">
        <button
          type="button"
          tabIndex={-1}
          aria-label={incrementLabel}
          disabled={disabled || (max !== undefined && (value ?? 0) >= max)}
          onClick={() => nudge(1)}
          className="flex flex-1 items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
        >
          <ChevronUpIcon className="size-3" aria-hidden="true" />
        </button>
        <button
          type="button"
          tabIndex={-1}
          aria-label={decrementLabel}
          disabled={disabled || (min !== undefined && (value ?? 0) <= min)}
          onClick={() => nudge(-1)}
          className="flex flex-1 items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
        >
          <ChevronDownIcon className="size-3" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export { NumberInput }
