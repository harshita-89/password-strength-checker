const passwordInput = document.getElementById("password");
const strengthMeter = document.getElementById("strength-meter-fill");
const strengthText = document.getElementById("strength-text");

const lengthReq = document.getElementById('length').querySelector('span:first-child');
const uppercaseReq = document.getElementById('uppercase').querySelector('span:first-child');
const lowercaseReq = document.getElementById('lowercase').querySelector('span:first-child');
const numberReq = document.getElementById('number').querySelector('span:first-child');
const specialCharReq = document.getElementById('specialChar').querySelector('span:first-child');

const lengthRegex = /.{8,}/;
const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const numberRegex = /[0-9]/;
const specialCharRegex = /[!@#$%^&*()\-_+={}[\]:;"'|\\<>,.?/~`]/;

passwordInput.addEventListener('input', updateStrength);

function updateStrength() {
    const password = passwordInput.value;
    let strength = 0;
    const requirements = [
        { regex: lengthRegex, element: lengthReq },
        { regex: uppercaseRegex, element: uppercaseReq },
        { regex: lowercaseRegex, element: lowercaseReq },
        { regex: numberRegex, element: numberReq },
        { regex: specialCharRegex, element: specialCharReq }
    ];

    requirements.forEach((item) => {
        if (item.regex.test(password)) {
            strength += 20;
            item.element.textContent = '✅';
        } else {
            item.element.textContent = '❌';
        }
    });

    strengthMeter.style.width = `${strength}%`;

    if (password.length === 0) {
        strengthText.textContent = 'No password';
        strengthMeter.style.backgroundColor = '#e0e0e0';
    } else if (strength < 40) {
        strengthText.textContent = 'Weak';
        strengthMeter.style.backgroundColor = '#ff4d4d';
    } else if (strength < 60) {
        strengthText.textContent = 'Moderate';
        strengthMeter.style.backgroundColor = '#ffA64D';
    } else if (strength < 80) {
        strengthText.textContent = 'Strong';
        strengthMeter.style.backgroundColor = '#A3ff4d';
    } else {
        strengthText.textContent = 'Very Strong';
        strengthMeter.style.backgroundColor = '#32cd32';
    }
}

function togglePasswordVisibility() {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

//confetti 
const form = document.querySelector('form');
const flashMessage = document.getElementById('flash-message');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const password = passwordInput.value;
    let strength = 0;

    const checks = [lengthRegex, uppercaseRegex, lowercaseRegex, numberRegex, specialCharRegex];
    checks.forEach((regex) => {
        if (regex.test(password)) strength += 20;
    });

    if (strength >= 80) {
        flashMessage.classList.remove('opacity-0');
        flashMessage.classList.add('opacity-100');

        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 }
        });

        setTimeout(() => {
            flashMessage.classList.remove('opacity-100');
            flashMessage.classList.add('opacity-0');
        }, 3000);
    } else {
        alert("Password is not strong enough.");
    }
});

updateStrength(); // Initialize on page load

