// "AI로 설치하기" 페이지 글·프롬프트. 문구를 고칠 때는 이 파일만 연다.

import pkg from "../../../package.json"

// 버전은 package.json 한 곳에서만 관리한다
export const VERSION = pkg.version

// 배포 때 워크플로가 NEXT_PUBLIC_REGISTRY_BASE를 넣는다. 로컬은 미리보기 주소.
export const REGISTRY_BASE = process.env.NEXT_PUBLIC_REGISTRY_BASE ?? "https://xowns956-boop.github.io/tnv-registry"

export const itemUrl = (name: string) => `${REGISTRY_BASE}/r/${VERSION}/${name}.json`

// TNV는 radix 기반. shadcn 기본값(base)으로 초기화하면 asChild가 render로 바뀌어 빌드가 깨진다.
export const initCommand = "npx shadcn@latest init -b radix -p nova -y"

export const installCommand = `npx shadcn@latest add ${itemUrl("tnv-foundations")} ${itemUrl("tnv")}`

export const rulesBlock = `## Design system: TNV v${VERSION}

사용자가 "디자인 시스템 써", "TNV 써", "TNV 디자인 시스템 써", "use the design system"이라고 하면 docs/tnv.md를 먼저 읽고 그 규칙대로 만든다.

- 설치된 부품(\`components/ui\`, \`components/blocks\`)만 조립한다. TNV에 없는 부품은 새로 만들지 말고 없다고 알린다.
- 색·간격·둥글기는 토큰 클래스만 쓴다. hex·px 값을 직접 쓰지 않는다.
- 다크가 기본이다. 새 화면에 라이트/다크 테마 전환 버튼은 두지 않는다(나중에 기능으로 추가 예정). 색은 시맨틱 토큰만 쓴다.
- 부품 파일(\`components/\`)은 고치지 않는다. 고쳐야 하면 먼저 알린다.
- TNV 버전을 마음대로 올리지 않는다. 올릴 때는 업데이트 기록(${REGISTRY_BASE}/docs/changelog/)을 먼저 보고, 직접 고친 부품은 비교한 뒤 바꾼다. 바꾼 내용은 docs/tnv-adoption.md에 적는다.`

