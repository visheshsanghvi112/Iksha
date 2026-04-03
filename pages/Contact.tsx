import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'motion/react';

const Contact: React.FC = () => {
  return (
    <div className="w-full bg-brand-light min-h-screen pt-32 md:pt-40">
      <div className="container mx-auto px-6 pb-20">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">Get in Touch</h1>
          <p className="text-gray-500">We'd love to hear from you. Visit us or send a message.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto bg-white shadow-xl p-8 md:p-12 rounded-sm overflow-hidden">
          
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/3 bg-brand-dark text-white p-8 md:p-10 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-serif mb-8 text-gold-500">Contact Info</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="text-gold-500 mt-1" />
                  <div>
                    <h5 className="font-semibold mb-1">Visit Us</h5>
                    <p className="text-gray-400 text-sm">123 Fashion Street, Koregaon Park,<br />Pune, Maharashtra 411001</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-gold-500 mt-1" />
                  <div>
                    <h5 className="font-semibold mb-1">Email</h5>
                    <p className="text-gray-400 text-sm">hello@ikshajewelry.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-gold-500 mt-1" />
                  <div>
                    <h5 className="font-semibold mb-1">Call Us</h5>
                    <p className="text-gray-400 text-sm">+91 98765 43210</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h5 className="font-serif text-gold-300 italic">"Elegance is not standing out, but being remembered."</h5>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-2/3"
          >
            <h3 className="text-2xl font-serif text-brand-dark mb-8">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                  <input type="text" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold-500 transition-colors bg-transparent" placeholder="Jane" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                  <input type="text" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold-500 transition-colors bg-transparent" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                <input type="email" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold-500 transition-colors bg-transparent" placeholder="jane@example.com" />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Message</label>
                <textarea rows={4} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gold-500 transition-colors bg-transparent resize-none" placeholder="Tell us what you're looking for..."></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-brand-dark text-white uppercase tracking-widest text-xs hover:bg-gold-700 transition-colors duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
      
       {/* Footer Replacement */}
      <div className="w-full bg-brand-dark py-12 text-center mt-auto">
        <p className="text-white/30 text-xs tracking-widest uppercase">Iksha Designs 2025</p>
      </div>
    </div>
  );
};

export default Contact;