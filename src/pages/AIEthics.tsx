import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Search, 
  CheckCircle, 
  Shield, 
  Users, 
  AlertTriangle, 
  Lightbulb,
  BarChart3,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AIEthics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [acknowledgedSections, setAcknowledgedSections] = useState<Set<number>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const { t } = useLanguage();

  const sections = [
    {
      id: 1,
      title: "Core AI Ethical Principles",
      keywords: "human centric fairness accountability transparency privacy safety sustainability",
      content: [
        "Human-Centricity: AI augments human judgment; humans remain accountable.",
        "Fairness & Non-Discrimination: Avoid bias across gender, race, age, ability, culture, or socioeconomic background.",
        "Transparency & Explainability: AI decisions should be understandable and traceable.",
        "Privacy & Data Protection: Comply with GDPR, local laws, and internal data governance policies.",
        "Safety & Security: Systems must be robust, monitored, and protected from misuse or attacks.",
        "Accountability & Governance: Clear ownership and oversight by the AI Ethics Board.",
        "Sustainability: Consider environmental impact; energy-efficient and sustainable AI practices."
      ],
      icon: <Shield className="h-6 w-6" />
    },
    {
      id: 2,
      title: "Standards for AI Development & Deployment",
      keywords: "standards deployment datasets training bias sandbox monitoring user third-party compliance",
      content: [
        "Diverse and representative datasets.",
        "Bias impact assessments required for all AI models.",
        "AI sandbox environments for safe testing before production.",
        "Risk classification: Low, Medium, High; human override required for critical systems.",
        "Continuous monitoring for drift, errors, or bias after deployment.",
        "User rights: opt-out options and informed AI interaction.",
        "Third-party and open-source tools must pass ethics compliance review."
      ],
      icon: <BarChart3 className="h-6 w-6" />
    },
    {
      id: 3,
      title: "AI Governance & Oversight",
      keywords: "governance board audit risk compliance oversight",
      content: [
        "AI Ethics & Governance Board: multidisciplinary, approves high-impact AI projects.",
        "Risk framework: classifies AI systems from minimal to prohibited risk.",
        "Audit & Compliance: annual internal audit; independent external review every 2 years."
      ],
      icon: <Users className="h-6 w-6" />
    },
    {
      id: 4,
      title: "Internal Employee Guidelines",
      keywords: "employee training responsible reporting confidentiality",
      content: [
        "Use AI responsibly; no personal gain, manipulation, or unethical experiments.",
        "Confidentiality: protect sensitive company or client data from insecure AI platforms.",
        "Continuous learning: annual AI ethics training required.",
        "Reporting Misuse: anonymous whistleblowing channel available."
      ],
      icon: <Users className="h-6 w-6" />
    },
    {
      id: 5,
      title: "Prohibited AI Practices",
      keywords: "prohibited social scoring surveillance deepfakes manipulation harm",
      content: [
        "Social scoring of individuals.",
        "Unauthorized mass surveillance.",
        "Manipulation of vulnerable populations (children, elderly, disabled).",
        "Deceptive deepfakes or AI-generated misinformation.",
        "AI applications causing irreversible harm to humans or the environment."
      ],
      icon: <AlertTriangle className="h-6 w-6" />
    },
    {
      id: 6,
      title: "Future-Proofing & Innovation",
      keywords: "innovation labs global review policy future standards",
      content: [
        "Encourage ethical innovation labs to explore new AI applications.",
        "Participate in global AI ethics coalitions and standardization efforts.",
        "Policy review every 12 months to align with laws (e.g., EU AI Act) and emerging standards."
      ],
      icon: <Lightbulb className="h-6 w-6" />
    }
  ];

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.keywords.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const progressPercentage = Math.round((acknowledgedSections.size / sections.length) * 100);

  const toggleSection = (sectionId: number) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const acknowledgeSection = (sectionId: number) => {
    setAcknowledgedSections(prev => new Set(prev).add(sectionId));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-20 pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-orange-500 text-white px-4 py-1 rounded-full mb-4 text-sm font-semibold">
              Internal Portal
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              IRU AI Ethics Portal
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Internal AI Policies & Acknowledgment Tracking
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search and Progress */}
          <div className="mb-12">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 h-6 w-6" />
              <input
                type="text"
                placeholder="Search policies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white border-0 rounded-xl shadow-lg focus:ring-4 focus:ring-orange-100 focus:shadow-xl transition-all duration-300 text-gray-800 placeholder-gray-500"
              />
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-xl p-2 shadow-lg border-2 border-orange-100 mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-800 font-semibold text-lg">Progress</span>
                <span className="text-orange-600 font-bold text-lg">{progressPercentage}%</span>
              </div>
              <div className="bg-gray-200 rounded-lg h-8 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-8 rounded-lg text-white text-sm font-bold flex items-center justify-center transition-all duration-700 shadow-lg"
                  style={{ width: `${progressPercentage}%` }}
                >
                  {progressPercentage > 0 && `${progressPercentage}%`}
                </div>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {filteredSections.map((section, index) => (
              <motion.div
                key={section.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Section Header */}
                <div 
                  className="p-6 cursor-pointer flex justify-between items-center transition-colors"
                  style={{ background: "linear-gradient(to bottom, #ffffff, #f0f0f0)" }}
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-orange-500">{section.icon}</div>
                    <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
                  </div>
                  <div className="flex items-center space-x-3">
                    {acknowledgedSections.has(section.id) && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {expandedSections.has(section.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                </div>

                {/* Section Content */}
                {expandedSections.has(section.id) && (
                  <motion.div 
                    className="p-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ul className="space-y-3 mb-6">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-800 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      onClick={() => acknowledgeSection(section.id)}
                      disabled={acknowledgedSections.has(section.id)}
                      className={`${
                        acknowledgedSections.has(section.id)
                          ? 'bg-green-500 text-white cursor-not-allowed'
                          : 'bg-orange-500 hover:bg-orange-600 text-white'
                      }`}
                    >
                      {acknowledgedSections.has(section.id) ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Acknowledged
                        </>
                      ) : (
                        'Acknowledge'
                      )}
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Completion Message */}
          {progressPercentage === 100 && (
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-green-50 border border-green-200 rounded-xl p-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  Congratulations!
                </h3>
                <p className="text-green-800 text-lg">
                  You have successfully acknowledged all AI Ethics policies.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIEthics;
