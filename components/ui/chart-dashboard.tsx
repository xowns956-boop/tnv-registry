"use client"

import * as React from "react"
import { cn } from "cn"
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { chartTone, type ChartTone } from "@/components/ui/chart-presets"

// TNV v0.1 · Figma "- Charts" 대시보드 차트 (6012:405 Radial · 6026:446 Column · ColumnTarget · 6028:260 ChartBrush · 6028:352 Trend · MultiLine · 6042:62 GroupedBar · 6012:447 Legend)
// 대시보드 카드 안에 들어가는 작은 차트. 눈금 글자 text-xs muted-foreground, 격자선 border.

type Row = Record<string, string | number>

const axisTick = { fontSize: 12, fill: "var(--muted-foreground)" }

// 가운데 정렬 범례(차트 밖에서 쓸 때) · Figma ChartLegendContent (6012:447): 색 표시 8px(둥글기 2) + 이름
function ChartLegendList({
  items,
  orientation = "horizontal",
  className,
}: {
  items: { label: React.ReactNode; color: string }[]
  orientation?: "horizontal" | "vertical"
  className?: string
}) {
  return (
    <ul
      data-slot="chart-legend-list"
      className={cn(
        "flex",
        orientation === "vertical" ? "flex-col gap-3 text-sm text-foreground" : "items-center justify-center gap-4 text-xs",
        className
      )}
    >
      {items.map((it, i) => (
        <li key={i} className="flex items-center gap-1.5">
          <span aria-hidden className="size-2 shrink-0 rounded-3xs bg-(--legend-color)" style={{ "--legend-color": it.color } as React.CSSProperties} />
          {it.label}
        </li>
      ))}
    </ul>
  )
}

// 차트 머리(작은 차트 공통): 제목(text-sm) + 오른쪽 범례(text-xs muted)
function MiniChartHeader({
  title,
  legend,
  marker = "swatch",
}: {
  title?: React.ReactNode
  /** 항목별 marker를 주면 그 항목만 다른 모양(막대+선 섞인 범례) */
  legend?: { label: React.ReactNode; color: string; marker?: "swatch" | "line" }[]
  marker?: "swatch" | "line"
}) {
  if (!title && !legend?.length) return null
  return (
    <div className="flex h-4 items-center gap-3">
      <span className="min-w-0 flex-1 truncate text-sm text-card-foreground">{title}</span>
      {legend?.map((l, i) =>
        (l.marker ?? marker) === "line" ? (
          <span key={i} className="flex items-center gap-1 text-xs text-muted-foreground">
            <span aria-hidden className="h-0.5 w-2.5 bg-(--legend-color)" style={{ "--legend-color": l.color } as React.CSSProperties} />
            {l.label}
          </span>
        ) : (
          <span key={i} className="flex items-center gap-1 text-xs text-muted-foreground">
            {l.label}
            <span aria-hidden className="size-2.5 rounded-3xs bg-(--legend-color)" style={{ "--legend-color": l.color } as React.CSSProperties} />
          </span>
        )
      )}
    </div>
  )
}

// ── Radial · Figma Chart/Radial (6012:405) ──
// rings=3: 160px, 링 두께 12·간격 4, 바깥→안 = values[0]~[2], 가운데 caption + 값(text-xl)
// rings=1: 72px, 링 두께 7, 가운데 값만(text-sm, 링 색)
// 바탕 링 = secondary. tone=default(chart-1~3) · metric(가동 operation · 성능 performance · 품질 quality / 링 1개는 production)
const radialColors = {
  default: ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"],
  metric: ["var(--chart-operation)", "var(--chart-performance)", "var(--chart-quality)"],
}

