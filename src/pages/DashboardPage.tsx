import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart2,
  FileText,
  Type,
  Search,
  Bot,
  ArrowRight,
  Clock,
  ChevronUp,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useTool } from "../context/ToolContext";

const DashboardPage = () => {
  const { user } = useAuth();
  const { documents, setCurrentTool, setCurrentDocument } = useTool();
  const navigate = useNavigate();
  const recentDocuments = documents.slice(0, 5);

  // Mock stats for demonstration
  const stats = {
    creditsUsed: user?.max_credits ? user.max_credits - user.credits : 0,
    documentsCount: documents.length,
    humanized: user?.humanizer_count,
    plagiarismChecks: user?.plagiarism_count,
    aiDetections: user?.ai_detector_count,
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's an overview of your account and recent activity.
        </p>
      </div>

      <div
        id="dashboard-stats"
        className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3 xl:grid-cols-5"
      >
        <motion.div
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="h-full">
            <CardContent className="h-full p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-indigo-100 rounded-md">
                  <BarChart2 size={20} className="text-indigo-600" />
                </div>
                <span className="flex items-center text-sm font-medium text-green-500">
                  <ChevronUp size={16} />
                  12%
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-500">
                Credits Used
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {stats.creditsUsed}
              </p>
              <div className="w-full h-2 mt-4 overflow-hidden bg-gray-100 rounded-full">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{
                    width: `${
                      (stats.creditsUsed / (user?.max_credits || 100)) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {user?.credits} credits remaining of {user?.max_credits}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="h-full ">
            <CardContent className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-md bg-sky-100">
                  <FileText size={20} className="text-sky-600" />
                </div>
                <span className="flex items-center text-sm font-medium text-green-500">
                  <TrendingUp size={16} />
                  5%
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-500">
                Total Documents
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {stats.documentsCount}
              </p>
              <p className="mt-auto text-xs text-gray-500 h-fit">
                {stats.documentsCount > 0
                  ? `Last updated ${new Date().toLocaleDateString()}`
                  : "No documents yet"}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardContent className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-pink-100 rounded-md">
                  <Type size={20} className="text-pink-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-500">
                Texts Humanized
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {stats.humanized}
              </p>
              <p className="mt-auto text-xs text-gray-500">
                {stats?.humanized && stats.humanized > 0
                  ? `${Math.round(
                      (stats?.humanized / stats.documentsCount) * 100
                    )}% of all documents`
                  : "No humanized texts yet"}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="h-full">
            <CardContent className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-100 rounded-md">
                  <Search size={20} className="text-purple-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-500">
                Plagiarism Checks
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {stats.plagiarismChecks}
              </p>
              <p className="mt-auto text-xs text-gray-500">
                {stats?.plagiarismChecks && stats.plagiarismChecks > 0
                  ? `${Math.round(
                      (stats.plagiarismChecks / stats.documentsCount) * 100
                    )}% of all documents`
                  : "No plagiarism checks yet"}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardContent className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-md">
                  <Bot size={20} className="text-green-700" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-500">AI Checks</h3>
              <p className="text-2xl font-bold text-gray-900">
                {stats.aiDetections}
              </p>
              <p className="mt-auto text-xs text-gray-500">
                {stats?.aiDetections && stats.aiDetections > 0
                  ? `${Math.round(
                      (stats.aiDetections / stats.documentsCount) * 100
                    )}% of all documents`
                  : "No humanized texts yet"}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {recentDocuments.length > 0 ? (
                <div className="space-y-4">
                  {recentDocuments.map((doc, index) => {
                    return (
                      <div
                        key={doc.id + ":" + index}
                        className="flex items-center justify-between p-3 rounded-md bg-gray-50"
                      >
                        <div className="flex items-center">
                          <div className="p-2 mr-3 bg-gray-100 rounded-md">
                            {doc.toolType === "humanizer" && (
                              <Type size={16} className="text-indigo-600" />
                            )}
                            {doc.toolType === "plagiarism" && (
                              <Search size={16} className="text-purple-600" />
                            )}
                            {doc.toolType === "ai-detector" && (
                              <Bot size={16} className="text-green-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {doc.title}
                            </h4>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock size={12} className="mr-1" />
                              {new Date(doc.lastModified).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <Link
                          to="/tools"
                          onClick={() => {
                            setCurrentTool(doc.toolType);
                            setCurrentDocument(doc);
                          }}
                        >
                          <Button size="sm" variant="ghost">
                            View
                          </Button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="mb-4 text-gray-500">
                    You don't have any documents yet
                  </p>
                  <Link to="/tools">
                    <Button>Create Your First Document</Button>
                  </Link>
                </div>
              )}

              {recentDocuments.length > 0 && (
                <div className="mt-4 text-center">
                  <Link to="/documents">
                    <Button variant="outline">View All Documents</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <button
                  className="flex items-center justify-between w-full p-4 text-indigo-700 transition-colors rounded-lg bg-indigo-50 hover:bg-indigo-100"
                  onClick={() => {
                    setCurrentTool("humanizer");
                    setCurrentDocument(null);
                    navigate("/tools");
                  }}
                >
                  <div className="flex items-center">
                    <Type size={18} className="mr-2" />
                    <span>Text Humanizer</span>
                  </div>
                  <ArrowRight size={16} />
                </button>

                <button
                  className="flex items-center justify-between w-full p-4 text-purple-700 transition-colors rounded-lg bg-purple-50 hover:bg-purple-100"
                  onClick={() => {
                    setCurrentTool("plagiarism");
                    setCurrentDocument(null);
                    navigate("/tools");
                  }}
                >
                  <div className="flex items-center">
                    <Search size={18} className="mr-2" />
                    <span>Plagiarism Checker</span>
                  </div>
                  <ArrowRight size={16} />
                </button>

                <button
                  className="flex items-center justify-between w-full p-4 text-green-700 transition-colors rounded-lg bg-green-50 hover:bg-green-100"
                  onClick={() => {
                    setCurrentTool("ai-detector");
                    setCurrentDocument(null);
                    navigate("/tools");
                  }}
                >
                  <div className="flex items-center">
                    <Bot size={18} className="mr-2" />
                    <span>AI Detector</span>
                  </div>
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="mt-6">
                <h4 className="mb-3 text-sm font-medium text-gray-900">
                  Plan: {user?.plan}
                </h4>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <p className="mb-3 text-sm text-gray-600">
                    Credits: {user?.credits} / {user?.max_credits}
                  </p>
                  <div className="w-full h-2 mb-4 overflow-hidden bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{
                        width: `${
                          ((user?.credits || 0) / (user?.max_credits || 100)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <Link to="/billing">
                    <Button variant="outline" size="sm" fullWidth>
                      Upgrade Plan
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
