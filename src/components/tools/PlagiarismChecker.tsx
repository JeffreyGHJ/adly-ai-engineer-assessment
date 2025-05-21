import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Save, Copy } from 'lucide-react';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { useAuth } from '../../context/AuthContext';
import { useTool } from '../../context/ToolContext';

const PlagiarismChecker = () => {
  const { user, updateUser } = useAuth();
  const { processText, addDocument } = useTool();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleProcess = async () => {
    if (!inputText || inputText.trim().length === 0) return;
    
    if (!user || user.credits <= 0) {
      alert('You do not have enough credits. Please upgrade your plan.');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const result = await processText(inputText, 'plagiarism');
      setOutputText(result);
      
      // Deduct credits
      if (user) {
        updateUser({ credits: Math.max(0, user.credits - 2) }); // Plagiarism check costs more
      }
    } catch (error) {
      console.error('Error checking plagiarism:', error);
      alert('An error occurred while checking. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleSave = () => {
    if (inputText && outputText) {
      addDocument({
        title: `Plagiarism Check ${new Date().toLocaleDateString()}`,
        content: inputText,
        processedContent: outputText,
        toolType: 'plagiarism'
      });
      
      alert('Document saved successfully!');
    }
  };
  
  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Plagiarism Checker</h2>
          <p className="text-gray-600">Check your text against billions of web pages for plagiarism</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="h-full">
            <CardContent className="p-0">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-medium text-gray-800">Input Text</h3>
                <p className="text-sm text-gray-500">Paste your text to check for plagiarism</p>
              </div>
              <div className="p-4">
                <Textarea
                  className="min-h-[300px] text-base"
                  placeholder="Type or paste your text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  fullWidth
                />
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                <Button
                  variant="primary"
                  onClick={handleProcess}
                  isLoading={isProcessing}
                  disabled={isProcessing || !inputText}
                  leftIcon={<Search size={16} />}
                >
                  {isProcessing ? 'Checking...' : 'Check Plagiarism'}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardContent className="p-0">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-medium text-gray-800">Plagiarism Results</h3>
                <p className="text-sm text-gray-500">See detailed results of your plagiarism check</p>
              </div>
              <div className="p-4 bg-gray-50 min-h-[300px] rounded-md">
                {outputText ? (
                  <div className="whitespace-pre-wrap text-base">
                    {outputText}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400 text-center">
                      Plagiarism check results will appear here
                      <br />
                      <span className="text-sm">Click the Check Plagiarism button to get started</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between">
                <div>
                  {user && (
                    <span className="text-sm text-gray-500">
                      Credits remaining: <strong>{user.credits}</strong>
                      <span className="text-xs ml-2">(2 credits per check)</span>
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleCopy}
                    disabled={!outputText}
                    leftIcon={<Copy size={16} />}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleSave}
                    disabled={!outputText}
                    leftIcon={<Save size={16} />}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default PlagiarismChecker;