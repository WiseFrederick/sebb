const logos = [
    { src: 'VA.jpg', name: 'Virgin Atlantic' },
    { src: 'T.jpg', name: 'Tesla' },
    { src: 'GW.jpg', name: 'Geb Web' },
];

let currentLogoIndex = 0;

function loadLogo() {
    const logoElement = document.getElementById('logo');
    logoElement.src = logos[currentLogoIndex].src;
    logoElement.alt = `logo ${currentLogoIndex + 1}`;
}

function checkGuess() {
    const userGuess = document.getElementById('guess').value.trim().toLowerCase();
    const resultElement = document.getElementById('result');

    if (userGuess === logos[currentLogoIndex].name.toLowerCase()) {
        resultElement.textContent = 'Correct!';
        resultElement.style.color = 'green';
        currentLogoIndex = (currentLogoIndex + 1) % logos.length;
        loadLogo();
    } else {
        resultElement.textContent = 'Try again!';
        resultElement.style.color = 'red';
    }

    document.getElementById('guess').value = '';
}

document.getElementById('submit-guess').addEventListener('click', checkGuess);

window.onload = loadLogo;
