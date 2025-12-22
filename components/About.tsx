
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, ShieldCheck, Zap, Headphones } from 'lucide-react';
import { useCMS } from './CMSContext';

const values = [
    {
        title: "Peşəkarlıq",
        desc: "Hər işdə yüksək keyfiyyətə və düzgün yanaşmaya önəm veririk.",
        icon: Award,
        color: "from-orange-500 to-red-500"
    },
    {
        title: "Müştəri Məmnuniyyəti",
        desc: "Artistlərin və izləyicilərin razılığı bizim üçün prioritetdir.",
        icon: Heart,
        color: "from-blue-500 to-indigo-600"
    },
    {
        title: "Şəffafıq",
        desc: "İş proseslərimiz açıq və etibarlı prinsiplər üzərində qurulub.",
        icon: ShieldCheck,
        color: "from-emerald-500 to-teal-600"
    },
    {
        title: "Yenilikçilik",
        desc: "Daim yeni trendləri tətbiq edir, kreativ həllər təklif edirik.",
        icon: Zap,
        color: "from-purple-500 to-pink-600"
    },
    {
        title: "Dəstək",
        desc: "Yeni istedadların inkişafına və tanınmasına kömək edirik.",
        icon: Headphones,
        color: "from-amber-500 to-orange-600"
    }
];

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
                    <div className="mt-24">
                        <div className="flex flex-col items-center mb-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">Əsas Dəyərlərimiz</h3>
                            <div className="w-20 h-1 bg-[#f05a28] rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {values.map((value, idx) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className={`relative group p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 ${idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                                >
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <value.icon size={28} />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#f05a28] transition-colors">
                                        {value.title}
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        {value.desc}
                                    </p>

                                    {/* Subtle background decoration */}
                                    <div className="absolute top-0 right-0 -mt-2 -mr-2 w-24 h-24 bg-gray-50 rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
