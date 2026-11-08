"use client"

import * as React from "react"
import { cn } from "cn"
import { StarIcon } from "lucide-react"
import { Toggle as TogglePrimitive } from "radix-ui"

// TNV v0.1 · FavoriteToggle — pressed: false(빈 별)·true(채운 별) / state: default·hover·focus·disabled
// 아이콘만 있는 버튼이라 aria-label을 꼭 넣는다 (예: "생산 실적 등록 즐겨찾기 해제")
function FavoriteToggle({
  className,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & { "aria-label": string }) {
  return (
    <TogglePrimitive.Root
      data-slot="favorite-toggle"
      className={cn(
        "group/favorite inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-alpha-ring-50 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <StarIcon
        aria-hidden="true"
        className="size-4 group-data-[state=on]/favorite:fill-(--amber-400) group-data-[state=on]/favorite:text-(--amber-400)"
      />
    </TogglePrimitive.Root>
  )
}

export { FavoriteToggle }
