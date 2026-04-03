import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from '../types';

export interface Review {
  id: string;
  rating: number;
  text: string;
  author: string;
  avatar?: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  reviews: Record<number, Review[]>;
  addReview: (productId: number, review: Omit<Review, 'id'>) => void;
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [reviews, setReviews] = useState<Record<number, Review[]>>(() => {
    const saved = localStorage.getItem('reviews');
    return saved ? JSON.parse(saved) : {};
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const isRemoving = prev.includes(id);
      if (isRemoving) {
        addToast('Removed from wishlist', 'info');
        return prev.filter(item => item !== id);
      } else {
        addToast('Added to wishlist', 'success');
        return [...prev, id];
      }
    });
  };

  const addReview = (productId: number, review: Omit<Review, 'id'>) => {
    const newReview = { ...review, id: Date.now().toString() };
    setReviews(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), newReview]
    }));
    addToast('Review submitted successfully', 'success');
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    addToast('Added to bag', 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider value={{ 
      wishlist, toggleWishlist, 
      reviews, addReview,
      cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart, updateQuantity, clearCart,
      toasts, addToast, removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
