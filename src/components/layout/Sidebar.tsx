import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  FileText,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  CreditCard,
  Type,
  Search,
  Bot,
  BarChart2,
} from "lucide-react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useTool } from "../../context/ToolContext";
import { cn } from "../../lib/utils";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isExpanded: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, isExpanded, onClick }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 m-auto size-10 w-full rounded-md transition-colors",
        isActive
          ? "bg-indigo-50 text-indigo-700"
          : "text-gray-600 hover:bg-gray-100",
        isExpanded ? "justify-start pl-3" : "justify-center"
      )
    }
    onClick={onClick}
  >
    {icon}
    {isExpanded && <span className="font-medium">{label}</span>}
  </NavLink>
);

const ToolNavItem = ({
  toolType,
  icon,
  label,
  isExpanded,
  isActive,
  onClick,
}: {
  toolType: "humanizer" | "plagiarism" | "ai-detector";
  icon: React.ReactNode;
  label: string;
  isExpanded: boolean;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    className={cn(
      "flex items-center gap-3 m-auto size-10 justify-center rounded-md transition-colors w-full text-left",
      isActive
        ? "bg-indigo-50 text-indigo-700"
        : "text-gray-600 hover:bg-gray-100",
      isExpanded ? "justify-start pl-3" : "justify-center"
    )}
    onClick={onClick}
  >
    {icon}
    {isExpanded && <span className="font-medium">{label}</span>}
  </button>
);

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { logout } = useAuth();
  const { currentTool, setCurrentTool } = useTool();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToolChange = (
    toolType: "humanizer" | "plagiarism" | "ai-detector"
  ) => {
    setCurrentTool(toolType);
    navigate("/tools");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.aside
      className="flex flex-col h-screen bg-white border-r border-gray-200"
      initial={{ width: isExpanded ? 250 : 72 }}
      animate={{ width: isExpanded ? 250 : 72 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-between px-4 py-6 border-b border-gray-100">
        {isExpanded ? (
          <h1 className="text-xl font-bold text-indigo-600">TextPerfect</h1>
        ) : (
          <span className="text-xl font-bold text-indigo-600">TP</span>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 text-gray-500 rounded-md hover:bg-gray-100"
        >
          {isExpanded ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <div className="flex flex-col px-4 my-2 space-y-1 overflow-x-hidden overflow-y-auto flex-nowrap whitespace-nowrap">
          {isExpanded && (
            <p className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Main
            </p>
          )}
          <NavItem
            to="/dashboard"
            icon={<Home size={20} className="flex-shrink-0" />}
            label="Dashboard"
            isExpanded={isExpanded}
          />
          <NavItem
            to="/documents"
            icon={<FileText size={20} className="flex-shrink-0" />}
            label="My Documents"
            isExpanded={isExpanded}
          />
        </div>

        <div className="flex flex-col px-4 my-2 space-y-1 overflow-x-hidden overflow-y-auto flex-nowrap whitespace-nowrap">
          {isExpanded && (
            <p className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Tools
            </p>
          )}
          <ToolNavItem
            toolType="humanizer"
            icon={<Type size={20} className="flex-shrink-0" />}
            label="Humanizer"
            isExpanded={isExpanded}
            isActive={
              currentTool === "humanizer" && location.pathname.includes("tools")
            }
            onClick={() => handleToolChange("humanizer")}
          />
          <ToolNavItem
            toolType="plagiarism"
            icon={<Search size={20} className="flex-shrink-0" />}
            label="Plagiarism Checker"
            isExpanded={isExpanded}
            isActive={
              currentTool === "plagiarism" &&
              location.pathname.includes("tools")
            }
            onClick={() => handleToolChange("plagiarism")}
          />
          <ToolNavItem
            toolType="ai-detector"
            icon={<Bot size={20} className="flex-shrink-0" />}
            label="AI Detector"
            isExpanded={isExpanded}
            isActive={
              currentTool === "ai-detector" &&
              location.pathname.includes("tools")
            }
            onClick={() => handleToolChange("ai-detector")}
          />
        </div>

        <div className="flex flex-col px-4 my-2 space-y-1 overflow-x-hidden overflow-y-auto flex-nowrap whitespace-nowrap">
          {isExpanded && (
            <p className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Account
            </p>
          )}
          {/* <NavItem
            to="/usage"
            icon={<BarChart2 size={20} className="flex-shrink-0"/>}
            label="Usage"
            isExpanded={isExpanded}
          /> */}
          <NavItem
            to="/billing"
            icon={<CreditCard size={20} className="flex-shrink-0" />}
            label="Billing"
            isExpanded={isExpanded}
          />
          {/* <NavItem
            to="/settings"
            icon={<Settings size={20} className="flex-shrink-0"/>}
            label="Settings"
            isExpanded={isExpanded}
          /> */}
        </div>

        <div className="flex flex-col px-4 my-2 space-y-1 overflow-x-hidden overflow-y-auto flex-nowrap whitespace-nowrap">
          {isExpanded && (
            <p className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Support
            </p>
          )}
          <NavItem
            to="/contact"
            icon={<MessageSquare size={20} className="flex-shrink-0" />}
            label="Contact Us"
            isExpanded={isExpanded}
          />
          {/* <NavItem to="/help" icon={<HelpCircle size={20} />} label="Help Center" isExpanded={isExpanded} /> */}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="justify-start w-full px-4"
          leftIcon={<LogOut size={20} className="flex-shrink-0" />}
          onClick={handleLogout}
        >
          {isExpanded && "Logout"}
        </Button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
