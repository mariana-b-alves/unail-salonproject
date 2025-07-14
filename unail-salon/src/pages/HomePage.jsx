import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollMagic from '../animations/scrollMagic';
import { CartContext } from '../features/components/CartContext';
import ShoppingCart from '../features/components/ShoppingCart';
import TransactionForm from '../features/components/TransactionForm';
import Header from '../features/templates/Header';
import SideNav from '../features/templates/SideNav';
import Footer from '../features/templates/Footer'; 

import '../styles/homepage_index.css';

const HomePage = () => {
  const { totalItems } = useContext(CartContext);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  return (
    <>
    <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >

      <Header
          totalItems={totalItems}
          onCartClick={() => setCartOpen(true)}
          onMenuClick={() => setSideMenuOpen(true)}
        />

        <SideNav isOpen={sideMenuOpen} onClose={() => setSideMenuOpen(false)} />

        <main style={{ flexGrow: 1 }}>
          <section className="banner">
            <article>
              <img src="/img/unail-logo-brown.png" alt="Unail Logo Brown" />
              <p style={{ fontSize: '1.5rem' }}>Life is not perfect, but your nails can be</p>
              <Link to="/contacts" className="btn">CONTACTE-NOS</Link>
            </article>
          </section>

          <section className="info-section">
            <article className="info-article about-us">
              <h1>Quem somos nós?</h1>
              <p>A U Nail é um estúdio de manicure, pedicure e <em>nail art</em> em Almada, criado por Alamusi.</p>
              <p>Aqui acreditamos que a <em>nail art</em> não é apenas decoração, mas também uma forma de ser expressar e mostrar a sua personalidade.</p>
              <p>Por isso criamos designs únicos para os gostos mais simples até aos mais arrojados.</p>
            </article>

            <article className="info-article discounts">
              <h1>Saber sobre os nossos descontos não ocupa lugar</h1>
              <p>Na U Nails, todos os universitários têm 10% de desconto em todas as sessões de manicure e pedicure.</p>
              <p>Aproveitem!</p>
            </article>

            <article className="info-article local">
              <h1>Visite-nos</h1>
              <p>Venha-nos visitar na Travessa da Granja 15, 2829-511 Costa da Caparica.</p>
              <p>Estamos de segunda a sábado, das 10:00 às 12:00 e das 13:00 às 19:00 para tornar o seu dia mais especial.</p>
            </article>
          </section>
        </main>

        <Footer />
      </div>

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

      <ScrollMagic />
    </>
  );
};

export default HomePage;
