import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import ContactModal from './ContactModal';

// Main App component
export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="bg-[#1b1c20] min-h-screen p-8 flex items-center justify-center">
      <ConsultantSection setIsContactModalOpen={setIsContactModalOpen} />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}

// Donut Chart Component
const DonutChart = () => {
  const [percentages, setPercentages] = useState({ new: 0, comment: 0, like: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setPercentages({ new: 15, comment: 30, like: 55 });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const total = percentages.new + percentages.comment + percentages.like;
  const newStroke = (percentages.new / total) * 360;
  const commentStroke = (percentages.comment / total) * 360;
  const likeStroke = (percentages.like / total) * 360;

  return (
    <div className="relative w-40 h-40">
      <svg className="absolute top-0 left-0" width="100%" height="100%" viewBox="0 0 40 40">
        <circle className="text-[#2a2c34] stroke-current" strokeWidth="8" cx="20" cy="20" r="16" fill="transparent" />
        <circle className="text-yellow-400 stroke-current transition-all duration-1000 ease-in-out"
          strokeWidth="8" strokeDasharray={`${likeStroke} 1000`} cx="20" cy="20" r="16"
          fill="transparent" strokeLinecap="round" transform="rotate(-90 20 20)" />
        <circle className="text-gray-400 stroke-current transition-all duration-1000 ease-in-out"
          strokeWidth="8" strokeDasharray={`${commentStroke} 1000`} cx="20" cy="20" r="16"
          fill="transparent" strokeLinecap="round" transform={`rotate(${likeStroke - 90} 20 20)`} />
        <circle className="text-lime-500 stroke-current transition-all duration-1000 ease-in-out"
          strokeWidth="8" strokeDasharray={`${newStroke} 1000`} cx="20" cy="20" r="16"
          fill="transparent" strokeLinecap="round" transform={`rotate(${likeStroke + commentStroke - 90} 20 20)`} />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1b1c20] w-24 h-24 rounded-full"></div>
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ label, percentage }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-100">{label}</span>
        <span className="text-white font-bold">{progress}%</span>
      </div>
      <div className="w-full bg-[#2a2c34] rounded-full h-2">
        <div className="bg-yellow-400 h-2 rounded-full transition-all duration-1000 ease-in-out"
          style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

// Scroll-triggered wrapper
const ScrollReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

// Consultant Section
const ConsultantSection = ({ setIsContactModalOpen }) => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 bg-[#2a2c34] rounded-lg shadow-2xl">
      <div className="grid lg:grid-cols-2 gap-12">

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1b1c20] p-6 rounded-lg flex flex-col items-center justify-center md:items-start text-center md:text-left">
              <DonutChart />
              <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                  <span className="text-gray-100">Like</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
                  <span className="text-gray-100">Comment</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-lime-500 rounded-full mr-2"></span>
                  <span className="text-gray-100">New</span>
                </div>
              </div>
            </div>

            <ScrollReveal delay={0.2}>
              <div className="bg-[#1b1c20] p-6 rounded-lg text-center md:text-left flex flex-col justify-center">
                <p className="text-gray-100 mb-4">
                  To be a leading multi-sectoral enterprise in Africa, known for delivering innovative, sustainable, and high-quality products and services that transform communities and industries.
                </p>
                <p className="text-5xl font-extrabold text-white">Vision</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="bg-[#1b1c20] p-6 rounded-lg text-center md:text-left flex flex-col justify-center">
                <p className="text-gray-100 mb-4">
                  We drive progress by providing top-tier solutions across healthcare, technology, logistics, creative arts, and other strategic sectors, ensuring excellence, efficiency, and customer satisfaction.
                </p>
                <p className="text-5xl font-extrabold text-white">Mission</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div className="bg-[#1b1c20] p-6 rounded-lg flex flex-col justify-center">
                <ProgressBar label="Problem Solving" percentage={75} />
                <ProgressBar label="Adept Educator" percentage={85} />
                <ProgressBar label="Pragmatic" percentage={70} />
                <ProgressBar label="Networking" percentage={90} />
                <ProgressBar label="Learning Agility" percentage={80} />
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="space-y-6">
            <h4 className="text-sm text-yellow-400 font-semibold tracking-widest uppercase">
              Totally Committed
            </h4>
            <h2 className="text-4xl font-bold text-white leading-tight">
              How to find the best consultant?
            </h2>
            <p className="text-gray-100 leading-relaxed">
              Choose a partner with the vision to see opportunities where others see challenges, the integrity to uphold the highest ethical standards, and the expertise to deliver excellence across multiple sectors. IRU Business Group Ltd offers:
            </p>

            <ul className="space-y-4">
              {[
                "Strategic problem-solving tailored to your needs.",
                "In-depth industry knowledge for informed decision-making.",
                "Strong networking to connect you with the right opportunities.",
                "Agile learning to adapt to changing market demands.",
                "A customer-first mindset to ensure the best outcomes."
              ].map((point, i) => (
                <li key={i} className="flex items-start text-lg">
                  <ChevronRight className="h-6 w-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-100">{point}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setIsContactModalOpen(true)}
              className="flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 text-gray-900 font-bold py-3 px-6 rounded-md shadow-lg w-fit mt-6"
            >
              Get In Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </ScrollReveal>
      </div>

      <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-none z-10">
        <svg className="relative block w-full h-auto"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100"
          preserveAspectRatio="none">
          <path
            d="M1000,4.8V0c-166,0-333,31-500,31S166,0,0,0v4.8C150,17.2,333.5,37.5,500,37.5S850,17.2,1000,4.8z"
            fill="#1b1c20"
          ></path>
        </svg>
      </div>
    </section>
  );
};
