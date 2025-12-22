
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useModal } from './ModalContext';
import { useCMS } from './CMSContext';

export const ContactModal: React.FC = () => {
  const { isOpen, closeModal } = useModal();
  const { data } = useCMS();
  const { general } = data;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    service: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(`https://formspree.io/f/${general.formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Yeni Müraciət: ${formData.fullName} (${formData.service})`
        })
      });

      if (response.ok) {
        setStatus('success');
        setFeedback("Müraciətiniz qəbul olundu! Əməkdaşlarımız sizinlə əlaqə saxlayacaq.");
        setFormData({ fullName: '', phone: '', service: '' });
        // Optional: Close modal after delay
        setTimeout(() => {
          closeModal();
          setStatus('idle');
          setFeedback('');
        }, 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Xəta');
      }
    } catch (err) {
      setStatus('error');
      setFeedback('Xəta baş verdi. Yenidən cəhd edin.');
    }
  };

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
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-8 pt-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Müraciət et</h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    type="text"
                    placeholder="Adınız, soyadınız"
                    className="w-full bg-[#f2f2f2] text-gray-800 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f05a28]/20 border-none placeholder-gray-500"
                  />
                </div>

                <div>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    type="tel"
                    placeholder="Telefon nömrəniz"
                    className="w-full bg-[#f2f2f2] text-gray-800 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f05a28]/20 border-none placeholder-gray-500"
                  />
                </div>

                <div className="relative">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#f2f2f2] text-gray-500 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f05a28]/20 border-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Xidmət seçin</option>
                    <option value="seo">YouTube SEO</option>
                    <option value="content">Kontent Hüququ</option>
                    <option value="verify">Profil Təsdiqlənməsi</option>
                    <option value="ads">Reklam / Tanıtım</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full bg-[#f05a28] hover:bg-[#d35400] text-white font-medium py-4 rounded-full transition-colors mt-4 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {status === 'loading' && <Loader2 className="animate-spin" size={20} />}
                  {status === 'success' ? 'Göndərildi' : status === 'loading' ? 'Göndərilir...' : 'Göndər'}
                </button>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 text-sm justify-center"
                  >
                    <CheckCircle size={16} />
                    {feedback}
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm justify-center"
                  >
                    <AlertCircle size={16} />
                    {feedback}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
