import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, ShoppingBag, ArrowLeft, ZoomIn, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useAppContext } from '../context/AppContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart, reviews, addReview } = useAppContext();
  
  const product = PRODUCTS.find(p => p.id === Number(id));
  
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [imgError, setImgError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) {
    return (
      <div className="w-full bg-brand-light min-h-screen pt-32 md:pt-40 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-brand-dark mb-4">Product not found</h1>
          <Link to="/products" className="text-gold-600 hover:text-brand-dark uppercase tracking-widest text-sm transition-colors">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const productReviews = reviews[product.id] || [];
  
  // Get 3 related products from the same category
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    addReview(product.id, { rating, text: reviewText, author: "Guest User" });
    setReviewText("");
    setRating(5);
  };

  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop";
  const displayImage = imgError ? FALLBACK_IMAGE : product.image;

  return (
    <div className="w-full bg-brand-light min-h-screen pt-32 md:pt-40 pb-20">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-brand-dark transition-colors mb-8 uppercase tracking-widest text-xs"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          {/* Image Gallery (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-1/2"
          >
            <div 
              className="aspect-[4/5] bg-brand-gray overflow-hidden relative group cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            >
              <img 
                src={displayImage} 
                alt={product.name} 
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={20} className="text-brand-dark" />
              </div>
            </div>
          </motion.div>

          {/* Product Info (Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:w-1/2 flex flex-col"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-gold-600 mb-4 block">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <p className="text-2xl font-serif text-brand-dark">${product.price}</p>
              {productReviews.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-500 border-l border-gray-300 pl-4">
                  <Star size={16} className="fill-gold-500 text-gold-500" />
                  <span>
                    {(productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length).toFixed(1)} 
                    <span className="ml-1">({productReviews.length} reviews)</span>
                  </span>
                </div>
              )}
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-10 font-light">
              {product.description}
            </p>

            <div className="flex gap-4 mb-12">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 bg-brand-dark text-white py-4 uppercase tracking-[0.2em] text-sm hover:bg-gold-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} /> Add to Bag
              </button>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="w-14 h-14 flex items-center justify-center border border-gray-200 hover:border-gold-500 transition-colors bg-white"
                title={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={20} className={`transition-colors ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
              </button>
            </div>

            {/* Reviews Section */}
            <div className="border-t border-gray-200 pt-10 mt-auto">
              <h2 className="font-serif text-2xl text-brand-dark mb-6">Customer Reviews ({productReviews.length})</h2>
              
              <div className="space-y-6 mb-10 max-h-96 overflow-y-auto pr-4 custom-scrollbar">
                {productReviews.length > 0 ? (
                  productReviews.map(r => (
                    <div key={r.id} className="bg-white p-6 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={r.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${r.author}`}
                          alt={r.author}
                          className="w-10 h-10 rounded-full bg-gray-100 object-cover"
                          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop'; }}
                        />
                        <div>
                          <span className="text-sm font-semibold block text-brand-dark">{r.author}</span>
                          <div className="flex gap-0.5 mt-1">
                            {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < r.rating ? "fill-gold-500 text-gold-500" : "text-gray-200"} />)}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">No reviews yet. Be the first to review this piece!</p>
                )}
              </div>

              {/* Write a Review */}
              <form onSubmit={handleAddReview} className="bg-gray-50 p-6 border border-gray-100">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-dark mb-4">Write a Review</h3>
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <button type="button" key={star} onClick={() => setRating(star)}>
                      <Star size={20} className={`transition-colors ${star <= rating ? "fill-gold-500 text-gold-500" : "text-gray-300 hover:text-gold-400"}`} />
                    </button>
                  ))}
                </div>
                <textarea
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full text-sm p-4 border border-gray-200 focus:outline-none focus:border-gold-500 resize-none bg-white mb-4"
                  rows={4}
                />
                <button type="submit" className="bg-brand-dark text-white px-8 py-3 hover:bg-gold-700 transition-colors uppercase tracking-widest text-xs">
                  Submit Review
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 border-t border-gray-200 pt-20">
            <h2 className="text-3xl font-serif text-brand-dark mb-10 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map(related => (
                <div 
                  key={related.id} 
                  className="group cursor-pointer"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    navigate(`/product/${related.id}`);
                  }}
                >
                  <div className="aspect-[4/5] bg-brand-gray overflow-hidden mb-4 relative">
                    <img 
                      src={related.image} 
                      alt={related.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h3 className="font-serif text-lg text-brand-dark group-hover:text-gold-600 transition-colors">{related.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">${related.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-white/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <button 
              className="absolute top-8 right-8 p-4 text-brand-dark hover:text-gold-600 transition-colors"
              onClick={() => setIsZoomed(false)}
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={displayImage} 
              alt={product.name} 
              className="max-w-full max-h-full object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;
