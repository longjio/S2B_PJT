# Bootstrap Showcase Project Structure

## 프로젝트 개요
Bootstrap 5.3.8 컴포넌트를 쇼케이스 형태로 제공하는 웹 애플리케이션입니다.
동적 컴포넌트 로딩, SCSS 기반 스타일링, Vite 번들링을 사용합니다.

---

## 디렉토리 구조

```
d:\s2b_pjt\
├── public/                          # 정적 자산 (Vite가 변환 없이 그대로 서빙)
│   └── components/                  # Bootstrap 컴포넌트 HTML 파일 (25개)
│       ├── accordion.html           # 아코디언 컴포넌트
│       ├── alerts.html              # 알림 컴포넌트
│       ├── badges.html              # 배지 컴포넌트
│       ├── breadcrumb.html          # 브레드크럼 컴포넌트
│       ├── button-groups.html       # 버튼 그룹 컴포넌트
│       ├── buttons.html             # 버튼 컴포넌트
│       ├── cards.html               # 카드 컴포넌트
│       ├── carousel.html            # 캐러셀 컴포넌트
│       ├── close-button.html        # 닫기 버튼 컴포넌트
│       ├── collapse.html            # 콜랩스 컴포넌트
│       ├── dropdowns.html           # 드롭다운 컴포넌트
│       ├── list-group.html          # 리스트 그룹 컴포넌트
│       ├── modals.html              # 모달 컴포넌트
│       ├── navbar.html              # 네비게이션바 컴포넌트
│       ├── navs.html                # 네비게이션 & 탭 컴포넌트
│       ├── offcanvas.html           # 오프캔버스 컴포넌트
│       ├── pagination.html          # 페이지네이션 컴포넌트
│       ├── placeholders.html        # 플레이스홀더 컴포넌트
│       ├── popovers.html            # 팝오버 컴포넌트
│       ├── progress.html            # 프로그레스바 컴포넌트
│       ├── scrollspy.html           # 스크롤스파이 컴포넌트
│       ├── spinners.html            # 스피너 컴포넌트
│       ├── tables.html              # 테이블 컴포넌트
│       ├── toasts.html              # 토스트 컴포넌트
│       └── tooltips.html            # 툴팁 컴포넌트
│
├── src/                             # 소스 코드 (Vite가 처리)
│   ├── index.html                   # 메인 HTML 페이지
│   │
│   ├── assets/                      # 정적 자산
│   │   └── js/                      # JavaScript 파일
│   │       ├── componentLoader.js   # 컴포넌트 동적 로딩 유틸리티
│   │       ├── main.js              # 메인 진입점
│   │       ├── showcase.js          # 쇼케이스 탭 네비게이션 로직
│   │       ├── tabulator-init.js    # Tabulator 테이블 초기화
│   │       └── templateLoader.js    # 템플릿 로딩 유틸리티
│   │
│   ├── scss/                        # SCSS 스타일시트
│   │   ├── main.scss                # SCSS 메인 진입점
│   │   │
│   │   ├── abstracts/               # 추상 레이어 (변수, 믹스인)
│   │   │   ├── _variables.scss      # SCSS 변수 정의
│   │   │   └── _mixins.scss         # SCSS 믹스인
│   │   │
│   │   ├── base/                    # 기본 스타일
│   │   │   ├── _reset.scss          # CSS 리셋
│   │   │   ├── _typography.scss     # 타이포그래피
│   │   │   └── _utilities.scss      # 유틸리티 클래스
│   │   │
│   │   ├── components/              # 컴포넌트별 스타일
│   │   │   └── _tables.scss         # 테이블 스타일
│   │   │
│   │   └── layout/                  # 레이아웃 스타일
│   │       ├── _container.scss      # 컨테이너 레이아웃
│   │       ├── _footer.scss         # 푸터 스타일
│   │       ├── _header.scss         # 헤더 스타일
│   │       └── _showcase.scss       # 쇼케이스 레이아웃
│   │
│   ├── partials/                    # HTML 파셜 (재사용 가능한 HTML 조각)
│   │   ├── _header.html             # 헤더 파셜
│   │   └── _footer.html             # 푸터 파셜
│   │
│   └── templates/                   # 템플릿 시스템
│       ├── README.md                # 템플릿 사용법
│       │
│       ├── layouts/                 # 레이아웃 템플릿
│       │   └── main.html            # 메인 레이아웃
│       │
│       ├── sections/                # 섹션 템플릿
│       │   └── hero.html            # 히어로 섹션
│       │
│       └── forms/                   # 폼 템플릿
│           └── contact.html         # 연락처 폼
│
├── scripts/                         # 유틸리티 스크립트
│   ├── README.md                    # 스크립트 사용법
│   ├── extract-components.js        # index.html에서 컴포넌트 추출 → public/components/
│   └── replace-with-placeholders.js # 컴포넌트를 플레이스홀더로 교체
│
├── node_modules/                    # NPM 패키지 (Git 제외)
│
├── dist/                            # 빌드 출력 디렉토리 (Git 제외)
│
├── .gitignore                       # Git 제외 파일 목록
├── package.json                     # NPM 패키지 설정
├── pnpm-lock.yaml                   # PNPM 잠금 파일
├── vite.config.js                   # Vite 설정 파일
├── README.md                        # 프로젝트 README
└── PROJECT-STRUCTURE.md             # 이 파일
```

---

## 주요 파일 설명

### 설정 파일

