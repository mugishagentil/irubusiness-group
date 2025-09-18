import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Target, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  Building,
  Heart,
  Shield
} from "lucide-react";
import { FaYoutube } from "react-icons/fa";

const Projects = () => {
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

  const currentProjects = [
    {
      image: "/Kigali.png",
      title: "Rwanda Healthcare Digitalization",
      description: "Comprehensive digital transformation of healthcare services across Rwanda. This project aims to modernize healthcare infrastructure and improve patient care through technology.",
      location: "Kigali, Rwanda",
      status: "In Progress",
      progress: 75,
      startDate: "2023-01-15",
      endDate: "2024-06-30",
      team: 25,
      category: "Digital Health",
      link: "#"
    },
    {
      image: "/Irucare.png",
      title: "IruCare Mobile Platform",
      description: "Mobile health platform connecting patients with healthcare providers across multiple countries. Enabling remote consultations and health monitoring.",
      location: "Multiple Countries",
      status: "In Progress", 
      progress: 60,
      startDate: "2023-03-01",
      endDate: "2024-12-31",
      team: 18,
      category: "Mobile Health",
      link: "https://www.irucare.com/"
    },
    {
      image: "/Healthlinker.png",
      title: "HealthLinker Integration",
      description: "Integration platform for healthcare data exchange and interoperability across East Africa. Streamlining data flow between healthcare systems.",
      location: "East Africa",
      status: "Planning",
      progress: 15,
      startDate: "2024-02-01",
      endDate: "2025-08-31",
      team: 12,
      category: "Data Integration",
      link: "https://www.irucare.com/"
    }
  ];

  const completedProjects = [
    {
      image: "/Irucore - Intelligent AI Assistant.png",
      title: "IRU Core AI Assistant",
      description: "Intelligent AI assistant for healthcare decision support and patient care. Delivering smart, dependable solutions across health, finance, education, and agriculture with accurate answers in both English and Kinyarwanda.",
      location: "Global",
      status: "Completed",
      progress: 100,
      completionDate: "2023-12-15",
      team: 20,
      category: "AI/ML",
      impact: "Served 10,000+ healthcare professionals",
      link: "https://www.irucoreai.com/"
    },
    {
      image: "/Priority.jpg",
      title: "Priority Healthcare System",
      description: "Patient prioritization system for emergency and critical care in Kenya. Streamlining emergency response and improving patient outcomes through intelligent triage.",
      location: "Kenya",
      status: "Completed",
      progress: 100,
      completionDate: "2023-08-20",
      team: 15,
      category: "Emergency Care",
      impact: "Reduced emergency response time by 40%",
      link: "#"
    }
  ];

  const upcomingProjects = [
    {
      image: "/placeholder.svg",
      title: "Telemedicine Expansion",
      description: "Expanding telemedicine services across West Africa. Bringing remote healthcare access to underserved communities through innovative technology solutions.",
      location: "West Africa",
      status: "Upcoming",
      startDate: "2024-06-01",
      endDate: "2025-12-31",
      team: 30,
      category: "Telemedicine",
      link: "#"
    },
    {
      image: "/placeholder.svg",
      title: "Health Data Analytics Platform",
      description: "Advanced analytics platform for population health insights across Africa. Leveraging big data to improve healthcare outcomes and policy decisions.",
      location: "Pan-African",
      status: "Upcoming", 
      startDate: "2024-09-01",
      endDate: "2026-03-31",
      team: 22,
      category: "Analytics",
      link: "#"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Planning":
        return "bg-yellow-100 text-yellow-800";
      case "Upcoming":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Digital Health":
        return <Building className="h-5 w-5" />;
      case "Mobile Health":
        return <Heart className="h-5 w-5" />;
      case "Data Integration":
        return <Shield className="h-5 w-5" />;
      case "AI/ML":
        return <Target className="h-5 w-5" />;
      case "Emergency Care":
        return <Heart className="h-5 w-5" />;
      case "Telemedicine":
        return <Users className="h-5 w-5" />;
      case "Analytics":
        return <Target className="h-5 w-5" />;
      default:
        return <Building className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <style>{componentStyles}</style>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-20 pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Projects
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover the innovative healthcare projects we're working on across Africa and beyond. 
              From digital transformation to AI-powered solutions, we're building the future of healthcare.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Tabs */}
      <section className="py-20" style={{ background: "linear-gradient(to bottom, #ffffff, #f0f0f0)" }}>
        <div className="container mx-auto px-4">
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="current">Current Projects</TabsTrigger>
              <TabsTrigger value="completed">Completed Projects</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 card-hover border border-gray-200"
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
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Badge variant="outline">{project.category}</Badge>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Project Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {project.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          {project.team} team members
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {project.startDate} - {project.endDate}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* View Project Button */}
                      <a
                        href={project.link}
                        className="inline-block mt-auto"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:scale-105">
                          View Project
                        </Button>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {completedProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 card-hover border border-gray-200"
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
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Badge variant="outline">{project.category}</Badge>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Project Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {project.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          {project.team} team members
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed: {project.completionDate}
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm font-medium text-green-800">Impact:</p>
                          <p className="text-sm text-green-700">{project.impact}</p>
                        </div>
                      </div>

                      {/* View Project Button */}
                      <a
                        href={project.link}
                        className="inline-block mt-auto"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:scale-105">
                          View Project
                        </Button>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 card-hover border border-gray-200"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {/* Project Image */}
                    <div className="w-full h-48 md:h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                      <div className="text-purple-600 text-6xl">
                        {getCategoryIcon(project.category)}
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6 flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Badge variant="outline">{project.category}</Badge>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Project Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {project.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          {project.team} team members planned
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          Starts: {project.startDate}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          Ends: {project.endDate}
                        </div>
                      </div>

                      {/* View Project Button */}
                      <a
                        href={project.link}
                        className="inline-block mt-auto"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:scale-105">
                          Learn More
                        </Button>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* YouTube & Social Media Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
              Our YouTube & Social Media
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We operate 5 YouTube channels and multiple social media platforms, sharing educational, entertaining, and engaging content for audiences in Rwanda and beyond.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto border border-gray-200"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* YouTube Image */}
            <div className="w-full h-64 overflow-hidden">
              <img
                src="/Youtube.jpg"
                alt="Our YouTube & Social Media"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Our YouTube & Social Media
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We operate 5 YouTube channels and multiple social media platforms, sharing educational, entertaining, and engaging content for audiences in Rwanda and beyond.
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap gap-4 justify-center">
                {[
                  { icon: <FaYoutube />, url: "https://youtube.com/@irutv-2060?si=eOIiBW91MY16FBae", label: "IRU TV" },
                  { icon: <FaYoutube />, url: "https://youtube.com/@frameandtunestudio?si=Upg-PLZzI9lMGnf0", label: "Frame & Tune" },
                  { icon: <FaYoutube />, url: "https://youtube.com/@epishow-rwanda?si=-8xwC8_HedxG5S-A", label: "EpiShow" },
                  { icon: <FaYoutube />, url: "https://youtube.com/@allabouttv-2060?si=LTOajQ5GmgoIvLbR", label: "All About TV" },
                  { icon: <FaYoutube />, url: "https://youtube.com/@newblood-v3s?si=K0ns_rgrFwYwYc9M", label: "New Blood" },
                ].map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="text-3xl text-red-600 group-hover:text-red-700 mb-2">
                      {link.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Interested in Our Projects?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Learn more about our project methodologies, success stories, and how we can help 
            transform healthcare in your region.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              View Project Portfolio
            </Button>
            <Button size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
