
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from './CMSContext';
import { Calendar, Eye, X } from 'lucide-react';

export const Blog: React.FC = () => {
  const { data } = useCMS();
  const { blog } = data;
  const [selectedPost, setSelectedPost] = useState<any>(null);

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-2">{blog.heading}</h2>
          <p className="text-gray-500">{blog.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blog.posts.filter(post => post.title && post.image).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>

              <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-[#f05a28] transition-colors">
                {post.title}
              </h3>

              <div className="flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={12} />
                  <span>{post.views}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 text-white bg-black/20 hover:bg-black/40 p-2 rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto">
                <div className="h-64 md:h-80 w-full relative">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-8 right-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedPost.title}</h2>
                    <div className="flex items-center gap-4 text-xs text-gray-300">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{selectedPost.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={12} />
                        <span>{selectedPost.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <div className="prose prose-orange max-w-none">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg">
                      {selectedPost.content}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
