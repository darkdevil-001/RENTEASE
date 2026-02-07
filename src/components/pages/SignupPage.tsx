import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { UserProfiles } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SignupPage() {
  const navigate = useNavigate();
  const { isAuthenticated, actions } = useMember();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    userType: '',
    smokingPreference: '',
    foodPreference: '',
    socialHabits: '',
    preferredLocation: '',
    minBudget: '',
    maxBudget: '',
  });

  useEffect(() => {
    // If already authenticated, redirect to the stored path or home
    if (isAuthenticated) {
      const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
      localStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUser: UserProfiles = {
      _id: crypto.randomUUID(),
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      userType: formData.userType,
      smokingPreference: formData.smokingPreference,
      foodPreference: formData.foodPreference,
      socialHabits: formData.socialHabits,
      preferredLocation: formData.preferredLocation,
      minBudget: formData.minBudget ? parseFloat(formData.minBudget) : undefined,
      maxBudget: formData.maxBudget ? parseFloat(formData.maxBudget) : undefined,
    };

    await BaseCrudService.create('users', newUser);
    // Store the redirect path before signup
    localStorage.setItem('redirectAfterLogin', '/');
    // Trigger Wix signup
    actions.login();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <section className="w-full max-w-[100rem] mx-auto px-8 py-16">
          <div className="max-w-[56rem] mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-4 uppercase tracking-tight">
              Sign Up
            </h1>
            <p className="font-paragraph text-lg text-secondary mb-12">
              Create your account to get started
            </p>

            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                <div className="border-b border-grey200 pb-8">
                  <h2 className="font-heading text-xl text-foreground mb-6 uppercase tracking-wide">
                    Basic Information
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="fullName" className="font-paragraph text-sm text-foreground mb-2 block">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="bg-background border-grey300"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="font-paragraph text-sm text-foreground mb-2 block">
                        Email *
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
                      <Label htmlFor="phoneNumber" className="font-paragraph text-sm text-foreground mb-2 block">
                        Phone Number *
                      </Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="bg-background border-grey300"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <Label htmlFor="userType" className="font-paragraph text-sm text-foreground mb-2 block">
                        User Type *
                      </Label>
                      <Select 
                        required
                        value={formData.userType} 
                        onValueChange={(value) => setFormData({ ...formData, userType: value })}
                      >
                        <SelectTrigger id="userType" className="bg-background border-grey300">
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Room Seeker">Room Seeker</SelectItem>
                          <SelectItem value="Room Owner">Room Owner</SelectItem>
                          <SelectItem value="Both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="border-b border-grey200 pb-8">
                  <h2 className="font-heading text-xl text-foreground mb-6 uppercase tracking-wide">
                    Preferences (Optional)
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="smokingPreference" className="font-paragraph text-sm text-foreground mb-2 block">
                        Smoking Preference
                      </Label>
                      <Select 
                        value={formData.smokingPreference} 
                        onValueChange={(value) => setFormData({ ...formData, smokingPreference: value })}
                      >
                        <SelectTrigger id="smokingPreference" className="bg-background border-grey300">
                          <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Smoking">Smoking</SelectItem>
                          <SelectItem value="Non-Smoking">Non-Smoking</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="foodPreference" className="font-paragraph text-sm text-foreground mb-2 block">
                        Food Preference
                      </Label>
                      <Select 
                        value={formData.foodPreference} 
                        onValueChange={(value) => setFormData({ ...formData, foodPreference: value })}
                      >
                        <SelectTrigger id="foodPreference" className="bg-background border-grey300">
                          <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
                          <SelectItem value="Vegan">Vegan</SelectItem>
                          <SelectItem value="Any">Any</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="socialHabits" className="font-paragraph text-sm text-foreground mb-2 block">
                        Social Habits
                      </Label>
                      <Select 
                        value={formData.socialHabits} 
                        onValueChange={(value) => setFormData({ ...formData, socialHabits: value })}
                      >
                        <SelectTrigger id="socialHabits" className="bg-background border-grey300">
                          <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Quiet">Quiet</SelectItem>
                          <SelectItem value="Social">Social</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="preferredLocation" className="font-paragraph text-sm text-foreground mb-2 block">
                        Preferred Location
                      </Label>
                      <Input
                        id="preferredLocation"
                        type="text"
                        value={formData.preferredLocation}
                        onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                        className="bg-background border-grey300"
                        placeholder="Enter location"
                      />
                    </div>

                    <div>
                      <Label htmlFor="minBudget" className="font-paragraph text-sm text-foreground mb-2 block">
                        Min Budget ($)
                      </Label>
                      <Input
                        id="minBudget"
                        type="number"
                        value={formData.minBudget}
                        onChange={(e) => setFormData({ ...formData, minBudget: e.target.value })}
                        className="bg-background border-grey300"
                        placeholder="Min budget"
                      />
                    </div>

                    <div>
                      <Label htmlFor="maxBudget" className="font-paragraph text-sm text-foreground mb-2 block">
                        Max Budget ($)
                      </Label>
                      <Input
                        id="maxBudget"
                        type="number"
                        value={formData.maxBudget}
                        onChange={(e) => setFormData({ ...formData, maxBudget: e.target.value })}
                        className="bg-background border-grey300"
                        placeholder="Max budget"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-4">
                  <Button 
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base"
                  >
                    Create Account
                  </Button>
                  
                  <p className="font-paragraph text-sm text-secondary text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:text-primary/80">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
