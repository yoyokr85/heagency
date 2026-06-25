# HE:A:GENCY 레거시 자산 기록 (Archive)

> 2026-06 에이전시 매칭 플랫폼으로 피벗하며, 기존 **입찰형 / 아이 IP / imweb 결제** 구현을
> 나중에 다시 쓸 수 있게 기술 기록만 남기고 운영 코드에서 분리. 아래 파일들은 참고용이며
> 빌드에 포함되지 않음.

## 1. 타임라인 (이 도메인 heagency.sssgroup.kr)

1. **아이 사업가 IP 랜딩** — 11세 김해온의 "세계 최초 아이 사업가 교육 IP". 입찰형 캠페인.
2. **인모아 낙찰 안내 피벗** — 광고 슬롯이 3,300만원에 ㈜인모아에 낙찰됐다는 안내 페이지.
   (git history 커밋 `c330d09` 의 `app/page.tsx` 참조)
3. **(현재) 전문직 광고·마케팅 에이전시** — 부산 전문직 타깃 매칭 플랫폼.

## 2. 보관 파일

| 파일 | 정체 |
|---|---|
| `heyagency-landing-v11.html` | 아이 IP 입찰형 랜딩(v11). "축제 개막 · SEASON 02", "복제 1호~3호", **참가 예치금**, "캠페인 공식 후원", "해이전시 마켓 공간" 등 입찰/후원 섹션 포함. |
| `imweb-product-detail.html` | imweb 상품 상세 페이지 마크업(아이 IP 상품 판매용). |
| `imweb-webhook-route.ts.txt` | 원래 `app/api/webhook/imweb/route.ts`. imweb 결제 웹훅 수신 스텁(페이로드 로깅만, 파싱 TODO). Supabase `registrations` 테이블에 `{name, city, type:'kid'}` insert 예정이었음. |
| `heagency.html` | 초기 단일 HTML 랜딩 시안. |
| `인모아-광고-페이지-핸드오프.md` | 인모아 낙찰 안내 페이지 교체 핸드오프 문서. |

## 3. 기술 메모 (복원 시 참고)

- **imweb 웹훅 복원**: `imweb-webhook-route.ts.txt` 를 `app/api/webhook/imweb/route.ts` 로 되돌리면 됨.
  연동 env: `IMWEB_KID_URL`(상품 페이지, sssgroup.kr 가리킴), Supabase `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`.
- **입찰/예치금 모델**: v11 HTML 에 입찰가·참가 예치금·후원 등급 UI 가 정리돼 있음. 추후 경매/후원형 기능 필요 시 마크업 재활용 가능.
- 디자인 토큰(따뜻한 프리미엄 --paper/--clay/--espresso)은 현행 에이전시 랜딩에서 계속 사용 중.

## 4. 라이브 배포 메모

- Vercel 프로젝트 `heagency` 는 2026-06-24 깃 연결을 `yoyokr85/heagency` 로 재연결.
- Root Directory 설정을 `frontend` → 루트(`./`)로 변경해야 빌드됨(과거 경매 레포는 frontend/ 하위 구조였음).
