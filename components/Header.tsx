import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'PRODUCTS', path: '/products' }, // Mapped 'PROJECTS' to 'PRODUCTS' for jewelry
    { label: 'ABOUT US', path: '/about' },
    { label: 'CONTACT US', path: '/contact' },
  ];

  return (
    <>
      {/* Floating Minimal Header Buttons */}
      <header className="fixed top-0 left-0 w-full z-50 px-8 py-8 md:px-12 md:py-10 flex justify-between items-start pointer-events-none text-white mix-blend-difference">
        
        {/* Logo - Minimal Text */}
        <Link to="/" className="pointer-events-auto group">
          <div className="flex flex-col">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-[0.2em] leading-none group-hover:text-gold-300 transition-colors duration-500">
              IKSHA
            </span>
          </div>
        </Link>

        {/* Hamburger Menu Trigger */}
        <button 
          onClick={() => setIsOpen(true)} 
          className="pointer-events-auto group hover:scale-110 transition-transform duration-300"
        >
          <Menu size={32} strokeWidth={1} className="w-8 h-8 md:w-10 md:h-10 text-current" />
        </button>
      </header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.87, 0, 0.13, 1] }}
            className="fixed inset-0 z-[60] bg-[#F5F5F5] flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 md:top-10 md:right-12 text-brand-dark hover:text-gold-600 transition-colors z-20 hover:rotate-90 duration-500"
            >
              <X size={32} strokeWidth={1} className="w-8 h-8 md:w-10 md:h-10" />
            </button>

            {/* Navigation Links - Centered & Serif */}
            <nav className="flex flex-col items-center space-y-6 md:space-y-8 z-10">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
                >
                  <Link
                    to={link.path}
                    className={`font-serif text-3xl md:text-5xl tracking-widest uppercase transition-all duration-300 hover:text-gold-600 hover:scale-105 block ${
                      location.pathname === link.path ? 'text-brand-dark font-medium' : 'text-brand-dark/80'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Watermark Logo at Bottom */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute bottom-16 md:bottom-24 select-none pointer-events-none"
            >
              <span className="font-serif text-[80px] md:text-[150px] leading-none text-gray-200/50 tracking-[0.2em]">
                I & D
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;