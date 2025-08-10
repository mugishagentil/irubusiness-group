import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ConsultantSection from "@/components/ ConsultantSection";
import ServicesSection from "@/components/ServicesSection";
//import TestimonialsSection from "@/components/TestimonialsSection";
import NewsSubscription from "@/components/NewsSubscription"
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection/>
      <ConsultantSection />
      <ServicesSection />
      {/*<TestimonialsSection />*/}
      <FAQSection />
      <NewsSubscription/>
      <Footer />
    </div>
  );
};

export default Index;