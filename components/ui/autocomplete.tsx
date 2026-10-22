"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Popover as PopoverPrimitive } from "radix-ui"
import { cn } from "cn"
import { CheckIcon } from "lucide-react"

// TNV v0.1 · Figma "- Dropdowns › Autocomplete" (2022:3)
// 입력칸(Input과 같은 모양) + 아래 목록(SelectContent·SelectItem과 같은 모양). 글자를 치면 목록이 걸러진다.
type AutocompleteOption = { value: string; label: string }

function Autocomplete({
  options,
  value,
  onValueChange,
  placeholder,
  emptyText = "결과가 없어요",
  disabled,
  className,
  "aria-invalid": ariaInvalid,
  ...props
}: Omit<React.ComponentProps<"input">, "value" | "onChange"> & {
  options: AutocompleteOption[]
  value?: string
  onValueChange?: (value: string) => void
  emptyText?: string
}) {
  const [open, setOpen] = React.useState(false)
  const selected = options.find((o) => o.value === value)
  const [query, setQuery] = React.useState(selected?.label ?? "")

  return (
    <CommandPrimitive data-slot="autocomplete" className={cn("relative w-full", className)} loop>
      <PopoverPrimitive.Root open={open && !disabled} onOpenChange={setOpen}>
        <PopoverPrimitive.Anchor asChild>
          <CommandPrimitive.Input
            value={query}
            onValueChange={(q) => {
              setQuery(q)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false)
            }}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={ariaInvalid}
            className="h-9 w-full min-w-0 rounded-md border border-input bg-alpha-field px-3 py-2 text-sm text-foreground shadow-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-alpha-ring-50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-alpha-destructive-20"
            {...(props as React.ComponentProps<typeof CommandPrimitive.Input>)}
          />
        </PopoverPrimitive.Anchor>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={4}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            className="z-50 w-(--radix-popover-trigger-width) min-w-36 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
          >
            <CommandPrimitive.List className="max-h-60 overflow-y-auto">
              <CommandPrimitive.Empty className="px-2 py-1.5 text-sm text-muted-foreground">
                {emptyText}
              </CommandPrimitive.Empty>
              {options.map((o) => (
                <CommandPrimitive.Item
                  key={o.value}
                  value={o.label}
                  onMouseDown={(e) => e.preventDefault()}
                  onSelect={() => {
                    setQuery(o.label)
                    onValueChange?.(o.value)
                    setOpen(false)
                  }}
                  className="relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                >
                  {o.label}
                  {o.value === value && (
                    <CheckIcon className="absolute right-2 size-3.5" aria-hidden="true" />
                  )}
                </CommandPrimitive.Item>
              ))}
            </CommandPrimitive.List>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </CommandPrimitive>
  )
}

export { Autocomplete, type AutocompleteOption }
