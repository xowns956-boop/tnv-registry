import * as React from "react"
import { cn } from "cn"
import { FilterXIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

// TNV v0.1 · Figma "03_Patterns › FilterBar" (38:34) — Show Search · Show Filter 1·2 · Show Date · Show Reset
// 안에 Input(검색) · Select(필터) · DatePicker(날짜)를 차례로 넣고, 맨 끝에 FilterBarReset.
function FilterBar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="search"
      data-slot="filter-bar"
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  )
}

function FilterBarReset({ children = "초기화", ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="ghost" {...props}>
      {children}
      <FilterXIcon aria-hidden="true" />
    </Button>
  )
}

export { FilterBar, FilterBarReset }
