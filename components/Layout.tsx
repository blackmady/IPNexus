import React from 'react';
import { ViewState, SupportedLang, LANGUAGES } from '../types';
import { Activity, Shield, Info, Home, Globe } from 'lucide-react';
import { t } from '../services/translations';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  lang: SupportedLang;
  onLangChange: (lang: SupportedLang) => void;
}

const NavButton: React.FC<{ 
    active: boolean; 
    onClick: () => void; 
    icon: React.ReactNode; 
    label: string 
}> = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-all duration-300 ${
            active 
            ? 'bg-neonBlue/20 text-neonBlue border border-neonBlue/30' 
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
    >
        {icon}
        <span className="hidden md:inline text-sm font-medium">{label}</span>
    </button>
);

const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView, lang, onLangChange }) => {
  const text = t(lang);

  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="py-6 flex flex-col gap-4 md:flex-row items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer self-start md:self-auto" onClick={() => onChangeView(ViewState.HOME)}>
            <div className="bg-gradient-to-br from-neonBlue to-neonPurple p-2 rounded-lg">
                <Activity className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">IP Nexus</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            {/* Navigation */}
            <nav className="flex items-center bg-black/30 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
                <NavButton 
                    active={currentView === ViewState.HOME} 
                    onClick={() => onChangeView(ViewState.HOME)} 
                    icon={<Home size={16} />} 
                    label={text.nav.home} 
                />
                <NavButton 
                    active={currentView === ViewState.ABOUT} 
                    onClick={() => onChangeView(ViewState.ABOUT)} 
                    icon={<Info size={16} />} 
                    label={text.nav.about} 
                />
                <NavButton 
                    active={currentView === ViewState.PRIVACY} 
                    onClick={() => onChangeView(ViewState.PRIVACY)} 
                    icon={<Shield size={16} />} 
                    label={text.nav.privacy} 
                />
            </nav>

            {/* Language Switcher */}
            <div className="relative group z-50">
                <button className="flex items-center gap-2 bg-black/30 border border-white/10 hover:bg-white/10 text-gray-300 px-3 py-2 rounded-lg transition-colors text-sm">
                    <Globe size={16} />
                    <span>{LANGUAGES.find(l => l.code === lang)?.flag}</span>
                    <span className="uppercase">{lang.split('-')[0]}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-40 bg-[#0f172a] border border-glassBorder rounded-xl shadow-xl overflow-hidden hidden group-hover:block animate-fade-in z-50">
                    {LANGUAGES.map((l) => (
                        <button
                            key={l.code}
                            onClick={() => onLangChange(l.code)}
                            className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-white/10 transition-colors ${lang === l.code ? 'text-neonBlue bg-white/5' : 'text-gray-400'}`}
                        >
                            <span>{l.flag}</span>
                            <span>{l.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5 mt-8">
        <p>© {new Date().getFullYear()} IP Nexus. Powered by ip-api.com, Open-Meteo & Time.is concepts.</p>
      </footer>
    </div>
  );
};

export default Layout;