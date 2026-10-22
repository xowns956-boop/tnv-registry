"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// TNV v0.1 · 라이트·다크 두 모드 (Figma 2_Semantic · Color: Light | Dark)
// 기본값은 다크(트윈뷰 대시보드). 라이트는 들어 있지만 전환 버튼은 나중에 기능으로 추가 예정. 다크는 <html class="dark">.
function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange {...props}>
      {children}
    </NextThemesProvider>
  )
}

export { ThemeProvider }
