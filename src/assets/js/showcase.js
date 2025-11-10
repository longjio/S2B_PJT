// ============================================
// 🎨 Component Showcase JavaScript
// ============================================
// 컴포넌트 쇼케이스 전용 기능

console.log('Showcase JavaScript loaded');

// ============================================
// Component Loader
// ============================================
import componentLoader from './componentLoader.js';

// 로드된 컴포넌트 추적
const loadedComponents = new Set();

// ============================================
// Copy to Clipboard 기능
// ============================================
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.btn-copy');

  copyButtons.forEach(button => {
    button.addEventListener('click', async function() {
      const targetId = this.getAttribute('data-copy');
      const codeElement = document.getElementById(targetId);

      if (!codeElement) {
        console.error('Code element not found:', targetId);
        return;
      }

      try {
        // 코드 텍스트 가져오기
        const code = codeElement.textContent;

        // 클립보드에 복사
        await navigator.clipboard.writeText(code);

        // 버튼 상태 변경
        const originalText = this.textContent;
        this.classList.add('copied');
        this.textContent = 'Copied!';

        // 2초 후 원래 상태로 복원
        setTimeout(() => {
          this.classList.remove('copied');
          this.textContent = originalText;
        }, 2000);

        console.log('Code copied to clipboard:', targetId);
      } catch (err) {
        console.error('Failed to copy code:', err);
        alert('코드 복사에 실패했습니다.');
      }
    });
  });

  console.log(`${copyButtons.length}개의 복사 버튼이 초기화되었습니다.`);
}

// ============================================
// Tab Navigation for Components
// ============================================
function initTabNavigation() {
  const navLinks = document.querySelectorAll('.showcase__nav a[data-tab]');
  const sections = document.querySelectorAll('.showcase__section[data-tab-content]');

  // 모든 섹션 숨기기
  function hideAllSections() {
    sections.forEach(section => {
      section.style.display = 'none';
    });
  }

  // 특정 섹션 보이기
  async function showSection(tabId) {
    hideAllSections();
    const targetSection = document.querySelector(`[data-tab-content="${tabId}"]`);
    if (targetSection) {
      targetSection.style.display = 'block';

      // 컴포넌트가 아직 로드되지 않았다면 로드
      if (!loadedComponents.has(tabId)) {
        try {
          console.log(`Loading component: ${tabId}...`);
          await componentLoader.insertComponent(tabId, targetSection);
          loadedComponents.add(tabId);

          // 컴포넌트 로드 후 필요한 초기화 실행
          initCopyButtons();

          // Scrollspy는 특별 처리
          if (tabId === 'scrollspy') {
            setTimeout(() => {
              initScrollspyLinks();
            }, 100);
          }

          // Tooltips와 Popovers 재초기화
          if (tabId === 'tooltips' || tabId === 'popovers') {
            initTooltipsAndPopovers();
          }

          // Tabulator 초기화
          if (tabId === 'tabulator') {
            setTimeout(() => {
              initTabulatorTables();
            }, 100);
          }

          // DatePicker 초기화
          if (tabId === 'datepicker') {
            setTimeout(() => {
              initDatePickers();
            }, 100);
          }
        } catch (error) {
          console.error(`Failed to load component ${tabId}:`, error);
        }
      }

      // 페이지 맨 위로 스크롤
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  // 초기 상태: 첫 번째 탭만 보이기
  hideAllSections();
  const firstTab = navLinks[0]?.getAttribute('data-tab');
  if (firstTab) {
    showSection(firstTab); // async 함수지만 await 없이 호출 (백그라운드 로딩)
  }

  // 탭 클릭 이벤트
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      // 활성 상태 업데이트
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      // 탭 전환
      const tabId = this.getAttribute('data-tab');
      showSection(tabId);

      console.log('Tab switched to:', tabId);
    });
  });

  console.log('Tab navigation 초기화 완료');
}

