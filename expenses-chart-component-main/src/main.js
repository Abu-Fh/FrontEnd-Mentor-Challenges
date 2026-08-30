import './main.css'
import { ExpenseBarComponent } from './components/ExpenseBar'

const expensesSummaryAmount = document.querySelector(".expenses__summary-amount");
const expensesChart = document.querySelector(".expenses__chart");

const url = '/data.json';
const json = await fetchData(url);

if (json) {
  ExpenseBarComponent({ json, expensesChart });
  expensesSummaryAmount.textContent = "$" + calculateTotalAmount(json);
} else {
  expensesChart.innerHTML = `<li class="error-message">Failed to load chart data.</li>`;
}

document.addEventListener('mouseover',(event) => {
    const target = event.target;
    const activeExpenseBarToolTip = document.querySelector(".expenses__bar-tooltip.active")

    if(target === target.closest(".expenses__bar")){
        target.previousElementSibling.classList.add('active');
    }
    if(activeExpenseBarToolTip){
        activeExpenseBarToolTip.classList.remove('active');
    }
    return;
})

expensesSummaryAmount.textContent = "$" + calculateTotalAmount(json);

function calculateTotalAmount(json) {
    let totalAmount = 0;
    for (let index = 0; index < json.length; index++) {
        const amount = Number(json[index].amount);
        totalAmount = totalAmount + amount;
    }
    return totalAmount;
}

async function fetchData(url) {
    try {
        const res = await fetch(url);
        if(!res.ok){
            throw new Error(res.status + " " + res.statusText);
        }
        return res.json();
    } catch (error) {
        console.log(error.message);
    }
}