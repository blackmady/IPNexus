import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { SupportedLang } from '../types';

interface MapWidgetProps {
  lat: number;
  lon: number;
  label?: string;
  lang: SupportedLang;
}

const MapWidget: React.FC<MapWidgetProps> = ({ lat, lon, label, lang }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create Map
      const map = L.map(mapContainerRef.current, {
        center: [lat, lon],
        zoom: 13,
        zoomControl: false,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      // Add CartoDB Dark Matter Tiles (Fits the theme perfectly)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      // Add Custom Zoom Control to bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Create Custom Neon Icon
      // We use standard Tailwind classes. The CDN observes the DOM, so injected HTML works.
      const customIcon = L.divIcon({
        className: 'custom-map-marker', // wrapper class, styling handled by innerHTML
        html: `
          <div class="relative flex items-center justify-center w-8 h-8 -translate-x-1/2 -translate-y-1/2">
             <div class="absolute w-full h-full bg-[#00f3ff] opacity-40 rounded-full animate-ping"></div>
             <div class="relative w-3 h-3 bg-[#00f3ff] border-2 border-white rounded-full shadow-[0_0_15px_#00f3ff]"></div>
          </div>
        `,
        iconSize: [0, 0], // We handle size in CSS/HTML
        iconAnchor: [0, 0] // Centered via translate in HTML
      });

      // Add Marker
      const marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);
      markerRef.current = marker;

      // Add Popup if label exists
      if (label) {
        marker.bindPopup(
            `<div style="color: #0f172a; font-family: sans-serif; font-weight: bold;">${label}</div>`, 
            { closeButton: false, offset: [0, -10] }
        );
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // Update View when lat/lon changes
  useEffect(() => {
    if (mapInstanceRef.current) {
        mapInstanceRef.current.setView([lat, lon], 13);
        
        if (markerRef.current) {
            markerRef.current.setLatLng([lat, lon]);
            if (label) {
                 markerRef.current.setPopupContent(
                    `<div style="color: #0f172a; font-family: sans-serif; font-weight: bold;">${label}</div>`
                 );
            }
        }
    }
  }, [lat, lon, label]);

  return (
    <div className="w-full h-full relative z-0">
        <div ref={mapContainerRef} className="w-full h-full bg-[#1a1a1a]" />
        
        {/* Overlay info box */}
        <div className="absolute bottom-6 left-6 z-[400] bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg text-xs md:text-sm text-gray-300 font-mono shadow-xl flex items-center gap-3 pointer-events-none">
            <span className="text-neonBlue">●</span>
            <span>LAT: {lat.toFixed(4)}</span>
            <span className="text-gray-600">|</span>
            <span>LON: {lon.toFixed(4)}</span>
        </div>
    </div>
  );
};

export default MapWidget;