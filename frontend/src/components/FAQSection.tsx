import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useLanguage();

  const faqs = [
    {
      question: "What services does IRU BUSINESS GROUP offer?",
      answer:
        "We offer comprehensive business solutions including business consulting, custom software development, logistics and transport services, corporate training, and digital transformation consulting. Our services are designed to help businesses across Rwanda and East Africa optimize their operations and achieve sustainable growth.",
    },
    {
      question: "How long does a typical software development project take?",
      answer:
        "Project timelines vary depending on complexity and scope. Simple web applications typically take 4-8 weeks, while complex enterprise solutions may take 3-6 months. We provide detailed project timelines during our initial consultation and keep you updated throughout the development process.",
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer:
        "Yes, we offer comprehensive post-project support including maintenance, updates, training, and technical assistance. Our support packages are tailored to your specific needs and ensure your systems continue to operate optimally.",
    },
    {
      question: "Can you work with businesses outside of Rwanda?",
      answer:
        "Absolutely! While we're based in Rwanda, we serve clients across East Africa and beyond. We have experience working with international clients and can accommodate different time zones and communication preferences.",
    },
    {
      question: "What makes IRU BUSINESS GROUP different from competitors?",
      answer:
        "Our deep understanding of the East African market, combined with international best practices, sets us apart. We offer integrated solutions that address multiple business needs, have a proven track record of successful projects, and provide personalized service with dedicated account management.",
    },
    {
      question: "Do you offer training for our team on new systems?",
      answer:
        "Yes, comprehensive training is included with all our solutions. We provide on-site training, online sessions, documentation, and ongoing support to ensure your team can effectively use and maintain the systems we implement.",
    },
    {
      question: "How do you ensure the security of our business data?",
      answer:
        "Security is our top priority. We implement industry-standard security measures including data encryption, secure hosting, regular security audits, and compliance with international data protection standards. All our solutions are built with security-first principles.",
    },
    {
      question: "What is your pricing structure?",
      answer:
        "Our pricing is project-based and depends on scope, complexity, and timeline. We offer transparent pricing with detailed quotations and no hidden fees. We also provide flexible payment terms and can work within your budget constraints.",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">
            {t('faq.title')}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('faq.description')}
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="bg-surface rounded-lg border border-border shadow-[var(--shadow-soft)]
                           hover:shadow-[var(--shadow-medium)] transition-shadow duration-300"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline
                                              hover:text-primary transition-colors duration-200">
                  <span className="text-lg font-semibold pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
};

export default FAQSection;
