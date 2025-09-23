import { Button } from "@/components/ui/button";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube,
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  ChevronUp
} from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    Services: [
      "Healthcare Solutions",
      "Technology",
      "Photography",
      "Videography",
      "Digital Strategy",
    ],
    Company: ["Home", "About", "Projects", "Contact"],
    Projects: [
      "Irucore",
      "Irucare",
      "Frame and Tune Studio",
      "Youtube",
      "Social Media",
    ],
  };

  const socialLinks = [
    {
      icon: Twitter,
      href: "https://x.com/IRUBUSINESSES?t=QHreTJ4D1GtZfix4tQIpyw&s=09",
      label: "Twitter",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/iru-business-group-571ba3334?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/irubusinessgroup?igsh=Y2s1N25qY2xzM2Zu",
      label: "Instagram",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@irutv-2060",
      label: "Youtube",
    },
  ];

  return (
    <footer className="bg-[#1b1c20] border-t border-border text-[#ebedeb]">
      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-20">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            {/*<h3 className="text-2xl sm:text-3xl font-bold gradient-text max-w-[280px] leading-tight">*/}
            {/*  IRU BUSINESS GROUP*/}
            {/*</h3>*/}
              <img
                src="/IRU-Logo.jpg"
                alt="Irucore Logo"
                className="h-[90px] w-auto"
              />
            <p className="text-sm sm:text-base leading-relaxed max-w-md">
              Providing businesses across Rwanda and Africa with innovative
              solutions, strategic consulting, and cutting-edge technology to
              drive sustainable growth.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                <span>+250 788 894 032</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                <span>irubusinessgroup@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                <span>Gahanga, Kicukiro, Kigali, Rwanda</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center 
                               text-yellow-600 hover:bg-yellow-500 hover:text-white transition-all duration-300
                               hover:scale-110"
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-10">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-lg sm:text-xl font-semibold text-yellow-500 mb-6">
                  {category}
                </h4>
                <ul className="space-y-3 text-sm sm:text-base">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="hover:text-yellow-500 transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border bg-black">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-xs sm:text-sm text-gray-400 text-center md:text-left">
              <p>© {year} IRU BUSINESS GROUP Ltd. All rights reserved.</p>
            </div>

            {/* Language & Back to Top */}
            <div className="flex items-center space-x-6 text-xs sm:text-sm">
              <select className="text-sm bg-transparent border-none outline-none cursor-pointer text-gray-400">
                <option>English</option>
                <option>Kinyarwanda</option>
                <option>French</option>
              </select>

              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="text-white bg-yellow-700"
              >
                <ChevronUp className="h-5 w-5 mr-2" />
                Back to Top
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
