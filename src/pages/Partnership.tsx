import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Handshake, Target, Users, TrendingUp, Globe, Award, CheckCircle, DollarSign, Shield, BarChart3, Scale, CheckSquare } from "lucide-react";

const Partnership = () => {
  const [hasAgreed, setHasAgreed] = useState(false);

  const partnershipTypes = [
    {
      title: "Strategic Partnerships",
      description: "Long-term collaborations with organizations that share our vision and values.",
      icon: <Handshake className="h-8 w-8 text-orange-500" />,
      benefits: ["Shared resources", "Market expansion", "Innovation collaboration", "Risk sharing"]
    },
    {
      title: "Technology Partnerships",
      description: "Integration and collaboration with tech companies to enhance our solutions.",
      icon: <Target className="h-8 w-8 text-orange-500" />,
      benefits: ["API integrations", "Platform compatibility", "Technical support", "Co-development"]
    },
    {
      title: "Channel Partnerships",
      description: "Distribution and reseller partnerships to expand our market reach.",
      icon: <Users className="h-8 w-8 text-orange-500" />,
      benefits: ["Market access", "Local expertise", "Customer support", "Revenue sharing"]
    }
  ];

  const currentPartners = [
    {
      name: "HealthTech Solutions",
      logo: "/placeholder.svg",
      description: "Leading healthcare technology provider",
      partnership: "Technology Integration"
    },
    {
      name: "Global Care Network",
      logo: "/placeholder.svg", 
      description: "International healthcare network",
      partnership: "Strategic Alliance"
    },
    {
      name: "MediConnect",
      logo: "/placeholder.svg",
      description: "Patient management platform",
      partnership: "Channel Partnership"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 pt-32" style={{ background: "linear-gradient(to bottom, #ffffff, #f0f0f0)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Partnership & Shareholder Application
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              Smart, attractive and super-comprehensive form to apply as partner or shareholder in any IRU project. 
              Join our network of leaders building ventures in Africa and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  // Scroll to consent section
                  document.getElementById('consent-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-20" style={{ background: "linear-gradient(to bottom, #f8fafc, #ffffff)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Partner with IRU Business Group?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We are committed to excellence, impact, and innovation. Partnering with IRU Business Group means 
              aligning with a network of leaders building ventures in Africa and beyond. Our comprehensive 
              approach ensures sustainable growth, ethical practices, and meaningful impact across all sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Details Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Eligibility Card */}
            <Card className="bg-white border-2 border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 font-bold">Eligibility</CardTitle>
                </div>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Investors, corporates, and strategic partners with financial capacity, expertise, or networks in relevant sectors.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Investment Terms Card */}
            <Card className="bg-white border-2 border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-yellow-200 transition-colors">
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 font-bold">Investment Terms</CardTitle>
                </div>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Flexible contribution models: cash, assets, IP, or market access. Clear equity and ownership structure.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Governance Card */}
            <Card className="bg-white border-2 border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-orange-200 transition-colors">
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 font-bold">Governance</CardTitle>
                </div>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Transparent governance with shareholder rights, board participation, and fair voting structures.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Returns & Exit Card */}
            <Card className="bg-white border-2 border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors">
                    <BarChart3 className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 font-bold">Returns & Exit</CardTitle>
                </div>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Profit-sharing, dividends, capital appreciation, and multiple exit routes (buyback, IPO, resale).
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Legal & Risk Card */}
            <Card className="bg-white border-2 border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                    <Scale className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 font-bold">Legal & Risk</CardTitle>
                </div>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Compliance with local and international regulations, risk management, and strong contracts framework.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Impact & Ethics Card */}
            <Card className="bg-white border-2 border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-indigo-200 transition-colors">
                    <Globe className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 font-bold">Impact & Ethics</CardTitle>
                </div>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Commitment to sustainability, ESG standards, and positive community impact.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-20" style={{ background: "linear-gradient(to bottom, #f8fafc, #ffffff)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Current Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're proud to work with industry leaders who share our commitment to innovation and excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {currentPartners.map((partner, index) => (
              <Card key={index} className="text-center bg-white border-2 border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-300">
                    <Globe className="h-10 w-10 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">{partner.name}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">{partner.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-8">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800 px-4 py-2 text-sm font-semibold">
                    {partner.partnership}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Consent Section */}
      <section id="consent-section" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 border-2 border-orange-200">
            <div className="flex items-start space-x-4 mb-8">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <CheckSquare className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasAgreed}
                    onChange={(e) => setHasAgreed(e.target.checked)}
                    className="mt-1 h-5 w-5 text-orange-500 bg-white border-2 border-orange-300 rounded focus:ring-orange-500 focus:ring-2"
                  />
                  <span className="text-gray-800 text-lg leading-relaxed font-medium">
                    I have read and understood the information above, and I agree to proceed with the application.
                  </span>
                </label>
              </div>
            </div>
            
            {/* Apply Now Button */}
            <div className="text-center">
              <Button 
                size="lg" 
                disabled={!hasAgreed}
                className={`font-semibold px-12 py-4 text-lg shadow-lg transition-all duration-300 ${
                  hasAgreed 
                    ? 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-xl cursor-pointer' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                }`}
                onClick={() => hasAgreed && (window.location.href = '/partnership-application')}
              >
                {hasAgreed ? 'Apply Now' : 'Please agree to terms above'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partnership;
