import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

interface PlanProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  credits: number;
  highlight?: boolean;
  period?: string;
}

const PlanCard = ({ name, price, description, features, credits, highlight = false, period = 'month' }: PlanProps) => {
  const { user } = useAuth();
  
  const isPro = user?.plan?.toLowerCase() === name.toLowerCase();
  
  return (
    <motion.div 
      className={`rounded-xl overflow-hidden ${
        highlight 
          ? 'border-2 border-indigo-500 shadow-lg' 
          : 'border border-gray-200 shadow-sm'
      }`}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {highlight && (
        <div className="bg-indigo-500 text-white text-center py-2 font-medium">
          Most Popular
        </div>
      )}
      <div className="p-8 bg-white">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-extrabold text-gray-900">{price}</span>
          {price !== 'Free' && (
            <span className="ml-1 text-xl font-medium text-gray-500">/{period}</span>
          )}
        </div>
        <p className="mt-4 text-gray-600">{description}</p>
        
        <ul className="mt-6 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="ml-3 text-gray-600">{feature}</p>
            </li>
          ))}
        </ul>
        
        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-medium text-gray-900">{credits} credits</span> per {period}
          </p>
          
          {isPro ? (
            <Button
              variant="outline"
              fullWidth
              disabled
            >
              Current Plan
            </Button>
          ) : (
            <Link to="/billing">
              <Button
                variant={highlight ? 'primary' : 'outline'}
                fullWidth
              >
                {price === 'Free' ? 'Get Started' : 'Upgrade'}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const PricingPage = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600">
          Choose the plan that's right for you. All plans include access to our full suite of tools.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <PlanCard
          name="Free"
          price="Free"
          description="Perfect for trying out our services"
          features={[
            "Access to all tools",
            "Limited credits per month",
            "Standard processing speed",
            "Basic support"
          ]}
          credits={50}
        />
        
        <PlanCard
          name="Basic"
          price="$9.99"
          description="Great for occasional users"
          features={[
            "Access to all tools",
            "Increased monthly credits",
            "Standard processing speed",
            "Email support"
          ]}
          credits={500}
        />
        
        <PlanCard
          name="Premium"
          price="$19.99"
          description="Ideal for regular content creators"
          features={[
            "Access to all tools",
            "Generous credit allocation",
            "Priority processing speed",
            "Priority email support",
            "Save unlimited documents"
          ]}
          credits={2000}
          highlight={true}
        />
        
        <PlanCard
          name="Enterprise"
          price="$49.99"
          description="For professional teams and businesses"
          features={[
            "Access to all tools",
            "Maximum credit allocation",
            "Fastest processing speed",
            "Priority phone support",
            "Team member accounts",
            "API access"
          ]}
          credits={5000}
        />
      </div>
      
      <div className="mt-20 bg-gray-50 rounded-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        
        <div className="space-y-6 mt-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">What are credits?</h3>
            <p className="mt-2 text-gray-600">
              Credits are used when processing text with our tools. Each tool uses a different amount of credits depending on the complexity of the task.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900">Do unused credits roll over?</h3>
            <p className="mt-2 text-gray-600">
              No, unused credits do not roll over to the next month. Your credit balance resets at the beginning of each billing cycle.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900">Can I upgrade or downgrade my plan?</h3>
            <p className="mt-2 text-gray-600">
              Yes, you can change your plan at any time. If you upgrade, the new plan will take effect immediately. If you downgrade, the change will take effect at the start of your next billing cycle.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900">Is there a limit to document storage?</h3>
            <p className="mt-2 text-gray-600">
              Free and Basic plans can store up to 10 documents. Premium and Enterprise plans offer unlimited document storage.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900">Can I purchase additional credits?</h3>
            <p className="mt-2 text-gray-600">
              Yes, you can purchase additional credit packs at any time without changing your subscription plan.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h2>
        <p className="text-lg text-gray-600 mb-6">
          Contact our sales team for custom enterprise solutions and bulk pricing.
        </p>
        <Link to="/contact">
          <Button size="lg">Contact Sales</Button>
        </Link>
      </div>
    </div>
  );
};

export default PricingPage;