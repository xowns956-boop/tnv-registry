"use client"

import * as React from "react"
import { cn } from "cn"
import { HouseIcon, SearchIcon } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { NavUser } from "@/components/ui/nav-user"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

// TNV v0.1 · Figma "03_Patterns › SiteHeader" (37:53)
// Show Sidebar Trigger · Show Home · Show Level 2 · Show Action · Show Search · Show Icon Buttons · Show User
// 사이드바 트리거를 쓰려면 SidebarProvider 안에 둔다.
type Crumb = { label: string; href?: string }

function SiteHeader({
  crumbs = [],
  homeHref = "/",
  showSidebarTrigger = true,
  showHome = true,
  searchPlaceholder,
  onSearchSubmit,
  actions,
  iconButtons,
  user,
  className,
}: {
  /** 마지막 항목이 현재 화면 */
  crumbs?: Crumb[]
  homeHref?: string
  showSidebarTrigger?: boolean
  showHome?: boolean
  /** 주면 검색칸이 보인다 (Show Search) */
  searchPlaceholder?: string
  onSearchSubmit?: (query: string) => void
  /** Show Action */
  actions?: React.ReactNode
  /** Show Icon Buttons — Button size="icon" variant="ghost" 들 */
  iconButtons?: React.ReactNode
  /** Show User */
  user?: { name: string; email?: string; avatarSrc?: string }
  className?: string
}) {
  const [q, setQ] = React.useState("")

  return (
    <header
      data-slot="site-header"
      className={cn("flex h-13 shrink-0 items-center gap-8 border-b border-border bg-background px-4 py-2", className)}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2.5 [&_[data-slot=breadcrumb-list]]:flex-nowrap [&_[data-slot=breadcrumb-item]]:whitespace-nowrap">
        {showSidebarTrigger && (
          <>
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4 data-vertical:self-center" />
          </>
        )}
        <Breadcrumb>
          <BreadcrumbList>
            {showHome && (
              <BreadcrumbItem>
                <BreadcrumbLink href={homeHref} aria-label="홈">
                  <HouseIcon className="size-4" aria-hidden="true" />
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {crumbs.map((c, i) => (
              <React.Fragment key={`${c.label}-${i}`}>
                {(showHome || i > 0) && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {i === crumbs.length - 1 ? (
                    <BreadcrumbPage>{c.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={c.href}>{c.label}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {actions}
        {searchPlaceholder && (
          <form
            role="search"
            className="max-md:hidden"
            onSubmit={(e) => {
              e.preventDefault()
              onSearchSubmit?.(q)
            }}
          >
            <InputGroup className="w-60">
              <InputGroupInput placeholder={searchPlaceholder} aria-label={searchPlaceholder} value={q} onChange={(e) => setQ(e.target.value)} />
              <InputGroupAddon>
                <SearchIcon aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </InputGroupAddon>
            </InputGroup>
          </form>
        )}
        {iconButtons}
        {user && (
          <>
            <NavUser className="max-md:hidden" name={user.name} email={user.email} avatarSrc={user.avatarSrc} showChevron />
            <NavUser className="md:hidden" layout="avatar" name={user.name} avatarSrc={user.avatarSrc} />
          </>
        )}
      </div>
    </header>
  )
}

export { SiteHeader, type Crumb }
