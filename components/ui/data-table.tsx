"use client"

import * as React from "react"
import { cn } from "cn"
import { ArrowUpDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// TNV v0.1 · Figma "- Tables › DataTable" (2099:7867) — state: default·empty
// 위: 검색 + 오른쪽 actions / 가운데: 테두리 있는 표(정렬·체크박스) / 아래: 선택 개수 + 이전·다음
// TableHead type: text·sortable·checkbox·action, TableCell type: text·muted·checkbox·action
type DataTableColumn<T> = {
  key: string
  header: React.ReactNode
  cell?: (row: T) => React.ReactNode
  /** 정렬 가능한 열 (Figma TableHead type=sortable) */
  sortValue?: (row: T) => string | number
  /** 흐린 글자 열 (Figma TableCell type=muted) */
  muted?: boolean
  className?: string
}

function DataTable<T>({
  columns,
  data,
  getRowId,
  searchText,
  searchPlaceholder = "검색",
  actions,
  selectable = false,
  pageSize = 10,
  emptyText = "표시할 데이터가 없습니다.",
  className,
}: {
  columns: DataTableColumn<T>[]
  data: T[]
  getRowId: (row: T) => string
  /** 검색에 쓸 글자. 없으면 검색칸을 숨긴다 */
  searchText?: (row: T) => string
  searchPlaceholder?: string
  actions?: React.ReactNode
  selectable?: boolean
  pageSize?: number
  emptyText?: React.ReactNode
  className?: string
}) {
  const [query, setQuery] = React.useState("")
  const [sort, setSort] = React.useState<{ key: string; dir: 1 | -1 } | null>(null)
  const [page, setPage] = React.useState(0)
  const [selected, setSelected] = React.useState<Set<string>>(new Set())

  const filtered = searchText && query ? data.filter((r) => searchText(r).toLowerCase().includes(query.toLowerCase())) : data
  const sortCol = sort && columns.find((c) => c.key === sort.key)
  const sorted = sortCol?.sortValue
    ? [...filtered].sort((a, b) => {
        const x = sortCol.sortValue!(a)
        const y = sortCol.sortValue!(b)
        return (x > y ? 1 : x < y ? -1 : 0) * sort!.dir
      })
    : filtered
  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const current = Math.min(page, pageCount - 1)
  const rows = sorted.slice(current * pageSize, current * pageSize + pageSize)
  const pageIds = rows.map(getRowId)
  const allOnPage = pageIds.length > 0 && pageIds.every((id) => selected.has(id))
  const someOnPage = pageIds.some((id) => selected.has(id))

  const toggleRow = (id: string) =>
    setSelected((prev) => {
      const s = new Set(prev)
      if (s.has(id)) s.delete(id)
      else s.add(id)
      return s
    })

  return (
    <div data-slot="data-table" className={cn("flex w-full flex-col", className)}>
      {(searchText || actions) && (
        <div className="flex items-center gap-2 py-4">
          {searchText && (
            <Input
              className="max-w-96"
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPage(0)
              }}
            />
          )}
          {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="overflow-hidden rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-10">
                  <Checkbox
                    aria-label="이 페이지 모두 선택"
                    checked={allOnPage ? true : someOnPage ? "indeterminate" : false}
                    onCheckedChange={(v) =>
                      setSelected((prev) => {
                        const s = new Set(prev)
                        pageIds.forEach((id) => (v ? s.add(id) : s.delete(id)))
                        return s
                      })
                    }
                  />
                </TableHead>
              )}
              {columns.map((c) => (
                <TableHead
                  key={c.key}
                  className={cn(c.sortValue && "pl-0", c.className)}
                  aria-sort={sort?.key === c.key ? (sort.dir === 1 ? "ascending" : "descending") : undefined}
                >
                  {c.sortValue ? (
                    <Button
                      variant="ghost"
                      className="shadow-none"
                      onClick={() =>
                        setSort((s) => (s?.key === c.key ? (s.dir === 1 ? { key: c.key, dir: -1 } : null) : { key: c.key, dir: 1 }))
                      }
                    >
                      {c.header}
                      <ArrowUpDownIcon aria-hidden="true" />
                    </Button>
                  ) : (
                    c.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length + (selectable ? 1 : 0)} className="h-24 text-center">
                  {emptyText}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => {
                const id = getRowId(row)
                const on = selected.has(id)
                return (
                  <TableRow key={id} data-state={on ? "selected" : undefined}>
                    {selectable && (
                      <TableCell className="w-10">
                        <Checkbox aria-label="행 선택" checked={on} onCheckedChange={() => toggleRow(id)} />
                      </TableCell>
                    )}
                    {columns.map((c) => (
                      <TableCell key={c.key} className={cn(c.muted && "text-muted-foreground", c.className)}>
                        {c.cell ? c.cell(row) : String((row as Record<string, unknown>)[c.key] ?? "")}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center gap-2 py-4">
        <span className="flex-1 text-sm text-muted-foreground" aria-live="polite">
          {sorted.length}건 중 {selected.size}건 선택
        </span>
        <Button variant="outline" size="sm" disabled={current === 0} onClick={() => setPage(current - 1)}>
          이전
        </Button>
        <Button variant="outline" size="sm" disabled={current >= pageCount - 1} onClick={() => setPage(current + 1)}>
          다음
        </Button>
      </div>
    </div>
  )
}

export { DataTable, type DataTableColumn }
