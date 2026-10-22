"use client"

import * as React from "react"
import { toast } from "sonner"
import { BoldIcon, FactoryIcon, FolderIcon, ItalicIcon, LayoutDashboardIcon, SettingsIcon, UnderlineIcon, BellIcon, InfoIcon } from "lucide-react"

import { FilterBar, FilterBarReset } from "@/components/blocks/filter-bar"
import { FormActionBar } from "@/components/blocks/form-action-bar"
import { PageHeading } from "@/components/blocks/page-heading"
import { SiteHeader } from "@/components/blocks/site-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ChartBar, ChartBarGradient, ChartBarLabeled, ChartCombo, ChartLine, ChartPie } from "@/components/ui/chart-presets"
import { Checkbox } from "@/components/ui/checkbox"
import { Combobox } from "@/components/ui/combobox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command"
import { DataTable } from "@/components/ui/data-table"
import { DatePicker } from "@/components/ui/date-picker"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { NavUser } from "@/components/ui/nav-user"
import { PageTab, PageTabBar } from "@/components/ui/page-tabs"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { SidebarBrand } from "@/components/ui/sidebar-brand"
import { Spinner } from "@/components/ui/spinner"
import { Stepper, StepperItem, StepperSeparator } from "@/components/ui/stepper"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Toolbar, ToolbarSeparator } from "@/components/ui/toolbar"
import { Tree } from "@/components/ui/tree"

import { Row, Section } from "./section"

const lines = [
  { value: "l1", label: "1라인" },
  { value: "l2", label: "2라인" },
  { value: "l3", label: "3라인" },
]

type Equip = { id: string; name: string; line: string; rate: number }
const equips: Equip[] = Array.from({ length: 12 }, (_, i) => ({
  id: `EQ-${String(i + 1).padStart(3, "0")}`,
  name: `설비 ${i + 1}`,
  line: `${(i % 3) + 1}라인`,
  rate: 70 + ((i * 7) % 30),
}))

const months = ["1월", "2월", "3월", "4월", "5월", "6월"].map((m, i) => ({ month: m, a: 120 + i * 20, b: 80 + ((i * 37) % 60), c: 60 + ((i * 53) % 90), rate: 10 + i * 2 }))
const seriesConfig = {
  a: { label: "1라인", color: "var(--chart-1)" },
  b: { label: "2라인", color: "var(--chart-2)" },
  c: { label: "3라인", color: "var(--chart-3)" },
}

