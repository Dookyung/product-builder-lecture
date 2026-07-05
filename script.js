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

// 페이지 로드 시 첫 번호 자동 생성
window.onload = generateLotto;
