"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartColumn, ChartColumnTarget, ChartGroupedBar, ChartLegendList, ChartMultiLine, ChartRadar, ChartRadial, ChartTrend } from "@/components/ui/chart-dashboard"
import { ChartBarLabeled } from "@/components/ui/chart-presets"
import { DataRow } from "@/components/ui/data-row"
import { Logo } from "@/components/ui/logo"
import { MetricRow } from "@/components/ui/metric-row"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Row, Section } from "./section"

// 미리보기 전용 더미 데이터
const radar = [
  { axis: "속도", now: 80, prev: 70 },
  { axis: "명확성", now: 70, prev: 75 },
  { axis: "일관성", now: 85, prev: 70 },
  { axis: "접근성", now: 65, prev: 85 },
  { axis: "편안함", now: 75, prev: 65 },
  { axis: "신뢰", now: 90, prev: 80 },
]
const cols = ["1월", "2월", "3월", "4월", "5월", "6월"].map((m, i) => ({ m, ys: [150, 180, 170, 210, 140, 200][i], ts: [110, 130, 60, 120, 120, 100][i] }))
const trend = Array.from({ length: 24 }, (_, i) => ({ t: `${i + 1}`, real: 200 + Math.round(Math.sin(i / 2) * 20), fcst: 190 + Math.round(Math.cos(i / 3) * 15) }))
const billets = Array.from({ length: 68 }, (_, i) => ({
  pos: String(i + 1).padStart(2, "0"),
  actual: 110 + Math.round(i * 1.9),
  ai: 115 + Math.round(i * 1.85),
  zone: i < 10 ? "preheat" : i < 57 ? "heating" : "soak",
}))
const lines4 = Array.from({ length: 24 }, (_, i) => ({ t: `${i + 1}`, a: 60 + Math.round(Math.sin(i / 2) * 10), b: 48 + Math.round(Math.cos(i / 3) * 8), c: 36 + Math.round(Math.sin(i / 4) * 9), d: 22 + Math.round(Math.cos(i / 2) * 6) }))
const bigTrend = Array.from({ length: 24 }, (_, i) => ({ t: `${i + 1}`, real: 3000 + Math.round(Math.sin(i / 2) * 1500), fcst: 2900 + Math.round(Math.cos(i / 3) * 1200) }))
const narrow = Array.from({ length: 24 }, (_, i) => ({ t: `${i + 1}`, a: 553 + Math.round(Math.sin(i / 2) * 7), b: 550 + Math.round(Math.cos(i / 3) * 4) }))
const loads = ["1", "2", "3", "4", "5", "6"].map((s, i) => ({ s: `#${s}`, now: [62, 78, 74, 91, 55, 88][i], ai: [65, 80, 72, 94, 60, 86][i] }))
const tones = ["default", "operation", "performance", "quality", "production", "electricity", "gas", "fuel"] as const

