# 🛠 PR 제목: [Refactor] 회원 등록 폼 로직 분리

## 📌 변경 요약

- 회원 등록 폼에서 useForm 로직 커스텀 훅으로 분리
- 유효성 검사 메시지를 input마다 분리
- 날짜 선택기 개선 (기존 input → date picker)

## 🎯 변경 이유

- 컴포넌트가 지나치게 비대해졌고 재사용성 낮음
- 유효성 검사를 재활용하고 싶은 요구 있음

## 🔍 주요 변경 파일

- `pages/member/new/page.tsx`
- `hooks/useMemberForm.ts`
- `components/input/DatePicker.tsx`

## ✅ 체크리스트

### 🎯 리팩토링 원칙

- [ ] 서버/클라이언트 컴포넌트 적절히 분리
- [ ] 중복 코드 제거 및 모듈화
- [ ] 디렉토리 구조가 역할에 맞게 정리됨
- [ ] 타입 안정성 확보 (any/never 미사용)
- [ ] 성능 최적화 (useMemo, prefetch 등)
- [ ] UI/UX 개선 및 일관성 유지

### 📝 PR 품질

- [ ] 브랜치 전략 준수
- [ ] 변경 내용과 의도가 명확히 작성됨
- [ ] 관련 이슈/문서 연결됨

## 📎 관련 문서/이슈

- `docs/REFACTORING_PHASE1.md` 중 Member 항목
