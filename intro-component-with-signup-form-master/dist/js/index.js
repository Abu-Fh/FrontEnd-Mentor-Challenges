import { validateForm } from "./modules/validate.js";

const signupForm = document.querySelector('.signup-form');
const validFormSuccessMessage = document.querySelector('.valid-form-success-message');

signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateForm()) {
        validFormSuccessMessage.classList.remove('hidden');
        return;
    }
    validFormSuccessMessage.classList.add('hidden');
})