function ChartRadial({
  values,
  tone = "default",
  caption,
  valueText,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  /** 0~100. 1개면 작은 링, 3개면 큰 링 */
  values: number[]
  tone?: "default" | "metric"
  caption?: React.ReactNode
  valueText: React.ReactNode
}) {
  const single = values.length === 1
  const size = single ? 72 : 160
  const thickness = single ? 7 : 12
  const colors = single ? [tone === "metric" ? "var(--chart-production)" : "var(--chart-1)"] : radialColors[tone]
  return (
    <div
      data-slot="chart-radial"
      role="img"
      className={cn("relative inline-flex shrink-0 items-center justify-center", single ? "size-18" : "size-40", className)}
      {...props}
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 size-full -rotate-90" aria-hidden>
        {values.map((v, i) => {
          const r = size / 2 - i * (thickness + 4) - thickness / 2
          const c = 2 * Math.PI * r
          const pct = Math.max(0, Math.min(100, v)) / 100
          return (
            <g key={i}>
              <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--secondary)" strokeWidth={thickness} />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={colors[i]}
                strokeWidth={thickness}
                strokeDasharray={`${c * pct} ${c}`}
              />
            </g>
          )
        })}
      </svg>
      <div className="relative flex flex-col items-center">
        {!single && caption && <span className="text-xs font-medium text-muted-foreground">{caption}</span>}
        <span
          className={cn("font-semibold tabular-nums", single ? "text-sm text-(--radial-color)" : "text-xl text-primary-text")}
          style={single ? ({ "--radial-color": colors[0] } as React.CSSProperties) : undefined}
        >
          {valueText}
        </span>
      </div>
    </div>
  )
}

// ── Column · Figma Chart/Column (6026:446) ──
// 대시보드 카드용 작은 막대 차트(300×96). 막대 8px · 위 둥글기 4. series 1 = tone 색, series 2 = production(범례는 머리 오른쪽)
function ChartColumn({
  data,
  xKey,
  series,
  tone = "default",
  title,
  className,
}: {
  data: Row[]
  xKey: string
  /** 계열 1~2개 */
  series: { key: string; label: string }[]
  tone?: ChartTone
  title?: React.ReactNode
  className?: string
}) {
  const colors = [chartTone[tone], "var(--chart-production)"]
  const config = Object.fromEntries(series.map((s, i) => [s.key, { label: s.label, color: colors[i] }])) satisfies ChartConfig
  const legend = series.length > 1 ? series.map((s, i) => ({ label: s.label, color: colors[i] })) : undefined
  return (
    <div data-slot="chart-column" className={cn("flex w-full flex-col gap-1", className)}>
      <MiniChartHeader title={title} legend={legend} />
      <ChartContainer config={config} className={cn("aspect-auto w-full", title || legend ? "h-19" : "h-24")}>
        <BarChart data={data} accessibilityLayer margin={{ top: 6, right: 0, bottom: 0, left: 0 }} barGap={2}>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <YAxis width={28} tickMargin={0} tickLine={false} axisLine={false} tick={axisTick} tickCount={4} />
          <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={4} height={18} tick={axisTick} />
          <ChartTooltip content={<ChartTooltipContent />} />
          {series.map((s) => (
            <Bar key={s.key} dataKey={s.key} fill={`var(--color-${s.key})`} radius={[4, 4, 0, 0]} barSize={8} />
          ))}
        </BarChart>
      </ChartContainer>
    </div>
  )
}

