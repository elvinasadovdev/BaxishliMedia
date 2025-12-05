
import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from './CMSContext';

export const About: React.FC = () => {
    const { data } = useCMS();
    const { about } = data;

    return (
        <section id="about" className="py-24 bg-white">
            <div className="container mx-auto px-6">

                {/* Header with Breadcrumb */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2 uppercase">{about.heading}</h2>
                    <div className="text-sm text-gray-400 breadcrumbs uppercase tracking-widest">
                        Ana səhifə <span className="mx-2">/</span> Haqqımızda
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-full"
                    >
                        {about.text.map((para, i) => (
                            <p key={i} className="text-gray-600 mb-6 leading-relaxed text-center text-lg">
                                {para}
                            </p>
                        ))}
                    </motion.div>

                    {/* Core Values Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-16"
                    >
                        <h3 className="text-3xl font-bold text-gray-800 text-center mb-10">Əsas Dəyərlərimiz</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                                <h4 className="text-xl font-bold text-gray-800 mb-2">Peşəkarlıq</h4>
                                <p className="text-gray-600">Hər işdə yüksək keyfiyyətə və düzgün yanaşmaya önəm veririk.</p>
                            </div>

                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                                <h4 className="text-xl font-bold text-gray-800 mb-2">Müştəri Məmnuniyyəti</h4>
                                <p className="text-gray-600">Artistlərin və izləyicilərin razılığı bizim üçün prioritetdir.</p>
                            </div>

                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                                <h4 className="text-xl font-bold text-gray-800 mb-2">Şəffaflıq</h4>
                                <p className="text-gray-600">İş proseslərimiz açıq və etibarlı prinsiplər üzərində qurulub.</p>
                            </div>

                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                                <h4 className="text-xl font-bold text-gray-800 mb-2">Yenilikçilik</h4>
                                <p className="text-gray-600">Daim yeni trendləri tətbiq edir, kreativ həllər təklif edirik.</p>
                            </div>

                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow md:col-span-2">
                                <h4 className="text-xl font-bold text-gray-800 mb-2">Dəstək</h4>
                                <p className="text-gray-600">Yeni istedadların inkişafına və tanınmasına kömək edirik.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
