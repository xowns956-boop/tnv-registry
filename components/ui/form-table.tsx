import * as React from "react"
import { cn } from "cn"

// TNV v0.1 · Figma "03_Patterns › FormTable" (4046:181 · Row 4046:166 · Field 4046:165)
// 정보·조건 표 — 줄(Row)마다 칸(Field) 1~2개, 칸 = 왼쪽 제목(muted 바탕 128px) + 오른쪽 값.
// 줄 사이 1px 선은 바탕(border)이 비쳐 보이는 방식. 좁은 화면(<640px)에서는 칸이 세로로 쌓인다.
function FormTable({ className, ...props }: React.ComponentProps<"dl">) {
  return (
    <dl
      data-slot="form-table"
      className={cn("flex w-full flex-col gap-px overflow-hidden rounded-2xs border border-border bg-border text-sm", className)}
      {...props}
    />
  )
}

function FormTableRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-table-row"
      className={cn("flex flex-col gap-px bg-border sm:flex-row sm:gap-0 sm:bg-card", className)}
      {...props}
    />
  )
}

function FormTableField({
  className,
  label,
  type = "text",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  label: React.ReactNode
  /** text: 글자 값 / control: 입력 부품(Select·Input 등)을 넣는 칸 */
  type?: "text" | "control"
}) {
  return (
    <div data-slot="form-table-field" data-type={type} className={cn("flex min-w-0 flex-1 bg-card", className)} {...props}>
      <dt className="flex w-32 shrink-0 items-center bg-table-header px-2 font-medium text-foreground">{label}</dt>
      <dd
        className={cn(
          "flex min-w-0 flex-1 text-foreground",
          type === "text" ? "h-9 items-center p-2" : "flex-col gap-2 p-2"
        )}
      >
        {children}
      </dd>
    </div>
  )
}

export { FormTable, FormTableRow, FormTableField }
