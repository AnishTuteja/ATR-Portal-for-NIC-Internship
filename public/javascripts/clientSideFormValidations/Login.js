const loginForm = document.getElementById('loginForm');
const username = document.getElementById('username');
const password = document.getElementById('password');

const isLoginFormRequired = [username, password];

loginForm.addEventListener('submit', (e) => {
    let isValidForm = true;
    Array.from(isLoginFormRequired).forEach((input) => {
        if (!input.value) {
            if (Array.from(input.classList).includes('is-valid'))
                input.classList.toggle('is-valid');
            input.classList.add('is-invalid');
            isValidForm = false;
        } else {
            if (Array.from(input.classList).includes('is-invalid'))
                input.classList.toggle('is-invalid');
            input.classList.add('is-valid');
        }
    })
    if (!isValidForm) {
        e.preventDefault();
    }
})
