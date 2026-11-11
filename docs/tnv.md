# TNV Design System 0.1.0

이 프로젝트의 디자인 시스템이다. 사용자가 "디자인 시스템 써", "TNV 써", "use the design system"이라고 하면 이 규칙을 따른다.

- 트윈뷰(twiNvew) 공정 모니터링 대시보드용
- 대상: React + Tailwind CSS v4 + shadcn (radix 기반, style `radix-nova`, 아이콘 lucide)
- 설치: `npx shadcn@latest add https://xowns956-boop.github.io/tnv-registry/r/0.1.0/tnv-foundations.json https://xowns956-boop.github.io/tnv-registry/r/0.1.0/tnv.json` (pnpm이면 `pnpm dlx`, tnv-foundations는 꼭 함께)
- 부품 하나만: `npx shadcn@latest add https://xowns956-boop.github.io/tnv-registry/r/0.1.0/<이름>.json`
- 설치 기록: 프로젝트의 `docs/tnv-adoption.md` (설치 버전·주소·직접 고친 부품). TNV를 업데이트하면 이 파일도 고친다.
- 업데이트 기록: https://xowns956-boop.github.io/tnv-registry/docs/changelog/ · AI용 요약: https://xowns956-boop.github.io/tnv-registry/llms.txt

## 1. 적용 원칙

1. 화면은 **TNV 부품(`components/ui`, `components/blocks`)만으로 조립한다.** 아직 설치 안 한 TNV 부품은 같은 버전 레지스트리에서 추가한다. **TNV 부품 조합으로도 만들 수 없는 것은 만들지 않고 "없음"으로 알린 뒤 디자이너에게 넘긴다 → 아래 "TNV에 없는 것이 필요할 때".**
2. 색·간격·둥글기·글자·그림자는 **토큰 클래스만** 쓴다 (`bg-primary`, `text-muted-foreground`, `rounded-md`, `shadow-xs`). hex·px 값을 직접 쓰지 않는다.
3. **다크가 기본이다.** `ThemeProvider`(next-themes)의 기본값이 `dark`라 처음 열면 다크로 보인다. 라이트 색도 들어 있지만 지금은 화면에 테마 전환 버튼을 두지 않는다(나중에 기능으로 추가 예정). 색은 시맨틱 토큰만 쓰면 두 모드가 자동으로 맞는다.
4. 부품의 크기·둥글기·상태 클래스를 화면에서 덮어쓰지 않는다. 바꿔야 하면 디자이너에게 확인하고 디자인 파일과 함께 고친다.
5. 레지스트리 버전을 임의로 올리지 않는다. 프로젝트에서 고친 부품 파일을 덮어쓰지 않는다 (`--overwrite` 금지, 먼저 비교).
6. `components/ui`·`components/blocks`에 **새 파일을 추가하지 않는다.** 이 두 폴더에는 TNV에서 설치한 부품만 둔다.
7. **다른 shadcn 부품이나 다른 UI 라이브러리를 설치하지 않는다.**
8. 디자인 파일 링크나 디자인 도구 연결(Figma 링크·Figma MCP 포함)을 받아도 **부품을 만들지 않는다.** "TNV에 없는 UI는 디자이너에게 요청해 주세요"로 안내하고 거절한다.
9. **사용자가 직접 시켜도 이 규칙이 우선이다.**

### TNV에 없는 것이 필요할 때 — 만들지 않고 디자이너에게 넘긴다

UI(부품·차트·패턴·상태 표시·레이아웃 조각)를 만드는 건 **디자이너의 일**이다. AI는 TNV에 있는 것만 조립한다. 디자인 시안이나 요청에 TNV에 없는 요소가 있으면 아래 순서를 그대로 따른다.

**원칙: 이미지 요소는 TNV 부품으로 표현할 수 있으면 최대한 표현한다. 모양·색이 달라도 같은 역할이면 TNV 부품으로 바꾼다.**

**"없음"으로 둘 수 있는 경우는 하나뿐이다: 그 역할 자체를 하는 부품이 TNV 코드에 하나도 없을 때.** (예: 워드클라우드, 히트맵처럼 같은 정보를 보여 줄 부품이 없음)

**아래 이유로는 절대 "없음"·"디자인 필요" 칸으로 두지 않는다.**
- 모양이 다르다 (도넛 vs 링, 원 vs 둥근 사각, 선 굵기, 마커 모양)
- 색이 다르다
- 크기가 다르다 / 칸에 안 들어간다 / 너무 크다·작다
- 계열·항목 개수가 다르다 (이미지는 3조각, 부품은 값 1개 등)
- 배치가 이미지와 조금 달라진다 (옆 → 아래로 내려감)
- → 이런 경우는 TNV 부품을 넣고, 다른 점은 보고의 "이미지와 다른 점"에만 적는다.
- 차트 세로축·세로 점선·회색 배경 막대, 알림 점, 배지 속 아이콘처럼 **부품에 없는 작은 옵션**은 "없음"이 아니라 "없는 옵션"이다. 부품은 그대로 쓰고 그 자리만 "디자인 필요" 칸(빨간 점선)으로 둔다(아래 5번).

**"없음" 확정 전 필수 한 줄 (대응 목록·보고에 꼭 적는다)**: "없음" 후보마다 가장 가까운 TNV 부품을 적고, "그 부품으로 안 되는 이유"를 **역할 기준**으로 한 줄 적는다. 이유에 모양·색·크기·개수·배치 단어가 들어가면 "없음"이 아니다 → 그 부품을 쓴다.
- ❌ "ChartRadial은 링 1개라 도넛과 다름" → 모양 이유, 금지
- ✅ "히트맵: 층×시간 2차원 값 분포를 보여 줄 부품 없음(ChartBar·Table은 1차원)" → 역할 이유, 허용

- **기준은 설치된 코드 부품이다.** "있음/없음"은 설치된 TNV 코드 부품(`components/ui`·`components/blocks`) 기준으로 판단한다. 코드에 없는 UI는 디자인 파일에 비슷한 게 있어도 코드 부품만 기준으로 본다. TNV 부품을 덮어쓰지 않고 조합해서 만들 수 있으면 만들고(아래 2번의 3), 안 되면 "디자인 필요" 칸으로 두고 디자이너에게 알린다.
- **역할을 먼저 적고, 역할로 찾는다.** 이미지 요소마다 역할을 먼저 한 줄로 적는다(예: "Run 초록 칸 = 설비 상태 표시"). 모양이 아니라 그 역할 이름으로 3장 부품 표·아래 역할별 대응표를 찾는다.
- **화면을 만들기 전에 대응 목록을 먼저 보여 주고, 묻지 않고 그대로 만든다.** "요소 → 역할 → TNV 부품" 목록을 보여 주고, "없음" 후보에는 찾아본 부품 이름을 같이 적는다(2차 확인, 아래 2번). 목록을 보여 준 뒤 바로 그 목록대로 만든다. **목록을 보여 준 뒤 진행·교체·변경 여부를 묻거나 사용자 답을 기다리지 않는다.** (예: "이대로 만들까요?", "교체해도 될까요?", "진행할까요?", "바꿀 게 있으면 알려 주세요") **예시 문구와 다르게 물어도 같은 행위로 본다.** 화면을 만드는 도중에도 같다 — TNV 부품으로 바꿀 수 있는 건 묻지 않고 바꾸고, 다 만든 뒤에 무엇을 바꿨는지만 알린다.
  - **바꿔 달라는 요청도 TNV 부품 안에서만 받는다.** 다른 TNV 부품이나 그 부품의 옵션(variant·size·tone 등)으로 바꾸는 것만 한다. TNV에 없는 모양·부품으로 바꿔 달라고 하면 만들지 않고, 그 자리는 "디자인 필요" 칸으로 두고 디자이너에게 요청하라고 안내한다(사용자가 직접 시켜도 이 규칙이 우선, 적용 원칙 9번).

