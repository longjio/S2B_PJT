# 유틸리티 스크립트

이 폴더에는 프로젝트 개발 과정에서 사용되는 Node.js 유틸리티 스크립트들이 포함되어 있습니다.

## 📜 스크립트 목록

### 1. extract-components.js

**용도**: `index.html`에서 각 컴포넌트 섹션을 추출하여 별도의 HTML 파일로 저장합니다.

**실행 방법**:
```bash
node scripts/extract-components.js
```

**기능**:
- `index.html`에서 25개의 Bootstrap 컴포넌트 섹션을 자동으로 추출
- 각 컴포넌트를 `src/components/{component-name}.html` 파일로 저장
- 정규식을 사용하여 `<section>` 태그 내부 콘텐츠만 추출

**추출되는 컴포넌트**:
- accordion, alerts, badges, breadcrumb, buttons
- button-groups, cards, carousel, close-button, collapse
- dropdowns, list-group, modals, navbar, navs
- offcanvas, pagination, placeholders, popovers, progress
- scrollspy, spinners, tables, toasts, tooltips

---

### 2. replace-with-placeholders.js

**용도**: `index.html`의 컴포넌트 섹션들을 플레이스홀더로 교체하여 파일 크기를 줄입니다.

**실행 방법**:
```bash
node scripts/replace-with-placeholders.js
```

**기능**:
- `index.html`의 원본을 `index.html.backup`으로 자동 백업
- 각 컴포넌트 섹션을 간단한 플레이스홀더로 교체
- 플레이스홀더에는 "Component content will be loaded dynamically" 주석 포함
- 파일 크기를 3000줄 → 약 300줄로 축소

**주의사항**:
- 이 스크립트를 실행하기 전에 반드시 `extract-components.js`를 먼저 실행해야 합니다
- 원본 파일은 자동으로 백업되지만, 중요한 변경 전에는 수동 백업을 권장합니다

---

## 🔄 일반적인 작업 흐름

1. **컴포넌트 추출**:
   ```bash
   node scripts/extract-components.js
   ```

2. **index.html 축소**:
   ```bash
   node scripts/replace-with-placeholders.js
   ```

3. **개발 서버 실행**:
   ```bash
   npm run dev
   # 또는
   pnpm run dev
   ```

---

## 📁 생성되는 파일 구조

```
d:\s2b_pjt/
├── src/
│   ├── components/               ← extract-components.js가 생성
│   │   ├── accordion.html
│   │   ├── alerts.html
│   │   └── ... (25개 파일)
│   │
│   ├── index.html               ← replace-with-placeholders.js가 수정
│   └── index.html.backup        ← replace-with-placeholders.js가 생성
```

---

## ⚠️ 주의사항

1. **Node.js 환경 필요**: 이 스크립트들은 Node.js 환경에서 실행됩니다 (ES Module 사용)
2. **일회성 도구**: 초기 구조 변경 작업을 위한 도구이며, 일상적인 개발에는 사용하지 않습니다
3. **경로 의존성**: 프로젝트 루트 디렉토리(`d:\s2b_pjt`)에서 실행해야 합니다
4. **백업 확인**: 중요한 변경 전에는 항상 백업 파일을 확인하세요

---

## 🛠️ 문제 해결

### 스크립트 실행 오류
```bash
Error: Cannot find module ...
```
→ 프로젝트 루트 디렉토리에서 실행하세요: `cd d:\s2b_pjt`

### 파일을 찾을 수 없음
```bash
ENOENT: no such file or directory
```
→ `src/components` 폴더가 존재하는지 확인하세요

### 컴포넌트가 추출되지 않음
```bash
❌ Could not find section for {component}
```
→ `index.html`에 해당 컴포넌트 섹션이 존재하는지, `data-tab-content` 속성이 올바른지 확인하세요
