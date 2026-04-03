import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useAppContext();
  const navigate = useNavigate();

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-serif text-2xl text-brand-dark flex items-center gap-2">
                <ShoppingBag size={24} className="text-gold-500" />
                Your Bag
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close Cart"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={32} className="text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-serif text-xl">Your bag is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs uppercase tracking-widest text-gold-600 hover:text-brand-dark transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-24 h-32 bg-gray-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-serif text-lg text-brand-dark leading-tight">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">{item.category}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-200">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-50 text-gray-500 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-50 text-gray-500 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-serif text-lg text-brand-dark">${item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-serif text-xl text-brand-dark">Subtotal</span>
                  <span className="font-serif text-2xl text-brand-dark">${cartTotal}</span>
                </div>
                <p className="text-xs text-gray-500 mb-6 text-center">Shipping and taxes calculated at checkout.</p>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-brand-dark text-white py-4 uppercase tracking-[0.2em] text-sm hover:bg-gold-700 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
