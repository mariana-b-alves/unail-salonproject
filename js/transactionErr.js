export function showTransactionErr() {
  /*CREATE OVERLAY*/
  const overlay = document.getElementById('transaction-form-overlay');
  /*INSIDE THE OVERLAY, ADD ALL STYLES/INFO AS PER THE OG HTML*/
  overlay.innerHTML = `
    <section class="transactionErr open">
      <article class="container-all">

        <article class="container-this">
          <div class="centered-content">
            <i class="fa-regular fa-triangle-exclamation"></i>
            <p>Não conseguimos concluir a sua compra.</p>
            <p>Tente outra vez mais tarde ou tente utilizar outro meio de pagamento.</p>
          </div>
            
          <button class="btn" id="transactionErrCloseBtn">FECHAR</button>
        </article>
      </article>
    </section>
  `;
  /*OPEN OVERLAY BY ADDING CLASS .open - THIS ASSUMING THE FORM DATA/EMAIL WAS UNSUCCESSFULLY SUBMITTED*/
  overlay.classList.add('open');

/*SELECT FECHAR BTN*/
  const btn1 = document.getElementById('transactionErrCloseBtn');
  /*CLOSE TRANSACTION */
    if (btn1 == true){
      btn1.addEventListener('click', () =>{
      overlay.classList.remove('open');
      overlay.innerHTML = '';
    })
  };
};