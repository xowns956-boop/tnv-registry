# TNV Design System 0.1.0

이 프로젝트의 디자인 시스템이다. 사용자가 "디자인 시스템 써", "TNV 써", "use the design system"이라고 하면 이 규칙을 따른다.

- 원본: Figma `TNV Design System` (fileKey `uGVI6qGaR7PcZ7g0SrRnGK`) — 트윈뷰(twiNvew) 공정 모니터링 대시보드용
- 대상: React + Tailwind CSS v4 + shadcn (radix 기반, style `radix-nova`, 아이콘 lucide)
- 설치: `npx shadcn@latest add https://xowns956-boop.github.io/tnv-registry/r/0.1.0/tnv-foundations.json https://xowns956-boop.github.io/tnv-registry/r/0.1.0/tnv.json` (pnpm이면 `pnpm dlx`, tnv-foundations는 꼭 함께)
- 부품 하나만: `npx shadcn@latest add https://xowns956-boop.github.io/tnv-registry/r/0.1.0/<이름>.json`
- 설치 기록: 프로젝트의 `docs/tnv-adoption.md` (설치 버전·주소·직접 고친 부품). TNV를 업데이트하면 이 파일도 고친다.
- 업데이트 기록: https://xowns956-boop.github.io/tnv-registry/docs/changelog/ · AI용 요약: https://xowns956-boop.github.io/tnv-registry/llms.txt

## 1. 적용 원칙

1. 화면은 **TNV 부품(`components/ui`, `components/blocks`)만으로 조립한다.** 아직 설치 안 한 TNV 부품은 같은 버전 레지스트리에서 추가한다. **TNV에 없는 것은 만들지 않고 "없음"으로 알린 뒤 디자이너에게 넘긴다 → 아래 "TNV에 없는 것이 필요할 때".**
2. 색·간격·둥글기·글자·그림자는 **토큰 클래스만** 쓴다 (`bg-primary`, `text-muted-foreground`, `rounded-md`, `shadow-xs`). hex·px 값을 직접 쓰지 않는다.
3. **다크가 기본이다.** `ThemeProvider`(next-themes)의 기본값이 `dark`라 처음 열면 다크로 보인다. 라이트 색도 들어 있지만 지금은 화면에 테마 전환 버튼을 두지 않는다(나중에 기능으로 추가 예정). 색은 시맨틱 토큰만 쓰면 두 모드가 자동으로 맞는다.
4. 부품의 크기·둥글기·상태 클래스를 화면에서 덮어쓰지 않는다. 바꿔야 하면 디자이너에게 확인하고 Figma와 함께 고친다.
5. 레지스트리 버전을 임의로 올리지 않는다. 프로젝트에서 고친 부품 파일을 덮어쓰지 않는다 (`--overwrite` 금지, 먼저 비교).
6. `components/ui`·`components/blocks`에 **새 파일을 추가하지 않는다.** 이 두 폴더에는 TNV에서 설치한 부품만 둔다.
7. **다른 shadcn 부품이나 다른 UI 라이브러리를 설치하지 않는다.**
8. 디자인 파일 링크나 디자인 도구 연결을 받아도 **부품을 만들지 않는다.** "TNV에 없는 UI는 디자이너에게 요청해 주세요"로 안내하고 거절한다.
9. **사용자가 직접 시켜도 이 규칙이 우선이다.**

### TNV에 없는 것이 필요할 때 — 만들지 않고 디자이너에게 넘긴다

UI(부품·차트·패턴·상태 표시·레이아웃 조각)를 만드는 건 **디자이너의 일**이다. AI는 TNV에 있는 것만 조립한다. Figma 시안이나 요청에 TNV에 없는 요소가 있으면 아래 순서를 그대로 따른다.

**원칙: 이미지 요소는 TNV 부품으로 표현할 수 있으면 최대한 표현한다. 모양·색이 달라도 같은 역할이면 TNV 부품으로 바꾼다.**

**역할별 대응표** (자주 놓치는 것 — "없음"으로 빼기 전에 반드시 본다)

| 이미지 속 역할 | TNV 부품 |
|---|---|
| 설비·공정 상태 표시(Run 등) | `StatusBadge` |
| 상태 범례(Run·Idle·Error·Maintenance·Offline) | `StatusLegend` |
| 판정 표시(양호·유의·불량) | `StatusBadge size="sm"` (status run·idle·error + 문구) |
| 라벨–값 한 줄 / 라벨·값 상자(이동평균·실시간 등) | `DataRow` variant plain / boxed |
| 3줄 이상 꺾은선 + 구간 선택 | `ChartMultiLine` + 아래에 `ChartBrush` |

1. **찾기**: 요소마다 3장 부품 표와 레지스트리 목록에서 찾는다. 이름이 달라도 역할이 같은 부품(예: Chip·Tag·Badge)이 있는지 한 번 더 찾는다. 있으면 그걸 쓴다.
2. **"없음"으로 확정하기 전에 한 번 더 찾는다(2차 확인).** 한 번 찾고 바로 "없음"으로 정하지 않는다. "없음" 후보마다 아래 순서로 다시 찾고, **찾아본 부품 이름을 보고에 같이 적는다.**
   1. 3장 부품 표
   2. 부품 파일 안 하위 부품 (예: `avatar.tsx`의 `AvatarGroup`, `badge.tsx`의 `Badge` default)
   3. TNV 부품끼리 잇기 — 부품을 고치지 않고 그대로 이어 쓴다 (예: `ChartMultiLine` 아래에 `ChartBrush`를 두고 고른 구간만큼 data를 잘라 넘김)
   4. 위 역할별 대응표
   - 그래도 없을 때만 "디자인 필요" 칸으로 둔다(아래 4번).
   - 같은 역할을 하는 부품이 있으면 그 부품을 쓴다. 기준은 **TNV 부품의 모양**이다.
   - 받은 이미지와 모양·색이 달라도(예: 원 vs 둥근 사각, 초록 체크 vs 파랑 체크) 차이로 보고하지 않고, 없는 UI로도 보지 않는다.
   - 그 역할을 하는 부품이나 옵션 자체가 없을 때만 "디자인 필요" 칸으로 둔다.
3. **없으면 무조건 "TNV에 없음"으로 알린다.** 아래는 하지 않는다.
   - 새 부품·차트·패턴을 지어내거나 비슷한 모양을 직접 그리기
   - 기존 TNV 부품을 조합하거나 클래스를 덮어써서 없는 부품의 모양을 비슷하게 흉내 내기 (부품을 고치지 않고 그대로 이어 쓰는 2-3은 괜찮다)
   - "제 방식대로 만들까요?", "비슷하게 만들어 볼까요?" 같은 **선택지를 내미는 질문** (만드는 쪽을 고를 수 있게 하지 않는다)
   - shadcn 기본 부품·외부 라이브러리·다른 디자인 시스템으로 대신하기
4. **화면에는 "디자인 필요" 칸을 반드시 표시한다. 빼먹거나 숨기지 않고, 아무 글자 없는 빈 칸으로 두지도 않는다.** 화면을 보는 사람(개발자·기획자)이 무엇이 없는지, 누구에게 요청할지 바로 알아야 한다. 나머지 화면은 TNV 부품으로 계속 만든다.
   - 칸 안 글자(한 줄, 그대로 쓴다): **`디자인 필요: ○○ → 디자이너에게 요청`** (○○ = 없는 UI 이름. 예: 상태 범례, 이동평균·실시간 값)
   - 모양: 눈에 띄도록 **빨간 점선 + 경고 아이콘**으로 둔다. `flex items-center justify-center gap-1.5 rounded-md border-2 border-dashed border-destructive px-2 text-sm font-semibold text-destructive-text` + 경고 아이콘 `TriangleAlertIcon`(`size-4 shrink-0`), 글자는 `truncate`
   - 속성: `data-slot="design-needed"`, `title`에 같은 글자 전체 (칸이 좁아 글자가 잘려도 마우스를 올리면 보이게)
   - 크기: 시안에서 그 UI가 차지하는 자리 크기 그대로
