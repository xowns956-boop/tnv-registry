import * as React from "react"
import { cn } from "cn"
import { ChevronsUpDownIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// TNV v0.1 · Figma "- Sidebar › NavUser" (43:485) — Name · Email · Show Chevron · layout: full·avatar
// 메뉴를 붙일 때는 DropdownMenuTrigger asChild 안에 넣는다.
function NavUser({
  name,
  email,
  avatarSrc,
  layout = "full",
  showChevron = false,
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "children"> & {
  name: string
  email?: string
  avatarSrc?: string
  layout?: "full" | "avatar"
  showChevron?: boolean
}) {
  return (
    <button
      type="button"
      data-slot="nav-user"
      data-layout={layout}
      aria-label={layout === "avatar" ? name : undefined}
      className={cn(
        "flex items-center gap-2 rounded-md text-left outline-none focus-visible:ring-3 focus-visible:ring-alpha-ring-50",
        className
      )}
      {...props}
    >
      <Avatar>
        {avatarSrc && <AvatarImage src={avatarSrc} alt="" />}
        <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
      </Avatar>
      {layout === "full" && (
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">{name}</span>
          {email && <span className="truncate text-xs text-muted-foreground">{email}</span>}
        </span>
      )}
      {layout === "full" && showChevron && (
        <ChevronsUpDownIcon className="ml-auto size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      )}
    </button>
  )
}

export { NavUser }
