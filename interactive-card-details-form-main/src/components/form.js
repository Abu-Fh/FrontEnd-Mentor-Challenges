const cardHolderInput = document.getElementById("card-holder");
const cardNumberInput = document.getElementById("card-number");
const expDateMonthInput = document.getElementById("exp-date-month");
const expDateYearInput = document.getElementById("exp-date-year");
const cvcInput = document.getElementById("cvc");

const cardPreviewCvc = document.querySelector(".card-preview__cvc");
const cardPreviewName = document.querySelector(".card-preview__name");
const cardPreviewMonth = document.querySelector(".card-preview__month");
const cardPreviewYear = document.querySelector(".card-preview__year");

const cardPreviewNumberPart1 = document.querySelector(".card-preview__number-part-1")
const cardPreviewNumberPart2 = document.querySelector(".card-preview__number-part-2")
const cardPreviewNumberPart3 = document.querySelector(".card-preview__number-part-3")
const cardPreviewNumberPart4 = document.querySelector(".card-preview__number-part-4")

const formErrorsTypes = {
    "card-holder": {
        "empty": "Can't be blank"
    },
    "card-number": {
        "empty": "Can't be blank",
        "wrong-format": "Wrong format, numbers only"
    },
    "exp-date-month": {
        "empty": "Can't be blank",
        "wrong-format": "Wrong format, numbers only"
    },
    "exp-date-year": {
        "empty": "Can't be blank",
        "wrong-format": "Wrong format, numbers only"
    },
    "cvc": {
        "empty": "Can't be blank",
        "wrong-format": "Wrong format, numbers only"
    }
}

const renderFormErrors = (inputIdElement, errorType, formErrorsTypes, formErrorsTypesInputId) => {

    let errorSpan;

    if (inputIdElement === expDateMonthInput || inputIdElement === expDateYearInput) {
        errorSpan = document.querySelector(".card-details__fieldset").querySelector(".card-details__error");
    }
    else {
        errorSpan = inputIdElement.closest(".card-details__group").querySelector(".card-details__error");
    }

    if (errorType === "null") {
        errorSpan.textContent = "";
        inputIdElement.classList.remove("input-validate-error");
        return;
    }

    errorSpan.textContent = formErrorsTypes[formErrorsTypesInputId][errorType];

    inputIdElement.classList.add("input-validate-error");

    return;
}

export const validateCardHolderInput = () => {

    const value = cardHolderInput.value;

    if (value.trim().length === 0) {
        renderFormErrors(cardHolderInput, "empty", formErrorsTypes, "card-holder");
        return;
    }
    else {
        renderFormErrors(cardHolderInput, "null", formErrorsTypes, "card-holder");
        return true;
    }
}

export const validateCardNumberInput = () => {

    const value = cardNumberInput.value;

    const reg = /^\d{16}$/;

    if (value.trim().length === 0) {
        renderFormErrors(cardNumberInput, "empty", formErrorsTypes, "card-number");
        return false;
    }
    else if (!reg.test(value)) {
        renderFormErrors(cardNumberInput, "wrong-format", formErrorsTypes, "card-number")
        return false;
    }
    else {
        renderFormErrors(cardNumberInput, "null", formErrorsTypes, "card-number");
        return true;
    }
}

export const validateExpDateMonthInput = () => {

    const value = expDateMonthInput.value;

    const reg = /^\d{2}$/;

    if (value.trim().length === 0) {
        renderFormErrors(expDateMonthInput, "empty", formErrorsTypes, "exp-date-month");
        return false;
    }
    else if (!reg.test(value)) {
        renderFormErrors(expDateMonthInput, "wrong-format", formErrorsTypes, "exp-date-month")
        return false;
    }
    else {
        renderFormErrors(expDateMonthInput, "null", formErrorsTypes, "exp-date-month");
        return true;
    }

    return true;
}

export const validateExpDateYearInput = () => {

    const value = expDateYearInput.value;

    const reg = /^\d{2}$/;

    if (value.trim().length === 0) {
        renderFormErrors(expDateYearInput, "empty", formErrorsTypes, "exp-date-year");
        return false;
    }
    else if (!reg.test(value)) {
        renderFormErrors(expDateYearInput, "wrong-format", formErrorsTypes, "exp-date-year")
        return false;
    }
    else {
        renderFormErrors(expDateYearInput, "null", formErrorsTypes, "exp-date-year");
        return true;
    }

}

export const validateCvcInput = () => {

    const value = cvcInput.value;

    const reg = /^\d{3}$/;

    if (value.trim().length === 0) {
        renderFormErrors(cvcInput, "empty", formErrorsTypes, "cvc");
        return false;
    }
    else if (!reg.test(value)) {
        renderFormErrors(cvcInput, "wrong-format", formErrorsTypes, "cvc")
        return false;
    }
    else {
        renderFormErrors(cvcInput, "null", formErrorsTypes, "cvc");
        return true;
    }

    return true;
}

document.addEventListener("input", (event) => {

    if (event.target === cardHolderInput) {
        cardPreviewName.textContent = cardHolderInput.value;
    }
    else if (event.target === cardNumberInput) {

        const part1 = cardNumberInput.value.substring(0, 4);
        const part2 = cardNumberInput.value.substring(4, 8);
        const part3 = cardNumberInput.value.substring(8, 12);
        const part4 = cardNumberInput.value.substring(12, 16);

        cardPreviewNumberPart1.textContent = part1;
        cardPreviewNumberPart2.textContent = part2;
        cardPreviewNumberPart3.textContent = part3;
        cardPreviewNumberPart4.textContent = part4;
    }
    else if (event.target === expDateMonthInput) {
        cardPreviewMonth.textContent = expDateMonthInput.value;
    }
    else if (event.target === expDateYearInput) {
        cardPreviewYear.textContent = expDateYearInput.value;
    }
    else if (event.target === cvcInput) {
        cardPreviewCvc.textContent = cvcInput.value;
    }
})

