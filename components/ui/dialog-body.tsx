"use client"

import * as React from "react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

// TNV v0.1 · Figma "- Dialogs › DialogBody" (4047:18) — DialogContent 안에 넣는 내용 부품 6종.
// 공통 틀: 카드 바탕 + 1px 테두리 + 둥글기 2xs(4), 줄 사이 1px 선.
const frame = "w-full overflow-hidden rounded-2xs border border-border bg-card text-sm"

type Option = { value: string; label: React.ReactNode; disabled?: boolean }

// Figma "DialogBody / Table" (4047:19) — 목록 표
function DialogBodyTable<T>({
  columns,
  rows,
  getRowId,
  className,
}: {
  columns: { key: string; header: React.ReactNode; cell?: (row: T) => React.ReactNode; className?: string }[]
  rows: T[]
  getRowId: (row: T) => string
  className?: string
}) {
  return (
    <div data-slot="dialog-body-table" className={cn(frame, className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((c) => (
              <TableHead key={c.key} className={c.className}>
                {c.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={getRowId(r)}>
              {columns.map((c) => (
                <TableCell key={c.key} className={c.className}>
                  {c.cell ? c.cell(r) : String((r as Record<string, unknown>)[c.key] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// Figma "DialogBody / Info" (4047:88) — 항목 제목(muted 120px) + 값
function DialogBodyInfo({
  items,
  className,
}: {
  items: { label: React.ReactNode; value: React.ReactNode }[]
  className?: string
}) {
  return (
    <dl data-slot="dialog-body-info" className={cn(frame, "flex flex-col divide-y divide-border", className)}>
      {items.map((it, i) => (
        <div key={typeof it.label === "string" ? it.label : i} className="flex">
          <dt className="flex w-30 shrink-0 items-center bg-table-header px-2 font-medium text-foreground">{it.label}</dt>
          <dd className="flex h-9 min-w-0 flex-1 items-center p-2 text-foreground">{it.value}</dd>
        </div>
      ))}
    </dl>
  )
}

// Figma "DialogBody / LotInput" (4047:149) — LOT 번호 입력 한 줄 (MES)
function DialogBodyLotInput({
  label = "LOT NO",
  id,
  className,
  ...props
}: React.ComponentProps<typeof Input> & { label?: React.ReactNode }) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  return (
    <div data-slot="dialog-body-lot-input" className={cn(frame, "flex", className)}>
      <Label htmlFor={inputId} className="flex w-30 shrink-0 items-center rounded-none bg-table-header px-2">
        {label}
      </Label>
      <div className="flex min-w-0 flex-1 items-center px-2 py-1">
        <Input id={inputId} placeholder="LOT NO 입력" {...props} />
      </div>
    </div>
  )
}

// Figma "DialogBody / Textarea" (4047:161) — 여러 줄 입력, 높이 160(spacing 40)
function DialogBodyTextarea({ className, ...props }: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      data-slot="dialog-body-textarea"
      placeholder="내용을 입력하세요"
      className={cn("h-40 resize-none [field-sizing:fixed]", className)}
      {...props}
    />
  )
}

// Figma "DialogBody / OptionList" (4047:164) — 하나 고르기 목록 (라디오 줄)
function DialogBodyOptionList({
  options,
  className,
  ...props
}: Omit<React.ComponentProps<typeof RadioGroup>, "children"> & { options: Option[] }) {
  const baseId = React.useId()
  return (
    <RadioGroup
      data-slot="dialog-body-option-list"
      className={cn(frame, "gap-0 divide-y divide-border", className)}
      {...props}
    >
      {options.map((o) => {
        const id = `${baseId}-${o.value}`
        return (
          <div key={o.value} className="flex h-9 items-center gap-3 px-4">
            <RadioGroupItem id={id} value={o.value} disabled={o.disabled} />
            <Label htmlFor={id} className="flex-1 font-medium">
              {o.label}
            </Label>
          </div>
        )
      })}
    </RadioGroup>
  )
}

// Figma "DialogBody / OptionButtons" (4047:175) — 방식 고르기 버튼(세로, outline lg)
function DialogBodyOptionButtons({
  options,
  onSelect,
  className,
}: {
  options: Option[]
  onSelect?: (value: string) => void
  className?: string
}) {
  return (
    <div data-slot="dialog-body-option-buttons" className={cn("flex w-full flex-col gap-3", className)}>
      {options.map((o) => (
        <Button key={o.value} variant="outline" size="lg" className="w-full" disabled={o.disabled} onClick={() => onSelect?.(o.value)}>
          {o.label}
        </Button>
      ))}
    </div>
  )
}

export {
  DialogBodyTable,
  DialogBodyInfo,
  DialogBodyLotInput,
  DialogBodyTextarea,
  DialogBodyOptionList,
  DialogBodyOptionButtons,
}
