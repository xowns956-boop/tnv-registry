"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Popover as PopoverPrimitive } from "radix-ui"
import { cn } from "cn"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { FilterChip } from "@/components/ui/filter-chip"

// TNV v0.1 · Figma "- Dropdowns › MultiSelect" (2022:32)
// 트리거 안에 고른 항목이 FilterChip으로 쌓이고, 목록은 SelectContent·SelectItem과 같은 모양.
type MultiSelectOption = { value: string; label: string }

function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = "선택하세요",
  emptyText = "결과가 없어요",
  disabled,
  className,
  "aria-invalid": ariaInvalid,
  ...props
}: Omit<React.ComponentProps<"button">, "value"> & {
  options: MultiSelectOption[]
  value: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  emptyText?: string
}) {
  const [open, setOpen] = React.useState(false)
  const toggle = (v: string) =>
    onValueChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
  const picked = options.filter((o) => value.includes(o.value))

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <div
        data-slot="multi-select"
        aria-invalid={ariaInvalid}
        className={cn(
          "relative flex min-h-9 w-full min-w-0 items-center rounded-md border border-input bg-alpha-field shadow-xs transition-colors has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-alpha-ring-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-alpha-destructive-20",
          disabled && "opacity-50",
          className
        )}
      >
        <PopoverPrimitive.Trigger asChild>
          <button
            type="button"
            disabled={disabled}
            aria-label={picked.length ? `${placeholder} (${picked.length}개 선택됨)` : placeholder}
            className="absolute inset-0 rounded-md outline-none disabled:cursor-not-allowed"
            {...props}
          />
        </PopoverPrimitive.Trigger>
        <div className="pointer-events-none flex flex-1 flex-wrap items-center gap-1.5 py-1.5 pl-3">
          {picked.length === 0 ? (
            <span className="text-sm text-muted-foreground">{placeholder}</span>
          ) : (
            picked.map((o) => (
              <FilterChip key={o.value} className="pointer-events-auto relative" onRemove={disabled ? undefined : () => toggle(o.value)}>
                {o.label}
              </FilterChip>
            ))
          )}
        </div>
        <ChevronDownIcon className="pointer-events-none mr-3 size-4 shrink-0 text-muted-foreground opacity-50" aria-hidden="true" />
      </div>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className="z-50 w-(--radix-popover-trigger-width) min-w-36 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
        >
          <CommandPrimitive loop>
            <CommandPrimitive.List className="max-h-60 overflow-y-auto" aria-multiselectable="true">
              <CommandPrimitive.Empty className="px-2 py-1.5 text-sm text-muted-foreground">
                {emptyText}
              </CommandPrimitive.Empty>
              {options.map((o) => {
                const on = value.includes(o.value)
                return (
                  <CommandPrimitive.Item
                    key={o.value}
                    value={o.label}
                    aria-selected={on}
                    onSelect={() => toggle(o.value)}
                    className="relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                  >
                    {o.label}
                    {on && <CheckIcon className="absolute right-2 size-3.5" aria-hidden="true" />}
                  </CommandPrimitive.Item>
                )
              })}
            </CommandPrimitive.List>
          </CommandPrimitive>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export { MultiSelect, type MultiSelectOption }
