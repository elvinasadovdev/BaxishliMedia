
import React from 'react';

export interface Service {
  id: number;
  title: string;
  description: string;
  iconType: string; // 'seo', 'content', 'verify', 'support', 'ads', 'digital'
}

export interface Partner {
  id: number;
  name: string;
  image: string;
  stats: string; // e.g. "32M • 455K • 52.6K"
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  image: string;
  views: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface MusicTrack {
  id: number;
  title: string;
  album: string;
  duration: string;
  plays: string;
}

export interface MusicSection {
  heading: string;
  headingAccent: string;
  albumArt: string;
  tracks: MusicTrack[];
}

export interface GallerySection {
  heading: string;
  headingAccent: string;
  images: string[];
}

export interface SiteData {
  general: {
    artistName: string; // "BaxishliMedia"
    contactEmail: string;
    contactPhone: string;
    address: string;
  };
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    buttonText: string;
  };
  about: {
    heading: string;
    text: string[];
    image: string;
    stats: { label: string; value: string }[];
  };
  services: {
    heading: string;
    subtitle: string;
    items: Service[];
  };
  partners: {
    heading: string;
    items: Partner[];
    brandLogos: string[]; // URLs for Yoola, Believe, etc.
  };
  music: MusicSection;
  gallery: GallerySection;
  blog: {
    heading: string;
    subtitle: string;
    posts: BlogPost[];
  };
  contact: {
    heading: string;
    directorName: string;
    directorTitle: string;
    directorImage: string;
  };
}