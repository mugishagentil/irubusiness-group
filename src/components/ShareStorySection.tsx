import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Globe, 
  Mic, 
  Lightbulb, 
  Video, 
  Users, 
  TrendingUp, 
  Award, 
  Rocket,
  Play,
  ExternalLink
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ShareStorySection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Globe className="h-8 w-8 text-orange-500" />,
      title: "Global Exposure",
      description: "Reach audiences worldwide on our popular YouTube channels."
    },
    {
      icon: <Mic className="h-8 w-8 text-orange-500" />,
      title: "Free Interview",
      description: "No cost – simply come and share your voice, we handle the rest."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-orange-500" />,
      title: "Inspire Others",
      description: "Your experience could motivate or transform someone's life."
    },
    {
      icon: <Video className="h-8 w-8 text-orange-500" />,
      title: "Professional Production",
      description: "Enjoy high-quality video/audio production handled by our team."
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Networking",
      description: "Connect with like-minded people, communities, and opportunities."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
      title: "Personal Branding",
      description: "Boost your personal or business brand by showcasing your story."
    },
    {
      icon: <Rocket className="h-8 w-8 text-orange-500" />,
      title: "Opportunity Growth",
      description: "Gain visibility that could open doors for collaborations, jobs, and partnerships."
    },
    {
      icon: <Award className="h-8 w-8 text-orange-500" />,
      title: "Recognition",
      description: "Be recognized as a voice of change, creativity, or inspiration in your community."
    }
  ];

  const channels = [
    {
      name: "IRU TV",
      description: "Stories, news, and voices that matter. Authentic and inspiring content.",
      url: "https://www.youtube.com/@irutv-2060?si=eOIiBW91MY16FBae",
      icon: "📺"
    },
    {
      name: "Frame & Tune Studio",
      description: "Where creativity meets entertainment. Music, art, and unique experiences.",
      url: "https://www.youtube.com/@frameandtunestudio",
      icon: "🎵"
    },
    {
      name: "Epishow TV",
      description: "Lifestyle, interviews, and talk shows designed to educate and entertain.",
      url: "https://www.youtube.com/@epishow-rwanda",
      icon: "🎙"
    },
    {
      name: "All About TV",
      description: "Everything trending – from testimonies to culture and community.",
      url: "https://www.youtube.com/@allabouttv-2060",
      icon: "🌟"
    }
  ];

  const handleApplyNow = () => {
    navigate("/interview-form");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-orange-500 text-white px-4 py-1 rounded-full mb-4 text-sm font-semibold">
            Share Your Voice
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Share Your Story with IRU Business Group
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Be featured on IRU TV, Frame & Tune Studio, Epishow TV, or All About TV 🎥
          </p>
          
          {/* Highlight Box */}
          <div className="bg-white/80 backdrop-blur-sm border-l-4 border-orange-500 p-6 rounded-lg max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              Everyone has a story worth telling – whether it's about <strong className="text-orange-600">life, entertainment, testimony, achievements, news, or challenges</strong>. 
              By sharing with IRU Business Group, your voice can inspire, entertain, and impact people across the globe.
            </p>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Benefits & Advantages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                    {benefit.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Channels Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Channels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {channels.map((channel, index) => (
              <motion.a
                key={index}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group-hover:border-orange-200">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4 text-2xl">
                      {channel.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {channel.name}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {channel.description}
                    </p>
                    <div className="flex items-center justify-center text-orange-500 text-sm font-medium group-hover:text-orange-600">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Channel
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Inspire the World?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Click below to apply and schedule your free interview session.
          </p>
          <Button
            onClick={handleApplyNow}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Apply for Interview
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ShareStorySection;
