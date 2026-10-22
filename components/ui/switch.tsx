"use client"

import * as React from "react"
import { cn } from "cn"
import { Switch as SwitchPrimitive } from "radix-ui"

// TNV v0.1 · Figma "- Switches › Switch" (11:132)
// 바탕(꺼짐) = alpha/switch-off, 손잡이 = alpha/switch-thumb(두 모드 모두 흰색). 다크에서도 바탕·손잡이가 보이도록 대비 3:1 이상.
function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer group/switch relative inline-flex h-[18px] w-8 shrink-0 items-center rounded-full border border-transparent p-px shadow-xs transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-alpha-ring-50 data-checked:bg-primary data-unchecked:bg-alpha-switch-off data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-4 rounded-full bg-alpha-switch-thumb ring-0 transition-transform data-checked:translate-x-3.5 data-unchecked:translate-x-0"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
