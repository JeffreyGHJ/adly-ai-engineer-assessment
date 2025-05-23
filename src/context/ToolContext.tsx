import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

export type ToolType = "humanizer" | "plagiarism" | "ai-detector";

export interface Document {
  id: string;
  title: string;
  content: string;
  processedContent?: string;
  toolType: ToolType;
  createdAt: Date;
  lastModified: Date;
}

interface ToolContextType {
  currentTool: ToolType;
  setCurrentTool: (tool: ToolType) => void;
  documents: Document[];
  currentDocument: Document | null;
  setCurrentDocument: (document: Document | null) => void;
  addDocument: (document: Partial<Document>) => Promise<Document>;
  updateDocument: (id: string, updates: Partial<Document>) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  processText: (text: string, tool: ToolType) => Promise<string>;
  loadDocuments: () => Promise<void>;
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
}

const ToolContext = createContext<ToolContextType | undefined>(undefined);

export function ToolProvider({ children }: { children: React.ReactNode }) {
  const [currentTool, setCurrentTool] = useState<ToolType>("humanizer");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadDocuments();
    }
  }, [user]);

  const loadDocuments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedDocuments = data.map((doc) => {
        // console.log(doc);
        return {
          id: doc.id,
          title: doc.title,
          content: doc.content,
          processedContent: doc.processed_content,
          toolType: doc.tool_type as ToolType,
          createdAt: new Date(doc.created_at),
          lastModified: new Date(doc.updated_at),
        };
      });

      setDocuments(formattedDocuments);
    } catch (error) {
      console.error("Error loading documents:", error);
    }
  };

  const addDocument = async (
    documentData: Partial<Document>
  ): Promise<Document> => {
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("documents")
      .insert([
        {
          user_id: user.id,
          title: documentData.title || "Untitled Document",
          content: documentData.content || "",
          processed_content: documentData.processedContent,
          tool_type: documentData.toolType || "humanizer",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    const newDocument: Document = {
      id: data.id,
      title: data.title,
      content: data.content,
      processedContent: data.processed_content,
      toolType: data.tool_type as ToolType,
      createdAt: new Date(data.created_at),
      lastModified: new Date(data.updated_at),
    };

    setDocuments((prev) => [newDocument, ...prev]);
    console.log("Setting current document: ", newDocument);
    setCurrentDocument(newDocument);
    return newDocument;
  };

  const updateDocument = async (id: string, updates: Partial<Document>) => {
    const { error } = await supabase
      .from("documents")
      .update({
        title: updates.title,
        content: updates.content,
        processed_content: updates.processedContent,
        tool_type: updates.toolType,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) throw error;

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, ...updates, lastModified: new Date() } : doc
      )
    );

    if (currentDocument?.id === id) {
      setCurrentDocument((prev) =>
        prev ? { ...prev, ...updates, lastModified: new Date() } : null
      );
    }
  };

  const deleteDocument = async (id: string) => {
    const { error } = await supabase.from("documents").delete().eq("id", id);

    if (error) throw error;

    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    if (currentDocument?.id === id) {
      setCurrentDocument(null);
    }
  };

  const processText = async (text: string, tool: ToolType): Promise<string> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let result = "";
    switch (tool) {
      case "humanizer":
        result = text
          .split(". ")
          .map((sentence, i) => {
            if (i % 2 === 0) return sentence + ", actually";
            if (i % 3 === 0) return "I mean, " + sentence.toLowerCase();
            return sentence;
          })
          .join(". ");

        // Automatically save the document
        if (user) {
          await addDocument({
            title: `Humanized Text ${new Date().toLocaleDateString()}`,
            content: text,
            processedContent: result,
            toolType: "humanizer",
          });
        }
        break;

      case "plagiarism":
        result = `Plagiarism analysis complete. This text appears to be ${Math.floor(
          Math.random() * 15
        )}% similar to existing content.`;
        // Automatically save the document
        if (user) {
          await addDocument({
            title: `Plagiarism Detection ${new Date().toLocaleDateString()}`,
            content: text,
            processedContent: result,
            toolType: "plagiarism",
          });
        }
        break;

      case "ai-detector":
        // eslint-disable-next-line no-case-declarations
        const aiScore = Math.floor(Math.random() * 100);
        result = `AI Probability Score: ${aiScore}%. ${
          aiScore > 70
            ? "This text was likely generated by AI."
            : "This text was likely written by a human."
        }`;
        // Automatically save the document
        if (user) {
          await addDocument({
            title: `AI Detection ${new Date().toLocaleDateString()}`,
            content: text,
            processedContent: result,
            toolType: "ai-detector",
          });
        }
        break;

      default:
        result = text;
    }

    return result;
  };

  const value = {
    currentTool,
    setCurrentTool,
    documents,
    currentDocument,
    setCurrentDocument,
    addDocument,
    updateDocument,
    deleteDocument,
    processText,
    loadDocuments,
    sidebarExpanded,
    setSidebarExpanded,
  };

  return <ToolContext.Provider value={value}>{children}</ToolContext.Provider>;
}

export function useTool() {
  const context = useContext(ToolContext);
  if (context === undefined) {
    throw new Error("useTool must be used within a ToolProvider");
  }
  return context;
}
