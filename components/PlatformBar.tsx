
import React from 'react';
import { motion } from 'framer-motion';

const platforms = [
    { name: 'YouTube', logo: '/youtube-logo.png' },
    { name: 'TikTok', logo: '/tiktok-logo.png' },
    { name: 'Instagram', logo: '/instagram-logo.png' },
    { name: 'Spotify', logo: '/spotify-logo.png' },
    { name: 'iTunes', logo: '/itunes-logo.png' },
    { name: 'Luna Music', logo: '/luna-logo.png' },
    { name: 'Yoola', logo: '/yoola-logo.png' },
    { name: 'Believe', logo: '/believe-logo.png' },
    { name: 'Facebook', logo: '/facebook-logo.png' }
];

export const PlatformBar: React.FC = () => {
    return (
        <div className="bg-white py-12 border-t border-gray-100 mt-auto">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-20">
                    {platforms.map((platform, i) => (
                        <motion.div
                            key={platform.name}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            className="h-7 md:h-9 flex items-center justify-center transition-all duration-300"
                        >
                            <img
                                src={platform.logo}
                                alt={platform.name}
                                className="h-full w-auto object-contain"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    if (platform.name === 'Luna Music') {
                                        target.style.display = 'none';
                                        if (target.parentElement) {
                                            target.parentElement.innerHTML = `<span class="text-gray-900 font-bold text-lg tracking-tighter">LUNA <span class="text-gray-400">MUSIC HOUSE</span></span>`;
                                        }
                                    } else {
                                        target.style.display = 'none';
                                        if (target.parentElement) {
                                            target.parentElement.innerHTML = `<span class="text-gray-400 font-bold text-xs tracking-widest uppercase">${platform.name}</span>`;
                                        }
                                    }
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