**역할별 대응표** (자주 놓치는 것 — "없음"으로 빼기 전에 반드시 본다)

| 이미지 속 역할 | TNV 부품 |
|---|---|
| 설비·공정 상태 표시(Run 등) | `StatusBadge` |
| 상태 범례(Run·Idle·Error·Maintenance·Offline) | `StatusLegend` |
| 판정 표시(양호·유의·불량) | `StatusBadge size="sm"` (status run·idle·error + 문구) |
| 라벨–값 한 줄 / 라벨·값 상자(이동평균·실시간 등) | `DataRow` variant plain / boxed |
| 3줄 이상 꺾은선 + 구간 선택 | `ChartMultiLine` + 아래에 `ChartBrush` |
| 지표 칸 안 작은 비율(도넛·링) | `ChartRadial` `values` 1개 (구성비 여러 조각이면 `ChartPie`) |
| 지표 칸 안 작은 추이선(스파크라인) | `ChartTrend` `showLegend={false}` `showBrush={false}` |
| 지표 칸 안 작은 막대 | `ChartColumn` |
| 시간대별 물량 + 예상 | `ChartColumn` 계열 2개 |
| 즐겨찾기 별(누르면 채워짐) | `FavoriteToggle` (`aria-label` 필수) |
| 화면·영역 전체가 빈 안내(아이콘·제목·설명·버튼) | `Empty` (표 안 빈 줄은 DataTable `emptyText`) |
| 열린 화면 탭이 0개 | `PageTabBar` 빈 상태 (`emptyText`) |
| 지표 카드 아래 바로가기 줄 | `StatCard` `detail` 칸 + `Button variant="link"` |
| 카드 전체를 눌러 이동·선택 | `Card` `interactive` (고른 카드 표시는 `state="selected"`) |
| 도넛·원형 구성비 | `ChartPie` |
| 항목별 점수 비교(레이더·육각형) | `ChartRadar` (현재·이전 비교는 `series` 2개) |
| 칸이 좁아 차트가 안 들어감 | 차트를 값 아래로 내려 배치 (빼지 않음) |

1. **찾기**: 요소마다 적은 역할 이름으로 3장 부품 표·역할별 대응표·레지스트리 목록에서 찾는다. 이름이 달라도 역할이 같은 부품(예: Chip·Tag·Badge)이 있는지 한 번 더 찾는다. 있으면 그걸 쓴다.
2. **"없음"으로 확정하기 전에 한 번 더 찾는다(2차 확인).** 한 번 찾고 바로 "없음"으로 정하지 않는다. "없음" 후보마다 아래 순서로 다시 찾고, **찾아본 부품 이름을 대응 목록과 마지막 보고에 같이 적는다.**
   1. 3장 부품 표
   2. 부품 파일 안 하위 부품 (예: `avatar.tsx`의 `AvatarGroup`, `badge.tsx`의 `Badge` default)
   3. TNV 부품끼리 잇기 — 부품을 고치지 않고 그대로 이어 쓴다 (예: `ChartMultiLine` 아래에 `ChartBrush`를 두고 고른 구간만큼 data를 잘라 넘김)
      - 여러 TNV 부품을 묶어 TNV에 없는 UI를 만드는 것도 된다(예: `Card`·글자·`Button`으로 채팅 메시지). 조건은 **부품마다 `className`으로 크기·글자·둥글기·색을 바꾸지 않고 그대로 써서 그 모양이 나오는 것**이다. 이렇게 만든 UI는 개발에서도 그대로 쓸 수 있다. 화면에는 그대로 두고, 6번 보고의 "TNV에 없음" 목록에 `<UI 이름>: TNV 부품 조합으로 만듦(쓴 부품)`으로 한 줄 남긴다(디자이너가 정식 부품으로 만들지 판단).
      - 부품이 내용을 받는 칸(내용을 그대로 받는 props·children)에 다른 TNV 부품을 넣는 것도 잇기다. TNV에서 이런 칸: `StatCard`의 `label`·`value`·`summary`·`detail`, `MetricRow`의 `label`·`value`·`target`, `DataRow`의 `label`·`value`, `SectionTitle`의 `title`·`action`, `CardHeader`의 `CardAction`, `CardFooter`. (`StatCard`의 `badge`는 배지 안 글자 칸이라 다른 부품을 넣지 않는다.)
      - "없는 옵션"으로 정하기 전에, 그 부품에서 **이미지와 같은 위치에 있는 칸**에 그 역할을 하는 TNV 부품을 넣을 수 있는지 먼저 찾는다. 예: 지표 카드 아래 바로가기 줄 → `StatCard` `detail` 칸 + `Button variant="link"` ("디자인 필요" 칸 아님)
      - 이미지와 **다른 위치의 칸**으로 옮겨 넣지 않는다. 그런 자리는 그대로 없는 옵션("디자인 필요" 칸)이다. 예: 지표 카드 오른쪽 위 아이콘을 `label` 칸(제목 왼쪽)에 넣지 않는다 → `디자인 필요: StatCard 아이콘`
   4. 위 역할별 대응표
   - 그래도 없고 부품 조합(2번의 3)으로도 안 될 때만 "디자인 필요" 칸으로 둔다(아래 4번). 이때 위 "필수 한 줄"(가장 가까운 부품 + 역할 기준 이유)을 반드시 적는다.
   - 같은 역할을 하는 부품이 있으면 그 부품을 쓴다. 기준은 **TNV 부품의 모양**이다.
   - 받은 이미지와 모양·색이 달라도(예: 원 vs 둥근 사각, 초록 체크 vs 파랑 체크) 차이로 보고하지 않고, 없는 UI로도 보지 않는다.
   - 그 역할을 하는 부품이나 옵션 자체가 없을 때만 "디자인 필요" 칸으로 둔다.
