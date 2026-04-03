import React from 'react';
import { Eye, Award, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

const About: React.FC = () => {
  return (
    <div className="w-full bg-brand-light">
      
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2000&auto=format&fit=crop" 
          alt="Jewelry Curation" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-6">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base uppercase tracking-[0.4em] mb-6 text-gold-200"
          >
            The Story
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-5xl md:text-8xl lg:text-9xl mb-8"
          >
            Curating Legacy
          </motion.h1>
        </div>
      </div>

      {/* Intro & Founder */}
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 order-2 md:order-1"
          >
            <h4 className="text-gold-600 text-xs uppercase tracking-[0.3em] mb-4">The Founder</h4>
            <h2 className="text-4xl md:text-6xl font-serif text-brand-dark mb-8 leading-tight">Samiksha Phadke</h2>
            <div className="space-y-6 text-gray-500 leading-relaxed font-light text-lg text-justify md:text-left">
              <p>
                Born from a fascination with India's royal courts and contemporary art, Iksha was established to bridge the gap between heavy heritage jewelry and modern wearability.
              </p>
              <p>
                "Iksha" (Sanskrit for 'Sight') represents the vision of seeing oneself as a canvas. Samiksha believes that jewelry is the final brushstroke of any ensemble. Based in Pune, she personally curates every stone and setting, ensuring that artificial jewelry carries the weight and dignity of the real thing.
              </p>
            </div>
            <div className="mt-10">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" 
                alt="Signature" 
                className="h-12 opacity-40 invert"
              />
            </div>
          </motion.div>
          
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div className="aspect-[3/4] overflow-hidden relative">
              <motion.img 
                initial={{ scale: 1.2, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src="https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=1200&auto=format&fit=crop" 
                alt="Samiksha" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Marquee - The "Animative" Part */}
      <div className="py-16 bg-brand-dark overflow-hidden border-y border-gold-900/30">
        <div className="whitespace-nowrap flex overflow-hidden">
           <motion.div 
             animate={{ x: ["0%", "-50%"] }}
             transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
             className="flex gap-16 items-center"
           >
              {[1, 2].map((i) => (
                <React.Fragment key={i}>
                  <span className="text-4xl md:text-6xl font-serif text-gold-500/80 uppercase tracking-widest px-8">Timeless Elegance</span>
                  <span className="text-2xl text-white/20">✦</span>
                  <span className="text-4xl md:text-6xl font-serif text-gold-500/80 uppercase tracking-widest px-8">Handcrafted Tradition</span>
                  <span className="text-2xl text-white/20">✦</span>
                  <span className="text-4xl md:text-6xl font-serif text-gold-500/80 uppercase tracking-widest px-8">Modern Soul</span>
                  <span className="text-2xl text-white/20">✦</span>
                  <span className="text-4xl md:text-6xl font-serif text-gold-500/80 uppercase tracking-widest px-8">Iksha Designs</span>
                  <span className="text-2xl text-white/20">✦</span>
                </React.Fragment>
              ))}
           </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-6 py-24 md:py-32">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: Eye, title: "The Vision", text: "To empower women to wear their heritage with pride, offering luxury that doesn't demand a king's ransom." },
              { icon: Award, title: "The Craft", text: "Every piece is selected for its intricate detailing, high-quality polish, and durability. We refuse to compromise on finish." },
              { icon: Leaf, title: "Sustainable Luxury", text: "Promoting slow fashion by offering timeless designs that you will cherish and reuse for years, not just one season." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="flex flex-col items-center group cursor-default"
              >
                 <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center mb-6 group-hover:border-gold-500 group-hover:bg-gold-50 transition-all duration-500">
                    <item.icon strokeWidth={1} className="text-brand-dark group-hover:text-gold-600 transition-colors" size={28} />
                 </div>
                 <h3 className="font-serif text-2xl mb-4">{item.title}</h3>
                 <p className="text-gray-500 font-light text-sm leading-relaxed max-w-xs">
                   {item.text}
                 </p>
              </motion.div>
            ))}
         </div>
      </div>

      {/* The Process / Craft Section */}
      <div className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                 <div className="aspect-square overflow-hidden">
                    <motion.img 
                      initial={{ scale: 1.1, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      src="https://images.unsplash.com/photo-1615655406736-b37c4d898e6f?q=80&w=1200&auto=format&fit=crop" 
                      alt="Craftsmanship" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                 </div>
              </div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2"
              >
                 <h4 className="text-gold-600 text-xs uppercase tracking-[0.3em] mb-6">Behind the Scenes</h4>
                 <h2 className="text-3xl md:text-5xl font-serif mb-8">From Concept to Casket</h2>
                 <p className="text-gray-500 font-light mb-6">
                    Our curation process involves months of research into regional Indian art forms. From the Temple jewelry of the South to the Kundan work of Rajasthan, we source pieces that are authentic in design and superior in make.
                 </p>
                 <p className="text-gray-500 font-light">
                    We ensure that every clasp, stone, and chain meets our gold standard before it ever reaches our portfolio.
                 </p>
              </motion.div>
           </div>
        </div>
      </div>
      
      {/* Footer Replacement Section for About Page */}
      <div className="w-full bg-brand-dark py-12 text-center">
        <p className="text-white/30 text-xs tracking-widest uppercase">Iksha Designs 2025</p>
      </div>
    </div>
  );
};

export default About;