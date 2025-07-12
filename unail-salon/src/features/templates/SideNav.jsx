import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// IN THIS CASE, IT ONLY DEALS WITH THE SIDE NAV PROPER, NOT THE MENU BTN
const SideNav = ({ isOpen, onClose }) => (
  <>
  {/*ADDS "ACTIVE" CLASS TO OVERLAY WHEN THE SIDENAV IS OPENED, THUS MAKING THE OVERLAY SHOW UP; REMOVES IT WHEN THE SIDENAV IS CLOSED*/}
    <section className={`overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></section>
    {/*ADDS "OPEN" CLASS TO SIDENAV - TRIGGERS THE OPEN ANIMATION; REMOVES IT AND HIDES THE SIDENAV OTHERWISE*/}
    <section className={`sideNav ${isOpen ? 'open' : ''}`}>
      <article>
        {/*X CLOSES THE SIDENAV*/}
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
