import React from "react";
import { Link } from "react-router-dom";
import { Bell, User, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

const Header = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <Link to="/" className="mr-8 text-2xl font-bold text-indigo-600">
          TextPerfect
        </Link>

        <nav className="items-center hidden space-x-6 md:flex">
          <Link
            to="/pricing"
            className="text-gray-700 transition-colors hover:text-indigo-600"
          >
            Pricing
          </Link>
          {isAuthenticated && (
            <Link
              to="/tools"
              className="text-gray-700 transition-colors hover:text-indigo-600"
            >
              Tools
            </Link>
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
            <button className="relative p-2 transition-colors rounded-full hover:bg-gray-100">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
            </button>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full">
                <User size={16} className="text-indigo-600" />
              </div>
              <div className="hidden ml-2 md:block">
                <p className="text-sm font-medium text-gray-700">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">{user?.plan}</p>
              </div>
              <ChevronDown size={16} className="ml-1 text-gray-400" />
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