3. **TNV 부품 조합(2번의 3)으로도 모양이 안 나오면 "TNV에 없음"으로 알린다.** 그 자리는 "디자인 필요" 칸(4번)으로 두고 6번 목록에 올린다. 아래는 하지 않는다.
   - 새 부품·차트·패턴을 지어내거나 화면 안에 직접 마크업·스타일로 그리기
   - TNV 부품을 덮어써야만(`className`으로 크기·글자·둥글기·색 변경) 나오는 모양 만들기 (덮어쓰지 않고 그대로 묶는 2번의 3은 괜찮다)
   - "제 방식대로 만들까요?", "비슷하게 만들어 볼까요?" 같은 **선택지를 내미는 질문** (만드는 쪽을 고를 수 있게 하지 않는다)
   - shadcn 기본 부품·외부 라이브러리·다른 디자인 시스템으로 대신하기
4. **화면에는 "디자인 필요" 칸을 반드시 표시한다. 빼먹거나 숨기지 않고, 아무 글자 없는 빈 칸으로 두지도 않는다.** 화면을 보는 사람(개발자·기획자)이 무엇이 없는지, 누구에게 요청할지 바로 알아야 한다. 나머지 화면은 TNV 부품으로 계속 만든다.
   - 칸 안 글자(한 줄, 그대로 쓴다): **`디자인 필요: ○○ → 디자이너에게 요청`** (○○ = 없는 UI 이름. 예: 상태 범례, 이동평균·실시간 값)
   - 모양: 눈에 띄도록 **빨간 점선 + 경고 아이콘**으로 둔다. `flex items-center justify-center gap-1.5 rounded-md border-2 border-dashed border-destructive px-2 text-sm font-semibold text-destructive-text` + 경고 아이콘 `TriangleAlertIcon`(`size-4 shrink-0`), 글자는 `truncate`
   - 속성: `data-slot="design-needed"`, `title`에 같은 글자 전체 (칸이 좁아 글자가 잘려도 마우스를 올리면 보이게)
   - 크기: 시안에서 그 UI가 차지하는 자리 크기 그대로
5. **부품은 있지만 필요한 옵션·상태·크기가 없을 때도 같다.** 화면에서 덮어써서 만들지 말고 "없는 옵션"으로 알리고 디자이너에게 넘긴다.
   - **같은 역할 부품은 그대로 쓰고, 없는 옵션 자리만 "디자인 필요" 칸(빨간 점선)으로 둔다.** 옵션이 없다고 다른 부품으로 다시 조립하지 않는다(예: StatCard에 아이콘이 없으면 StatCard를 쓰고 그 자리에 `디자인 필요: StatCard 아이콘` 칸. Card로 지표 카드를 새로 짜지 않는다).
   - **작은 옵션도 빼지 않는다.** 차트 세로축·세로 점선·회색 배경 막대, 알림 점, 배지 속 아이콘처럼 작은 것도 빼고 넘어가지 않고, 그 부품 칸 안(차트 카드 안, 아이콘 버튼 옆 등)에 "디자인 필요" 칸을 두고 목록에 올린다.
   - 이미지에 있는 요소가 화면에서 빠졌는데 "디자인 필요" 칸도 목록도 없으면 위반이다. 다 만든 뒤 이미지 요소 수와 "화면에 만든 것(부품 조합 포함) + 디자인 필요 칸" 수를 맞춰 본다.
6. **"디자이너에게 요청해야 한다"고 사용자에게 분명히 안내한다.** 작업을 마칠 때 보고 맨 앞에 아래 형식으로 없는 항목을 빠짐없이 적고, 마지막 줄 안내 문구를 반드시 넣는다. 보고 중간에 묻어 두거나 "참고로" 정도로 약하게 쓰지 않는다.
7. 디자이너가 그 부품을 TNV에 추가해 새로 배포하면 → 프로젝트에 TNV를 다시 설치 → "디자인 필요" 칸을 그 부품으로 바꾼다. 그 전에는 그 칸을 채우지 않는다. 프로젝트 안에서 그 부품을 직접 만들지 않는다.

