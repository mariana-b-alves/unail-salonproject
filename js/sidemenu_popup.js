
export function setupSideNav() {
  /*SELECT RELEVANT IDS - OPEN BUTTON ICON, CLOSE / X BUTTON,SIDEMENU AND OVERLAY IDS*/
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");
  const sideNav = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");

  /*WHEN THE USER CLICKS ON CLOSE BTN,THE FUNCTION IS ACTIVATED, THE SIDENAV AND OVERLAY CLASSES ARE ADDED (I.E. THE SIDE MENU IS OPENED).*/
  openBtn.addEventListener("click", () => {
    sideNav.classList.add("open");
    overlay.classList.add("active");
  });

  /*WHEN THE USER CLICKS ON CLOSE BTN,THE FUNCTION IS ACTIVATED, THE SIDENAV AND OVERLAY CLASSES ARE REMOVED (I.E. THE SIDE MENU IS CLOSED).*/
  closeBtn.addEventListener("click", () =>{
    sideNav.classList.remove("open");
    overlay.classList.remove("active");
  })
}
