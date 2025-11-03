// ============================================
// Template Loader
// ============================================
// HTML 템플릿을 로드하고 변수를 치환하는 유틸리티

class TemplateLoader {
  constructor() {
    this.cache = new Map();
  }

  /**
   * 템플릿 HTML을 로드합니다
   * @param {string} templatePath - 템플릿 경로 (예: 'sections/hero.html')
   * @returns {Promise<string>} 템플릿 HTML 문자열
   */
  async loadTemplate(templatePath) {
    // 캐시에 있으면 반환
    if (this.cache.has(templatePath)) {
      return this.cache.get(templatePath);
    }

    try {
      const response = await fetch(`/src/templates/${templatePath}`);
      if (!response.ok) {
        throw new Error(`Failed to load template: ${templatePath}`);
      }
      const html = await response.text();
      this.cache.set(templatePath, html);
      return html;
    } catch (error) {
      console.error(`Error loading template ${templatePath}:`, error);
      throw error;
    }
  }

  /**
   * 템플릿의 변수를 실제 값으로 치환합니다
   * @param {string} template - 템플릿 문자열
   * @param {Object} data - 변수와 값의 객체
   * @returns {string} 치환된 HTML 문자열
   */
  renderTemplate(template, data = {}) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] !== undefined ? data[key] : '';
    });
  }

  /**
   * 템플릿을 로드하고 렌더링합니다
   * @param {string} templatePath - 템플릿 경로
   * @param {Object} data - 변수 데이터
   * @returns {Promise<string>} 렌더링된 HTML
   */
  async render(templatePath, data = {}) {
    const template = await this.loadTemplate(templatePath);
    return this.renderTemplate(template, data);
  }

  /**
   * 템플릿을 특정 요소에 삽입합니다
   * @param {string} templatePath - 템플릿 경로
   * @param {HTMLElement} targetElement - 삽입할 대상 요소
   * @param {Object} data - 변수 데이터
   */
  async insertTemplate(templatePath, targetElement, data = {}) {
    try {
      const html = await this.render(templatePath, data);
      targetElement.innerHTML = html;
      console.log(`✅ Template inserted: ${templatePath}`);
    } catch (error) {
      console.error(`❌ Failed to insert template ${templatePath}:`, error);
      targetElement.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <strong>Error:</strong> Failed to load template "${templatePath}".
        </div>
      `;
    }
  }

  /**
   * 캐시를 클리어합니다
   */
  clearCache() {
    this.cache.clear();
    console.log('Template cache cleared');
  }
}

// 싱글톤 인스턴스 생성
const templateLoader = new TemplateLoader();

// ES Module export
export default templateLoader;

// 전역으로도 사용 가능하도록
if (typeof window !== 'undefined') {
  window.templateLoader = templateLoader;
}