```
❌ TNV에 없음 — 디자이너에게 요청해야 함
- 요소: 층×시간 가동 히트맵
- 위치: 관제 화면 › 가운데 아래 카드
- 찾아본 TNV 부품: 3장 Charts 표 · ChartBar · ChartGroupedBar · Table · 역할별 대응표
- 가장 가까운 TNV 부품: ChartGroupedBar — 참고용, 대신 쓰지 않음
- 안 되는 이유(역할 기준): 층×시간 2차원 값 분포를 보여 줄 부품 없음(ChartBar·Table은 1차원)
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

디자인 파일의 변수 이름에서 `/`를 `-`로 바꾼 이름이다. 의미 색은 그룹명이 겹치면 그룹을 뗀다 (`primary/primary` → `primary`, `base/background` → `background`, `border/ring` → `ring`). `alpha/` 그룹은 `alpha-`를 붙인다.

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

- 간격: 4px 단위 (`p-1`=4, `p-2`=8, `p-3`=12, `p-4`=16, `p-6`=24 …). 디자인 파일 `spacing/N` = Tailwind `N`.
- 글자: Pretendard Variable. `text-2xs`(10) · `text-xs`(12/16) · `text-sm`(14/20, 기본) · `text-base`(16/24) · `text-lg`(18/28) · `text-xl`(20/28) · `text-2xl`(24/32) · `text-3xl`(30/36) · `text-4xl`(36/40), 큰 제목 `text-h1`~`text-h6`, `text-display-1`~`4`. 굵기 `font-normal`·`font-medium`·`font-semibold`·`font-bold`.
- 디자인 파일의 글자 스타일 `text-sm/medium` = `text-sm font-medium`.
- 둥글기: `rounded-3xs`(2) · `rounded-2xs`(4) · `rounded-xs`(6) · `rounded-sm`(8) · `rounded-md`(10, 버튼·입력) · `rounded-lg`(12, 탭 바·팝업) · `rounded-xl`(16, 카드) · `rounded-full`.
- 그림자: `shadow-2xs` · `shadow-xs`(버튼·입력) · `shadow-sm`(카드) · `shadow-md`(드롭다운) · `shadow-lg`(팝업·시트) · `shadow-xl`(차트 툴팁) · `shadow-panel`(대시보드 패널) · `shadow-header`(상단 바) · `shadow-primary-glow`(선택된 solid 탭).
- 최대 폭: `max-w-layout` (1440).

## 3. 부품 (분류 → 파일)

| 분류 | 파일 | 주요 props |
|---|---|---|
| Buttons | `ui/button`, `ui/button-group`, `ui/menu-tile` | `variant`: default·destructive·outline·secondary·ghost·link / `size`: default(36)·sm(32)·lg(40)·icon(36) / 누르는 동안 pressed 색(자동). MenuTile `icon`·`children`(메뉴명) — 태블릿 메뉴용 큰 타일 |
| Inputs | `ui/input`, `ui/textarea`, `ui/input-group`, `ui/number-input`, `ui/number-stepper` | 오류는 `aria-invalid`. NumberStepper(− 값 +) `value`·`onValueChange`·`min`·`max`·`step` — 태블릿 숫자 입력 |
| Dropdowns | `ui/select`, `ui/dropdown-menu`, `ui/autocomplete`, `ui/multi-select` | Select `size`: default·sm, DropdownMenuItem `variant`: default·destructive |
| Checkboxes · Radios · Switches · Labels | `ui/checkbox`, `ui/radio-group`, `ui/switch`, `ui/label` | Label `required` (빨간 점) |
| Badges · Avatars · Tooltips · Separators · Skeletons | `ui/badge`, `ui/status-badge`, `ui/avatar`, `ui/tooltip`, `ui/separator`, `ui/skeleton` | Badge `variant`: default·secondary·destructive·outline · 상태 info(진행 중·정보)·success(완료)·warning(주의)·destructive-subtle(실패·문제, 연한 바탕) — 고르는 법은 아래 "배지 variant 고르기". StatusBadge(설비·공정 상태) `status`: run·idle·error·maintenance·offline / `size`: default(20)·sm(16, 표 칸·판정 표시) / 문구는 children(없으면 상태 이름, 예: 양호·유의·불량) |
| Cards | `ui/card`, `ui/stat-card` (`StatCard`, `SectionCards`) | Card `variant`: default(흰 카드, 여백 16)·panel(대시보드 좌우 반투명 큰 패널, 제목 24) / `size`: default(16)·sm(12) / `state`: default·selected(고른 카드, 바탕 accent) / `interactive`: 카드 전체를 누를 때만 켬(hover 테두리 ring · 누르는 동안 바탕 accent-active · focus 테두리 ring + 링, 키보드 Enter·Space로 누름). `state`·`interactive`는 variant=default에만 있다(panel은 무시). StatCard `label`·`value`·`badge`·`summary`·`detail`·`trend`(up·down)·`tone`(default·emphasis=진한 바탕·selected=고른 카드, accent 바탕) |
| Tabs | `ui/tabs` | TabsList `variant`: default·line·solid(대시보드 상단 전환 — 탭마다 따로 선 버튼, 선택 = primary) / `fill`: 꽉 채우기(부모 폭을 채우고 탭이 똑같이 나눠 퍼짐, 사용자가 요청할 때만 켬. 기본은 내용만큼) |
| Popovers · Dialogs · Sheets | `ui/popover`, `ui/dialog`, `ui/alert-dialog`, `ui/sheet`, `ui/dialog-body` | Sheet `side`: right·left·top·bottom. 팝업 내용: `DialogBodyTable`(columns·rows)·`DialogBodyInfo`(items)·`DialogBodyLotInput`·`DialogBodyTextarea`·`DialogBodyOptionList`(options)·`DialogBodyOptionButtons`(options·onSelect) |
| Breadcrumbs · Pagination | `ui/breadcrumb`, `ui/pagination` | PaginationLink `isActive` |
| Steppers | `ui/stepper` | StepperItem `state`: disabled·invalid·upcoming·current·done, Stepper `orientation` |
| Alerts · Toasts | `ui/alert`, `ui/sonner` | Alert `variant`: default·destructive / `toast.success·info·warning·error` |
| Date Pickers | `ui/calendar`, `ui/date-picker` | DatePicker `value`·`onValueChange`·`invalid` (기본 언어 한국어) |
| Command | `ui/command`, `ui/combobox` | |
| Sidebar | `ui/sidebar`, `ui/sidebar-brand`, `ui/nav-user` | collapsible="icon"으로 접힘(폭 56, 펼침 256), NavUser `layout`: full·avatar. 조립 규칙은 4장 |
| Tables | `ui/table`, `ui/data-table` | DataTable `columns`(sortValue·muted)·`selectable`·`searchText`·`actions` |
| Forms | `ui/field` (`Field`, `FieldLabel`, `FieldDescription`, `FieldError`) | 오류는 `Field data-invalid` + 컨트롤 `aria-invalid` |
| Charts | `ui/chart`, `ui/chart-presets`, `ui/chart-dashboard` | 기본: `ChartBar`·`ChartLine`·`ChartPie`(`type`: pie·donut(가운데 빈 고리, 안쪽 반지름 = 바깥 75%), donut일 때 `caption`·`valueText` = 가운데 글자, 안 넘기면 빈 고리)·`ChartBarGradient`·`ChartBarItem`(`tone`·`target`)·`ChartBarLabeled`·`ChartCombo`. 대시보드: `ChartRadial`(`values` 1개=작은 링·3개=큰 링, `tone` default·metric, `caption`·`valueText`)·`ChartRadar`(레이더·육각형 차트. 가로 = 부모 칸 폭을 꽉 채우고 도형은 가운데, 높이 184(범례 있으면 220), 도형 반지름 64 고정 — 칸이 넓으면 축 글자 자리가 넓어지고, 긴 축 이름은 띄어쓰기에서 줄을 바꿔 칸 안에 다 보임. `className`으로 폭·높이를 덮어쓰지 않는다. 축 6개·값 0~100, `axisKey`·`series` 1~2개 = 현재·이전, `tone` default(chart-1·chart-2)·metric(operation·performance), 2개일 때만 아래 범례)·`ChartColumn`(카드용 작은 막대, `series` 1~2·`tone`)·`ChartTrend`(작은 꺾은선 + `ChartBrush` 구간 선택, `tone` default·metric)·`ChartMultiLine`(작은 여러 줄 꺾은선, 계열 2~4개 = chart-1~4, 구간 선택이 필요하면 아래에 `ChartBrush`(`count`·`value`·`onValueChange`)를 이어 붙이고 고른 구간만큼 data를 잘라 넘김)·`ChartColumnTarget`(작은 막대 + 예측 표시선, 막대 chart-1 · 예측선 warning, `valueKey`·`targetKey`·`valueLabel`·`targetLabel`)·`ChartGroupedBar`(빌렛 위치별 실제값=구간 색 + AI 예측=production)·`ChartLegendList`(`orientation` horizontal·vertical). `ChartLegendContent`도 `orientation` 지원(가로 범례는 4개까지 한 줄, 5개부터 두 줄 — 칸은 글자 길이만큼, 글자는 한 줄 고정. 항목이 많은 원형 차트도 그대로 쓴다). 막대 tone: default·operation·performance·quality·production·electricity·gas·fuel(연료, #46B2FF). 대시보드 차트 세로축은 눈금 글자 폭에 맞춰 자동으로 넓어지고 천 단위 쉼표가 붙는다. 꺾은선(Trend·MultiLine)은 값이 있는 범위에 맞춰 눈금을 잡고(좁은 범위도 변화가 보임), 막대는 0부터 |
| Items | `ui/data-row` | DataRow(라벨 · 값 한 줄) `label`·`value` / `variant`: plain(한 줄, 높이 24)·boxed(테두리 작은 칸, text-xs — 이동평균·실시간·온도 같은 2열 요약 칸) / `tone`(값 글자색): default·operation·performance·quality·production·electricity·gas. 진행 막대가 필요하면 MetricRow |
| Progress | `ui/progress`, `ui/metric-row` | Progress `size`: sm(8)·md(14) / `tone`: primary·operation(가동률)·production(생산량) / `showLabel`(md에서 막대 안 %). MetricRow `label`·`value`·`target`(md)·`percent`·`size`·`tone` — 지표 한 줄(sm = 라벨·값 한 줄, md = 라벨 위 + 값·목표 + % 막대) |
| Toggles · Spinners · Kbd | `ui/toggle`, `ui/toggle-group`, `ui/favorite-toggle`, `ui/spinner`, `ui/kbd` | Toggle `variant`: default·outline·solid·pill, `size`: default·sm. FavoriteToggle(즐겨찾기 별) `pressed`·`onPressedChange`, 빈 별 ↔ 채운 별(amber), `aria-label` 필수(예: "생산 실적 등록 즐겨찾기 해제") |
| Tree · Chips · Page Tabs | `ui/tree`, `ui/filter-chip`, `ui/page-tabs` | Tree `nodes`·`selectedId`, PageTab `active`·`onClose`, PageTabBar `emptyText`(탭이 0개일 때 같은 줄에 안내, 기본 "열린 화면이 없어요") |
| Empty | `ui/empty` | 빈 화면 안내: `Empty` > `EmptyHeader`(`EmptyMedia` 아이콘 칸·선택, `EmptyTitle`, `EmptyDescription`) + `EmptyContent`(주 버튼 default 1개 + 보조 outline). 탭을 모두 닫은 화면, 즐겨찾기·목록이 빈 경우 |
| Layout | `ui/accordion`, `ui/toolbar`, `ui/resizable` | Resizable(칸 나누기·스플리터): `ResizablePanelGroup` `orientation`: horizontal(좌우)·vertical(위아래) → `ResizablePanel`(`defaultSize`·`minSize`, 문자열 "40%") + `ResizableHandle`(`withHandle`: 손잡이 표시). 그룹은 높이가 정해진 상자 안에 둔다 |
| Logo | `ui/logo` (`Logo`) | TWINVUE 글자 로고. 높이만 `className`으로 조절(기본 `h-12` = 48, 너비는 비율대로). 글자는 `text-foreground`, N의 파란 획은 브랜드 색 고정. 대시보드 상단 바 로고 칸에 쓴다. 모양·색을 바꾸거나 다시 그리지 않는다 |
| 03_Patterns | `blocks/site-header`, `blocks/page-heading`, `blocks/section-title`, `blocks/filter-bar`, `blocks/form-action-bar`, `blocks/status-legend`, `ui/form-table` | Show 옵션 = props 유무. StatusLegend = 설비 상태 범례(StatusBadge 5개, Run·Idle·Error·Maintenance·Offline). SectionTitle = 옆 칸(aside) 맨 위 제목 줄(`title`, `onBack`=뒤로가기, `status`=StatusBadge, `action`=오른쪽 버튼 — 넣은 것만 보임). 정보·조건 표 = `FormTable` > `FormTableRow` > `FormTableField`(`label`, `type`: text·control), 한 줄에 칸 1~2개 |

`button`의 `xs`·`icon-sm`, `badge`의 `ghost`·`link`, `avatar`의 `size`, `InputGroupButton`(입력칸 안 버튼, `size` xs·sm·icon-xs·icon-sm 모두)은 shadcn 호환용이며 디자인 파일에 없다. 새 화면에서는 쓰지 않는다. 입력칸 안에 버튼이 필요하면 1장 5번의 "없는 옵션"으로 보고 `InputGroup` 옆에 "디자인 필요" 칸을 둔다. 입력칸 안 글자·아이콘은 `InputGroupAddon`·`Kbd`만 쓴다.

### 배지 variant 고르기

먼저 나눈다: **설비·라인·공정의 가동 상태(가동·대기·오류·점검·꺼짐)와 판정(양호·유의·불량)은 `StatusBadge`**, 그 밖의 상태 표시(작업·요청 진행 상태, 영역 이름표 등)는 아래 표의 `Badge` variant다. 배지 색은 **뜻**으로 고른다. 디자인·이미지에 배지 색이 정해져 있으면 그 뜻에 맞는 variant를 쓴다.

| variant | 쓰는 때 | 예 |
|---|---|---|
| `default` | 상태가 없는 기본 이름표. 화면의 주 색(primary)과 같은 계열로 보여야 할 때 | 구분·분류 이름표 |
| `secondary` | `default`보다 약하게 보여야 하는 보조 이름표. `default`보다 눈에 띄면 안 된다. **쓰기 전에 사용자에게 묻는다**(한 화면에 배지가 많아 위계를 낮춰야 할 때만) | 부가 정보·개수 |
| `outline` | 디자인·이미지의 배지가 테두리 모양일 때만 | — |
| `info` | 안내·진행 중·현재 상태. 좋고 나쁨이 없는 상태 | 진행 중, 지금 보고 있는 항목 |
| `success` | 긍정 결과 | 완료, 승인 |
| `warning` | 확인·검토가 필요하지만 아직 실패는 아닌 것 | 주의, 검토 필요 |
| `destructive-subtle` | 실패·문제. **기본은 이것** | 실패, 반려, 문제가 발생한 항목 |
| `destructive` | `destructive-subtle`과 뜻이 같고 더 강하게 보인다(진한 바탕). 즉시 조치가 필요한 것 하나만 도드라지게 할 때만 쓰고, 표·목록에 반복되는 배지에는 쓰지 않는다 | 긴급 정지 요청 |

- **강도 규칙:** 진한 바탕(`default`·`destructive`)은 강조, 연한 바탕(상태 4개)은 표시다. 표·목록처럼 같은 배지가 여러 번 나오면 연한 바탕을 쓴다.
- **실패는 warning이 아니다:** 이미 실패·문제면 `destructive-subtle`, 아직 확인이 필요한 단계면 `warning`이다.
- **한 화면 안에서 같은 뜻 = 같은 variant:** 같은 상태에 다른 색을 섞지 않는다.
- **색만으로 구분하지 않는다:** 배지에는 항상 상태 글자를 쓴다(7장 6번).
- **설비·공정 가동 상태와 판정은 `StatusBadge`, 그 밖의 상태는 `Badge` variant.** 같은 화면에서 둘을 섞어도 되지만, 같은 뜻을 두 부품으로 나눠 쓰지 않는다.

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

- 사이드바는 `Sidebar` 구조 그대로: `SidebarHeader` 안에 `SidebarBrand`(접혀도 넣는다. 머리 칸 64) → `SidebarContent` → `SidebarGroup`(펼침일 때 `SidebarGroupLabel`) → `SidebarMenu` → `SidebarMenuItem` → `SidebarMenuButton`(`tooltip`에 메뉴명) → `SidebarFooter`(`NavUser`, 필요할 때만).
- 설정 메뉴는 `SidebarFooter`(맨 아래 고정)에 두지 않고 메뉴 목록(`SidebarMenu`) 맨 끝 항목으로 둔다. 하위 화면(예: 설정 › 즐겨찾기 관리)은 그 항목의 `SidebarMenuSub`로 단다. `SidebarFooter`는 `NavUser`처럼 사용자 정보만 둔다.
- 사이드바 간격은 부품 기본값을 쓴다(메뉴 사이 8, 하위 메뉴 사이 6, 그룹 사이 8, 버튼 32, 접힘 때 아이콘 가운데). `className`으로 gap·padding·높이를 바꾸지 않는다.
- 주요 버튼(`variant="default"`)은 화면 영역마다 하나. 나머지는 outline·secondary·ghost.
- 빈 상태: DataTable `emptyText`, 화면·영역 전체가 비면 `Empty` / 불러오는 중: `Skeleton`·`Spinner` / 오류: `Alert variant="destructive"` 또는 `toast.error`.
- 본문 높이 채우기(어드민 화면): 콘텐츠가 본문(`main`)보다 짧으면 마지막 줄 카드가 남은 높이를 채워 본문 아래 여백(`p-6`)까지 닿게 한다. 화면 아래에 빈 공간을 남기지 않는다. 카드 안 차트는 정해진 높이를 그대로 두고 카드 안에서 세로 가운데에 둔다. 대시보드 화면은 아래 "대시보드 › 패널 › 높이 채우기"를 따른다.

### 화면설계서(이미지)를 받았을 때 — 배치는 이미지 그대로 (반드시 지킨다)

부품 고르기는 이 문서(1장 "TNV에 없는 것이 필요할 때")를 따르고, **영역 나눔·상자 겹수·배치는 받은 이미지를 따른다.**

1. 영역을 나누는 방식, 상자 겹수, 배치 순서는 이미지 그대로 만든다. AI가 자기 판단으로 구조를 바꾸거나 상자를 덧씌우지 않는다. (예: "페이지 바탕이 회색이니 흰 판에 올린다"는 이유로 `Card`를 씌우지 않는다.)
2. **이미지에서 상자가 한 겹이면 화면에서도 한 겹이다.** 아래 부품은 이미 자체 테두리·바탕이 있으므로 `Card`로 다시 감싸지 않는다.
   - `DataTable` (표 칸 테두리 + 바탕), `FormTable` (테두리 + 바탕)
   - `Card`(`variant="panel"` 포함), `StatCard` (카드 자체)
   - `MenuTile` (바탕 + 그림자)
   - `FormActionBar` (위 테두리 + 바탕)
   - 상자가 하나 더 생기면 사용자는 다른 영역으로 읽는다. 묶음 단위와 위계가 흐려진다.
3. 대응 목록(1장 "TNV에 없는 것이 필요할 때")을 만들 때 부품마다 자체 테두리·바탕이 있는지 적고, 겹쳐 감싸는 곳이 없는지 확인한다. (예: "사용자 정보 표 → FormTable (자체 테두리, Card 안 씀)")
4. 이 문서의 UX 원칙(4장·7장)과 이미지 배치가 다르면 **배치·구조는 이미지가 우선**이다. UX·UI를 고치는 것은 사용자가 정해서 따로 요청한다. AI가 먼저 고치지 않는다.
5. 1장의 규칙은 그대로다. 설치된 TNV 부품만 쓰고, 없는 UI는 "디자인 필요" 칸(빨간 점선)으로 두고, 없는 옵션은 `className`으로 덮어써 만들지 않는다.

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
- 3D는 개발에서 따로 얹는다. 가운데 위쪽은 **빈 칸**(`data-slot="viewer-3d"`, `flex-1`)으로 둔다. 시안의 3D 이미지·위 라벨(#01, Furnace 등)은 코드에 넣지 않는다.
- 아래에 상태 범례(오른쪽 정렬)와 표 카드(접기 가능)를 둔다.

#### 패널
- 패널 안 카드는 `Card`(default) 그대로. 카드 안의 여백·간격은 덮어쓰지 않는다.
- **간격**: 패널 안 카드·항목 사이는 `gap-4`(16)로 통일한다. 왼쪽 = 패널 내용 칸 `flex flex-col gap-4`, 오른쪽 = `Accordion className="gap-4"` + 각 `AccordionItem className="not-last:mb-0"`(부품 기본 아래 여백 8을 빼고 gap으로 띄움).
- **접기**: 왼쪽 패널 제목줄 오른쪽에 접기 버튼(`Button variant="outline" size="icon"`, 아이콘 열림 `ChevronsLeft` · 닫힘 `ChevronsRight`, `aria-label` "패널 접기"/"패널 펼치기"). 이 버튼 하나로 **왼쪽 패널 · 오른쪽 패널 · 가운데 아래 표 카드를 함께 숨긴다**(3D 영역을 넓게 볼 때). 접히면 왼쪽에 펼치기 버튼만 남고, 상태 범례는 남긴다. 열림 상태는 화면(page)에 하나만 둔다.
- **높이 채우기**: 왼쪽 패널은 카드가 남는 높이를 나눠 채우고, 늘어난 만큼 차트가 커진다(차트 최소 높이는 TNV 기본값 유지). 화면이 낮으면 카드를 내용보다 줄이지 않고(`shrink-0`) 패널 안에서 스크롤한다. 오른쪽 패널에서 펼친 항목은 내용 높이만큼만 차지하고 남는 공간은 비워 둔다.
- **스크롤바**: 좌우 패널 안 스크롤은 화살표·바탕 없이 가는 둥근 막대(폭 6, 좌우 여백 2)만 보이고, **스크롤하는 동안에만** 나타났다가 멈추고 0.8초 뒤 사라진다. 막대 색 = `muted-foreground` 50%. **TNV 부품에는 아직 없다 → 디자이너에게 넘김.** 가열·압연 테스트 화면은 디자이너가 정한 이 모양대로 임시 구현(`.panel-scroll` + 스크롤 중 `data-scrolling`)해 둔 상태다. 새 화면에서 같은 모양을 새로 지어내지 않는다.

#### 상태 표시 (Run · Idle · Error · Maintenance · Offline)
- 상태 배지 = `StatusBadge`(`status` run·idle·error·maintenance·offline), 상태 범례 = `StatusLegend`, 표 칸·판정 표시(양호·유의·불량) = `StatusBadge size="sm"` + 문구. 가동 상태·판정은 `Badge` 상태 variant로 대신하지 않고, `Badge`에 색 클래스를 덧입혀 따로 만들지도 않는다. 그 밖의 상태 표시는 3장 "배지 variant 고르기"대로 `Badge` variant를 쓴다.
- 색(부품에 들어 있음): Run = `success` · Idle = `warning` · Error = `destructive` · Maintenance = `ees-maintenance` · Offline = `dark`, 모두 `-subtle` 바탕 · `-subtle-foreground` 글자.
- **카드 제목 앞 상태 막대는 TNV 부품에 아직 없다 → 디자이너에게 넘김.** 새 화면에서는 "TNV에 없는 것이 필요할 때" 순서대로 "디자인 필요" 칸으로 두고, 디자이너에게 요청하라고 안내한다.

#### 지표 색
- 가동률 = `tone="operation"`, 생산량 = `tone="production"`, 그 밖 진행률 = `primary`. 차트 계열 색도 `chart-operation`·`chart-production`·`chart-electricity` 등 지표 색을 쓴다.
- 지표 색은 묶음별로 쓴다. 에너지 묶음 = 연료 `fuel`·전력 `electricity`·탄소 `gas`, 설비 효율 묶음 = 가동 `operation`·성능 `performance`·품질 `quality`.
- **연료(`fuel`, #46B2FF)와 성능(`performance`, #108FFF)은 같은 파랑 계열이라 한 차트·한 범례에 같이 쓰지 않는다.** 꼭 같이 보여야 하면 디자이너에게 먼저 묻는다.
- 연료가 아닌 지표(예: 로압)에 연료색을 쓰지 않는다. 지표 색이 정해지지 않은 차트는 `tone="default"`.

## 5. 접근성

- 아이콘만 있는 버튼은 `aria-label`을 붙이고, 장식 아이콘은 `aria-hidden`.
- 포커스 링(`ring-alpha-ring-50`)·비활성(`opacity-50`)·오류(`aria-invalid`) 표시를 지우지 않는다.
- 라벨은 `Label htmlFor` 또는 `FieldLabel`로 연결한다. 표의 체크박스에는 `aria-label`.
- 대비: 본문 4.5:1 이상. `muted-foreground` 글자를 `muted` 바탕 위에 작게 쓰지 않는다.

## 6. 한글 글자·문구

### 글자 배치

1. 한글에 `break-all`을 쓰지 않는다. 글자 단위로 끊겨서 "등록했 / 어요"처럼 읽기 어려워진다.
2. LOT 번호·품목 코드·URL처럼 띄어쓰기 없이 긴 값만 칸 안에서 줄바꿈을 허용한다. 넘치는 값에만 `wrap-anywhere`를 쓴다.
3. 한글에 기울임꼴(`italic`)을 쓰지 않는다. 강조가 필요하면 굵기나 색 토큰을 쓴다.
4. 숫자는 천 단위 쉼표(1,250 EA)를 쓰고, 한 화면에서는 같은 방식으로 맞춘다. 표의 숫자 열은 `tabular-nums`를 쓴다.
5. 글자는 12px(`text-xs`)보다 작게 쓰지 않는다.
6. 버튼·배지·탭(`Button`·`Badge`·`StatusBadge`·`TabsTrigger`) 글자는 항상 한 줄로 다 보여야 한다. 부품에 한 줄 고정(`whitespace-nowrap`)과 줄어들지 않음(`shrink-0`)이 들어 있다.
   - 이 부품과 바로 감싼 칸에 다음을 쓰지 않는다: `min-w-0`, `truncate`, `overflow-hidden`, `whitespace-normal`, `max-w-*`, `w-[…]`, `basis-0`, 글자 크기 덮어쓰기(`text-xs` 등).
   - 버튼을 2개 이상 가로로 둘 때 `grid-cols-2`·`grid-cols-3` 같은 같은 폭 격자나 `1fr` 칸에 넣지 않는다. 글자 길이와 상관없이 **항상** `flex flex-wrap gap-2`로 두고, 넘치면 다음 줄로 내려가게 한다.
   - 오른쪽 끝에 고정할 버튼(접기 등)이 있으면 `flex items-start gap-2` 안에 `flex flex-1 flex-wrap gap-2` 묶음과 그 버튼을 나란히 둔다.
   - 글자 내용과 글자 크기는 바꾸지 않는다. 줄임말·아이콘만 남기기·영어로 바꾸기도 하지 않는다. 디자인·이미지에 적힌 문구는 그대로다.
7. 보여 주기만 하는 글자(카드 제목·이름·표 칸)가 칸보다 길면 `truncate`로 말줄임하고, 같은 요소에 `title`로 전체 글자를 넣는다. 누르는 요소(6번)에는 이 방법을 쓰지 않는다.

### 문구

아래 규칙은 **AI가 새로 쓰는 문구에만** 적용한다(알림, 빈 화면, 오류, 확인 팝업). 디자인이나 이미지에 적힌 문구는 그대로 쓴다.

8. 맞춤법을 지킨다. 돼요 / 됐어요 / 할게요 / 며칠 (✕ 되요, 됬어요, 할께요, 몇일)
9. 띄어쓰기를 지킨다. 할 수 있어요 / 등록할 때 / 작업 중이에요
10. 버튼 이름 끝에는 마침표를 찍지 않는다. "저장" (✕ "저장.")
11. 오류 문구에는 무슨 일이 생겼는지와 지금 할 일을 같이 쓴다. "LOT 번호가 이미 등록돼 있어요. 다른 번호를 입력해 주세요." (✕ "오류가 발생했습니다")
12. 버튼 이름은 누르면 일어나는 일로 쓴다. 실적 등록 / 작업 시작 / 닫기 (✕ 확인, 예)
13. 한 문장에는 한 가지 내용만 쓴다.
14. 쉬운 말로 쓴다. 금일 → 오늘, 익일 → 다음 날. 단, 공정·실적·LOT·설비 같은 업무 용어는 그대로 둔다.
15. 데이터가 아니라 사용자가 한 일로 쓴다. "실적을 등록했어요" (✕ "실적 데이터가 생성되었습니다")
16. 같은 내용이면 할 수 있는 쪽으로 쓴다. "작업 시작 후에 수정할 수 있어요" (✕ "작업 시작 전에는 수정할 수 없어요")
17. 사물은 높이지 않는다. "결과가 나왔어요" (✕ "결과가 나오셨습니다")
18. 겁주거나 탓하는 문구를 쓰지 않는다. (✕ "잘못 입력하셨습니다", "데이터가 모두 사라집니다!")
19. 느낌표는 거의 쓰지 않고, 오류 문구에는 쓰지 않는다.
20. 이미지 대체 텍스트에 "이미지", "사진"을 넣지 않는다. "설비 3호기 정면" (✕ "설비 3호기 이미지")
21. 확인 팝업의 버튼은 질문에 맞는 동작으로 쓴다. "삭제할까요?" → [취소] [삭제] (✕ [아니요] [예])

## 7. 화면 완성도

TNV로 화면을 만들 때마다 따로 시키지 않아도 이 장을 함께 지킨다. **판단 기준은 이 문서다.** 다른 디자인 점검 규칙이나 도구와 부딪히면 이 문서가 우선이고, TNV 부품의 모양·동작 자체는 고칠 대상이 아니다.

### 만들지 않는 것 (근거 없는 장식)

1. 장식용 그라디언트, 빛 번짐, 흐린 원, 그라디언트 글자를 넣지 않는다. 화면 코드에서 새로 넣는 것만 해당하고, TNV 부품에 들어 있는 반투명 패널(`Card variant="panel"`)·그라디언트 차트(`ChartBarGradient` 등)는 그대로 둔다.
2. 제목마다 아이콘 상자를 붙이지 않는다. 카드 왼쪽 색 띠는 상태·선택을 나타낼 때만 쓴다.
3. 설명 문단을 카드 여러 개로 쪼개지 않는다. 카드 안에 카드는 받은 이미지에 그렇게 있을 때만 쓰고, 자체 테두리가 있는 부품(`DataTable`·`FormTable` 등)을 `Card`로 다시 감싸지 않는다(4장 "화면설계서(이미지)를 받았을 때"). 4장의 `SectionCards`(StatCard)·`Card variant="panel"`·차트 카드·MenuTile처럼 TNV가 정한 카드 배치는 그대로 쓴다.
4. 순서가 없는 내용에 01·02·03 같은 번호를 붙이지 않는다.
5. 받은 자료에 없는 수치·기능·효과를 지어내지 않는다. "혁신적인", "강력한" 같은 꾸밈말을 쓰지 않는다. 예시 데이터는 실제 업무 데이터 모양(품목명·LOT·수량·날짜)으로 채운다.
6. 색은 토큰 역할대로만 쓴다. 상태 색(destructive·success 등)은 상태를 나타낼 때만 쓴다. 상태는 색만으로 구분하지 않고 글자(Badge 문구 등)를 함께 쓴다.
7. 같은 주요 버튼을 영역마다 반복하지 않는다. 버튼 이름과 누른 뒤 실제로 일어나는 일이 같아야 한다.
8. 긴 설정, 비교, 여러 단계 작업은 `Dialog`에 넣지 않고 화면으로 만든다. `Dialog`는 짧은 입력·확인에만 쓴다.

### 조작감 (화면 코드에서 직접 넣는 것만)

9. 움직임은 TNV 부품에 들어 있는 것만 쓴다. 화면 코드에서 등장 효과(차례로 나타나기, 튀기, 떠오르기)를 새로 넣지 않는다. 꼭 필요하면 `transform`·`opacity`만, 300ms 이하로 하고 `motion-reduce:` 대응을 같이 넣는다. `transition-all`은 쓰지 않는다.
10. 데이터를 보여 주는 영역은 내용이 있을 때만 만들지 않는다. 비었을 때·불러오는 중·오류 상태도 같이 만든다. 빈 화면·오류에는 다음에 할 일(버튼이나 안내)을 둔다.
11. 불러오는 중에는 모양을 아는 곳은 `Skeleton`을 쓴다. `Spinner`는 오래 걸리는 작업에만 쓴다.
12. 이미지·차트 자리는 높이나 비율을 먼저 정해 둔다. 불러온 뒤 화면이 밀리지 않게 한다.
13. 입력 검사는 칸을 벗어날 때 처음 하고, 오류가 난 칸은 고치는 즉시 오류를 지운다.
14. 삭제처럼 되돌릴 수 없는 일의 확인은 `AlertDialog`를 쓴다. 입력 중인 `Dialog`는 바깥을 눌러도 닫히지 않게 한다(`DialogContent`의 `onInteractOutside`).

### 다 만든 뒤 점검

화면을 다 만들면 결과를 알리기 전에 직접 만든 화면 코드를 아래 항목으로 **하나씩 찾아보고**, 걸린 것은 고친 뒤 알린다. 눈으로 훑고 "통과"라고 쓰지 않는다. 항목마다 실제로 코드에서 찾아본 방법(검색한 글자·클래스)을 근거로 남긴다.

1. **값 직접 쓰기 0개**: hex(`#`), `[`…`px]`·`[`…`]` 임의 값(예: `flex-[1_1_180px]`, `w-[312px]`), `style={{}}` 안 숫자
2. **부품 덮어쓰기 0개**: TNV 부품에 붙인 `className`에 크기·글자·둥글기·정렬을 바꾸는 클래스(예: `CardTitle className="text-2xl"`, `Button className="w-full justify-between"`)
3. **덮어쓴 조립·빠진 요소 0개**: 부품을 덮어써서 만든 모양 0개(조합은 덮어쓰기 없이만). 이미지 요소 수 = 화면에 만든 것(부품 조합 포함) + "디자인 필요" 칸 (1장 2번의 3·3번·5번). 차트 축·점선·알림 점처럼 작은 것 포함. 부품 조합으로 만든 것은 "TNV에 없음" 목록에 "조합으로 만듦"으로 적었는지 본다. "디자인 필요" 칸마다:
   - "그 부품의 같은 위치 칸 + 다른 TNV 부품으로 표현할 수 있나"를 한 번 더 확인하고, 확인한 칸 이름을 점검표 근거에 적는다.
   - "필수 한 줄"(가장 가까운 부품 + 안 되는 이유)이 있고, 그 이유가 역할 기준(모양·색·크기·개수·배치 아님)이다.
   - 역할별 대응표(1장)에 있는 역할을 "없음"으로 둔 곳 0개.
