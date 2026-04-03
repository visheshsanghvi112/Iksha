import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SLIDES = [
  {
    type: 'video',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-woman-putting-on-a-necklace-3444-large.mp4',
    poster: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
    title: 'Divine Elegance',
    subtitle: 'The Heritage Collection',
    description: 'Timeless pieces crafted for the modern goddess.'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop',
    title: 'Bridal Edit',
    subtitle: 'For Your Special Day',
    description: 'Intricate designs that tell your unique love story.'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop',
    title: 'Golden Hour',
    subtitle: 'Everyday Luxury',
    description: 'Effortless glamour for the moments that matter.'
  }
];

const FEATURED_ITEMS = [
  {
    id: 1,
    name: 'Kundan Choker Set',
    price: '₹12,500',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1974&auto=format&fit=crop',
    category: 'Necklaces'
  },
  {
    id: 2,
    name: 'Temple Jhumkas',
    price: '₹4,200',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a51?q=80&w=2062&auto=format&fit=crop',
    category: 'Earrings'
  },
  {
    id: 3,
    name: 'Polki Bangles',
    price: '₹8,900',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1887&auto=format&fit=crop',
    category: 'Bangles'
  }
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-brand-light overflow-x-hidden"
    >
      
      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden bg-brand-dark">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Media */}
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "linear" }}
              className="absolute inset-0 w-full h-full"
            >
              {SLIDES[currentSlide].type === 'video' ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={SLIDES[currentSlide].poster}
                  className="w-full h-full object-cover opacity-60"
                >
                  <source src={SLIDES[currentSlide].src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={SLIDES[currentSlide].src}
                  alt={SLIDES[currentSlide].title}
                  className="w-full h-full object-cover opacity-60"
                />
              )}
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-6">
              <div className="overflow-hidden">
                <motion.h3 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-gold-300 text-xs md:text-sm uppercase tracking-[0.4em] mb-4 md:mb-6 font-medium"
                >
                  {SLIDES[currentSlide].subtitle}
                </motion.h3>
              </div>
              
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-6xl md:text-8xl lg:text-9xl mb-6 md:mb-8 leading-none tracking-tight text-white drop-shadow-lg"
                >
                  {SLIDES[currentSlide].title}
                </motion.h1>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-gray-300 text-sm md:text-base max-w-md mx-auto mb-10 font-light tracking-wide leading-relaxed"
              >
                {SLIDES[currentSlide].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <Link 
                  to="/products"
                  className="group relative inline-flex items-center gap-3 px-8 py-3 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-brand-dark transition-all duration-500"
                >
                  <span className="text-xs uppercase tracking-[0.2em] font-medium">Explore Collection</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex gap-4">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="relative h-[2px] w-12 bg-white/20 overflow-hidden"
            >
              {idx === currentSlide && (
                <motion.div 
                  layoutId="activeSlide"
                  className="absolute inset-0 bg-white"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* --- PHILOSOPHY SECTION --- */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-brand-light text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-gold-600 text-xs uppercase tracking-[0.3em] block mb-6">The Philosophy</span>
          <h2 className="font-serif text-4xl md:text-6xl text-brand-dark mb-10 leading-tight">
            "Jewelry is not just an accessory.<br/>It is an emotion, a legacy."
          </h2>
          <p className="text-gray-600 font-light leading-relaxed text-lg md:text-xl max-w-2xl mx-auto">
            At Iksha, we blend traditional Indian craftsmanship with contemporary aesthetics. 
            Each piece is handpicked to ensure it tells a story of elegance and grace.
          </p>
          <div className="mt-12">
             <img 
               src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Signature_sample.svg/1200px-Signature_sample.svg.png" 
               alt="Signature" 
               className="h-16 mx-auto opacity-40 grayscale"
             />
             <p className="text-xs uppercase tracking-widest mt-4 text-gray-400">Samiksha Phadke, Founder</p>
          </div>
        </motion.div>
      </section>

      {/* --- FEATURED COLLECTION (Masonry-ish) --- */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="flex justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-3xl md:text-5xl text-brand-dark mb-2">Curated Edits</h3>
            <p className="text-gray-500 text-sm uppercase tracking-widest">Handpicked for you</p>
          </motion.div>
          <Link to="/products" className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest hover:text-gold-600 transition-colors">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_ITEMS.map((item, idx) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`group relative cursor-pointer ${idx === 1 ? 'md:-mt-16' : ''}`}
            >
              <div className="overflow-hidden rounded-sm aspect-[3/4] relative">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="bg-white text-brand-dark px-6 py-3 text-xs uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-colors">
                    Quick View
                  </span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <span className="text-[10px] text-gold-600 uppercase tracking-widest block mb-1">{item.category}</span>
                <h4 className="font-serif text-xl text-brand-dark group-hover:text-gold-600 transition-colors">{item.name}</h4>
                <p className="text-gray-500 text-sm mt-1 font-mono">{item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center md:hidden">
           <Link to="/products" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b border-brand-dark pb-1">
            View All Products
          </Link>
        </div>
      </section>

      {/* --- INSTAGRAM FEED TEASER --- */}
      <section className="py-20 bg-brand-light border-t border-gray-100 overflow-hidden">
        <div className="text-center mb-12">
          <Instagram size={24} className="mx-auto mb-4 text-brand-dark" />
          <h3 className="font-serif text-2xl">@iksha.jewelry</h3>
        </div>
        
        {/* Marquee */}
        <div className="relative flex overflow-x-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-4 whitespace-nowrap"
          >
            {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((i, idx) => (
              <div key={`${i}-${idx}`} className="w-64 h-64 flex-shrink-0 bg-gray-200 overflow-hidden relative group">
                <img 
                  src={`https://picsum.photos/seed/${i + 100}/400/400`} 
                  alt="Instagram" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER (Simple) --- */}
      <footer className="bg-brand-dark text-white py-16 px-6 md:px-12 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
          <div className="md:col-span-2">
            <h2 className="font-serif text-3xl mb-6">IKSHA</h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Redefining artificial jewelry with elegance, tradition, and a touch of modern allure.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-6 text-gold-400">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/products" className="hover:text-white transition-colors">All Jewelry</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Bridal Sets</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Necklaces</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Earrings</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-6 text-gold-400">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>contact@ikshajewelry.com</li>
              <li>+91 98765 43210</li>
              <li>Mumbai, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2024 Iksha Jewelry. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;
