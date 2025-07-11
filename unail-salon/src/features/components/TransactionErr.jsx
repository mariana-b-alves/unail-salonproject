import '../../../public/css/form.css';
import PropTypes from 'prop-types';


const TransactionErr = ({ onClose }) => {
  return (
    <section className="transactionErr open" onClick={onClose}>
      <article className="container-all">

        <article className="container-this">
          <div className="centered-content">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <p>Não conseguimos concluir a sua compra. </p>
            <p>Tente outra vez mais tarde ou tente utilizar outro meio de pagamento.</p>
          </div>

          <button className="btn" id="transactionErrCloseBtn" onClick={onClose}>FECHAR</button>
        </article>
      </article>
    </section>
  );
};

TransactionErr.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default TransactionErr;
