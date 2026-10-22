# TNV Design System Registry

트윈뷰(twiNvew) 공정 모니터링 대시보드용 디자인 시스템. Figma `TNV Design System`(uGVI6qGaR7PcZ7g0SrRnGK)을 shadcn 레지스트리로 옮긴 것.

- 미리보기·AI 설치 안내: https://xowns956-boop.github.io/tnv-registry/docs/ai/
- 변경 기록: https://xowns956-boop.github.io/tnv-registry/docs/changelog/
- 대상: React + Tailwind CSS v4 + shadcn(radix). 초기화는 `npx shadcn@latest init -b radix -p nova -y`
- 설치: `npx shadcn@latest add https://xowns956-boop.github.io/tnv-registry/r/<버전>/tnv-foundations.json https://xowns956-boop.github.io/tnv-registry/r/<버전>/tnv.json`

## 갱신 순서
1. Figma 값 → `tokens/figma/*.txt` → `npm run tokens`
2. `node scripts/build-registry.mjs`
3. `npx shadcn@4.22.1 build -o public/r/<버전>`
4. `node scripts/build-llms.mjs`
