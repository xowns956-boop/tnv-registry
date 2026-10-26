# TNV Design System 0.1.0

이 프로젝트의 디자인 시스템이다. 사용자가 "디자인 시스템 써", "TNV 써", "use the design system"이라고 하면 이 규칙을 따른다.

- 원본: Figma `TNV Design System` (fileKey `uGVI6qGaR7PcZ7g0SrRnGK`) — 트윈뷰(twiNvew) 공정 모니터링 대시보드용
- 대상: React + Tailwind CSS v4 + shadcn (radix 기반, style `radix-nova`, 아이콘 lucide)
- 설치: `npx shadcn@latest add https://xowns956-boop.github.io/tnv-registry/r/0.1.0/tnv-foundations.json https://xowns956-boop.github.io/tnv-registry/r/0.1.0/tnv.json` (pnpm이면 `pnpm dlx`, tnv-foundations는 꼭 함께)
- 부품 하나만: `npx shadcn@latest add https://xowns956-boop.github.io/tnv-registry/r/0.1.0/<이름>.json`
- 설치 기록: 프로젝트의 `docs/tnv-adoption.md` (설치 버전·주소·직접 고친 부품). TNV를 업데이트하면 이 파일도 고친다.
- 변경 기록: https://xowns956-boop.github.io/tnv-registry/docs/changelog/ · AI용 요약: https://xowns956-boop.github.io/tnv-registry/llms.txt

## 1. 적용 원칙

1. 화면을 만들 때 **설치된 부품(`components/ui`, `components/blocks`)을 먼저 쓴다.** 비슷한 모양을 새로 만들지 않는다. 없는 부품은 같은 버전(0.1.0) 레지스트리에서 추가한다.
2. 색·간격·둥글기·글자·그림자는 **토큰 클래스만** 쓴다 (`bg-primary`, `text-muted-foreground`, `rounded-md`, `shadow-xs`). hex·px 값을 직접 쓰지 않는다.
3. **다크가 기본이다.** `ThemeProvider`(next-themes)의 기본값이 `dark`라 처음 열면 다크로 보인다. 라이트 색도 들어 있지만 지금은 화면에 테마 전환 버튼을 두지 않는다(나중에 기능으로 추가 예정). 색은 시맨틱 토큰만 쓰면 두 모드가 자동으로 맞는다.
4. 부품의 크기·둥글기·상태 클래스를 화면에서 덮어쓰지 않는다. 바꿔야 하면 디자이너에게 확인하고 Figma와 함께 고친다.
5. 레지스트리 버전을 임의로 올리지 않는다. 프로젝트에서 고친 부품 파일을 덮어쓰지 않는다 (`--overwrite` 금지, 먼저 비교).

## 2. 토큰

Figma 변수 이름에서 `/`를 `-`로 바꾼 이름이다. 의미 색은 그룹명이 겹치면 그룹을 뗀다 (`primary/primary` → `primary`, `base/background` → `background`, `border/ring` → `ring`). `alpha/` 그룹은 `alpha-`를 붙인다.

### 색 역할 (Tailwind 클래스로 그대로 사용: `bg-*`, `text-*`, `border-*`, `ring-*`)

