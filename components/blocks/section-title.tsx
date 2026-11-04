import * as React from "react"
import { cn } from "cn"
import { ChevronLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { StatusBadge, type StatusBadgeStatus } from "@/components/ui/status-badge"

// TNV v0.1 · SectionTitle — Title · Show Back · Show Status · Show Action
// 화면 옆 칸(aside) 맨 위 제목 줄. 제목이 길면 말줄임, 글자 제목이면 마우스를 올렸을 때 전체가 보인다(title). Show 옵션 = props 유무: onBack(뒤로가기 ghost 아이콘 버튼) · status(StatusBadge) · action(오른쪽 버튼, 보통 outline size="icon")
function SectionTitle({
  title,
  status,
  onBack,
  backLabel = "뒤로가기",
  action,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  title: React.ReactNode
  status?: StatusBadgeStatus
  onBack?: () => void
  backLabel?: string
  action?: React.ReactNode
}) {
  return (
    <div data-slot="section-title" className={cn("flex items-center gap-2", className)} {...props}>
      {onBack && (
        <Button variant="ghost" size="icon" aria-label={backLabel} onClick={onBack}>
          <ChevronLeftIcon aria-hidden="true" />
        </Button>
      )}
      <h2 title={typeof title === "string" ? title : undefined} className="min-w-0 flex-1 truncate text-xl font-semibold text-foreground">
        {title}
      </h2>
      {status && <StatusBadge status={status} className="shrink-0" />}
      {action && <div className="flex shrink-0 items-center">{action}</div>}
    </div>
  )
}

export { SectionTitle }
