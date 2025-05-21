import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BarChart2, 
  FileText, 
  Type, 
  Search, 
  Bot, 
  ArrowRight, 
  Clock,
  ChevronUp,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useTool } from '../context/ToolContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const { documents, setCurrentTool } = useTool();
  
  const recentDocuments = documents.slice(0, 5);
  
  // Mock stats for demonstration
  const stats = {
    creditsUsed: user?.maxCredits ? user.maxCredits - user.credits : 0,
    documentsCount: documents.length,
    humanized: documents.filter(doc => doc.toolType === 'humanizer').length,
    plagiarismChecks: documents.filter(doc => doc.toolType === 'plagiarism').length,
    aiDetections: documents.filter(doc => doc.toolType === 'ai-detector').length
  };
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's an overview of your account and recent activity.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-indigo-100 rounded-md">
                  <BarChart2 size={20} className="text-indigo-600" />
                </div>
                <span className="text-green-500 flex items-center text-sm font-medium">
                  <ChevronUp size={16} />
                  12%
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Credits Used</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.creditsUsed}</p>
              <div className="mt-4 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${(stats.creditsUsed / (user?.maxCredits || 100)) * 100}%` }}
                ></div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {user?.credits} credits remaining of {user?.maxCredits}
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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-sky-100 rounded-md">
                  <FileText size={20} className="text-sky-600" />
                </div>
                <span className="text-green-500 flex items-center text-sm font-medium">
                  <TrendingUp size={16} />
                  5%
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Total Documents</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.documentsCount}</p>
              <p className="mt-2 text-xs text-gray-500">
                {stats.documentsCount > 0 ? `Last updated ${new Date().toLocaleDateString()}` : 'No documents yet'}
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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-pink-100 rounded-md">
                  <Type size={20} className="text-pink-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Texts Humanized</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.humanized}</p>
              <p className="mt-2 text-xs text-gray-500">
                {stats.humanized > 0 ? `${Math.round(stats.humanized / stats.documentsCount * 100)}% of all documents` : 'No humanized texts yet'}
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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-100 rounded-md">
                  <Search size={20} className="text-purple-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Plagiarism Checks</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.plagiarismChecks}</p>
              <p className="mt-2 text-xs text-gray-500">
                {stats.plagiarismChecks > 0 ? `${Math.round(stats.plagiarismChecks / stats.documentsCount * 100)}% of all documents` : 'No plagiarism checks yet'}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {recentDocuments.length > 0 ? (
                <div className="space-y-4">
                  {recentDocuments.map((doc, index) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <div className="p-2 mr-3 rounded-md bg-gray-100">
                          {doc.toolType === 'humanizer' && <Type size={16} className="text-indigo-600" />}
                          {doc.toolType === 'plagiarism' && <Search size={16} className="text-purple-600" />}
                          {doc.toolType === 'ai-detector' && <Bot size={16} className="text-green-600" />}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{doc.title}</h4>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock size={12} className="mr-1" />
                            {new Date(doc.lastModified).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Link to="/documents">
                        <Button size="sm" variant="ghost">
                          View
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You don't have any documents yet</p>
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
                  className="w-full flex items-center justify-between p-4 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
                  onClick={() => {
                    setCurrentTool('humanizer');
                  }}
                >
                  <div className="flex items-center">
                    <Type size={18} className="mr-2" />
                    <span>Text Humanizer</span>
                  </div>
                  <ArrowRight size={16} />
                </button>
                
                <button 
                  className="w-full flex items-center justify-between p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                  onClick={() => {
                    setCurrentTool('plagiarism');
                  }}
                >
                  <div className="flex items-center">
                    <Search size={18} className="mr-2" />
                    <span>Plagiarism Checker</span>
                  </div>
                  <ArrowRight size={16} />
                </button>
                
                <button 
                  className="w-full flex items-center justify-between p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                  onClick={() => {
                    setCurrentTool('ai-detector');
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
                <h4 className="text-sm font-medium text-gray-900 mb-3">Plan: {user?.plan}</h4>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-3">
                    Credits: {user?.credits} / {user?.maxCredits}
                  </p>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                    <div 
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${(user?.credits || 0) / (user?.maxCredits || 100) * 100}%` }}
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