| 역할 | 토큰 | 쓰는 곳 |
|---|---|---|
| 페이지 바탕 | `page-background` | 앱 전체 바탕 (다크 #02021D · 라이트 #DADFE8) |
| 기본 면 | `background` / `foreground` | 팝업·시트·입력 바탕, 기본 글자 |
| 카드 | `card` / `card-foreground` | 카드·표 바탕 |
| 강조 카드 | `card-emphasis`, `card-emphasis-active`, `card-emphasis-foreground` | StatCard `tone="emphasis"`·MenuTile — 옆 카드와 살짝만 구분되는 면 |
| 표 머리글 | `table-header` | 표 머리글·FormTable 제목 칸·팝업 표 머리글 (라이트에서 흰 바탕과 구분) |
| 주 동작 | `primary`, `primary-hover`, `primary-active`, `primary-text`, `primary-foreground` | 주요 버튼(화면당 1개), 선택 상태, 링크 글자 |
| 보조 | `secondary`, `secondary-hover`, `secondary-foreground` | 보조 버튼 |
| 강조 면 | `accent`, `accent-hover`, `accent-foreground` | hover·선택된 목록 항목, 오늘 날짜 |
| 흐림 | `muted`, `muted-foreground` | 비활성 면, 설명 글자 |
| 경계 | `border`, `input`, `ring` | 테두리, 입력 테두리, 포커스 |
| 상태 | `destructive*`, `success*`, `warning*`, `info*`, `tertiary*`, `neutral*`, `dark*`, `light*`, `inverse*` | 각 계열마다 기본·`-hover`·`-active`·`-emphasis`·`-text`·`-foreground`·`-subtle`·`-subtle-hover`·`-subtle-active`·`-subtle-foreground` |
| 투명도 | `alpha-*` (예: `alpha-ring-50`, `alpha-overlay`, `alpha-field`, `alpha-outline`, `alpha-row-hover`, `alpha-list-hover`) | 포커스 링, 덮개, 입력 바탕, 행 hover |
| 차트 | `chart-1`~`chart-6` (+ `-bold`·`-bolder`·`-subtle`·`-subtler`), `chart-electricity`·`chart-fuel`(연료, #46B2FF)·`chart-gas`·`chart-operation`·`chart-performance`·`chart-production`·`chart-quality` | 차트 계열 |
| 사이드바 | `sidebar`, `sidebar-foreground`, `sidebar-primary`, `sidebar-accent`, `sidebar-border`, `sidebar-ring` | 사이드바 |
| 업무 | `ees-maintenance*` | 보전(설비) 상태 표시 |
| 대시보드 | `alpha-panel`(반투명 패널), `alpha-operation-20`·`alpha-production-20`(막대 트랙), `alpha-primary-glow`, `progress-label`(막대 안 % 글자), `chart-zone-preheat`·`chart-zone-heating`·`chart-zone-soak`(가열로 구역), `alpha-switch-off`·`alpha-switch-thumb`(스위치) | 트윈뷰 대시보드 |

상태 표현 규칙: 진한 바탕 = 기본 토큰 + `-foreground` 글자, 연한 바탕 = `-subtle` + `-subtle-foreground` 글자, 글자만 = `-text`.

다크 색 규칙: 다크 값은 **라이트와 같은 색 계열**로 둔다. 어두운 바탕에서 잘 보이게 명도만 조정한다(예: chart-1 라이트 brand/500 → 다크 brand/400, chart-3 violet/600 → violet/500). 다크에서 다른 색 계열로 바꾸거나 채도가 빠진 파스텔로 바꾸지 않는다. 전력(`electricity`)은 노랑 계열(라이트 #B08C00 · 다크 #FFEE00), 선택 글자(`accent-foreground`·`sidebar-accent-foreground`)는 두 모드 모두 파랑.

### 간격·글자·둥글기·그림자

- 간격: 4px 단위 (`p-1`=4, `p-2`=8, `p-3`=12, `p-4`=16, `p-6`=24 …). Figma `spacing/N` = Tailwind `N`.
- 글자: Pretendard Variable. `text-2xs`(10) · `text-xs`(12/16) · `text-sm`(14/20, 기본) · `text-base`(16/24) · `text-lg`(18/28) · `text-xl`(20/28) · `text-2xl`(24/32) · `text-3xl`(30/36) · `text-4xl`(36/40), 큰 제목 `text-h1`~`text-h6`, `text-display-1`~`4`. 굵기 `font-normal`·`font-medium`·`font-semibold`·`font-bold`.
- Figma 글자 스타일 `text-sm/medium` = `text-sm font-medium`.
- 둥글기: `rounded-3xs`(2) · `rounded-2xs`(4) · `rounded-xs`(6) · `rounded-sm`(8) · `rounded-md`(10, 버튼·입력) · `rounded-lg`(12, 탭 바·팝업) · `rounded-xl`(16, 카드) · `rounded-full`.
- 그림자: `shadow-2xs` · `shadow-xs`(버튼·입력) · `shadow-sm`(카드) · `shadow-md`(드롭다운) · `shadow-lg`(팝업·시트) · `shadow-xl`(차트 툴팁) · `shadow-panel`(대시보드 패널) · `shadow-header`(상단 바) · `shadow-primary-glow`(선택된 solid 탭).
- 최대 폭: `max-w-layout` (1440).

## 3. 부품 (Figma 페이지 → 파일)

| Figma | 파일 | 주요 props (Figma variant 이름 그대로) |
|---|---|---|
| Buttons | `ui/button`, `ui/button-group`, `ui/menu-tile` | `variant`: default·destructive·outline·secondary·ghost·link / `size`: default(36)·sm(32)·lg(40)·icon(36) / 누르는 동안 pressed 색(자동). MenuTile `icon`·`children`(메뉴명) — 태블릿 메뉴용 큰 타일 |
| Inputs | `ui/input`, `ui/textarea`, `ui/input-group`, `ui/number-input`, `ui/number-stepper` | 오류는 `aria-invalid`. NumberStepper(− 값 +) `value`·`onValueChange`·`min`·`max`·`step` — 태블릿 숫자 입력 |
| Dropdowns | `ui/select`, `ui/dropdown-menu`, `ui/autocomplete`, `ui/multi-select` | Select `size`: default·sm, DropdownMenuItem `variant`: default·destructive |
| Checkboxes · Radios · Switches · Labels | `ui/checkbox`, `ui/radio-group`, `ui/switch`, `ui/label` | Label `required` (빨간 점) |
| Badges · Avatars · Tooltips · Separators · Skeletons | `ui/badge`, `ui/avatar`, `ui/tooltip`, `ui/separator`, `ui/skeleton` | Badge `variant`: default·secondary·destructive·outline |
| Cards | `ui/card`, `ui/stat-card` (`StatCard`, `SectionCards`) | Card `variant`: default(흰 카드, 여백 16)·panel(대시보드 좌우 반투명 큰 패널, 제목 24) / `size`: default(16)·sm(12). StatCard `label`·`value`·`badge`·`summary`·`detail`·`trend`(up·down)·`tone`(default·emphasis=진한 바탕) |
| Tabs | `ui/tabs` | TabsList `variant`: default·line·solid(대시보드 상단 전환 — 탭마다 따로 선 버튼, 선택 = primary) |
| Popovers · Dialogs · Sheets | `ui/popover`, `ui/dialog`, `ui/alert-dialog`, `ui/sheet`, `ui/dialog-body` | Sheet `side`: right·left·top·bottom. 팝업 내용: `DialogBodyTable`(columns·rows)·`DialogBodyInfo`(items)·`DialogBodyLotInput`·`DialogBodyTextarea`·`DialogBodyOptionList`(options)·`DialogBodyOptionButtons`(options·onSelect) |
| Breadcrumbs · Pagination | `ui/breadcrumb`, `ui/pagination` | PaginationLink `isActive` |
| Steppers | `ui/stepper` | StepperItem `state`: disabled·invalid·upcoming·current·done, Stepper `orientation` |
| Alerts · Toasts | `ui/alert`, `ui/sonner` | Alert `variant`: default·destructive / `toast.success·info·warning·error` |
| Date Pickers | `ui/calendar`, `ui/date-picker` | DatePicker `value`·`onValueChange`·`invalid` (기본 언어 한국어) |
| Command | `ui/command`, `ui/combobox` | |
| Sidebar | `ui/sidebar`, `ui/sidebar-brand`, `ui/nav-user` | collapsible="icon"으로 접힘(폭 56, 펼침 256), NavUser `layout`: full·avatar. 조립 규칙은 4장 |
| Tables | `ui/table`, `ui/data-table` | DataTable `columns`(sortValue·muted)·`selectable`·`searchText`·`actions` |
| Forms | `ui/field` (`Field`, `FieldLabel`, `FieldDescription`, `FieldError`) | 오류는 `Field data-invalid` + 컨트롤 `aria-invalid` |
| Charts | `ui/chart`, `ui/chart-presets`, `ui/chart-dashboard` | 기본: `ChartBar`·`ChartLine`·`ChartPie`·`ChartBarGradient`·`ChartBarItem`(`tone`·`target`)·`ChartBarLabeled`·`ChartCombo`. 대시보드: `ChartRadial`(`values` 1개=작은 링·3개=큰 링, `tone` default·metric, `caption`·`valueText`)·`ChartColumn`(카드용 작은 막대, `series` 1~2·`tone`)·`ChartTrend`(작은 꺾은선 + `ChartBrush` 구간 선택, `tone` default·metric)·`ChartMultiLine`(작은 여러 줄 꺾은선, 계열 2~4개 = chart-1~4, 구간 선택 없음)·`ChartColumnTarget`(작은 막대 + 예측 표시선, 막대 chart-1 · 예측선 warning, `valueKey`·`targetKey`·`valueLabel`·`targetLabel`)·`ChartGroupedBar`(빌렛 위치별 실제값=구간 색 + AI 예측=production)·`ChartLegendList`(`orientation` horizontal·vertical). `ChartLegendContent`도 `orientation` 지원. 막대 tone: default·operation·performance·quality·production·electricity·gas·fuel(연료, #46B2FF) |
| Progress | `ui/progress`, `ui/metric-row` | Progress `size`: sm(8)·md(14) / `tone`: primary·operation(가동률)·production(생산량) / `showLabel`(md에서 막대 안 %). MetricRow `label`·`value`·`target`(md)·`percent`·`size`·`tone` — 지표 한 줄(sm = 라벨·값 한 줄, md = 라벨 위 + 값·목표 + % 막대) |
| Toggles · Spinners · Kbd | `ui/toggle`, `ui/toggle-group`, `ui/spinner`, `ui/kbd` | Toggle `variant`: default·outline·solid·pill, `size`: default·sm |
| Tree · Chips · Page Tabs | `ui/tree`, `ui/filter-chip`, `ui/page-tabs` | Tree `nodes`·`selectedId`, PageTab `active`·`onClose` |
| Layout | `ui/accordion`, `ui/toolbar` | |
| 03_Patterns | `blocks/site-header`, `blocks/page-heading`, `blocks/filter-bar`, `blocks/form-action-bar`, `ui/form-table` | Figma의 Show 옵션 = props 유무. 정보·조건 표 = `FormTable` > `FormTableRow` > `FormTableField`(`label`, `type`: text·control), 한 줄에 칸 1~2개 |

`button`의 `xs`·`icon-sm`, `badge`의 `ghost`·`link`, `avatar`의 `size`는 shadcn 호환용이며 Figma에 없다. 새 화면에서는 쓰지 않는다.

## 4. 화면 조립 패턴 (어드민)

```
SidebarProvider
├─ Sidebar (SidebarBrand · SidebarGroup · SidebarMenuButton · NavUser)
└─ SidebarInset (bg-page-background)
   ├─ SiteHeader (빵부스러기 · 검색 · 사용자)
   ├─ PageTabBar (열린 화면 탭, 선택)
   └─ main (p-6, gap-6)
      ├─ PageHeading (제목 · 설명 · 보조 버튼 · 주요 버튼 1개)
      ├─ FilterBar (검색 Input · Select · DatePicker · FilterBarReset)
      ├─ SectionCards (StatCard ×4)
      ├─ DataTable 또는 Card 안 차트
      └─ FormActionBar (등록·수정 화면 맨 아래)
```

- 사이드바는 Figma `Sidebar`(32:591) 구조 그대로: `SidebarHeader` 안에 `SidebarBrand`(접혀도 넣는다. 머리 칸 64) → `SidebarContent` → `SidebarGroup`(펼침일 때 `SidebarGroupLabel`) → `SidebarMenu` → `SidebarMenuItem` → `SidebarMenuButton`(`tooltip`에 메뉴명) → `SidebarFooter`(`NavUser`, 필요할 때만).
- 사이드바 간격은 부품 기본값을 쓴다(메뉴 사이 8, 하위 메뉴 사이 6, 그룹 사이 8, 버튼 32, 접힘 때 아이콘 가운데). `className`으로 gap·padding·높이를 바꾸지 않는다.
- 주요 버튼(`variant="default"`)은 화면 영역마다 하나. 나머지는 outline·secondary·ghost.
- 빈 상태: DataTable `emptyText` / 불러오는 중: `Skeleton`·`Spinner` / 오류: `Alert variant="destructive"` 또는 `toast.error`.

### 대시보드 (트윈뷰 L1·L2 화면)

```
div (h-dvh, bg-page-background) — 1440보다 좁으면 이 틀 안에서만 가로 스크롤(페이지는 안 밀림)
└─ div (min-w-360, 1920×1080 기준)
   ├─ 상단 바 (h-20, shadow-header) — 로고 칸(w-93) · 화면 제목 + 경로 버튼 · 사용자 + 날짜
   └─ main 본문 3단
      ├─ 왼쪽 aside (w-93, p-4) > Card variant="panel" — 지표 카드(Card) 묶음
      ├─ 가운데 section (flex-1, p-4) — 위: 3D 자리(빈 칸) · 아래: 상태 범례 + 표 카드
      └─ 오른쪽 aside (w-93, p-4) > Card variant="panel" — 설비 목록(Accordion, 하나만 펼침)
```

#### 화면 크기
- 1920×1080 기준. 1440까지는 **가운데(3D 자리)만 줄어들고** 좌우 패널 폭(w-93)은 고정한다.
- 1440보다 좁으면 바깥 틀(`overflow-x-auto`) 안에서 가로 스크롤한다. 페이지 전체가 가로로 밀리지 않게 한다.

#### 가운데 3D 자리
- 3D는 개발에서 따로 얹는다. 가운데 위쪽은 **빈 칸**(`data-slot="viewer-3d"`, `flex-1`)으로 둔다. Figma의 3D 이미지·위 라벨(#01, Furnace 등)은 코드에 넣지 않는다.
- 아래에 상태 범례(오른쪽 정렬)와 표 카드(접기 가능)를 둔다.

#### 패널
- 패널 안 카드는 `Card`(default) 그대로. 카드 안의 여백·간격은 덮어쓰지 않는다.
- **간격**: 패널 안 카드·항목 사이는 `gap-4`(16)로 통일한다. 왼쪽 = 패널 내용 칸 `flex flex-col gap-4`, 오른쪽 = `Accordion className="gap-4"` + 각 `AccordionItem className="not-last:mb-0"`(부품 기본 아래 여백 8을 빼고 gap으로 띄움).
- **접기**: 왼쪽 패널 제목줄 오른쪽에 접기 버튼(`Button variant="outline" size="icon"`, 아이콘 열림 `ChevronsLeft` · 닫힘 `ChevronsRight`, `aria-label` "패널 접기"/"패널 펼치기"). 이 버튼 하나로 **왼쪽 패널 · 오른쪽 패널 · 가운데 아래 표 카드를 함께 숨긴다**(3D 영역을 넓게 볼 때). 접히면 왼쪽에 펼치기 버튼만 남고, 상태 범례는 남긴다. 열림 상태는 화면(page)에 하나만 둔다.
- **높이 채우기**: 왼쪽 패널은 Figma Fill처럼 카드가 남는 높이를 나눠 채우고, 늘어난 만큼 차트가 커진다(차트 최소 높이는 TNV 기본값 유지). 화면이 낮으면 카드를 내용보다 줄이지 않고(`shrink-0`) 패널 안에서 스크롤한다. 오른쪽 패널에서 펼친 항목은 내용 높이만큼만 차지하고 남는 공간은 비워 둔다.
- **스크롤바**: 좌우 패널 안 스크롤은 화살표·바탕 없이 가는 둥근 막대(폭 6, 좌우 여백 2)만 보이고, **스크롤하는 동안에만** 나타났다가 멈추고 0.8초 뒤 사라진다. 막대 색 = `muted-foreground` 50%. TNV 부품에는 아직 없으므로 화면에서 만든다(예: `.panel-scroll` + 스크롤 중 `data-scrolling` 표시).

#### 상태 표시 (Run · Idle · Error · Maintenance · Offline)
- 색: Run = `success` · Idle = `warning` · Error = `destructive` · Maintenance = `ees-maintenance` · Offline = `neutral`.
- 배지·범례 = `Badge` + `-subtle` 바탕 · `-subtle-foreground` 글자. 카드 제목 앞 색 막대 = `-text` 색, 막대에 `aria-label`("상태: Run").
- TNV에 StatusLegend 부품이 아직 없으므로 화면에서 위 색으로 조합한다.

#### 지표 색
- 가동률 = `tone="operation"`, 생산량 = `tone="production"`, 그 밖 진행률 = `primary`. 차트 계열 색도 `chart-operation`·`chart-production`·`chart-electricity` 등 지표 색을 쓴다.
- 지표 색은 묶음별로 쓴다. 에너지 묶음 = 연료 `fuel`·전력 `electricity`·탄소 `gas`, 설비 효율 묶음 = 가동 `operation`·성능 `performance`·품질 `quality`.
- **연료(`fuel`, #46B2FF)와 성능(`performance`, #108FFF)은 같은 파랑 계열이라 한 차트·한 범례에 같이 쓰지 않는다.** 꼭 같이 보여야 하면 디자이너에게 먼저 묻는다(Figma `05_Guide › 07 · 차트 색 — 연료와 성능`).
- 연료가 아닌 지표(예: 로압)에 연료색을 쓰지 않는다. 지표 색이 정해지지 않은 차트는 `tone="default"`.

## 5. 접근성

- 아이콘만 있는 버튼은 `aria-label`을 붙이고, 장식 아이콘은 `aria-hidden`.
- 포커스 링(`ring-alpha-ring-50`)·비활성(`opacity-50`)·오류(`aria-invalid`) 표시를 지우지 않는다.
- 라벨은 `Label htmlFor` 또는 `FieldLabel`로 연결한다. 표의 체크박스에는 `aria-label`.
- 대비: 본문 4.5:1 이상. `muted-foreground` 글자를 `muted` 바탕 위에 작게 쓰지 않는다.
