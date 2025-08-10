import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Star, Zap } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "$299",
      period: "/month",
      description: "Perfect for small businesses getting started",
      features: [
        "Basic Business Consulting",
        "Monthly Strategy Sessions",
        "Email Support",
        "Basic Analytics Dashboard",
        "Up to 5 Team Members"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Professional",
      price: "$599",
      period: "/month",
      description: "Most popular choice for growing companies",
      features: [
        "Full Business Consulting",
        "Custom Software Solutions",
        "Weekly Strategy Sessions",
        "Priority Support",
        "Advanced Analytics",
        "Up to 20 Team Members",
        "Integration Support",
        "Training Included"
      ],
      buttonText: "Most Popular",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored solutions for large organizations",
      features: [
        "Complete Business Suite",
        "Custom Software Development",
        "Dedicated Account Manager",
        "24/7 Premium Support",
        "Advanced Integrations",
        "Unlimited Team Members",
        "On-site Training",
        "Custom Workflows",
        "SLA Guarantee"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">
            Pricing & Plans
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your business needs. All plans include 
            our core services with flexible options to scale as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-medium)] 
                         ${plan.popular 
                           ? 'border-2 border-primary scale-105 shadow-[var(--shadow-strong)]' 
                           : 'border border-border shadow-[var(--shadow-soft)]'
                         }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-[var(--gradient-primary)] 
                               text-white text-center py-2 text-sm font-semibold">
                  <Star className="inline w-4 h-4 mr-1" />
                  Most Popular
                </div>
              )}

              <CardHeader className={`text-center space-y-4 ${plan.popular ? 'pt-12' : 'pt-8'}`}>
                {/* Plan Name */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-muted-foreground mt-2">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold gradient-text">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground ml-2">{plan.period}</span>
                    )}
                  </div>
                  {plan.name === "Enterprise" && (
                    <p className="text-sm text-muted-foreground">Contact for pricing</p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5 mr-3" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full ${
                    plan.popular ? 'btn-hero' : ''
                  }`}
                  variant={plan.buttonVariant}
                  size="lg"
                >
                  {plan.buttonText}
                  {plan.popular && <Zap className="ml-2 h-4 w-4" />}
                </Button>
              </CardContent>

              {/* Background Gradient for Popular Plan */}
              {plan.popular && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
              )}
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center space-y-8">
          <div className="bg-surface rounded-2xl p-8 shadow-[var(--shadow-soft)] border border-border">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Not sure which plan is right for you?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our team of experts can help you choose the perfect plan based on your 
              specific business needs and growth objectives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero">
                Schedule Free Consultation
              </Button>
              <Button variant="outline" size="lg">
                Compare All Features
              </Button>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="flex items-center justify-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-accent" />
              </div>
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-accent" />
              </div>
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-accent" />
              </div>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;