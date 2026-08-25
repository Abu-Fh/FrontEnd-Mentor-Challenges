const preview__Share_Button = document.querySelector(".preview__share-button");
const preview__Share_Menu__Mobile = document.querySelector(
  ".preview__share-menu--mobile"
);
const preview__Share_Menu__Desktop = document.querySelector(".preview__share-menu--desktop");

//------------------------------ v2.0-------------------------------------------

document.addEventListener('click',(event)=>{
  const target = event.target;

  let activeMenu;
  let notActiveMenu;
  if(innerWidth < 640){

    activeMenu = preview__Share_Menu__Mobile;
    notActiveMenu = preview__Share_Menu__Desktop;
  }else{
    activeMenu = preview__Share_Menu__Desktop;
    notActiveMenu = preview__Share_Menu__Mobile;
  }

  notActiveMenu.classList.add('hidden');

  if(target.closest('.preview__share-button')){
    activeMenu.classList.toggle('hidden');
    return;
  }
  if(target.closest('.preview__share-menu')){
    return;
  }
  activeMenu.classList.add('hidden');
  return;
})

//-------------------- v1.0------------------------

// document.addEventListener("click", (event) => {
//   const target = event.target;
//   let mobile = false;

//   if (innerWidth < 640) {
//     mobile = true;
//   }

//   if (mobile) {
//     if (target.closest(".preview__share-button")) {
//       preview__Share_Menu__Mobile.classList.toggle('hidden');
//       return;
//     }
//     if (target.closest(".preview__share-menu")) {
//       return;
//     }
//     if (!target.closest(".preview__share-button")) {
//       preview__Share_Menu__Mobile.classList.add("hidden");
//       return;
//     }
//     return;
//   }
//   if (target.closest(".preview__share-menu")) {
//     return;
//   }
//   if (target.closest(".preview__share-button")) {
//     preview__Share_Menu__Desktop.classList.toggle('hidden');
//     return;
//   }
//   if (!target.closest(".preview__share-button")) {
//     preview__Share_Menu__Desktop.classList.add("hidden");
//     return;
//   }
//   return;

// });
