import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// IN THIS CASE, IT ONLY DEALS WITH THE SIDE NAV PROPER, NOT THE MENU BTN
const SideNav = ({ isOpen, onClose }) => (
  <>
    <section className={`overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></section>
    <section className={`sideNav ${isOpen ? 'open' : ''}`}>
      <article>
        <a className="closeBtn" onClick={onClose}>&times;</a>

        <Link to="/portfolio">PORTEFÓLIO</Link>
        <Link to="/prices">PREÇÁRIO</Link>
        <Link to="/store">LOJA</Link>
        <Link to="/contacts">CONTACTOS</Link>
      </article>
    </section>
  </>
);


SideNav.propTypes = {
  isOpen: PropTypes.bool.isRequired, 
  onClose: PropTypes.func.isRequired,
};

export default SideNav;
