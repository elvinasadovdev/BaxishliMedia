
import React, { useState, useEffect } from 'react';
import { Settings, X, Save, Download, Plus, Trash2, Image, Type, Link as LinkIcon, Edit3, Upload, Lock, ChevronRight } from 'lucide-react';
import { useCMS } from './CMSContext';
import { SiteData } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';

export const AdminPanel: React.FC = () => {
  const { data, updateData } = useCMS();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<keyof SiteData>('partners');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const ADMIN_PASSWORD = 'admin'; // You can change this password

  useEffect(() => {
    const auth = sessionStorage.getItem('cms-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsOpen(location.pathname === '/admin');
  }, [location.pathname]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('cms-auth', 'true');
      setError('');
    } else {
      setError('Yanlış şifrə!');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('cms-auth');
    closeAdmin();
  };

  const tabLabels: Record<string, string> = {
    partners: 'Partnyorlar',
    blog: 'Bloq',
    contact: 'Əlaqə'
  };

  // Inactivity timeout: 10 minutes
  useEffect(() => {
    if (!isAuthenticated || !isOpen) return;

    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleLogout();
        alert('Təhlükəsizlik üçün 10 saniyəlik hərəkətsizlikdən sonra sistemdən çıxış edildi.');
      }, 10 * 1000); // 10 seconds
    };

    // Listen for any user activity
    const activityEvents = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
    activityEvents.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer(); // Initial start

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      activityEvents.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [isAuthenticated, isOpen]);

  useEffect(() => {
    setIsOpen(location.pathname === '/admin');
  }, [location.pathname]);

  const handleSave = async () => {
    try {
      // Try to save data to Vercel API first
      const response = await fetch('/api/cms-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 503) {
        // KV not configured - fallback to localStorage
        console.warn('Vercel KV not configured, using localStorage:', result.message);
        localStorage.setItem('baxishlimedia-cms-data', JSON.stringify(data));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        alert('⚠️ Dəyişikliklər yalnız lokal olaraq yadda saxlanıldı.\n\nBütün istifadəçilər üçün yadda saxlamaq üçün Vercel KV quraşdırın:\n1. Vercel Dashboard-a gedin\n2. Storage → Create KV Database\n3. Layihənizə qoşun');
        return;
      }

      if (!response.ok) {
        throw new Error(result.error || 'Yadda saxlamaq mümkün olmadı');
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Save error:', error);
      // Fallback to localStorage
      localStorage.setItem('baxishlimedia-cms-data', JSON.stringify(data));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      alert('⚠️ Serverə qoşulmaq mümkün olmadı.\nDəyişikliklər yalnız bu cihazda yadda saxlanıldı.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (dataUrl: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const closeAdmin = () => {
    setIsOpen(false);
    navigate('/');
  };

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-500">
        <div className="bg-[#111] w-full max-w-md p-8 rounded-2xl shadow-2xl border border-neutral-800 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6">
            <Lock className="text-indigo-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Giriş Tələb Olunur</h2>
          <p className="text-gray-500 text-sm mb-8">CMS panelinə daxil olmaq üçün şifrəni daxil edin</p>

          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div className="relative">
              <input
                type="password"
                autoFocus
                className={`w-full bg-neutral-900 border ${error ? 'border-red-500' : 'border-neutral-800'} text-white px-4 py-3 rounded-xl focus:border-indigo-500 focus:outline-none transition-all text-center tracking-widest`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group"
            >
              Daxil ol
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <button
            onClick={closeAdmin}
            className="mt-6 text-gray-500 hover:text-white text-xs transition-colors"
          >
            Geri qayıt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#111] w-full max-w-6xl h-[90vh] rounded-xl shadow-2xl border border-neutral-800 flex flex-col overflow-hidden text-sm">

        {/* Header */}
        <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-[#0a0a0a]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-900/30 rounded-lg">
              <Settings className="text-indigo-400" size={20} />
            </div>
            <div>
              <h2 className="text-white font-bold tracking-wide">BaxishliMedia CMS</h2>
              <p className="text-xs text-gray-500">Real vaxt redaktoru</p>
            </div>
          </div>

          <div className="hidden md:block text-xs text-gray-600 font-medium italic">
            OğuzGroup tərəfindən yaradıldı
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="text-xs text-gray-500 hover:text-red-400 transition-colors px-3 py-1 border border-neutral-800 rounded-lg hover:border-red-900/50"
            >
              Çıxış
            </button>
            <button onClick={closeAdmin} className="text-gray-400 hover:text-white p-2">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 bg-[#0a0a0a] border-r border-neutral-800 flex flex-col overflow-y-auto">
            <div className="p-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Məzmun</div>
            {(['partners', 'blog', 'contact'] as Array<keyof SiteData>).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-3 text-left font-medium border-l-2 transition-colors ${activeTab === key ? 'bg-white/5 border-indigo-500 text-white' : 'border-transparent text-gray-400 hover:text-white'
                  }`}
              >
                {tabLabels[key]}
              </button>
            ))}
            <div className="mt-auto p-4 border-t border-neutral-800 space-y-2">
              <button onClick={handleSave} className="w-full py-2 bg-green-600 text-white rounded font-bold hover:bg-green-500 flex items-center justify-center gap-2 relative">
                <Save size={14} /> {saveSuccess ? 'Yadda saxlanıldı!' : 'Yadda saxla'}
              </button>
              {saveSuccess && (
                <>
                  <div className="text-xs text-green-400 text-center">✓ Dəyişikliklər uğurla yadda saxlanıldı</div>
                  <button onClick={closeAdmin} className="w-full py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-500 text-sm">
                    Bağla və Sayta bax
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 overflow-y-auto bg-[#111] p-6">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white uppercase border-b border-gray-800 pb-2">{tabLabels[activeTab]}</h3>

              {/* Special handling for Contact tab - show general fields */}
              {activeTab === 'contact' ? (
                <>
                  <div>
                    <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">Telefon nömrəsi</label>
                    <input
                      className="w-full bg-neutral-900 border border-neutral-800 text-white px-3 py-2 rounded focus:border-indigo-500 focus:outline-none"
                      value={data.general.contactPhone}
                      onChange={(e) => updateData({ ...data, general: { ...data.general, contactPhone: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">E-poçt</label>
                    <input
                      className="w-full bg-neutral-900 border border-neutral-800 text-white px-3 py-2 rounded focus:border-indigo-500 focus:outline-none"
                      value={data.general.contactEmail}
                      onChange={(e) => updateData({ ...data, general: { ...data.general, contactEmail: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">Ünvan</label>
                    <input
                      className="w-full bg-neutral-900 border border-neutral-800 text-white px-3 py-2 rounded focus:border-indigo-500 focus:outline-none"
                      value={data.general.address}
                      onChange={(e) => updateData({ ...data, general: { ...data.general, address: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">Formspree ID (E-poçt bildirişləri üçün)</label>
                    <input
                      className="w-full bg-neutral-900 border border-neutral-800 text-white px-3 py-2 rounded focus:border-indigo-500 focus:outline-none"
                      value={data.general.formspreeId}
                      onChange={(e) => updateData({ ...data, general: { ...data.general, formspreeId: e.target.value } })}
                    />
                    <p className="text-[10px] text-gray-600 mt-1 italic">Məsələn: mjvngvzy. Formspree-dən aldığınız ID-ni bura yazın.</p>
                  </div>
                </>
              ) : (
                // Regular handling for other tabs
                Object.entries(data[activeTab as keyof SiteData])
                  .filter(([field]) => {
                    // Hide brandLogos and heading from partners section
                    if (activeTab === 'partners' && (field === 'brandLogos' || field === 'heading')) {
                      return false;
                    }
                    // Hide heading and subtitle from blog section
                    if (activeTab === 'blog' && (field === 'heading' || field === 'subtitle')) {
                      return false;
                    }
                    return true;
                  })
                  .map(([fieldName, fieldData]) => {
                    // Handle Arrays (Lists of Services, Partners, Posts)
                    if (Array.isArray(fieldData)) {
                      return (
                        <div key={fieldName} className="space-y-2">
                          <div className="flex justify-between">
                            <label className="text-xs text-indigo-400 font-bold uppercase">{fieldName}</label>
                            <button className="text-xs bg-indigo-900/50 text-indigo-300 px-2 rounded hover:bg-indigo-900"
                              onClick={() => {
                                // Create blank item for partners, or duplicate for others
                                let newItem;
                                if (activeTab === 'partners' && fieldName === 'items') {
                                  newItem = { id: Date.now(), name: '', image: '', stats: '' };
                                } else if (activeTab === 'blog' && fieldName === 'posts') {
                                  newItem = {
                                    id: Date.now(),
                                    title: '',
                                    date: new Date().toISOString().split('T')[0],
                                    image: '',
                                    views: '0 dəfə oxunub',
                                    content: ''
                                  };
                                } else {
                                  newItem = fieldData.length > 0 ? { ...fieldData[0], id: Date.now() } : {};
                                }
                                const newArr = [...fieldData, newItem];
                                updateData({ ...data, [activeTab]: { ...(data[activeTab as keyof SiteData] as any), [fieldName]: newArr } });
                              }}
                            >+ Yeni əlavə et</button>
                          </div>

                          <div className="grid gap-4">
                            {fieldData.map((item: any, idx: number) => (
                              <div key={item.id || idx} className="bg-neutral-900 p-3 rounded border border-neutral-800 relative group">
                                {/* Delete Button */}
                                <button className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => {
                                    const newArr = fieldData.filter((_, i) => i !== idx);
                                    updateData({ ...data, [activeTab]: { ...(data[activeTab as keyof SiteData] as any), [fieldName]: newArr } });
                                  }}
                                ><Trash2 size={14} /></button>

                                {/* Edit Fields based on type */}
                                {typeof item === 'string' ? (
                                  <input
                                    className="w-full bg-black/50 border border-neutral-700 text-white px-2 py-1 rounded"
                                    value={item}
                                    onChange={(e) => {
                                      const newArr = [...fieldData];
                                      newArr[idx] = e.target.value;
                                      updateData({ ...data, [activeTab]: { ...(data[activeTab as keyof SiteData] as any), [fieldName]: newArr } });
                                    }}
                                  />
                                ) : (
                                  <div className={`grid ${activeTab === 'blog' ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                                    {(activeTab === 'blog'
                                      ? ['image', 'title', 'date', 'content']
                                      : Object.keys(item).filter(k => k !== 'id')
                                    ).map(k => {
                                      const label = k === 'content' ? 'MƏTN (BLOQ YAZISI)' : k;
                                      const val = item[k] || '';

                                      return (
                                        <div key={k} className={k === 'content' ? 'col-span-full mt-4' : ''}>
                                          <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">{label}</label>
                                          {k.includes('image') || k.includes('Image') ? (
                                            <div className="flex flex-col gap-2">
                                              <img src={val} className="w-24 h-24 rounded-lg object-cover bg-gray-800 border border-neutral-700" />
                                              <label className="flex items-center gap-2 px-3 py-2 bg-indigo-900/30 text-indigo-300 text-xs rounded-lg cursor-pointer hover:bg-indigo-900/50 transition-colors w-fit">
                                                <Upload size={14} />
                                                Şəkil yüklə
                                                <input
                                                  type="file"
                                                  accept="image/*"
                                                  className="hidden"
                                                  onChange={(e) => handleImageUpload(e, (dataUrl) => {
                                                    const newArr = [...fieldData];
                                                    newArr[idx] = { ...item, [k]: dataUrl };
                                                    updateData({ ...data, [activeTab]: { ...(data[activeTab as keyof SiteData] as any), [fieldName]: newArr } });
                                                  })}
                                                />
                                              </label>
                                            </div>
                                          ) : k === 'content' ? (
                                            <textarea
                                              rows={10}
                                              className="w-full bg-black/40 border border-neutral-800 text-white px-4 py-3 rounded-xl text-sm focus:border-indigo-500 focus:outline-none transition-colors resize-none"
                                              value={val}
                                              placeholder="Bloq məzmununu bura yazın..."
                                              onChange={(e) => {
                                                const newArr = [...fieldData];
                                                newArr[idx] = { ...item, [k]: e.target.value };
                                                updateData({ ...data, [activeTab]: { ...(data[activeTab as keyof SiteData] as any), [fieldName]: newArr } });
                                              }}
                                            />
                                          ) : (
                                            <input
                                              className="w-full bg-black/40 border border-neutral-800 text-white px-4 py-2 rounded-lg text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                                              value={val}
                                              onChange={(e) => {
                                                const newArr = [...fieldData];
                                                newArr[idx] = { ...item, [k]: e.target.value };
                                                updateData({ ...data, [activeTab]: { ...(data[activeTab as keyof SiteData] as any), [fieldName]: newArr } });
                                              }}
                                            />
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    // Simple Fields (Strings)
                    return (
                      <div key={fieldName}>
                        <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">{fieldName}</label>
                        {fieldName.toLowerCase().includes('image') ? (
                          <div className="flex gap-2">
                            <img src={fieldData as string} className="w-10 h-10 rounded object-cover bg-gray-800" />
                            <input
                              className="flex-1 bg-neutral-900 border border-neutral-800 text-white px-3 py-2 rounded focus:border-indigo-500 focus:outline-none"
                              value={fieldData as string}
                              onChange={(e) => updateData({ ...data, [activeTab]: { ...(data[activeTab as keyof SiteData] as any), [fieldName]: e.target.value } })}
                            />
                          </div>
                        ) : (
                          <input
                            className="w-full bg-neutral-900 border border-neutral-800 text-white px-3 py-2 rounded focus:border-indigo-500 focus:outline-none"
                            value={fieldData as string}
                            onChange={(e) => updateData({ ...data, [activeTab]: { ...(data[activeTab as keyof SiteData] as any), [fieldName]: e.target.value } })}
                          />
                        )}
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};