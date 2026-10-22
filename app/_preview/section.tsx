import * as React from "react"

// 미리보기 전용 틀 (레지스트리에 들어가지 않음)
export function Section({ id, title, figma, children }: { id: string; title: string; figma: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 rounded-xl border border-border bg-card p-6 text-card-foreground">
      <header className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-xs text-muted-foreground">Figma {figma}</span>
      </header>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  )
}

export function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}
