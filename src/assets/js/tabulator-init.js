// ============================================
// 📊 Tabulator Initialization
// ============================================
// Tabulator 라이브러리 초기화 (Vanilla JS, jQuery 불필요!)

import { TabulatorFull as Tabulator } from 'tabulator-tables';

// Tabulator를 전역으로 사용 가능하게 설정
window.Tabulator = Tabulator;

console.log('Tabulator loaded');
