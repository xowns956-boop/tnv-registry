"use client"

import * as React from "react"
import { ClipboardIcon, FactoryIcon, LayoutGridIcon, WrenchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DialogBodyInfo,
  DialogBodyLotInput,
  DialogBodyOptionButtons,
  DialogBodyOptionList,
  DialogBodyTable,
  DialogBodyTextarea,
} from "@/components/ui/dialog-body"
import { FormTable, FormTableField, FormTableRow } from "@/components/ui/form-table"
import { MenuTile } from "@/components/ui/menu-tile"
import { NumberStepper } from "@/components/ui/number-stepper"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SectionCards, StatCard } from "@/components/ui/stat-card"
import { Row, Section } from "./section"

// 미리보기 전용 더미 데이터
const tableRows = [
  { id: "1", lot: "L-240101", item: "초코 비스킷 120g", qty: "1,200", unit: "EA" },
  { id: "2", lot: "L-240102", item: "카스타드 6입", qty: "860", unit: "BOX" },
  { id: "3", lot: "L-240103", item: "빼빼로 오리지널", qty: "2,400", unit: "EA" },
  { id: "4", lot: "L-240104", item: "몽쉘 12입", qty: "540", unit: "BOX" },
]
const options = [
  { value: "1", label: "선택 항목 1" },
  { value: "2", label: "선택 항목 2" },
  { value: "3", label: "선택 항목 3" },
]

export function BatchAdded() {
  return (
    <>
      <Section id="added-button" title="Button · state=pressed" figma="- Buttons › Button (pressed 열)">
        <Row label="누르고 있는 동안 pressed 색">
          <Button>기본</Button>
          <Button variant="destructive">삭제</Button>
          <Button variant="outline">외곽선</Button>
          <Button variant="secondary">보조</Button>
          <Button variant="ghost">고스트</Button>
          <Button variant="link">링크</Button>
        </Row>
      </Section>

      <Section id="added-stat" title="StatCard · tone" figma="- Cards › StatCard (tone=emphasis)">
        <SectionCards>
          <StatCard tone="emphasis" label="오늘 생산량" value="10,350개" badge="+4.3%" trend="up" summary="어제 대비 증가" detail="목표 11,000개 중 94%" />
          <StatCard label="불량률" value="1.8%" badge="-20%" trend="down" summary="지난주 대비 감소" detail="최근 6개월 기준" />
        </SectionCards>
      </Section>

      <Section id="added-stepper" title="NumberStepper" figma="- Inputs › NumberInput / Stepper (4045:6163)">
        <Row>
          <NumberStepper defaultValue={0} min={0} aria-label="수량" />
          <NumberStepper defaultValue={5} disabled aria-label="수량(비활성)" />
        </Row>
      </Section>

      <Section id="added-menu-tile" title="MenuTile" figma="- Buttons › MenuTile (4045:6191)">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MenuTile icon={<LayoutGridIcon />}>메뉴명</MenuTile>
          <MenuTile icon={<FactoryIcon />}>생산 실적</MenuTile>
          <MenuTile icon={<WrenchIcon />}>설비 점검</MenuTile>
          <MenuTile icon={<ClipboardIcon />}>품질 검사</MenuTile>
        </div>
      </Section>

      <Section id="added-form-table" title="FormTable" figma="03_Patterns › FormTable (4046:181)">
        <FormTable className="max-w-[552px]">
          <FormTableRow>
            <FormTableField label="작업지시">WO-2410-0012</FormTableField>
            <FormTableField label="품목">초코 비스킷 120g</FormTableField>
          </FormTableRow>
          <FormTableRow>
            <FormTableField label="라인">2라인</FormTableField>
            <FormTableField label="작업자">김생산</FormTableField>
          </FormTableRow>
          <FormTableRow>
            <FormTableField label="교대" type="control">
              <Select defaultValue="day">
                <SelectTrigger className="w-full" aria-label="교대">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">주간</SelectItem>
                  <SelectItem value="night">야간</SelectItem>
                </SelectContent>
              </Select>
            </FormTableField>
            <FormTableField label="계획 수량">1,200 EA</FormTableField>
          </FormTableRow>
        </FormTable>
      </Section>

      <Section id="added-dialog-body" title="DialogBody (팝업 내용)" figma="- Dialogs › DialogBody (4047:18)">
        <div className="grid gap-6 lg:grid-cols-2">
          <Row label="DialogBodyTable">
            <DialogBodyTable
              rows={tableRows}
              getRowId={(r) => r.id}
              columns={[
                { key: "lot", header: "LOT" },
                { key: "item", header: "품목" },
                { key: "qty", header: "수량", className: "text-right" },
                { key: "unit", header: "단위" },
              ]}
            />
          </Row>
          <Row label="DialogBodyInfo">
            <DialogBodyInfo
              items={[
                { label: "작업지시", value: "WO-2410-0012" },
                { label: "품목", value: "초코 비스킷 120g" },
                { label: "라인", value: "2라인" },
              ]}
            />
          </Row>
          <Row label="DialogBodyLotInput">
            <DialogBodyLotInput />
          </Row>
          <Row label="DialogBodyTextarea">
            <DialogBodyTextarea aria-label="내용" />
          </Row>
          <Row label="DialogBodyOptionList">
            <DialogBodyOptionList options={options} defaultValue="1" aria-label="항목 선택" />
          </Row>
          <Row label="DialogBodyOptionButtons">
            <DialogBodyOptionButtons
              options={[
                { value: "a", label: "방식 1" },
                { value: "b", label: "방식 2" },
                { value: "c", label: "방식 3" },
              ]}
            />
          </Row>
        </div>
      </Section>
    </>
  )
}
