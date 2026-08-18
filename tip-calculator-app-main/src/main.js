import './main.css'

const billInput = document.getElementById("bill-input");
const customTipInput = document.getElementById("custom-tip-input");
const peopleInput = document.getElementById("people-input");
const tipCalculatorResetButton = document.querySelector(".tip-calculator__reset-button");

const tipCalculatorAmount = document.querySelector(".tip-calculator__amount");
const tipCalculatorTotal = document.querySelector(".tip-calculator__total");

const peopleError = document.getElementById("people-error");

function areInputsEmpty() {

    if (billInput.value.trim() === "" && peopleInput.value.trim() === "") {
        tipCalculatorResetButton.classList.add("disabled");
        return false;
    }
    tipCalculatorResetButton.classList.remove("disabled");
    return true;

}

function validateInputs() {

    if (Number(billInput.value) < 0) {
        return false;
    }
    if (Number(peopleInput.value) <= 0) {

        peopleError.textContent = "Cant' be zero"
        return false;

    }
    return true;

}

function displayResults(tipAmountPerPerson, totalAmountPerPerson) {

    tipCalculatorAmount.textContent = '$' + Math.floor(tipAmountPerPerson * 100) / 100;
    tipCalculatorTotal.textContent = '$' + Math.floor(totalAmountPerPerson * 100) / 100;
}

function calculate() {

    if (!areInputsEmpty()) return;

    if (!validateInputs()){
        return;
    }else{
        peopleError.textContent = "";
    }

    const tipOptionActive = document.querySelector(".tip-calculator__tip-options-container .active");

    if (!tipOptionActive) return;

    const tipAmountPerPerson = parseFloat(billInput.value) / 100 * parseFloat(tipOptionActive.dataset.tip) / parseFloat(peopleInput.value)
    const totalAmountPerPerson = parseFloat(billInput.value) / parseFloat(peopleInput.value) + tipAmountPerPerson;

    displayResults(tipAmountPerPerson, totalAmountPerPerson);

}

calculate();

document.addEventListener("input", (event) => {

    const target = event.target;

    if (target === billInput || target === peopleInput) {
        calculate();
    }
    else if (target === customTipInput) {
        customTipInput.setAttribute("data-tip", customTipInput.value);
        calculate();
    }
})

document.addEventListener("click", (event) => {

    const tipOptionActive = document.querySelector(".tip-calculator__tip-options-container .active");
    const target = event.target;

    if (target === target.closest(".tip-calculator__tip-option") || target === customTipInput) {


        if (tipOptionActive) {

            tipOptionActive.classList.remove("active");
            target.classList.add("active");

        } else {

            target.classList.add("active");

        }

        calculate();

    }
    else if (target === tipCalculatorResetButton) {

        tipCalculatorResetButton.classList.add("disabled");

    }

})


