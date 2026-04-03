import React, { useState } from 'react';
import { Product } from '../types';
import { Filter, Search, Heart, Star, ShoppingBag, ChevronDown, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../data/products';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import QuickViewModal from '../components/QuickViewModal';

const CATEGORIES = ["All", "Necklaces", "Earrings", "Bracelets", "Rings"];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" }
];

const ProductImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  // Fallback image URL (a reliable placeholder)
  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop";

  const handleError = () => {
    if (imgSrc !== FALLBACK_IMAGE) {
      setImgSrc(FALLBACK_IMAGE);
    } else {
      setError(true);
    }
  };

  if (error) {
    return (
      <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center border border-gray-200">
        <div className="text-center p-6">
           <h3 className="font-serif text-2xl text-gold-400 mb-2">IKSHA</h3>
           <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Image Unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {!loaded && (
         <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center z-10">
            <span className="font-serif text-gold-400 text-xl opacity-50">Loading...</span>
         </div>
      )}
      <motion.img 
        src={imgSrc} 
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full h-full object-cover"
      />
    </>
  );
};

const ProductCard: React.FC<{ product: Product; onQuickView: (product: Product) => void }> = ({ product, onQuickView }) => {
  const { wishlist, toggleWishlist, reviews, addReview, addToCart } = useAppContext();
  const [showReviews, setShowReviews] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const productReviews = reviews[product.id] || [];
  const navigate = useNavigate();

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    addReview(product.id, { rating, text: reviewText, author: "Guest User" });
    setReviewText("");
    setRating(5);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col"
    >
      {/* Image Container */}
      <div 
        className="relative overflow-hidden aspect-[4/5] bg-brand-gray shadow-sm group cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <ProductImage src={product.image} alt={product.name} />
        
        {/* Wishlist Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 rounded-full hover:bg-white transition-all duration-300 shadow-sm"
          title={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} className={`transition-colors ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-400"}`} />
        </button>

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute top-16 right-4 z-20 p-2.5 bg-white/90 rounded-full hover:bg-white transition-all duration-300 shadow-sm translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
          title="Quick View"
        >
          <Eye size={18} className="text-gray-400 hover:text-brand-dark transition-colors" />
        </button>

        {/* Subtle Hover Overlay */}
        <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Text Reveal on Hover */}
        <div className="absolute bottom-0 left-0 w-full p-8 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
          <span className="block text-[10px] uppercase tracking-[0.2em] text-gold-300 mb-2">{product.category}</span>
          <h3 className="font-serif text-2xl tracking-wide">{product.name}</h3>
          <p className="font-serif text-lg mt-1">${product.price}</p>
        </div>

        {/* Add to Cart Hover Button */}
        <div className="absolute bottom-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="bg-white text-brand-dark p-3 rounded-full hover:bg-gold-500 hover:text-white transition-colors shadow-lg"
            title="Add to Cart"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>

      {/* Product Info & Reviews Toggle */}
      <div className="mt-5 flex justify-between items-start">
         <div>
           <h4 
             className="font-serif text-lg text-brand-dark cursor-pointer hover:text-gold-600 transition-colors"
             onClick={() => navigate(`/product/${product.id}`)}
           >
             {product.name}
           </h4>
           <div className="flex items-center gap-3 mt-1">
             <span className="text-[10px] uppercase tracking-widest text-gray-500">{product.category}</span>
             <span className="text-sm font-serif text-brand-dark">${product.price}</span>
           </div>
         </div>
         <button
           onClick={() => setShowReviews(!showReviews)}
           className="text-[10px] uppercase tracking-widest text-gold-600 hover:text-brand-dark transition-colors mt-1"
         >
           {showReviews ? "Hide Reviews" : `Reviews (${productReviews.length})`}
         </button>
      </div>

      {/* Reviews Section */}
      <AnimatePresence>
        {showReviews && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="py-4 space-y-4 border-t border-gray-100 mt-4">
              {productReviews.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {productReviews.map(r => (
                    <div key={r.id} className="bg-white p-4 border border-gray-100 shadow-sm rounded-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={r.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${r.author}`}
                          alt={r.author}
                          className="w-8 h-8 rounded-full bg-gray-100 object-cover"
                          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop'; }}
                        />
                        <div>
                          <span className="text-xs font-semibold block text-brand-dark">{r.author}</span>
                          <div className="flex gap-0.5 mt-0.5">
                            {[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < r.rating ? "fill-gold-500 text-gold-500" : "text-gray-200"} />)}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic">No reviews yet. Be the first to review this piece!</p>
              )}

              <form onSubmit={handleAddReview} className="mt-4 flex flex-col gap-3 bg-gray-50 p-4 rounded-sm">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-dark">Write a Review</span>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(star => (
                    <button type="button" key={star} onClick={() => setRating(star)}>
                      <Star size={16} className={`transition-colors ${star <= rating ? "fill-gold-500 text-gold-500" : "text-gray-300 hover:text-gold-400"}`} />
                    </button>
                  ))}
                </div>
                <textarea
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full text-sm p-3 border border-gray-200 focus:outline-none focus:border-gold-500 resize-none bg-white"
                  rows={3}
                />
                <button type="submit" className="self-start text-[10px] bg-brand-dark text-white px-6 py-2 hover:bg-gold-700 transition-colors uppercase tracking-widest">
                  Submit
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  let filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Apply sorting
  if (sortBy === "price_asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price_desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="w-full bg-brand-light min-h-screen pt-32 md:pt-40 flex flex-col">
      <div className="container mx-auto px-6 md:px-12 pb-20 flex-1">
        
        {/* Gallery Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif text-brand-dark mb-6"
          >
            Our Portfolio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-500 font-light leading-relaxed"
          >
            A curated showcase of our finest craftsmanship. Each piece is designed to tell a unique story of tradition and elegance.
          </motion.p>
        </div>

        {/* Search & Sort Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 border-b border-gray-200 pb-6"
        >
          <div className="flex items-center w-full md:w-1/3 bg-white px-4 py-3 shadow-sm border border-gray-100 focus-within:border-gold-500 transition-colors">
            <Search size={18} className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search jewelry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none focus:outline-none text-brand-dark placeholder:text-gray-400 font-light text-sm"
            />
          </div>

          <div className="relative z-30 w-full md:w-auto">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center justify-between w-full md:w-48 bg-white px-4 py-3 shadow-sm border border-gray-100 text-sm text-brand-dark hover:border-gold-500 transition-colors"
            >
              <span>{SORT_OPTIONS.find(o => o.value === sortBy)?.label}</span>
              <ChevronDown size={16} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-full mt-2 bg-white shadow-xl border border-gray-100 py-2"
                >
                  {SORT_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${sortBy === option.value ? 'text-gold-600 font-medium' : 'text-gray-600'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Minimal Filters */}
        <div className="flex justify-center flex-wrap gap-6 md:gap-10 mb-16">
          {CATEGORIES.map((cat, idx) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              onClick={() => setActiveCategory(cat)}
              className={`relative text-xs uppercase tracking-[0.2em] transition-colors duration-300 pb-2 ${
                activeCategory === cat 
                  ? 'text-brand-dark' 
                  : 'text-gray-400 hover:text-gold-600'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-500"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <p className="text-gray-400 font-serif text-xl italic">No pieces found matching your criteria.</p>
          </motion.div>
        )}

      </div>
       {/* Minimal Copyright */}
      <div className="w-full bg-brand-light py-12 text-center mt-auto border-t border-gray-100">
        <p className="text-gray-300 text-[10px] tracking-[0.3em] uppercase">Iksha Designs &copy; 2025</p>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal 
        product={quickViewProduct} 
        isOpen={!!quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
    </div>
  );
};

export default Products;