import React, { useState } from 'react';
import { Search, Map } from 'lucide-react';
import { IpApiResponse, SupportedLang } from '../types';
import { t } from '../services/translations';

interface HeroIpProps {
  data: IpApiResponse | null;
  loading: boolean;
  onSearch: (ip: string) => void;
  lang: SupportedLang;
}

const HeroIp: React.FC<HeroIpProps> = ({ data, loading, onSearch, lang }) => {
  const [inputIp, setInputIp] = useState('');
  const text = t(lang);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputIp.trim()) {
      onSearch(inputIp.trim());
    }
  };

  return (
    <div className="relative w-full mb-8">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-neonBlue opacity-20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="flex flex-col items-center justify-center text-center z-10 relative">
        <h1 className="text-gray-400 text-sm md:text-base font-medium tracking-[0.2em] mb-4 uppercase">
            {text.hero.subtitle}
        </h1>
        
        {loading ? (
             <div className="h-20 w-64 md:w-96 bg-white/10 rounded-lg animate-pulse mb-6"></div>
        ) : (
            <div className="group relative">
                <h2 className="text-5xl md:text-7xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-neonBlue to-white mb-6 drop-shadow-lg select-all">
                {data?.query || '0.0.0.0'}
                </h2>
                <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neonBlue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
        )}

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
          <input
            type="text"
            value={inputIp}
            onChange={(e) => setInputIp(e.target.value)}
            placeholder={text.hero.placeholder}
            className="w-full bg-black/40 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-neonBlue/50 transition-colors backdrop-blur-sm placeholder-gray-600"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-neonBlue/20 text-white p-1.5 rounded-full transition-colors"
            title={text.hero.search}
          >
             <Map size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroIp;