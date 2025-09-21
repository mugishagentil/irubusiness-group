import { Button } from "@/components/ui/button";
import { FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";

const ServicesSection = () => {
  const componentStyles = `
    .gradient-text {
      background: linear-gradient(90deg, #8B5CF6, #EC4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  
    .card-hover:hover {
        transform: translateY(-8px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    }
  `;

  const services = [
    {
      icon: "🏥",
      title: "Healthcare Solutions",
      description: "Digital health platforms, telemedicine, and healthcare management systems tailored for modern medical practices."
    },
    {
      icon: "🤖",
      title: "AI & Technology",
      description: "Artificial intelligence solutions, machine learning applications, and cutting-edge technology implementations."
    },
    {
      icon: "📱",
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences."
    },
    {
      icon: "🌐",
      title: "Web Development",
      description: "Responsive web applications, e-commerce platforms, and custom web solutions for businesses of all sizes."
    },
    {
      icon: "📊",
      title: "Data Analytics",
      description: "Business intelligence, data visualization, and analytics solutions to drive informed decision-making."
    },
    {
      icon: "🎨",
      title: "Creative Services",
      description: "Professional photography, videography, graphic design, and multimedia content creation services."
    }
  ];

  return (
    <section
      className="py-20 text-gray-800"
      style={{ background: "linear-gradient(to bottom, #ffffff, #f0f0f0)" }}
    >
      <style>{componentStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Comprehensive solutions across healthcare, technology, and creative services to help your business thrive.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 card-hover border border-gray-200"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default ServicesSection;
