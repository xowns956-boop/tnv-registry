"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricRow } from "@/components/ui/metric-row"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Row, Section } from "./section"

// 트윈뷰 대시보드용으로 TNV에서 더한 부품
export function BatchTnv() {
  return (
    <>
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
