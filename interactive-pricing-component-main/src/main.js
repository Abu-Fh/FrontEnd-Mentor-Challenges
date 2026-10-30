import './main.css'

const prices = [
    {
        min: 0,
        max: 10000,
        minPrice: 0,
        maxPrice: 8,
    },
    {
        min: 10000,
        max: 50000,
        minPrice: 8,
        maxPrice: 12,
    },
    {
        min: 50000,
        max: 100000,
        minPrice: 12,
        maxPrice: 16,
    },
    {
        min: 100000,
        max: 500000,
        minPrice: 16,
        maxPrice: 24,
    },
    {
        min: 500000,
        max: 1000000,
        minPrice: 24,
        maxPrice: 36,
    },
]

const pricingCardPageviewsInput = document.querySelector(".pricing-card__pageviews-input");
const pricingCardPageviewsText = document.querySelector(".pricing-card__pageviews-text");
const pricingCardPrice = document.querySelector(".pricing-card__price");
const pricingCardToggleInput = document.querySelector(".pricing-card__toggle-input");
const pricingCardBillingDiscount = document.querySelector(".pricing-card__billing-discount");

const updatePageviewsText = (value) => {
    let displayValue = 0;
    pricingCardPageviewsInput.setAttribute("value", value);
    if (value < 1000000) {
        value = value / 1000;
        displayValue = value + "K"
    } else {
        value = value / 1000000;
        displayValue = value + "M";
    }
    pricingCardPageviewsText.textContent = displayValue + " " + "PAGEVIEWS";
}

const updateBillAnnounceValue = (result) => {
    pricingCardPrice.textContent = "$" + result;
}

const getPricinCardPageViewInputValue = () => {
    return pricingCardPageviewsInput.value;
}

const isPricingCardToggleInputActive = () => {
    if(pricingCardToggleInput.dataset.focused === "true"){
        return true;
    }
    return false;
}

const calculatePageviewPrice = (pageview, prices) => {
    const element = prices.find(({ min, max }) => pageview >= min && pageview <= max);
    if (!element) {
        return "Something went wrong!";
    }
    let discount = 0;
    const isActive = isPricingCardToggleInputActive();
    if(isActive){
        discount = Number(pricingCardBillingDiscount.dataset.discount);
    }
    const perPersonPrice = (element.maxPrice - element.minPrice) / (element.max - element.min);
    let result = element.minPrice + (pageview - element.min) * perPersonPrice;
    result = result - result / 100 * discount;
    return result.toFixed(2);;
}

pricingCardToggleInput.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.focused === "true") {
        target.setAttribute("data-focused", "false");
        target.setAttribute("aria-checked", "false");
    } else {
        target.setAttribute("data-focused", "true");
        target.setAttribute("aria-checked", "true");
    }
    const value = getPricinCardPageViewInputValue();
    const result = calculatePageviewPrice(value,prices);
    updateBillAnnounceValue(result);
})

pricingCardPageviewsInput.addEventListener("change", (event) => {
    const value = getPricinCardPageViewInputValue();
    updatePageviewsText(value);
    const result = calculatePageviewPrice(value,prices);
    updateBillAnnounceValue(result);
});




