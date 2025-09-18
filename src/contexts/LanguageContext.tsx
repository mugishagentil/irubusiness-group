import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'rw' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys
const translations = {
  en: {
    // Top Banner
    'banner.email': 'info@irubusinessgroup.com',
    'banner.location': 'Kigali, Rwanda',
    'banner.phone': '+250 788 894 032',
    
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.partnership': 'Partnership',
    'nav.contact': 'Contact',
    'nav.getInTouch': 'Get in Touch',
    
    // Hero Section
    'hero.preHeadline': 'Multi-Sector Excellence',
    'hero.headline': 'Innovative Business',
    'hero.headlineAccent': 'Solutions',
    'hero.cta': 'Get Started Today',
    'hero.watchChannel': 'Watch Our Channel',
    'hero.healthcare': 'Healthcare',
    'hero.technology': 'Technology',
    'hero.logistics': 'Logistics',
    'hero.creativeArts': 'Creative Arts',
    'hero.consulting': 'Consulting',
    
    // About Section
    'about.badge': 'Key Benefits',
    'about.title': 'Why should choose us?',
    'about.description': 'At IRU Business Group Ltd, we believe our clients deserve more than just a service...',
    'about.coreValues': 'Core Values',
    'about.innovation': 'Innovation:',
    'about.innovationDesc': 'Leveraging creativity and technology to solve real-world problems.',
    'about.quality': 'Quality:',
    'about.qualityDesc': 'Committed to delivering superior products and services.',
    'about.integrity': 'Integrity:',
    'about.integrityDesc': 'Conducting business with transparency and accountability.',
    'about.diversity': 'Diversity:',
    'about.diversityDesc': 'Operating across multiple sectors to create holistic growth.',
    
    // Consultant Section
    'consultant.vision': 'Vision',
    'consultant.mission': 'Mission',
    'consultant.problemSolving': 'Problem Solving',
    'consultant.educator': 'Adept Educator',
    'consultant.pragmatic': 'Pragmatic',
    'consultant.networking': 'Networking',
    'consultant.learning': 'Learning Agility',
    
    // Team Section
    'team.badge': 'MEET OUR EXPERTS',
    'team.title': 'Our Team',
    'team.description': 'The brilliant minds behind Iru Business Group Ltd innovation and success. Each member brings unique expertise and passion to our mission.',
    
    // FAQ Section
    'faq.title': 'Frequently Asked Questions',
    'faq.description': 'Got questions? We\'ve got answers. Here are the most common questions our clients ask about our services and processes.',
    
    // News Subscription
    'news.title': 'Subscribe to Our',
    'news.newsletter': 'Newsletter',
    'news.description': 'Get the latest updates, news, and insights directly in your inbox. No spam, we promise.',
    'news.placeholder': 'Enter your email',
    'news.subscribe': 'Subscribe',
    'news.success': 'Thank you for subscribing! 🎉',
  },
  rw: {
    // Top Banner
    'banner.email': 'info@irubusinessgroup.com',
    'banner.location': 'Kigali, Rwanda',
    'banner.phone': '+250 788 894 032',
    
    // Navigation
    'nav.home': 'Urubanze',
    'nav.about': 'Ibyerekeye',
    'nav.services': 'Serivisi',
    'nav.projects': 'Proje',
    'nav.partnership': 'Ubufatanye',
    'nav.contact': 'Twandikire',
    'nav.getInTouch': 'Twandikire',
    
    // Hero Section
    'hero.preHeadline': 'Ubwiza Bw\'ibice Byinshi',
    'hero.headline': 'Ibyemezo By\'ubucuruzi',
    'hero.headlineAccent': 'Bishya',
    'hero.cta': 'Tangira Ubu',
    'hero.watchChannel': 'Reba Icyerekezo Cyacu',
    'hero.healthcare': 'Ubuzima',
    'hero.technology': 'Ikoranabuhanga',
    'hero.logistics': 'Ubwiyongere',
    'hero.creativeArts': 'Ubuhanzi',
    'hero.consulting': 'Ubujyanama',
    
    // About Section
    'about.badge': 'Akamaro Gakomeye',
    'about.title': 'Kuki dutangira?',
    'about.description': 'Mu Bwoko bwa IRU Business Group Ltd, twemera abakiriya bacu ko bakeneye byose kuruta serivisi...',
    'about.coreValues': 'Imigirire Yacu',
    'about.innovation': 'Ubwoba:',
    'about.innovationDesc': 'Gukoresha ubuhanga n\'ikoranabuhanga gukemura ibibazo by\'ukuri.',
    'about.quality': 'Ubwiza:',
    'about.qualityDesc': 'Twiyemeje gutanga ibyiza n\'ibikoresha byiza.',
    'about.integrity': 'Ubwoba:',
    'about.integrityDesc': 'Gukora ubucuruzi mu ruhare rw\'ubwoba n\'ubwoba.',
    'about.diversity': 'Ubwoba:',
    'about.diversityDesc': 'Gukora mu bice byinshi kugira ngo dukore ubukire bwose.',
    
    // Consultant Section
    'consultant.vision': 'Icyerekezo',
    'consultant.mission': 'Intego',
    'consultant.problemSolving': 'Gukemura Ibibazo',
    'consultant.educator': 'Umwarimu W\'ikirenga',
    'consultant.pragmatic': 'W\'ukuri',
    'consultant.networking': 'Gushyira Hamwe',
    'consultant.learning': 'Kwiga Vuba',
    
    // Team Section
    'team.badge': 'HASANGA ABANTU B\'IKIREnga',
    'team.title': 'Ikipe Yacu',
    'team.description': 'Imitekerereze y\'ikirenga y\'ubwoba bwa IRU Business Group Ltd n\'intsinzi. Buri muntu atanga ubuhanga n\'urukundo ku ntego yacu.',
    
    // FAQ Section
    'faq.title': 'Ibibazo By\'ikirenga Byabazwa',
    'faq.description': 'Ufite ibibazo? Tugira ibisubizo. Dore ibibazo by\'ikirenga abakiriya bacu babaza ku serivisi zacu n\'imikorere.',
    
    // News Subscription
    'news.title': 'Kwiyandikisha ku',
    'news.newsletter': 'Icyandikwa Cyacu',
    'news.description': 'Shakisha amakuru mashya, amakuru, n\'ibitekerezo mu masanduku yawe. Nta spam, twemera.',
    'news.placeholder': 'Injiza imeli yawe',
    'news.subscribe': 'Kwiyandikisha',
    'news.success': 'Murakoze kwiyandikisha! 🎉',
  },
  fr: {
    // Top Banner
    'banner.email': 'info@irubusinessgroup.com',
    'banner.location': 'Kigali, Rwanda',
    'banner.phone': '+250 788 894 032',
    
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.services': 'Services',
    'nav.projects': 'Projets',
    'nav.partnership': 'Partenariat',
    'nav.contact': 'Contact',
    'nav.getInTouch': 'Contactez-nous',
    
    // Hero Section
    'hero.preHeadline': 'Excellence Multi-Secteurs',
    'hero.headline': 'Solutions d\'Affaires',
    'hero.headlineAccent': 'Innovantes',
    'hero.cta': 'Commencez Aujourd\'hui',
    'hero.watchChannel': 'Regardez Notre Chaîne',
    'hero.healthcare': 'Santé',
    'hero.technology': 'Technologie',
    'hero.logistics': 'Logistique',
    'hero.creativeArts': 'Arts Créatifs',
    'hero.consulting': 'Conseil',
    
    // About Section
    'about.badge': 'Avantages Clés',
    'about.title': 'Pourquoi nous choisir?',
    'about.description': 'Chez IRU Business Group Ltd, nous croyons que nos clients méritent plus qu\'un simple service...',
    'about.coreValues': 'Valeurs Fondamentales',
    'about.innovation': 'Innovation:',
    'about.innovationDesc': 'Exploiter la créativité et la technologie pour résoudre des problèmes réels.',
    'about.quality': 'Qualité:',
    'about.qualityDesc': 'Engagés à fournir des produits et services supérieurs.',
    'about.integrity': 'Intégrité:',
    'about.integrityDesc': 'Conduire les affaires avec transparence et responsabilité.',
    'about.diversity': 'Diversité:',
    'about.diversityDesc': 'Opérer dans plusieurs secteurs pour créer une croissance holistique.',
    
    // Consultant Section
    'consultant.vision': 'Vision',
    'consultant.mission': 'Mission',
    'consultant.problemSolving': 'Résolution de Problèmes',
    'consultant.educator': 'Éducateur Compétent',
    'consultant.pragmatic': 'Pragmatique',
    'consultant.networking': 'Réseautage',
    'consultant.learning': 'Agilité d\'Apprentissage',
    
    // Team Section
    'team.badge': 'RENCONTREZ NOS EXPERTS',
    'team.title': 'Notre Équipe',
    'team.description': 'Les esprits brillants derrière l\'innovation et le succès d\'IRU Business Group Ltd. Chaque membre apporte une expertise unique et une passion à notre mission.',
    
    // FAQ Section
    'faq.title': 'Questions Fréquemment Posées',
    'faq.description': 'Des questions? Nous avons des réponses. Voici les questions les plus courantes que nos clients posent sur nos services et processus.',
    
    // News Subscription
    'news.title': 'Abonnez-vous à Notre',
    'news.newsletter': 'Newsletter',
    'news.description': 'Recevez les dernières mises à jour, nouvelles et insights directement dans votre boîte de réception. Pas de spam, nous le promettons.',
    'news.placeholder': 'Entrez votre email',
    'news.subscribe': 'S\'abonner',
    'news.success': 'Merci de vous être abonné! 🎉',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'rw', 'fr'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
