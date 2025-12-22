
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData } from '../types';
import { useLocation } from 'react-router-dom';

const defaultData: SiteData = {
  general: {
    artistName: "BaxishliMedia",
    contactEmail: "support@baxishlimedia.az",
    contactPhone: "(+994) 55 529 19 94",
    address: "Heydər Əliyev prospekti ev 22 Mənzil 27, AZ 1800 Şirvan, Azərbaycan"
  },
  hero: {
    title: "BaxishliMedia - Sizin Partnyorunuz",
    subtitle: "YouTube kanallarınızın və içeriklərinizin qorunmasını bizə etibar edin",
    backgroundImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop", // Dark office desk
    buttonText: "Daha ətraflı"
  },
  about: {
    heading: "Haqqımızda",
    text: [
      "Baxışlı Media — Azərbaycanda fəaliyyət göstərən müğənniləri, musiqiçiləri və gənc artistləri bir araya toplayan musiqi platformasıdır. Məqsədimiz istedadı önə çıxarmaq, sənətçilərin tanıtımını gücləndirmək və tamaşaçılara keyfiyyətli musiqi təqdim etməkdir."
    ],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    stats: [
      { value: "116", label: "Partnyor sayı" },
      { value: "13,927,238", label: "İzləyici sayı" },
      { value: "645,844,457", label: "Baxış sayı" },
      { value: "83,227", label: "Video sayı" }
    ]
  },
  services: {
    heading: "Xidmətlərimiz",
    subtitle: "Təklif etdiyimiz xidmətlərlə tanış olun",
    items: [
      { id: 1, title: "YouTube SEO Xidməti", description: "YouTube kanallarınızın daha böyük kütləyə çatması üçün SEO optimizasiyası", iconType: "seo" },
      { id: 2, title: "Kontent Hüququ", description: "Sizə aid olan məzmunun platformalarda qorunması", iconType: "content" },
      { id: 3, title: "Profilinizin Təsdiqlənməsi", description: "Sosial platformalarda rəsmi hesabların təsdiqlənməsi", iconType: "verify" },
      { id: 4, title: "Texniki Dəstək", description: "YouTube kanalınıza mütəxəssislərimiz tərəfindən 7/24 dəstək", iconType: "support" },
      { id: 5, title: "Reklam / Tanıtım", description: "Məzmunlarınızın daha böyük kütləyə çatdırılmasını təmin edirik", iconType: "ads" },
      { id: 6, title: "Rəqəmsal Platformalar", description: "Musiqilərinizin digər dijital platformalarda yayımlanması", iconType: "digital" },
    ]
  },
  partners: {
    heading: "Partnyorlar",
    items: [
      { id: 1, name: "AZTV", image: "https://yt3.googleusercontent.com/ytc/AIdro_k6k5W5m_v_R_x5_x_x_x_x=s176-c-k-c0x00ffffff-no-rj", stats: "32M • 455K • 52.6K" },
      { id: 2, name: "Mədəniyyət TV", image: "https://yt3.googleusercontent.com/ytc/AIdro_k6k5W5m_v_R_x5_x_x_x_x=s176-c-k-c0x00ffffff-no-rj", stats: "8.4M • 96.2K • 14.9K" },
      { id: 3, name: "İdman TV", image: "https://yt3.googleusercontent.com/ytc/AIdro_k6k5W5m_v_R_x5_x_x_x_x=s176-c-k-c0x00ffffff-no-rj", stats: "28.5M • 74.2K • 3.8K" },
      { id: 4, name: "Üzeyir Mehdizadə", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop", stats: "1.2B • 2.3M • 227" },
      { id: 5, name: "Talıb Tale", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop", stats: "941M • 1.4M • 138" },
      { id: 6, name: "Çinarə Məlikzadə", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop", stats: "170M • 496K • 84" },
    ],
    brandLogos: [
      "/youtube-logo.png",
      "/tiktok-logo.png",
      "/instagram-logo.png",
      "/spotify-logo.png",
      "/itunes-logo.png",
      "/believe-logo.png",
      "https://i.ibb.co/v4S8X8m/luna-music-house.png"
    ]
  },
  music: {
    heading: "Musiqi",
    headingAccent: "Dünyası",
    albumArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    tracks: [
      { id: 1, title: "Track 1", album: "Album 1", duration: "3:45", plays: "1.2M" },
      { id: 2, title: "Track 2", album: "Album 1", duration: "4:02", plays: "850K" },
      { id: 3, title: "Track 3", album: "Album 2", duration: "3:15", plays: "2.1M" },
      { id: 4, title: "Track 4", album: "Album 2", duration: "3:58", plays: "900K" }
    ]
  },
  gallery: {
    heading: "Qalereya",
    headingAccent: "Fotolar",
    images: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1459749411177-d2841fbd63e7?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  blog: {
    heading: "Bloq",
    subtitle: "Hər kəs üçün faydalı bloq yazılarımız",
    posts: [
      { id: 1, title: "Yenilənmiş Təqlid Siyasəti", date: "2023-09-28 16:27:55", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop", views: "0 dəfə oxunub", content: "YouTube-da təqlid siyasəti yeniləndi. Artıq kanal sahibləri digər kanalları təqlid edərkən daha diqqətli olmalıdırlar. Bu yenilik platformanın təhlükəsizliyini artırmaq məqsədi daşıyır." },
      { id: 2, title: "Digər müəlliflərin məzmunu ilə Shorts", date: "2023-09-28 16:14:12", image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1000&auto=format&fit=crop", views: "0 dəfə oxunub", content: "Shorts videolarında digər müəlliflərin məzmunundan istifadə qaydaları dəyişdi. Yeni remiks funksiyaları ilə daha yaradıcı videolar hazırlaya bilərsiniz." },
      { id: 3, title: "Tezliklə mobil cihazlarda Creative Studio", date: "2022-09-10 00:53:47", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop", views: "0 dəfə oxunub", content: "YouTube Creative Studio tezliklə mobil cihazlarda daha geniş funksionallıqla təqdim olunacaq. Kanalınızı idarə etmək artıq daha asan olacaq." }
    ]
  },
  contact: {
    heading: "Bizimlə əlaqə",
    directorName: "Pərvin Baxışlı",
    directorTitle: "Direktor",
    directorImage: "/pervin-baxishli.png"
  }
};

interface CMSContextType {
  data: SiteData;
  updateData: (newData: SiteData) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const loadData = async () => {
    // DO NOT poll if we are in the admin panel to avoid overwriting unsaved changes
    if (location.pathname === '/admin') return false;

    try {
      // First try to load from Vercel API
      const response = await fetch('/api/cms-data');
      if (response.ok) {
        const savedData = await response.json();
        if (savedData && typeof savedData === 'object') {
          // Migration: Update director image if it's the old unsplash one
          if (savedData.contact && savedData.contact.directorImage === "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop") {
            savedData.contact.directorImage = "/pervin-baxishli.png";
          }
          setData(prev => {
            // Only update if data has actually changed to avoid unnecessary re-renders
            if (JSON.stringify(prev) !== JSON.stringify({ ...prev, ...savedData })) {
              return { ...prev, ...savedData };
            }
            return prev;
          });
          return true;
        }
      }
    } catch (error) {
      console.error('Failed to load from API', error);
    }
    return false;
  };

  useEffect(() => {
    const initialLoad = async () => {
      const apiSuccess = await loadData();

      if (!apiSuccess) {
        // Fallback to localStorage for saved data if API fails
        const localData = localStorage.getItem('baxishlimedia-cms-data');
        if (localData) {
          try {
            const savedData = JSON.parse(localData);
            if (savedData && typeof savedData === 'object') {
              // Migration: Update director image if it's the old unsplash one
              if (savedData.contact && savedData.contact.directorImage === "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop") {
                savedData.contact.directorImage = "/pervin-baxishli.png";
                localStorage.setItem('baxishlimedia-cms-data', JSON.stringify(savedData));
              }
              setData(prev => ({ ...prev, ...savedData }));
            }
          } catch (e) {
            console.error("Failed to parse localStorage data", e);
          }
        }

        // Fallback to script tag data
        const scriptTag = document.getElementById('site-data');
        if (scriptTag && scriptTag.textContent) {
          try {
            const savedData = JSON.parse(scriptTag.textContent);
            if (savedData && typeof savedData === 'object') {
              setData(prev => ({ ...prev, ...savedData }));
            }
          } catch (e) {
            console.error("Failed to parse embedded site data", e);
          }
        }
      }

      // Small delay to ensure smooth transition
      setTimeout(() => setIsLoading(false), 800);
    };

    initialLoad();

    // Real-time updates: Poll the API every 5 seconds to sync changes across all devices
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateData = (newData: SiteData) => {
    setData(newData);
    // Auto-save to localStorage so entries are remembered even if page is refreshed
    localStorage.setItem('baxishlimedia-cms-data', JSON.stringify(newData));
  };

  return (
    <CMSContext.Provider value={{ data, updateData }}>
      {isLoading ? (
        <div className="fixed inset-0 bg-[#050505] z-[9999] flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 border-2 border-[#f05a28]/20 rounded-full"></div>
            <div className="absolute inset-0 w-20 h-20 border-t-2 border-[#f05a28] rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#f05a28] font-bold text-xl tracking-tighter">B</span>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center gap-2">
            <h2 className="text-white font-bold tracking-[0.3em] text-xs uppercase opacity-80">BaxishliMedia</h2>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-[#f05a28] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-1 h-1 bg-[#f05a28] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1 h-1 bg-[#f05a28] rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      ) : null}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}>
        {children}
      </div>
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};