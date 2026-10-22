"use client"

import * as React from "react"
import { cn } from "cn"
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react"

// TNV v0.1 · Figma "- Tree" (62:177 TreeItem · 62:178 Tree)
// level: 0·1·2 (들여쓰기 8 → 24 → 40px) / expand: open·closed·leaf / state: default·selected
// 키보드: ↑↓ 이동 · → 펼치기 · ← 접기 · Enter/Space 선택
type TreeNode = {
  id: string
  label: React.ReactNode
  icon?: React.ReactNode
  count?: React.ReactNode
  children?: TreeNode[]
}

function flatten(nodes: TreeNode[], open: Set<string>, level = 0, parent?: string): { node: TreeNode; level: number; parent?: string }[] {
  return nodes.flatMap((node) => [
    { node, level, parent },
    ...(node.children && open.has(node.id) ? flatten(node.children, open, level + 1, node.id) : []),
  ])
}

function Tree({
  nodes,
  selectedId,
  onSelect,
  defaultExpanded = [],
  className,
  "aria-label": ariaLabel,
}: {
  nodes: TreeNode[]
  selectedId?: string
  onSelect?: (id: string) => void
  defaultExpanded?: string[]
  className?: string
  "aria-label"?: string
}) {
  const [open, setOpen] = React.useState(() => new Set(defaultExpanded))
  const [focusId, setFocusId] = React.useState<string | undefined>(selectedId ?? nodes[0]?.id)
  const refs = React.useRef(new Map<string, HTMLDivElement>())
  const rows = flatten(nodes, open)

  const toggle = (id: string, next?: boolean) =>
    setOpen((prev) => {
      const s = new Set(prev)
      if (next ?? !s.has(id)) s.add(id)
      else s.delete(id)
      return s
    })

  const moveFocus = (id?: string) => {
    if (!id) return
    setFocusId(id)
    refs.current.get(id)?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const { node, parent } = rows[i]
    const hasKids = !!node.children?.length
    if (e.key === "ArrowDown") moveFocus(rows[i + 1]?.node.id)
    else if (e.key === "ArrowUp") moveFocus(rows[i - 1]?.node.id)
    else if (e.key === "ArrowRight") {
      if (hasKids && !open.has(node.id)) toggle(node.id, true)
      else if (hasKids) moveFocus(rows[i + 1]?.node.id)
    } else if (e.key === "ArrowLeft") {
      if (hasKids && open.has(node.id)) toggle(node.id, false)
      else moveFocus(parent)
    } else if (e.key === "Enter" || e.key === " ") onSelect?.(node.id)
    else return
    e.preventDefault()
  }

  return (
    <div role="tree" aria-label={ariaLabel} data-slot="tree" className={cn("flex w-64 flex-col", className)}>
      {rows.map(({ node, level }, i) => {
        const hasKids = !!node.children?.length
        const expanded = hasKids ? open.has(node.id) : undefined
        const selected = node.id === selectedId
        return (
          <div
            key={node.id}
            ref={(el) => {
              if (el) refs.current.set(node.id, el)
              else refs.current.delete(node.id)
            }}
            role="treeitem"
            aria-level={level + 1}
            aria-expanded={expanded}
            aria-selected={selected}
            tabIndex={node.id === focusId ? 0 : -1}
            data-slot="tree-item"
            data-selected={selected || undefined}
            onKeyDown={(e) => onKeyDown(e, i)}
            onFocus={() => setFocusId(node.id)}
            onClick={() => {
              if (hasKids) toggle(node.id)
              onSelect?.(node.id)
            }}
            style={{ "--tree-level": level } as React.CSSProperties}
            className="flex h-8 cursor-default items-center gap-1.5 rounded-md py-1.5 pr-2 pl-[calc(var(--spacing)*(2+var(--tree-level)*4))] text-sm text-foreground outline-none select-none hover:bg-alpha-list-hover focus-visible:ring-3 focus-visible:ring-alpha-ring-50 data-selected:bg-accent data-selected:font-medium data-selected:text-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0"
          >
            <span className="flex size-4 shrink-0 items-center justify-center text-muted-foreground" aria-hidden="true">
              {hasKids && (expanded ? <ChevronDownIcon /> : <ChevronRightIcon />)}
            </span>
            {node.icon}
            <span className="min-w-0 flex-1 truncate">{node.label}</span>
            {node.count !== undefined && (
              <span className={cn("text-xs font-medium", selected ? "text-primary" : "text-muted-foreground")}>
                {node.count}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export { Tree, type TreeNode }
