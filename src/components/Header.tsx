import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useState } from 'react';
import ProfileUpdateDialog from '@/components/ProfileUpdateDialog';

export default function Header() {
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  return (
    <header className="w-full border-b border-grey200 bg-background">
      <div className="max-w-[100rem] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-heading text-2xl text-foreground uppercase tracking-wide">
            RentEase
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/find-room" className="font-paragraph text-base text-foreground hover:text-primary transition-colors">
              Find a Room
            </Link>
            <Link to="/list-room" className="font-paragraph text-base text-foreground hover:text-primary transition-colors">
              List a Room
            </Link>
            <Link to="/roommate-groups" className="font-paragraph text-base text-foreground hover:text-primary transition-colors">
              Roommate Groups
            </Link>
            {isAuthenticated && (
              <Link to="/owner-dashboard" className="font-paragraph text-base text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            )}
          </nav>
          
          <div className="flex items-center gap-4">
            {isLoading ? (
              <LoadingSpinner />
            ) : isAuthenticated ? (
              <>
                <button 
                  onClick={() => setShowProfileDialog(true)}
                  className="font-paragraph text-base text-foreground hover:text-primary transition-colors cursor-pointer"
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
