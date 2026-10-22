// Figma TNV v0.1 변수 → shadcn 레지스트리 foundations 항목 + 미리보기 앱 globals.css
// 원본: tokens/figma/*.txt (Figma에서 그대로 뽑은 값). 이름은 Figma 이름의 "/"를 "-"로만 바꾼다.
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const read = (f) =>
  readFileSync(join(root, "tokens/figma", f), "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))

// 1_Primitive · Color → --brand-500, --alpha-brand-700-90 …
const primitives = Object.fromEntries(
  read("primitive-color.txt").map((l) => {
    const [n, v] = l.split("=")
    return [n.replaceAll("/", "-"), v]
  })
)

// 2_Semantic · Color → shadcn 이름 규칙
// base/·border/ 그룹과, 이름이 그룹명으로 시작하는 항목은 그룹을 뗀다 (primary/primary → --primary)
// 그 밖은 그룹-이름 (alpha/overlay → --alpha-overlay, chart/gas → --chart-gas)
const semName = (n) => {
  const [group, leaf] = n.split("/")
  if (group === "base" || group === "border" || leaf.startsWith(group)) return leaf
  return `${group}-${leaf}`
}
// 값은 Figma 참조를 끝까지 따라가 최종 hex로 푼다.
// (var(--brand-700) 형태로 두면 shadcn이 색으로 인식하지 못해 개발자 CSS의 @theme에 --primary: var(--primary) 같은 자기 참조 줄을 남긴다)
const resolveColor = (v) => {
  const m = v.match(/^\{(.+)\}$/)
  if (!m) return v
  const key = m[1].replaceAll("/", "-")
  if (!(key in primitives)) throw new Error(`알 수 없는 참조: ${v}`)
  return resolveColor(primitives[key])
}
const light = {}
const dark = {}
for (const l of read("semantic-color.txt")) {
  const [n, v] = l.split("=")
  const [lv, dv] = v.split("|")
  light[semName(n)] = resolveColor(lv)
  dark[semName(n)] = resolveColor(dv)
}

// 스케일 (간격·글자·둥글기)
const scales = {}
for (const l of read("scales.txt")) {
  if (!l.includes("=") || l.startsWith("shadow/")) continue
  const [n, v] = l.split("=")
  scales[n] = v
}
const px = (v) => `${v}px`
const resolve = (v) => {
  const m = v.match(/^\{(.+)\}$/)
  return m ? resolve(scales[m[1]]) : v
}

const theme = {
  "font-sans": '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  "font-heading": "var(--font-sans)",
  // 글자 크기: text-xs~4xl은 Tailwind 기본값과 Figma 값이 같아서 그대로 쓴다. 없는 것만 추가.
  "text-2xs": px(scales["font-size/2xs"]),
  "text-2xs--line-height": "1.4",
  ...Object.fromEntries(
    ["display-1", "display-2", "display-3", "display-4", "h1", "h2", "h3", "h4", "h5", "h6"].map((k) => [
      `text-${k}`,
      px(scales[`font-size/${k}`]),
    ])
  ),
  "leading-default": resolve(scales["leading/default"]),
  "leading-md": "var(--leading-default)",
  "container-layout": px(scales["layout/container"]),
  // 둥글기: Figma 2_Semantic · Radius 그대로
  ...Object.fromEntries(
    ["none", "px", "3xs", "2xs", "xs", "sm", "md", "lg", "xl", "full"].map((k) => [
      `radius-${k}`,
      px(resolve(scales[`radius/${k}`])),
    ])
  ),
  // 그림자: Figma effect styles
  "shadow-2xs": "0 1px 0 0 #0000000d",
  "shadow-xs": "0 1px 2px 0 #0000000d",
  "shadow-sm": "0 1px 3px 0 #0000001a, 0 1px 2px -1px #0000001a",
  "shadow-md": "0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a",
  "shadow-lg": "0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a",
  "shadow-xl": "0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a",
  // TNV 추가: 대시보드 패널·상단 바·주 버튼 빛
  "shadow-panel": "0 4px 20px 0 #00000026",
  "shadow-header": "0 4px 10px 0 #00000026",
  "shadow-primary-glow": "0 1px 4px 0 #4e9fff33",
  ...Object.fromEntries(Object.keys(light).map((k) => [`color-${k}`, `var(--${k})`])),
}

const lightVars = { ...primitives, radius: px(resolve(scales["radius/md"])), ...light }

const css = {
  '@import "tw-animate-css"': {},
  '@import "shadcn/tailwind.css"': {},
  '@import "pretendard/dist/web/variable/pretendardvariable.css"': {},
  "@custom-variant dark (&:is(.dark *))": {},
  "@layer base": {
    "*": { "@apply border-border outline-ring/50": {} },
    body: { "@apply bg-background text-foreground": {} },
    html: { "@apply font-sans": {} },
  },
}

// registry.json의 tnv-foundations 항목 갱신
const regPath = join(root, "registry.json")
const registry = JSON.parse(readFileSync(regPath, "utf8"))
const item = {
  name: "tnv-foundations",
  type: "registry:style",
  title: "TNV Foundations",
  description: "TNV Design System 토큰(Figma TNV Design System 기준) — 색(라이트·다크), 간격, 글자, 둥글기, 그림자",
  dependencies: ["pretendard@1.3.9", "tw-animate-css@1.4.0", "shadcn@4.22.1"],
  cssVars: { theme, light: lightVars, dark },
  css,
}
registry.items = [item, ...registry.items.filter((i) => i.name !== "tnv-foundations")]
writeFileSync(regPath, JSON.stringify(registry, null, 2) + "\n")

// 미리보기 앱 globals.css (같은 값으로 생성)
const block = (sel, obj) => `${sel} {\n${Object.entries(obj).map(([k, v]) => `  --${k}: ${v};`).join("\n")}\n}\n`
const out = `/* 자동 생성: scripts/build-tokens.mjs — 직접 고치지 말고 tokens/figma/*.txt를 고친 뒤 npm run tokens */
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "pretendard/dist/web/variable/pretendardvariable.css";

@custom-variant dark (&:is(.dark *));

${block("@theme inline", theme)}
${block(":root", lightVars)}
${block(".dark", dark)}
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans;
  }
}
`
writeFileSync(join(root, "app/globals.css"), out)
console.log(
  `primitives ${Object.keys(primitives).length} · semantic ${Object.keys(light).length} · theme ${Object.keys(theme).length}`
)
