import React from 'react';

export const AboutPage: React.FC = () => (
  <div className="max-w-3xl mx-auto bg-glass border border-glassBorder rounded-2xl p-8 md:p-12 animate-fade-in">
    <h1 className="text-3xl font-bold text-white mb-6">About IP Nexus</h1>
    <div className="space-y-4 text-gray-300 leading-relaxed">
      <p>
        IP Nexus is a next-generation diagnostic tool designed for network administrators, developers, and privacy-conscious individuals. 
        We strip away the clutter to provide you with raw, accurate data about your internet connection.
      </p>
      <p>
        Built with the latest web technologies, IP Nexus leverages the robust <strong className="text-neonBlue">ip-api.com</strong> infrastructure 
        to deliver detailed geolocation data including ISP, ASN, and organization details. 
      </p>
      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Our Integrations</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong className="text-white">IP Geolocation:</strong> Real-time lookup via ip-api.com.</li>
        <li><strong className="text-white">Weather Intelligence:</strong> Hyper-local forecasts powered by Open-Meteo API.</li>
        <li><strong className="text-white">Precision Timing:</strong> Accurate timezone synchronization inspired by Time.is standards.</li>
      </ul>
    </div>
  </div>
);

export const PrivacyPage: React.FC = () => (
  <div className="max-w-3xl mx-auto bg-glass border border-glassBorder rounded-2xl p-8 md:p-12 animate-fade-in">
    <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
    <div className="space-y-4 text-gray-300 leading-relaxed">
      <p>
        At IP Nexus, we believe in total transparency. We do not store, log, or share your search history or IP address.
      </p>
      
      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Data Handling</h2>
      <p>
        All queries are processed entirely client-side or sent directly to our third-party data providers (ip-api.com, open-meteo.com). 
        IP Nexus does not have a backend database that retains user logs.
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Third-Party Services</h2>
      <p>
        Please be aware that when you use this tool, your browser connects directly to:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>ip-api.com:</strong> To retrieve geolocation data. Please refer to their privacy policy.</li>
        <li><strong>open-meteo.com:</strong> To retrieve weather data based on coordinates.</li>
      </ul>
      
      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Cookies</h2>
      <p>
        We do not use tracking cookies. Local storage may be used strictly to remember your UI preferences (like theme), if applicable.
      </p>
    </div>
  </div>
);