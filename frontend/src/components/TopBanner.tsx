import { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop < 100); // Hide after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-40 text-white py-2 transition-transform duration-300">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={`/Hero.jpg?v=${Date.now()}`}
          alt="City buildings and people"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(80%) blur(0.5px)' }}
          onError={(e) => {
            console.log('Banner image failed to load, trying fallback');
            e.currentTarget.src = '/Hero.png';
          }}
        />
        <div className="absolute inset-0 bg-white/10"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          {/* Left side - Contact info */}
          <div className="flex flex-wrap items-center space-x-6 mb-2 sm:mb-0">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-orange-400" />
              <span>{t('banner.email')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>{t('banner.location')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-orange-400" />
              <span>{t('banner.phone')}</span>
            </div>
          </div>
          
          {/* Right side - Language selector */}
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-orange-400" />
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as 'en' | 'rw' | 'fr')}
              className="bg-transparent text-white border-none outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="rw">Kinyarwanda</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
