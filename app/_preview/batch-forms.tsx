"use client"

import * as React from "react"
import { PlusIcon, SearchIcon, ArrowRightIcon, Trash2Icon, CopyIcon } from "lucide-react"

import { Autocomplete } from "@/components/ui/autocomplete"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FilterChip } from "@/components/ui/filter-chip"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"
import { NumberInput } from "@/components/ui/number-input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

import { Row, Section } from "./section"

const lines = [
  { value: "l1", label: "1라인" },
  { value: "l2", label: "2라인" },
  { value: "l3", label: "3라인" },
  { value: "l4", label: "4라인" },
]

export function BatchForms() {
  const [ac, setAc] = React.useState<string>()
  const [ms, setMs] = React.useState<string[]>(["l1", "l2"])
  const [checked, setChecked] = React.useState(true)

  return (
    <>
      <Section id="button" title="Button · ButtonGroup" figma="- Buttons (9:458 · 51:92)">
        {(["default", "destructive", "outline", "secondary", "ghost", "link"] as const).map((v) => (
          <Row key={v} label={`variant=${v}`}>
            <Button variant={v}>버튼</Button>
            <Button variant={v} size="sm">버튼</Button>
            <Button variant={v} size="lg">버튼</Button>
            <Button variant={v} size="icon" aria-label="추가"><PlusIcon aria-hidden /></Button>
            <Button variant={v} disabled>버튼</Button>
          </Row>
        ))}
        <Row label="아이콘 + 글자">
          <Button><PlusIcon aria-hidden />추가</Button>
          <Button variant="outline">다음<ArrowRightIcon aria-hidden /></Button>
        </Row>
        <Row label="ButtonGroup">
          <ButtonGroup>
            <Button variant="outline">이전</Button>
            <Button variant="outline">오늘</Button>
            <Button variant="outline">다음</Button>
          </ButtonGroup>
        </Row>
      </Section>

      <Section id="input" title="Input · Textarea · InputGroup · NumberInput" figma="- Inputs (10:66 · 10:93 · 48:77 · 2024:3)">
        <Row label="Input: default · filled · disabled · invalid">
          <Input className="w-80" placeholder="내용을 입력하세요" />
          <Input className="w-80" defaultValue="입력한 내용" />
          <Input className="w-80" placeholder="내용을 입력하세요" disabled />
          <Input className="w-80" placeholder="내용을 입력하세요" aria-invalid />
        </Row>
        <Row label="Textarea">
          <Textarea className="w-80" placeholder="내용을 입력하세요" />
          <Textarea className="w-80" placeholder="내용을 입력하세요" aria-invalid />
        </Row>
        <Row label="InputGroup">
          <InputGroup className="w-80">
            <InputGroupInput placeholder="검색" />
            <InputGroupAddon><SearchIcon aria-hidden /></InputGroupAddon>
            <InputGroupAddon align="inline-end"><Kbd>⌘</Kbd><Kbd>K</Kbd></InputGroupAddon>
          </InputGroup>
        </Row>
        <Row label="NumberInput">
          <NumberInput className="w-80" defaultValue={0} min={0} aria-label="수량" />
        </Row>
      </Section>

      <Section id="select" title="Select · DropdownMenu · Autocomplete · MultiSelect" figma="- Dropdowns (12:118 · 25:55 · 2022:3 · 2022:32)">
        <Row label="Select: default · sm · disabled · invalid">
          <Select>
            <SelectTrigger aria-label="라인"><SelectValue placeholder="선택하세요" /></SelectTrigger>
            <SelectContent>
              {lines.map((l) => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger size="sm" aria-label="라인"><SelectValue placeholder="선택하세요" /></SelectTrigger>
            <SelectContent>
              {lines.map((l) => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select disabled>
            <SelectTrigger aria-label="라인"><SelectValue placeholder="선택하세요" /></SelectTrigger>
            <SelectContent><SelectItem value="a">a</SelectItem></SelectContent>
          </Select>
          <Select>
            <SelectTrigger aria-invalid aria-label="라인"><SelectValue placeholder="선택하세요" /></SelectTrigger>
            <SelectContent><SelectItem value="a">a</SelectItem></SelectContent>
          </Select>
        </Row>
        <Row label="DropdownMenu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline">메뉴 열기</Button></DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>내 계정</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><CopyIcon aria-hidden />복사<DropdownMenuShortcut>⌘C</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuCheckboxItem checked={checked} onCheckedChange={setChecked}>체크 항목</DropdownMenuCheckboxItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>하위 메뉴</DropdownMenuSubTrigger>
                <DropdownMenuSubContent><DropdownMenuItem>항목</DropdownMenuItem></DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem disabled>비활성</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive"><Trash2Icon aria-hidden />삭제</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Row>
        <Row label="Autocomplete · MultiSelect">
          <div className="w-80"><Autocomplete options={lines} value={ac} onValueChange={setAc} placeholder="검색어" aria-label="라인 검색" /></div>
          <div className="w-80"><MultiSelect options={lines} value={ms} onValueChange={setMs} placeholder="라인 선택" /></div>
        </Row>
      </Section>

      <Section id="checkbox" title="Checkbox · Radio · Switch · Label · FilterChip" figma="- Checkboxes · Radios · Switches · Labels · Chips">
        <Row label="Checkbox">
          <div className="flex items-center gap-2"><Checkbox id="c1" /><Label htmlFor="c1">기본</Label></div>
          <div className="flex items-center gap-2"><Checkbox id="c2" defaultChecked /><Label htmlFor="c2">선택됨</Label></div>
          <div className="flex items-center gap-2"><Checkbox id="c3" disabled /><Label htmlFor="c3">비활성</Label></div>
          <div className="flex items-center gap-2"><Checkbox id="c4" aria-invalid /><Label htmlFor="c4">오류</Label></div>
        </Row>
        <Row label="RadioGroup">
          <RadioGroup defaultValue="a" className="flex w-auto gap-4">
            <div className="flex items-center gap-2"><RadioGroupItem id="r1" value="a" /><Label htmlFor="r1">주간</Label></div>
            <div className="flex items-center gap-2"><RadioGroupItem id="r2" value="b" /><Label htmlFor="r2">야간</Label></div>
            <div className="flex items-center gap-2"><RadioGroupItem id="r3" value="c" disabled /><Label htmlFor="r3">비활성</Label></div>
          </RadioGroup>
        </Row>
        <Row label="Switch">
          <div className="flex items-center gap-2"><Switch id="s1" /><Label htmlFor="s1">끔</Label></div>
          <div className="flex items-center gap-2"><Switch id="s2" defaultChecked /><Label htmlFor="s2">켬</Label></div>
          <div className="flex items-center gap-2"><Switch id="s3" disabled /><Label htmlFor="s3">비활성</Label></div>
        </Row>
        <Row label="Label required">
          <Label htmlFor="req" required>설비명</Label>
        </Row>
        <Row label="FilterChip">
          <FilterChip onRemove={() => {}}>태그 1</FilterChip>
          <FilterChip>태그 2</FilterChip>
        </Row>
      </Section>
    </>
  )
}
