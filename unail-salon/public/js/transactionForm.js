import { showTransactionDone } from './transactionDone.js';
import { showTransactionErr } from './transactionErr.js';
import { fixImagePath } from './productUtils.js';

/*SELECT #transactionFormPopup SO WE CAN ADD STYLES/DATA*/
export async function addTransactionForm() {
  const existingTransactionForm = document.getElementById('transactionFormPopup');
  if (existingTransactionForm == true){
    return
  };

  /*SHOW THE ENTIRELY OF THE ITEM FETCH FROM LOCALSTORAGE (.cartItems)*/
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const productsInCart = cartItems.map((item) => {
    const product = productData[item.id];
    return {
      id: item.id,
      quantity: item.quantity,
      description: product?.description || '',
      title: product?.title || '',
      price: product?.price || 0,
      image: product ? fixImagePath(product.image) : '', //IMAGE LINK FETCHED FROM PRODUCT OR BY FIXIMAGPATH (SEE productUtils.js)
      color: item.color || null,
    };
  });

  /*TOTALPRICE - MULTIPLY THE AMOUNT SELECTED OF ALL INDIVIDUAL ITEMS BY THEIR PRICE, AND KEEP THE FINAL NUMBER WITH 2 DECIMAL PLACES*/
  const totalPrice = productsInCart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  
  const formSection = document.createElement('section');
  formSection.className = 'transactionForm open';
  formSection.id = 'transactionFormPopup';

  /*ADD STYLES AND STRUCTURES AS PER THE ORIGINAL HTML*/
  formSection.innerHTML = `
    <article class="container-all">
      <a class="closeBtn" id="formCloseBtn">&times;</a>
      <article class="container-product">
        ${productsInCart
          .map((item) => `
            <article class="content"; style="display: flex; flex-direction: column; max-width: 200px; margin: 0 auto;">
              <figure class="c1xr3"; style="width: 7em; height: 7em; border-radius: 15px; overflow: hidden; margin: 0 0 0.75em 0;"> <img src="${item.image}" alt="${item.description}" style= "width: 100%; height: 100%; object-fit: cover; display: block;"/> </figure>
              <p>${item.description}</p>
              <p>${item.title}</p>
              ${item.color ? 
              `<p>Cor: <span style="display: inline-block; width: .7em; height: .7em; border-radius: 50%; background-color: ${item.color}; margin-left: .3em; vertical-align: middle; border: 1px solid #000;"></span></p>` 
              : ''}
              <p>${item.price.toFixed(2)}€</p>
              <article class="addRemoveItemsCounter">
                <div class="add"><p>${item.quantity}</p></div>
              </article>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}€</p>
            </article>
          `
          )
          .join('')}
      </article>

      <article class="container-info">
        <form class="form-info" id="transactionForm">
          <label for="name">Nome:</label>
          <input type="text" name="name" id="name" placeholder="Nome e apelido" required autofocus />

          <label for="email">Email:</label>
          <input type="email" name="email" id="email" placeholder="Email" required />

          <label for="address">Morada:</label>
          <input type="text" name="address" id="address" placeholder="Morada" required />

          <label for="city">Cidade:</label>
          <input type="text" name="city" id="city" placeholder="Cidade" required />

          <label for="district">Distrito:</label>
          <select name="district" id="district" required>
            <option value="" disabled selected>Selecione um distrito</option>
            <option value="acores">Açores</option>
            <option value="aveiro">Aveiro</option>
            <option value="beja">Beja</option>
            <option value="braga">Braga</option>
            <option value="braganca">Bragança</option>
            <option value="castelo">Castelo Branco</option>
            <option value="coimbra">Coimbra</option>
            <option value="evora">Évora</option>
            <option value="faro">Faro</option>
            <option value="guarda">Guarda</option>
            <option value="leiria">Leiria</option>
            <option value="lisboa">Lisboa</option>
            <option value="madeira">Madeira</option>
            <option value="portalegre">Portalegre</option>
            <option value="porto">Porto</option>
            <option value="santarem">Santarém</option>
            <option value="setubal">Setúbal</option>
            <option value="viana">Viana do Castelo</option>
            <option value="vilaReal">Vila Real</option>
            <option value="viseu">Viseu</option>
          </select>

          <label for="postal">Código Postal:</label>
          <input type="text" name="postal" id="postal" placeholder="Código Postal" required />

          <label for="taxPayerNumber">Nº Contribuinte:</label>
          <input type="text" name="taxPayerNumber" id="taxPayerNumber" placeholder="Nº Contribuinte" />

          <button type="submit" class="btn" id="confirmBtn">CONFIRMAR</button>
          <button type="button" class="btn" id="cancelBtn">CANCELAR</button>
        </form>
      </article>
    </article>
  `;

  /*APPEND ALL THAT STRUCTURE/STYLING TO OUR DOCUMENT*/
  document.body.appendChild(formSection);

  const closeFormButton = document.getElementById('formCloseBtn');
  const cancelButton = document.getElementById('cancelBtn');
  const transactionForm = document.getElementById('transactionForm');


  /*SELECT FORM FROM ID AND REMOVES IT FROM DOM*/

  const closeForm = () => {
    const formSection = document.getElementById('transactionFormPopup');
    if (formSection) {
      formSection.remove();
    }
  };
  

  /*FORM CLOSES IF...*/

  /*X BUTTON IS CLICKED...*/
  closeFormButton.addEventListener('click', closeForm, false);
  
  /*CANCEL BUTTON TRIGGERED VIA EVENT DELEGATION -> CLICKS ARE LISTENED ON THE ENTIRETY OF THE DOCUMENT. IF THE USER CLICKED #cancelBtn, IT'LL AVOID DEFAULT BEHAVIOUR (I.E: SUBMITING THE FORM), AND CLOSE THE FORM*/
  document.body.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches('#cancelBtn')) {
      e.preventDefault();
      closeForm();
    }
  });

  /*CREATE AN EMAIL FORMAT SO WE CAN SEND TO OUR USER WITH THE FULL INFO*/
  transactionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formElement = e.target;
    const dataForEmail = new FormData(formElement);

    const cartData = productsInCart.map(item => {
      return `
        Título do Produto: ${item.title}
        Descrição: ${item.description}
        Preço: ${item.price.toFixed(2)}€
        Quantidade: ${item.quantity}
        Cor: ${item.color || 'N/A'}
        Total: ${(item.price * item.quantity).toFixed(2)}€
      `;
    }).join("\n\n");

    dataForEmail.append('cart', cartData);
    dataForEmail.append('total', totalPrice);

    /*FETCH FORMSPREE - WAY WE'RE SENDING OUR EMAIL*/
    try{
      const email = await fetch('https://formspree.io/f/xldnzjyd', {
        method: 'POST',
        body: dataForEmail,
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await email.json();

      closeForm();

      /*IF THE EMAIL WAS SUCCESSFULLY SENT, THE FORM (AND SHOPPING CART) ARE CLEARED AND TRANSACTION DONE (success msg)IS SHOWN...*/
      if (email.ok && data.ok) {
        localStorage.removeItem('cartItems');
        showTransactionDone(closeTransactionOverlay);
        /*...OTHERWISE, TRANSACTION ERR (ERROR MSG) IS SHOWN AND the FORM (AND SHOPPING CART) ARE NOT CLEARED*/

      } else {
        showTransactionErr(closeTransactionOverlay);
      }
    } catch (error) {
      closeForm();
      showTransactionErr(closeTransactionOverlay);
    }
  });  
/*OVERLAY IS REMOVED WHEN FORM'S CLOSED*/
  function closeTransactionOverlay() {
    const overlay = document.getElementById('transaction-form-overlay');
    overlay.innerHTML = '';
    overlay.classList.remove('open');
  }
}
