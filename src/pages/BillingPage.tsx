import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Calendar,
  User,
  DollarSign,
  CheckCircle,
  CreditCard as CreditCardIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import { cn } from "../lib/utils";

interface CreditPack {
  name: string;
  credits: number;
  price: string;
}

const creditPacks: CreditPack[] = [
  { name: "Small Pack", credits: 100, price: "$4.99" },
  { name: "Medium Pack", credits: 250, price: "$9.99" },
  { name: "Large Pack", credits: 600, price: "$19.99" },
];

const BillingPage = () => {
  const { user, updateUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<
    "free" | "basic" | "premium" | "enterprise"
  >(user?.plan || "free");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedPack, setSelectedPack] = useState(creditPacks[0]);
  const [processingPack, setProcessingPack] = useState(false);

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      credits: 50,
      features: [
        "Access to all tools",
        "Limited credits per month",
        "Basic support",
      ],
    },
    {
      id: "basic",
      name: "Basic",
      price: "$9.99",
      credits: 500,
      features: [
        "Access to all tools",
        "Increased monthly credits",
        "Standard processing speed",
        "Email support",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "$19.99",
      credits: 2000,
      features: [
        "Access to all tools",
        "Generous credit allocation",
        "Priority processing speed",
        "Priority email support",
        "Save unlimited documents",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$49.99",
      credits: 5000,
      features: [
        "Access to all tools",
        "Maximum credit allocation",
        "Fastest processing speed",
        "Priority phone support",
        "Team member accounts",
        "API access",
      ],
    },
  ];

  const handlePlanSelect = (
    plan: "free" | "basic" | "premium" | "enterprise"
  ) => {
    setSelectedPlan(plan);
    if (plan !== "free") {
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
      const selectedPlanData = plans.find((plan) => plan.id === selectedPlan);

      if (selectedPlanData && user) {
        updateUser({
          plan: selectedPlan,
          credits: selectedPlanData.credits,
          max_credits: selectedPlanData.credits,
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

  const handlePurchaseCredits = async (pack: CreditPack) => {
    if (!user) return;
    setProcessingPack(true);

    const newCredits = user.credits + pack.credits;
    const newMaxCredits = Math.max(user.max_credits, newCredits);

    try {
      await updateUser({
        credits: newCredits,
        max_credits: newMaxCredits,
      });
      setTimeout(() => {
        alert(`Successfully purchased ${pack.credits} credits!`);
        setProcessingPack(false);
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        console.error("Error purchasing credits:", error);
        alert("Failed to purchase credits. Please try again.");
        setProcessingPack(false);
      }, 2000);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Billing & Subscription
        </h1>
        <p className="text-gray-600">
          Manage your subscription plan and payment methods
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
                {plans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPlan === plan.id
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300"
                    }`}
                    onClick={() => handlePlanSelect(plan.id as any)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{plan.name}</h3>
                        <p className="text-gray-500">{plan.price}/month</p>
                      </div>
                      {selectedPlan === plan.id && (
                        <CheckCircle className="text-indigo-500" size={20} />
                      )}
                    </div>
                    <p className="mb-2 text-sm font-medium">
                      {plan.credits} credits/month
                    </p>
                    <ul className="space-y-1">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start text-sm text-gray-600"
                        >
                          <span className="mr-2 text-green-500">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {user?.plan && (
                <div className="p-4 mb-6 rounded-lg bg-gray-50">
                  <h3 className="mb-2 font-medium">
                    Current Plan: {plans.find((p) => p.id === user.plan)?.name}
                  </h3>
                  <p className="mb-2 text-sm text-gray-600">
                    Credits: {user.credits} / {user.max_credits}
                  </p>
                  <div className="w-full h-2 mb-4 overflow-hidden bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{
                        width: `${(user.credits / user.max_credits) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Next billing date:{" "}
                    {new Date(
                      Date.now() + 30 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
                  </p>
                </div>
              )}

              {showPaymentForm && (
                <div>
                  <h3 className="mb-4 text-lg font-semibold">
                    Payment Information
                  </h3>

                  {success ? (
                    <div className="flex items-center p-4 text-green-700 rounded-lg bg-green-50">
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

                        <div className="p-4 mb-4 rounded-lg bg-gray-50">
                          <h4 className="mb-2 font-medium">Order Summary</h4>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">
                              {plans.find((p) => p.id === selectedPlan)?.name}{" "}
                              Plan
                            </span>
                            <span className="font-medium">
                              {plans.find((p) => p.id === selectedPlan)?.price}
                              /month
                            </span>
                          </div>
                          <div className="flex justify-between pt-2 my-2 font-medium border-t border-gray-200">
                            <span>Total</span>
                            <span>
                              {plans.find((p) => p.id === selectedPlan)?.price}
                              /month
                            </span>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          fullWidth
                          isLoading={processing}
                          leftIcon={<DollarSign size={18} />}
                        >
                          {processing
                            ? "Processing..."
                            : `Pay ${
                                plans.find((p) => p.id === selectedPlan)?.price
                              }`}
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
              <p className="mb-4 text-gray-600">
                Need more credits without changing your plan? Purchase
                additional credit packs.
              </p>

              <div className="space-y-3">
                {creditPacks.map((pack, index) => (
                  <motion.div
                    key={index}
                    className={cn(
                      "p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-indigo-300",
                      selectedPack.name === pack.name && "border-indigo-300 "
                    )}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    onClick={() => setSelectedPack(pack)}
                  >
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{pack.name}</h4>
                      <span className="font-semibold text-indigo-600">
                        {pack.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {pack.credits} additional credits
                    </p>
                  </motion.div>
                ))}
              </div>

              <Button
                variant="outline"
                className="mt-4"
                isLoading={processingPack}
                fullWidth
                leftIcon={<CreditCard size={18} />}
                onClick={() => handlePurchaseCredits(selectedPack)}
              >
                {processingPack
                  ? "Processing..."
                  : `Purchase ${selectedPack.credits} Credits`}
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                  <div className="p-2 mr-3 bg-gray-100 rounded-md">
                    <CreditCard size={18} className="text-gray-700" />
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/25</p>
                  </div>
                </div>

                <Button variant="outline" size="sm" fullWidth>
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
