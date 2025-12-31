
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCMS } from './CMSContext';
import { useModal } from './ModalContext';

const navItems = [
  { label: 'Ana səhifə', path: '/' },
  { label: 'Haqqımızda', path: '/about' },
  { label: 'Xidmətlər', path: '/services' },
  { label: 'Partnyorlar', path: '/partners' },
  { label: 'Bloq', path: '/blog' },
  { label: 'Əlaqə', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const { data } = useCMS();
  const { openModal } = useModal();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-[#050505]/95 backdrop-blur-md py-4 shadow-md'
        : 'bg-[#050505]/90 backdrop-blur-sm py-6'
        }`}
    >
      <div className="container mx-auto px-6 relative flex justify-between items-center">

        {/* Logo Area - Fixed to the Left */}
        <Link
          to="/"
          className="flex flex-col leading-none group relative z-20"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="text-3xl font-bold tracking-tighter">
            <span className="text-[#f05a28]">Baxishli</span>
          </div>
          <div className="text-[10px] tracking-[0.3em] text-gray-400 font-light group-hover:text-white transition-colors">
            MEDIA
          </div>
        </Link>

        {/* Desktop Menu - Absolute Center */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center gap-8">
          <div className="flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`text-sm font-medium transition-colors relative group whitespace-nowrap ${isActive(item.path) ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#f05a28] transition-all duration-300 ${isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
              </Link>
            ))}
          </div>

          {/* Blue CTA Button - Opens Modal */}
          <button
            onClick={openModal}
            className="px-6 py-2.5 bg-[#0f6cbd] hover:bg-[#0d5ca0] text-white text-sm font-medium rounded-full transition-colors shadow-lg whitespace-nowrap"
          >
            Müraciət et
          </button>
        </div>

        {/* Mobile Toggle - Right */}
        <div className="lg:hidden ml-auto relative z-20">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#050505] border-t border-gray-800 shadow-2xl">
          <div className="flex flex-col items-center py-8 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-[#f05a28] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openModal();
              }}
              className="px-8 py-3 bg-[#0f6cbd] text-white font-medium rounded-full"
            >
              Müraciət et
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
