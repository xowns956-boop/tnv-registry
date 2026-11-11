"use client"

import * as React from "react"
import { cn } from "cn"
import { XIcon } from "lucide-react"

// TNV v0.1 · Page Tabs (PageTab state: default·hover·active · PageTabBar tabs: default·empty)
// 열린 화면을 브라우저 탭처럼 보여 주는 줄. 화면 맨 아래에 두고 위 1px 테두리. 각 탭은 아이콘 · 이름 · 닫기(Show Close).
// tabs: default(탭 있음) · empty(탭 0개 → 같은 줄에 emptyText 안내)
function PageTabBar({
  className,
  children,
  emptyText = "열린 화면이 없어요",
  ...props
}: React.ComponentProps<"div"> & { emptyText?: React.ReactNode }) {
  const empty = React.Children.toArray(children).length === 0
  return (
    <div
      role={empty ? undefined : "tablist"}
      data-slot="page-tab-bar"
      data-empty={empty || undefined}
      className={cn("flex h-9 w-full items-stretch overflow-x-auto border-t border-border bg-page-background", className)}
      {...props}
    >
      {empty ? <p className="flex items-center pl-3 text-xs whitespace-nowrap text-muted-foreground">{emptyText}</p> : children}
    </div>
  )
}

function PageTab({
  active = false,
  icon,
  onClose,
  closeLabel = "닫기",
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  active?: boolean
  icon?: React.ReactNode
  onClose?: () => void
  closeLabel?: string
}) {
  return (
    <div
      data-slot="page-tab"
      data-active={active || undefined}
      className={cn(
        "group/page-tab flex h-9 shrink-0 items-center gap-2 border-r border-border bg-page-background pr-2 pl-3 text-sm text-muted-foreground transition-colors hover:bg-accent data-active:bg-card data-active:font-semibold data-active:text-foreground",
        className
      )}
    >
      <button
        type="button"
        role="tab"
        aria-selected={active}
        className="flex h-full items-center gap-2 outline-none focus-visible:underline group-data-active/page-tab:[&>svg]:text-primary [&_svg]:size-4 [&_svg]:shrink-0"
        {...props}
      >
        {icon}
        <span className="whitespace-nowrap">{children}</span>
      </button>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label={typeof children === "string" ? `${children} ${closeLabel}` : closeLabel}
          className="flex size-4 items-center justify-center rounded-2xs text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-alpha-ring-50"
        >
          <XIcon className="size-3" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export { PageTabBar, PageTab }
