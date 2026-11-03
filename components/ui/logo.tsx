import * as React from "react"
import { cn } from "cn"

// TNV v0.1 · Logo — TWINVUE 글자 로고(152×48). 높이 className으로 조절(h-12 기본, 너비는 비율대로)
// 글자 = currentColor(기본 text-foreground), N의 파란 획 = 브랜드 색 #24B0FF(고정)
function Logo({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      data-slot="logo"
      viewBox="0 0 152 48.05"
      role="img"
      aria-label="TWINVUE"
      className={cn("h-12 w-auto shrink-0 text-foreground", className)}
      {...props}
    >
      <g fill="currentColor">
        <path d="M0 12V14H8V36H10V14H18V12H0Z" />
        <path d="M50.83 12L41.5 33.97L37.59 24.75L43 12H40.83L36.5 22.19L32.17 12H30L35.41 24.75L31.5 33.97L22.17 12H20L30.19 36H30.64H32.36H32.81L36.5 27.31L40.19 36H40.64H42.36H42.81L53 12H50.83Z" />
        <path d="M57 12H55V36H57V12Z" />
        <path d="M84 0V27L61 2.34V8.05L88 37V4.29L84 0Z" />
        <path d="M111.83 12L102.5 33.97L93.17 12H91L101.19 36H101.64H103.36H103.81L114 12H111.83Z" />
        <path d="M132 12V30C132 32.21 130.21 34 128 34H122C119.79 34 118 32.21 118 30V12H116V30C116 33.31 118.69 36 122 36H128C131.31 36 134 33.31 134 30V12H132Z" />
        <path d="M152 12H136V14H152V12Z" />
        <path d="M152 23H136V25H152V23Z" />
        <path d="M152 34H136V36H152V34Z" />
      </g>
      <path d="M65 20.95L88 45.62V39.91L61 10.95V43.71L65 48V20.95Z" fill="#24B0FF" />
    </svg>
  )
}

export { Logo }
