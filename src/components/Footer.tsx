import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getTheme } from '@/lib/theme';

export default function Footer() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  return (
    <footer className={`w-full border-t ${theme === 'dark' ? 'border-grey800 bg-grey900' : 'border-grey200 bg-background'}`}>
      <div className="max-w-[100rem] mx-auto px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className={`font-heading text-xl ${theme === 'dark' ? 'text-grey100' : 'text-foreground'} mb-6 uppercase tracking-wide`}>
              RentEase
            </h3>
            <p className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey400' : 'text-secondary'}`}>
              Preference-based room and roommate finder with trust layers
            </p>
          </div>
          
          <div>
            <h4 className={`font-heading text-base ${theme === 'dark' ? 'text-grey100' : 'text-foreground'} mb-4 uppercase tracking-wide`}>
              Platform
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/find-room" className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey400 hover:text-primary' : 'text-secondary hover:text-primary'} transition-colors`}>
                  Find a Room
                </Link>
              </li>
              <li>
                <Link to="/list-room" className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey400 hover:text-primary' : 'text-secondary hover:text-primary'} transition-colors`}>
                  List a Room
                </Link>
              </li>
              <li>
                <Link to="/roommate-groups" className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey400 hover:text-primary' : 'text-secondary hover:text-primary'} transition-colors`}>
                  Roommate Groups
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className={`font-heading text-base ${theme === 'dark' ? 'text-grey100' : 'text-foreground'} mb-4 uppercase tracking-wide`}>
              Account
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey400 hover:text-primary' : 'text-secondary hover:text-primary'} transition-colors`}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey400 hover:text-primary' : 'text-secondary hover:text-primary'} transition-colors`}>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/owner-dashboard" className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey400 hover:text-primary' : 'text-secondary hover:text-primary'} transition-colors`}>
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className={`font-heading text-base ${theme === 'dark' ? 'text-grey100' : 'text-foreground'} mb-4 uppercase tracking-wide`}>
              Contact
            </h4>
            <ul className="space-y-3">
              <li className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey400' : 'text-secondary'}`}>
                support@rentease.com
              </li>
              <li className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey400' : 'text-secondary'}`}>
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>
        
        <div className={`mt-16 pt-8 border-t ${theme === 'dark' ? 'border-grey800' : 'border-grey200'}`}>
          <p className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey400' : 'text-secondary'} text-center`}>
            © 2026 RentEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
