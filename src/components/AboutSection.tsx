import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return [ref, isVisible] as const;
};

const AboutSection = () => {
  const [leftRef, leftInView] = useInView();
  const [rightRef, rightInView] = useInView();
  const { t } = useLanguage();
  
  // Parallax scrolling setup
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <section id="about" className="relative bg-white text-gray-900 px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32">
      <div className="max-w-7xl mx-auto py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Column */}
        <motion.div
          ref={leftRef}
          className={`bg-gray-50 rounded-lg p-8 shadow-2xl transform transition-all duration-700 ease-out
            ${leftInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ y: y1 }}
        >
          <h4 className="text-sm text-orange-500 font-semibold tracking-widest uppercase mb-2">
            {t('about.badge')}
          </h4>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6 max-w-[480px]">
            {t('about.title')}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed max-w-[480px]">
            {t('about.description')}
          </p>
          <ul className="space-y-4 max-w-[480px]">
            {[
              "Proven track record in multi-sector excellence – from healthcare to technology.",
              "Innovative solutions like Irucore and AI-powered services.",
              "Strong governance and compliance with Rwandan corporate laws.",
              "Skilled leadership team with expertise in diverse industries.",
              "Customer-focused approach ensuring satisfaction at every stage.",
            ].map((item, i) => (
              <li key={i} className="flex items-start text-base lg:text-lg">
                <Check className="h-6 w-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right Column */}
        <motion.div
          ref={rightRef}
          className={`flex flex-col gap-8 transform transition-all duration-700 ease-out delay-200
            ${rightInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ y: y2 }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img src="/Goal.jpg" alt="Business meeting" className="w-full h-auto" />
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img src="/Priority.jpg" alt="Business meeting" className="w-full h-auto" />
            </div>
          </div>

          <div className="space-y-4 max-w-[480px]">
            <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold leading-tight">
              {t('about.coreValues')}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              <span className="text-orange-500 text-xl font-bold">{t('about.innovation')} </span>
              {t('about.innovationDesc')}
            </p>
            <p className="text-gray-600 leading-relaxed">
              <span className="text-orange-500 text-xl font-bold">{t('about.quality')} </span>
              {t('about.qualityDesc')}
            </p>
            <p className="text-gray-600 leading-relaxed">
              <span className="text-orange-500 text-xl font-bold">{t('about.integrity')} </span>
              {t('about.integrityDesc')}
            </p>
            <p className="text-gray-600 leading-relaxed">
              <span className="text-orange-500 text-xl font-bold">{t('about.diversity')} </span>
              {t('about.diversityDesc')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
