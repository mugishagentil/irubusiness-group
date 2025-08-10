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

  return (
    <div
      className="min-h-screen text-gray-800"
      style={{ background: "linear-gradient(to bottom, #ffffff, #f0f0f0)" }}
    >
      <style>{componentStyles}</style>
      <ProjectsSection />
    </div>
  );
};

const ProjectsSection = () => {
  const projects = [
    {
      image: "/Irucore - Intelligent AI Assistant.png",
      title: "Irucore",
      description:
        "Irucore delivers smart, dependable solutions in health, finance, education, agriculture, and more, offering accurate answers in both English and Kinyarwanda for diverse needs.",
      link: "https://www.irucoreai.com/",
    },
    {
      image: "/Healthlinker.png",
      title: "Irucare",
      description:
        "Comprehensive multi-system platform that companies across various industries can rent and customize to streamline their operations, from healthcare and logistics to regulatory compliance and data management.",
      link: "https://www.irucare.com/",
    },
    {
      image: "/Tone.png",
      title: "Frame and Tune Studio",
      description:
        "We are passionate about capturing and creating beautiful moments. Based in Rwanda, our studio specializes in professional photography, cinematic videography, expert audio production, and immersive art experiences.",
      link: "https://frameandtunestudio.com/",
    },
    {
      image: "/Youtube.jpg",
      title: "Our YouTube & Social Media",
      description:
        "We operate 5 YouTube channels and multiple social media platforms, sharing educational, entertaining, and engaging content for audiences in Rwanda and beyond.",
      socialLinks: [
        { icon: <FaYoutube />, url: "https://youtube.com/@irutv-2060?si=eOIiBW91MY16FBae" },
        { icon: <FaYoutube />, url: "https://youtube.com/@frameandtunestudio?si=Upg-PLZzI9lMGnf0" },
        { icon: <FaYoutube />, url: "https://youtube.com/@epishow-rwanda?si=-8xwC8_HedxG5S-A" },
        { icon: <FaYoutube />, url: "https://youtube.com/@allabouttv-2060?si=LTOajQ5GmgoIvLbR" },
        { icon: <FaYoutube />, url: "https://youtube.com/@newblood-v3s?si=K0ns_rgrFwYwYc9M" },
      ],
    },
  ];

  return (
    <section id="services" className="py-12 sm:py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
            Our Projects
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            A look at some of the successful projects we have delivered for our
            clients.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 card-hover border border-gray-200
                ${
                  project.socialLinks ? "lg:col-span-3 mx-auto max-w-lg" : ""
                }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Project Image */}
              <div className="w-full h-48 md:h-56 lg:h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                />
              </div>

              {/* Project Content */}
              <div className="p-6 flex flex-col">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 leading-tight">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Social Links */}
                {project.socialLinks && (
                  <div className="flex flex-wrap gap-3 mb-4 justify-center">
                    {project.socialLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl hover:scale-110 transition-transform"
                        style={{ color: "#FF0000" }}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                )}

                {/* View Project Button */}
                {project.link && (
                  <a
                    href={project.link}
                    className="inline-block mt-auto"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 shadow-lg hover:scale-105">
                      View Project
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
