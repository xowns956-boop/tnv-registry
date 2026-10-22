"use client"

import * as React from "react"
import { cn } from "cn"
import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// TNV v0.1 · Figma "- Inputs › NumberInput / Stepper" (4045:6163)
// − 버튼(outline icon) + 가운데 값 입력칸 + + 버튼. 태블릿처럼 손가락으로 숫자를 바꿀 때 쓴다.
type NumberStepperProps = Omit<React.ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange" | "min" | "max" | "step"> & {
  value?: number | null
  defaultValue?: number | null
  onValueChange?: (value: number | null) => void
  min?: number
  max?: number
  step?: number
  incrementLabel?: string
  decrementLabel?: string
}

function NumberStepper({
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
}: NumberStepperProps) {
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
    <div data-slot="number-stepper" className={cn("flex w-80 max-w-full items-center gap-2", className)}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={decrementLabel}
        disabled={disabled || (min !== undefined && (value ?? 0) <= min)}
        onClick={() => nudge(-1)}
      >
        <MinusIcon aria-hidden="true" />
      </Button>
      <Input
        type="number"
        inputMode="decimal"
        data-slot="number-stepper-control"
        value={value ?? ""}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(e) => commit(e.target.value === "" ? null : Number(e.target.value))}
        className="flex-1 appearance-none text-center tabular-nums [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
        {...props}
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={incrementLabel}
        disabled={disabled || (max !== undefined && (value ?? 0) >= max)}
        onClick={() => nudge(1)}
      >
        <PlusIcon aria-hidden="true" />
      </Button>
    </div>
  )
}

export { NumberStepper }
