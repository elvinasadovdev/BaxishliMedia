import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from './CMSContext';
import { Users, Eye, Video } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const Partners: React.FC = () => {
  const { data } = useCMS();
  const { partners } = data;
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <section id="partners" className="py-24 bg-gray-50 text-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-2">{partners.heading}</h2>
          {!isMainPage && (
            <div className="text-sm text-gray-400 breadcrumbs uppercase tracking-widest">
              Ana səhifə <span className="mx-2">/</span> Partnyorlar
            </div>
          )}
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">{item.name}</h4>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Users size={12} />
                <span>{item.stats}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
