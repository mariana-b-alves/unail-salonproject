/*ALL IMPORTS NECESSARY */

import { setupSideNav } from './sidemenu_popup.js';
import { setupAllPopup } from './all-popup.js';
import { setupSearchFilter } from './searchFilter.js';
import { setupCartHandler } from './setupCartHandler.js';
import { renderCartContents } from './cartSummary.js';
import { syncCartBadgeToLocalStorage } from './shoppingCartBadge.js';
import { scrollMagic } from './scrollMagic.js';
import { loadProductData } from './productUtils.js';

/*IMPORTED ALL NECESSARY FUNCTIONS*/
document.addEventListener('DOMContentLoaded', async () => {
  await loadProductData();
  setupSideNav();
  setupAllPopup();
  setupSearchFilter();
  syncCartBadgeToLocalStorage();
  setupCartHandler();
  renderCartContents();
  scrollMagic();

});
