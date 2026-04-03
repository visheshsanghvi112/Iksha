import React from 'react';
import { useAppContext } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, ShoppingBag, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Wishlist: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useAppContext();
  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));
  const navigate = useNavigate();

  return (
    <div className="w-full bg-brand-light min-h-screen pt-32 md:pt-40 flex flex-col">
      <div className="container mx-auto px-6 md:px-12 pb-20 flex-1">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-brand-dark mb-4"
          >
            Your Wishlist
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-500"
          >
            Curated pieces you've saved for later.
          </motion.p>
        </div>

        {wishlistProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white shadow-sm rounded-sm max-w-2xl mx-auto"
          >
            <ShoppingBag size={48} className="mx-auto text-gray-300 mb-6" />
            <p className="text-gray-500 mb-8 font-serif text-xl">Your wishlist is currently empty.</p>
            <Link to="/products" className="px-10 py-4 bg-brand-dark text-white text-xs uppercase tracking-widest hover:bg-gold-700 transition-colors inline-block">
              Explore Collection
            </Link>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {wishlistProducts.map(product => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={product.id} 
                  className="relative bg-white shadow-sm p-4 flex gap-6 items-center group"
                >
                  <div 
                    className="flex-1 flex gap-6 items-center cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="w-24 h-24 overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] uppercase tracking-widest text-gold-500 block mb-1">{product.category}</span>
                      <h3 className="font-serif text-lg text-brand-dark leading-tight group-hover:text-gold-600 transition-colors">{product.name}</h3>
                      <p className="font-serif text-brand-dark mt-2">${product.price}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }} 
                      className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }} 
                      className="p-3 text-brand-dark hover:text-white hover:bg-gold-500 rounded-full transition-colors"
                      title="Add to Cart"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      
      {/* Minimal Copyright */}
      <div className="w-full bg-brand-dark py-12 text-center mt-auto">
        <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Iksha Designs &copy; 2025</p>
      </div>
    </div>
  );
}

export default Wishlist;
