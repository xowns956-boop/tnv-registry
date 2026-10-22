// AI용 안내 파일 생성: public/llms.txt(요약 목차) · public/llms-full.txt(전체 참고서)
// 설치 전에도 AI가 이 주소를 읽고 TNV 규칙·부품·토큰을 알 수 있게 한다.
// 재료: package.json(버전) · registry.json(부품·토큰) · docs/tnv.md(규칙) · app/docs/changelog/changelog.json(변경 기록)
// 사용: REGISTRY_BASE=https://<주소> node scripts/build-llms.mjs  (registry.json을 먼저 만든 뒤 실행)
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const read = (p) => readFileSync(join(root, p), "utf8")
const json = (p) => JSON.parse(read(p))

const VERSION = json("package.json").version
const BASE = (process.env.REGISTRY_BASE || "http://localhost:3400").replace(/\/$/, "")
const registry = json("registry.json")
const changelog = json("app/docs/changelog/changelog.json")
const rules = read("docs/tnv.md")

const r = (name) => `${BASE}/r/${VERSION}/${name}.json`
const foundations = registry.items.find((i) => i.name === "tnv-foundations")
const parts = registry.items.filter((i) => !["tnv-foundations", "tnv"].includes(i.name))
// 부품 설명은 "TNV v0.1 · Figma "...")" 주석에서 왔다. Figma 위치만 남긴다.
const describe = (i) => i.description.replace(/^TNV v0\.1 · /, "")
const installCmd = `npx shadcn@latest add ${r("tnv-foundations")} ${r("tnv")}`

const summary = `> React + Tailwind CSS v4 + shadcn(radix) 기반 트윈뷰(공정 모니터링) 대시보드 디자인 시스템. Figma "TNV Design System"과 같은 이름·토큰을 쓴다. Pretendard Variable 글꼴, lucide 아이콘, 다크 기본(라이트 색도 포함, 전환 버튼은 아직 두지 않음). 현재 버전 ${VERSION}.`

const llms = `# TNV Design System

${summary}

설치 주소에는 버전이 들어 있다(/r/${VERSION}/). 같은 버전의 레지스트리 파일이 이 문서보다 우선한다.

## AI Reference

- [AI로 설치하기](${BASE}/docs/ai/): 설치 프롬프트(프로젝트 확인 → 설치 → 앱 연결 → 규칙 저장 → 설치 기록 → 확인 화면)
- [전체 참고서](${BASE}/llms-full.txt): 화면 규칙(docs/tnv.md 전문), 색 토큰 라이트·다크 값, 부품 목록과 설치 주소, 변경 기록

## 설치

- 전체: \`${installCmd}\`
- tnv-foundations(토큰)는 꼭 함께 설치한다. 빠지면 shadcn 기본 색이 남는다.
- shadcn은 radix 방식으로 초기화되어 있어야 한다(\`npx shadcn@latest init -b radix -p nova -y\`).
- 설치 주소가 열리지 않으면 멈추고 사람에게 알린다. 비슷한 부품을 지어내지 않는다.

## Docs

- [부품 미리보기](${BASE}/): 모든 부품을 라이트·다크로 보는 화면
- [변경 기록](${BASE}/docs/changelog/): 버전별로 추가·바뀐 점, 업데이트할 때 주의할 점
- [레지스트리 목록](${BASE}/r/${VERSION}/registry.json): 설치할 수 있는 항목 ${registry.items.length}개

## 부품

${parts.map((i) => `- [${i.name}](${r(i.name)}): ${describe(i)}`).join("\n")}
`

// 색 토큰: 라이트·다크 둘 다 있는 역할 색만 (원본 팔레트는 뺀다)
const light = foundations.cssVars.light
const dark = foundations.cssVars.dark
const tokenRows = Object.keys(dark)
  .map((k) => `| ${k} | ${light[k]} | ${dark[k]} |`)
  .join("\n")

const changelogText = changelog
  .map(
    (rel) =>
      `### ${rel.version} (${rel.date})\n\n${rel.summary}\n\n` +
      rel.groups.map((g) => `${g.title}\n${g.items.map((it) => `- ${it}`).join("\n")}`).join("\n\n")
  )
  .join("\n\n")

const full = `# TNV Design System — 전체 참고서

${summary}

이 파일은 AI가 TNV로 화면을 만들 때 읽는 참고서다. 설치된 프로젝트에서는 docs/tnv.md가 같은 규칙을 담고 있다.

## 설치

\`\`\`
${installCmd}
\`\`\`

- 부품 하나만: \`npx shadcn@latest add ${r("<이름>")}\`
- 앱 최상위: ThemeProvider(@/components/theme-provider) → TooltipProvider → 화면 + <Toaster />. <body className="bg-page-background text-foreground">
- 설치 기록은 프로젝트의 docs/tnv-adoption.md에 남긴다(버전·주소·덮어쓰지 않은 파일·직접 고친 부품).
- 설치 주소가 열리지 않거나 빌드가 실패하면 완료라고 말하지 않는다.

## 화면 규칙 (docs/tnv.md 전문)

${rules.replace(/^# .*\n/, "")}

## 색 토큰 (역할 색 ${Object.keys(dark).length}개)

Tailwind 클래스로 쓴다: bg-<이름>, text-<이름>, border-<이름>. hex를 직접 쓰지 않는다.

| 이름 | 라이트 | 다크 |
|---|---|---|
${tokenRows}

## 부품 (${parts.length}개)

${parts.map((i) => `- ${i.name} (${i.type.replace("registry:", "")}): ${describe(i)} — ${r(i.name)}`).join("\n")}

## 변경 기록

${changelogText}
`

writeFileSync(join(root, "public/llms.txt"), llms)
writeFileSync(join(root, "public/llms-full.txt"), full)
console.log(`llms.txt ${llms.length}자 · llms-full.txt ${full.length}자 · base ${BASE} · v${VERSION}`)
