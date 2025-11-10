# 🚀 Bootstrap + Sass + Vite Frontend Starter

## 📋 프로젝트 개요

이 프로젝트는 **HTML / CSS / Vanilla JS 기반**으로 제작된
**Bootstrap 커스터마이징 + Sass 구조화 + Vite 빌드환경** 템플릿입니다.

15개월 이상의 장기 프로젝트나 공공기관/대기업 규모의 퍼블리싱 환경을 고려하여
유지보수성과 확장성을 중심으로 설계되었습니다.

## 🎯 주요 기능

- ✅ **HTML/CSS/Vanilla JS 기반**
- ✅ **Bootstrap 5.3.8 커스터마이징** (Sass 변수 재정의)
- ✅ **Vite 기반 빠른 빌드 & HMR** (자동 새로고침)
- ✅ **HTML partial 지원** (공통 header/footer 템플릿)
- ✅ **배포용 빌드** (dist 폴더 자동 생성)
- ✅ **node_modules의 Bootstrap 직접 임포트** (중복 파일 없음)

---

## 📁 폴더 구조

```
d:\s2b_pjt/
│
├── src/
│   ├── assets/
│   │   ├── images/              # 이미지 파일
│   │   └── js/
│   │       └── main.js          # Bootstrap JS 초기화
│   │
│   ├── scss/
│   │   ├── abstracts/           # 변수, 믹스인
│   │   │   ├── _variables.scss  # Bootstrap 변수 오버라이드
│   │   │   └── _mixins.scss     # 커스텀 믹스인
│   │   ├── base/                # 리셋, 기본 스타일
│   │   │   ├── _reset.scss
│   │   │   ├── _typography.scss
│   │   │   └── _utilities.scss
│   │   ├── components/          # Bootstrap 확장 컴포넌트 (선택)
│   │   ├── layout/              # 레이아웃
│   │   │   ├── _container.scss
│   │   │   └── _footer.scss
│   │   └── main.scss            # 📌 Sass 엔트리 파일
│   │
│   ├── partials/                # HTML 템플릿
│   │   ├── _header.html
│   │   └── _footer.html
│   │
│   └── index.html               # 메인 페이지
│
├── dist/                        # 빌드 결과물 (자동 생성)
├── node_modules/                # npm 패키지
├── package.json                 # 프로젝트 설정
├── vite.config.js               # Vite 설정
└── README.md                    # 이 파일
```

---

## ⚙️ 설치 및 실행

### 🔹 필수 요구사항
- **Node.js 18** 이상
- **pnpm** (또는 npm, yarn)

### 🔹 의존성 설치

```bash
pnpm install
```

### 🔹 개발 서버 실행

```bash
pnpm run dev
```

개발 서버가 **http://localhost:3000**에서 실행됩니다.
(포트가 사용 중이면 자동으로 다른 포트 사용)

### 🔹 프로덕션 빌드

```bash
pnpm run build
```

빌드 결과물이 `dist/` 폴더에 생성됩니다.

### 🔹 빌드 미리보기

```bash
pnpm run preview
```

---

## 🎨 Bootstrap 커스터마이징

### Bootstrap 변수 오버라이드

[src/scss/abstracts/_variables.scss](src/scss/abstracts/_variables.scss) 파일에서 Bootstrap 변수를 재정의할 수 있습니다.

```scss
// 🔹 Color System
$primary: #0d6efd;
$secondary: #6c757d;
$success: #198754;

// 🔹 Typography
$font-family-base: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
$font-size-base: 1rem;

// 🔹 Spacing
$spacer: 1rem;

// 🔹 Breakpoints
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);
```

### Bootstrap 임포트 구조

[src/scss/main.scss](src/scss/main.scss)에서 다음 순서로 임포트됩니다:

```scss
// 1. 커스텀 변수 (Bootstrap 변수 오버라이드)
@import './abstracts/variables';
@import './abstracts/mixins';

// 2. Bootstrap 임포트 (node_modules에서 직접 로드)
@import 'bootstrap/scss/bootstrap';

// 3. 프로젝트 전용 스타일
@import './base/reset';
@import './base/typography';
@import './layout/container';
// ...
```

**✅ 장점:**
- Bootstrap 원본 파일을 프로젝트에 복사할 필요 없음
- `node_modules/bootstrap/`에서 직접 임포트
- 변수만 재정의하여 Bootstrap 전체 스타일 커스터마이징

---

## 📝 HTML Partial 사용법

### Partial 파일 작성

[src/partials/_header.html](src/partials/_header.html)

```html
<header class="header">
  <div class="container">
    <h1>My Website</h1>
  </div>
</header>
```

### HTML에서 사용

