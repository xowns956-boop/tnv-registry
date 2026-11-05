"use client"

import { Button } from "@/components/ui/button"
import { updatePrompt, VERSION } from "../ai/content"
import { useCopy } from "../ai/use-copy"

// 최신 버전 카드에만 둔다. 설치 주소는 최신 버전 파일만 있어서, 예전 버전으로는 받을 수 없다.
export function UpdateButton() {
  const { copy } = useCopy()
  return (
    <Button
      size="sm"
      onClick={() => copy("update", updatePrompt, `v${VERSION} 업데이트 프롬프트를 복사했어요. 설치한 프로젝트의 AI 채팅창에 붙여넣어 주세요.`)}
    >
      {`v${VERSION} 업데이트 프롬프트`}
    </Button>
  )
}
