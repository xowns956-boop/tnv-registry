import * as React from "react"
import { cn } from "cn"

// TNV v0.1 · Figma "- Buttons › MenuTile" (4045:6191) — state: default·pressed(:active) / Show Icon
// 아이콘 + 메뉴명 큰 타일 (태블릿 메뉴용). 폭은 감싸는 그리드가 정한다.
function MenuTile({
  className,
  icon,
  type = "button",
  children,
  ...props
}: React.ComponentProps<"button"> & {
  /** 위쪽 아이콘 (lucide 아이콘 등). 없으면 메뉴명만 */
  icon?: React.ReactNode
}) {
  return (
    <button
      type={type}
      data-slot="menu-tile"
      className={cn(
        "flex min-h-37 w-full flex-col items-center justify-center gap-3 rounded-xl bg-card-emphasis p-4 text-card-emphasis-foreground shadow-xs transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-alpha-ring-50 active:bg-card-emphasis-active disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {icon && (
        <span data-slot="menu-tile-icon" aria-hidden="true" className="[&_svg]:size-6">
          {icon}
        </span>
      )}
      <span data-slot="menu-tile-label" className="w-full text-center text-xl font-semibold">
        {children}
      </span>
    </button>
  )
}

export { MenuTile }
