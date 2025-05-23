import React from "react";
import { motion } from "framer-motion";
import {
  BarChart2,
  TrendingUp,
  Clock,
  Calendar,
  Type,
  Search,
  Bot,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";

const UsagePage = () => {
  const { user } = useAuth();

  // Calculate percentages for tool usage
  const totalUsage = (user?.humanizer_count || 0) + (user?.plagiarism_count || 0) + (user?.ai_detector_count || 0);
  const humanizerPercentage = totalUsage ? ((user?.humanizer_count || 0) / totalUsage) * 100 : 0;
  const plagiarismPercentage = totalUsage ? ((user?.plagiarism_count || 0) / totalUsage) * 100 : 0;
  const aiDetectorPercentage = totalUsage ? ((user?.ai_detector_count || 0) / totalUsage) * 100 : 0;

  // Mock data for demonstration
  const mockStats = {
    creditsUsedToday: 15,
    creditsUsedThisWeek: 87,
    creditsUsedThisMonth: 342,
    averageDailyUsage: 12,
    peakUsageDay: "Wednesday",
    peakUsageTime: "2-4 PM",
    creditEfficiency: 92, // percentage
    toolAccuracy: 95, // percentage
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Usage Statistics</h1>
        <p className="text-gray-600">
          Track your credit usage and tool performance metrics
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Credits Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Credits Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Available Credits</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {user?.credits}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${(user?.credits || 0) / (user?.max_credits || 100) * 100}%`,
                    }}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {((user?.credits || 0) / (user?.max_credits || 100) * 100).toFixed(1)}% remaining
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Today's Usage</span>
                  <div className="flex items-center text-green-600">
                    <ArrowUpRight size={16} className="mr-1" />
                    <span className="text-sm font-medium">
                      {mockStats.creditsUsedToday} credits
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <div className="flex items-center text-red-600">
                    <ArrowDownRight size={16} className="mr-1" />
                    <span className="text-sm font-medium">
                      {mockStats.creditsUsedThisWeek} credits
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tool Usage Distribution Card */}
        <Card>
          <CardHeader>
            <CardTitle>Tool Usage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Type size={16} className="mr-2 text-indigo-600" />
                    <span className="text-sm text-gray-600">Humanizer</span>
                  </div>
                  <span className="text-sm font-medium">{user?.humanizer_count || 0} uses</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${humanizerPercentage}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Search size={16} className="mr-2 text-purple-600" />
                    <span className="text-sm text-gray-600">
                      Plagiarism Checker
                    </span>
                  </div>
                  <span className="text-sm font-medium">{user?.plagiarism_count || 0} uses</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${plagiarismPercentage}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Bot size={16} className="mr-2 text-green-600" />
                    <span className="text-sm text-gray-600">AI Detector</span>
                  </div>
                  <span className="text-sm font-medium">{user?.ai_detector_count || 0} uses</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${aiDetectorPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Patterns Card */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Clock size={18} className="mr-2 text-indigo-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Peak Usage Time</p>
                    <p className="text-xs text-gray-600">{mockStats.peakUsageTime}</p>
                  </div>
                </div>
                <TrendingUp size={18} className="text-green-500" />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2 text-indigo-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Most Active Day</p>
                    <p className="text-xs text-gray-600">{mockStats.peakUsageDay}</p>
                  </div>
                </div>
                <TrendingUp size={18} className="text-green-500" />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <BarChart2 size={18} className="mr-2 text-indigo-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Average Daily Usage</p>
                    <p className="text-xs text-gray-600">{mockStats.averageDailyUsage} credits</p>
                  </div>
                </div>
                <TrendingUp size={18} className="text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics Card */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Credit Efficiency</h3>
                <div className="mt-2 flex items-end">
                  <span className="text-2xl font-bold text-gray-900">{mockStats.creditEfficiency}%</span>
                  <span className="ml-2 text-sm text-green-600">+2.5%</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">Optimal credit utilization rate</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Tool Accuracy</h3>
                <div className="mt-2 flex items-end">
                  <span className="text-2xl font-bold text-gray-900">{mockStats.toolAccuracy}%</span>
                  <span className="ml-2 text-sm text-green-600">+1.2%</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">Average accuracy across all tools</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Processing Speed</h3>
                <div className="mt-2 flex items-end">
                  <span className="text-2xl font-bold text-gray-900">1.2s</span>
                  <span className="ml-2 text-sm text-green-600">-0.3s</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">Average response time</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600">Success Rate</h3>
                <div className="mt-2 flex items-end">
                  <span className="text-2xl font-bold text-gray-900">98.7%</span>
                  <span className="ml-2 text-sm text-green-600">+0.5%</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">Request completion rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsagePage;