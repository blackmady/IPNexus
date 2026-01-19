import { SupportedLang } from '../types';

export const UI_TEXT = {
  en: {
    nav: { home: 'Home', about: 'About', privacy: 'Privacy' },
    hero: { subtitle: 'Start Your Lookup', placeholder: 'Enter IP address or domain...', search: 'Search' },
    details: { country: 'Country', region: 'Region', city: 'City', isp: 'ISP', org: 'Organization', asn: 'AS Number', mobile: 'Mobile', proxy: 'Proxy', hosting: 'Hosting', yes: 'Yes', no: 'No' },
    weather: { title: 'Local Weather', wind: 'Wind', humidity: 'Humidity' },
    time: { title: 'Local Time', timezone: 'Timezone', synced: 'Synced via Time.is standards' },
    loading: 'Loading...',
    error: 'Error loading data',
  },
  'zh-CN': {
    nav: { home: '首页', about: '关于', privacy: '隐私' },
    hero: { subtitle: '开始查询', placeholder: '输入 IP 地址或域名...', search: '搜索' },
    details: { country: '国家', region: '地区', city: '城市', isp: '运营商', org: '组织', asn: 'AS 编号', mobile: '移动网络', proxy: '代理', hosting: '机房托管', yes: '是', no: '否' },
    weather: { title: '当地天气', wind: '风速', humidity: '湿度' },
    time: { title: '当地时间', timezone: '时区', synced: '时间校准标准 Time.is' },
    loading: '加载中...',
    error: '加载数据出错',
  },
  es: {
    nav: { home: 'Inicio', about: 'Acerca de', privacy: 'Privacidad' },
    hero: { subtitle: 'Comenzar búsqueda', placeholder: 'Ingrese IP o dominio...', search: 'Buscar' },
    details: { country: 'País', region: 'Región', city: 'Ciudad', isp: 'ISP', org: 'Organización', asn: 'Número AS', mobile: 'Móvil', proxy: 'Proxy', hosting: 'Hosting', yes: 'Sí', no: 'No' },
    weather: { title: 'Clima local', wind: 'Viento', humidity: 'Humedad' },
    time: { title: 'Hora local', timezone: 'Zona horaria', synced: 'Sincronizado vía Time.is' },
    loading: 'Cargando...',
    error: 'Error cargando datos',
  },
  fr: {
    nav: { home: 'Accueil', about: 'À propos', privacy: 'Confidentialité' },
    hero: { subtitle: 'Commencer la recherche', placeholder: 'Entrez une adresse IP...', search: 'Chercher' },
    details: { country: 'Pays', region: 'Région', city: 'Ville', isp: 'FAI', org: 'Organisation', asn: 'Numéro AS', mobile: 'Mobile', proxy: 'Proxy', hosting: 'Hébergement', yes: 'Oui', no: 'Non' },
    weather: { title: 'Météo locale', wind: 'Vent', humidity: 'Humidité' },
    time: { title: 'Heure locale', timezone: 'Fuseau horaire', synced: 'Synchronisé via Time.is' },
    loading: 'Chargement...',
    error: 'Erreur de chargement',
  },
  de: {
    nav: { home: 'Start', about: 'Über uns', privacy: 'Datenschutz' },
    hero: { subtitle: 'Suche starten', placeholder: 'IP-Adresse eingeben...', search: 'Suchen' },
    details: { country: 'Land', region: 'Region', city: 'Stadt', isp: 'ISP', org: 'Organisation', asn: 'AS-Nummer', mobile: 'Mobil', proxy: 'Proxy', hosting: 'Hosting', yes: 'Ja', no: 'Nein' },
    weather: { title: 'Lokales Wetter', wind: 'Wind', humidity: 'Feuchtigkeit' },
    time: { title: 'Ortszeit', timezone: 'Zeitzone', synced: 'Synchronisiert über Time.is' },
    loading: 'Laden...',
    error: 'Fehler beim Laden',
  },
  ja: {
    nav: { home: 'ホーム', about: '概要', privacy: 'プライバシー' },
    hero: { subtitle: '検索を開始', placeholder: 'IPアドレスを入力...', search: '検索' },
    details: { country: '国', region: '地域', city: '都市', isp: 'プロバイダ', org: '組織', asn: 'AS番号', mobile: 'モバイル', proxy: 'プロキシ', hosting: 'ホスティング', yes: 'はい', no: 'いいえ' },
    weather: { title: '現地の天気', wind: '風速', humidity: '湿度' },
    time: { title: '現地時間', timezone: 'タイムゾーン', synced: 'Time.is基準で同期' },
    loading: '読み込み中...',
    error: 'データ読み込みエラー',
  },
  ru: {
    nav: { home: 'Главная', about: 'О нас', privacy: 'Конфиденциальность' },
    hero: { subtitle: 'Начать поиск', placeholder: 'Введите IP адрес...', search: 'Поиск' },
    details: { country: 'Страна', region: 'Регион', city: 'Город', isp: 'Провайдер', org: 'Организация', asn: 'AS номер', mobile: 'Мобильный', proxy: 'Прокси', hosting: 'Хостинг', yes: 'Да', no: 'Нет' },
    weather: { title: 'Погода', wind: 'Ветер', humidity: 'Влажность' },
    time: { title: 'Местное время', timezone: 'Часовой пояс', synced: 'Синхронизировано с Time.is' },
    loading: 'Загрузка...',
    error: 'Ошибка загрузки',
  },
};

// Simple WMO Weather Code translation map
export const getWeatherDesc = (code: number, lang: SupportedLang): string => {
  const map: Record<number, Record<string, string>> = {
    0: { en: 'Clear sky', 'zh-CN': '晴朗', es: 'Cielo despejado', fr: 'Ciel dégagé', de: 'Klarer Himmel', ja: '快晴', ru: 'Ясно' },
    1: { en: 'Mainly clear', 'zh-CN': '多云', es: 'Mayormente despejado', fr: 'Partiellement nuageux', de: 'Überwiegend klar', ja: '晴れ', ru: 'Преимущественно ясно' },
    2: { en: 'Partly cloudy', 'zh-CN': '阴', es: 'Parcialmente nublado', fr: 'Nuageux', de: 'Teilweise bewölkt', ja: '薄曇り', ru: 'Переменная облачность' },
    3: { en: 'Overcast', 'zh-CN': '阴天', es: 'Nublado', fr: 'Couvert', de: 'Bedeckt', ja: '曇り', ru: 'Пасмурно' },
    45: { en: 'Fog', 'zh-CN': '雾', es: 'Niebla', fr: 'Brouillard', de: 'Nebel', ja: '霧', ru: 'Туман' },
    48: { en: 'Depositing rime fog', 'zh-CN': '雾凇', es: 'Niebla de escarcha', fr: 'Brouillard givrant', de: 'Nebel mit Reif', ja: '霧氷', ru: 'Изморозь' },
    // Default fallback for rain/snow codes generically
    51: { en: 'Drizzle', 'zh-CN': '毛毛雨', es: 'Llovizna', fr: 'Bruine', de: 'Nieselregen', ja: '霧雨', ru: 'Морось' },
    61: { en: 'Rain', 'zh-CN': '雨', es: 'Lluvia', fr: 'Pluie', de: 'Regen', ja: '雨', ru: 'Дождь' },
    71: { en: 'Snow', 'zh-CN': '雪', es: 'Nieve', fr: 'Neige', de: 'Schnee', ja: '雪', ru: 'Снег' },
    95: { en: 'Thunderstorm', 'zh-CN': '雷暴', es: 'Tormenta', fr: 'Orage', de: 'Gewitter', ja: '雷雨', ru: 'Гроза' },
  };

  // Find exact match or find closest generic bucket or fallback to English
  if (map[code]) return map[code][lang] || map[code]['en'];
  if (code >= 50 && code <= 67) return map[61][lang] || 'Rain';
  if (code >= 70 && code <= 77) return map[71][lang] || 'Snow';
  if (code >= 95) return map[95][lang] || 'Thunderstorm';
  
  return 'Unknown';
};

export const t = (lang: SupportedLang) => UI_TEXT[lang];