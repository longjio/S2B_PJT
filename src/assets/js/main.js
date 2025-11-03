// ============================================
// 🚀 Main JavaScript Entry Point
// ============================================

// Bootstrap JavaScript 임포트
import * as bootstrap from 'bootstrap';

// 전역으로 bootstrap 사용 가능하게 설정
window.bootstrap = bootstrap;

// Tabulator 임포트
import './tabulator-init.js';

console.log('Bootstrap + Sass + Vite 스타터 템플릿이 로드되었습니다.');
console.log('Bootstrap version:', bootstrap.Tooltip.VERSION);

// ============================================
// DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM이 준비되었습니다.');

  // Bootstrap Tooltip 초기화
  initTooltips();

  // Bootstrap Popover 초기화
  initPopovers();

  // 모바일 메뉴 토글
  initMobileMenu();
});

// ============================================
// Bootstrap Tooltip 초기화
// ============================================
function initTooltips() {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl =>
    new bootstrap.Tooltip(tooltipTriggerEl)
  );
  console.log(`${tooltipList.length}개의 tooltip이 초기화되었습니다.`);
}

// ============================================
// Bootstrap Popover 초기화
// ============================================
function initPopovers() {
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl =>
    new bootstrap.Popover(popoverTriggerEl)
  );
  console.log(`${popoverList.length}개의 popover가 초기화되었습니다.`);
}

// ============================================
// 모바일 메뉴 토글
// ============================================
function initMobileMenu() {
  const toggleBtn = document.querySelector('.header__toggle');
  const menu = document.querySelector('.header__menu');

  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      menu.classList.toggle('is-active');
      console.log('모바일 메뉴 토글');
    });
  }
}

// ============================================
// 추가 커스텀 스크립트
// ============================================

// 스크롤 시 헤더 스타일 변경
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  const header = document.querySelector('.header');

  if (header) {
    if (currentScroll > 100) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  lastScroll = currentScroll;
});

// 부드러운 스크롤 (Scrollspy 링크는 제외)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // '#' 또는 빈 href는 무시
    if (href === '#' || href === '') {
      e.preventDefault();
      return;
    }

    // Scrollspy 링크는 showcase.js에서 별도 처리하므로 제외
    if (href.startsWith('#scrollspy') ||
        href.startsWith('#item-') ||
        href.startsWith('#list-item-') ||
        href.startsWith('#simple-list-item-')) {
      return; // 이벤트 처리하지 않고 showcase.js에 맡김
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
