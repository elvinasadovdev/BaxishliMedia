
import React, { useState, useEffect } from 'react';
import { Settings, X, Save, Download, Plus, Trash2, Image, Type, Link as LinkIcon, Edit3 } from 'lucide-react';
import { useCMS } from './CMSContext';
import { SiteData } from '../types';

export const AdminPanel: React.FC = () => {
  const { data, updateData } = useCMS();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof SiteData | 'export'>('hero');

  useEffect(() => {
    const checkHash = () => {
      setIsOpen(window.location.hash === '#admin');
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleExport = () => {
    const jsonData = JSON.stringify(data, null, 2);
    const htmlContent = document.documentElement.outerHTML;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const scriptTag = doc.getElementById('site-data');
    if (scriptTag) scriptTag.textContent = jsonData;
    else {
      const newScript = doc.createElement('script');
      newScript.id = 'site-data';
      newScript.type = 'application/json';
      newScript.textContent = jsonData;
      doc.head.appendChild(newScript);
    }
    const root = doc.getElementById('root');
    if (root) root.innerHTML = '';
    const blob = new Blob([doc.documentElement.outerHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const closeAdmin = () => {
    setIsOpen(false);
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  if (!isOpen) return null;

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
               <p className="text-xs text-gray-500">Real-time Editor</p>
             </div>
          </div>
          <button onClick={closeAdmin} className="text-gray-400 hover:text-white p-2">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 bg-[#0a0a0a] border-r border-neutral-800 flex flex-col overflow-y-auto">
            <div className="p-4 text-xs font-bold text-gray-600 uppercase tracking-widest">Content</div>
            {(Object.keys(data) as Array<keyof SiteData>).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-3 text-left font-medium border-l-2 transition-colors ${
                  activeTab === key ? 'bg-white/5 border-indigo-500 text-white' : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
            <div className="mt-auto p-4 border-t border-neutral-800">
                <button onClick={() => setActiveTab('export')} className="w-full py-2 bg-green-600 text-white rounded font-bold hover:bg-green-500 flex items-center justify-center gap-2">
                    <Save size={14}/> Save Site
                </button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 overflow-y-auto bg-[#111] p-6">
            {activeTab === 'export' ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <Download size={48} className="text-gray-500"/>
                    <button onClick={handleExport} className="px-6 py-3 bg-white text-black font-bold rounded hover:bg-gray-200">
                        Download Updated index.html
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white uppercase border-b border-gray-800 pb-2">{activeTab}</h3>
                    
                    {Object.entries(data[activeTab as keyof SiteData]).map(([field, value]) => {
                        // Handle Arrays (Lists of Services, Partners, Posts)
                        if (Array.isArray(value)) {
                            return (
                                <div key={field} className="space-y-2">
                                    <div className="flex justify-between">
                                        <label className="text-xs text-indigo-400 font-bold uppercase">{field}</label>
                                        <button className="text-xs bg-indigo-900/50 text-indigo-300 px-2 rounded hover:bg-indigo-900" 
                                            onClick={() => {
                                                // Simplified add logic - duplicates last item or creates empty
                                                const newItem = value.length > 0 ? {...value[0], id: Date.now()} : {};
                                                const newArr = [...value, newItem];
                                                updateData({...data, [activeTab]: {...(data[activeTab as keyof SiteData] as any), [field]: newArr}});
                                            }}
                                        >+ Add Item</button>
                                    </div>
                                    
                                    <div className="grid gap-4">
                                        {value.map((item: any, idx: number) => (
                                            <div key={idx} className="bg-neutral-900 p-3 rounded border border-neutral-800 relative group">
                                                {/* Delete Button */}
                                                <button className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => {
                                                        const newArr = value.filter((_, i) => i !== idx);
                                                        updateData({...data, [activeTab]: {...(data[activeTab as keyof SiteData] as any), [field]: newArr}});
                                                    }}
                                                ><Trash2 size={14}/></button>

                                                {/* Edit Fields based on type */}
                                                {typeof item === 'string' ? (
                                                     <input 
                                                        className="w-full bg-black/50 border border-neutral-700 text-white px-2 py-1 rounded"
                                                        value={item}
                                                        onChange={(e) => {
                                                            const newArr = [...value];
                                                            newArr[idx] = e.target.value;
                                                            updateData({...data, [activeTab]: {...(data[activeTab as keyof SiteData] as any), [field]: newArr}});
                                                        }}
                                                     />
                                                ) : (
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {Object.keys(item).filter(k => k !== 'id').map(k => (
                                                            <div key={k}>
                                                                <label className="text-[10px] text-gray-500 uppercase">{k}</label>
                                                                {k.includes('image') || k.includes('Image') ? (
                                                                     <div className="flex gap-2">
                                                                         <img src={item[k]} className="w-8 h-8 rounded object-cover bg-gray-800"/>
                                                                         <input 
                                                                            className="flex-1 bg-black/50 border border-neutral-700 text-white px-2 py-1 rounded text-xs"
                                                                            value={item[k]}
                                                                            onChange={(e) => {
                                                                                const newArr = [...value];
                                                                                newArr[idx] = {...item, [k]: e.target.value};
                                                                                updateData({...data, [activeTab]: {...(data[activeTab as keyof SiteData] as any), [field]: newArr}});
                                                                            }}
                                                                         />
                                                                     </div>
                                                                ) : (
                                                                    <input 
                                                                        className="w-full bg-black/50 border border-neutral-700 text-white px-2 py-1 rounded text-xs"
                                                                        value={item[k]}
                                                                        onChange={(e) => {
                                                                            const newArr = [...value];
                                                                            newArr[idx] = {...item, [k]: e.target.value};
                                                                            updateData({...data, [activeTab]: {...(data[activeTab as keyof SiteData] as any), [field]: newArr}});
                                                                        }}
                                                                    />
                                                                )}
                                                            </div>
                                                        ))}
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
                            <div key={field}>
                                <label className="text-xs text-gray-500 font-bold uppercase mb-1 block">{field}</label>
                                {field.toLowerCase().includes('image') ? (
                                    <div className="flex gap-2">
                                        <img src={value as string} className="w-10 h-10 rounded object-cover bg-gray-800"/>
                                        <input 
                                            className="flex-1 bg-neutral-900 border border-neutral-800 text-white px-3 py-2 rounded focus:border-indigo-500 focus:outline-none"
                                            value={value as string}
                                            onChange={(e) => updateData({...data, [activeTab]: {...(data[activeTab as keyof SiteData] as any), [field]: e.target.value}})}
                                        />
                                    </div>
                                ) : (
                                    <input 
                                        className="w-full bg-neutral-900 border border-neutral-800 text-white px-3 py-2 rounded focus:border-indigo-500 focus:outline-none"
                                        value={value as string}
                                        onChange={(e) => updateData({...data, [activeTab]: {...(data[activeTab as keyof SiteData] as any), [field]: e.target.value}})}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};