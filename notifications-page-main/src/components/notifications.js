//    V1  

const skeletonCard = document.querySelector(".skeleton-card");
const notificationMainContent = document.querySelector(".notification__main-content");

//    STATIC NOTIFICATION STRUCTURE HTML

const notificationsTypesFragments = {
    "group_event": function(notification) { return `
            <img aria-hidden="true" src= alt=""
              class="notification__profile-image" />

            <div class="notification__content">
              <p class="notification__text">
                <a href="/users/${notification.notification_sender.user_id}" class="notification__user-name"> </a>
                <span class="notification__text-description"> </span>
                <a href="/groups/${notification.notification_details.group_id}" class="notification__group-name"> </a>
              </p>
              <time datetime=${notification.notification_date} class="notification__time">${notification.notification_date}</time>
            </div>
            `},
    "post_event": function(notification) { return `
            <img aria-hidden="true" src= alt=""
              class="notification__profile-image" />

            <div class="notification__content">
              <p class="notification__text">
                <a href="/users/${notification.notification_sender.user_id}" class="notification__user-name"></a>
                <span class="notification__text-description"> </span>
                <a href="/posts/${notification.notification_details.post_id}" class="notification__post-name"></a>
              </p>
              <time datetime="" class="notification__time">${notification.notification_date}</time>
            </div>
    `},
    "picture_event": function(notification) { return `
            <img aria-hidden="true" src= alt=""
              class="notification__profile-image" />

            <div class="notification__content">
              <p class="notification__text">
                <a href="/users/${notification.notification_sender.user_id}" class="notification__user-name"></a>
                <span class="notification__text-description"> </span>
              </p>
              <time datetime="" class="notification__time">${notification.notification_date}</time>
            </div>

            <a href="/pictures/${notification.notification_details.picture_id}" class="notification__media-link" aria-label="View chess picture">
              <img  class="notification__image" src=
                alt="Post photo" />
            </a>
    `},
    "user_event__private_message": function(notification) { return`
            <img aria-hidden="true" src= alt=""
              class="notification__profile-image" />

            <div class="notification__content">
              <p class="notification__text">
                <a href="/users/${notification.notification_sender.user_id}" class="notification__user-name"></a>
                <span class="notification__text-description"></span>
              </p>
              <time datetime="" class="notification__time">${notification.notification_date}</time>
              <p class="notification__text notification__text--private">

              </p>
            </div>
    `},
    "user_event": function(notification) { return `
            <img aria-hidden="true" src= alt=""
              class="notification__profile-image" />

            <div class="notification__content">
              <p class="notification__text">
                <a href="/users/${notification.notification_sender.user_id}" class="notification__user-name"></a>
                <span class="notification__text-description"> </span>
              </p>
              <time datetime="2026-07-20T13:25" class="notification__time">${notification.notification_date}</time>
            </div>
    `}
}

const renderNotifications = (notifications) => {

    notificationMainContent.innerHTML = "";

    for (let i = 0; i < notifications.length; i++) {

        let notificationDetailType = notifications[i].notification_details.type;
        let notificationDetailEvent = notifications[i].notification_details.event;
        let notificationStatus = notifications[i].notification_status;

        let notificationArticle = document.createElement("article");

        notificationArticle.setAttribute("data-notification-status-read",notificationStatus);
        notificationArticle.classList.add("notification__article");
        notificationArticle.setAttribute("role","listitem");

        if (notificationStatus === 0) {
            notificationArticle.classList.add("notification__article--unread");
        }

        // LOAD DYNAMIC DATA

        if (notificationDetailType === "group_event") {
            notificationArticle.innerHTML = notificationsTypesFragments.group_event(notifications[i]);
            
            notificationArticle.querySelector(".notification__group-name").textContent = notifications[i].notification_details.group_title;
        }
        else if(notificationDetailType === "post_event"){
            notificationArticle.innerHTML = notificationsTypesFragments.post_event(notifications[i]);

            notificationArticle.querySelector(".notification__post-name").textContent = "" + notifications[i].notification_details.post_title;
        }
        else if(notificationDetailType === "picture_event"){
            notificationArticle.innerHTML = notificationsTypesFragments.picture_event(notifications[i]);

            notificationArticle.querySelector(".notification__image").src = notifications[i].notification_details.url;
        }
        else if(notificationDetailType === "user_event" && notificationDetailEvent === "private_message"){
            notificationArticle.innerHTML = notificationsTypesFragments.user_event__private_message(notifications[i]);

            notificationArticle.querySelector(".notification__text--private").textContent = notifications[i].notification_details.private_message;
        }
        else if(notificationDetailType === "user_event"){
            notificationArticle.innerHTML = notificationsTypesFragments.user_event(notifications[i]);

        }


        notificationArticle.querySelector(".notification__profile-image").src = notifications[i].notification_sender.user_profile_img;
        notificationArticle.querySelector(".notification__user-name").textContent = notifications[i].notification_sender.user_name;
        notificationArticle.querySelector(".notification__text-description").textContent = notifications[i].notification_description;

        notificationMainContent.insertAdjacentElement('beforeend',notificationArticle);

    }
};

export const fetchNotifications = () => {
    const url = "./notifications.json";

    fetch(url)
        .then(function (res) {
            skeletonCard.classList.remove("hidden");
            if (res.ok) {
                return res.json();
            }
            throw new Error("Something went wrong");
        })
        .then(function (notifications) {
            skeletonCard.classList.add("hidden");
            renderNotifications(notifications);
        })
        .catch((error) => console.log(error));

};


//    V2

