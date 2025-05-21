import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, User, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-gray-600">Get in touch with our support team for assistance</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {success ? (
                <motion.div 
                  className="bg-green-50 text-green-700 p-6 rounded-lg text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex justify-center mb-3">
                    <div className="bg-green-100 rounded-full p-3">
                      <Send className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Message Sent Successfully!</h3>
                  <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        fullWidth
                        leftIcon={<User size={18} />}
                        required
                      />
                      
                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        fullWidth
                        leftIcon={<Mail size={18} />}
                        required
                      />
                    </div>
                    
                    <Input
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      fullWidth
                      leftIcon={<MessageSquare size={18} />}
                      required
                    />
                    
                    <Textarea
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe your issue or question in detail..."
                      fullWidth
                      className="min-h-[200px]"
                      required
                    />
                    
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      leftIcon={<Send size={18} />}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2 text-gray-900">Email Support</h3>
                  <p className="text-indigo-600 mb-1">support@textperfect.com</p>
                  <p className="text-sm text-gray-600">For general inquiries and support</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 text-gray-900">Sales Inquiries</h3>
                  <p className="text-indigo-600 mb-1">sales@textperfect.com</p>
                  <p className="text-sm text-gray-600">For enterprise plans and bulk purchases</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 text-gray-900">Phone Support</h3>
                  <p className="text-indigo-600 mb-1">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-600">
                    Available Monday-Friday, 9am-5pm EST
                    <br />
                    Premium & Enterprise customers only
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 text-gray-900">Response Time</h3>
                  <p className="text-sm text-gray-600">
                    We strive to respond to all inquiries within 24 hours during business days.
                    <br /><br />
                    Premium and Enterprise customers receive priority support with faster response times.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">How do credits work?</h3>
                  <p className="text-sm text-gray-600">
                    Credits are consumed when you use our tools. Different tools require different amounts of credits.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Can I cancel my subscription?</h3>
                  <p className="text-sm text-gray-600">
                    Yes, you can cancel your subscription at any time from your billing settings.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">How accurate is the AI detector?</h3>
                  <p className="text-sm text-gray-600">
                    Our AI detector has an accuracy rate of approximately 85-90% depending on the length of the text.
                  </p>
                </div>
                
                <Button
                  variant="outline"
                  className="mt-2"
                  size="sm"
                  fullWidth
                >
                  View All FAQs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;