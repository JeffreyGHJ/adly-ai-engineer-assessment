import React from 'react';
import { useTool } from '../context/ToolContext';
import HumanizerTool from '../components/tools/HumanizerTool';
import PlagiarismChecker from '../components/tools/PlagiarismChecker';
import AIDetector from '../components/tools/AIDetector';

const ToolsPage = () => {
  const { currentTool } = useTool();
  
  const renderTool = () => {
    switch (currentTool) {
      case 'humanizer':
        return <HumanizerTool />;
      case 'plagiarism':
        return <PlagiarismChecker />;
      case 'ai-detector':
        return <AIDetector />;
      default:
        return <HumanizerTool />;
    }
  };
  
  return (
    <div className="flex-1 overflow-auto">
      {renderTool()}
    </div>
  );
};

export default ToolsPage;