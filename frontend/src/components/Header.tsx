import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isTopBannerVisible, setIsTopBannerVisible] = useState(location.pathname === '/');
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // Only adjust for top banner on home page
      if (location.pathname === '/') {
        setIsTopBannerVisible(scrollTop < 100);
      } else {
        setIsTopBannerVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navigation = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.services'), href: "/services" },
    { name: t('nav.projects'), href: "/projects" },
    { name: t('nav.partnership'), href: "/partnership" },
    { name: t('nav.contact'), href: "/contact" },
    { name: "AI Ethics", href: "/ai-ethics" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed left-0 w-full z-50 transition-all duration-300 ${
      isTopBannerVisible ? 'top-8' : 'top-0'
    }`}>
      {/* Pure Black Background */}
      <div className="absolute inset-0 z-0 bg-black"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/IRU-Logo.jpg"
                alt="IRU Business Group Logo"
                className="h-10 w-auto"
              />
              <span className="ml-3 text-white font-bold text-xl">
                IRU Business Group
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-white hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href) ? "text-orange-400" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

      {/* Right side - CTA */}
      <div className="hidden lg:flex items-center space-x-4">
        <Button 
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          asChild
        >
          <Link to="/contact">{t('nav.getInTouch')}</Link>
        </Button>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden flex items-center space-x-2">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:text-orange-400 focus:outline-none focus:text-orange-400 p-2"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-orange-400 bg-gray-800"
                      : "text-white hover:text-orange-400 hover:bg-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  asChild
                >
                  <Link to="/contact">{t('nav.getInTouch')}</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </nav>
  );
};

export default Header;