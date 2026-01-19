import React, { useEffect, useState, useRef } from 'react';
import { Clock } from 'lucide-react';
import { SupportedLang } from '../types';
import { t } from '../services/translations';

interface TimeWidgetProps {
  timezone: string;
  lang: SupportedLang;
  lat: number;
  lon: number;
}

declare global {
  interface Window {
    time_is_widget: any;
  }
}

const TimeWidget: React.FC<TimeWidgetProps> = ({ timezone, lang, lat, lon }) => {
  const text = t(lang).time;
  
  // Generate a unique ID for this instance to prevent collisions during re-renders
  const [widgetId] = useState(() => `time_is_${Math.random().toString(36).substr(2, 9)}`);
  
  // Local fallback state
  const [fallbackTime, setFallbackTime] = useState<string>('--:--:--');
  const [fallbackDate, setFallbackDate] = useState<string>('');
  const [isWidgetActive, setIsWidgetActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Fallback clock (always runs, but hidden if widget works)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeFormatter = new Intl.DateTimeFormat(lang, {
            timeZone: timezone,
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        });
        const dateFormatter = new Intl.DateTimeFormat(lang, {
            timeZone: timezone,
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
        });
        setFallbackTime(timeFormatter.format(now));
        setFallbackDate(dateFormatter.format(now));
      } catch (e) {
        setFallbackTime('--:--:--');
      }
    };
    updateTime();
    intervalRef.current = window.setInterval(updateTime, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [timezone, lang]);

  // Time.is Widget Loader
  useEffect(() => {
    setIsWidgetActive(false);
    
    // Safety delay to ensure DOM is painted
    const timeoutId = setTimeout(() => {
        const scriptLang = lang === 'zh-CN' ? 'zh' : lang;
        const scriptUrl = `//widget.time.is/${scriptLang}.js`;
        
        // Clean coords to avoid server errors (4 decimal places max)
        const safeLat = Number(lat).toFixed(4);
        const safeLon = Number(lon).toFixed(4);

        const initWidget = () => {
            const element = document.getElementById(widgetId);
            if (window.time_is_widget && element) {
                try {
                    // Initialize widget
                    window.time_is_widget.init({
                        [widgetId]: {
                            template: '<div class="t-time">TIME</div><div class="t-date">DATE</div>',
                            time_format: 'hours:minutes:seconds',
                            date_format: 'dayname, monthname dnum, year',
                            coords: `${safeLat},${safeLon}`
                        }
                    });
                    
                    // Check if widget actually injected content after a short delay
                    setTimeout(() => {
                        const el = document.getElementById(widgetId);
                        // If element has content and isn't just empty, assume success
                        if (el && el.innerText.trim().length > 0) {
                            setIsWidgetActive(true);
                        }
                    }, 500);

                } catch (e) {
                    console.warn("TimeWidget init failed:", e);
                }
            }
        };

        let script = document.querySelector(`script[src="${scriptUrl}"]`) as HTMLScriptElement;
        
        if (script) {
            initWidget();
        } else {
            // Cleanup other languages
            document.querySelectorAll('script[src*="//widget.time.is/"]').forEach(s => {
                if (s.getAttribute('src') !== scriptUrl) s.remove();
            });

            script = document.createElement('script');
            script.src = scriptUrl;
            script.async = true;
            script.onload = initWidget;
            document.body.appendChild(script);
        }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [lang, lat, lon, widgetId]);

  return (
    <div className="h-full bg-glass border border-glassBorder rounded-2xl py-8 px-6 flex flex-col items-center justify-center relative overflow-hidden group hover:bg-white/10 transition-colors duration-300 min-h-[220px]">
      <div className="absolute -top-4 -right-4 p-8 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
        <Clock size={120} />
      </div>
      
      <div className="z-10 text-center relative w-full flex flex-col items-center">
        <h3 className="text-gray-400 text-xs md:text-sm uppercase tracking-[0.2em] mb-3 font-bold flex items-center justify-center gap-2">
            {text.title}
        </h3>
        
        {/* Container for content */}
        <div className="mb-4 min-h-[100px] flex flex-col items-center justify-center relative">
             {/* Time.is Widget Container */}
             <div 
                id={widgetId} 
                className={`transition-opacity duration-500 ${isWidgetActive ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'}`}
             ></div>

             {/* Fallback Container */}
             <div className={`transition-opacity duration-500 flex flex-col items-center ${!isWidgetActive ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'}`}>
                <div className="t-time tabular-nums">{fallbackTime}</div>
                <div className="t-date text-neonBlue/70">{fallbackDate}</div>
             </div>
        </div>
        
        <div className="w-full max-w-[200px] h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-4"></div>

        <div className="text-xs text-gray-400 flex flex-col gap-1 items-center">
           <div className="flex items-center gap-1">
             <span className="opacity-70">{text.timezone}:</span>
             <span className="text-gray-200 font-mono">{timezone}</span>
           </div>
           
           <a href="https://time.is" target="_blank" rel="nofollow noopener noreferrer" className="mt-2 text-[10px] text-gray-600 hover:text-neonBlue transition-colors flex items-center gap-1 border border-white/5 px-2 py-1 rounded-full bg-black/20">
              <span>Powered by Time.is</span>
           </a>
        </div>
      </div>
    </div>
  );
};

export default TimeWidget;