// 컴포넌트 추출 스크립트
// index.html에서 각 컴포넌트 섹션을 추출하여 별도 파일로 저장

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexPath = path.join(__dirname, '..', 'src', 'index.html');
const componentsDir = path.join(__dirname, '..', 'public', 'components');

// 컴포넌트 목록
const components = [
  'accordion', 'buttons', 'button-groups', 'badges', 'breadcrumb',
  'alerts', 'cards', 'carousel', 'close-button', 'collapse',
  'dropdowns', 'list-group', 'modals', 'navbar', 'navs',
  'offcanvas', 'pagination', 'placeholders', 'popovers', 'progress',
  'scrollspy', 'spinners', 'toasts', 'tooltips', 'tables'
];

// index.html 읽기
const indexContent = fs.readFileSync(indexPath, 'utf-8');

// 각 컴포넌트 추출
components.forEach(componentName => {
  console.log(`Extracting ${componentName}...`);

  // 정규식으로 해당 섹션 찾기
  const sectionRegex = new RegExp(
    `<section id="${componentName}"[^>]*data-tab-content="${componentName}"[^>]*>([\\s\\S]*?)<\\/section>`,
    'i'
  );

  const match = indexContent.match(sectionRegex);

  if (match) {
    // section 태그 내부의 내용만 추출 (section 태그 자체는 제외)
    const sectionContent = match[1].trim();

    // 파일로 저장
    const outputPath = path.join(componentsDir, `${componentName}.html`);
    fs.writeFileSync(outputPath, sectionContent, 'utf-8');

    console.log(`  ✅ Saved to ${componentName}.html`);
  } else {
    console.log(`  ❌ Could not find section for ${componentName}`);
  }
});

console.log('\n✅ All components extracted successfully!');
