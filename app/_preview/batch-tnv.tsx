"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartColumn, ChartGroupedBar, ChartLegendList, ChartRadial, ChartTrend } from "@/components/ui/chart-dashboard"
import { ChartBarLabeled } from "@/components/ui/chart-presets"
import { MetricRow } from "@/components/ui/metric-row"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Row, Section } from "./section"

// 미리보기 전용 더미 데이터
const cols = ["1월", "2월", "3월", "4월", "5월", "6월"].map((m, i) => ({ m, ys: [150, 180, 170, 210, 140, 200][i], ts: [110, 130, 60, 120, 120, 100][i] }))
const trend = Array.from({ length: 24 }, (_, i) => ({ t: `${i + 1}`, real: 200 + Math.round(Math.sin(i / 2) * 20), fcst: 190 + Math.round(Math.cos(i / 3) * 15) }))
const billets = Array.from({ length: 68 }, (_, i) => ({
  pos: String(i + 1).padStart(2, "0"),
  actual: 110 + Math.round(i * 1.9),
  ai: 115 + Math.round(i * 1.85),
  zone: i < 10 ? "preheat" : i < 57 ? "heating" : "soak",
}))
const tones = ["default", "operation", "performance", "quality", "production", "electricity", "gas", "fuel"] as const

// 트윈뷰 대시보드용으로 TNV에서 더한 부품
export function BatchTnv() {
  return (
    <>
      <Section id="tnv-chart" title="대시보드 차트" figma="- Charts › Chart (6012:405 · 6026:446 · 6028:352 · 6042:62)">
        <Row label="Chart/Radial · tone=default·metric · rings=3·1">
          <ChartRadial values={[75, 90, 65]} caption="Total" valueText="63%" aria-label="종합 63%" />
          <ChartRadial values={[75, 90, 65]} tone="metric" caption="Total" valueText="63%" aria-label="종합 63%" />
          <ChartRadial values={[63]} valueText="63%" aria-label="달성률 63%" />
          <ChartRadial values={[63]} tone="metric" valueText="63%" aria-label="달성률 63%" />
          <ChartLegendList orientation="vertical" items={[{ label: "가동 : 76%", color: "var(--chart-operation)" }, { label: "성능 : 90%", color: "var(--chart-performance)" }, { label: "품질 : 65%", color: "var(--chart-quality)" }]} />
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
        <ChartGroupedBar data={billets} xKey="pos" actualKey="actual" predictKey="ai" />
      </Section>

      <Section id="tnv-tabs" title="Tabs · variant=solid" figma="- Tabs › TabsList (51:139) · TabsTrigger (24:15) variant=solid">
        <Tabs defaultValue="group">
          <TabsList variant="solid">
            <TabsTrigger value="group" className="w-40">공장 그룹</TabsTrigger>
            <TabsTrigger value="list" className="w-40">공장 목록</TabsTrigger>
            <TabsTrigger value="off" className="w-40" disabled>준비 중</TabsTrigger>
          </TabsList>
        </Tabs>
      </Section>

      <Section id="tnv-progress" title="Progress · size · tone" figma="- Progress › Progress (48:41)">
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

      <Section id="tnv-metric" title="MetricRow" figma="- Progress › MetricRow (6003:7046)">
        <Row label="size=sm">
          <MetricRow className="w-80" label="가동률" value="82%" percent={82} tone="operation" />
          <MetricRow className="w-80" label="생산량" value="64%" percent={64} tone="production" />
        </Row>
        <Row label="size=md">
          <MetricRow className="w-80" size="md" label="월별 생산량" value="312,400" target="450,000" percent={69} tone="production" />
          <MetricRow className="w-80" size="md" label="가동률" value="82%" target="목표 90%" percent={82} tone="operation" />
        </Row>
      </Section>

      <Section id="tnv-panel" title="Card · variant=panel" figma="- Cards › Card (6003:7020) variant=panel">
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
