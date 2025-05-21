import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Header = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600 mr-8">
          TextPerfect
        </Link>
        {isAuthenticated && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/pricing" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Pricing
            </Link>
            <Link to="/tools" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Tools
            </Link>
          </nav>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <div className="hidden md:flex items-center px-3 py-1 bg-indigo-50 rounded-full">
              <div className="w-20 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${(user?.credits || 0) / (user?.maxCredits || 100) * 100}%` }}
                />
              </div>
              <span className="ml-2 text-sm font-medium text-indigo-600">
                {user?.credits} / {user?.maxCredits}
              </span>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <User size={16} className="text-indigo-600" />
              </div>
              <div className="ml-2 hidden md:block">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
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