// ============================================
// Tabulator Initialization
// ============================================
function initTabulatorTables() {
  // 게시판 스타일 테이블 데이터
  const boardData = [
    { id: 15, title: 'Tabulator 사용법 가이드', author: '관리자', date: '2025-01-15', views: 245 },
    { id: 14, title: '공지사항 - 중요한 안내', author: '운영자', date: '2025-01-14', views: 189 },
    { id: 13, title: 'Vite + Bootstrap 개발 환경 설정', author: '개발자', date: '2025-01-13', views: 156 },
    { id: 12, title: 'SCSS 변수 커스터마이징 팁', author: '디자이너', date: '2025-01-12', views: 134 },
    { id: 11, title: '컴포넌트 쇼케이스 업데이트', author: '관리자', date: '2025-01-11', views: 98 },
    { id: 10, title: '플랫 디자인 적용 완료', author: '운영자', date: '2025-01-10', views: 87 },
    { id: 9, title: 'Primary 컬러 변경 안내', author: '디자이너', date: '2025-01-09', views: 76 },
    { id: 8, title: '탭 네비게이션 시스템 개선', author: '개발자', date: '2025-01-08', views: 65 },
    { id: 7, title: 'Bootstrap 5.3.8 업데이트', author: '관리자', date: '2025-01-07', views: 123 },
    { id: 6, title: '반응형 디자인 최적화', author: '개발자', date: '2025-01-06', views: 112 },
    { id: 5, title: 'Sass 빌드 속도 개선', author: '운영자', date: '2025-01-05', views: 95 },
    { id: 4, title: '코드 복사 기능 추가', author: '개발자', date: '2025-01-04', views: 203 },
    { id: 3, title: 'Footer 디자인 업데이트', author: '디자이너', date: '2025-01-03', views: 145 },
    { id: 2, title: 'Header 세로 정렬 수정', author: '개발자', date: '2025-01-02', views: 178 },
    { id: 1, title: '프로젝트 초기 설정 완료', author: '관리자', date: '2025-01-01', views: 267 }
  ];

  // 컴팩트 테이블 데이터
  const compactData = [
    { no: 1, name: '홍길동', email: 'hong@example.com', status: '활성' },
    { no: 2, name: '김철수', email: 'kim@example.com', status: '활성' },
    { no: 3, name: '이영희', email: 'lee@example.com', status: '대기' },
    { no: 4, name: '박민수', email: 'park@example.com', status: '활성' },
    { no: 5, name: '정수진', email: 'jung@example.com', status: '비활성' },
    { no: 6, name: '최동욱', email: 'choi@example.com', status: '활성' },
    { no: 7, name: '강미란', email: 'kang@example.com', status: '활성' },
    { no: 8, name: '윤서준', email: 'yoon@example.com', status: '대기' }
  ];

  // 게시판 테이블 초기화 (Vanilla JS!)
  const boardTableEl = document.getElementById('boardTable');
  if (boardTableEl && window.Tabulator) {
    new window.Tabulator("#boardTable", {
      data: boardData,
      layout: "fitColumns",
      pagination: true,
      paginationSize: 10,
      paginationSizeSelector: [10, 20, 50],
      locale: "ko-kr",
      langs: {
        "ko-kr": {
          "pagination": {
            "first": "처음",
            "first_title": "첫 페이지",
            "last": "마지막",
            "last_title": "마지막 페이지",
            "prev": "이전",
            "prev_title": "이전 페이지",
            "next": "다음",
            "next_title": "다음 페이지",
            "page_size": "페이지 크기"
          }
        }
      },
      columns: [
        { title: "번호", field: "id", sorter: "number", width: 80, hozAlign: "center" },
        { title: "제목", field: "title", sorter: "string" },
        { title: "작성자", field: "author", sorter: "string", width: 120, hozAlign: "center" },
        { title: "작성일", field: "date", sorter: "date", width: 120, hozAlign: "center" },
        { title: "조회", field: "views", sorter: "number", width: 80, hozAlign: "center" }
      ]
    });
    console.log('Board table initialized (Tabulator)');
  }

  // 컴팩트 테이블 초기화
  const compactTableEl = document.getElementById('compactTable');
  if (compactTableEl && window.Tabulator) {
    new window.Tabulator("#compactTable", {
      data: compactData,
      layout: "fitColumns",
      pagination: true,
      paginationSize: 5,
      locale: "ko-kr",
      langs: {
        "ko-kr": {
          "pagination": {
            "first": "처음",
            "last": "마지막",
            "prev": "이전",
            "next": "다음",
            "page_size": "페이지 크기"
          }
        }
      },
      columns: [
        { title: "No", field: "no", sorter: "number", width: 80, hozAlign: "center" },
        { title: "이름", field: "name", sorter: "string", width: 120 },
        { title: "이메일", field: "email", sorter: "string" },
        { title: "상태", field: "status", sorter: "string", width: 100, hozAlign: "center" }
      ]
    });
    console.log('Compact table initialized (Tabulator)');
  }
}

