
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useModal } from './ModalContext';

export const ContactModal: React.FC = () => {
  const { isOpen, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-[500px] rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-8 pt-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Müraciət et</h2>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input 
                    type="text" 
                    placeholder="Adınız, soyadınız" 
                    className="w-full bg-[#f2f2f2] text-gray-800 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f05a28]/20 border-none placeholder-gray-500"
                  />
                </div>
                
                <div>
                  <input 
                    type="tel" 
                    placeholder="Telefon nömrəniz" 
                    className="w-full bg-[#f2f2f2] text-gray-800 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f05a28]/20 border-none placeholder-gray-500"
                  />
                </div>

                <div className="relative">
                  <select 
                    className="w-full bg-[#f2f2f2] text-gray-500 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f05a28]/20 border-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled selected>Xidmət seçin</option>
                    <option value="seo">YouTube SEO</option>
                    <option value="content">Kontent Hüququ</option>
                    <option value="verify">Profil Təsdiqlənməsi</option>
                    <option value="ads">Reklam / Tanıtım</option>
                  </select>
                  {/* Custom Arrow Icon could go here */}
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#f05a28] hover:bg-[#d35400] text-white font-medium py-4 rounded-full transition-colors mt-4 shadow-lg"
                >
                  Göndər
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
