import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, actions } = useMember();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // If already authenticated, redirect to the stored path or home
    if (isAuthenticated) {
      const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
      localStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store the redirect path before login
    localStorage.setItem('redirectAfterLogin', '/');
    // Trigger Wix login
    actions.login();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center">
        <section className="w-full max-w-[32rem] mx-auto px-8 py-16">
          <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-4 uppercase tracking-tight text-center">
            Login
          </h1>
          <p className="font-paragraph text-lg text-secondary mb-12 text-center">
            Welcome back to RentEase
          </p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="email" className="font-paragraph text-sm text-foreground mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background border-grey300"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label htmlFor="password" className="font-paragraph text-sm text-foreground mb-2 block">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-background border-grey300"
                  placeholder="Enter your password"
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base"
              >
                Login
              </Button>

              <p className="font-paragraph text-sm text-secondary text-center">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:text-primary/80">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
