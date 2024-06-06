const logos = [
    { src: 'VA.jpg', name: 'Virgin Atlantic' },
    { src: 'T.jpg', name: 'Tesla' },
    { src: 'GW.jpg', name: 'Geb Web' },
    { src: 'GT.jpg', name: 'OpenAI' },
    { src: 'AE.jpg', name: 'Alpha Electrical' },
    { src: 'BL.jpg', name: 'Bandlab' },
    { src: 'IW.jpg', name: 'Isle Of Wight' },
];

let currentLogoIndex = 0;
let score = 0;

function loadLogo() {
    const logoElement = document.getElementById('logo');
    logoElement.src = logos[currentLogoIndex].src;
    logoElement.alt = `logo ${currentLogoIndex + 1}`;
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = score;
}

function showEndMessage() {
    const endMessageElement = document.getElementById('end-message');
    endMessageElement.innerHTML = `Well done! You got to the end of the game with a score of... <br><span class="final-score">Score: ${score}/${logos.length}</span>`;
    endMessageElement.style.display = 'block';
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function nextLogo() {
    currentLogoIndex += 1;

    if (currentLogoIndex < logos.length) {
        loadLogo();
    } else {
        const gameContainer = document.querySelector('.game-container');
        const children = gameContainer.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].id !== 'end-message') {
                children[i].style.display = 'none';
            }
        }
        showEndMessage();
        triggerConfetti();
    }
}

function checkGuess() {
    const userGuess = document.getElementById('guess').value.trim().toLowerCase();
    const resultElement = document.getElementById('result');

    if (userGuess === logos[currentLogoIndex].name.toLowerCase()) {
        resultElement.textContent = 'Correct!';
        resultElement.style.color = 'green';
        score += 1;
        updateScore();
        setTimeout(() => {
            resultElement.textContent = '';
            nextLogo();
        }, 3000);
    } else {
        resultElement.textContent = 'Try again!';
        resultElement.style.color = 'red';
        setTimeout(() => {
            resultElement.textContent = '';
        }, 3000);
    }

    document.getElementById('guess').value = '';
}

function skipLogo() {
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Skipped! The correct answer was ${logos[currentLogoIndex].name}.`;
    resultElement.style.color = 'blue';

    setTimeout(() => {
        resultElement.textContent = '';
        nextLogo();
    }, 2000);
}

document.getElementById('submit-guess').addEventListener('click', checkGuess);
document.getElementById('skip-logo').addEventListener('click', skipLogo);

window.onload = () => {
    loadLogo();
    updateScore();
};