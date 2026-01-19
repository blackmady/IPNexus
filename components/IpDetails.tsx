import React from 'react';
import { IpApiResponse, SupportedLang } from '../types';
import { MapPin, Globe, Server, Shield, Network, Building } from 'lucide-react';
import { t } from '../services/translations';

interface IpDetailsProps {
  data: IpApiResponse;
  lang: SupportedLang;
}

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string | boolean | undefined; yes: string; no: string }> = ({ icon, label, value, yes, no }) => (
  <div className="flex flex-col p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
    <div className="flex items-center gap-2 mb-2 text-gray-400">
      {icon}
      <span className="text-xs uppercase tracking-wider font-semibold">{label}</span>
    </div>
    <div className="text-white font-medium truncate" title={String(value)}>
      {value === true ? yes : value === false ? no : value || 'N/A'}
    </div>
  </div>
);

const IpDetails: React.FC<IpDetailsProps> = ({ data, lang }) => {
  const text = t(lang).details;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <DetailItem icon={<Globe size={16} className="text-neonBlue" />} label={text.country} value={`${data.country} (${data.countryCode})`} yes={text.yes} no={text.no} />
      <DetailItem icon={<MapPin size={16} className="text-neonBlue" />} label={text.region} value={`${data.regionName} (${data.region})`} yes={text.yes} no={text.no} />
      <DetailItem icon={<MapPin size={16} className="text-neonBlue" />} label={text.city} value={`${data.city}, ${data.zip}`} yes={text.yes} no={text.no} />
      
      <DetailItem icon={<Network size={16} className="text-neonPurple" />} label={text.isp} value={data.isp} yes={text.yes} no={text.no} />
      <DetailItem icon={<Building size={16} className="text-neonPurple" />} label={text.org} value={data.org} yes={text.yes} no={text.no} />
      <DetailItem icon={<Server size={16} className="text-neonPurple" />} label={text.asn} value={data.as} yes={text.yes} no={text.no} />

      <DetailItem icon={<Shield size={16} className="text-green-400" />} label={text.mobile} value={data.mobile} yes={text.yes} no={text.no} />
      <DetailItem icon={<Shield size={16} className="text-green-400" />} label={text.proxy} value={data.proxy} yes={text.yes} no={text.no} />
      <DetailItem icon={<Shield size={16} className="text-green-400" />} label={text.hosting} value={data.hosting} yes={text.yes} no={text.no} />
    </div>
  );
};

export default IpDetails;