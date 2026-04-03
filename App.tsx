import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';
import GeminiStylist from './components/GeminiStylist';
import CustomCursor from './components/CustomCursor';
import CartDrawer from './components/CartDrawer';
import ToastContainer from './components/ToastContainer';
import { AppProvider } from './context/AppContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <CustomCursor />
        
        {/* Global Noise Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-50"></div>
        </div>

        <div className="flex flex-col min-h-screen bg-brand-light">
          <Header />
          <CartDrawer />
          <ToastContainer />
          {/* Removed top padding to allow full-screen hero sections */}
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          {/* Footer Removed as requested */}
          <GeminiStylist />
        </div>
      </HashRouter>
    </AppProvider>
  );
};

export default App;