// ── ChartBrush · Figma ChartBrush (6028:260) ──
// 차트 아래 구간 선택 막대. 바탕 secondary(둥글기 4), 선택 구간 primary 30% + primary 테두리, 양쪽 손잡이 2×12.
// 구간을 끌어 옮기고, 손잡이를 끌어 넓히거나 줄인다. 키보드 ←→로 구간 이동.
function ChartBrush({
  count,
  value,
  onValueChange,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children" | "onChange"> & {
  /** 데이터 개수 */
  count: number
  /** [시작, 끝] 인덱스 (끝 포함) */
  value: [number, number]
  onValueChange: (value: [number, number]) => void
}) {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const drag = React.useRef<{ mode: "move" | "start" | "end"; x: number; from: [number, number] } | null>(null)
  const [start, end] = value
  const step = (dx: number) => {
    const w = trackRef.current?.clientWidth || 1
    return Math.round((dx / w) * count)
  }
  // 끌기 시작: 누른 곳(구간 · 왼쪽 손잡이 · 오른쪽 손잡이)은 data-brush 값으로 구분한다
  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-brush]")
    if (!target) return
    trackRef.current?.setPointerCapture(e.pointerId)
    drag.current = { mode: target.dataset.brush as "move" | "start" | "end", x: e.clientX, from: value }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d) return
    const n = step(e.clientX - d.x)
    const [s, t] = d.from
    if (d.mode === "move") {
      const shift = Math.max(-s, Math.min(count - 1 - t, n))
      onValueChange([s + shift, t + shift])
    } else if (d.mode === "start") onValueChange([Math.max(0, Math.min(t, s + n)), t])
    else onValueChange([s, Math.min(count - 1, Math.max(s, t + n))])
  }
  const onPointerUp = () => {
    drag.current = null
  }
  const onKeyDown = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowLeft" ? -1 : e.key === "ArrowRight" ? 1 : 0
    if (!dir) return
    e.preventDefault()
    if (start + dir < 0 || end + dir > count - 1) return
    onValueChange([start + dir, end + dir])
  }
  return (
    <div
      ref={trackRef}
      data-slot="chart-brush"
      role="slider"
      tabIndex={0}
      aria-label="표시 구간"
      aria-valuemin={0}
      aria-valuemax={count - 1}
      aria-valuenow={start}
      aria-valuetext={`${start + 1}~${end + 1}`}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className={cn(
        "relative h-5 w-full touch-none rounded-2xs bg-secondary outline-none select-none focus-visible:ring-3 focus-visible:ring-alpha-ring-50",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-y-0 left-(--brush-left) w-(--brush-width) cursor-grab border border-primary bg-alpha-primary-30 active:cursor-grabbing"
        style={{ "--brush-left": `${(start / count) * 100}%`, "--brush-width": `${((end - start + 1) / count) * 100}%` } as React.CSSProperties}
        data-brush="move"
      >
        <span aria-hidden data-brush="start" className="absolute top-1 -left-px h-3 w-0.5 cursor-ew-resize bg-primary" />
        <span aria-hidden data-brush="end" className="absolute top-1 -right-px h-3 w-0.5 cursor-ew-resize bg-primary" />
      </div>
    </div>
  )
}

// ── Trend · Figma Chart/Trend (6028:352) ──
// 대시보드 카드용 작은 추이(꺾은선) 차트(300폭). 계열 2개(선 1.5) + 범례(머리 오른쪽, 선 모양) + 아래 구간 선택(ChartBrush)
// tone=default(chart-1 · chart-3) · metric(production · quality)
function ChartTrend({
  data,
  xKey,
  series,
  tone = "default",
  title,
  showLegend = true,
  showBrush = true,
  defaultRange,
  className,
}: {
  data: Row[]
  xKey: string
  series: { key: string; label: string }[]
  tone?: "default" | "metric"
  title?: React.ReactNode
  showLegend?: boolean
  showBrush?: boolean
  /** 처음 보일 구간 [시작, 끝]. 없으면 전체 */
  defaultRange?: [number, number]
  className?: string
}) {
  const colors = tone === "metric" ? ["var(--chart-production)", "var(--chart-quality)"] : ["var(--chart-1)", "var(--chart-3)"]
  const config = Object.fromEntries(series.map((s, i) => [s.key, { label: s.label, color: colors[i] }])) satisfies ChartConfig
  const [range, setRange] = React.useState<[number, number]>(defaultRange ?? [0, Math.max(0, data.length - 1)])
  const shown = showBrush ? data.slice(range[0], range[1] + 1) : data
  return (
    <div data-slot="chart-trend" className={cn("flex w-full flex-col gap-1", className)}>
      <MiniChartHeader
        title={title}
        legend={showLegend ? series.map((s, i) => ({ label: s.label, color: colors[i] })) : undefined}
        marker="line"
      />
      <ChartContainer config={config} className="aspect-auto h-24 w-full">
        <LineChart data={shown} accessibilityLayer margin={{ top: 6, right: 0, bottom: 0, left: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <YAxis width={28} tickMargin={0} tickLine={false} axisLine={false} tick={axisTick} tickCount={4} />
          <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={4} height={18} tick={axisTick} />
          <ChartTooltip content={<ChartTooltipContent />} />
          {series.map((s) => (
            <Line key={s.key} dataKey={s.key} type="monotone" stroke={`var(--color-${s.key})`} strokeWidth={1.5} dot={false} />
          ))}
        </LineChart>
      </ChartContainer>
      {showBrush && <ChartBrush count={data.length} value={range} onValueChange={setRange} />}
    </div>
  )
}

// ── MultiLine · Figma Chart/MultiLine ──
// 대시보드 카드용 작은 여러 줄 꺾은선(300폭 · 높이 96). 계열 2~4개 = chart-1~4 차례, 선 1.5 · 점 없음.
// 범례 = 머리 오른쪽(선 모양). ChartTrend와 달리 구간 선택(ChartBrush)이 없다
const multiLineColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"]

function ChartMultiLine({
  data,
  xKey,
  series,
  title,
  showLegend = true,
  className,
}: {
  data: Row[]
  xKey: string
  /** 계열 2~4개 */
  series: { key: string; label: string }[]
  title?: React.ReactNode
  showLegend?: boolean
  className?: string
}) {
  const config = Object.fromEntries(series.map((s, i) => [s.key, { label: s.label, color: multiLineColors[i % multiLineColors.length] }])) satisfies ChartConfig
  const legend = showLegend ? series.map((s, i) => ({ label: s.label, color: multiLineColors[i % multiLineColors.length] })) : undefined
  return (
    <div data-slot="chart-multi-line" className={cn("flex w-full flex-col gap-1", className)}>
      <MiniChartHeader title={title} legend={legend} marker="line" />
      <ChartContainer config={config} className={cn("aspect-auto w-full", title || legend ? "h-19" : "h-24")}>
        <LineChart data={data} accessibilityLayer margin={{ top: 6, right: 0, bottom: 0, left: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <YAxis width={28} tickMargin={0} tickLine={false} axisLine={false} tick={axisTick} tickCount={4} />
          <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={4} height={18} tick={axisTick} />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          {series.map((s) => (
            <Line key={s.key} dataKey={s.key} type="monotone" stroke={`var(--color-${s.key})`} strokeWidth={1.5} dot={false} />
          ))}
        </LineChart>
      </ChartContainer>
    </div>
  )
}

// ── ColumnTarget · Figma Chart/ColumnTarget ──
// 대시보드 카드용 작은 막대 + 예측(목표) 표시선. 막대 = chart-1(폭 12 · 위 둥글기 4),
// 예측 = warning 가로선(두께 2, 막대보다 양옆 2씩 넓게 — ChartBarItem 목표선과 같은 색). 범례 = 머리 오른쪽(막대 = 네모, 예측 = 선)
function TargetTick({ x = 0, y = 0, width = 0, fill }: { x?: number; y?: number; width?: number; fill?: string }) {
  return <rect x={x - 2} y={y - 1} width={width + 4} height={2} rx={1} fill={fill} />
}

function ChartColumnTarget({
  data,
  xKey,
  valueKey,
  targetKey,
  valueLabel = "실시간",
  targetLabel = "예측",
  title,
  className,
}: {
  data: Row[]
  xKey: string
  valueKey: string
  targetKey: string
  valueLabel?: string
  targetLabel?: string
  title?: React.ReactNode
  className?: string
}) {
  const config = {
    [valueKey]: { label: valueLabel, color: "var(--chart-1)" },
    [targetKey]: { label: targetLabel, color: "var(--warning)" },
  } satisfies ChartConfig
  const legend = [
    { label: valueLabel, color: "var(--chart-1)", marker: "swatch" as const },
    { label: targetLabel, color: "var(--warning)", marker: "line" as const },
  ]
  return (
    <div data-slot="chart-column-target" className={cn("flex w-full flex-col gap-1", className)}>
      <MiniChartHeader title={title} legend={legend} />
      <ChartContainer config={config} className="aspect-auto h-19 w-full">
        <BarChart data={data} accessibilityLayer margin={{ top: 6, right: 0, bottom: 0, left: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <YAxis width={28} tickMargin={0} tickLine={false} axisLine={false} tick={axisTick} tickCount={4} />
          <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={4} height={18} tick={axisTick} />
          {/* 예측선을 막대와 같은 자리에 겹치려고 숨긴 두 번째 x축을 쓴다 */}
          <XAxis dataKey={xKey} xAxisId="target" hide />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey={valueKey} fill={`var(--color-${valueKey})`} radius={[4, 4, 0, 0]} barSize={12} />
          <Bar dataKey={targetKey} xAxisId="target" fill={`var(--color-${targetKey})`} barSize={12} shape={(p: unknown) => <TargetTick {...(p as React.ComponentProps<typeof TargetTick>)} />} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

// ── GroupedBar · Figma Chart/GroupedBar (6042:62) ──
// 칸 많은 2계열 묶음 막대 — 빌렛 위치별 실제값 + 예측값. 막대 5px · 사이 2 · 위 둥글기 2, x 글자 10px.
// 실제값 = 구간 색(zone: preheat 예열 · heating 가열 · soak 균열), 예측값 = production(AI 예측)
const zoneColor = {
  preheat: "var(--chart-zone-preheat)",
  heating: "var(--chart-zone-heating)",
  soak: "var(--chart-zone-soak)",
} as const

function ChartGroupedBar({
  data,
  xKey,
  actualKey,
  predictKey,
  zoneKey = "zone",
  actualLabel = "실제",
  predictLabel = "AI 예측",
  className,
}: {
  data: Row[]
  xKey: string
  actualKey: string
  predictKey: string
  /** 각 줄의 구간 이름(preheat·heating·soak)이 들어 있는 키 */
  zoneKey?: string
  actualLabel?: string
  predictLabel?: string
  className?: string
}) {
  const config = {
    [actualKey]: { label: actualLabel, color: "var(--chart-zone-heating)" },
    [predictKey]: { label: predictLabel, color: "var(--chart-production)" },
  } satisfies ChartConfig
  return (
    <ChartContainer config={config} className={cn("aspect-auto h-33 w-full", className)}>
      <BarChart data={data} accessibilityLayer margin={{ top: 6, right: 0, bottom: 0, left: 0 }} barGap={2} barCategoryGap={2}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <YAxis width={28} tickMargin={0} tickLine={false} axisLine={false} tick={axisTick} tickCount={5} />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={4} height={18} interval={0} tick={{ ...axisTick, fontSize: 10 }} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey={actualKey} radius={[2, 2, 0, 0]} maxBarSize={5}>
          {data.map((row, i) => (
            <Cell key={i} fill={zoneColor[row[zoneKey] as keyof typeof zoneColor] ?? zoneColor.heating} />
          ))}
        </Bar>
        <Bar dataKey={predictKey} fill={`var(--color-${predictKey})`} radius={[2, 2, 0, 0]} maxBarSize={5} />
      </BarChart>
    </ChartContainer>
  )
}

export { ChartLegendList, ChartRadial, ChartColumn, ChartColumnTarget, ChartBrush, ChartTrend, ChartMultiLine, ChartGroupedBar }