#### `package.json`
```json
{
  "name": "bootstrap-sass-vite-starter",
  "type": "module",
  "scripts": {
    "dev": "vite --port 3000",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "bootstrap": "5.3.8",
    "tabulator-tables": "^6.3.1"
  },
  "devDependencies": {
    "sass": "^1.83.0",
    "vite": "^5.4.11"
  }
}
```

#### `vite.config.js`
- Vite 빌드 도구 설정
- root: `src/` 디렉토리
- 빌드 출력: `dist/` 디렉토리
- SCSS 전처리기 설정
- HTML 플러그인 제거됨 (컴포넌트 중복 방지)

---

## 핵심 기능 설명

### 1. 동적 컴포넌트 로딩 시스템

**파일:** `src/assets/js/componentLoader.js`

```javascript
class ComponentLoader {
  // /components/{name}.html 에서 컴포넌트 HTML 로드
  async loadComponent(componentName) { ... }

  // 특정 요소에 컴포넌트 삽입
  async insertComponent(componentName, targetElement) { ... }
}
```

**작동 방식:**
1. 사용자가 사이드바에서 컴포넌트 클릭
2. `showcase.js`가 해당 섹션으로 전환
3. `componentLoader`가 `/components/{name}.html` fetch
4. 컴포넌트 HTML이 섹션에 삽입
5. Bootstrap 초기화 (tooltips, popovers 등)

**주의:**
- 컴포넌트 파일은 반드시 `public/components/`에 위치
- `src/` 폴더의 HTML은 Vite가 전체 페이지로 변환하므로 사용 불가

### 2. 쇼케이스 네비게이션

**파일:** `src/assets/js/showcase.js`

- 사이드바 탭 클릭 이벤트 처리
- URL 해시 기반 라우팅 (`#accordion`, `#buttons` 등)
- 컴포넌트 지연 로딩 (Lazy Loading)
- 컴포넌트별 초기화 로직 (Scrollspy, Tooltips 등)

### 3. SCSS 아키텍처

**7-1 패턴 변형:**
```
scss/
├── abstracts/    # 변수, 믹스인
├── base/         # 리셋, 타이포그래피
├── components/   # 컴포넌트별 스타일
├── layout/       # 레이아웃 스타일
└── main.scss     # 모든 파일 import
```

### 4. 컴포넌트 추출 스크립트

**파일:** `scripts/extract-components.js`

**목적:**
- `index.html`의 각 `<section>` 내용을 개별 HTML 파일로 추출
- 컴포넌트 분리 작업 자동화

**실행:**
```bash
node scripts/extract-components.js
```

**출력:** `public/components/*.html` (25개 파일)

---

## 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| Bootstrap | 5.3.8 | UI 프레임워크 |
| Vite | 5.4.11 | 빌드 도구 & 개발 서버 |
| Sass | 1.83.0 | CSS 전처리기 |
| Tabulator | 6.3.1 | 고급 테이블 라이브러리 |
| Vanilla JS | ES6+ | JavaScript (프레임워크 없음) |

---

## 개발 워크플로우

### 개발 서버 실행
```bash
npm run dev
# 또는
pnpm run dev
```
→ http://localhost:3000 에서 실행

### 프로덕션 빌드
```bash
npm run build
```
→ `dist/` 폴더에 최적화된 파일 생성

### 빌드 미리보기
```bash
npm run preview
```

---

## 컴포넌트 추가 방법

### 1. 새 컴포넌트 HTML 작성
`public/components/my-component.html`:
```html
<h2 class="showcase__section-title">My Component</h2>
<p class="showcase__section-description">설명...</p>

<div class="showcase__item">
  <div class="showcase__item-header">
    <h4>Example</h4>
  </div>
  <div class="showcase__item-preview">
    <!-- 컴포넌트 HTML -->
  </div>
</div>
```

### 2. index.html에 섹션 추가
```html
<section id="my-component" class="showcase__section" data-tab-content="my-component">
  <!-- Component content will be loaded dynamically -->
</section>
```

### 3. 사이드바 네비게이션에 링크 추가
```html
<li><a href="#my-component" data-tab="my-component">My Component</a></li>
```

### 4. componentLoader.js는 자동 처리
추가 코드 수정 불필요 (동적 로딩)

---

## 주의사항

### ⚠️ 컴포넌트 파일 위치
- ✅ `public/components/*.html` - 올바름
- ❌ `src/components/*.html` - Vite가 전체 페이지로 변환하여 중복 발생

### ⚠️ Vite HTML 처리 방식
- `src/` 폴더의 HTML 파일은 엔트리 포인트로 인식
- `public/` 폴더는 정적 자산으로 그대로 서빙

### ⚠️ Bootstrap 초기화
- Tooltip, Popover, Scrollspy 등은 수동 초기화 필요
- `showcase.js`의 `showSection()` 함수에서 처리

---

## 프로젝트 히스토리

1. **초기 구조**: 모든 컴포넌트가 `index.html`에 포함
2. **컴포넌트 분리**: 각 컴포넌트를 `src/components/*.html`로 추출
3. **동적 로딩 구현**: `componentLoader.js` 생성
4. **버그 수정**: `src/components/`를 `public/components/`로 이동
   - 이유: Vite가 `src/` HTML을 전체 페이지로 변환하여 중복 발생
   - 해결: `public/` 폴더는 Vite가 변환하지 않음

---

## 라이선스
MIT

---

## 참고 자료
- [Bootstrap 공식 문서](https://getbootstrap.com/)
- [Vite 공식 문서](https://vitejs.dev/)
- [Sass 공식 문서](https://sass-lang.com/)
