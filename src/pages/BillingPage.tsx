import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, User, DollarSign, CheckCircle, CreditCard as CreditCardIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

const BillingPage = () => {
  const { user, updateUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'basic' | 'premium' | 'enterprise'>(user?.plan || 'free');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      credits: 50,
      features: [
        'Access to all tools',
        'Limited credits per month',
        'Basic support'
      ]
    },
    {
      id: 'basic',
      name: 'Basic',
      price: '$9.99',
      credits: 500,
      features: [
        'Access to all tools',
        'Increased monthly credits',
        'Standard processing speed',
        'Email support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$19.99',
      credits: 2000,
      features: [
        'Access to all tools',
        'Generous credit allocation',
        'Priority processing speed',
        'Priority email support',
        'Save unlimited documents'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$49.99',
      credits: 5000,
      features: [
        'Access to all tools',
        'Maximum credit allocation',
        'Fastest processing speed',
        'Priority phone support',
        'Team member accounts',
        'API access'
      ]
    }
  ];
  
  const handlePlanSelect = (plan: 'free' | 'basic' | 'premium' | 'enterprise') => {
    setSelectedPlan(plan);
    if (plan !== 'free') {
      setShowPaymentForm(true);
    } else {
      setShowPaymentForm(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const selectedPlanData = plans.find(plan => plan.id === selectedPlan);
      
      if (selectedPlanData && user) {
        updateUser({
          plan: selectedPlan,
          credits: selectedPlanData.credits,
          maxCredits: selectedPlanData.credits
        });
      }
      
      setProcessing(false);
      setSuccess(true);
      
      // Reset after showing success message
      setTimeout(() => {
        setSuccess(false);
        setShowPaymentForm(false);
      }, 3000);
    }, 2000);
  };
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="text-gray-600">Manage your subscription plan and payment methods</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {plans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPlan === plan.id 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                    onClick={() => handlePlanSelect(plan.id as any)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{plan.name}</h3>
                        <p className="text-gray-500">{plan.price}/month</p>
                      </div>
                      {selectedPlan === plan.id && (
                        <CheckCircle className="text-indigo-500" size={20} />
                      )}
                    </div>
                    <p className="text-sm font-medium mb-2">{plan.credits} credits/month</p>
                    <ul className="space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
              
              {user?.plan && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-2">Current Plan: {plans.find(p => p.id === user.plan)?.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Credits: {user.credits} / {user.maxCredits}
                  </p>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                    <div 
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${(user.credits / user.maxCredits) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Next billing date: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
              )}
              
              {showPaymentForm && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">Payment Information</h3>
                  
                  {success ? (
                    <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center">
                      <CheckCircle className="mr-2" size={20} />
                      Payment successful! Your plan has been updated.
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <Input
                          label="Cardholder Name"
                          placeholder="John Doe"
                          fullWidth
                          leftIcon={<User size={18} />}
                          required
                        />
                        
                        <Input
                          label="Card Number"
                          placeholder="1234 5678 9012 3456"
                          fullWidth
                          leftIcon={<CreditCardIcon size={18} />}
                          required
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="Expiration Date"
                            placeholder="MM/YY"
                            fullWidth
                            leftIcon={<Calendar size={18} />}
                            required
                          />
                          
                          <Input
                            label="CVC"
                            placeholder="123"
                            fullWidth
                            type="password"
                            required
                          />
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <h4 className="font-medium mb-2">Order Summary</h4>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">
                              {plans.find(p => p.id === selectedPlan)?.name} Plan
                            </span>
                            <span className="font-medium">
                              {plans.find(p => p.id === selectedPlan)?.price}/month
                            </span>
                          </div>
                          <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-medium">
                            <span>Total</span>
                            <span>{plans.find(p => p.id === selectedPlan)?.price}/month</span>
                          </div>
                        </div>
                        
                        <Button
                          type="submit"
                          fullWidth
                          isLoading={processing}
                          leftIcon={<DollarSign size={18} />}
                        >
                          {processing ? 'Processing...' : `Pay ${plans.find(p => p.id === selectedPlan)?.price}`}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Additional Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Need more credits without changing your plan? Purchase additional credit packs.
              </p>
              
              <div className="space-y-3">
                <motion.div 
                  className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 cursor-pointer"
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Small Pack</h4>
                    <span className="text-indigo-600 font-semibold">$4.99</span>
                  </div>
                  <p className="text-sm text-gray-600">100 additional credits</p>
                </motion.div>
                
                <motion.div 
                  className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 cursor-pointer"
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Medium Pack</h4>
                    <span className="text-indigo-600 font-semibold">$9.99</span>
                  </div>
                  <p className="text-sm text-gray-600">250 additional credits</p>
                </motion.div>
                
                <motion.div 
                  className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 cursor-pointer"
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Large Pack</h4>
                    <span className="text-indigo-600 font-semibold">$19.99</span>
                  </div>
                  <p className="text-sm text-gray-600">600 additional credits</p>
                </motion.div>
              </div>
              
              <Button
                variant="outline"
                className="mt-4"
                fullWidth
                leftIcon={<CreditCard size={18} />}
              >
                Purchase Credits
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-3 flex items-center">
                  <div className="bg-gray-100 p-2 rounded-md mr-3">
                    <CreditCard size={18} className="text-gray-700" />
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/25</p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                >
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;