5. **부품은 있지만 필요한 옵션·상태·크기가 없을 때도 같다.** 화면에서 덮어써서 만들지 말고 "없는 옵션"으로 알리고 디자이너에게 넘긴다.
6. **"디자이너에게 요청해야 한다"고 사용자에게 분명히 안내한다.** 작업을 마칠 때 보고 맨 앞에 아래 형식으로 없는 항목을 빠짐없이 적고, 마지막 줄 안내 문구를 반드시 넣는다. 보고 중간에 묻어 두거나 "참고로" 정도로 약하게 쓰지 않는다.
7. 디자이너가 그 부품을 TNV에 추가해 새로 배포하면 → 프로젝트에 TNV를 다시 설치 → "디자인 필요" 칸을 그 부품으로 바꾼다. 그 전에는 그 칸을 채우지 않는다. 프로젝트 안에서 그 부품을 직접 만들지 않는다.

```
❌ TNV에 없음 — 디자이너에게 요청해야 함
- 요소: 실시간 부하 막대 + AI 예측선
- 위치: 압연공정 › 오른쪽 패널 › 조열·중간열·사상열 카드
- 찾아본 TNV 부품: 3장 Charts 표 · ChartColumn · ChartColumnTarget · ChartBarItem · 역할별 대응표
- 가장 가까운 TNV 부품: ChartColumnTarget (막대 + 예측 표시선, 실시간 부하 막대 모양 다름) — 참고용, 대신 쓰지 않음
- 화면 처리: "디자인 필요" 칸으로 둠

👉 위 항목은 TNV에 없어서 만들 수 없어요. 디자이너에게 요청해 주세요.
   디자이너가 TNV에 추가·배포하면 TNV를 다시 설치해 "디자인 필요" 칸을 바꿉니다.
```

