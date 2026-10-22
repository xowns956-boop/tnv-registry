"use client"

import * as React from "react"

import {
  CommandDialog,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { PREVIEW_GROUPS, PREVIEW_SECTIONS } from "./sections"

// 미리보기 전용 목차·검색 (레지스트리에 들어가지 않음)

/** 해당 부품 칸으로 부드럽게 이동하고 주소에 #id를 남긴다 */
export function goToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
  history.replaceState(null, "", `#${id}`)
}

/** 지금 화면 위쪽에 보이는 부품 칸의 id */
function useActiveSection() {
  const [active, setActive] = React.useState<string>(PREVIEW_SECTIONS[0].id)

  // 스크롤 위치는 브라우저에서만 알 수 있어서 effect로 관찰한다.
  // 위쪽 고정 머리글(52) 바로 아래 선을 지난 마지막 칸이 지금 보는 칸이다.
  React.useEffect(() => {
    const update = () => {
      let current = PREVIEW_SECTIONS[0].id
      for (const s of PREVIEW_SECTIONS) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= 120) current = s.id
      }
      // 맨 아래까지 내리면 마지막 칸
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = PREVIEW_SECTIONS.at(-1)!.id
      setActive(current)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return active
}

export function PreviewSidebar() {
  const active = useActiveSection()
  const { setOpenMobile } = useSidebar()

  return (
    <Sidebar>
      <SidebarContent>
        {PREVIEW_GROUPS.map((g) => (
          <SidebarGroup key={g.label}>
            <SidebarGroupLabel>{g.label}</SidebarGroupLabel>
            <SidebarMenu>
              {g.items.map((s) => (
                <SidebarMenuItem key={s.id}>
                  <SidebarMenuButton asChild isActive={active === s.id} tooltip={s.label}>
                    <a
                      href={`#${s.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        goToSection(s.id)
                        setOpenMobile(false)
                      }}
                    >
                      <span>{s.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}

/** ⌘K(Ctrl+K) 또는 제목 아래 검색칸에서 Enter로 여는 부품 검색 */
export function PreviewSearch({
  open,
  onOpenChange,
  query,
  onQueryChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  query: string
  onQueryChange: (q: string) => void
}) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onOpenChange])

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="부품 검색" description="부품 이름으로 찾아 해당 칸으로 이동해요">
      <Command>
        <CommandInput placeholder="부품 이름 (예: 버튼, 표, 사이드바)" value={query} onValueChange={onQueryChange} />
        <CommandList>
          <CommandEmpty>찾는 부품이 없어요.</CommandEmpty>
          {PREVIEW_GROUPS.map((g) => (
            <CommandGroup key={g.label} heading={g.label}>
              {g.items.map((s) => (
                <CommandItem
                  key={s.id}
                  value={`${s.label} ${s.title} ${s.keywords ?? ""} ${s.id}`}
                  onSelect={() => {
                    onOpenChange(false)
                    // 팝업이 닫힌 뒤 스크롤해야 위치가 맞는다
                    setTimeout(() => goToSection(s.id), 0)
                  }}
                >
                  {s.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
