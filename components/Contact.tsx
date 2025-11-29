
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { useCMS } from './CMSContext';

export const Contact: React.FC = () => {
  const { data } = useCMS();
  const { contact, general } = data;

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
            
            <form className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Adınız*" className="w-full bg-white border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#f05a28]" />
                  <input type="text" placeholder="Soyadınız*" className="w-full bg-white border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#f05a28]" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="email" placeholder="E-poçt*" className="w-full bg-white border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#f05a28]" />
                  <input type="text" placeholder="Telefon*" className="w-full bg-white border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#f05a28]" />
               </div>
               <textarea rows={4} placeholder="Mesajınız*" className="w-full bg-white border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#f05a28]"></textarea>
               
               <button className="w-full bg-[#e67e22] text-white font-medium py-3 rounded-lg hover:bg-[#d35400] transition-colors">
                  Göndər
               </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="w-full h-[400px] bg-gray-200 relative">
         <img src={contact.mapImage} className="w-full h-full object-cover grayscale opacity-60" alt="Map" />
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="bg-white p-4 rounded-xl shadow-xl flex flex-col items-center">
                <div className="text-[#f05a28] font-bold">BaxishliMedia</div>
                <div className="text-xs text-gray-500">14 Nizami Street, Baku</div>
             </div>
         </div>
      </div>
    </section>
  );
};