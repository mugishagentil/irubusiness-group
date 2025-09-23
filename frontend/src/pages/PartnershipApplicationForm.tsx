import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  FileText, 
  DollarSign, 
  Shield, 
  Target,
  TrendingUp,
  Scale,
  Globe,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Building2,
  Briefcase,
  Users,
  FileCheck,
  Lightbulb,
  Calendar,
  PenTool
} from "lucide-react";

const PartnershipApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Applicant/Entity Details
    appName: "",
    email: "",
    phone: "",
    country: "",
    type: "",
    
    // Step 2: Project & Strategic Fit
    project: "",
    summary: "",
    
    // Step 3: Investment & Contribution
    amount: "",
    equity: "",
    nonCash: [] as string[],
    contribOther: "",
    
    // Step 4: Governance & Rights Preferences
    board: "",
    veto: "",
    
    // Step 5: Roles, KPIs & Deliverables
    roleType: "",
    kpis: "",
    
    // Step 6: Exit, Liquidity & Returns
    dividend: "",
    exit: "",
    
    // Step 7: Legal, Compliance & Documents
    docs: null as FileList | null,
    
    // Step 8: IP, Confidentiality & Ethics
    ip: "",
    ethics: "",
    
    // Step 9: Practical & Logistical
    timeline: "",
    presence: "",
    
    // Step 10: Additional Notes & Team
    team: "",
    
    // Step 11: Electronic Signature & Declaration
    signature: "",
    agree: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, title: "Applicant Details", icon: <User className="h-5 w-5" /> },
    { id: 2, title: "Project & Strategy", icon: <Target className="h-5 w-5" /> },
    { id: 3, title: "Investment", icon: <DollarSign className="h-5 w-5" /> },
    { id: 4, title: "Governance", icon: <Shield className="h-5 w-5" /> },
    { id: 5, title: "Roles & KPIs", icon: <Briefcase className="h-5 w-5" /> },
    { id: 6, title: "Exit & Returns", icon: <TrendingUp className="h-5 w-5" /> },
    { id: 7, title: "Legal & Docs", icon: <FileCheck className="h-5 w-5" /> },
    { id: 8, title: "IP & Ethics", icon: <Scale className="h-5 w-5" /> },
    { id: 9, title: "Practical", icon: <Calendar className="h-5 w-5" /> },
    { id: 10, title: "Team & Notes", icon: <Users className="h-5 w-5" /> },
    { id: 11, title: "Signature", icon: <PenTool className="h-5 w-5" /> }
  ];

  const nonCashContributions = [
    "Technical expertise",
    "Distribution network", 
    "IP/Technology",
    "Market access",
    "Other"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNonCashToggle = (contribution: string) => {
    setFormData(prev => ({
      ...prev,
      nonCash: prev.nonCash.includes(contribution)
        ? prev.nonCash.filter(c => c !== contribution)
        : [...prev.nonCash, contribution]
    }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.appName.trim()) newErrors.appName = "Name/Entity is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone is required";
        if (!formData.country.trim()) newErrors.country = "Country is required";
        if (!formData.type) newErrors.type = "Please select your role";
        break;
      case 2:
        if (!formData.project.trim()) newErrors.project = "Project name is required";
        if (!formData.summary.trim()) newErrors.summary = "Project summary is required";
        break;
      case 3:
        if (!formData.amount.trim()) newErrors.amount = "Investment amount is required";
        if (!formData.equity.trim()) newErrors.equity = "Desired equity is required";
        break;
      case 11:
        if (!formData.agree) newErrors.agree = "You must accept the declaration";
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateStep(11)) {
      alert("Partnership application submitted successfully! We'll review your submission and contact you if selected.");
    }
  };

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-20 pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-400 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">IRU</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Partnership & Shareholder Application
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8">
              Smart, attractive and super-comprehensive form to apply as partner or shareholder in any IRU project.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Progress Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Application Form
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Complete all steps to submit your partnership application
            </p>
            
            {/* Step Indicators */}
            <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-2 min-w-fit">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    currentStep === step.id
                      ? 'bg-orange-500 text-white scale-110' 
                      : currentStep > step.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.icon}
                  </div>
                  <span className={`font-medium transition-colors text-sm ${
                    currentStep === step.id 
                      ? 'text-orange-600 font-bold' 
                      : currentStep > step.id
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-4 h-0.5 transition-colors ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 1: Applicant/Entity Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Step 1 of 11
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Applicant / Entity Details</h3>
                      <p className="text-gray-600">Tell us about yourself or your organization</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="appName" className="text-sm font-semibold text-gray-700">
                          Full Name / Entity Name *
                        </Label>
                        <Input
                          id="appName"
                          value={formData.appName}
                          onChange={(e) => handleInputChange('appName', e.target.value)}
                          placeholder="John Doe or Acme Ltd"
                          className="mt-1"
                        />
                        {errors.appName && <p className="text-red-500 text-sm mt-1">{errors.appName}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="name@company.com"
                          className="mt-1"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                          Phone / WhatsApp *
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+250 78..."
                          className="mt-1"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="country" className="text-sm font-semibold text-gray-700">
                          Country *
                        </Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          placeholder="Rwanda"
                          className="mt-1"
                        />
                        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="type" className="text-sm font-semibold text-gray-700">
                        Are you applying as *
                      </Label>
                      <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Individual investor">Individual investor</SelectItem>
                          <SelectItem value="Corporate / Company">Corporate / Company</SelectItem>
                          <SelectItem value="Strategic partner (non-equity)">Strategic partner (non-equity)</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                    </div>
                  </div>
                )}

                {/* Step 2: Project & Strategic Fit */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Step 2 of 11
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Project & Strategic Fit</h3>
                      <p className="text-gray-600">Describe your project involvement and strategic alignment</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="project" className="text-sm font-semibold text-gray-700">
                        Project name (or proposed) *
                      </Label>
                      <Input
                        id="project"
                        value={formData.project}
                        onChange={(e) => handleInputChange('project', e.target.value)}
                        placeholder="E.g., Solar Distribution — Project A"
                        className="mt-1"
                      />
                      {errors.project && <p className="text-red-500 text-sm mt-1">{errors.project}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="summary" className="text-sm font-semibold text-gray-700">
                        Brief project / involvement summary *
                      </Label>
                      <Textarea
                        id="summary"
                        value={formData.summary}
                        onChange={(e) => handleInputChange('summary', e.target.value)}
                        placeholder="Describe how you want to participate (funding, operations, tech...)"
                        className="mt-1 min-h-[120px]"
                      />
                      {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
                    </div>
                  </div>
                )}

                {/* Step 3: Investment & Contribution */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Step 3 of 11
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Investment & Contribution</h3>
                      <p className="text-gray-600">Specify your financial and non-financial contributions</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="amount" className="text-sm font-semibold text-gray-700">
                          Proposed Investment Amount (USD) *
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.amount}
                          onChange={(e) => handleInputChange('amount', e.target.value)}
                          placeholder="e.g., 50000"
                          className="mt-1"
                        />
                        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="equity" className="text-sm font-semibold text-gray-700">
                          Desired Equity (%) *
                        </Label>
                        <Input
                          id="equity"
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          value={formData.equity}
                          onChange={(e) => handleInputChange('equity', e.target.value)}
                          placeholder="e.g., 20"
                          className="mt-1"
                        />
                        {errors.equity && <p className="text-red-500 text-sm mt-1">{errors.equity}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                        Non-cash contributions (select / describe)
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {nonCashContributions.map((contribution) => (
                          <Button
                            key={contribution}
                            type="button"
                            variant={formData.nonCash.includes(contribution) ? "default" : "outline"}
                            onClick={() => handleNonCashToggle(contribution)}
                            className={`${
                              formData.nonCash.includes(contribution)
                                ? 'bg-orange-500 text-white hover:bg-orange-600'
                                : 'border-gray-300 text-gray-700 hover:bg-orange-50 hover:text-black hover:border-orange-300'
                            }`}
                          >
                            {contribution}
                          </Button>
                        ))}
                      </div>
                      
                      {formData.nonCash.includes("Other") && (
                        <Input
                          id="contribOther"
                          value={formData.contribOther}
                          onChange={(e) => handleInputChange('contribOther', e.target.value)}
                          placeholder="If Other, describe here"
                          className="mt-3"
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Step 4: Governance & Rights Preferences */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Step 4 of 11
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Governance & Rights Preferences</h3>
                      <p className="text-gray-600">Define your governance expectations and voting rights</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="board" className="text-sm font-semibold text-gray-700">
                        Board representation desired
                      </Label>
                      <Select value={formData.board} onValueChange={(value) => handleInputChange('board', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select board representation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="None">None</SelectItem>
                          <SelectItem value="Observer seat">Observer seat</SelectItem>
                          <SelectItem value="1 board seat">1 board seat</SelectItem>
                          <SelectItem value="Multiple seats (specify in comments)">Multiple seats (specify in comments)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="veto" className="text-sm font-semibold text-gray-700">
                        Any special voting / veto rights requested?
                      </Label>
                      <Input
                        id="veto"
                        value={formData.veto}
                        onChange={(e) => handleInputChange('veto', e.target.value)}
                        placeholder="E.g., veto on sale, borrowing > $X"
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                {/* Step 5: Roles, KPIs & Deliverables */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Step 5 of 11
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Roles, KPIs & Deliverables</h3>
                      <p className="text-gray-600">Define your role and expected contributions</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="roleType" className="text-sm font-semibold text-gray-700">
                        Preferred role
                      </Label>
                      <Select value={formData.roleType} onValueChange={(value) => handleInputChange('roleType', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select preferred role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Passive investor">Passive investor</SelectItem>
                          <SelectItem value="Active partner - management">Active partner - management</SelectItem>
                          <SelectItem value="Strategic advisor">Strategic advisor</SelectItem>
                          <SelectItem value="Technical lead">Technical lead</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="kpis" className="text-sm font-semibold text-gray-700">
                        Key expected deliverables / KPIs (milestones & timeline)
                      </Label>
                      <Textarea
                        id="kpis"
                        value={formData.kpis}
                        onChange={(e) => handleInputChange('kpis', e.target.value)}
                        placeholder="E.g., secure 100 customers in 12 months, close pilot by Q3..."
                        className="mt-1 min-h-[120px]"
                      />
                    </div>
                  </div>
                )}

                {/* Step 6: Exit, Liquidity & Returns */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Step 6 of 11
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Exit, Liquidity & Returns</h3>
                      <p className="text-gray-600">Define your return expectations and exit strategy</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="dividend" className="text-sm font-semibold text-gray-700">
                        Dividend preference
                      </Label>
                      <Select value={formData.dividend} onValueChange={(value) => handleInputChange('dividend', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select dividend preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Reinvest profits">Reinvest profits</SelectItem>
                          <SelectItem value="Quarterly cash dividends">Quarterly cash dividends</SelectItem>
                          <SelectItem value="Annual cash dividends">Annual cash dividends</SelectItem>
                          <SelectItem value="Convertible instruments">Convertible instruments</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="exit" className="text-sm font-semibold text-gray-700">
                        Preferred exit routes
                      </Label>
                      <Input
                        id="exit"
                        value={formData.exit}
                        onChange={(e) => handleInputChange('exit', e.target.value)}
                        placeholder="Buyback, third-party sale, IPO, etc."
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                {/* Step 7: Legal, Compliance & Documents */}
                {currentStep === 7 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Step 7 of 11
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Legal, Compliance & Documents</h3>
                      <p className="text-gray-600">Upload supporting documents and legal information</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="docs" className="text-sm font-semibold text-gray-700">
                        Upload supporting documents (Registration, Financials, Pitch, KYC)
                      </Label>
                      <Input
                        id="docs"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        onChange={(e) => handleInputChange('docs', e.target.files)}
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX, PNG, JPG, JPEG</p>
                    </div>
                  </div>
                )}

                {/* Step 8: IP, Confidentiality & Ethics */}
                {currentStep === 8 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Step 8 of 11
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">IP, Confidentiality & Ethics</h3>
                      <p className="text-gray-600">Specify intellectual property and ethical considerations</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="ip" className="text-sm font-semibold text-gray-700">
                        Do you expect any IP assignment or licensing terms?
                      </Label>
                      <Input
                        id="ip"
                        value={formData.ip}
                        onChange={(e) => handleInputChange('ip', e.target.value)}
                        placeholder="Specify expectations"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="ethics" className="text-sm font-semibold text-gray-700">
                        Corporate values / ESG expectations
                      </Label>
                      <Textarea
                        id="ethics"
                        value={formData.ethics}
                        onChange={(e) => handleInputChange('ethics', e.target.value)}
                        placeholder="Describe any ESG or ethical commitments you'd like included"
                        className="mt-1 min-h-[120px]"
                      />
                    </div>
                  </div>
                )}

                {/* Step 9: Practical & Logistical */}
                {currentStep === 9 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Step 9 of 11
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Practical & Logistical</h3>
                      <p className="text-gray-600">Define practical arrangements and timeline</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="timeline" className="text-sm font-semibold text-gray-700">
                          Proposed timeline (start — end)
                        </Label>
                        <Input
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) => handleInputChange('timeline', e.target.value)}
                          placeholder="e.g., Jun 2025 — Dec 2027"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="presence" className="text-sm font-semibold text-gray-700">
                          In-person presence needs
                        </Label>
                        <Select value={formData.presence} onValueChange={(value) => handleInputChange('presence', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select presence needs" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Fully remote">Fully remote</SelectItem>
                            <SelectItem value="Occasional visits">Occasional visits</SelectItem>
                            <SelectItem value="On-site / local">On-site / local</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 10: Additional Notes & Team */}
                {currentStep === 10 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Step 10 of 11
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Additional Notes & Team</h3>
                      <p className="text-gray-600">Provide additional information about your team</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="team" className="text-sm font-semibold text-gray-700">
                        Key team members / CVs (short)
                      </Label>
                      <Textarea
                        id="team"
                        value={formData.team}
                        onChange={(e) => handleInputChange('team', e.target.value)}
                        placeholder="List key people and short bios"
                        className="mt-1 min-h-[120px]"
                      />
                    </div>
                  </div>
                )}

                {/* Step 11: Electronic Signature & Declaration */}
                {currentStep === 11 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Step 11 of 11
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Electronic Signature & Declaration</h3>
                      <p className="text-gray-600">Sign to confirm accuracy and intent</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">
                        Sign to confirm accuracy & intent
                      </Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg h-40 bg-gray-50 flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Signature pad would be implemented here</p>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleInputChange('signature', '')}
                          className="hover:bg-gray-50 hover:text-black hover:border-gray-400"
                        >
                          Clear
                        </Button>
                        <p className="text-sm text-gray-500">(Draw with mouse or finger)</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="agree"
                          checked={formData.agree}
                          onCheckedChange={(checked) => handleInputChange('agree', checked)}
                        />
                        <Label htmlFor="agree" className="text-sm text-gray-700">
                          I confirm the information provided is accurate and I agree to IRU's confidentiality terms.
                        </Label>
                      </div>
                      {errors.agree && <p className="text-red-500 text-sm mt-1">{errors.agree}</p>}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 border-t border-gray-200 mt-8">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-black hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              
              <div className="flex items-center gap-4">
                {currentStep === steps.length ? (
                  <Button
                    onClick={handleSubmit}
                    className="bg-orange-500 hover:bg-orange-600 hover:text-white text-white px-8 transition-all duration-200"
                  >
                    Submit Application
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={nextStep}
                    className="bg-orange-500 hover:bg-orange-600 hover:text-white text-white px-8 transition-all duration-200"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PartnershipApplicationForm;
