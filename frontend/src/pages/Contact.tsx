import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send
} from "lucide-react";
import emailjs from '@emailjs/browser';
import { ContactAPI } from "@/services/contacirug";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSending(true);
  setError(null);

  try {
    await ContactAPI.create({
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    });

    setSuccess(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

    setTimeout(() => setSuccess(false), 5000);
  } catch (err) {
    setError('Failed to send message. Please try again later.');
    console.error(err);
  } finally {
    setSending(false);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-20 pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get in touch with our team to discuss your healthcare technology needs. 
              We're here to help transform your organization.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20" style={{ background: "linear-gradient(to bottom, #ffffff, #f0f0f0)" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 min-h-[600px]">
              {/* Left side - Contact info */}
              <div className="bg-gradient-to-br from-[#1b1c20] to-[#2a2c34] text-white p-8 lg:p-12 rounded-l-2xl">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
                    <p className="text-gray-300 mb-8 leading-relaxed">
                      Ready to transform your business? Our team of experts is here to help you achieve exceptional results.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-orange-500 rounded-lg">
                          <Phone className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">Phone</p>
                          <p className="text-gray-300">+250 788 894 032</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-orange-500 rounded-lg">
                          <Mail className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">Email</p>
                          <p className="text-gray-300">info@irubusinessgroup.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-orange-500 rounded-lg">
                          <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">Location</p>
                          <p className="text-gray-300">Kigali, Rwanda</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-8">
                    <img 
                      src="/IRU Logo orange i but black ru.png" 
                      alt="IRU Business Group" 
                      className="h-16 w-auto opacity-80"
                    />
                  </div>
                </div>
              </div>

              {/* Right side - Form */}
              <div className="p-8 lg:p-12 bg-white rounded-r-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-black"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-black"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-black"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-black"
                        placeholder="What's this about?"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-black"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  {/* Show sending status, error, or success */}
                  {sending && <p className="text-orange-500">Sending...</p>}
                  {error && <p className="text-red-600">{error}</p>}
                  {success && <p className="text-green-600">Message sent successfully!</p>}
                  
                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