// 트윈뷰 대시보드용으로 TNV에서 더한 부품
export function BatchTnv() {
  return (
    <>
      <Section id="tnv-logo" title="Logo">
        <Row label="Logo · 기본 높이 48 (h-12)">
          <Logo />
        </Row>
        <Row label="높이 조절 · h-8 · h-6">
          <Logo className="h-8" />
          <Logo className="h-6" />
        </Row>
      </Section>
      <Section id="tnv-chart" title="대시보드 차트">
        <Row label="Chart/Radial · tone=default·metric · rings=3·1">
          <ChartRadial values={[75, 90, 65]} caption="Total" valueText="63%" aria-label="종합 63%" />
          <ChartRadial values={[75, 90, 65]} tone="metric" caption="Total" valueText="63%" aria-label="종합 63%" />
          <ChartRadial values={[63]} valueText="63%" aria-label="달성률 63%" />
          <ChartRadial values={[63]} tone="metric" valueText="63%" aria-label="달성률 63%" />
          <ChartLegendList orientation="vertical" items={[{ label: "가동 : 76%", color: "var(--chart-operation)" }, { label: "성능 : 90%", color: "var(--chart-performance)" }, { label: "품질 : 65%", color: "var(--chart-quality)" }]} />
        </Row>
        <Row label="Chart/Radar · series=1·2 × tone=default·metric">
          <div className="grid w-full max-w-180 grid-cols-2 gap-6">
            <ChartRadar data={radar} axisKey="axis" series={[{ key: "now", label: "현재" }]} />
            <ChartRadar data={radar} axisKey="axis" tone="metric" series={[{ key: "now", label: "현재" }]} />
            <ChartRadar data={radar} axisKey="axis" series={[{ key: "now", label: "현재" }, { key: "prev", label: "이전" }]} />
            <ChartRadar data={radar} axisKey="axis" tone="metric" series={[{ key: "now", label: "현재" }, { key: "prev", label: "이전" }]} />
          </div>
        </Row>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {tones.map((t) => (
            <ChartColumn key={t} data={cols} xKey="m" tone={t} series={[{ key: "ys", label: "생산량" }]} />
          ))}
          <ChartColumn data={cols} xKey="m" series={[{ key: "ys", label: "YS" }, { key: "ts", label: "TS" }]} />
        </div>
        <ChartBarLabeled
          items={tones.map((t) => ({ label: t, value: 250, valueText: "250 (2.4%)", tone: t, target: t === "operation" ? 280 : undefined }))}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <ChartTrend data={trend} xKey="t" series={[{ key: "real", label: "Real" }, { key: "fcst", label: "Fcst" }]} defaultRange={[8, 15]} />
          <ChartTrend data={trend} xKey="t" tone="metric" series={[{ key: "real", label: "Real" }, { key: "fcst", label: "Fcst" }]} defaultRange={[8, 15]} />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <ChartMultiLine title="Chart/MultiLine · 계열 4" data={lines4} xKey="t" series={[{ key: "a", label: "조열" }, { key: "b", label: "중간열" }, { key: "c", label: "사상열" }, { key: "d", label: "BGV" }]} />
          <ChartTrend title="네 자리 값 (세로축 폭 자동 · 쉼표)" data={bigTrend} xKey="t" series={[{ key: "real", label: "Real" }, { key: "fcst", label: "Fcst" }]} />
          <ChartMultiLine title="좁은 범위 546~561 (값 범위에 맞춘 눈금)" data={narrow} xKey="t" series={[{ key: "a", label: "복열 1" }, { key: "b", label: "복열 2" }]} />
          <ChartColumnTarget title="Chart/ColumnTarget" data={loads} xKey="s" valueKey="now" targetKey="ai" valueLabel="실시간 부하" targetLabel="AI 예측 부하" />
        </div>
        <ChartGroupedBar data={billets} xKey="pos" actualKey="actual" predictKey="ai" />
      </Section>

      <Section id="tnv-tabs" title="Tabs · variant=solid">
        <Tabs defaultValue="group">
          <TabsList variant="solid">
            <TabsTrigger value="group" className="w-40">공장 그룹</TabsTrigger>
            <TabsTrigger value="list" className="w-40">공장 목록</TabsTrigger>
            <TabsTrigger value="off" className="w-40" disabled>준비 중</TabsTrigger>
          </TabsList>
        </Tabs>
        <Row label="fill (480 칸)">
          <Tabs defaultValue="group" className="w-[480px]">
            <TabsList variant="solid" fill>
              <TabsTrigger value="group">공장 그룹</TabsTrigger>
              <TabsTrigger value="list">공장 목록</TabsTrigger>
              <TabsTrigger value="off" disabled>준비 중</TabsTrigger>
            </TabsList>
          </Tabs>
        </Row>
      </Section>

      <Section id="tnv-progress" title="Progress · size · tone">
        <Row label="size=sm">
          <Progress value={60} className="max-w-80" aria-label="진행률" />
          <Progress value={75} tone="operation" className="max-w-80" aria-label="가동률" />
          <Progress value={45} tone="production" className="max-w-80" aria-label="생산량" />
        </Row>
        <Row label="size=md · showLabel">
          <Progress size="md" value={60} showLabel className="max-w-80" aria-label="진행률" />
          <Progress size="md" value={75} tone="operation" showLabel className="max-w-80" aria-label="가동률" />
          <Progress size="md" value={45} tone="production" showLabel className="max-w-80" aria-label="생산량" />
        </Row>
      </Section>

      <Section id="tnv-metric" title="MetricRow · DataRow">
        <Row label="size=sm">
          <MetricRow className="w-80" label="가동률" value="82%" percent={82} tone="operation" />
          <MetricRow className="w-80" label="생산량" value="64%" percent={64} tone="production" />
        </Row>
        <Row label="size=md">
          <MetricRow className="w-80" size="md" label="월별 생산량" value="312,400" target="450,000" percent={69} tone="production" />
          <MetricRow className="w-80" size="md" label="가동률" value="82%" target="목표 90%" percent={82} tone="operation" />
        </Row>
        <Row label="DataRow · variant=plain · tone">
          <div className="flex w-80 flex-col">
            {(["default", "operation", "performance", "quality", "production", "electricity", "gas"] as const).map((t) => (
              <DataRow key={t} label={`전력 사용량 (${t})`} value="138,140kWh" tone={t} />
            ))}
          </div>
        </Row>
        <Row label="DataRow · variant=boxed (이동평균·실시간 같은 2열 요약 칸)">
          <div className="grid w-80 grid-cols-2 gap-1">
            <DataRow variant="boxed" label="이동평균" value="553℃" />
            <DataRow variant="boxed" label="실시간" value="556℃" tone="operation" />
            <DataRow variant="boxed" label="냉각수압" value="4.2bar" tone="performance" />
            <DataRow variant="boxed" label="냉각수량" value="1,240㎥/h" tone="quality" />
          </div>
        </Row>
      </Section>

      <Section id="tnv-panel" title="Card · variant=panel">
        <div className="rounded-xl bg-page-background p-6">
          <Card variant="panel" className="w-96">
            <CardHeader>
              <CardTitle>공장 현황</CardTitle>
              <CardDescription>대시보드 좌우 패널</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Card size="sm">
                <CardHeader>
                  <CardTitle>1공장 가열로</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <MetricRow label="가동률" value="82%" percent={82} tone="operation" />
                  <MetricRow label="생산량" value="64%" percent={64} tone="production" />
                </CardContent>
              </Card>
              <Button variant="outline">전체 보기</Button>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  )
}
