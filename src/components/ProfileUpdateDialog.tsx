import { useState, useEffect } from 'react';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { getTheme } from '@/lib/theme';

interface ProfileUpdateDialogProps {
  onClose: () => void;
}

export default function ProfileUpdateDialog({ onClose }: ProfileUpdateDialogProps) {
  const { member } = useMember();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phoneNumber: '',
    smokingPreference: '',
    foodPreference: '',
    socialHabits: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  useEffect(() => {
    if (member) {
      setFormData({
        firstName: member.contact?.firstName || '',
        email: member.loginEmail || '',
        phoneNumber: member.contact?.phones?.[0] || '',
        smokingPreference: localStorage.getItem(`user_${member._id}_smokingPreference`) || '',
        foodPreference: localStorage.getItem(`user_${member._id}_foodPreference`) || '',
        socialHabits: localStorage.getItem(`user_${member._id}_socialHabits`) || '',
      });
    }
  }, [member]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      if (member) {
        // Save preferences to localStorage
        localStorage.setItem(`user_${member._id}_smokingPreference`, formData.smokingPreference);
        localStorage.setItem(`user_${member._id}_foodPreference`, formData.foodPreference);
        localStorage.setItem(`user_${member._id}_socialHabits`, formData.socialHabits);
        
        // Note: firstName and email are managed by Wix Members SDK
        // They would require additional API calls to update
        
        setMessage('Profile updated successfully!');
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-grey900/50' : 'bg-foreground/50'} flex items-center justify-center z-50 p-4 overflow-y-auto`}>
      <div className={`${theme === 'dark' ? 'bg-grey900 border-grey800' : 'bg-background border-grey300'} max-w-[56rem] w-full border my-8`}>
        <div className={`${theme === 'dark' ? 'bg-grey900 border-grey800' : 'bg-background border-grey200'} border-b p-6 flex items-center justify-between`}>
          <h2 className="font-heading text-2xl text-foreground uppercase tracking-wide">
            Update Profile
          </h2>
          <button onClick={onClose} className={`${theme === 'dark' ? 'text-grey500 hover:text-grey200' : 'text-secondary hover:text-foreground'}`}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="space-y-6">
            <div>
              <Label htmlFor="firstName" className="font-paragraph text-sm text-foreground mb-2 block">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className={`${theme === 'dark' ? 'bg-grey800 border-grey700' : 'bg-background border-grey300'}`}
                placeholder="Enter your first name"
                disabled
              />
              <p className={`font-paragraph text-xs ${theme === 'dark' ? 'text-grey500' : 'text-secondary'} mt-1`}>
                Managed by Wix Members
              </p>
            </div>

            <div>
              <Label htmlFor="email" className="font-paragraph text-sm text-foreground mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`${theme === 'dark' ? 'bg-grey800 border-grey700' : 'bg-background border-grey300'}`}
                placeholder="Enter your email"
                disabled
              />
              <p className={`font-paragraph text-xs ${theme === 'dark' ? 'text-grey500' : 'text-secondary'} mt-1`}>
                Managed by Wix Members
              </p>
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="font-paragraph text-sm text-foreground mb-2 block">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className={`${theme === 'dark' ? 'bg-grey800 border-grey700' : 'bg-background border-grey300'}`}
                placeholder="Enter your phone number"
                disabled
              />
              <p className={`font-paragraph text-xs ${theme === 'dark' ? 'text-grey500' : 'text-secondary'} mt-1`}>
                Managed by Wix Members
              </p>
            </div>

            <div className={`border-t ${theme === 'dark' ? 'border-grey800' : 'border-grey200'} pt-6`}>
              <h3 className="font-heading text-lg text-foreground mb-4 uppercase tracking-wide">
                Basic Preferences
              </h3>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="smokingPreference" className="font-paragraph text-sm text-foreground mb-2 block">
                    Smoking Preference
                  </Label>
                  <select
                    id="smokingPreference"
                    value={formData.smokingPreference}
                    onChange={(e) => setFormData({ ...formData, smokingPreference: e.target.value })}
                    className={`w-full ${theme === 'dark' ? 'bg-grey800 border-grey700 text-grey200' : 'bg-background border-grey300 text-foreground'} border px-4 py-2 font-paragraph text-base`}
                  >
                    <option value="">Select preference</option>
                    <option value="Smoker">Smoker</option>
                    <option value="Non-Smoker">Non-Smoker</option>
                    <option value="No Preference">No Preference</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="foodPreference" className="font-paragraph text-sm text-foreground mb-2 block">
                    Food Preference
                  </Label>
                  <select
                    id="foodPreference"
                    value={formData.foodPreference}
                    onChange={(e) => setFormData({ ...formData, foodPreference: e.target.value })}
                    className={`w-full ${theme === 'dark' ? 'bg-grey800 border-grey700 text-grey200' : 'bg-background border-grey300 text-foreground'} border px-4 py-2 font-paragraph text-base`}
                  >
                    <option value="">Select preference</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Any">Any</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="socialHabits" className="font-paragraph text-sm text-foreground mb-2 block">
                    Social Habits
                  </Label>
                  <select
                    id="socialHabits"
                    value={formData.socialHabits}
                    onChange={(e) => setFormData({ ...formData, socialHabits: e.target.value })}
                    className={`w-full ${theme === 'dark' ? 'bg-grey800 border-grey700 text-grey200' : 'bg-background border-grey300 text-foreground'} border px-4 py-2 font-paragraph text-base`}
                  >
                    <option value="">Select preference</option>
                    <option value="Quiet">Quiet</option>
                    <option value="Social">Social</option>
                    <option value="Balanced">Balanced</option>
                  </select>
                </div>
              </div>
            </div>

            {message && (
              <div className={`p-4 text-center font-paragraph text-sm ${message.includes('successfully') ? `${theme === 'dark' ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}` : `${theme === 'dark' ? 'bg-destructive/20 text-destructive' : 'bg-destructive/10 text-destructive'}`}`}>
                {message}
              </div>
            )}

            <div className={`flex gap-4 pt-6 border-t ${theme === 'dark' ? 'border-grey800' : 'border-grey200'}`}>
              <Button 
                type="submit"
                disabled={isSaving}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={onClose}
                className={`flex-1 ${theme === 'dark' ? 'border-grey700 text-grey200 hover:bg-grey800' : 'border-grey400 text-foreground hover:bg-grey100'}`}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
