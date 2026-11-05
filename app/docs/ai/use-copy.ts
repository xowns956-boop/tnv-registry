"use client"

import * as React from "react"
import { toast } from "sonner"

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

export function useCopy() {
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