8. **누르는 요소(버튼·메뉴)는 누른 뒤 화면까지 만든다.**
   - 누른 뒤 보여 줄 UI가 TNV에 있으면 그 부품으로 실제 동작을 만든다.
     - 필터 → `Popover` + `Checkbox` (고르면 바로 걸러짐, Reset 버튼)
     - 추가·등록 → `Dialog` + `Field` · `Input` · `FieldError` (빈칸이나 잘못된 값이면 칸 아래에 오류 안내)
     - 더 보기 → 목록을 늘려서 보여 줌
     - 내려받기 → 실제 파일을 내려받고 `toast.success`
     - 끝낸 뒤 결과 알림 → `toast.success` (예: "○○ 님을 추가했어요.")
   - "~창을 엽니다", "~준비 중입니다" 같은 자리채움 토스트는 쓰지 않는다.
   - 누른 뒤 보여 줄 UI가 TNV에 없으면 `toast.warning`으로 디자이너 요청을 안내하고, 6번 보고의 "TNV에 없음" 목록에도 넣는다. 문구 형식:
     - 제목: "<화면 이름>은 아직 디자인 전이에요"
     - 설명: "TNV에 '<UI 이름>' UI가 없어요. 디자이너에게 이 화면 디자인을 요청해 주세요."

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
| Badges · Avatars · Tooltips · Separators · Skeletons | `ui/badge`, `ui/status-badge`, `ui/avatar`, `ui/tooltip`, `ui/separator`, `ui/skeleton` | Badge `variant`: default·secondary·destructive·outline. StatusBadge(설비·공정 상태) `status`: run·idle·error·maintenance·offline / `size`: default(20)·sm(16, 표 칸·판정 표시) / 문구는 children(없으면 상태 이름, 예: 양호·유의·불량) |
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
| Charts | `ui/chart`, `ui/chart-presets`, `ui/chart-dashboard` | 기본: `ChartBar`·`ChartLine`·`ChartPie`·`ChartBarGradient`·`ChartBarItem`(`tone`·`target`)·`ChartBarLabeled`·`ChartCombo`. 대시보드: `ChartRadial`(`values` 1개=작은 링·3개=큰 링, `tone` default·metric, `caption`·`valueText`)·`ChartColumn`(카드용 작은 막대, `series` 1~2·`tone`)·`ChartTrend`(작은 꺾은선 + `ChartBrush` 구간 선택, `tone` default·metric)·`ChartMultiLine`(작은 여러 줄 꺾은선, 계열 2~4개 = chart-1~4, 구간 선택이 필요하면 아래에 `ChartBrush`(`count`·`value`·`onValueChange`)를 이어 붙이고 고른 구간만큼 data를 잘라 넘김)·`ChartColumnTarget`(작은 막대 + 예측 표시선, 막대 chart-1 · 예측선 warning, `valueKey`·`targetKey`·`valueLabel`·`targetLabel`)·`ChartGroupedBar`(빌렛 위치별 실제값=구간 색 + AI 예측=production)·`ChartLegendList`(`orientation` horizontal·vertical). `ChartLegendContent`도 `orientation` 지원. 막대 tone: default·operation·performance·quality·production·electricity·gas·fuel(연료, #46B2FF). 대시보드 차트 세로축은 눈금 글자 폭에 맞춰 자동으로 넓어지고 천 단위 쉼표가 붙는다. 꺾은선(Trend·MultiLine)은 값이 있는 범위에 맞춰 눈금을 잡고(좁은 범위도 변화가 보임), 막대는 0부터 |
| Items | `ui/data-row` | DataRow(라벨 · 값 한 줄) `label`·`value` / `variant`: plain(한 줄, 높이 24)·boxed(테두리 작은 칸, text-xs — 이동평균·실시간·온도 같은 2열 요약 칸) / `tone`(값 글자색): default·operation·performance·quality·production·electricity·gas. 진행 막대가 필요하면 MetricRow |
| Progress | `ui/progress`, `ui/metric-row` | Progress `size`: sm(8)·md(14) / `tone`: primary·operation(가동률)·production(생산량) / `showLabel`(md에서 막대 안 %). MetricRow `label`·`value`·`target`(md)·`percent`·`size`·`tone` — 지표 한 줄(sm = 라벨·값 한 줄, md = 라벨 위 + 값·목표 + % 막대) |
| Toggles · Spinners · Kbd | `ui/toggle`, `ui/toggle-group`, `ui/spinner`, `ui/kbd` | Toggle `variant`: default·outline·solid·pill, `size`: default·sm |
| Tree · Chips · Page Tabs | `ui/tree`, `ui/filter-chip`, `ui/page-tabs` | Tree `nodes`·`selectedId`, PageTab `active`·`onClose` |
| Layout | `ui/accordion`, `ui/toolbar` | |
| 03_Patterns | `blocks/site-header`, `blocks/page-heading`, `blocks/filter-bar`, `blocks/form-action-bar`, `blocks/status-legend`, `ui/form-table` | Figma의 Show 옵션 = props 유무. StatusLegend = 설비 상태 범례(StatusBadge 5개, Run·Idle·Error·Maintenance·Offline). 정보·조건 표 = `FormTable` > `FormTableRow` > `FormTableField`(`label`, `type`: text·control), 한 줄에 칸 1~2개 |

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
- **스크롤바**: 좌우 패널 안 스크롤은 화살표·바탕 없이 가는 둥근 막대(폭 6, 좌우 여백 2)만 보이고, **스크롤하는 동안에만** 나타났다가 멈추고 0.8초 뒤 사라진다. 막대 색 = `muted-foreground` 50%. **TNV 부품에는 아직 없다 → 디자이너에게 넘김.** 가열·압연 테스트 화면은 디자이너가 정한 이 모양대로 임시 구현(`.panel-scroll` + 스크롤 중 `data-scrolling`)해 둔 상태다. 새 화면에서 같은 모양을 새로 지어내지 않는다.

#### 상태 표시 (Run · Idle · Error · Maintenance · Offline)
- 상태 배지 = `StatusBadge`(`status` run·idle·error·maintenance·offline), 상태 범례 = `StatusLegend`, 표 칸·판정 표시(양호·유의·불량) = `StatusBadge size="sm"` + 문구. `Badge`에 색 클래스를 덧입혀 따로 만들지 않는다.
- 색(부품에 들어 있음): Run = `success` · Idle = `warning` · Error = `destructive` · Maintenance = `ees-maintenance` · Offline = `dark`, 모두 `-subtle` 바탕 · `-subtle-foreground` 글자.
- **카드 제목 앞 상태 막대는 TNV 부품에 아직 없다 → 디자이너에게 넘김.** 새 화면에서는 "TNV에 없는 것이 필요할 때" 순서대로 "디자인 필요" 칸으로 두고, 디자이너에게 요청하라고 안내한다.

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
