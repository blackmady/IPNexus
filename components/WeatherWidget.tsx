import React from 'react';
import { WeatherResponse, SupportedLang } from '../types';
import { Cloud, Wind, Droplets, Sun, MapPin } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { t, getWeatherDesc } from '../services/translations';

interface WeatherWidgetProps {
  data: WeatherResponse | null;
  loading: boolean;
  lang: SupportedLang;
  location?: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ data, loading, lang, location }) => {
  const text = t(lang);

  if (loading) {
    return (
      <div className="h-64 bg-glass border border-glassBorder rounded-2xl animate-pulse flex items-center justify-center">
        <span className="text-gray-500">{text.loading}</span>
      </div>
    );
  }

  if (!data) return null;

  const { current_weather, hourly } = data;
  
  // Prepare chart data (next 24 hours)
  const chartData = hourly.time.slice(0, 24).map((t, i) => ({
    time: new Date(t).getHours() + ':00',
    temp: hourly.temperature_2m[i],
  }));

  const isDay = current_weather.is_day === 1;
  const weatherDesc = getWeatherDesc(current_weather.weathercode, lang);

  return (
    <div className="bg-glass border border-glassBorder rounded-2xl p-6 relative overflow-hidden flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 z-10">
            <div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wider font-semibold mb-1">{text.weather.title}</h3>
                
                {/* Location Display */}
                {location && (
                    <div className="flex items-center gap-1.5 text-neonBlue/80 text-xs font-medium mb-2 bg-neonBlue/10 py-1 px-2 rounded-md self-start inline-flex">
                        <MapPin size={12} />
                        <span className="truncate max-w-[150px]">{location}</span>
                    </div>
                )}

                <div className="flex items-center gap-2 mt-1">
                     <span className="text-3xl font-bold text-white">{current_weather.temperature}°C</span>
                     {isDay ? <Sun className="text-yellow-400" /> : <Cloud className="text-gray-400" />}
                </div>
                <div className="text-sm text-neonBlue mt-1 font-medium">{weatherDesc}</div>
            </div>
            <div className="flex flex-col gap-2 text-right">
                <div className="flex items-center justify-end gap-2 text-sm text-gray-300">
                    <Wind size={14} />
                    <span>{current_weather.windspeed} km/h</span>
                </div>
                <div className="flex items-center justify-end gap-2 text-sm text-gray-300">
                    <Droplets size={14} />
                    <span>{text.weather.humidity}</span>
                </div>
            </div>
        </div>

        {/* Chart */}
        <div className="flex-1 w-full min-h-[150px] z-10">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#bc13fe" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#bc13fe" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                        itemStyle={{ color: '#00f3ff' }}
                    />
                    <Area type="monotone" dataKey="temp" stroke="#bc13fe" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
        
        <div className="mt-2 text-center z-10">
             <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-gray-600 hover:text-gray-400">Weather data by Open-Meteo.com</a>
        </div>
    </div>
  );
};

export default WeatherWidget;