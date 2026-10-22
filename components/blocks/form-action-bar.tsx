import * as React from "react"
import { cn } from "cn"

// TNV v0.1 · Figma "03_Patterns › FormActionBar" (80:153)
// 등록·수정 화면 맨 아래 고정 버튼 줄 (취소 outline + 저장 primary, 오른쪽 정렬)
function FormActionBar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-action-bar"
      className={cn(
        "sticky bottom-0 z-10 flex items-center justify-end gap-2 border-t border-border bg-background px-6 py-4",
        className
      )}
      {...props}
    />
  )
}

export { FormActionBar }
