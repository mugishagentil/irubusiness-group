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
  Globe, 
  Calendar, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Home
} from "lucide-react";
import { InterviewApplicationsAPI } from "@/services/application";
import { useNavigate } from "react-router-dom";

const InterviewForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    language: "English",
    timezone: "",
    socials: "",
    headline: "",
    portraitUrl: null as File | null,
    contentTypes: [] as string[],
    pitch: "",
    sensitivity: "No",
    sampleLinks: "",
    suggestedQuestions: "",
    channels: [] as string[],
    allChannelsReason: "",
    format: "In-studio",
    duration: "20–30 min",
    availability: "",
    travel: "Yes",
    tech: "",
    notes: "",
    consentPublish: false,
    consentRules: false,
    consentContact: false,
    signatureUrl: "",
    uploadDocsUrls: null as FileList | null
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const steps = [
    { id: 1, title: "Profile", icon: <User className="h-5 w-5" /> },
    { id: 2, title: "Story", icon: <FileText className="h-5 w-5" /> },
    { id: 3, title: "Channel", icon: <Globe className="h-5 w-5" /> },
    { id: 4, title: "Schedule", icon: <Calendar className="h-5 w-5" /> },
    { id: 5, title: "Consent", icon: <CheckCircle className="h-5 w-5" /> }
  ];

  const channels = ["IRU TV", "Frame & Tune Studio", "Epishow TV", "All About TV", "All Channels"];
  const contentTypes = ["Life story", "Testimony", "Entertainment", "News/Current affairs", "Education", "Other"];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleChannelToggle = (channel: string) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }));
  };

  const handleContentTypeToggle = (contentType: string) => {
    setFormData(prev => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(contentType)
        ? prev.contentTypes.filter(c => c !== contentType)
        : [...prev.contentTypes, contentType]
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
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone is required";
        if (!formData.headline.trim()) newErrors.headline = "Headline is required";
        if (formData.headline.length > 120) newErrors.headline = "Headline must be 120 characters or less";
        break;
      case 2:
        if (!formData.pitch.trim()) newErrors.pitch = "Pitch is required";
        if (formData.pitch.length < 60) newErrors.pitch = "Pitch must be at least 60 characters";
        if (formData.pitch.length > 1200) newErrors.pitch = "Pitch must be 1200 characters or less";
        break;
      case 3:
        if (formData.channels.length === 0) newErrors.channels = "Please select at least one channel";
        if (formData.channels.includes("All Channels") && !formData.allChannelsReason.trim())
          newErrors.allChannelsReason = "Please explain why your story is suitable for all channels";
        break;
      case 5:
        if (!formData.consentPublish || !formData.consentRules) newErrors.consent = "You must accept the required agreements";
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    
    if (validateStep(5)) {
      setIsSubmitting(true);
      try {
        console.log("Submitting form data:", formData);

        // Maps for enums
        const formatMap: Record<string, string> = {
          "In-studio": "InStudio",
          "On location": "OnLocation",
          "Remote / online": "Remote",
          "No preference": "NoPreference",
        };

        const durationMap: Record<string, string> = {
          "10–15 min": "Min10to15",
          "20–30 min": "Min20to30",
          "45–60 min": "Min45to60",
          "Over 60 min": "Over60",
        };

        const sensitivityMap: Record<string, string> = { "Yes": "Yes", "No": "No" };

        const normalizedData = {
          ...formData,
          format: formatMap[formData.format] || "NoPreference",
          duration: durationMap[formData.duration] || "Min20to30",
          sensitivity: sensitivityMap[formData.sensitivity] || "No",
          portraitUrl: formData.portraitUrl || null,
          signatureUrl: formData.signatureUrl || null,
          uploadDocsUrls: formData.uploadDocsUrls || [],
          consentPublish: formData.consentPublish,
          consentRules: formData.consentRules,
          consentContact: formData.consentContact,
        };

        await InterviewApplicationsAPI.create(normalizedData);

        console.log("API response: success");

        // Show success message
        setSubmitMessage({ 
          type: "success", 
          text: " Application submitted successfully! Redirecting to homepage..." 
        });

        // Wait a moment to show the success message, then redirect
        setTimeout(() => {
          navigate("/"); // Redirect to home page
        }, 3000);

      } catch (err: any) {
        console.error("Submission error:", err);
        setSubmitMessage({ 
          type: "error", 
          text: " Failed to send application. Please try again." 
        });
        
        // Clear error message after 5 seconds
        setTimeout(() => setSubmitMessage(null), 5000);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      city: "",
      language: "English",
      timezone: "",
      socials: "",
      headline: "",
      portraitUrl: null,
      contentTypes: [],
      pitch: "",
      sensitivity: "No",
      sampleLinks: "",
      suggestedQuestions: "",
      channels: [],
      allChannelsReason: "",
      format: "In-studio",
      duration: "20–30 min",
      availability: "",
      travel: "Yes",
      tech: "",
      notes: "",
      consentPublish: false,
      consentRules: false,
      consentContact: false,
      signatureUrl: "",
      uploadDocsUrls: null,
    });
    setCurrentStep(1);
    setErrors({});
  };

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gray-50 relative">
  
      <style dangerouslySetInnerHTML={{
        __html: `
          .datetime-input {
            position: relative;
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 0.5rem;
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
            color: #111827;
            transition: all 0.2s ease;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            width: 100%;
          }
          
          .datetime-input:hover {
            border-color: #d1d5db;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          
          .datetime-input:focus {
            border-color: #f97316;
            box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
            outline: none;
          }
        `
      }} />
      
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-20 pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-orange-500 text-white px-4 py-1 rounded-full mb-4 text-sm font-semibold">
              Free Application
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Interview Application
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Apply to be featured on IRU TV, Frame & Tune Studio, Epishow TV, or All About TV
            </p>
          </div>
        </div>
      </section>

      {/* Main Form */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Progress Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Application Form
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Complete all steps to submit your interview application
            </p>
            
            {/* Step Indicators */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    currentStep === step.id
                      ? 'bg-orange-500 text-white scale-110' 
                      : currentStep > step.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.icon}
                  </div>
                  <span className={`font-medium transition-colors ${
                    currentStep === step.id 
                      ? 'text-orange-600 font-bold' 
                      : currentStep > step.id
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 transition-colors ${
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
          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                             {/* Step 1: Profile */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Step 1 of 5
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h3>
                      <p className="text-gray-600">Tell us about yourself and your contact details</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          placeholder="e.g., Kalimba Nyirishema"
                          className="mt-1"
                        />
                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
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
                          placeholder="you@example.com"
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
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="e.g., +250 7XX XXX XXX"
                          className="mt-1"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="city" className="text-sm font-semibold text-gray-700">
                          City & Country
                        </Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="e.g., Kigali, Rwanda"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="language" className="text-sm font-semibold text-gray-700">
                          Preferred Interview Language
                        </Label>
                        <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Kinyarwanda">Kinyarwanda</SelectItem>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="French">French</SelectItem>
                            <SelectItem value="Swahili">Swahili</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="timezone" className="text-sm font-semibold text-gray-700">
                          Your Time Zone
                        </Label>
                        <Input
                          id="timezone"
                          value={formData.timezone}
                          onChange={(e) => handleInputChange('timezone', e.target.value)}
                          placeholder="e.g., Africa/Kigali"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="socials" className="text-sm font-semibold text-gray-700">
                        Links (Socials, Portfolio, YouTube, etc.)
                      </Label>
                      <Input
                        id="socials"
                        value={formData.socials}
                        onChange={(e) => handleInputChange('socials', e.target.value)}
                        placeholder="https://... (separate multiple with commas)"
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">Paste multiple links separated by commas.</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="headline" className="text-sm font-semibold text-gray-700">
                        Your Headline (Short bio) *
                      </Label>
                      <Input
                        id="headline"
                        value={formData.headline}
                        onChange={(e) => handleInputChange('headline', e.target.value)}
                        placeholder="e.g., Entrepreneur turning challenges into opportunities"
                        maxLength={120}
                        className="mt-1"
                      />
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-gray-500">{formData.headline.length}/120 characters</p>
                      </div>
                      {errors.headline && <p className="text-red-500 text-sm mt-1">{errors.headline}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="portraitUrl" className="text-sm font-semibold text-gray-700">
                        Headshot / Portrait (optional)
                      </Label>
                      <Input
                        id="portraitUrl"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleInputChange('portraitUrl', e.target.files?.[0] || null)}
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">JPG/PNG. Max 5MB.</p>
                    </div>
                  </div>
                )}

                {/* Step 2: Story */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Step 2 of 5
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Story</h3>
                      <p className="text-gray-600">Share your compelling story and what makes it worth telling</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                        Type of content you propose
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {contentTypes.map((contentType) => (
                          <Button
                            key={contentType}
                            type="button"
                            variant={formData.contentTypes.includes(contentType) ? "default" : "outline"}
                            onClick={() => handleContentTypeToggle(contentType)}
                            className={`${
                              formData.contentTypes.includes(contentType)
                                ? 'bg-orange-500 text-white hover:bg-orange-600 hover:text-white'
                                : 'border-gray-300 text-gray-700 hover:bg-orange-50 hover:text-black hover:border-orange-300'
                            }`}
                          >
                            {contentType}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="pitch" className="text-sm font-semibold text-gray-700">
                        Your pitch — what makes this interview compelling? *
                      </Label>
                      <Textarea
                        id="pitch"
                        value={formData.pitch}
                        onChange={(e) => handleInputChange('pitch', e.target.value)}
                        placeholder="Describe your unique story, key moments, lessons, and what audience will gain... (60–1200 characters)"
                        minLength={60}
                        maxLength={1200}
                        className="mt-1 min-h-[120px]"
                      />
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-gray-500">{formData.pitch.length}/1200 characters</p>
                        <p className="text-sm text-gray-500">Words: {formData.pitch.trim().split(/\s+/).filter(Boolean).length}</p>
                      </div>
                      {errors.pitch && <p className="text-red-500 text-sm mt-1">{errors.pitch}</p>}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="sensitivity" className="text-sm font-semibold text-gray-700">
                          Does your story include sensitive topics?
                        </Label>
                        <Select value={formData.sensitivity} onValueChange={(value) => handleInputChange('sensitivity', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="No">No</SelectItem>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="Unsure">Unsure</SelectItem>
                          </SelectContent>
                        </Select>
                        {(formData.sensitivity === "Yes" || formData.sensitivity === "Unsure") && (
                          <p className="text-sm text-gray-500 mt-1">
                            We'll plan additional safeguarding and consent steps for sensitive content.
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="sampleLinks" className="text-sm font-semibold text-gray-700">
                          Sample links (optional)
                        </Label>
                        <Input
                          id="sampleLinks"
                          value={formData.sampleLinks}
                          onChange={(e) => handleInputChange('sampleLinks', e.target.value)}
                          placeholder="YouTube/Drive/Articles — comma separated"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="suggestedQuestions" className="text-sm font-semibold text-gray-700">
                        Three questions you want us to ask
                      </Label>
                      <Textarea
                        id="suggestedQuestions"
                        value={formData.suggestedQuestions}
                        onChange={(e) => handleInputChange('suggestedQuestions', e.target.value)}
                        placeholder="1) ... 2) ... 3) ..."
                        className="mt-1 min-h-[80px]"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Channel */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Step 3 of 5
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Channel Preferences</h3>
                      <p className="text-gray-600">Choose which channels you'd like to be featured on</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                        Select preferred channel(s) *
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {channels.map((channel) => (
                          <Button
                            key={channel}
                            type="button"
                            variant={formData.channels.includes(channel) ? "default" : "outline"}
                            onClick={() => handleChannelToggle(channel)}
                            className={`${
                              formData.channels.includes(channel)
                                ? 'bg-orange-500 text-white hover:bg-orange-600 hover:text-white'
                                : 'border-gray-300 text-gray-700 hover:bg-orange-50 hover:text-black hover:border-orange-300'
                            }`}
                          >
                            {channel}
                          </Button>
                        ))}
                      </div>
                      {errors.channels && <p className="text-red-500 text-sm mt-1">{errors.channels}</p>}
                    </div>
                    
                    {formData.channels.includes("All Channels") && (
                      <div>
                        <Label htmlFor="allChannelsReason" className="text-sm font-semibold text-gray-700">
                          Why is your story suitable for <em>all</em> channels?
                        </Label>
                        <Textarea
                          id="allChannelsReason"
                          value={formData.allChannelsReason}
                          onChange={(e) => handleInputChange('allChannelsReason', e.target.value)}
                          placeholder="Explain audience fit and angle for each channel"
                          className="mt-1 min-h-[80px]"
                        />
                        {errors.allChannelsReason && <p className="text-red-500 text-sm mt-1">{errors.allChannelsReason}</p>}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="format" className="text-sm font-semibold text-gray-700">
                          Preferred format
                        </Label>
                        <Select value={formData.format} onValueChange={(value) => handleInputChange('format', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="In-studio">In-studio</SelectItem>
                            <SelectItem value="On location">On location</SelectItem>
                            <SelectItem value="Remote / online">Remote / online</SelectItem>
                            <SelectItem value="No preference">No preference</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="duration" className="text-sm font-semibold text-gray-700">
                          Ideal duration
                        </Label>
                        <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10–15 min">10–15 min</SelectItem>
                            <SelectItem value="20–30 min">20–30 min</SelectItem>
                            <SelectItem value="45–60 min">45–60 min</SelectItem>
                            <SelectItem value="Over 60 min">Over 60 min</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Schedule */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Step 4 of 5
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Availability & Logistics</h3>
                      <p className="text-gray-600">Tell us about your availability and technical setup</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="availability" className="text-sm font-semibold text-gray-700">
                          Earliest availability date
                        </Label>
                        <Input
                          id="availability"
                          type="datetime-local"
                          value={formData.availability}
                          onChange={(e) => handleInputChange('availability', e.target.value)}
                          className="mt-1 datetime-input"
                        />
                        <p className="text-sm text-gray-500 mt-1">We'll confirm precise time with you.</p>
                      </div>
                      
                      <div>
                        <Label htmlFor="travel" className="text-sm font-semibold text-gray-700">
                          Can you travel to our studio (if required)?
                        </Label>
                        <Select value={formData.travel} onValueChange={(value) => handleInputChange('travel', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                            <SelectItem value="Maybe">Maybe</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="tech" className="text-sm font-semibold text-gray-700">
                        Technical checks (remote): Internet speed, mic/camera
                      </Label>
                      <Textarea
                        id="tech"
                        value={formData.tech}
                        onChange={(e) => handleInputChange('tech', e.target.value)}
                        placeholder="e.g., 25 Mbps+, USB mic, quiet room"
                        className="mt-1 min-h-[80px]"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="notes" className="text-sm font-semibold text-gray-700">
                        Other notes or requests
                      </Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        placeholder="Anything we should know"
                        className="mt-1 min-h-[80px]"
                      />
                    </div>
                  </div>
                )}

                {/* Step 5: Consent */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        Step 5 of 5
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Agreements & Signature</h3>
                      <p className="text-gray-600">Review and accept our terms, then sign your application</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-4 block">
                        Agreements
                      </Label>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="consentPublish"
                            checked={formData.consentPublish}
                            onCheckedChange={(checked) => handleInputChange('consentPublish', checked)}
                          />
                          <Label htmlFor="consentPublish" className="text-sm text-gray-700">
                            I grant IRU Business Group Ltd the right to record and publish my interview.
                          </Label>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="consentRules"
                            checked={formData.consentRules}
                            onCheckedChange={(checked) => handleInputChange('consentRules', checked)}
                          />
                          <Label htmlFor="consentRules" className="text-sm text-gray-700">
                            I agree to community guidelines and respectful conduct.
                          </Label>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="consentContact"
                            checked={formData.consentContact}
                            onCheckedChange={(checked) => handleInputChange('consentContact', checked)}
                          />
                          <Label htmlFor="consentContact" className="text-sm text-gray-700">
                            You may contact me about scheduling & updates.
                          </Label>
                        </div>
                      </div>
                      {errors.consent && <p className="text-red-500 text-sm mt-2">{errors.consent}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="signatureUrl" className="text-sm font-semibold text-gray-700">
                        Signature (draw)
                      </Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg h-40 bg-gray-50 flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Signature pad would be implemented here</p>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleInputChange('signatureUrl', '')}
                          className="hover:bg-gray-50 hover:text-black hover:border-gray-400"
                        >
                          Clear
                        </Button>
                        <p className="text-sm text-gray-500">Use your mouse or finger to sign.</p>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="uploadDocsUrls" className="text-sm font-semibold text-gray-700">
                        Attach supporting files (optional)
                      </Label>
                      <Input
                        id="uploadDocsUrls"
                        type="file"
                        accept="image/*,application/pdf,video/*"
                        multiple
                        onChange={(e) => handleInputChange('uploadDocsUrls', e.target.files)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
                
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 border-t border-gray-200 mt-8">
              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  variant="outline"
                  className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-black hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                
                <Button
                  type="button"
                  onClick={resetForm}
                  variant="outline"
                  className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-black hover:border-gray-400"
                >
                  <Home className="h-4 w-4" />
                  Reset Form
                </Button>
              </div>
              
              <div className="flex items-center gap-4">
                {currentStep === steps.length ? (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-500 hover:bg-orange-600 hover:text-white text-white px-8 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-orange-500 hover:bg-orange-600 hover:text-white text-white px-8 transition-all duration-200"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
              
      {submitMessage && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white z-50 transition-all duration-300 ${
            submitMessage.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <p className="flex items-center gap-2">
            {submitMessage.type === "success" ? (
              <CheckCircle className="h-4 w-4" />
            ) : null}
            {submitMessage.text}
          </p>
        </div>
      )}

            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InterviewForm;