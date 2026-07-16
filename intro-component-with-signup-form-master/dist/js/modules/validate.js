const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const validateError = {
    'firstName': {
        'empty': 'First name cannot be empty.',
        'valid': 'First name must be valid.'
    },
    'lastName': {
        'empty': 'Last name cannot be empty.',
        'valid': 'Last name must be valid.'
    },
    'email': {
        'valid': 'Please enter a valid email address.'
    },
    'password': {
        'empty': 'Password cannot be empty.',
        'weakPassword': 'Your password is too weak.'
    },
}

const displayInputError = (inputId, errorType, elementInput) => {
    const inputError = elementInput.nextElementSibling;

    inputError.textContent = validateError[inputId][errorType];
    elementInput.classList.add('validate-error-input');
}

const clearInputError = (elementInput) => {
    const inputError = elementInput.nextElementSibling;

    inputError.textContent = '';
    elementInput.classList.remove('validate-error-input');
}

const validateFirstName = () => {
    const re = /^[a-z]{2,12}$/

    const value = firstNameInput.value.toLowerCase();

    if (firstNameInput.value.trim().length === 0) {
        displayInputError('firstName', 'empty', firstNameInput);
        return false;
    }
    if (!re.test(value)) {
        displayInputError('firstName', 'valid', firstNameInput);
        return false;
    }
    clearInputError(firstNameInput);
    return true;
};

const validateLastName = () => {
    const re = /^[a-z]{4,12}$/

    const value = lastNameInput.value.toLowerCase();

    if (lastNameInput.value.trim().length === 0) {
        displayInputError('lastName', 'empty', lastNameInput);
        return false;
    }
    if (!re.test(value)) {
        displayInputError('lastName', 'valid', lastNameInput);
        return false;
    }
    clearInputError(lastNameInput);
    return true;
};

const validateEmail = () => {
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const value = emailInput.value.trim();

    if (value.length === 0) {
        displayInputError('email', 'empty', emailInput);
        return false;
    }
    if (!re.test(value)) {
        displayInputError('email', 'valid', lastNameInput);
        return false;
    }
    clearInputError(emailInput);
    return true;
};

const validatePassword = () => {
    const reWeak = /^[\w]{1,4}$/;

    const value = passwordInput.value.trim();

    if (value.length === 0) {
        displayInputError('password', 'empty', passwordInput);
        return false;
    }
    if (reWeak.test(value)) {
        displayInputError('password', 'weakPassword', passwordInput);
        return false;
    }
    clearInputError(passwordInput);
    return true;
};

export const validateForm = () => {
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid) {
        return true;
    }
    return false;
}
