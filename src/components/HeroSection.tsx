import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import ContactModal from './ContactModal';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <section id="home" className="relative min-h-screen pt-10 text-white">
      {/* Responsive Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#1b1c20] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="flex items-center">
                <img
                  src="/IRU-Logo.jpg"
                  alt="Irucore Logo"
                  className="h-[60px] w-auto"
                />
              </a>
              <span className="ml-5 text-white font-bold text-xl">
                IRU BUSINESS{' '}
                <span className="block text-sm font-normal text-gray-400">
                  GROUP LTD
                </span>
              </span>
            </div>

            {/* Hamburger Icon - visible below lg */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Desktop Nav Links - visible lg and above */}
            <div className="hidden lg:flex space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer font-bold"
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer font-bold"
              >
                ABOUT
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer font-bold"
              >
                PROJECTS
              </button>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer font-bold"
              >
                CONTACT US
              </button>
            </div>

            {/* CTA on desktop - visible lg and above */}
            <div className="hidden lg:flex items-center">
              <div className="text-white text-sm text-right">
                <p>Call us now</p>
                <p className="font-bold text-yellow-400">+250 788 894 032</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu - visible below lg */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#1b1c20] px-4 pb-4 pt-2 space-y-2 shadow-lg">
            <button
              onClick={() => scrollToSection('home')}
              className="block text-gray-300 hover:text-white transition w-full text-left"
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block text-gray-300 hover:text-white transition w-full text-left"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="block text-gray-300 hover:text-white transition w-full text-left"
            >
              PROJECTS
            </button>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="block text-gray-300 hover:text-white transition w-full text-left"
            >
              CONTACT US
            </button>
            <div className="pt-2 border-t border-gray-700">
              <p className="text-sm text-white">Call us now</p>
              <p className="text-sm font-bold text-yellow-400">+250 788 894 032</p>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Kigali.png"
            alt="City buildings and people"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(30%)' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32 pb-32 pt-32 md:pt-0 text-white">
          <div className="grid lg:grid-cols-2 gap-12 pt-1 lg:pt-32 items-center">

            {/* Left */}
            <div className="space-y-4 mb-20 max-w-lg">
              <div className="space-y-2">
                <span className="text-yellow-400 text-lg font-semibold tracking-widest">
                  IRU BUSINESS GROUP LTD
                </span>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-extrabold leading-tight max-w-[28rem]">
                  Innovative Solutions,
                  <span className="block">Exceptional Results</span>
                  <span className="text-yellow-400 block">
                    <AnimatedText text="reputitative" />
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-[28rem]">
                  IRU Business Group Ltd is a dynamic multi-sector enterprise in Rwanda, delivering excellence across healthcare, technology, logistics, creative arts, and more. We combine innovation, quality, and customer focus to transform industries and empower communities.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="flex items-center justify-center bg-yellow-600 hover:bg-black transition-colors duration-200 text-white font-bold py-3 px-6 rounded-md shadow-lg">
                  Contact Us - It's Free
                  {/*<span className="ml-2">&gt;</span>*/}
                </button>

              <a
                href="https://youtube.com/@irutv-2060?si=eOIiBW91MY16FBae"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <button className="flex items-center justify-center bg-white text-gray-800 font-bold py-3 px-6 rounded-md shadow-lg border border-gray-300 hover:bg-gray-100 transition-colors duration-200">
                  <Play className="mr-2 h-4 w-4 fill-current text-yellow-600" />
                  Learn More
                </button>
              </a>
              
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:block relative text-right self-end">
              <img
                src="/Hero.png"
                alt="Two consultants"
                className="w-full h-auto max-w-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
};
