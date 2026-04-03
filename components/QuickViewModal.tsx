import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useAppContext();
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const isWishlisted = wishlist.some(item => item.id === product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative shadow-2xl"
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 bg-gray-50 relative min-h-[300px] md:min-h-[500px]">
                {!imageError ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover absolute inset-0"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                    <span className="font-serif text-lg">Image Unavailable</span>
                  </div>
                )}
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] uppercase tracking-widest font-medium z-10">
                    New Arrival
                  </span>
                )}
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
                <div className="mb-2 flex justify-between items-start">
                  <p className="text-xs uppercase tracking-widest text-gray-500">{product.category}</p>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-gold-500 text-gold-500" />
                    <span className="text-sm font-medium text-brand-dark">4.8</span>
                    <span className="text-xs text-gray-400 ml-1">(12)</span>
                  </div>
                </div>
                
                <h2 className="text-3xl font-serif text-brand-dark mb-4">{product.name}</h2>
                <p className="text-2xl font-serif text-brand-dark mb-6">${product.price}</p>
                
                <p className="text-gray-600 leading-relaxed mb-8 flex-1">
                  {product.description || "A beautiful piece of jewelry crafted with precision and care. Perfect for any occasion."}
                </p>

                <div className="space-y-4 mt-auto">
                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-brand-dark text-white py-4 uppercase tracking-[0.2em] text-sm hover:bg-gold-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} />
                    Add to Bag
                  </button>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={toggleWishlist}
                      className="flex-1 border border-gray-200 py-4 uppercase tracking-widest text-xs hover:border-brand-dark transition-colors flex items-center justify-center gap-2 group"
                    >
                      <Heart size={16} className={`${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-brand-dark'} transition-colors`} />
                      {isWishlisted ? 'Saved' : 'Save'}
                    </button>
                    <Link 
                      to={`/product/${product.id}`}
                      className="flex-1 border border-gray-200 py-4 uppercase tracking-widest text-xs hover:border-brand-dark transition-colors flex items-center justify-center text-brand-dark"
                      onClick={onClose}
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
