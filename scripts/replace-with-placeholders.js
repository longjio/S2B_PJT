// index.html의 컴포넌트 섹션을 플레이스홀더로 교체하는 스크립트

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexPath = path.join(__dirname, 'src', 'index.html');
const backupPath = path.join(__dirname, 'src', 'index.html.backup');

// 컴포넌트 목록
const components = [
  'accordion', 'buttons', 'button-groups', 'badges', 'breadcrumb',
  'alerts', 'cards', 'carousel', 'close-button', 'collapse',
  'dropdowns', 'list-group', 'modals', 'navbar', 'navs',
  'offcanvas', 'pagination', 'placeholders', 'popovers', 'progress',
  'scrollspy', 'spinners', 'toasts', 'tooltips', 'tables'
];

// 백업 생성
fs.copyFileSync(indexPath, backupPath);
console.log('✅ Backup created: index.html.backup\n');

// index.html 읽기
let indexContent = fs.readFileSync(indexPath, 'utf-8');

// 각 컴포넌트 섹션을 플레이스홀더로 교체
components.forEach(componentName => {
  console.log(`Replacing ${componentName} with placeholder...`);

  const sectionRegex = new RegExp(
    `<section id="${componentName}"[^>]*data-tab-content="${componentName}"[^>]*>([\\s\\S]*?)<\\/section>`,
    'i'
  );

  const placeholder = `<section id="${componentName}" class="showcase__section" data-tab-content="${componentName}">
              <!-- Component content will be loaded dynamically -->
            </section>`;

  if (indexContent.match(sectionRegex)) {
    indexContent = indexContent.replace(sectionRegex, placeholder);
    console.log(`  ✅ Replaced ${componentName}`);
  } else {
    console.log(`  ❌ Could not find section for ${componentName}`);
  }
});

// 수정된 내용 저장
fs.writeFileSync(indexPath, indexContent, 'utf-8');

console.log('\n✅ All sections replaced with placeholders!');
console.log('📝 Original file backed up as index.html.backup');
