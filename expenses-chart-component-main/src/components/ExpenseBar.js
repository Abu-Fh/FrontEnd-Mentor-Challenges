function ExpenseBar(props) {
    let dataAmount = props.amount;
    let arialLabel = props.day + ": $" + props.amount;
    let dataDay = props.day;
    let height = props.height;
    let highlight = props.highlight;
    return (
        `
        <li class="expenses__bar-wrapper">
            <div class="expenses__bar-tooltip" role="tooltip" id="tooltip-${dataDay}">${"$" + dataAmount}</div>
            <button type="button" class="expenses__bar${highlight}" style="height: ${height}" data-amount="${dataAmount}" aria-label="${arialLabel}" aria-describedby="tooltip-${dataDay}"></button>
            <span class="expenses__day" data-day="${dataDay}">${dataDay}</span>            
        </li>
        `
    )
}

export async function ExpenseBarComponent(props) {

    let expensesData = props.json;
    let expensesChart = props.expensesChart;

    const max = maxAmount(expensesData);
    let dayOfWeek = getDayOfWeek();
    
    let expensesBarList = "";

    for (let index = 0; index < expensesData.length; index++) {
        let amount = Number(expensesData[index].amount);
        let day = expensesData[index].day;
        let height = calculateExpenseBarHeight(amount, max);
        let highlight = "";

        dayOfWeek === 0 ? dayOfWeek = 7 : dayOfWeek;

        if( (index + 1) === dayOfWeek ){
            highlight = " expenses__bar--highlight";
        }

        expensesBarList = expensesBarList + ExpenseBar({amount,day,height,highlight})
    }
    expensesChart.innerHTML = expensesBarList;
    return;
}

function maxAmount(json) {
    let maxAmount = 0;
    for (let index = 0; index < json.length; index++) {
        if (json[index].amount > maxAmount) {
            maxAmount = json[index].amount;
        }
    }
    return maxAmount;
}

function calculateExpenseBarHeight(dataAmount, maxAmount) {
    const amount = dataAmount;
    const height = Math.round(amount * 100 / maxAmount) + "%";
    return height;
}

// Source - https://stackoverflow.com/a/17964373
// Posted by samliew, modified by community. See post 'Timeline' for change history

// Accepts a Date object or date string that is recognized by the Date.parse() method
export function getDayOfWeek() {
    const dayOfWeek = new Date().getDay();
    return isNaN(dayOfWeek) ? null : dayOfWeek;
    // ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}
