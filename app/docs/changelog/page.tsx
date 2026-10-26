import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import changelog from "./changelog.json"

// 업데이트 기록. 내용은 changelog.json 한 곳에서만 고친다 (llms-full.txt도 같은 파일을 읽는다).
export const metadata = { title: "업데이트 기록 · TNV Design System" }

export default function Changelog() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-10 sm:px-8">
      <nav className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeftIcon aria-hidden="true" />
            부품 미리보기
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/docs/ai">AI로 설치하기</Link>
        </Button>
      </nav>

      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-foreground">업데이트 기록</h1>
        <p className="text-base text-muted-foreground">
          설치 주소에 버전이 들어 있어서, TNV가 바뀌어도 이미 설치한 프로젝트는 자동으로 바뀌지 않아요. 버전을 올리기 전에 여기서 바뀐 점을 확인해요.
        </p>
      </header>

      <ol className="flex flex-col gap-6">
        {changelog.map((release) => (
          <li key={release.version}>
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-xl">{release.version}</CardTitle>
                  <Badge variant="outline">{release.date}</Badge>
                </div>
                <CardDescription>{release.summary}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                {release.groups.map((group) => (
                  <section key={group.title} className="flex flex-col gap-2">
                    <h2 className="text-sm font-semibold text-card-foreground">{group.title}</h2>
                    <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-muted-foreground">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                ))}
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
    </main>
  )
}
