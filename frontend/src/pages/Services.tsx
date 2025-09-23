import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Shield, 
  Brain, 
  Smartphone, 
  Database, 
  Users, 
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  Zap,
  Target
} from "lucide-react";

const Services = () => {
  const serviceCategories = [
    {
      id: "digital-health",
      title: "Digital Health Solutions",
      description: "Comprehensive digital transformation for healthcare organizations",
      icon: <Heart className="h-8 w-8 text-orange-500" />,
      services: [
        "Electronic Health Records (EHR)",
        "Patient Management Systems",
        "Digital Health Platforms",
        "Health Information Exchange",
        "Clinical Decision Support"
      ]
    },
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      description: "Intelligent solutions powered by artificial intelligence",
      icon: <Brain className="h-8 w-8 text-orange-500" />,
      services: [
        "AI-Powered Diagnostics",
        "Predictive Analytics",
        "Natural Language Processing",
        "Computer Vision for Medical Imaging",
        "Intelligent Chatbots"
      ]
    },
    {
      id: "mobile-health",
      title: "Mobile Health (mHealth)",
      description: "Mobile-first healthcare solutions for better accessibility",
      icon: <Smartphone className="h-8 w-8 text-orange-500" />,
      services: [
        "Mobile Health Apps",
        "Telemedicine Platforms",
        "Remote Patient Monitoring",
        "Health Tracking Solutions",
        "Mobile Payment Integration"
      ]
    },
    {
      id: "data-analytics",
      title: "Health Data Analytics",
      description: "Data-driven insights for better healthcare outcomes",
      icon: <Database className="h-8 w-8 text-orange-500" />,
      services: [
        "Population Health Analytics",
        "Clinical Data Analysis",
        "Health Trend Monitoring",
        "Performance Metrics",
        "Predictive Modeling"
      ]
    },
    {
      id: "cybersecurity",
      title: "Healthcare Cybersecurity",
      description: "Protecting sensitive health data and systems",
      icon: <Shield className="h-8 w-8 text-orange-500" />,
      services: [
        "Data Security Audits",
        "HIPAA Compliance",
        "Encryption Services",
        "Security Monitoring",
        "Incident Response"
      ]
    },
    {
      id: "consulting",
      title: "Healthcare Consulting",
      description: "Strategic guidance for healthcare transformation",
      icon: <Users className="h-8 w-8 text-orange-500" />,
      services: [
        "Digital Strategy Planning",
        "Process Optimization",
        "Change Management",
        "Technology Assessment",
        "Implementation Support"
      ]
    }
  ];

  const featuredServices = [
    {
      title: "IruCare Platform",
      description: "Comprehensive mobile health platform connecting patients with healthcare providers",
      features: ["Patient Management", "Appointment Scheduling", "Health Records", "Telemedicine"],
      price: "Custom Pricing",
      image: "/Irucare.png",
      rating: 4.9,
      clients: "500+"
    },
    {
      title: "IRU Core AI Assistant",
      description: "Intelligent AI assistant for healthcare decision support and patient care",
      features: ["Clinical Decision Support", "Natural Language Processing", "Real-time Analysis", "Integration Ready"],
      price: "Starting at $99/month",
      image: "/Irucore - Intelligent AI Assistant.png",
      rating: 4.8,
      clients: "200+"
    },
    {
      title: "HealthLinker Integration",
      description: "Seamless integration platform for healthcare data exchange and interoperability",
      features: ["API Integration", "Data Synchronization", "Real-time Updates", "Multi-platform Support"],
      price: "Enterprise Pricing",
      image: "/Healthlinker.png",
      rating: 4.7,
      clients: "100+"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Analysis",
      description: "We analyze your current systems and identify opportunities for improvement",
      icon: <Target className="h-6 w-6" />
    },
    {
      step: "02", 
      title: "Strategy & Planning",
      description: "Develop a comprehensive strategy tailored to your organization's needs",
      icon: <Zap className="h-6 w-6" />
    },
    {
      step: "03",
      title: "Implementation",
      description: "Execute the solution with minimal disruption to your operations",
      icon: <CheckCircle className="h-6 w-6" />
    },
    {
      step: "04",
      title: "Support & Optimization",
      description: "Ongoing support and continuous optimization for maximum value",
      icon: <Globe className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-20 pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive healthcare technology solutions designed to transform your organization 
              and improve patient outcomes across Africa and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a comprehensive range of healthcare technology services to meet your organization's needs.
            </p>
          </div>
          
          <Tabs defaultValue="digital-health" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-12">
              <TabsTrigger value="digital-health">Digital Health</TabsTrigger>
              <TabsTrigger value="ai-ml">AI & ML</TabsTrigger>
              <TabsTrigger value="mobile-health">Mobile Health</TabsTrigger>
              <TabsTrigger value="data-analytics">Data Analytics</TabsTrigger>
              <TabsTrigger value="cybersecurity">Cybersecurity</TabsTrigger>
              <TabsTrigger value="consulting">Consulting</TabsTrigger>
            </TabsList>

            {serviceCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      {category.icon}
                      <h3 className="text-3xl font-bold text-gray-900 ml-4">
                        {category.title}
                      </h3>
                    </div>
                    <p className="text-xl text-gray-600 mb-8">
                      {category.description}
                    </p>
                    <ul className="space-y-3">
                      {category.services.map((service, index) => (
                        <li key={index} className="flex items-center text-lg">
                          <CheckCircle className="h-5 w-5 text-orange-600 mr-3" />
                          {service}
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-8" size="lg">
                      Learn More <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl">
                    <h4 className="text-xl font-semibold mb-4">Why Choose This Service?</h4>
                    <ul className="space-y-3 text-gray-600">
                      <li>• Proven track record in healthcare technology</li>
                      <li>• Customized solutions for your specific needs</li>
                      <li>• Expert team with healthcare domain knowledge</li>
                      <li>• Comprehensive support and training</li>
                      <li>• Scalable and future-proof solutions</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most popular and impactful healthcare technology solutions.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-r from-orange-100 to-orange-200 flex items-center justify-center">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="h-24 w-24 object-contain"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      Featured
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{service.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Key Features:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-600">Starting at</p>
                      <p className="font-semibold">{service.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{service.clients} clients</p>
                    </div>
                  </div>
                  <Button className="w-full">
                    Get Started <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures successful implementation and maximum value from your investment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Healthcare?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Let's discuss how our services can help your organization achieve its healthcare technology goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-orange-500 hover:bg-gray-100">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-500">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
