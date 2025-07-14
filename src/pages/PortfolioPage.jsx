import { useContext, useState } from 'react';
import { CartContext } from '../features/components/CartContext';
import ShoppingCart from '../features/components/ShoppingCart';
import TransactionForm from '../features/components/TransactionForm';
import Header from '../features/templates/Header';
import SideNav from '../features/templates/SideNav';
import Footer from '../features/templates/Footer';
import PortfolioPopup from '../features/templates/PortfolioPopup';


import '../styles/portfolio_index.css';

const PortfolioPage = () => {
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


        <main style={{ flexGrow: 1 }}>
          <PortfolioPopup />
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
    </>
  );
};

export default PortfolioPage;
