"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { ArrowLeftIcon, CheckIcon, CopyIcon, InfoIcon, MoonIcon, SparklesIcon, SunIcon } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  componentGroups,
  examples,
  faqs,
  initCommand,
  installCommand,
  itemUrl,
  manualCases,
  setupPrompt,
  steps,
  VERSION,
} from "./content"

// 클립보드 권한이 막힌 브라우저(사내 브라우저·앱 안 웹뷰)는 예전 방식으로 한 번 더 시도
function legacyCopy(text: string) {
  const el = document.createElement("textarea")
  el.value = text
  el.setAttribute("readonly", "")
  el.className = "fixed -left-full opacity-0"
  document.body.appendChild(el)
  el.select()
  const ok = document.execCommand("copy")
  el.remove()
  if (!ok) throw new Error("copy failed")
}

function useCopy() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const copy = async (key: string, text: string, message = "복사했어요") => {
    try {
      try {
        await navigator.clipboard.writeText(text)
      } catch {
        legacyCopy(text)
      }
      setCopied(key)
      toast.success(message)
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 2000)
    } catch {
      toast.error("복사하지 못했어요. 다른 브라우저에서 다시 시도해 주세요.")
    }
  }
  return { copied, copy }
}

function CopyIconButton({ label, done, onClick }: { label: string; done: boolean; onClick: () => void }) {
  return (
    <Button variant="ghost" size="icon" aria-label={label} onClick={onClick}>
      {done ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
    </Button>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-md border border-border bg-muted p-4 font-mono text-xs whitespace-pre-wrap break-all text-foreground">
      {children}
    </pre>
  )
}

export default function InstallWithAI() {
  const { resolvedTheme, setTheme } = useTheme()
  const { copied, copy } = useCopy()
  const copyPrompt = () => copy("prompt", setupPrompt, "설치 프롬프트를 복사했어요. AI 채팅창에 붙여넣어 주세요.")

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 py-10 sm:px-8">
      <nav className="flex items-center justify-between gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeftIcon aria-hidden="true" />
            부품 미리보기
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/docs/changelog">업데이트 기록</Link>
          </Button>
          <Button
          variant="outline"
          size="icon"
          aria-label="테마 전환"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          <SunIcon className="dark:hidden" aria-hidden="true" />
          <MoonIcon className="hidden dark:block" aria-hidden="true" />
          </Button>
        </div>
      </nav>

      {/* 첫 화면: 버튼 하나로 끝나게 */}
      <header className="flex flex-col gap-4">
        <Badge variant="outline">TNV Design System v{VERSION}</Badge>
        <h1 className="text-4xl font-bold text-foreground">AI로 설치하기</h1>
        <p className="text-base text-muted-foreground">
          명령어를 몰라도 괜찮아요. 아래 버튼으로 설치 프롬프트를 복사해서 AI에게 보내면, AI가 프로젝트를 살펴보고 TNV를 설치한 뒤
          규칙까지 저장해요.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button size="lg" onClick={copyPrompt}>
            {copied === "prompt" ? <CheckIcon aria-hidden="true" /> : <SparklesIcon aria-hidden="true" />}
            {copied === "prompt" ? "복사했어요" : "설치 프롬프트 복사"}
          </Button>
        </div>
      </header>

      <section aria-labelledby="steps" className="flex flex-col gap-4">
        <h2 id="steps" className="text-2xl font-semibold text-foreground">
          3단계면 끝나요
        </h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Card className="h-full">
                <CardHeader>
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <CardTitle>{s.title}</CardTitle>
                  <CardDescription>{s.body}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ol>
        <Alert>
          <InfoIcon aria-hidden="true" />
          <AlertTitle>AI에게 허락이 필요해요</AlertTitle>
          <AlertDescription>
            설치하는 동안 AI가 파일을 만들고 프로그램을 내려받아요. 허락을 물어보면 허용해 주세요. localhost 주소는 내 컴퓨터에서만 열려요.
          </AlertDescription>
        </Alert>
      </section>

      <section aria-labelledby="after" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 id="after" className="text-2xl font-semibold text-foreground">
            설치한 다음엔 이렇게 말해요
          </h2>
          <p className="text-sm text-muted-foreground">
            문장 앞에 <strong className="font-semibold text-foreground">“TNV 써서”</strong>를 붙이면 AI가 저장된 규칙과 설치된 부품만 써서 만들어요.
          </p>
        </div>
        <ul className="flex flex-col gap-2">
          {examples.map((e, i) => (
            <li key={e} className="flex items-center gap-3 rounded-md border border-border bg-card py-2 pr-2 pl-4">
              <span className="flex-1 text-sm text-card-foreground">{e}</span>
              <CopyIconButton label="예시 문장 복사" done={copied === `ex-${i}`} onClick={() => copy(`ex-${i}`, e)} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="faq" className="flex flex-col gap-4">
        <h2 id="faq" className="text-2xl font-semibold text-foreground">
          자주 막히는 곳
        </h2>
        <Accordion type="single" collapsible>
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section aria-labelledby="components" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 id="components" className="text-2xl font-semibold text-foreground">
            들어 있는 부품
          </h2>
          <p className="text-sm text-muted-foreground">
            Figma <span className="text-foreground">TNV Design System</span>과 같은 이름이에요. 여기 없는 부품은 AI가 새로 만들지 않고 없다고
            알려 줘요.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {componentGroups.map((g) => (
            <Card key={g.name} size="sm">
              <CardHeader>
                <CardTitle>{g.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <Badge key={it} variant="secondary">
                    {it}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="manual" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 id="manual" className="text-2xl font-semibold text-foreground">
            개발자용: 직접 설치
          </h2>
          <p className="text-sm text-muted-foreground">
            React + Tailwind CSS v4 프로젝트에서 <strong className="font-semibold text-foreground">radix 방식</strong>으로 초기화한 뒤
            실행해요(<code className="font-mono text-foreground">{initCommand}</code>). 기존 부품·전역 스타일이 바뀌니 적용 전에 변경 내용을 확인해요.
          </p>
        </div>
        <Card size="sm">
          <CardHeader>
            <CardTitle>이럴 땐 직접 설치가 나아요</CardTitle>
            <CardDescription>처음 설치는 개발자도 프롬프트 복사가 편해요. 아래 경우만 직접 설치해요.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-3">
              {manualCases.map((c) => (
                <li key={c.title} className="flex gap-2 text-sm">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary-text" aria-hidden="true" />
                  <span className="flex flex-col gap-0.5">
                    <span className="font-medium text-card-foreground">{c.title}</span>
                    <span className="text-muted-foreground">{c.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Tabs defaultValue="npm">
          <TabsList>
            <TabsTrigger value="npm">npm</TabsTrigger>
            <TabsTrigger value="pnpm">pnpm</TabsTrigger>
          </TabsList>
          {(["npm", "pnpm"] as const).map((pm) => {
            const cmd = pm === "npm" ? installCommand : installCommand.replace(/^npx/, "pnpm dlx")
            return (
              <TabsContent key={pm} value={pm} className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <CodeBlock>{cmd}</CodeBlock>
                  </div>
                  <CopyIconButton label="설치 명령 복사" done={copied === pm} onClick={() => copy(pm, cmd)} />
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-muted-foreground">
          <li>
            <code className="font-mono text-foreground">tnv-foundations.json</code>(토큰)은 꼭 함께 설치해요. 빠지면 기본 색이 남아요.
          </li>
          <li>
            부품 하나만: <code className="font-mono break-all text-foreground">npx shadcn@latest add {itemUrl("button")}</code>
          </li>
          <li>
            앱 최상위를 <code className="font-mono text-foreground">ThemeProvider</code>로 감싸고, 토스트를 쓰면{" "}
            <code className="font-mono text-foreground">&lt;Toaster /&gt;</code>를 둬요. 규칙과 부품 목록은 설치 후{" "}
            <code className="font-mono text-foreground">docs/tnv.md</code>에 있어요.
          </li>
          <li>
            설치 주소에 버전(<code className="font-mono text-foreground">{VERSION}</code>)이 들어 있어요. TNV가 업데이트돼도 이미 설치한 프로젝트는
            자동으로 바뀌지 않아요. 직접 고친 부품은 덮어쓰기 전에 비교해요.
          </li>
        </ul>
      </section>
    </main>
  )
}
