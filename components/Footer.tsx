import React from 'react';
import { useCMS } from './CMSContext';

export const Footer: React.FC = () => {
  const { data } = useCMS();

  return (
    <footer className="bg-black py-8 border-t border-neutral-900">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} {data.general.artistName} MUSIC. Bütün hüquqlar qorunur.
        </p>
      </div>
    </footer>
  );
};