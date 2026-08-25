import './main.css'

const ageCalculatorForm = document.querySelector(".age-calculator__form");
const dayInput = document.getElementById("day-input")
const monthInput = document.getElementById("month-input");
const yearInput = document.getElementById("year-input");

const ageCalculatorOutputYear = document.querySelector(".age-calculator__output--year");
const ageCalculatorOutputMonth = document.querySelector(".age-calculator__output--month");
const ageCalculatorOutputDay = document.querySelector(".age-calculator__output--day");

const validMaxMonthsDays = {
    1: 31,
    2: 29,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
}

const ageErrorsObject = {
    "day-error": {
        "empty": "The field is required",
        "valid": "Must be a valid day",
        "future": "Must be in the past"
    },
    "month-error": {
        "empty": "The field is required",
        "valid": "Must be a valid month",
        "future": "Must be in the past"
    },
    "year-error": {
        "empty": "The field is required",
        "future": "Must be in the past"
    }
}

ageCalculatorForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const isDayInputValid = validateDayInput(dayInput, monthInput, yearInput, validMaxMonthsDays);
    const isMonthInputValid = validateMonthInput(monthInput, yearInput);
    const isYearInputValid = validateYearInput(yearInput);

    if (!(isMonthInputValid && isDayInputValid && isYearInputValid)) {
        return;
    }

    calculateAge(isDayInputValid, isMonthInputValid, isYearInputValid);
})

function calculateAge(numberDayInputValueArg, numberMonthInputValueArg, numberYearInputValueArg) {

    const birthDayValue = numberDayInputValueArg;
    const birthMontValue = numberMonthInputValueArg;
    const birthYearValue = numberYearInputValueArg;

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');

    const todayYear = today.getFullYear();
    const date = new Date(birthYearValue, birthMontValue - 1, 0).getDate();

    const todayDay = Number(dd);
    const todayMonth = Number(mm);

    let yearOutput = 0;
    let monthOutput = 0;
    let dayOutput = 0;

    // CALCULATE YEAR
    if (birthMontValue <= todayMonth) {
        yearOutput = todayYear - birthYearValue;
    } else {
        yearOutput = todayYear - birthYearValue - 1;
    }

    // CALCULATE MONTH
    if (birthMontValue <= todayMonth) {
        monthOutput = todayMonth - birthMontValue;
    } else {
        monthOutput = 12 - birthMontValue + todayMonth;
    }

    // CALCULATE DAY
    if (birthDayValue <= todayDay) {
        dayOutput = todayDay - birthDayValue;
    }
    else if (birthMontValue === todayMonth) {
        yearOutput = yearOutput - 1;
        monthOutput = 11;

        dayOutput = date - birthDayValue + todayDay;
    }
    else {
        monthOutput = monthOutput - 1;
        dayOutput = date - birthDayValue + todayDay;
    }

    displayAgeResults(dayOutput, monthOutput, yearOutput);

}

function displayAgeResults(dayOutput, monthOutput, yearOutput) {

    ageCalculatorOutputYear.textContent = yearOutput;
    ageCalculatorOutputMonth.textContent = monthOutput;
    ageCalculatorOutputDay.textContent = dayOutput;

}


function validateDayInput(dayInput, monthInput, yearInput, validMaxMonthsDays) {

    const dayInputValue = dayInput.value;
    const montInputValue = monthInput.value;
    const yearInputValue = yearInput.value;
    const regex = /^\d{1,2}$/;

    const numberDayInputValue = Number(dayInputValue);
    const numberMonthInputValue = Number(montInputValue);
    const numberYearInputValue = Number(yearInputValue);

    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();

    const validYear = new Date(numberYearInputValue, numberMonthInputValue, 0).getDate();

    if (isInputValueEmpty(dayInput)) {
        displayError(dayInput, "day-error", "empty", ageErrorsObject);
        return false;
    }
    if (!(regex.test(dayInputValue))) {
        displayError(dayInput, "day-error", "valid", ageErrorsObject);
        return false;
    }
    if (1 > numberDayInputValue || 31 < numberDayInputValue) {
        displayError(dayInput, "day-error", "valid", ageErrorsObject);
        return false;
    }
    //  CHECK VALID MONTH MAX DAYS
    if (validateMonthInput(monthInput, yearInput)) {
        if (dayInputValue > validMaxMonthsDays[numberMonthInputValue]) {
            displayError(dayInput, "day-error", "valid", ageErrorsObject);
            return false;
        }
    }
    //  CHECK LEAP YEAR
    if (validateMonthInput(monthInput, yearInput) && validateYearInput(yearInput)) {
        if (dayInputValue > validYear) {
            displayError(dayInput, "day-error", "valid", ageErrorsObject);
            return false;
        }
    }
    //  CHECK FUTURE
    if (numberYearInputValue === todayYear && numberMonthInputValue === todayMonth && numberDayInputValue > todayDay) {
        displayError(dayInput, "day-error", "future", ageErrorsObject);
        return false;
    }



    displayError(dayInput, "day-error", null, ageErrorsObject);
    return numberDayInputValue;
}

function validateMonthInput(monthInput, yearInput) {
    const montInputValue = monthInput.value;
    const yearInputValue = yearInput.value;
    const regex = /^\d{1,2}$/;

    const numberMonthInputValue = Number(montInputValue);
    const numberYearInputValue = Number(yearInputValue);

    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();

    if (isInputValueEmpty(monthInput)) {
        displayError(monthInput, "month-error", "empty", ageErrorsObject);
        return false;
    }
    if (!(regex.test(montInputValue))) {
        displayError(monthInput, "month-error", "valid", ageErrorsObject);
        return false;
    }
    if (numberMonthInputValue < 1 || numberMonthInputValue > 12) {
        displayError(monthInput, "month-error", "valid", ageErrorsObject);
        return false;
    }
    if (numberYearInputValue === todayYear && numberMonthInputValue > todayMonth) {
        displayError(monthInput, "month-error", "future", ageErrorsObject)
        return false;
    }

    displayError(monthInput, "month-error", null, ageErrorsObject);
    return numberMonthInputValue;
}

function validateYearInput(yearInput) {

    const yearInputValue = yearInput.value;

    const numberYearInputValue = Number(yearInputValue);

    const today = new Date();
    const todayYear = today.getFullYear();

    if (isInputValueEmpty(yearInput)) {
        displayError(yearInput, "year-error", "empty", ageErrorsObject);
        return false;
    }
    if (numberYearInputValue > todayYear) {
        displayError(yearInput, "year-error", "future", ageErrorsObject);
        return false;
    }

    displayError(yearInput, "year-error", null, ageErrorsObject);
    return numberYearInputValue;
}

function displayError(inputId, inputErrorId, errorType, ageErrorsObject) {
    const inputErrorSpan = document.getElementById(inputErrorId);

    if (errorType === null) {
        inputErrorSpan.textContent = "";
        inputId.classList.remove("input-error")
    } else {
        inputErrorSpan.textContent = ageErrorsObject[inputErrorId][errorType];
        inputId.classList.add("input-error");
    }

    return;
}

function isInputValueEmpty(input) {

    const inputValue = input.value;

    if (inputValue.trim().length === 0) {
        return true;
    }

    return false;

}