[src/index.html](src/index.html)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/scss/main.scss">
</head>
<body>
  <!-- Header Partial 삽입 -->
  <%- header %>

  <main>
    <!-- 메인 콘텐츠 -->
  </main>

  <!-- Footer Partial 삽입 -->
  <%- footer %>

  <script type="module" src="/assets/js/main.js"></script>
</body>
</html>
```

**📌 문법:**
- `<%- header %>` - HTML escape 없이 그대로 삽입
- `<%= header %>` - HTML escape 처리 (텍스트로 표시됨)

---

## ��️ 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| **Vite** | ^5.4.11 | 빌드 도구 & 개발 서버 |
| **Bootstrap** | 5.3.8 | CSS 프레임워크 |
| **Sass** | ^1.83.0 | CSS 전처리기 |
| **vite-plugin-html** | ^3.2.2 | HTML partial 지원 |

---

## 📦 추가 작업 가이드

### 1. 새 페이지 추가

**1) HTML 파일 생성**

```
src/about.html
```

**2) vite.config.js에 페이지 추가**

```js
build: {
  rollupOptions: {
    input: {
      main: resolve(__dirname, 'src/index.html'),
      about: resolve(__dirname, 'src/about.html'),  // 추가
    }
  }
}
```

### 2. Bootstrap 확장 컴포넌트 추가

[src/scss/components/\_custom-buttons.scss](src/scss/components/_custom-buttons.scss)

```scss
// Bootstrap 버튼 확장
.btn-gradient-primary {
  background: linear-gradient(to right, $primary, darken($primary, 15%));
  color: #fff;
  border: none;
}
```

**main.scss에 임포트**

```scss
@import './components/custom-buttons';
```

### 3. JavaScript 모듈 추가

[src/assets/js/modules/slider.js](src/assets/js/modules/slider.js)

```js
export function initSlider() {
  console.log('Slider initialized');
}
```

**main.js에서 임포트**

```js
import { initSlider } from './modules/slider.js';

document.addEventListener('DOMContentLoaded', () => {
  initSlider();
});
```

---

## 🔧 설정 파일 설명

### vite.config.js

```js
export default defineConfig({
  root: 'src',                    // 소스 루트 디렉토리
  base: './',                     // 상대 경로 사용

  server: {
    port: 3000,                   // 개발 서버 포트
    open: true,                   // 자동 브라우저 열기
  },

  build: {
    outDir: '../dist',            // 빌드 출력 디렉토리
  },

  plugins: [
    createHtmlPlugin({            // HTML partial 지원
      inject: {
        data: {
          header: loadPartial('_header.html'),
          footer: loadPartial('_footer.html'),
        }
      }
    })
  ],

  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api']  // Sass 경고 숨김
      }
    }
  }
});
```

### package.json

```json
{
  "scripts": {
    "dev": "vite --port 3000",      // 개발 서버
    "build": "vite build",           // 프로덕션 빌드
    "preview": "vite preview"        // 빌드 미리보기
  },
  "dependencies": {
    "bootstrap": "5.3.8"             // Bootstrap 버전 고정
  },
  "devDependencies": {
    "vite": "^5.4.11",
    "vite-plugin-html": "^3.2.2",
    "sass": "^1.83.0"
  }
}
```

---

## 🚨 주의사항

### 1. Bootstrap 원본 파일 복사 금지

❌ **하지 마세요:**
```
src/scss/_buttons.scss  (Bootstrap 원본 복사)
src/scss/_card.scss     (Bootstrap 원본 복사)
```

✅ **대신 이렇게:**
```scss
// main.scss
@import 'bootstrap/scss/bootstrap';  // node_modules에서 직접 로드
```

### 2. Sass Deprecation 경고

개발 서버 실행 시 다음과 같은 경고가 표시될 수 있습니다:

```
DEPRECATION WARNING [import]: Sass @import rules are deprecated
```

이는 **Bootstrap 내부**에서 사용하는 구버전 Sass 문법으로 인한 경고이며,
**정상 동작에는 영향이 없습니다**. Bootstrap 팀이 추후 업데이트할 예정입니다.

### 3. HTML Partial 인코딩 문제

❌ **잘못된 사용:**
```html
<%= header %>  <!-- HTML이 텍스트로 표시됨 -->
```

✅ **올바른 사용:**
```html
<%- header %>  <!-- HTML이 정상 렌더링됨 -->
```

---

## 📚 참고 자료

- [Vite 공식 문서](https://vitejs.dev/)
- [Bootstrap 5.3 문서](https://getbootstrap.com/docs/5.3/)
- [Sass 공식 문서](https://sass-lang.com/)
- [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)

---

## 📄 라이선스

MIT License

---

## 👨‍💻 작성자

15년차 프론트엔드 개발자와 함께 제작된 템플릿입니다.

**프로젝트 시작일:** 2025-10-28
