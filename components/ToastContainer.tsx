import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Info, XCircle, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAppContext();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="bg-white shadow-lg border border-gray-100 p-4 flex items-center gap-3 min-w-[300px] pointer-events-auto"
          >
            {toast.type === 'success' && <CheckCircle size={20} className="text-green-500" />}
            {toast.type === 'error' && <XCircle size={20} className="text-red-500" />}
            {toast.type === 'info' && <Info size={20} className="text-blue-500" />}
            
            <span className="text-sm font-serif text-brand-dark flex-1">{toast.message}</span>
            
            <button 
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
