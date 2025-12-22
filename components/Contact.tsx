
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Linkedin, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useCMS } from './CMSContext';

export const Contact: React.FC = () => {
  const { data } = useCMS();
  const { contact, general } = data;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          _subject: `Yeni Əlaqə Mesajı: ${formData.firstName} ${formData.lastName}`
        })
      });

      if (response.ok) {
        setStatus('success');
        setFeedback("Mesajınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.");
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Xəta baş verdi');
      }
    } catch (error) {
      setStatus('error');
      setFeedback('Bağışlayın, xəta baş verdi. Zəhmət olmasa bir az sonra yenidən cəhd edin.');
    }
  };

  return (
    <section id="contact" className="py-16 bg-white">

      {/* Top Info Bar */}
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-24 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-red-100 flex items-center justify-center text-[#f05a28] mb-3">
              <Phone size={20} />
            </div>
            <span className="text-gray-600 font-medium">{general.contactPhone}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-red-100 flex items-center justify-center text-[#f05a28] mb-3">
              <Mail size={20} />
            </div>
            <div className="text-gray-600 text-sm">
              <div className="font-medium">{general.contactEmail}</div>
              <div className="text-xs text-gray-400">copyright@baxishlimedia.az</div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-red-100 flex items-center justify-center text-[#f05a28] mb-3">
              <MapPin size={20} />
            </div>
            <div className="text-gray-600 text-sm max-w-xs text-center">
              {general.address}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mb-24">
        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">

          {/* Director Profile */}
          <div className="flex items-start gap-4 lg:w-1/3 justify-center lg:justify-end">
            <img
              src={contact.directorImage}
              alt="Director"
              className="w-24 h-24 rounded-lg object-cover shadow-lg"
            />
            <div>
              <h4 className="font-bold text-gray-800 text-lg">{contact.directorName}</h4>
              <p className="text-gray-500 text-sm mb-3">{contact.directorTitle}</p>
              <p className="text-xs text-gray-400 mb-1">
                <Mail size={12} className="inline mr-1" />
                {general.contactEmail}
              </p>
              <p className="text-xs text-gray-400 mb-3">
                {general.address}
              </p>
              <div className="flex gap-2 text-blue-500">
                <Facebook size={16} />
                <Instagram size={16} />
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-1/2 bg-gray-50 p-8 rounded-2xl w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Bizə yazın</h3>
            <p className="text-gray-500 text-sm mb-6">Vaxt itirməyin, elə indi bizimlə əlaqə saxlayın.</p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  type="text"
                  placeholder="Adınız*"
                  className="w-full bg-white border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#f05a28]"
                />
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  type="text"
                  placeholder="Soyadınız*"
                  className="w-full bg-white border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#f05a28]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  type="email"
                  placeholder="E-poçt*"
                  className="w-full bg-white border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#f05a28]"
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  type="text"
                  placeholder="Telefon*"
                  className="w-full bg-white border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#f05a28]"
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Mesajınız*"
                className="w-full bg-white border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#f05a28]"
              ></textarea>

              <button
                disabled={status === 'loading' || status === 'success'}
                className="w-full bg-[#e67e22] text-white font-medium py-3 rounded-lg hover:bg-[#d35400] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {status === 'loading' && <Loader2 className="animate-spin" size={20} />}
                {status === 'success' ? 'Göndərildi' : status === 'loading' ? 'Göndərilir...' : 'Göndər'}
              </button>

              {status === 'success' && (
                <div className="p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 text-sm mt-2">
                  <CheckCircle size={16} />
                  {feedback}
                </div>
              )}

              {status === 'error' && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm mt-2">
                  <AlertCircle size={16} />
                  {feedback}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
