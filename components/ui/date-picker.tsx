"use client"

import * as React from "react"
import { cn } from "cn"
import { CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// TNV v0.1 · Figma "- Date Pickers › DatePicker" (29:118) — Value: text · Open: bool
// 트리거(outline, 달력 아이콘 + 값) + 아래 Calendar 팝오버.
const defaultFormat = (date: Date) =>
  new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date)

function DatePicker({
  value,
  onValueChange,
  placeholder = "날짜 선택",
  formatDate = defaultFormat,
  disabled,
  className,
  invalid = false,
  ...props
}: Omit<React.ComponentProps<"button">, "value"> & {
  /** 오류 상태 (빨간 테두리) */
  invalid?: boolean
  value?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  formatDate?: (date: Date) => string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          data-slot="date-picker"
          data-empty={!value || undefined}
          disabled={disabled}
          data-invalid={invalid || undefined}
          className={cn(
            "flex h-9 w-70 items-center gap-2 rounded-md border border-border bg-alpha-outline px-3 text-left text-sm text-foreground shadow-xs transition-colors outline-none hover:bg-alpha-outline-hover focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-alpha-ring-50 disabled:cursor-not-allowed disabled:opacity-50 data-invalid:border-destructive data-invalid:ring-3 data-invalid:ring-alpha-destructive-20 data-empty:text-muted-foreground",
            className
          )}
          {...props}
        >
          <CalendarIcon className="size-4 shrink-0 text-foreground" aria-hidden="true" />
          <span className="truncate">{value ? formatDate(value) : placeholder}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(d) => {
            onValueChange?.(d)
            setOpen(false)
          }}
          className="rounded-md"
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
