//      V1

import "./css/main.scss";
import {fetchNotifications} from "./components/notifications";

const notificationBUtton = document.querySelector(".notification__button");
const notificationMenu = document.querySelector(".notification__menu");

const notificationUnreadCount = document.querySelector(".notification__unread-count");


const displayNotification = (event) => {
    fetchNotifications();
};

document.addEventListener("click", (event) => {

    const target = event.target;

    if (target.closest(".notification__button")) {
        if (notificationMenu.classList.contains("hidden")) {
            notificationMenu.classList.remove("hidden");
            displayNotification();
            return;
        }
        notificationMenu.classList.add("hidden");
    }
    if (!target.closest(".notification__menu")) {
        notificationMenu.classList.add("hidden");
        return;
    }
    if(target.closest(".notification__read-all")){
        Array.from(document.querySelectorAll(".notification__article--unread")).forEach((el)=>el.classList.remove("notification__article--unread"));
        notificationUnreadCount.textContent = "0";
    }

});

//      V2 

// import "./css/main.scss";
// import { fetchNotifications } from "./components/notifications";

// const notificationButton = document.querySelector(".notification__button");
// const notificationMenu = document.querySelector(".notification__menu");
// const notificationUnreadCount = document.querySelector(".notification__unread-count");

// document.addEventListener("click", (event) => {
//     const target = event.target;

//     // 1. "Tümünü Okundu İşaretle" Tıklaması
//     if (target.closest(".notification__read-all")) {
//         // Array.from'a gerek yok, NodeList üzerinden doğrudan forEach kullanabiliriz.
//         document.querySelectorAll(".notification__article--unread").forEach((el) => {
//             el.classList.remove("notification__article--unread");
//         });
//         notificationUnreadCount.textContent = "0";
//         return; // İşlem bitti, dinleyiciyi durdur.
//     }

//     // 2. Bildirim (Zil) Butonuna Tıklanması
//     if (target.closest(".notification__button")) {
//         const isHidden = notificationMenu.classList.contains("hidden");

//         if (isHidden) {
//             notificationMenu.classList.remove("hidden");
//             fetchNotifications(); // Doğrudan import edilen fonksiyonu çağır
//         } else {
//             notificationMenu.classList.add("hidden");
//         }
//         return; // İşlem bitti, dinleyiciyi durdur.
//     }

//     // 3. Menü Dışına Tıklanması
//     // Yukarıdaki return'ler sayesinde kod buraya ulaştıysa, 
//     // tıklanan şey kesinlikle buton veya 'read-all' yazısı DEĞİLDİR.
//     if (!target.closest(".notification__menu")) {
//         notificationMenu.classList.add("hidden");
//     }
// });