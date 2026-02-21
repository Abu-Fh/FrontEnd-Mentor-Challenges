import '../css/main.css'; 
import '../css/layout.css';

const faq = document.querySelector('.faq');
faq.addEventListener('click',(event)=>{
    const faqItem = event.target.closest('.faq__item');
    if(!faqItem) return;
    const faqAnswer = event.target.closest('.faq__answer');
    if(faqAnswer){
        faqItem.blur();
        return;
    }
    return;
});