// const skeletonCard = document.querySelector(".skeleton-card");
// const notificationMainContent = document.querySelector(".notification__main-content");

// // 1. VERİLER DOĞRUDAN HTML İÇİNE GÖMÜLDÜ
// const notificationsTypesFragments = {
//     "group_event": (notification) => `
//         <img aria-hidden="true" src="${notification.notification_sender.user_profile_img}" alt="${notification.notification_sender.user_name} profile picture" class="notification__profile-image" />
//         <div class="notification__content">
//             <p class="notification__text">
//             <a href="/users/${notification.notification_sender.user_id}" class="notification__user-name">${notification.notification_sender.user_name}</a>
//             <span class="notification__text-description">${notification.notification_description}</span>
//             <a href="/groups/${notification.notification_details.group_id}" class="notification__group-name">${notification.notification_details.group_title}</a>
//             </p>
//             <time datetime="${notification.notification_date}" class="notification__time">${notification.notification_date}</time>
//         </div>
//     `,
//     "post_event": (notification) => `
//         <img aria-hidden="true" src="${notification.notification_sender.user_profile_img}" alt="" class="notification__profile-image" />
//         <div class="notification__content">
//             <p class="notification__text">
//             <a href="/users/${notification.notification_sender.user_id}" class="notification__user-name">${notification.notification_sender.user_name}</a>
//             <span class="notification__text-description">${notification.notification_description}</span>
//             <a href="/posts/${notification.notification_details.post_id}" class="notification__post-name">${notification.notification_details.post_title}</a>
//             </p>
//             <time datetime="${notification.notification_date}" class="notification__time">${notification.notification_date}</time>
//         </div>
//     `,
//     "picture_event": (notification) => `
//         <img aria-hidden="true" src="${notification.notification_sender.user_profile_img}" alt="" class="notification__profile-image" />
//         <div class="notification__content">
//             <p class="notification__text">
//             <a href="/users/${notification.notification_sender.user_id}" class="notification__user-name">${notification.notification_sender.user_name}</a>
//             <span class="notification__text-description">${notification.notification_description}</span>
//             </p>
//             <time datetime="${notification.notification_date}" class="notification__time">${notification.notification_date}</time>
//         </div>
//         <a href="/pictures/${notification.notification_details.picture_id}" class="notification__media-link" aria-label="View picture">
//             <img class="notification__image" src="${notification.notification_details.url}" alt="Post photo" />
//         </a>
//     `,
//     "user_event__private_message": (notification) => `
//         <img aria-hidden="true" src="${notification.notification_sender.user_profile_img}" alt="" class="notification__profile-image" />
//         <div class="notification__content">
//             <p class="notification__text">
//             <a href="/users/${notification.notification_sender.user_id}" class="notification__user-name">${notification.notification_sender.user_name}</a>
//             <span class="notification__text-description">${notification.notification_description}</span>
//             </p>
//             <time datetime="${notification.notification_date}" class="notification__time">${notification.notification_date}</time>
//             <p class="notification__text notification__text--private">
//                ${notification.notification_details.private_message}
//             </p>
//         </div>
//     `,
//     "user_event": (notification) => `
//         <img aria-hidden="true" src="${notification.notification_sender.user_profile_img}" alt="" class="notification__profile-image" />
//         <div class="notification__content">
//             <p class="notification__text">
//             <a href="/users/${notification.notification_sender.user_id}" class="notification__user-name">${notification.notification_sender.user_name}</a>
//             <span class="notification__text-description">${notification.notification_description}</span>
//             </p>
//             <time datetime="${notification.notification_date}" class="notification__time">${notification.notification_date}</time>
//         </div>
//     `
// };

// const renderNotifications = (notifications) => {
//     notificationMainContent.innerHTML = "";

//     notifications.forEach(notification => {
//         const { type, event } = notification.notification_details;
//         const status = notification.notification_status;

//         let notificationArticle = document.createElement("article");
//         notificationArticle.setAttribute("data-notification-status-read", status);
//         notificationArticle.classList.add("notification__article");
//         notificationArticle.setAttribute("role", "listitem");

//         if (status === 0) {
//             notificationArticle.classList.add("notification__article--unread");
//         }

//         // 2. DİNAMİK ANAHTAR OLUŞTURMA VE TEK SATIRDA RENDER
//         // Eğer event 'private_message' ise ona özel anahtarı seçiyoruz, değilse normal tipi seçiyoruz.
//         const templateKey = (type === "user_event" && event === "private_message") 
//             ? "user_event__private_message" 
//             : type;

//         // İlgili fonksiyonu çağırıp HTML'i tek seferde basıyoruz. Uzun if/else bloklarına gerek kalmadı!
//         if (notificationsTypesFragments[templateKey]) {
//             notificationArticle.innerHTML = notificationsTypesFragments[templateKey](notification);
//         }

//         notificationMainContent.insertAdjacentElement('beforeend', notificationArticle);
//     });
// };

// export const fetchNotifications = () => {
//     const url = "./notifications.json";

//     // 3. SKELETON ZAMANLAMASI DÜZELTİLDİ
//     skeletonCard.classList.remove("hidden"); // Fetch başlamadan hemen önce göster!

//     fetch(url)
//         .then(res => {
//             if (res.ok) return res.json();
//             throw new Error("Something went wrong");
//         })
//         .then(notifications => {
//             skeletonCard.classList.add("hidden"); // Veri gelince gizle
//             renderNotifications(notifications);
//         })
//         .catch(error => {
//             console.log(error);
//             skeletonCard.classList.add("hidden"); // Hata olsa bile dönen iskeleti gizle
//         });
// };