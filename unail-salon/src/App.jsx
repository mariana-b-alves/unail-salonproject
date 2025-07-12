import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import PricesPage from './pages/PricesPage.jsx'
import StorePage from './pages/StorePage.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import ContactsPage from './pages/ContactsPage.jsx';
import { CartProvider } from './features/components/CartContext.jsx';



function App() {
  return (
    <CartProvider>
      <Router basename="/">
        <Routes> 
          <Route path='/' element={<HomePage/>} /> 
           <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path='/prices'element={<PricesPage/>} />
          <Route path="/store" element={<StorePage />} /> 
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path='/contacts'element={<ContactsPage/>} /> 
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;