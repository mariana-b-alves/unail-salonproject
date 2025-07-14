import { addTransactionForm } from './transactionForm.js';
import { fixImagePath } from './productUtils.js';


export async function renderCartContents() {
  const container = document.getElementById('cart-summary');
  if (container == false) {
    return
  };
  /*CONTAINER STARTS EMPTY*/

  container.innerHTML = '';

  /*CREATE CONTAINER BY CREATING AN ARTICLE*/

  const mainArticle = document.createElement('article');
  mainArticle.className = 'container';

  /*ADD AN X BTN*/

  const closeBtn = document.createElement('a');
  closeBtn.className = 'closeBtn';
  closeBtn.id = 'closeBtn';
  closeBtn.innerHTML = '&times;';
  closeBtn.href = '#';

/*x BTN CLOSES CONTAINER AND OVERLAY*/

  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.remove('open');
    const overlay = document.getElementById('cart-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  });
  mainArticle.appendChild(closeBtn);

  /*SEE productUtils.js*/
  let productData;
  try {
    const data = await fetch('./js/data/productData.json');
    if (!data.ok) throw new Error('Failed to fetch product data');
    productData = await data.json();
    /*IF IT CAN'T FETCH DATA FROM THE RIGHT LINK, THEN CREATE A P WITH THE MESSAGE BELOW TO THE CONTAINER*/
  } catch {
    const errorMsg = document.createElement('p');
    errorMsg.textContent = 'Erro ao carregar dados dos produtos.';
    mainArticle.appendChild(errorMsg);
    container.appendChild(mainArticle);
    return;
  }

  /*IF THERE ARE NO ITEMS INSIDE THE CART, THEN CREATE A P WITH THE MESSAGE BELOW TO THE CONTAINER...*/
  let stored = JSON.parse(localStorage.getItem('cartItems')) || [];
  if (stored.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = 'Carrinho vazio';
    mainArticle.appendChild(emptyMsg);
    container.appendChild(mainArticle);
    return;
  }

  /*...OTHERWISE IT TRIES TO FETCH FROM PRODUCTDATA; IF THE ITEM DOESN'T EXIST, IT SKIPS IT*/
  stored.forEach(item => {
    const product = productData[item.id];
    if (product == false) {
      return
    };

    /*CREATE ELEMENTS WITH THEIR RESPECTIVE INFORMATIONS/DATA AND APPEND*/
    const cartItem = document.createElement('article');
    cartItem.className = 'cart-item';

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = fixImagePath(product.image);
    img.alt = product.title;
    figure.appendChild(img);

    const content = document.createElement('article');
    content.className = 'content';

    const pDesc = document.createElement('p');
    pDesc.textContent = product.description || '';

    const pTitle = document.createElement('p');
    pTitle.textContent = product.title;

    const pPrice = document.createElement('p');
    pPrice.textContent = `${product.price.toFixed(2)}€`;

    const quantityCounter = document.createElement('article');
    quantityCounter.className = 'addRemoveItemsCounter';

    const quantityDiv = document.createElement('div');
    quantityDiv.className = 'add';
    const quantityP = document.createElement('p');
    quantityP.textContent = item.quantity;
    quantityDiv.appendChild(quantityP);

    quantityCounter.appendChild(quantityDiv);

    const pTotal = document.createElement('p');
    pTotal.textContent = `Total: ${(product.price * item.quantity).toFixed(2)}€`;

    const btnRemove = document.createElement('button');
    btnRemove.className = 'btn';
    btnRemove.textContent = 'REMOVER';
    btnRemove.addEventListener('click', () => {
      stored = stored.filter(ci => ci.id !== item.id || ci.color !== item.color);
      updateCart();
    });

    content.appendChild(pDesc);
    content.appendChild(pTitle);
    content.appendChild(pPrice);
    content.appendChild(quantityCounter);
    content.appendChild(pTotal);
    content.appendChild(btnRemove);

    cartItem.appendChild(figure);
    cartItem.appendChild(content);

    mainArticle.appendChild(cartItem);
  });

  /*FETCH INFO FROM PRODUCT DATA; SEE transactionForm.js*/
  const totalPrice = stored.reduce((sum, item) => {
    const product = productData[item.id];
    return product ? sum + product.price * item.quantity : sum;
  }, 0).toFixed(2);

  /*CREATE ELEMENTS WITH THEIR RESPECTIVE INFORMATIONS/DATA/STYLES/STRUCTURE AND APPEND*/

  const totalP = document.createElement('h1');
  totalP.style.color = '#57402c';
  totalP.style.textAlign = 'center';
  totalP.style.marginTop = '1em';
  totalP.textContent = `Total Geral: ${totalPrice}€`;
  mainArticle.appendChild(totalP);

  const btnContainer = document.createElement('div');
  btnContainer.className = 'cart-buttons';

  const btnConfirm = document.createElement('button');
  btnConfirm.className = 'btn';
  btnConfirm.id = 'confirmBtn';
  btnConfirm.textContent = 'CONFIRMAR';
  btnConfirm.addEventListener('click', () => {
    container.classList.remove('open');
    const overlay = document.getElementById('cart-overlay');
    if (overlay) overlay.classList.remove('active');
    addTransactionForm();
    const formPopup = document.getElementById('transactionFormPopup');
    if (formPopup) formPopup.classList.add('active');
  });

  const btnCancel = document.createElement('button');
  btnCancel.className = 'btn';
  btnCancel.id = 'cancelBtn';
  btnCancel.textContent = 'CANCELAR';
  btnCancel.addEventListener('click', () => {
    container.classList.remove('open');
    const overlay = document.getElementById('cart-overlay');
    if (overlay) overlay.classList.remove('active');
  });

  btnContainer.appendChild(btnConfirm);
  btnContainer.appendChild(btnCancel);
  mainArticle.appendChild(btnContainer);

  container.appendChild(mainArticle);

  /*SAVES CURRENT STATE, SO IT DOESN'T GET LOST*/
  function updateCart() {
    localStorage.setItem('cartItems', JSON.stringify(stored));
    renderCartContents();
  }
}
/*ENSURES THE CART IS ALWAYS IN SYNC, SHOWS THE ITEMS SELECTED BY THE USER AND UPDATES EVERYTIME THERE'S A CHANGE*/
window.addEventListener('cartUpdated', renderCartContents);
document.addEventListener('DOMContentLoaded', renderCartContents);
