import './css/index.css'

import { validateCardHolderInput,validateCardNumberInput,validateExpDateMonthInput,validateExpDateYearInput,validateCvcInput } from './components/form';

const cardDetailsForm = document.querySelector(".card-details__form");

cardDetailsForm.addEventListener("submit",(event) => {

    event.preventDefault();

    const isCardHolderTrue = validateCardHolderInput();
    const isCardNumberTrue = validateCardNumberInput();
    const isExpDateMonthTrue = validateExpDateMonthInput();
    const isExpDateYearTrue = validateExpDateYearInput();
    const isCvcTrue = validateCvcInput();

    if(isCardHolderTrue && isCardNumberTrue && isExpDateMonthTrue && isExpDateYearTrue && isCvcTrue){

        const cardDetailsMainContent = document.querySelector(".card-details__form-main-content");
        const cardDetailsSubmit = document.querySelector(".card-details__submit");
        const cardDetailsSuccessMessage = document.querySelector(".card-details__success-message");

        cardDetailsMainContent.innerHTML = "";
        cardDetailsSuccessMessage.classList.remove("hidden");

        cardDetailsSubmit.textContent = "Continue";

    }
})


