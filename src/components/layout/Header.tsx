import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  User,
  ChevronDown,
  LogOut,
  Trash,
  Type,
  Search,
  Bot,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import { useTool } from "../../context/ToolContext";
import { cn } from "../../lib/utils";
import ToolNavItem from "../ui/ToolNavItem";

const Header = () => {
  const { user, isAuthenticated, deleteUser, logout } = useAuth();
  const { setCurrentDocument, setCurrentTool, currentTool, sidebarExpanded } =
    useTool();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toolDropdownOpen, setToolDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const toolDropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handleToolChange = (
    toolType: "humanizer" | "plagiarism" | "ai-detector"
  ) => {
    setCurrentTool(toolType);
    setCurrentDocument(null);
    navigate("/tools");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        console.log("click outside");
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    function handleClickOutsideTools(event: MouseEvent) {
      if (
        toolDropdownRef.current &&
        !toolDropdownRef.current.contains(event.target as Node)
      ) {
        console.log("click outside");
        setToolDropdownOpen(false);
      }
    }

    if (toolDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutsideTools);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideTools);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideTools);
    };
  }, [toolDropdownOpen]);

  return (
    <header className="flex items-center justify-between h-16 px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        {(!sidebarExpanded || !isAuthenticated) && (
          <Link to="/" className="mr-8 text-2xl font-bold text-indigo-600">
            TextPerfect
          </Link>
        )}

        <nav className="items-center hidden space-x-6 md:flex">
          <Link
            to="/pricing"
            className="text-gray-700 transition-colors hover:text-indigo-600"
          >
            Pricing
          </Link>
          {isAuthenticated && (
            <div ref={toolDropdownRef} className="relative">
              <div
                // to="/tools"
                className="text-gray-700 transition-colors cursor-pointer hover:text-indigo-600"
                onClick={() => {
                  setToolDropdownOpen((open) => !open);
                }}
              >
                Tools
              </div>

              {toolDropdownOpen && (
                <div className="absolute z-[20] [&>*]:pl-2 [&>*]:pr-6 top-[100%] mt-1 right-1/2 translate-x-1/2 w-fit bg-white border rounded-lg p-2  space-y-2 shadow-lg whitespace-nowrap">
                  <ToolNavItem
                    toolType="humanizer"
                    icon={<Type size={20} className="flex-shrink-0" />}
                    label="Humanizer"
                    isExpanded={true}
                    isActive={
                      currentTool === "humanizer" &&
                      location.pathname.includes("tools")
                    }
                    onClick={() => {
                      handleToolChange("humanizer");
                      setToolDropdownOpen(false);
                    }}
                  />
                  <ToolNavItem
                    toolType="plagiarism"
                    icon={<Search size={20} className="flex-shrink-0" />}
                    label="Plagiarism Checker"
                    isExpanded={true}
                    isActive={
                      currentTool === "plagiarism" &&
                      location.pathname.includes("tools")
                    }
                    onClick={() => {
                      handleToolChange("plagiarism");
                      setToolDropdownOpen(false);
                    }}
                  />
                  <ToolNavItem
                    toolType="ai-detector"
                    icon={<Bot size={20} className="flex-shrink-0" />}
                    label="AI Detector"
                    isExpanded={true}
                    isActive={
                      currentTool === "ai-detector" &&
                      location.pathname.includes("tools")
                    }
                    onClick={() => {
                      handleToolChange("ai-detector");
                      setToolDropdownOpen(false);
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <div className="items-center hidden px-3 py-1 rounded-full md:flex bg-indigo-50">
              <div className="w-20 h-3 overflow-hidden bg-gray-200 rounded-full">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{
                    width: `${
                      ((user?.credits || 0) / (user?.max_credits || 100)) * 100
                    }%`,
                  }}
                />
              </div>
              <span className="ml-2 text-sm font-medium text-indigo-600">
                {user?.credits} / {user?.max_credits}
              </span>
            </div>
            {/* <button className="relative p-2 transition-colors rounded-full hover:bg-gray-100">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
            </button> */}
            <div
              id="user-dropdown"
              ref={dropdownRef}
              className="relative flex items-center cursor-pointer"
              onClick={() => setDropdownOpen((open) => !open)}
            >
              <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full">
                <User size={16} className="text-indigo-600" />
              </div>
              <div className="hidden ml-2 md:block">
                <p className="text-sm font-medium text-gray-700">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">{user?.plan}</p>
              </div>
              <ChevronDown
                size={16}
                className={cn(
                  "ml-1 text-gray-400 transition-transform",
                  dropdownOpen && "rotate-180"
                )}
              />
              {dropdownOpen && (
                <div className="absolute top-[100%] mt-1 right-0 z-10 w-48 bg-white border rounded-lg p-2 space-y-2 shadow-lg">
                  <button
                    className="flex items-center w-full gap-2 px-4 py-2 text-left text-gray-700 rounded-md hover:bg-gray-100"
                    onClick={logout}
                  >
                    <LogOut className="size-5" />
                    Logout
                  </button>
                  {/* <button
                    className="flex items-center w-full gap-2 px-4 py-2 text-left text-red-600 rounded-md whitespace-nowrap hover:bg-red-100"
                    onClick={async () => {
                      setDropdownOpen(false);
                      try {
                        await deleteUser();
                      } catch (e) {
                        alert("Failed to delete account.");
                      }
                    }}
                  >
                    <Trash className="size-5" /> Delete Account
                  </button> */}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
