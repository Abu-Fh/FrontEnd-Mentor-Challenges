//-----------------------------  v1 ---------------------------------------------

// const validateEmail = (email) => {
//     return email.match(/^\w+([\.-]*)\w*@(?!yandex)\w+\.com$/);
//     // const re = 
//     // /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// }

// heroRegisterForm.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const emailInput = document.querySelector('.hero__register-input');
//     const heroRegisterError = document.querySelector('.hero__register-error');
//     const heroRegisterSuccess = document.querySelector('.hero__register-success');

//     if (validateEmail(emailInput.value.trim())) {
//         heroRegisterSuccess.classList.remove('hidden');
//         heroRegisterError.classList.add('hidden');
//         return;
//     }
//     else {
//         heroRegisterError.classList.remove('hidden');
//         heroRegisterSuccess.classList.add('hidden');
//         return;
//     }
//     return;
// });

// const heroRegisterForm = document.querySelector('.hero__register-form');

//---------------------------------------- v2 ----------------------------------------------
const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validateEmail = (email) => {
    return re.test(email);
}

const heroRegisterForm = document.querySelector('.hero__register-form');
const emailInput = document.querySelector('.hero__register-input');
const heroRegisterError = document.querySelector('.hero__register-error');
const heroRegisterSuccess = document.querySelector('.hero__register-success');

heroRegisterForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateEmail(emailInput.value.trim())) {
        heroRegisterSuccess.classList.remove('hidden');
        heroRegisterError.classList.add('hidden');
    }
    else {
        heroRegisterError.classList.remove('hidden');
        heroRegisterSuccess.classList.add('hidden');
    }
});
