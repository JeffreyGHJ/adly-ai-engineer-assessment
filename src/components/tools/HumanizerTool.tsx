import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Save, Copy, Edit } from "lucide-react";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { useAuth } from "../../context/AuthContext";
import { useTool } from "../../context/ToolContext";

const HumanizerTool = () => {
  const { user, updateUser } = useAuth();
  const { processText, addDocument, updateDocument, currentDocument } =
    useTool();
  const [inputText, setInputText] = useState(
    currentDocument ? currentDocument.content : ""
  );
  const [outputText, setOutputText] = useState(
    currentDocument ? currentDocument.processedContent : ""
  );
  const [title, setTitle] = useState(
    currentDocument ? currentDocument.title : ""
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleProcess = async () => {
    if (!inputText || inputText.trim().length === 0) return;

    if (!user || user.credits <= 0) {
      alert("You do not have enough credits. Please upgrade your plan.");
      return;
    }

    setIsProcessing(true);

    try {
      const result = await processText(inputText, "humanizer");
      setOutputText(result);

      // Deduct credits
      if (user) {
        updateUser({
          credits: Math.max(0, user.credits - 1),
          humanizer_count: (user.humanizer_count || 0) + 1,
        });
      }
    } catch (error) {
      console.error("Error processing text:", error);
      alert("An error occurred while processing your text. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = () => {
    console.log("humanizer - handleSave");
    console.log("current:", currentDocument);
    if (currentDocument) {
      updateDocument(currentDocument.id.toString(), {
        title: currentDocument.title === title ? currentDocument.title : title,
        content: inputText,
        processedContent: outputText,
        toolType: "humanizer",
      });
      alert("Document updated successfully!");
    } else if (inputText && outputText) {
      addDocument({
        title: title
          ? title
          : `Humanized Text ${new Date().toLocaleDateString()}`,
        content: inputText,
        processedContent: outputText,
        toolType: "humanizer",
      });

      alert("Document saved successfully!");
    } else {
      console.log("inputText && outputText !== true");
    }
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (currentDocument) setTitle(currentDocument.title);
  }, [currentDocument]);

  return (
    <div className="p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Text Humanizer</h2>
          <p className="text-gray-600">
            Rewrite your text to sound more natural and human-like
          </p>
        </div>

        {title && (
          <div className="flex items-center mb-6 ml-4">
            <h2 className="mr-3 text-xl font-bold text-gray-800">Title:</h2>
            <input
              type="text"
              value={title}
              className="px-2 py-1 text-gray-600 border rounded-md bg-slate-100 w-72"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="h-full">
            <CardContent className="p-0">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-medium text-gray-800">
                  Input Text
                </h3>
                <p className="text-sm text-gray-500">
                  Paste your text that needs humanizing
                </p>
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
              <div className="flex justify-end p-4 border-t border-gray-100 bg-gray-50">
                <Button
                  variant="primary"
                  onClick={handleProcess}
                  isLoading={isProcessing}
                  disabled={isProcessing || !inputText}
                  leftIcon={<Sparkles size={16} />}
                >
                  {isProcessing ? "Humanizing..." : "Humanize Text"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardContent className="p-0">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-medium text-gray-800">
                  Humanized Output
                </h3>
                <p className="text-sm text-gray-500">
                  Your text, transformed to sound more human
                </p>
              </div>
              <div className="p-4 rounded-md bg-gray-50">
                <div className="min-h-[300px]">
                  {outputText ? (
                    <div className="text-base whitespace-pre-wrap">
                      {outputText}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-center text-gray-400">
                        Processed text will appear here
                        <br />
                        <span className="text-sm">
                          Click the Humanize button to get started
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50">
                {user && (
                  <span className="text-sm text-gray-500">
                    Credits remaining: <strong>{user.credits}</strong>
                  </span>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleCopy}
                    disabled={!outputText}
                    leftIcon={<Copy size={16} />}
                  >
                    {copied ? "Copied!" : "Copy"}
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

export default HumanizerTool;
