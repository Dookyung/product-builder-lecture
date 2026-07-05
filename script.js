// 1~45 숫자 중 중복 없이 5개 뽑아 정렬하는 함수
function getLottoNumbers() {
    const numbers = [];
    while (numbers.length < 5) {
        const randNum = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(randNum)) {
            numbers.push(randNum);
        }
    }
    return numbers.sort((a, b) => a - b);
}

// 숫자에 따른 색상 클래스 지정 함수
function getColorClass(num) {
    if (num <= 10) return 'range-1';
    if (num <= 20) return 'range-2';
    if (num <= 30) return 'range-3';
    if (num <= 40) return 'range-4';
    return 'range-5';
}

// 5게임 생성하여 화면에 그리는 함수
function generateLotto() {
    const container = document.getElementById('lotto-results');
    container.innerHTML = '';

    const numbers = getLottoNumbers();
    numbers.forEach(num => {
        const ball = document.createElement('div');
        ball.className = `ball ${getColorClass(num)}`;
        ball.innerText = num;
        container.appendChild(ball);
    });
}

// 테마(다크/화이트) 적용 및 토글 함수
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.innerText = theme === 'dark' ? '☀️ 라이트' : '🌙 다크';
    }
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
}

// 제휴문의 폼: 페이지 이동 없이 Formspree로 전송
function setupContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        status.className = 'form-status';
        status.innerText = '전송 중...';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                form.reset();
                status.className = 'form-status success';
                status.innerText = '문의가 접수되었습니다. 감사합니다! 🙌';
            } else {
                const data = await response.json().catch(() => ({}));
                const msg = data.errors ? data.errors.map(err => err.message).join(', ')
                                        : '전송에 실패했습니다. 잠시 후 다시 시도해주세요.';
                status.className = 'form-status error';
                status.innerText = msg;
            }
        } catch (err) {
            status.className = 'form-status error';
            status.innerText = '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
        }
    });
}

// 페이지 로드 시: 저장된 테마 적용 + 첫 번호 자동 생성 + 폼 연결
window.onload = function () {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
    generateLotto();
    setupContactForm();
};
