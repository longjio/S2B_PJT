# Templates

이 폴더에는 재사용 가능한 HTML 템플릿과 레이아웃이 포함됩니다.

## 📁 폴더 구조

```
templates/
├── layouts/              ← 페이지 레이아웃
│   ├── main.html        ← 기본 레이아웃
│   ├── sidebar.html     ← 사이드바 레이아웃
│   └── fullwidth.html   ← 전체 너비 레이아웃
│
├── sections/            ← 페이지 섹션
│   ├── hero.html
│   ├── cta.html
│   └── footer.html
│
└── forms/               ← 폼 템플릿
    ├── contact.html
    ├── login.html
    └── register.html
```

## 🎯 용도

### 1. Layouts (레이아웃)
전체 페이지 구조를 정의하는 템플릿입니다.

**예시**:
```html
<!-- layouts/main.html -->
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>{{title}}</title>
</head>
<body>
  <header>{{header}}</header>
  <main>{{content}}</main>
  <footer>{{footer}}</footer>
</body>
</html>
```

### 2. Sections (섹션)
페이지 내 재사용 가능한 섹션입니다.

**예시**:
```html
<!-- sections/hero.html -->
<section class="hero">
  <div class="container">
    <h1>{{heading}}</h1>
    <p>{{description}}</p>
    <a href="{{ctaLink}}" class="btn btn-primary">{{ctaText}}</a>
  </div>
</section>
```

### 3. Forms (폼)
자주 사용되는 폼 템플릿입니다.

**예시**:
```html
<!-- forms/contact.html -->
<form class="contact-form">
  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" id="name">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

## 🔧 사용 방법

### JavaScript로 로드하기

```javascript
// templateLoader.js
async function loadTemplate(templatePath) {
  const response = await fetch(`/src/templates/${templatePath}`);
  return await response.text();
}

// 사용 예
const heroHTML = await loadTemplate('sections/hero.html');
document.querySelector('#hero-container').innerHTML = heroHTML;
```

### 템플릿 변수 치환

```javascript
function renderTemplate(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || '';
  });
}

// 사용 예
const template = await loadTemplate('sections/hero.html');
const rendered = renderTemplate(template, {
  heading: 'Welcome',
  description: 'Bootstrap Components',
  ctaLink: '#get-started',
  ctaText: 'Get Started'
});
```

## 📝 네이밍 규칙

- **파일명**: kebab-case (예: `contact-form.html`)
- **변수명**: camelCase (예: `{{userName}}`)
- **클래스명**: BEM (예: `.hero__title`)

## 🎨 Bootstrap 활용

모든 템플릿은 Bootstrap 5.3 클래스를 사용합니다:

```html
<!-- ✅ 좋은 예 -->
<div class="container">
  <div class="row">
    <div class="col-md-6">...</div>
  </div>
</div>

<!-- ❌ 나쁜 예 -->
<div class="custom-wrapper">
  <div class="custom-row">...</div>
</div>
```

## 📂 components vs templates 차이

| 항목 | components/ | templates/ |
|------|-------------|------------|
| **용도** | Bootstrap 컴포넌트 쇼케이스 | 재사용 가능한 페이지 템플릿 |
| **내용** | 단일 컴포넌트 예제 | 여러 컴포넌트 조합 |
| **예시** | accordion.html, buttons.html | hero.html, contact-form.html |
| **로딩** | 탭 전환 시 동적 로드 | 필요 시 fetch로 로드 |

## 💡 Best Practices

1. **모듈화**: 템플릿을 작고 재사용 가능하게 만들기
2. **변수 사용**: 하드코딩 대신 `{{variable}}` 사용
3. **주석 추가**: 템플릿 용도와 변수 설명
4. **접근성**: 시맨틱 HTML과 ARIA 속성 사용
5. **반응형**: Bootstrap 그리드 시스템 활용

## 🔗 관련 파일

- [components/](../components/) - Bootstrap 컴포넌트 HTML
- [partials/](../partials/) - Header, Footer 등 공통 부분
- [assets/js/](../assets/js/) - JavaScript 파일
