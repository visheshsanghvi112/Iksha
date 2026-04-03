import React, { useState } from 'react';
import { Product } from '../types';
import { Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Curated Unsplash IDs for Jewelry that are reliable
const PRODUCTS: Product[] = [
  { id: 1, name: "Royal Kundan Set", category: "Necklaces", image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1200&auto=format&fit=crop" },
  { id: 2, name: "Antique Gold Jhumkas", category: "Earrings", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop" },
  { id: 3, name: "Minimalist Rose Bracelet", category: "Bracelets", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop" },
  { id: 4, name: "Heritage Maang Tikka", category: "Accessories", image: "https://images.unsplash.com/photo-1631215450849-0d33e8b4e72c?q=80&w=1200&auto=format&fit=crop" }, // Bridal close up
  { id: 5, name: "Emerald Cut Ring", category: "Rings", image: "https://images.unsplash.com/photo-1605218427360-3a618999852f?q=80&w=1200&auto=format&fit=crop" },
  { id: 6, name: "Oxidized Silver Anklet", category: "Anklets", image: "https://images.unsplash.com/photo-1602751584552-8ba73d52e0d0?q=80&w=1200&auto=format&fit=crop" },
];

const CATEGORIES = ["All", "Necklaces", "Earrings", "Bracelets", "Rings"];

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

const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="w-full bg-brand-light min-h-screen pt-32 md:pt-40">
      <div className="container mx-auto px-6 md:px-12 pb-20">
        
        {/* Gallery Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
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

        {/* Minimal Filters */}
        <div className="flex justify-center flex-wrap gap-6 md:gap-10 mb-16">
          {CATEGORIES.map((cat, idx) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <motion.div 
                layout
                key={product.id} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[4/5] bg-brand-gray shadow-sm">
                  <ProductImage src={product.image} alt={product.name} />
                  
                  {/* Subtle Hover Overlay */}
                  <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Text Reveal on Hover */}
                  <div className="absolute bottom-0 left-0 w-full p-8 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-gold-300 mb-2">{product.category}</span>
                    <h3 className="font-serif text-2xl tracking-wide">{product.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <p className="text-gray-400 font-serif text-xl italic">This collection is currently being curated.</p>
          </motion.div>
        )}

      </div>
       {/* Minimal Copyright */}
      <div className="w-full bg-brand-light py-12 text-center mt-auto border-t border-gray-100">
        <p className="text-gray-300 text-[10px] tracking-[0.3em] uppercase">Iksha Designs &copy; 2025</p>
      </div>
    </div>
  );
};

export default Products;