export function BatchRest() {
  const [date, setDate] = React.useState<Date>()
  const [range, setRange] = React.useState<{ from?: Date; to?: Date }>()
  const [combo, setCombo] = React.useState<string>()
  const [treeSel, setTreeSel] = React.useState("a1")

  return (
    <>
      <Section id="breadcrumb" title="Breadcrumb · Pagination · Stepper" figma="- Breadcrumbs · Pagination · Steppers">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="#">상위 메뉴</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>현재 화면</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Pagination className="justify-start">
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
        <Row label="Stepper orientation=vertical">
          <Stepper aria-label="등록 단계">
            <StepperItem state="done" index={1} label="단계 이름" />
            <StepperSeparator state="done" />
            <StepperItem state="current" index={2} label="단계 이름" />
            <StepperSeparator />
            <StepperItem state="upcoming" index={3} label="단계 이름" />
            <StepperSeparator />
            <StepperItem state="invalid" index={4} label="단계 이름" />
            <StepperSeparator />
            <StepperItem state="disabled" index={5} label="단계 이름" />
          </Stepper>
        </Row>
        <Row label="Stepper orientation=horizontal">
          <Stepper orientation="horizontal" aria-label="등록 단계">
            <StepperItem state="done" index={1} label="단계 이름" />
            <StepperSeparator state="done" />
            <StepperItem state="current" index={2} label="단계 이름" optional="선택" />
            <StepperSeparator />
            <StepperItem state="upcoming" index={3} label="단계 이름" />
          </Stepper>
        </Row>
      </Section>

      <Section id="alert" title="Alert · Sonner" figma="- Alerts · Toasts">
        <Alert className="max-w-md"><InfoIcon /><AlertTitle>알림</AlertTitle><AlertDescription>확인이 필요한 내용이 있습니다.</AlertDescription></Alert>
        <Alert variant="destructive" className="max-w-md"><InfoIcon /><AlertTitle>알림</AlertTitle><AlertDescription>확인이 필요한 내용이 있습니다.</AlertDescription></Alert>
        <Row label="Sonner (누르면 토스트)">
          <Button variant="outline" onClick={() => toast("저장되었습니다", { description: "2026-09-23 14:00" })}>default</Button>
          <Button variant="outline" onClick={() => toast.success("저장되었습니다", { description: "2026-09-23 14:00" })}>success</Button>
          <Button variant="outline" onClick={() => toast.info("저장되었습니다", { description: "2026-09-23 14:00" })}>info</Button>
          <Button variant="outline" onClick={() => toast.warning("저장되었습니다", { description: "2026-09-23 14:00" })}>warning</Button>
          <Button variant="outline" onClick={() => toast.error("저장되었습니다", { description: "2026-09-23 14:00" })}>error</Button>
        </Row>
      </Section>

      <Section id="date" title="Calendar · DatePicker · Command · Combobox" figma="- Date Pickers · Command">
        <Row>
          <Calendar mode="range" selected={range as never} onSelect={setRange as never} className="rounded-md border border-border" />
          <div className="flex flex-col gap-3">
            <DatePicker value={date} onValueChange={setDate} />
            <Combobox options={lines} value={combo} onValueChange={setCombo} aria-label="라인" />
          </div>
          <Command className="w-80 rounded-md border border-border shadow-md">
            <CommandInput placeholder="메뉴나 기능을 검색하세요" />
            <CommandList>
              <CommandEmpty>결과가 없어요</CommandEmpty>
              <CommandGroup heading="추천">
                <CommandItem><LayoutDashboardIcon />대시보드<CommandShortcut>⌘D</CommandShortcut></CommandItem>
                <CommandItem><SettingsIcon />설정</CommandItem>
                <CommandItem disabled><BellIcon />알림</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </Row>
      </Section>

      <Section id="sidebar" title="Sidebar · SidebarBrand · NavUser" figma="- Sidebar">
        <div className="h-96 overflow-hidden rounded-md border border-border">
          <SidebarProvider className="min-h-0 h-full">
            <Sidebar collapsible="none" className="h-full border-r border-sidebar-border">
              <SidebarHeader><SidebarBrand name="서비스 이름" subtitle="부제" badge="v0.1" /></SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>메뉴 그룹</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem><SidebarMenuButton isActive tooltip="대시보드"><LayoutDashboardIcon />대시보드</SidebarMenuButton></SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="설비"><FactoryIcon />설비</SidebarMenuButton>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem><SidebarMenuSubButton href="#" isActive>설비 목록</SidebarMenuSubButton></SidebarMenuSubItem>
                        <SidebarMenuSubItem><SidebarMenuSubButton href="#">점검 이력</SidebarMenuSubButton></SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                    <SidebarMenuItem><SidebarMenuButton tooltip="설정"><SettingsIcon />설정</SidebarMenuButton></SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <SidebarInset className="min-h-0">
              <SiteHeader crumbs={[{ label: "설비", href: "#" }, { label: "설비 목록" }]} searchPlaceholder="메뉴 · 화면 검색" user={{ name: "관리자", email: "admin@tnv.co" }} />
              <div className="p-4"><NavUser name="사용자 이름" email="user@example.com" /></div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </Section>

      <Section id="table" title="DataTable · Table" figma="- Tables (2099:7867)">
        <DataTable
          data={equips}
          getRowId={(r) => r.id}
          selectable
          pageSize={5}
          searchText={(r) => `${r.id} ${r.name} ${r.line}`}
          searchPlaceholder="설비 검색"
          actions={<Button variant="outline">엑셀 받기</Button>}
          columns={[
            { key: "id", header: "설비 코드", muted: true },
            { key: "name", header: "설비명", sortValue: (r) => r.name },
            { key: "line", header: "라인" },
            { key: "rate", header: "가동률", sortValue: (r) => r.rate, cell: (r) => `${r.rate}%` },
          ]}
        />
        <DataTable data={[] as Equip[]} getRowId={(r) => r.id} columns={[{ key: "name", header: "설비명" }, { key: "line", header: "라인" }]} />
      </Section>

      <Section id="form" title="Form (Field)" figma="- Forms (34:92)">
        <Row>
          <Field className="w-80">
            <FieldLabel htmlFor="f1">라벨</FieldLabel>
            <Input id="f1" placeholder="내용을 입력하세요" />
            <FieldDescription>도움말을 입력합니다.</FieldDescription>
          </Field>
          <Field className="w-80" data-invalid>
            <FieldLabel htmlFor="f2">라벨</FieldLabel>
            <Input id="f2" placeholder="내용을 입력하세요" aria-invalid />
            <FieldDescription>도움말을 입력합니다.</FieldDescription>
            <FieldError>입력값을 확인하세요.</FieldError>
          </Field>
          <Field className="w-80" data-invalid>
            <FieldLabel>라벨</FieldLabel>
            <Select><SelectTrigger aria-invalid className="w-full"><SelectValue placeholder="선택하세요" /></SelectTrigger><SelectContent><SelectItem value="a">a</SelectItem></SelectContent></Select>
            <FieldError>입력값을 확인하세요.</FieldError>
          </Field>
          <Field orientation="horizontal" className="w-80" data-invalid>
            <Checkbox id="f4" aria-invalid />
            <FieldLabel htmlFor="f4">라벨</FieldLabel>
          </Field>
        </Row>
      </Section>

      <Section id="chart" title="Charts" figma="- Charts">
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartBar data={months} config={seriesConfig} xKey="month" />
          <ChartLine data={months} config={seriesConfig} xKey="month" />
          <ChartPie data={[{ name: "a", value: 40 }, { name: "b", value: 30 }, { name: "c", value: 30 }]} config={seriesConfig} />
          <ChartBarGradient data={["월", "화", "수", "목", "금"].map((d, i) => ({ day: d, v: 1500 + i * 300 }))} xKey="day" yKey="v" label="생산량" />
        </div>
        <ChartBarLabeled items={[{ label: "항목 1", value: 120 }, { label: "항목 2", value: 250, valueText: "250 (2.4%)" }, { label: "항목 3", value: 140 }, { label: "항목 4", value: 125 }]} />
        <ChartCombo data={months} xKey="month" barKey="a" lineKey="rate" barLabel="생산량" lineLabel="불량률" />
      </Section>

      <Section id="toggle" title="Progress · Toggle · Spinner · Kbd" figma="- Progress · Toggles · Spinners · Kbd">
        <Progress value={50} className="max-w-80" aria-label="진행률" />
        {(["default", "outline", "solid", "pill"] as const).map((v) => (
          <Row key={v} label={`Toggle variant=${v}`}>
            <Toggle variant={v} aria-label="굵게"><BoldIcon /></Toggle>
            <Toggle variant={v} defaultPressed>토글</Toggle>
            <Toggle variant={v} size="sm">토글</Toggle>
            <Toggle variant={v} disabled>토글</Toggle>
          </Row>
        ))}
        <Row label="ToggleGroup default · outline">
          <ToggleGroup type="multiple" aria-label="글자 모양">
            <ToggleGroupItem value="b" aria-label="굵게"><BoldIcon /></ToggleGroupItem>
            <ToggleGroupItem value="i" aria-label="기울임"><ItalicIcon /></ToggleGroupItem>
            <ToggleGroupItem value="u" aria-label="밑줄"><UnderlineIcon /></ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" variant="outline" defaultValue="d" aria-label="기간">
            <ToggleGroupItem value="d">일</ToggleGroupItem>
            <ToggleGroupItem value="w">주</ToggleGroupItem>
            <ToggleGroupItem value="m">월</ToggleGroupItem>
          </ToggleGroup>
        </Row>
        <Row label="Spinner · Kbd">
          <Spinner />
          <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
        </Row>
      </Section>

      <Section id="tree" title="Tree · FilterChip · PageTabs · Toolbar · Accordion" figma="- Tree · Chips · Page Tabs · Layout">
        <Row>
          <Tree
            aria-label="설비 분류"
            selectedId={treeSel}
            onSelect={setTreeSel}
            defaultExpanded={["a", "a1"]}
            nodes={[
              { id: "a", label: "1공장", icon: <FolderIcon />, count: 12, children: [
                { id: "a1", label: "1라인", icon: <FolderIcon />, count: 5, children: [{ id: "a1x", label: "설비 1", icon: <FactoryIcon /> }] },
                { id: "a2", label: "2라인", icon: <FolderIcon />, count: 7, children: [{ id: "a2x", label: "설비 2", icon: <FactoryIcon /> }] },
              ] },
              { id: "b", label: "2공장", icon: <FolderIcon />, count: 0 },
            ]}
          />
        </Row>
        <PageTabBar>
          <PageTab icon={<LayoutDashboardIcon />} active onClose={() => {}}>대시보드</PageTab>
          <PageTab icon={<FactoryIcon />} onClose={() => {}}>설비 목록</PageTab>
          <PageTab icon={<SettingsIcon />}>설정</PageTab>
        </PageTabBar>
        <Toolbar aria-label="목록 도구">
          <Button size="sm">조회</Button>
          <Button size="sm" variant="outline">초기화</Button>
          <ToolbarSeparator />
          <Button size="sm" variant="ghost">엑셀</Button>
          <Button size="sm" variant="ghost">설정</Button>
        </Toolbar>
        <Accordion type="single" collapsible defaultValue="q" className="max-w-120">
          <AccordionItem value="q">
            <AccordionTrigger>조회 조건</AccordionTrigger>
            <AccordionContent><div className="flex h-20 items-center justify-center rounded-md border border-border bg-alpha-muted-50 text-xs text-muted-foreground">내용 자리</div></AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section id="patterns" title="Patterns" figma="03_Patterns (37:74 · 38:34 · 80:153)">
        <PageHeading title="페이지 제목" description="페이지 설명을 입력합니다." actions={<><Button variant="outline">보조 버튼</Button><Button>주요 버튼</Button></>} />
        <FilterBar>
          <Input className="w-62" placeholder="검색" aria-label="검색" />
          <Select><SelectTrigger aria-label="라인"><SelectValue placeholder="전체" /></SelectTrigger><SelectContent>{lines.map((l) => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}</SelectContent></Select>
          <Select><SelectTrigger aria-label="상태"><SelectValue placeholder="전체" /></SelectTrigger><SelectContent><SelectItem value="on">가동</SelectItem><SelectItem value="off">정지</SelectItem></SelectContent></Select>
          <DatePicker aria-label="날짜" />
          <FilterBarReset />
        </FilterBar>
        <FormActionBar className="static rounded-md border">
          <Button variant="outline">취소</Button>
          <Button>저장</Button>
        </FormActionBar>
      </Section>
    </>
  )
}