4. **규격 아닌 크기 0개**: `size="xs"`·`"icon-sm"`·`"icon-xs"`, `InputGroupButton` (3장)
5. **사이드바 구조**: 설정·도움말 같은 메뉴가 `SidebarFooter`에 없음 (4장)
6. **버튼 동작**: 버튼마다 이름과 실제 동작이 같음. 복사 버튼은 실제로 복사(`navigator.clipboard`), 내려받기는 실제 파일 (7장 7번)
7. **지어낸 것 0개**: 기간·필터를 바꿀 때 받은 데이터에 없는 숫자를 계산해 만들지 않음(예: 주간 값 ×4로 월간 만들기) (7장 5번). 위 1~8번(장식·아이콘 상자·순서 없는 번호·꾸밈말 등)에 걸리는 곳 0개
8. **데이터 영역 상태**: 표뿐 아니라 지표 카드·차트·목록까지 데이터를 보여 주는 영역마다 빈·불러오는 중·오류 상태가 있음 (7장 10번)
9. **상자 겹수**: 이미지보다 상자 겹수가 많은 곳 0개 (자체 테두리 부품을 `Card`로 감싼 곳 0개)
10. **움직임·한글**: 9번(움직임)과 6장(한글) 위반 0개, 버튼·배지·탭과 바로 감싼 칸에 6장 6번의 금지 클래스 0개, 버튼 묶음은 전부 `flex-wrap`

보고 끝에는 한 줄 요약 대신 아래 형식의 점검표를 붙인다. 항목마다 **통과 / N개 고침 / 못 고침** 중 하나와 근거를 적는다. 맨 끝에 "디자인 필요 N곳 — 전부 역할 기준 확인"을 한 줄 적는다(없으면 "디자인 필요 0곳").

```
점검
1. 값 직접 쓰기: 통과 — "#", "px]", "style={{" 검색 0건
2. 부품 덮어쓰기: 2개 고침 — CardTitle text-2xl 삭제, Button w-full 삭제
3. 덮어쓴 조립·빠진 요소: 2개 고침 — 차트 세로축·알림 점 → "디자인 필요" 칸. 채팅 메시지 = Card·Button 조합(덮어쓰기 없음, 목록에 "조합으로 만듦"). StatCard 아이콘은 같은 위치 칸 없음(label·summary·detail 확인)
…
디자인 필요 3곳 — 전부 역할 기준 확인
```