export const setupPrompt = `TNV 디자인 시스템(v${VERSION})을 이 프로젝트에 설치해 줘.
나는 개발을 잘 모르니까 필요한 건 알아서 진행하고, 끝나면 쉬운 말로 알려 줘.

## 0. 꼭 지킬 것
- 아래 설치 주소가 열리지 않으면(404·연결 실패 등) 바로 멈추고 알려 줘. 비슷한 부품을 지어내거나 shadcn 기본 부품으로 대신 설치하거나, 설치했다고 말하지 마.
- 설치·빌드·확인 화면 중 하나라도 실패하면 완료라고 말하지 마. 어디서 왜 실패했는지 그대로 알려 줘.
- 프레임워크 교체, React·Next.js·Tailwind CSS 같은 주요 의존성 업그레이드는 나한테 묻기 전에 하지 마.
- \`--overwrite\` 옵션은 쓰지 마. 덮어쓸지는 2번 규칙대로 하나씩 판단해.

## 1. 프로젝트 확인
- 이 폴더에 package.json이 없으면: Next.js(App Router · TypeScript · Tailwind CSS v4 · ESLint, src 폴더 없이) 프로젝트를 이 폴더에 새로 만들고 shadcn을 초기화해.
- React + Tailwind CSS v4 프로젝트인데 components.json이 없으면 shadcn 초기화만 해.
- shadcn 초기화는 반드시 radix 방식으로: \`${initCommand}\` (TNV 부품은 radix 기반이야. 기본값 base 방식으로 초기화하면 설치 후 빌드가 깨져.)
- 이미 components.json이 있는데 "style"이 "base-"로 시작하면 설치하지 말고, radix 방식이 아니라서 안 된다고 알려 줘.
- Tailwind CSS v3 이하이거나 React 프로젝트가 아니면 설치하지 말고, 왜 안 되는지 알려 줘.
- Node.js가 없어서 npx가 안 되면 멈추고, https://nodejs.org 에서 LTS 버전을 설치하라고 알려 줘.

## 2. 설치
아래 명령을 그대로 실행해. tnv-foundations(색·글자 토큰)는 꼭 같이 설치해야 해.

${installCommand}

- 기존 파일을 덮어쓸지 물어보면: shadcn 기본 상태 그대로인 파일은 덮어써도 돼. 누가 손댄 흔적이 있는 파일이면 덮어쓰기 전에 나한테 물어봐.

## 3. 앱에 연결
app/layout.tsx를 이렇게 맞춰 줘.
- <html lang="ko" suppressHydrationWarning>
- <body className="bg-page-background text-foreground">
- 화면 전체를 ThemeProvider(@/components/theme-provider) → TooltipProvider(@/components/ui/tooltip) 순서로 감싸고, 그 안 맨 아래에 <Toaster />(@/components/ui/sonner)를 둬.

## 4. AI 규칙 저장
프로젝트 맨 위 CLAUDE.md에 아래 블록을 추가해 줘(없으면 파일을 만들어). AGENTS.md가 있으면 거기에도 똑같이 추가해.

${rulesBlock}

## 5. 설치 기록
docs/tnv-adoption.md 파일을 만들어서 아래를 적어 줘.
- 설치한 TNV 버전: ${VERSION}
- 설치 주소: ${REGISTRY_BASE}/r/${VERSION}/
- 설치 날짜
- 덮어쓰지 않고 남겨 둔 파일, 이미 손댄 흔적이 있던 파일
- 3번에서 바꾼 파일
- 빌드·확인 화면 결과 (성공/실패)

## 6. 확인 화면
app/tnv-check/page.tsx에 확인용 화면을 만들어 줘. TNV 부품만 써서:
- PageHeading(제목 "TNV 설치 확인")
- Card variant="panel" 안에 TabsList variant="solid"(탭 2개), MetricRow 2줄(tone operation·production), 주 버튼 1개
그다음 빌드가 통과하는지 확인하고, 개발 서버를 켜서 열어 볼 주소(예: http://localhost:3000/tnv-check)를 알려 줘.

## 7. 끝나면 알려 줄 것
- 무엇을 설치·변경했는지 3줄 이내로
- 앞으로 이렇게 말하면 된다는 예시 2개 (예: "TNV 써서 설정 화면 만들어 줘")`

export const steps = [
  {
    title: "AI 도구로 프로젝트 폴더 열기",
    body: "Claude Code·Cursor 같은 AI 도구에서 작업할 폴더를 열어요. 아무것도 없는 빈 폴더여도 괜찮아요. AI가 프로젝트부터 만들어요.",
  },
  {
    title: "설치 프롬프트 붙여넣기",
    body: "위 버튼으로 복사한 글을 AI 채팅창에 그대로 붙여넣고 보내요. 파일 수정·설치 허락을 물어보면 허용해요.",
  },
  {
    title: "확인 화면 열어 보기",
    body: "AI가 알려 준 주소(예: localhost:3000/tnv-check)를 브라우저에서 열어요. 어두운 바탕에 패널·탭·막대가 보이면 설치 끝이에요.",
  },
]

export const examples = [
  "TNV 써서 가열로 모니터링 화면 만들어 줘. 왼쪽 패널에 설비 카드, 오른쪽 패널에 차트, 가운데는 3D 자리로 비워 둬.",
  "TNV 써서 이 이미지처럼 대시보드 만들어 줘. (이미지 첨부)",
  "TNV 써서 공장별 가동률·생산량을 MetricRow로 보여 주는 카드 만들어 줘.",
]

