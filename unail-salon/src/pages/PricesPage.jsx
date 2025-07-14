import { useContext, useState } from 'react';
import { CartContext } from '../features/components/CartContext';
import ShoppingCart from '../features/components/ShoppingCart';
import TransactionForm from '../features/components/TransactionForm';
import Header from '../features/templates/Header';
import SideNav from '../features/templates/SideNav';
import Footer from '../features/templates/Footer';
import PricesPopup from '../features/templates/PricesPopup';

import '../styles/prices_index.css';

const PricesPage = () => {
  const { totalItems } = useContext(CartContext);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  return (
    <>
      <div>
        <Header
          totalItems={totalItems}
          onCartClick={() => setCartOpen(true)}
          onMenuClick={() => setSideMenuOpen(true)}
        />

        <SideNav isOpen={sideMenuOpen} onClose={() => setSideMenuOpen(false)} />

        <main>
          <section style={{ color: '#57402c' }} className="title">
            <h1>PREÇÁRIO</h1>
          </section>

          <section className="subtitle">
            <h1>CUIDADOS DAS MÃOS</h1>
          </section>

          <PricesPopup />

          <section className="subtitle">
            <h1>DECORAÇÕES</h1>
          </section>

          <section className="prices">
            <article>
                <p>Nail Art Simples</p>
                <p>3,00€</p>
            </article>
            <article>
                <p>Nail Art Elaborada / Mistério</p>
                <p>10,00€ +</p>
            </article>
            <article>
                <p>Ambas as Mãos</p>
                <p>20,00€</p>
            </article>
          </section>

      <section className="subtitle">
        <h1>SERVIÇOS EXTRA</h1>
      </section>

      <section className="prices">
        <article>
            <p>Remoção Gel</p>
            <p>5,00€</p>
        </article>
        <article>
            <p>Remoção Gel Acrílico</p>
            <p>10,00€ +</p>
        </article>
        <article>
            <p>Remoção Gel Encapsulado</p>
            <p>10,00€</p>
        </article>
      </section>

      <section className="prices">
        <article>
            <p>Serviço de remoção <strong>gratuito</strong> para quem tenha feito manicure na U Nail.</p>
        </article>
      </section>
        </main>

      </div>

      <Footer />

      <ShoppingCart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onConfirm={() => {
          setCartOpen(false);
          setShowTransactionForm(true);
        }}
      />

      {showTransactionForm && (
        <div className="modal-overlay" onClick={() => setShowTransactionForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              aria-label="Fechar formulário de pagamento"
              onClick={() => setShowTransactionForm(false)}
            >
              &times;
            </button>
            <TransactionForm onClose={() => setShowTransactionForm(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default PricesPage;
