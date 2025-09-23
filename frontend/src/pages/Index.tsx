import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ConsultantSection from "@/components/ ConsultantSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ShareStorySection from "@/components/ShareStorySection";
//import TestimonialsSection from "@/components/TestimonialsSection";
import NewsSubscription from "@/components/NewsSubscription"
import TeamSection from "@/components/TeamSection"
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <TopBanner />
      <Header />
      <HeroSection />
      <ConsultantSection />
      {/* <ServicesSection /> */}
      <ProjectsSection />
      <ShareStorySection />
      {/*<TestimonialsSection />*/}
      <TeamSection/>
      <FAQSection />
      <NewsSubscription/>
      <Footer />
    </div>
  );
};

export default Index;