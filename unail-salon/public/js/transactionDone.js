export function showTransactionDone() {
/*CREATE OVERLAY*/
  const overlay = document.getElementById('transaction-form-overlay');
  /*INSIDE THE OVERLAY, ADD ALL STYLES/INFO AS PER THE OG HTML*/
  overlay.innerHTML = `
    <section class="transactionDone open">
      <article class="container-all">

        <article class="container-this">
          <div class="centered-content">
            <i class="fa-solid fa-circle-check"></i>
            <p>A sua compra foi feita com sucesso. </p>
            <p>A sua encomenda irá ser enviada para avaliação. Será contactado por email para concluir a sua transação.</p>
          </div>

          <button class="btn" id="transactionDoneCloseBtn">FECHAR</button>
        </article>
      </article>
    </section>
  `;

/*OPEN OVERLAY BY ADDING CLASS .open - THIS ASSUMING THE FORM DATA/EMAIL WAS SUCCESSFULLY SUBMITTED*/
  overlay.classList.add('open');
  /*SELECT FECHAR BTN*/
  const btn1 = document.getElementById('transactionDoneCloseBtn');
  /*CLOSE TRANSACTION */
    if (btn1) {
      btn1.addEventListener('click', () =>{
      overlay.classList.remove('open');
      overlay.innerHTML = '';
    })
  };
};