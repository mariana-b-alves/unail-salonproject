/*FUNCTION TO UPDATE THE NUMBER INSIDE THE BADGE AS ITEMS ARE ADDED/REMOVED*/

/*COUNT STARTS AT 0*/
export function updateCartBadge(count = 0) {
  /*SELECT cart-badge - THAT'S WHERE THE ITEM NUMBER IS*/
  const cartBadge = document.getElementById('cart-badge');

  /*ADD TEXT (OR NUMBER) WITH THE CURRENT AMOUNT OF ITEMS INSIDE CARTBADGE*/
  cartBadge.textContent = count;

  /*IF THE COUNT SHOWS 0 , THEN DON'T SHOW THE BADGE; IF IT SHOWS A NUMBER HIGHER THAN 0, SHOW THE BADGE IN FLEX*/

  cartBadge.style.display = count > 0 ? 'flex' : 'none';
}

/*FUNCTION GETS THE ITEM INFO (NUMBER) FROM LOCALSTORAGE AND UPDATES THE COUNTER ACCORDINGLY*/
export function syncCartBadgeToLocalStorage() {

  const stored = JSON.parse(localStorage.getItem('cartItems')) || [];
  /*CONST COUNT - GRAB CART'S ARRAY AND SUMS ALL SELECTED INDIVIDUAL ITEMS AND THE TIMES THEY WERE SELECTED TO GET THE TOTAL AMOUNT OF ITEMS*/
  const count = stored.reduce((total, item) => total + item.quantity, 0);
  /*ADD THE TOTAL AMOUNT TO THE CART*/
  updateCartBadge(count);
}
