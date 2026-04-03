import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, clearCart, addToast } = useAppContext();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email) newErrors.email = "Required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
    
    if (!formData.firstName) newErrors.firstName = "Required";
    if (!formData.lastName) newErrors.lastName = "Required";
    if (!formData.address) newErrors.address = "Required";
    if (!formData.city) newErrors.city = "Required";
    if (!formData.zipCode) newErrors.zipCode = "Required";

    if (!formData.cardNumber) newErrors.cardNumber = "Required";
    else if (formData.cardNumber.replace(/\s/g, '').length < 15) newErrors.cardNumber = "Invalid card";
    
    if (!formData.expiry) newErrors.expiry = "Required";
    else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) newErrors.expiry = "Format MM/YY";
    
    if (!formData.cvv) newErrors.cvv = "Required";
    else if (formData.cvv.length < 3) newErrors.cvv = "Invalid CVV";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        clearCart();
        addToast('Order placed successfully!', 'success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 2000);
    } else {
      addToast('Please fix the errors in the form', 'error');
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full bg-brand-light min-h-screen pt-32 md:pt-40 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={48} className="text-green-500" />
          </div>
          <h1 className="text-4xl font-serif text-brand-dark mb-4">Order Confirmed</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Thank you for your purchase, {formData.firstName}. Your order has been received and is being processed. We will send you an email confirmation shortly.
          </p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-brand-dark text-white px-8 py-4 uppercase tracking-[0.2em] text-sm hover:bg-gold-700 transition-colors"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="w-full bg-brand-light min-h-screen pt-32 md:pt-40 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-brand-dark mb-4">Your cart is empty</h1>
          <button 
            onClick={() => navigate('/products')}
            className="text-gold-600 hover:text-brand-dark uppercase tracking-widest text-sm transition-colors"
          >
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-brand-light min-h-screen pt-32 md:pt-40 pb-20">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif text-brand-dark mb-12"
        >
          Checkout
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Info */}
              <div>
                <h2 className="font-serif text-2xl text-brand-dark mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-white border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-gold-500 focus:outline-none transition-colors`} 
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div>
                <h2 className="font-serif text-2xl text-brand-dark mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-white border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} focus:border-gold-500 focus:outline-none transition-colors`} 
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-white border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} focus:border-gold-500 focus:outline-none transition-colors`} 
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.lastName}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Address</label>
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-white border ${errors.address ? 'border-red-500' : 'border-gray-200'} focus:border-gold-500 focus:outline-none transition-colors`} 
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">City</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-white border ${errors.city ? 'border-red-500' : 'border-gray-200'} focus:border-gold-500 focus:outline-none transition-colors`} 
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Postal Code</label>
                    <input 
                      type="text" 
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-white border ${errors.zipCode ? 'border-red-500' : 'border-gray-200'} focus:border-gold-500 focus:outline-none transition-colors`} 
                    />
                    {errors.zipCode && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.zipCode}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Info (Simulated) */}
              <div>
                <h2 className="font-serif text-2xl text-brand-dark mb-6">Payment</h2>
                <div className="bg-gray-50 p-6 border border-gray-200 rounded-sm">
                  <p className="text-sm text-gray-500 mb-4">This is a simulated checkout. No real payment will be processed.</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Card Number</label>
                      <input 
                        type="text" 
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="0000 0000 0000 0000" 
                        className={`w-full p-4 bg-white border ${errors.cardNumber ? 'border-red-500' : 'border-gray-200'} focus:border-gold-500 focus:outline-none transition-colors`} 
                      />
                      {errors.cardNumber && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Expiry Date</label>
                        <input 
                          type="text" 
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY" 
                          className={`w-full p-4 bg-white border ${errors.expiry ? 'border-red-500' : 'border-gray-200'} focus:border-gold-500 focus:outline-none transition-colors`} 
                        />
                        {errors.expiry && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.expiry}</p>}
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">CVC</label>
                        <input 
                          type="text" 
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123" 
                          className={`w-full p-4 bg-white border ${errors.cvv ? 'border-red-500' : 'border-gray-200'} focus:border-gold-500 focus:outline-none transition-colors`} 
                        />
                        {errors.cvv && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-brand-dark text-white py-5 uppercase tracking-[0.2em] text-sm hover:bg-gold-700 transition-colors disabled:opacity-70 flex justify-center items-center"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  `Pay $${cartTotal}`
                )}
              </button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:w-1/3"
          >
            <div className="bg-white p-8 border border-gray-100 shadow-sm sticky top-32">
              <h2 className="font-serif text-2xl text-brand-dark mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-gray-100 flex-shrink-0 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-sm text-brand-dark">{item.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500">{item.category}</p>
                      <p className="font-serif text-sm text-brand-dark mt-1">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>${cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-xl font-serif text-brand-dark pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span>${cartTotal}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
