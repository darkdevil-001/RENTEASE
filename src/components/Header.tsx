import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useState, useEffect } from 'react';
import ProfileUpdateDialog from '@/components/ProfileUpdateDialog';
import { Moon, Sun, Globe } from 'lucide-react';
import { getTheme, setTheme, toggleTheme } from '@/lib/theme';
import { getLanguage, toggleLanguage } from '@/lib/language';

export default function Header() {
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [language, setLanguageState] = useState<'en' | 'ta'>('en');

  useEffect(() => {
    setThemeState(getTheme());
    setLanguageState(getLanguage());
    
    // Listen for theme changes from other components
    const handleThemeChange = () => {
      setThemeState(getTheme());
    };
    
    // Listen for language changes from other components
    const handleLanguageChange = () => {
      setLanguageState(getLanguage());
    };
    
    window.addEventListener('themechange', handleThemeChange);
    window.addEventListener('languagechange', handleLanguageChange);
    return () => {
      window.removeEventListener('themechange', handleThemeChange);
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, []);

  const handleThemeToggle = () => {
    const newTheme = toggleTheme();
    setThemeState(newTheme);
  };

  const handleLanguageToggle = () => {
    const newLang = toggleLanguage();
    setLanguageState(newLang);
  };

  return (
    <header className={`w-full border-b ${theme === 'dark' ? 'border-grey800 bg-grey900' : 'border-grey200 bg-background'}`}>
      <div className="max-w-[100rem] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className={`font-heading text-2xl uppercase tracking-wide ${theme === 'dark' ? 'text-grey100' : 'text-foreground'}`}>
            RentEase
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/find-room" className={`font-paragraph text-base ${theme === 'dark' ? 'text-grey200 hover:text-primary' : 'text-foreground hover:text-primary'} transition-colors`}>
              Find a Room
            </Link>
            <Link to="/list-room" className={`font-paragraph text-base ${theme === 'dark' ? 'text-grey200 hover:text-primary' : 'text-foreground hover:text-primary'} transition-colors`}>
              List a Room
            </Link>
            <Link to="/roommate-groups" className={`font-paragraph text-base ${theme === 'dark' ? 'text-grey200 hover:text-primary' : 'text-foreground hover:text-primary'} transition-colors`}>
              Roommate Groups
            </Link>
            {isAuthenticated && (
              <Link to="/owner-dashboard" className={`font-paragraph text-base ${theme === 'dark' ? 'text-grey200 hover:text-primary' : 'text-foreground hover:text-primary'} transition-colors`}>
                Dashboard
              </Link>
            )}
          </nav>
          
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={handleLanguageToggle}
              className={`p-2 rounded transition-colors ${theme === 'dark' ? 'hover:bg-grey800' : 'hover:bg-grey100'}`}
              title={language === 'en' ? 'Switch to Tamil' : 'Switch to English'}
            >
              <Globe className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className={`p-2 rounded transition-colors ${theme === 'dark' ? 'hover:bg-grey800' : 'hover:bg-grey100'}`}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {isLoading ? (
              <LoadingSpinner />
            ) : isAuthenticated ? (
              <>
                <button 
                  onClick={() => setShowProfileDialog(true)}
                  className={`font-paragraph text-base ${theme === 'dark' ? 'text-grey200 hover:text-primary' : 'text-foreground hover:text-primary'} transition-colors cursor-pointer`}
                >
                  {member?.profile?.nickname || member?.contact?.firstName || 'User'}
                </button>
                <Button 
                  onClick={actions.logout}
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {showProfileDialog && (
        <ProfileUpdateDialog
          onClose={() => setShowProfileDialog(false)}
        />
      )}
    </header>
  );
}
