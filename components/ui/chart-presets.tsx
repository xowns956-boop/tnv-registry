"use client"

import * as React from "react"
import { cn } from "cn"
import { Bar, BarChart, CartesianGrid, Cell, ComposedChart, LabelList, Line, LineChart, Pie, PieChart, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

// TNV v0.1 · Figma "- Charts" 예시 차트 (35:27 Bar · 35:68 Line · 43:1319 Pie · 43:1334 BarGradient
// · 2031:30 BarItem · 2031:35 BarLabeled · 2031:56 Combo)
// 색은 config의 color에 var(--chart-1) 같은 토큰을 넣는다. 눈금 글자는 text-xs muted-foreground, 격자선은 border.

type Row = Record<string, string | number>

const axisTick = { fontSize: 12, fill: "var(--muted-foreground)" }

function ChartBar({ data, config, xKey, className }: { data: Row[]; config: ChartConfig; xKey: string; className?: string }) {
  return (
    <ChartContainer config={config} className={cn("aspect-auto h-63 w-full", className)}>
      <BarChart data={data} accessibilityLayer>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} tick={axisTick} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {Object.keys(config).map((k) => (
          <Bar key={k} dataKey={k} fill={`var(--color-${k})`} radius={[4, 4, 0, 0]} />
        ))}
      </BarChart>
    </ChartContainer>
  )
}

function ChartLine({ data, config, xKey, className }: { data: Row[]; config: ChartConfig; xKey: string; className?: string }) {
  return (
    <ChartContainer config={config} className={cn("aspect-auto h-63 w-full", className)}>
      <LineChart data={data} accessibilityLayer margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} tick={axisTick} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {Object.keys(config).map((k) => (
          <Line key={k} dataKey={k} type="monotone" stroke={`var(--color-${k})`} strokeWidth={2} dot={false} />
        ))}
      </LineChart>
    </ChartContainer>
  )
}

function ChartPie({
  data,
  config,
  nameKey = "name",
  valueKey = "value",
  className,
}: {
  data: Row[]
  config: ChartConfig
  nameKey?: string
  valueKey?: string
  className?: string
}) {
  return (
    <ChartContainer config={config} className={cn("aspect-auto h-47 w-42", className)}>
      <PieChart accessibilityLayer>
        <ChartTooltip content={<ChartTooltipContent hideLabel nameKey={nameKey} />} />
        <Pie data={data} dataKey={valueKey} nameKey={nameKey} outerRadius={80} stroke="var(--card)" strokeWidth={2}>
          {data.map((d) => (
            <Cell key={String(d[nameKey])} fill={`var(--color-${d[nameKey]})`} />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent nameKey={nameKey} />} />
      </PieChart>
    </ChartContainer>
  )
}

// Figma paint style "chart/bar-gradient": 위 chart-1-bold → 아래 chart-1-subtler
function ChartBarGradient({
  data,
  xKey,
  yKey,
  label = yKey,
  className,
}: {
  data: Row[]
  xKey: string
  yKey: string
  label?: string
  className?: string
}) {
  const id = React.useId().replace(/:/g, "")
  const config = { [yKey]: { label, color: "var(--chart-1-bold)" } } satisfies ChartConfig
  return (
    <ChartContainer config={config} className={cn("aspect-auto h-48 w-full", className)}>
      <BarChart data={data} accessibilityLayer>
        <defs>
          <linearGradient id={`bar-gradient-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1-bold)" />
            <stop offset="100%" stopColor="var(--chart-1-subtler)" />
          </linearGradient>
        </defs>
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} tick={axisTick} />
        <YAxis tickLine={false} axisLine={false} width={36} tick={axisTick} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey={yKey} fill={`url(#bar-gradient-${id})`} radius={[4, 4, 0, 0]} maxBarSize={38} />
      </BarChart>
    </ChartContainer>
  )
}

// 막대 하나: 위 값(primary-text) · 막대(chart-1, 72px 폭, 위 둥글기 md) · 아래 이름
function ChartBarItem({
  label,
  valueText,
  ratio,
  className,
}: {
  label: React.ReactNode
  valueText: React.ReactNode
  /** 0~1, 가장 큰 값 대비 높이 */
  ratio: number
  className?: string
}) {
  return (
    <div data-slot="chart-bar-item" className={cn("flex w-24 flex-col items-center gap-2", className)}>
      <span className="text-sm font-semibold text-primary-text tabular-nums">{valueText}</span>
      <div className="flex h-30 w-18 items-end">
        <div
          className="h-(--bar-h) w-full rounded-t-md bg-chart-1"
          style={{ "--bar-h": `${Math.max(0, Math.min(1, ratio)) * 100}%` } as React.CSSProperties}
        />
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  )
}

function ChartBarLabeled({
  items,
  formatValue = (v) => v.toLocaleString("ko-KR"),
  className,
}: {
  items: { label: string; value: number; valueText?: React.ReactNode }[]
  formatValue?: (v: number) => React.ReactNode
  className?: string
}) {
  const max = Math.max(1, ...items.map((i) => i.value))
  return (
    <div data-slot="chart-bar-labeled" role="img" aria-label={items.map((i) => `${i.label} ${i.value}`).join(", ")} className={cn("flex items-end gap-4", className)}>
      {items.map((i) => (
        <ChartBarItem key={i.label} label={i.label} valueText={i.valueText ?? formatValue(i.value)} ratio={i.value / max} />
      ))}
    </div>
  )
}

// 막대(chart-1, 48px, 위 둥글기 10) + 점선(chart-3, 흰 속 점 12px, 값 라벨 chart-3-bolder)
function ChartCombo({
  data,
  xKey,
  barKey,
  lineKey,
  barLabel = barKey,
  lineLabel = lineKey,
  formatLine = (v: number) => `${v}%`,
  className,
}: {
  data: Row[]
  xKey: string
  barKey: string
  lineKey: string
  barLabel?: string
  lineLabel?: string
  formatLine?: (v: number) => string
  className?: string
}) {
  const config = {
    [barKey]: { label: barLabel, color: "var(--chart-1)" },
    [lineKey]: { label: lineLabel, color: "var(--chart-3)" },
  } satisfies ChartConfig
  return (
    <ChartContainer config={config} className={cn("aspect-auto h-57 w-full", className)}>
      <ComposedChart data={data} accessibilityLayer margin={{ top: 24 }}>
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 14, fontWeight: 500, fill: "var(--foreground)" }} />
        <YAxis yAxisId="bar" hide />
        <YAxis yAxisId="line" orientation="right" hide />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar yAxisId="bar" dataKey={barKey} fill={`var(--color-${barKey})`} radius={[10, 10, 0, 0]} maxBarSize={48} />
        <Line
          yAxisId="line"
          dataKey={lineKey}
          stroke={`var(--color-${lineKey})`}
          strokeWidth={2}
          dot={{ r: 5, fill: "var(--card)", stroke: `var(--color-${lineKey})`, strokeWidth: 2 }}
        >
          <LabelList dataKey={lineKey} position="top" offset={10} formatter={(v) => formatLine(Number(v))} className="fill-chart-3-bolder text-xs font-semibold" />
        </Line>
      </ComposedChart>
    </ChartContainer>
  )
}

export { ChartBar, ChartLine, ChartPie, ChartBarGradient, ChartBarItem, ChartBarLabeled, ChartCombo }
