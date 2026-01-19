import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HeroIp from './components/HeroIp';
import IpDetails from './components/IpDetails';
import WeatherWidget from './components/WeatherWidget';
import TimeWidget from './components/TimeWidget';
import MapWidget from './components/MapWidget';
import { AboutPage, PrivacyPage } from './components/StaticPages';
import { fetchIpData, fetchWeatherData } from './services/api';
import { IpApiResponse, WeatherResponse, ViewState, SupportedLang } from './types';
import { AlertTriangle } from 'lucide-react';
import { t } from './services/translations';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [lang, setLang] = useState<SupportedLang>('en');
  
  // Data State
  const [ipData, setIpData] = useState<IpApiResponse | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  
  // UI State
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Track the last searched IP so we can re-fetch when language changes
  const [lastSearchedIp, setLastSearchedIp] = useState<string>('');

  const loadData = async (queryIp: string = '') => {
    setLoading(true);
    setError(null);
    setLastSearchedIp(queryIp);

    try {
      const data = await fetchIpData(queryIp, lang);
      setIpData(data);

      // Fetch weather based on IP Lat/Lon
      if (data.lat && data.lon) {
        const weather = await fetchWeatherData(data.lat, data.lon);
        setWeatherData(weather);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reload data when language changes
  useEffect(() => {
    if (ipData) {
       loadData(lastSearchedIp); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const renderHome = () => (
    <div className="space-y-6 animate-fade-in-up">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-center gap-3 max-w-2xl mx-auto">
            <AlertTriangle size={24} />
            <div>
                <p className="font-bold">{t(lang).error}</p>
                <p className="text-sm">{error}</p>
                {window.location.protocol === 'https:' && (
                    <p className="text-xs mt-1 opacity-70">Note: Using ip-api.com (free) over HTTPS may cause mixed content errors.</p>
                )}
            </div>
        </div>
      )}

      <HeroIp 
        data={ipData} 
        loading={loading} 
        onSearch={loadData}
        lang={lang}
      />

      {ipData && !loading && (
        <div className="flex flex-col gap-6">
            {/* Row 1: Visual Context (Time & Weather) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 h-full">
                     <TimeWidget 
                        timezone={ipData.timezone} 
                        lang={lang} 
                        lat={ipData.lat} 
                        lon={ipData.lon}
                     />
                </div>
                <div className="lg:col-span-2 h-full">
                     <WeatherWidget 
                        data={weatherData} 
                        loading={loading} 
                        lang={lang} 
                        location={ipData.city || ipData.regionName}
                     />
                </div>
            </div>

            {/* Row 2: Core Data (IP Details) */}
            <div>
                 <IpDetails data={ipData} lang={lang} />
            </div>
            
            {/* Row 3: Map Visualization */}
            <div className="bg-glass border border-glassBorder rounded-2xl p-1 overflow-hidden h-64 md:h-96 relative group shadow-lg">
                <MapWidget 
                    lat={ipData.lat} 
                    lon={ipData.lon} 
                    label={ipData.city}
                    lang={lang}
                />
            </div>
        </div>
      )}
    </div>
  );

  return (
    <Layout 
        currentView={view} 
        onChangeView={setView} 
        lang={lang} 
        onLangChange={setLang}
    >
      {view === ViewState.HOME && renderHome()}
      {view === ViewState.ABOUT && <AboutPage />}
      {view === ViewState.PRIVACY && <PrivacyPage />}
    </Layout>
  );
};

export default App;