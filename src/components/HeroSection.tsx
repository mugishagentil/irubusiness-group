import { useState, useEffect } from 'react';
import { Play, ArrowRight, Sparkles, Zap, Target, Users, Globe } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ContactModal from './ContactModal';
import { useLanguage } from '@/contexts/LanguageContext';

export default function App() {
  return (
    // Removed bg-[#1b1c20] from here so no duplicated background layer behind navbar
    <div className="min-h-screen">
      <HeroSection />
    </div>
  );
}

// AnimatedText component
const AnimatedText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const typingSpeed = 100;
    const deletingSpeed = 80;
    const pauseTime = 1500;

    let timeout;
    let cursorInterval;

    const handleTyping = () => {
      if (!isDeleting) {
        if (displayedText.length < text.length) {
          timeout = setTimeout(() => {
            setDisplayedText(text.slice(0, displayedText.length + 1));
          }, typingSpeed);
        } else {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseTime);
        }
      } else {
        if (displayedText.length > 0) {
          timeout = setTimeout(() => {
            setDisplayedText(text.slice(0, displayedText.length - 1));
          }, deletingSpeed);
        } else {
          timeout = setTimeout(() => {
            setIsDeleting(false);
          }, pauseTime);
        }
      }
    };

    handleTyping();

    cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);

    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, [displayedText, isDeleting, text]);

  return (
    <>
      {displayedText}
      <span
        className={`inline-block w-2 h-8 -mb-2 ml-1 bg-yellow-400 align-text-bottom transition-opacity duration-300 ${
          cursorVisible ? 'opacity-100' : 'opacity-0'
        }`}
      ></span>
    </>
  );
};

const HeroSection = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { t } = useLanguage();
  
  // Parallax scrolling setup
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -150]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const y3 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  return (
    <section id="home" className="relative min-h-screen text-white overflow-hidden pt-0">
      {/* Background with Parallax Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 w-full h-[120%]"
        >
          <img
            src={`/Hero.jpg?v=${Date.now()}`}
            alt="City buildings and people"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(60%) blur(1px)' }}
            onError={(e) => {
              console.log('Image failed to load, trying fallback');
              e.currentTarget.src = '/Hero.png';
            }}
          />
        </motion.div>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30"
          style={{ opacity }}
        ></motion.div>
        </div>

      {/* Main Content - Centered with Parallax */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8"
        style={{ y: y2 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Pre-headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-4"
          >
            <span className="text-orange-400 text-lg font-medium tracking-wider uppercase">
              {t('hero.preHeadline')}
                </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
          >
            {t('hero.headline')}
            <br />
            <span className="text-orange-400">{t('hero.headlineAccent')}</span>
          </motion.h1>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-16 flex flex-col sm:flex-row gap-4 justify-center"
          >
                <button
                  onClick={() => setIsContactModalOpen(true)}
              className="group bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

              <a
                href="https://youtube.com/@irutv-2060?si=eOIiBW91MY16FBae"
                target="_blank"
                rel="noopener noreferrer"
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              {t('hero.watchChannel')}
            </a>
          </motion.div>

          {/* Translucent Glass-morphism Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex justify-center space-x-4 mb-16"
          >
            {[
              { label: t('hero.healthcare'), active: true, link: "/services" },
              { label: t('hero.technology'), active: false, link: "/projects" },
              { label: t('hero.logistics'), active: false, link: "/services" },
              { label: t('hero.creativeArts'), active: false, link: "/projects" },
              { label: t('hero.consulting'), active: false, link: "/contact" }
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                className={`px-6 py-3 rounded-lg backdrop-blur-md border transition-all duration-300 ${
                  item.active 
                    ? 'bg-white/20 border-white/30 text-white' 
                    : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/15'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-orange-400' : 'bg-white/60'}`}></div>
                  <span className="text-sm font-medium">{item.label}</span>
              </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>


      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
};