// ============================================
// DatePicker Initialization
// ============================================
async function initDatePickers() {
  try {
    // Tempus Dominus 동적 임포트
    const { TempusDominus } = await import('@eonasdan/tempus-dominus');

    // 기본 날짜 선택기
    const basicDatepicker = document.getElementById('basicDatepicker');
    if (basicDatepicker) {
      new TempusDominus(basicDatepicker, {
        display: {
          components: {
            clock: false  // 시간 선택 비활성화 (날짜만 선택)
          },
          icons: {
            type: 'icons',
            time: 'bi bi-clock',
            date: 'bi bi-calendar',
            up: 'bi bi-arrow-up',
            down: 'bi bi-arrow-down',
            previous: 'bi bi-chevron-left',
            next: 'bi bi-chevron-right',
            today: 'bi bi-calendar-check',
            clear: 'bi bi-trash',
            close: 'bi bi-x'
          }
        }
      });
      console.log('Basic DatePicker initialized');
    }

    // 날짜 + 시간 선택기
    const datetimePicker = document.getElementById('datetimePicker');
    if (datetimePicker) {
      new TempusDominus(datetimePicker, {
        display: {
          components: {
            clock: true  // 시간 선택 활성화
          },
          icons: {
            type: 'icons',
            time: 'bi bi-clock',
            date: 'bi bi-calendar',
            up: 'bi bi-arrow-up',
            down: 'bi bi-arrow-down',
            previous: 'bi bi-chevron-left',
            next: 'bi bi-chevron-right',
            today: 'bi bi-calendar-check',
            clear: 'bi bi-trash',
            close: 'bi bi-x'
          },
          buttons: {
            today: true,
            clear: true,
            close: true
          }
        },
        localization: {
          locale: 'ko',
          format: 'yyyy-MM-dd HH:mm',
          today: '오늘',
          clear: '지우기',
          close: '닫기'
        }
      });
      console.log('DateTime Picker initialized');
    }

    // 시간만 선택기
    const timePicker = document.getElementById('timePicker');
    if (timePicker) {
      new TempusDominus(timePicker, {
        display: {
          viewMode: 'clock',  // 시간 선택 화면으로 바로 시작
          components: {
            calendar: false,  // 달력(날짜) 선택 완전히 제거
            date: false,      // 날짜 선택 비활성화
            month: false,     // 월 선택 비활성화
            year: false,      // 연도 선택 비활성화
            decades: false,   // 년대 선택 비활성화
            clock: true,      // 시간 선택만 활성화
            hours: true,      // 시 선택 표시
            minutes: true,    // 분 선택 표시
            seconds: false    // 초 선택 숨김
          },
          icons: {
            type: 'icons',
            time: 'bi bi-clock',
            date: 'bi bi-calendar',
            up: 'bi bi-arrow-up',
            down: 'bi bi-arrow-down',
            previous: 'bi bi-chevron-left',
            next: 'bi bi-chevron-right',
            today: 'bi bi-calendar-check',
            clear: 'bi bi-trash',
            close: 'bi bi-x'
          },
          buttons: {
            today: false,  // 시간만 선택하므로 '오늘' 버튼 불필요
            clear: true,
            close: true
          }
        },
        localization: {
          locale: 'ko',
          format: 'HH:mm',
          clear: '지우기',
          close: '닫기'
        }
      });
      console.log('Time Picker initialized');
    }

    // 날짜 범위 선택기
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    if (startDate && endDate) {
      const startPicker = new TempusDominus(startDate, {
        display: {
          components: {
            clock: false
          },
          icons: {
            type: 'icons',
            time: 'bi bi-clock',
            date: 'bi bi-calendar',
            up: 'bi bi-arrow-up',
            down: 'bi bi-arrow-down',
            previous: 'bi bi-chevron-left',
            next: 'bi bi-chevron-right',
            today: 'bi bi-calendar-check',
            clear: 'bi bi-trash',
            close: 'bi bi-x'
          },
          buttons: {
            today: true,
            clear: true,
            close: true
          }
        },
        localization: {
          locale: 'ko',
          format: 'yyyy-MM-dd',
          today: '오늘',
          clear: '지우기',
          close: '닫기'
        }
      });

      const endPicker = new TempusDominus(endDate, {
        display: {
          components: {
            clock: false
          },
          icons: {
            type: 'icons',
            time: 'bi bi-clock',
            date: 'bi bi-calendar',
            up: 'bi bi-arrow-up',
            down: 'bi bi-arrow-down',
            previous: 'bi bi-chevron-left',
            next: 'bi bi-chevron-right',
            today: 'bi bi-calendar-check',
            clear: 'bi bi-trash',
            close: 'bi bi-x'
          },
          buttons: {
            today: true,
            clear: true,
            close: true
          }
        },
        localization: {
          locale: 'ko',
          format: 'yyyy-MM-dd',
          today: '오늘',
          clear: '지우기',
          close: '닫기'
        },
        useCurrent: false
      });

      // 시작일이 변경되면 종료일의 최소값 설정
      startPicker.subscribe('change.td', (e) => {
        endPicker.updateOptions({
          restrictions: {
            minDate: e.date
          }
        });
      });

      // 종료일이 변경되면 시작일의 최대값 설정
      endPicker.subscribe('change.td', (e) => {
        startPicker.updateOptions({
          restrictions: {
            maxDate: e.date
          }
        });
      });

      console.log('Date Range Picker initialized');
    }

    // 통합 날짜 범위 선택기 (하나의 input에 from~to 표시)
    const combinedDateRangeInput = document.getElementById('combinedDateRangeInput');
    const combinedDateRangeBtn = document.getElementById('combinedDateRangeBtn');
    const combinedDateRangeContainer = document.getElementById('combinedDateRangeContainer');
    const combinedStartDateEl = document.getElementById('combinedStartDate');
    const combinedEndDateEl = document.getElementById('combinedEndDate');

    if (combinedDateRangeInput && combinedDateRangeBtn && combinedDateRangeContainer && combinedStartDateEl && combinedEndDateEl) {
      // 시작 날짜 인라인 DatePicker
      const combinedStartPicker = new TempusDominus(combinedStartDateEl, {
        display: {
          inline: true,
          components: {
            clock: false
          },
          icons: {
            type: 'icons',
            time: 'bi bi-clock',
            date: 'bi bi-calendar',
            up: 'bi bi-arrow-up',
            down: 'bi bi-arrow-down',
            previous: 'bi bi-chevron-left',
            next: 'bi bi-chevron-right',
            today: 'bi bi-calendar-check',
            clear: 'bi bi-trash',
            close: 'bi bi-x'
          },
          buttons: {
            today: false,  // 개별 버튼 제거 (통합 버튼 사용)
            clear: false,
            close: false
          },
          keepOpen: true
        },
        localization: {
          locale: 'ko',
          format: 'yyyy-MM-dd'
        }
      });

      // 종료 날짜 인라인 DatePicker
      const combinedEndPicker = new TempusDominus(combinedEndDateEl, {
        display: {
          inline: true,
          components: {
            clock: false
          },
          icons: {
            type: 'icons',
            time: 'bi bi-clock',
            date: 'bi bi-calendar',
            up: 'bi bi-arrow-up',
            down: 'bi bi-arrow-down',
            previous: 'bi bi-chevron-left',
            next: 'bi bi-chevron-right',
            today: 'bi bi-calendar-check',
            clear: 'bi bi-trash',
            close: 'bi bi-x'
          },
          buttons: {
            today: false,  // 개별 버튼 제거 (통합 버튼 사용)
            clear: false,
            close: false
          },
          keepOpen: true
        },
        localization: {
          locale: 'ko',
          format: 'yyyy-MM-dd'
        },
        useCurrent: false
      });

      // 캘린더 아이콘 클릭 시 토글
      combinedDateRangeBtn.addEventListener('click', () => {
        if (combinedDateRangeContainer.style.display === 'none' || !combinedDateRangeContainer.style.display) {
          combinedDateRangeContainer.style.display = 'block';
        } else {
          combinedDateRangeContainer.style.display = 'none';
        }
      });

      // 날짜 선택 시 input 업데이트
      function updateCombinedInput() {
        const startDate = combinedStartPicker.dates.lastPicked;
        const endDate = combinedEndPicker.dates.lastPicked;

        // 날짜를 YYYY-MM-DD 형식으로 포맷하는 헬퍼 함수
        function formatDate(dateTime) {
          if (!dateTime) return '';
          const year = dateTime.year;
          const month = String(dateTime.month + 1).padStart(2, '0'); // month는 0부터 시작
          const day = String(dateTime.date).padStart(2, '0');
          return `${year}-${month}-${day}`;
        }

        if (startDate && endDate) {
          combinedDateRangeInput.value = `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
        } else if (startDate) {
          combinedDateRangeInput.value = `${formatDate(startDate)} ~ `;
        } else if (endDate) {
          combinedDateRangeInput.value = ` ~ ${formatDate(endDate)}`;
        }
      }

      // 시작일이 변경되면 종료일의 최소값 설정
      combinedStartPicker.subscribe('change.td', (e) => {
        if (e.date) {
          combinedEndPicker.updateOptions({
            restrictions: {
              minDate: e.date
            }
          });
        }
        updateCombinedInput();
      });

      // 종료일이 변경되면 시작일의 최대값 설정
      combinedEndPicker.subscribe('change.td', (e) => {
        if (e.date) {
          combinedStartPicker.updateOptions({
            restrictions: {
              maxDate: e.date
            }
          });
        }
        updateCombinedInput();
      });

      // 통합 버튼 기능
      const combinedSelectBtn = document.getElementById('combinedSelectBtn');
      const combinedClearBtn = document.getElementById('combinedClearBtn');

      // 선택 버튼: 날짜 범위 확정 및 DatePicker 닫기
      if (combinedSelectBtn) {
        combinedSelectBtn.addEventListener('click', () => {
          const startDate = combinedStartPicker.dates.lastPicked;
          const endDate = combinedEndPicker.dates.lastPicked;

          // 양쪽 날짜가 모두 선택된 경우만 닫기
          if (startDate && endDate) {
            updateCombinedInput();
            combinedDateRangeContainer.style.display = 'none';
          } else {
            // 날짜가 선택되지 않은 경우 알림
            alert('시작일과 종료일을 모두 선택해주세요.');
          }
        });
      }

      // 지우기 버튼: 양쪽 날짜 모두 초기화
      if (combinedClearBtn) {
        combinedClearBtn.addEventListener('click', () => {
          combinedStartPicker.dates.clear();
          combinedEndPicker.dates.clear();
          combinedDateRangeInput.value = '';
          // 제약 조건도 초기화
          combinedStartPicker.updateOptions({
            restrictions: {
              maxDate: undefined
            }
          });
          combinedEndPicker.updateOptions({
            restrictions: {
              minDate: undefined
            }
          });
        });
      }

      console.log('Combined Date Range Picker initialized');
    }

    // 인라인 날짜 선택기
    const inlineDatepicker = document.getElementById('inlineDatepicker');
    if (inlineDatepicker) {
      new TempusDominus(inlineDatepicker, {
        display: {
          inline: true,
          components: {
            clock: false
          },
          icons: {
            type: 'icons',
            time: 'bi bi-clock',
            date: 'bi bi-calendar',
            up: 'bi bi-arrow-up',
            down: 'bi bi-arrow-down',
            previous: 'bi bi-chevron-left',
            next: 'bi bi-chevron-right',
            today: 'bi bi-calendar-check',
            clear: 'bi bi-trash',
            close: 'bi bi-x'
          },
          buttons: {
            today: true,
            clear: true,
            close: false  // 인라인 모드에서는 닫기 버튼 불필요
          },
          keepOpen: true  // 인라인 모드에서 항상 열린 상태 유지
        },
        localization: {
          locale: 'ko',
          format: 'yyyy-MM-dd',
          today: '오늘',
          clear: '지우기'
        }
      });
      console.log('Inline DatePicker initialized');
    }

    // 특정 날짜 비활성화 (주말 제외)
    const restrictedDatepicker = document.getElementById('restrictedDatepicker');
    if (restrictedDatepicker) {
      new TempusDominus(restrictedDatepicker, {
        display: {
          components: {
            clock: false
          },
          icons: {
            type: 'icons',
            time: 'bi bi-clock',
            date: 'bi bi-calendar',
            up: 'bi bi-arrow-up',
            down: 'bi bi-arrow-down',
            previous: 'bi bi-chevron-left',
            next: 'bi bi-chevron-right',
            today: 'bi bi-calendar-check',
            clear: 'bi bi-trash',
            close: 'bi bi-x'
          },
          buttons: {
            today: true,
            clear: true,
            close: true
          }
        },
        restrictions: {
          daysOfWeekDisabled: [0, 6] // 일요일(0), 토요일(6) 비활성화
        },
        localization: {
          locale: 'ko',
          format: 'yyyy-MM-dd',
          today: '오늘',
          clear: '지우기',
          close: '닫기'
        }
      });
      console.log('Restricted DatePicker initialized');
    }

    console.log('✅ All DatePickers initialized');
  } catch (error) {
    console.error('Failed to initialize DatePickers:', error);
  }
}

// ============================================
// Tooltips & Popovers Initialization
// ============================================
function initTooltipsAndPopovers() {
  // Bootstrap이 로드되었는지 확인
  if (typeof bootstrap === 'undefined') {
    console.warn('Bootstrap이 로드되지 않았습니다.');
    return;
  }

  // Tooltips 초기화
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl =>
    new bootstrap.Tooltip(tooltipTriggerEl)
  );
  console.log(`${tooltipList.length}개의 Tooltips 초기화 완료`);

  // Popovers 초기화
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl =>
    new bootstrap.Popover(popoverTriggerEl)
  );
  console.log(`${popoverList.length}개의 Popovers 초기화 완료`);
}

// ============================================
// Scrollspy Navigation Links Fix
// ============================================
function initScrollspyLinks() {
  // 모든 Scrollspy 컨테이너 찾기
  const scrollspyContainers = document.querySelectorAll('[data-bs-spy="scroll"]');

  scrollspyContainers.forEach(container => {
    const targetId = container.getAttribute('data-bs-target');
    if (!targetId) return;

    const navElement = document.querySelector(targetId);
    if (!navElement) return;

    // 해당 네비게이션의 모든 링크 찾기
    const links = navElement.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // '#' 또는 빈 href는 무시
        if (!href || href === '#') return;

        const targetElement = container.querySelector(href);

        if (targetElement) {
          // 기본 앵커 동작 완전히 차단
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          // 스크롤 컨테이너 내에서만 스크롤
          const containerTop = container.scrollTop;
          const containerRect = container.getBoundingClientRect();
          const targetRect = targetElement.getBoundingClientRect();
          const offset = targetRect.top - containerRect.top;

          container.scrollTo({
            top: containerTop + offset - 10,
            behavior: 'smooth'
          });

          console.log('✅ Scrollspy 내부 스크롤:', href, 'in container:', targetId);

          return false;
        }
      });
    });
  });

  console.log('✅ Scrollspy 링크 이벤트 리스너 등록 완료:', scrollspyContainers.length, '개 컨테이너');
}

// ============================================
// Initialize All
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('Showcase 초기화 시작...');

  initCopyButtons();
  initTabNavigation();
  initTooltipsAndPopovers();
  initScrollspyLinks();

  console.log('✅ Showcase 초기화 완료!');
});
