import { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import productData from '../data/productData.json';
import { CartContext } from '../features/components/CartContext';
import ShoppingCart from '../features/components/ShoppingCart';
import TransactionForm from '../features/components/TransactionForm';
import Header from '../features/templates/Header';
import SideNav from '../features/templates/SideNav';
import Footer from '../features/templates/Footer';
import '../styles/product_index.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart, totalItems } = useContext(CartContext);
  const product = productData[productId];
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  /*THE QUANTITY RESETS BACT TO ONE AND CHOSES THE FIRST COLOUR AS THE DEFAULT; NONE IF THE ITEM DOESN'T HAVE A COLOUR OPTION*/
  useEffect(() => {
    setQuantity(1);
    setSelectedColor(product?.colors?.[0] || null);
  }, [productId]);

  if (product == false) {
    return <p>Produto não existe.</p>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity,
      color: selectedColor,
    });
    setCartOpen(true);
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  /*RANDOMISE THE OTHER PRODUCTS PART - SHOW ANY 3 PRODUCTS BUT THE ONE FROM THE PAGE*/
  const randomProducts = Object.keys(productData)
    .filter(key => key !== productId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  /*FUNCTION WHICH RETURNS COLOURED CIRCLES FOR THE USER TO SELECT THE ITEM IN THE COLOUR THEY CHOOSE. WHEN CLICKED IT UPDATES THE SELECTED COLOUR (AND ADDS A NEW ITEM WITH THAT INFO TO THE CART)*/
  const renderColorOptions = () => (
    <div className="color-options">
      {product.colors.map(color => (
        <div
          key={color}
          className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
          style={{
            backgroundColor: color,
            border: selectedColor === color ? '3px solid black' : '1px solid #ccc',
          }}
          title={color}
          onClick={() => setSelectedColor(color)}
        />
      ))}
    </div>
  );

  /*SAME AS JS*/
  return (
    <div>
      <Header
          totalItems={totalItems}
          onCartClick={() => setCartOpen(true)}
          onMenuClick={() => setSideMenuOpen(true)}
        />

        <SideNav isOpen={sideMenuOpen} onClose={() => setSideMenuOpen(false)} />


      <main style={{ flexGrow: 1, paddingBottom: '100px' }}>
        <section className="product">
          <figure className="c1xr3">
            <img src={product.image} alt={product.title} />
          </figure>
          <article className="content">
            <p>{product.description}</p>
            <p>{product.title}</p>
            <p>{product.price.toFixed(2)}€</p>
            <p>{product.details}</p>

            {product.colors && renderColorOptions()}

            <article className="addRemoveItemsCounter">
              <button className="minus" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <div className="add" id="counter"><p>{quantity}</p></div>
              <button className="plus" onClick={() => setQuantity(q => q + 1)}>+</button>
            </article>

            <p>Total: {totalPrice}€</p>
            <button className="btn" onClick={handleAddToCart}>ADICIONAR AO CARRINHO</button>
          </article>
        </section>

        <section className="title">
          <h1>OUTROS PRODUTOS</h1>
        </section>

        <section className="other-products">
          {randomProducts.map((key) => {
            const p = productData[key];
            return (
              <article key={key}>
                <figure className="c1xr3">
                  <Link to={`/product/${key}`}>
                    <img src={p.image} alt={p.title} />
                  </Link>
                </figure>
                <p>{p.description}</p>
                <p>{p.title}</p>
                <p>{p.price.toFixed(2)}€</p>
              </article>
            );
          })}
        </section>

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
            <div className="modal-content" onClick={e => e.stopPropagation()}>
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
      </main>

      <Footer />

    </div>

    
  );
};

export default ProductDetail;
