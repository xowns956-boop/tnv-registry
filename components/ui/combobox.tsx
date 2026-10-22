"use client"

import * as React from "react"
import { cn } from "cn"
import { ChevronsUpDownIcon } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// TNV v0.1 · Figma "- Command › Combobox" (30:106) — Value: text · Open: bool
// outline 트리거 + 팝오버 안 Command(검색 입력 + 목록).
type ComboboxOption = { value: string; label: string }

function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "선택하세요",
  searchPlaceholder = "검색",
  emptyText = "결과가 없어요",
  disabled,
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "value"> & {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
}) {
  const [open, setOpen] = React.useState(false)
  const listId = React.useId()
  const selected = options.find((o) => o.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          disabled={disabled}
          data-slot="combobox"
          className={cn(
            "flex h-9 w-50 items-center justify-between gap-2 rounded-md border border-border bg-alpha-outline px-4 text-sm font-medium text-foreground shadow-xs transition-colors outline-none hover:bg-alpha-outline-hover focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-alpha-ring-50 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          <span className="truncate">{selected?.label ?? placeholder}</span>
          <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList id={listId}>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((o) => (
                <CommandItem
                  key={o.value}
                  value={o.label}
                  data-checked={o.value === value}
                  onSelect={() => {
                    onValueChange?.(o.value === value ? "" : o.value)
                    setOpen(false)
                  }}
                >
                  {o.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { Combobox, type ComboboxOption }