export const faqs = [
  {
    q: "“npx를 찾을 수 없다”고 나와요",
    a: "Node.js가 설치되지 않은 상태예요. nodejs.org에서 LTS 버전을 받아 설치한 뒤, AI 도구를 껐다 켜고 프롬프트를 다시 보내요.",
  },
  {
    q: "설치했는데 색이 기본 검정·회색이에요",
    a: "tnv-foundations(토큰)가 빠진 경우예요. AI에게 “tnv-foundations.json도 설치해 줘”라고 말해요.",
  },
  {
    q: "“파일을 덮어쓸까요?”라고 물어봐요",
    a: "처음 만든 프로젝트라면 덮어써도 괜찮아요. 이미 누가 고친 화면·부품이 있는 프로젝트라면 개발자에게 먼저 물어봐요.",
  },
  {
    q: "localhost 주소를 다른 사람에게 보냈는데 안 열린대요",
    a: "localhost는 내 컴퓨터 안에서만 열리는 주소예요. 다른 사람에게 보여 주려면 배포(Vercel 등)가 필요해요.",
  },
  {
    q: "설치는 됐는데 “render” 관련 오류가 나요",
    a: "radix가 아닌 base 방식으로 초기화된 프로젝트예요. 연습용이면 빈 폴더에서 다시 시작하고, 기존 프로젝트라면 개발자와 상의해요.",
  },
  {
    q: "“설치 주소가 열리지 않는다”며 AI가 멈췄어요",
    a: "TNV 저장소가 비공개로 바뀌었거나 인터넷 연결이 끊긴 경우예요. AI가 멈춘 게 맞는 동작이에요. TNV 담당 디자이너에게 주소가 열려 있는지 물어봐요.",
  },
  {
    q: "“Tailwind v3라서 안 된다”고 해요",
    a: "TNV는 Tailwind CSS v4 전용이에요. 기존 프로젝트를 올리는 건 개발자와 상의하고, 연습용이면 빈 폴더에서 새로 시작해요.",
  },
    {
    q: "UI 디자인을 만들지 못해요",
    a: "UI를 배포 중이거나 디자인을 만들고 있는 거예요 TNV Design은 Figma를 통해 관리가 되고 배포해요 디자이너에게 문의해 주세요.",
  },
]

// 처음 설치는 프롬프트가 편하고, 아래 경우엔 직접 설치가 낫다
export const manualCases = [
  { title: "이미 운영 중인 프로젝트에 넣을 때", body: "기존 부품·globals.css가 바뀌어요. 덮어쓸 파일을 하나씩 보고 고르고 싶으면 직접 설치해요." },
  { title: "부품 하나만 추가할 때", body: "Button 하나만 필요하면 명령 한 줄이 프롬프트 전체를 돌리는 것보다 빨라요." },
  { title: "자동화(CI·배포 스크립트)에 넣을 때", body: "사람 없이 돌아가는 과정에는 AI가 끼어들 수 없어서 명령이 필요해요." },
  { title: "AI 도구를 쓰지 않을 때", body: "터미널에서 명령을 직접 실행하는 방법밖에 없어요." },
  { title: "버전을 올릴 때", body: "다음 버전으로 바꿀 땐 업데이트 기록을 먼저 보고, 직접 고친 부품과 바뀐 내용을 비교하면서 하는 게 안전해요." },
]

export const componentGroups = [
  { name: "버튼", items: ["Button", "Button Group", "Menu Tile", "Toggle", "Toggle Group"] },
  { name: "입력", items: ["Input", "Textarea", "Input Group", "Number Input", "Number Stepper", "Checkbox", "Radio Group", "Switch", "Label", "Field"] },
  { name: "선택", items: ["Select", "Dropdown Menu", "Autocomplete", "Multi Select", "Combobox", "Command", "Date Picker", "Calendar"] },
  { name: "표시", items: ["Badge", "Avatar", "Tooltip", "Separator", "Skeleton", "Spinner", "Progress", "Metric Row", "Kbd", "Alert", "Toast"] },
  { name: "카드·표·차트", items: ["Card", "Stat Card", "Table", "Data Table", "Form Table", "Chart", "Chart Presets", "Chart Dashboard"] },
  { name: "팝업", items: ["Dialog", "Alert Dialog", "Dialog Body", "Sheet", "Popover"] },
  { name: "이동", items: ["Sidebar", "Sidebar Brand", "Nav User", "Tabs", "Page Tabs", "Breadcrumb", "Pagination", "Stepper", "Tree", "Filter Chip", "Accordion", "Toolbar"] },
  { name: "화면 패턴", items: ["Site Header", "Page Heading", "Filter Bar", "Form Action Bar"] },
]
