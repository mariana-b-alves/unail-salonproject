/*ShoppingCart.jsx -> CART'S CLIENT AND AESTHETIC SIDE*/

import { useContext} from 'react';
import { CartContext } from './CartContext';
import productData from '../../data/productData.json';
import PropTypes from 'prop-types';
import '../../../public/css/shopping_cart_trans_done.css';

/*SAME AS JS*/
const ShoppingCart = ({ isOpen, onClose, onConfirm }) => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const totalPrice = cartItems
    .reduce((sum, item) => {
      const product = productData[item.id];
      return sum + (product ? product.price * item.quantity : 0);
    }, 0)
    .toFixed(2);

  const handleConfirm = async () => {
    onClose();
    onConfirm();

    const formData = new FormData();
    formData.append('cart', JSON.stringify(cartItems));
    formData.append('total', totalPrice);
    formData.append('message', 'Obrigado pela sua encomenda! Responda a este email para concluir a sua compra.');

      const res = await fetch('https://formspree.io/f/xldnzjyd', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        clearCart();
        setTransactionResult('success');
      } else {
        setTransactionResult('error');
      }
  };

  if (!isOpen) return null;

  return (
    <>
      <section className={`shoppingCart ${isOpen ? 'open' : ''}`} onClick={onClose}>
        <div className="container" onClick={(e) => e.stopPropagation()}>
          <a className="closeBtn" onClick={onClose} role="button" tabIndex={0} aria-label="Close shopping cart" onKeyDown={(e) => { if (e.key === 'Enter') onClose(); }}>&times;</a>
          {cartItems.length === 0 ? (
            <p>Carrinho vazio</p>
          ) : (
            <>
              <div className="cart-items-list">
                {cartItems.map((item) => {
                  const product = productData[item.id];
                  if (!product) return null;
                  return (
                    <article key={`${item.id}-${item.color || 'nocolor'}`} className="cart-item">
                      <figure>
                        <img src={product.image} alt={product.title} />
                      </figure>
                      <article className="content">
                        <p>{product.description}</p>
                        <p>{product.title}</p>
                        <article className="addRemoveItemsCounter">
                          <div className="add"><p>{item.quantity}</p></div>
                        </article>
                        <p>Preço: {product.price.toFixed(2)}€</p>
                        <p>Total: {(product.price * item.quantity).toFixed(2)}€</p>

                        {item.color && (
                          <p>
                            Cor:&nbsp;
                            <span
                              style={{ display: 'inline-block', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: item.color, border: '1px solid #999', verticalAlign: 'middle'
                              }}
                              title={item.color}
                            />
                          </p>
                        )}

                        <button className="btn" onClick={() => removeFromCart(item.id, item.color)}>REMOVER</button>
                      </article>
                    </article>
                  );
                })}
                <div className="cart-buttons">
                  <button className="btn" id="confirmBtn" onClick={handleConfirm}>CONFIRMAR</button>
                  <button className="btn" id="cancelBtn" onClick={onClose}>CANCELAR</button>
                </div>
              </div>
            </>
          )}
        </div>
        {cartItems.length > 0 && (
          <p style={{ color: '#57402c', textAlign: 'center', marginTop: '1em' }}>
            Total Geral: {totalPrice}€
          </p>
        )}
      </section>
     
    </>
  );
};

ShoppingCart.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ShoppingCart;