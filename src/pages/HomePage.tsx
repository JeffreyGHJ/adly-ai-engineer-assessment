import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Type, Search, Bot, CheckSquare } from 'lucide-react';
import Button from '../components/ui/Button';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Make Your Text Sound 
              <span className="block text-pink-300">More Human</span>
            </motion.h1>
            <motion.p 
              className="max-w-2xl mx-auto text-xl text-indigo-100 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Transform AI-generated content into natural-sounding text. Perfect for students, content creators, and professionals.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/signup">
                <Button size="lg" className="mr-4 bg-white text-indigo-700 hover:bg-indigo-50 focus:ring-white">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/tools">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-indigo-700">
                  Try It Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Text Tools Suite</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              All the tools you need for perfect content, in one platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white rounded-lg shadow-sm p-8 border border-gray-100"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Type className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Text Humanizer</h3>
              <p className="text-gray-600 mb-4">
                Make AI-generated text sound more natural with our advanced humanization algorithms.
              </p>
              <Link to="/tools" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800">
                Try it now <ArrowRight size={16} className="ml-1" />
              </Link>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-sm p-8 border border-gray-100"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Search className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Plagiarism Checker</h3>
              <p className="text-gray-600 mb-4">
                Check your content against billions of web pages to ensure originality and avoid plagiarism.
              </p>
              <Link to="/tools" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800">
                Try it now <ArrowRight size={16} className="ml-1" />
              </Link>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg shadow-sm p-8 border border-gray-100"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Bot className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Content Detector</h3>
              <p className="text-gray-600 mb-4">
                Detect if text was written by AI or a human with our sophisticated detection technology.
              </p>
              <Link to="/tools" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800">
                Try it now <ArrowRight size={16} className="ml-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Our platform makes it easy to perfect your content in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Paste Your Text</h3>
              <p className="text-gray-600">
                Simply paste your text into our editor to get started with any of our tools.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Process With AI</h3>
              <p className="text-gray-600">
                Our advanced AI models will analyze and process your text based on the selected tool.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Your Results</h3>
              <p className="text-gray-600">
                Review the results, make any necessary adjustments, and save or copy your improved text.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Ready to transform your text?
                  <span className="block text-indigo-200">Start your free trial today.</span>
                </h2>
                <p className="mt-4 text-lg text-indigo-100">
                  Get 50 free credits to try all our premium tools with no credit card required.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
                <div className="inline-flex rounded-md shadow">
                  <Link to="/signup">
                    <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50">
                      Sign Up Free
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 inline-flex rounded-md shadow sm:mt-0 sm:ml-3">
                  <Link to="/pricing">
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-indigo-700">
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Thousands of writers, students, and professionals trust our tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <span className="text-lg font-bold text-indigo-600">S</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Sarah Johnson</h4>
                  <p className="text-gray-500 text-sm">Content Creator</p>
                </div>
              </div>
              <p className="text-gray-600">
                "TextPerfect has completely transformed my workflow. The humanizer tool helps me polish my AI-generated drafts to sound perfectly natural."
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <span className="text-lg font-bold text-indigo-600">M</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Mark Chen</h4>
                  <p className="text-gray-500 text-sm">Graduate Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The plagiarism checker is incredibly accurate. I use it for all my research papers to ensure originality before submission."
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <span className="text-lg font-bold text-indigo-600">J</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Jessica Torres</h4>
                  <p className="text-gray-500 text-sm">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As someone who reviews a lot of content, the AI detector helps me quickly identify which pieces need more editing to sound authentic."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TextPerfect</h3>
              <p className="text-gray-400">
                Advanced text processing tools for content creators, students, and professionals.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/tools" className="text-gray-400 hover:text-white">Text Humanizer</Link></li>
                <li><Link to="/tools" className="text-gray-400 hover:text-white">Plagiarism Checker</Link></li>
                <li><Link to="/tools" className="text-gray-400 hover:text-white">AI Detector</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              <p className="text-gray-400">
                Subscribe to our newsletter for updates and tips.
              </p>
              <div className="mt-3 flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 w-full" 
                />
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">© 2025 TextPerfect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;