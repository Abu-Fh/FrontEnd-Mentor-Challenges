//Elements
const ratingCard__starsContainer = document.querySelector(
  ".rating-card__stars-container",
);

const ratingCard__submitBtn = document.querySelector('.rating-card__submit-btn');

ratingCard__starsContainer.addEventListener("click", (event) => {
  const item = event.target.closest('.rating-card__star-btn');
  const activeRatingBtn = document.querySelector(".active-rating-button");

  if (event.target === item) {
    if (activeRatingBtn) {
      activeRatingBtn.classList.remove("active-rating-button");
    }
    changeRatingBtnColor(event.target);
    return;
  }
});

ratingCard__submitBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    const activeRatingBtn = document.querySelector(".active-rating-button");
    if(activeRatingBtn){
        const ratingCard = document.querySelector('.rating-card');
        ratingCard.classList.add('hidden');
        const ratingCardSubmitted = document.querySelector('.rating-card--submitted');
        ratingCardSubmitted.classList.remove('hidden');
        const ratingCard__status = document.querySelector('.rating-card__status');
        ratingCard__status.innerHTML = `You selected ${activeRatingBtn.textContent} out of 5`;
    }
})

function changeRatingBtnColor(button) {
  button.classList.add("active-rating-button");
}
