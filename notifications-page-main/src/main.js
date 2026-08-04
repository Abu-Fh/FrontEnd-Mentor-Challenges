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
