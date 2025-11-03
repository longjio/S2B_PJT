// ============================================
// Component Loader
// ============================================
// 컴포넌트 HTML 파일을 동적으로 로드하고 삽입하는 유틸리티

class ComponentLoader {
  constructor() {
    this.cache = new Map();
    this.loadingPromises = new Map();
  }

  /**
   * 컴포넌트 HTML을 로드합니다
   * @param {string} componentName - 컴포넌트 이름 (예: 'accordion', 'buttons')
   * @returns {Promise<string>} 컴포넌트 HTML 문자열
   */
  async loadComponent(componentName) {
    // 캐시에 있으면 반환
    if (this.cache.has(componentName)) {
      return this.cache.get(componentName);
    }

    // 이미 로딩 중이면 해당 Promise 반환
    if (this.loadingPromises.has(componentName)) {
      return this.loadingPromises.get(componentName);
    }

    // 새로운 로딩 Promise 생성
    const loadPromise = fetch(`/components/${componentName}.html`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load component: ${componentName}`);
        }
        return response.text();
      })
      .then(html => {
        // 캐시에 저장
        this.cache.set(componentName, html);
        this.loadingPromises.delete(componentName);
        return html;
      })
      .catch(error => {
        console.error(`Error loading component ${componentName}:`, error);
        this.loadingPromises.delete(componentName);
        throw error;
      });

    this.loadingPromises.set(componentName, loadPromise);
    return loadPromise;
  }

  /**
   * 컴포넌트를 특정 요소에 삽입합니다
   * @param {string} componentName - 컴포넌트 이름
   * @param {HTMLElement} targetElement - 삽입할 대상 요소
   */
  async insertComponent(componentName, targetElement) {
    try {
      const html = await this.loadComponent(componentName);
      targetElement.innerHTML = html;
      console.log(`✅ Component loaded: ${componentName}`);
    } catch (error) {
      console.error(`❌ Failed to insert component ${componentName}:`, error);
      targetElement.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <strong>Error:</strong> Failed to load component "${componentName}".
        </div>
      `;
    }
  }

  /**
   * 여러 컴포넌트를 병렬로 로드합니다
   * @param {string[]} componentNames - 컴포넌트 이름 배열
   * @returns {Promise<Map<string, string>>} 컴포넌트 이름과 HTML의 Map
   */
  async loadMultiple(componentNames) {
    const promises = componentNames.map(name =>
      this.loadComponent(name).then(html => [name, html])
    );

    const results = await Promise.allSettled(promises);
    const componentsMap = new Map();

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const [name, html] = result.value;
        componentsMap.set(name, html);
      } else {
        console.error(`Failed to load component ${componentNames[index]}:`, result.reason);
      }
    });

    return componentsMap;
  }

  /**
   * 캐시를 클리어합니다
   */
  clearCache() {
    this.cache.clear();
    console.log('Component cache cleared');
  }
}

// 싱글톤 인스턴스 생성 및 export
const componentLoader = new ComponentLoader();
export default componentLoader;
