import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Type,
  Search,
  Bot,
  Trash2,
  Eye,
  Plus,
  Filter,
  SortDesc,
  Calendar,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useTool } from "../context/ToolContext";
import { truncateText } from "../lib/utils";

const DocumentsPage = () => {
  const {
    documents,
    deleteDocument,
    setCurrentTool,
    loadDocuments,
    setCurrentDocument,
  } = useTool();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<
    "all" | "humanizer" | "plagiarism" | "ai-detector"
  >("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const navigate = useNavigate();

  useEffect(() => {
    loadDocuments();
  }, []);

  const filteredDocuments = documents
    .filter((doc) => {
      // Apply search filter
      if (
        searchTerm &&
        !doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Apply tool type filter
      if (filter !== "all" && doc.toolType !== filter) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === "newest") {
        return (
          new Date(b.lastModified).getTime() -
          new Date(a.lastModified).getTime()
        );
      } else {
        return (
          new Date(a.lastModified).getTime() -
          new Date(b.lastModified).getTime()
        );
      }
    });

  const getToolIcon = (toolType: string) => {
    switch (toolType) {
      case "humanizer":
        return <Type size={18} className="text-indigo-600" />;
      case "plagiarism":
        return <Search size={18} className="text-purple-600" />;
      case "ai-detector":
        return <Bot size={18} className="text-green-600" />;
      default:
        return <FileText size={18} className="text-gray-600" />;
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this document?")) {
      try {
        await deleteDocument(id);
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Failed to delete document. Please try again.");
      }
    }
  };

  const handleView = (doc: any) => {
    setCurrentDocument(doc);
    setCurrentTool(doc.toolType);
    navigate("/tools");
  };

  const handleCreateDocument = () => {
    setCurrentTool("humanizer");
    navigate("/tools");
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
        <p className="text-gray-600">
          Manage all your saved documents in one place
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle>All Documents</CardTitle>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Plus size={16} />}
              onClick={handleCreateDocument}
            >
              New Document
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
            <div className="w-full md:w-1/3">
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Filter size={16} />}
                  onClick={() =>
                    setFilter(
                      filter === "all"
                        ? "humanizer"
                        : filter === "humanizer"
                        ? "plagiarism"
                        : filter === "plagiarism"
                        ? "ai-detector"
                        : "all"
                    )
                  }
                >
                  Filter: {filter === "all" ? "All Types" : filter}
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                leftIcon={<SortDesc size={16} />}
                onClick={() =>
                  setSortBy(sortBy === "newest" ? "oldest" : "newest")
                }
              >
                Sort: {sortBy === "newest" ? "Newest" : "Oldest"}
              </Button>
            </div>
          </div>

          {filteredDocuments.length === 0 ? (
            <div className="py-12 text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full">
                <FileText className="text-gray-400" size={24} />
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                No documents found
              </h3>
              <p className="text-gray-500">
                {documents.length === 0
                  ? "You haven't created any documents yet."
                  : "No documents match your search or filter criteria."}
              </p>
              {documents.length === 0 && (
                <Button className="mt-4" onClick={handleCreateDocument}>
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
                        <h3 className="mb-1 font-medium text-gray-900">
                          {doc.title}
                        </h3>
                        <div className="flex flex-wrap text-xs text-gray-500 gap-x-4 gap-y-1">
                          <span className="flex items-center">
                            <Calendar size={12} className="mr-1" />
                            Created:{" "}
                            {new Date(doc.createdAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Clock size={12} className="mr-1" />
                            Modified:{" "}
                            {new Date(doc.lastModified).toLocaleDateString()}
                          </span>
                          <span className="capitalize">{doc.toolType}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Eye size={16} />}
                        onClick={() => handleView(doc)}
                      >
                        View
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

                  <div className="grid grid-cols-1 gap-4 mt-3 ml-10 md:grid-cols-2">
                    <div className="p-3 overflow-hidden break-words rounded-md bg-gray-50 text-ellipsis">
                      <p className="mb-1 text-xs font-medium text-gray-500 ">
                        Original Text
                      </p>
                      <p className="text-sm text-gray-700">
                        {truncateText(doc.content, 150)}
                      </p>
                    </div>

                    {doc.processedContent && (
                      <div className="p-3 rounded-md bg-indigo-50">
                        <p className="mb-1 text-xs font-medium text-gray-500">
                          Processed Text
                        </p>
                        <p className="text-sm text-gray-700">
                          {truncateText(doc.processedContent, 150)}
                        </p>
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
