import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Stethoscope, MapPin, Users, BookOpen, Menu, X, HeartPulse, Moon, Sun, Bell, User as UserIcon, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { useAuth } from './AuthProvider';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  const navLinks = [
    { name: 'Health Check', path: '/health-check', icon: <Stethoscope className="w-4 h-4 mr-2" /> },
    { name: 'Find a Vet', path: '/vet-locator', icon: <MapPin className="w-4 h-4 mr-2" /> },
    { name: 'Community', path: '/community', icon: <Users className="w-4 h-4 mr-2" /> },
    { name: 'Blog', path: '/blog', icon: <BookOpen className="w-4 h-4 mr-2" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center flex-shrink-0">
              <HeartPulse className="h-8 w-8 text-rose-500" />
              <span className="ml-2 text-xl font-bold text-slate-800 dark:text-white tracking-tight">PawCheck</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-rose-600 border-b-2 border-rose-500'
                    : 'text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-700 pl-4">
              <button 
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className="text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 p-2 rounded-full transition-colors relative"
                title="Toggle Notifications"
              >
                <Bell className="w-5 h-5" />
                {notificationsEnabled && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>}
              </button>
              <button 
                onClick={toggleTheme}
                className="text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 p-2 rounded-full transition-colors"
                title="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {user ? (
                <div className="flex items-center space-x-3">
                  <Link to="/dashboard" className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-rose-500 dark:hover:text-rose-400">
                    <UserIcon className="w-5 h-5 mr-1" />
                    Dashboard
                  </Link>
                  <button onClick={handleSignOut} className="text-slate-500 hover:text-rose-500 p-2" title="Sign Out">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-2">
            <button 
              onClick={toggleTheme}
              className="text-slate-500 dark:text-slate-400 p-2"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-rose-500'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <div className="px-3 py-3 border-t border-slate-100 dark:border-slate-700 mt-2">
              {user ? (
                <div className="space-y-2">
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="w-full flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-md text-base font-medium">
                    Dashboard
                  </Link>
                  <button onClick={() => { handleSignOut(); setIsMenuOpen(false); }} className="w-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 px-4 py-2 rounded-md text-base font-medium">
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full flex justify-center bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md text-base font-medium transition-colors">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
