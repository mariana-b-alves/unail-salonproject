export function setupAllPopup() {
  const popup = document.getElementById('allPopup');
  const popupImage = document.getElementById('allPopupImage');
  const closeBtn = document.getElementById('allPopupCloseBtn');
  /*IMPORTANT - ONLY THE IMAGES WITH THE .all-img CLASS WILL BE MADE "POPUP-ABLE"*/
  const figure = document.querySelectorAll('figure img.all-img');

  if (!popup || !popupImage) {
    console.warn('Popup or popup images missing');
    return;
  }

  /*DEFINED THE CURSOR STYLE FOR EACH IMG WHEN HOVERING ON TOP OF THEM*/
  figure.forEach(img => {
      img.style.cursor = 'pointer';

      /*WHEN IMG IS CLICKED, THE POPUP WILL BE IN FLEX, AND HAVE THE SAME LINK AND ALT AS ITS "NON-POPUP" COUNTERPART*/
      img.addEventListener('click', () => {
        popup.style.display = 'flex';
        popupImage.src = img.src;
        popupImage.alt = img.alt;
    });
  });

    /*IF THE USER CLICKS THE X BUTTON OR OUTSIDE THE POPUP ITSELF, IT'LL CLOSE*/
    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
      popup.style.display = 'none';
    }
  });
}
