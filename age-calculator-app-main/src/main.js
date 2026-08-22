import './main.css'

const ageCalculatorForm = document.querySelector(".age-calculator__form");
const dayInput = document.getElementById("day-input")
const monthInput = document.getElementById("month-input");
const yearInput = document.getElementById("year-input");

const ageCalculatorOutputYear = document.querySelector(".age-calculator__output--year");
const ageCalculatorOutputMonth = document.querySelector(".age-calculator__output--month");
const ageCalculatorOutputDay = document.querySelector(".age-calculator__output--day");

const months = {
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
        "valid": "Must be a valid day"
    },
    "month-error": {
        "empty": "The field is required",
        "valid": "Must be a valid month"
    },
    "year-error": {
        "empty": "The field is required",
        "future": "Must be in the past"
    }
}

ageCalculatorForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const isDayInputValid = validateDayInput(dayInput, monthInput, yearInput);
    const isMonthInputValid = validateMonthInput(monthInput, dayInput);
    const isYearInputValid = validateYearInput(yearInput);

    if (!(isMonthInputValid && isDayInputValid && isYearInputValid)) {
        return;
    }

    calculateAge(dayInput, monthInput, yearInput, months);
})

function calculateAge(dayInputArg, monthInputArg, yearInputArg, monthsArg) {

    const birthDayValue = Number(dayInputArg.value);
    const birthMontValue = Number(monthInputArg.value);
    const birthYearValue = Number(yearInputArg.value);

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const todayYear = today.getFullYear();

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
    else if(birthMontValue === todayMonth){
        yearOutput = yearOutput - 1;
        monthOutput = 11;
        dayOutput = monthsArg[birthMontValue - 1] - birthDayValue + todayDay;
    }
    else{
        monthOutput = monthOutput - 1;
        dayOutput = monthsArg[todayMonth - 1] - birthDayValue + todayDay;
    }

    displayAgeResults(dayOutput, monthOutput, yearOutput);

}

function displayAgeResults(dayOutput, monthOutput, yearOutput) {

    ageCalculatorOutputYear.textContent = yearOutput;
    ageCalculatorOutputMonth.textContent = monthOutput;
    ageCalculatorOutputDay.textContent = dayOutput;

}


function validateDayInput(dayInputArg, monthInputArg, yearInputArg) {

    const dayInputValue = dayInputArg.value;
    const montInputValue = monthInputArg.value;
    const yearInputValue = yearInputArg.value;
    const regex = /^\d{2}$/;

    const numberDayInputValue = Number(dayInputValue);

    if (dayInputValue.trim().length === 0) {
        displayError(dayInput, "day-error", "empty", ageErrorsObject);
        return false;
    }
    if (!(regex.test(dayInputValue))) {
        displayError(dayInput, "day-error", "valid", ageErrorsObject);
        return false;
    }
    if (montInputValue.trim().length === 0) {
        if (!(numberDayInputValue >= 1 && numberDayInputValue <= 31)) {
            displayError(dayInput, "day-error", "valid", ageErrorsObject);
            return false;
        }
    } else {
        if (!(numberDayInputValue >= 1 && numberDayInputValue <= months[Number(montInputValue)])) {
            displayError(dayInput, "day-error", "valid", ageErrorsObject);
            return false;
        }
    }
    if (dayInputValue === "29" && montInputValue === "02") {
        if (!((yearInputValue % 4 === 0 && yearInputValue % 100 !== 0) || (yearInputValue % 400 === 0))) {
            displayError(dayInput, "day-error", "valid", ageErrorsObject);
            return false;
        }
    }

    displayError(dayInput, "day-error", null, ageErrorsObject);
    return true;
}

function validateMonthInput(monthInputArg) {
    const montInputValue = monthInputArg.value;
    const regex = /^\d{2}$/;

    const numberMonthInputValue = Number(montInputValue);

    if (montInputValue.trim().length === 0) {
        displayError(monthInput, "month-error", "empty", ageErrorsObject);
        return false;
    }
    if (!(regex.test(montInputValue))) {
        displayError(monthInput, "month-error", "valid", ageErrorsObject);
        return false;
    }
    if (!(numberMonthInputValue >= 1 && numberMonthInputValue <= 12)) {
        displayError(monthInput, "month-error", "valid", ageErrorsObject);
        return false;
    }
    if(montInputValue > today)

    displayError(monthInput, "month-error", null, ageErrorsObject);
    return true;
}

function validateYearInput(yearInputArg) {
    const yearInputValue = yearInputArg.value;
    const today = new Date();
    const todayYear = today.getFullYear();

    if (yearInputValue.trim().length === 0) {
        displayError(yearInput, "year-error", "empty", ageErrorsObject);
        return false;
    }
    if (yearInputValue > todayYear) {
        displayError(yearInput, "year-error", "future", ageErrorsObject);
        return false;
    }

    displayError(yearInput, "year-error", null, ageErrorsObject);
    return true;
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
