import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-serif text-gold-500 tracking-widest mb-4">IKSHA</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Adorn yourself with the timeless elegance of Iksha. 
              Handcrafted artificial jewelry curated by Samiksha Phadke for the modern muse.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-gold-300 font-sans text-sm uppercase tracking-widest mb-6">Explore</h4>
            <div className="flex flex-col space-y-3">
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors">Our Story</Link>
              <Link to="/products" className="text-gray-400 hover:text-white transition-colors">Collections</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping & Returns</a>
            </div>
          </div>

          {/* Connect */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-gold-300 font-sans text-sm uppercase tracking-widest mb-6">Connect</h4>
            <div className="flex space-x-6 mb-6">
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors"><Instagram size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors"><Facebook size={24} /></a>
              <a href="mailto:contact@iksha.com" className="text-gray-400 hover:text-gold-500 transition-colors"><Mail size={24} /></a>
            </div>
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} Iksha by Samiksha Phadke. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;