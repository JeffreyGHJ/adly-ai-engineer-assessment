import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Type, 
  Search, 
  Bot, 
  Trash2,
  Edit,
  Plus,
  Filter,
  SortDesc,
  Calendar,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useTool } from '../context/ToolContext';
import { truncateText } from '../lib/utils';

const DocumentsPage = () => {
  const { documents, deleteDocument } = useTool();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'humanizer' | 'plagiarism' | 'ai-detector'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  
  const filteredDocuments = documents
    .filter(doc => {
      // Apply search filter
      if (searchTerm && !doc.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Apply tool type filter
      if (filter !== 'all' && doc.toolType !== filter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === 'newest') {
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      } else {
        return new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime();
      }
    });
  
  const getToolIcon = (toolType: string) => {
    switch (toolType) {
      case 'humanizer':
        return <Type size={18} className="text-indigo-600" />;
      case 'plagiarism':
        return <Search size={18} className="text-purple-600" />;
      case 'ai-detector':
        return <Bot size={18} className="text-green-600" />;
      default:
        return <FileText size={18} className="text-gray-600" />;
    }
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      deleteDocument(id);
    }
  };
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
        <p className="text-gray-600">Manage all your saved documents in one place</p>
      </div>
      
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <CardTitle>All Documents</CardTitle>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Plus size={16} />}
            >
              New Document
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="w-full md:w-1/3">
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Filter size={16} />}
                >
                  Filter: {filter === 'all' ? 'All Types' : filter}
                </Button>
                <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-md overflow-hidden z-10 hidden group-hover:block">
                  <button 
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                    onClick={() => setFilter('all')}
                  >
                    All Types
                  </button>
                  <button 
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                    onClick={() => setFilter('humanizer')}
                  >
                    Humanizer
                  </button>
                  <button 
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                    onClick={() => setFilter('plagiarism')}
                  >
                    Plagiarism
                  </button>
                  <button 
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                    onClick={() => setFilter('ai-detector')}
                  >
                    AI Detector
                  </button>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                leftIcon={<SortDesc size={16} />}
                onClick={() => setSortBy(sortBy === 'newest' ? 'oldest' : 'newest')}
              >
                Sort: {sortBy === 'newest' ? 'Newest' : 'Oldest'}
              </Button>
            </div>
          </div>
          
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="text-gray-400" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-500">
                {documents.length === 0
                  ? "You haven't created any documents yet."
                  : "No documents match your search or filter criteria."}
              </p>
              {documents.length === 0 && (
                <Button className="mt-4">
                  Create Your First Document
                </Button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
                <motion.div
                  key={doc.id}
                  className="py-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex items-center flex-1 mb-3 md:mb-0">
                      <div className="p-2 mr-4 bg-gray-100 rounded-md">
                        {getToolIcon(doc.toolType)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">{doc.title}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Calendar size={12} className="mr-1" />
                            Created: {new Date(doc.createdAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Clock size={12} className="mr-1" />
                            Modified: {new Date(doc.lastModified).toLocaleDateString()}
                          </span>
                          <span className="capitalize">
                            {doc.toolType}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Edit size={16} />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                        leftIcon={<Trash2 size={16} />}
                        onClick={() => handleDelete(doc.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-3 ml-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs font-medium text-gray-500 mb-1">Original Text</p>
                      <p className="text-sm text-gray-700">{truncateText(doc.content, 150)}</p>
                    </div>
                    
                    {doc.processedContent && (
                      <div className="bg-indigo-50 p-3 rounded-md">
                        <p className="text-xs font-medium text-gray-500 mb-1">Processed Text</p>
                        <p className="text-sm text-gray-700">{truncateText(doc.processedContent, 150)}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsPage;