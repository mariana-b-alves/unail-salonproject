import { renderCartContents } from "./cartSummary.js";

export function setupCartHandler() {
    const cartIcon = document.querySelector('.shopping-cart-icon');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartContainer = document.getElementById('cart-summary');
  
    function openCart() {
      if (!cartContainer || !cartOverlay) return;
      cartContainer.classList.add('open');
      cartOverlay.classList.add('active');
      renderCartContents();
    }
  
    function closeCart() {
      if (!cartContainer || !cartOverlay) return;
      cartContainer.classList.remove('open');
      cartOverlay.classList.remove('active');
    }
  
    if (cartIcon) {
      cartIcon.addEventListener('click', () => {
        if (!cartContainer) return;
        cartContainer.classList.contains('open') ? closeCart() : openCart();
      });
    }
  
    if (cartOverlay) {
      cartOverlay.addEventListener('click', closeCart);
    }
  
    document.body.addEventListener('click', e => {
      if (
        e.target.matches('#transactionFormPopup .closeBtn') ||
        e.target.matches('#cancelBtn')
      ) {
        const formPopup = document.getElementById('transactionFormPopup');
        if (formPopup) formPopup.classList.remove('active');
      }
    });
  
    window.openTransactionForm = () => {
      const formPopup = document.getElementById('transactionFormPopup');
      if (formPopup) formPopup.classList.add('active');
    };
  }
  