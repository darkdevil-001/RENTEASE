import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { Rooms } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ListRoomPage() {
  const navigate = useNavigate();
  const { member, isAuthenticated, isLoading: authLoading, actions } = useMember();
  const [formData, setFormData] = useState({
    location: '',
    monthlyRent: '',
    leaseAmount: '',
    roomType: '',
    capacity: '',
    availabilityDate: '',
    leaseOption: '',
    description: '',
    isStudentFriendly: false,
    isSmokingAllowed: false,
    foodPreference: '',
    socialPreference: '',
    occupancyType: 'Fully Vacant',
    currentMembers: '',
    existingMembersPreferences: '',
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      // Store the redirect path
      localStorage.setItem('redirectAfterLogin', '/list-room');
      actions.login();
    }
  }, [authLoading, isAuthenticated, actions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRoom: any = {
      _id: crypto.randomUUID(),
      location: formData.location,
      monthlyRent: parseFloat(formData.monthlyRent),
      roomType: formData.roomType,
      capacity: parseInt(formData.capacity),
      availabilityDate: formData.availabilityDate,
      leaseOption: formData.leaseOption,
      description: formData.description,
      roomImage: 'https://static.wixstatic.com/media/c60ce8_2501be6a26784d67b8f4f8ee82274476~mv2.png?originWidth=768&originHeight=576',
      isStudentFriendly: formData.isStudentFriendly,
      isSmokingAllowed: formData.isSmokingAllowed,
      foodPreference: formData.foodPreference,
      socialPreference: formData.socialPreference,
      ownerVerificationStatus: 'Not Verified',
      occupancyType: formData.occupancyType,
      currentMembers: formData.occupancyType === 'Partially Occupied' ? parseInt(formData.currentMembers) || 0 : 0,
      existingMembersPreferences: formData.existingMembersPreferences,
    };

    // Add leaseAmount if applicable
    if ((formData.leaseOption === 'Lease only' || formData.leaseOption === 'Rent + Lease') && formData.leaseAmount) {
      newRoom.leaseAmount = parseFloat(formData.leaseAmount);
    }

    await BaseCrudService.create('rooms', newRoom);
    navigate('/owner-dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {authLoading ? (
          <section className="w-full max-w-[100rem] mx-auto px-8 py-16 flex justify-center items-center min-h-[600px]">
            <LoadingSpinner />
          </section>
        ) : !isAuthenticated ? (
          <section className="w-full max-w-[100rem] mx-auto px-8 py-16 flex justify-center items-center min-h-[600px]">
            <div className="text-center">
              <h2 className="font-heading text-3xl text-foreground mb-4 uppercase tracking-wide">
                Sign In Required
              </h2>
              <p className="font-paragraph text-lg text-secondary mb-8">
                Please sign in to list a room
              </p>
            </div>
          </section>
        ) : (
          <section className="w-full max-w-[100rem] mx-auto px-8 py-16">
            <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-4 uppercase tracking-tight">
              List Your Room
            </h1>
            <p className="font-paragraph text-lg text-secondary mb-12">
              Fill in the details to list your available room
            </p>

            <form onSubmit={handleSubmit} className="max-w-[56rem]">
              <div className="space-y-8">
                <div>
                  <Label htmlFor="location" className="font-paragraph text-sm text-foreground mb-2 block">
                    Location *
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="bg-background border-grey300"
                    placeholder="Enter location"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="roomType" className="font-paragraph text-sm text-foreground mb-2 block">
                      Room Type *
                    </Label>
                    <Select 
                      required
                      value={formData.roomType} 
                      onValueChange={(value) => setFormData({ ...formData, roomType: value })}
                    >
                      <SelectTrigger id="roomType" className="bg-background border-grey300">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Private">Private</SelectItem>
                        <SelectItem value="Shared">Shared</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="capacity" className="font-paragraph text-sm text-foreground mb-2 block">
                      Capacity *
                    </Label>
                    <Select 
                      required
                      value={formData.capacity} 
                      onValueChange={(value) => setFormData({ ...formData, capacity: value })}
                    >
                      <SelectTrigger id="capacity" className="bg-background border-grey300">
                        <SelectValue placeholder="Select capacity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Person</SelectItem>
                        <SelectItem value="2">2 People</SelectItem>
                        <SelectItem value="3">3 People</SelectItem>
                        <SelectItem value="4">4 People</SelectItem>
                        <SelectItem value="5">5 People</SelectItem>
                        <SelectItem value="6">6 People</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="monthlyRent" className="font-paragraph text-sm text-foreground mb-2 block">
                      Monthly Rent ($) *
                    </Label>
                    <Input
                      id="monthlyRent"
                      type="number"
                      required
                      value={formData.monthlyRent}
                      onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                      className="bg-background border-grey300"
                      placeholder="Enter monthly rent"
                    />
                  </div>

                  <div>
                    <Label htmlFor="availabilityDate" className="font-paragraph text-sm text-foreground mb-2 block">
                      Availability Date *
                    </Label>
                    <Input
                      id="availabilityDate"
                      type="date"
                      required
                      value={formData.availabilityDate}
                      onChange={(e) => setFormData({ ...formData, availabilityDate: e.target.value })}
                      className="bg-background border-grey300"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="leaseOption" className="font-paragraph text-sm text-foreground mb-2 block">
                    Lease Option *
                  </Label>
                  <Select 
                    required
                    value={formData.leaseOption} 
                    onValueChange={(value) => setFormData({ ...formData, leaseOption: value })}
                  >
                    <SelectTrigger id="leaseOption" className="bg-background border-grey300">
                      <SelectValue placeholder="Select lease option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lease only">Lease only</SelectItem>
                      <SelectItem value="Rent only">Rent only</SelectItem>
                      <SelectItem value="Rent + Lease">Rent + Lease</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(formData.leaseOption === 'Lease only' || formData.leaseOption === 'Rent + Lease') && (
                  <div>
                    <Label htmlFor="leaseAmount" className="font-paragraph text-sm text-foreground mb-2 block">
                      Lease Amount ($)
                    </Label>
                    <Input
                      id="leaseAmount"
                      type="number"
                      value={formData.leaseAmount}
                      onChange={(e) => setFormData({ ...formData, leaseAmount: e.target.value })}
                      className="bg-background border-grey300"
                      placeholder="Enter lease amount"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="description" className="font-paragraph text-sm text-foreground mb-2 block">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-background border-grey300 min-h-[120px]"
                    placeholder="Describe your room..."
                  />
                </div>

                <div className="border-t border-grey200 pt-8">
                  <h2 className="font-heading text-xl text-foreground mb-6 uppercase tracking-wide">
                    Room Occupancy
                  </h2>

                  <div>
                    <Label htmlFor="occupancyType" className="font-paragraph text-sm text-foreground mb-2 block">
                      Room Occupancy Type *
                    </Label>
                    <Select 
                      required
                      value={formData.occupancyType} 
                      onValueChange={(value) => setFormData({ ...formData, occupancyType: value })}
                    >
                      <SelectTrigger id="occupancyType" className="bg-background border-grey300">
                        <SelectValue placeholder="Select occupancy type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fully Vacant">Fully Vacant</SelectItem>
                        <SelectItem value="Partially Occupied">Partially Occupied (Sharing Available)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.occupancyType === 'Partially Occupied' && (
                    <div className="mt-6 space-y-6 p-6 bg-grey100 border border-grey300">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="currentMembers" className="font-paragraph text-sm text-foreground mb-2 block">
                            Current Members Present *
                          </Label>
                          <Select 
                            required
                            value={formData.currentMembers} 
                            onValueChange={(value) => setFormData({ ...formData, currentMembers: value })}
                          >
                            <SelectTrigger id="currentMembers" className="bg-background border-grey300">
                              <SelectValue placeholder="Select number" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5">5</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="font-paragraph text-sm text-foreground mb-2 block">
                            Available Slots
                          </Label>
                          <div className="bg-background border border-grey300 px-4 py-2 rounded font-paragraph text-base text-foreground">
                            {formData.capacity && formData.currentMembers 
                              ? Math.max(0, parseInt(formData.capacity) - parseInt(formData.currentMembers))
                              : formData.capacity ? formData.capacity : 0}
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="existingMembersPreferences" className="font-paragraph text-sm text-foreground mb-2 block">
                          Existing Members' Preferences (lifestyle tags)
                        </Label>
                        <Input
                          id="existingMembersPreferences"
                          type="text"
                          value={formData.existingMembersPreferences}
                          onChange={(e) => setFormData({ ...formData, existingMembersPreferences: e.target.value })}
                          className="bg-background border-grey300"
                          placeholder="e.g., Quiet, Non-smoking, Vegetarian"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-grey200 pt-8">
                  <h2 className="font-heading text-xl text-foreground mb-6 uppercase tracking-wide">
                    Preferences
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="font-paragraph text-sm text-foreground mb-3 block">
                        Student Friendly
                      </Label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="studentFriendly"
                            checked={formData.isStudentFriendly === true}
                            onChange={() => setFormData({ ...formData, isStudentFriendly: true })}
                            className="w-4 h-4"
                          />
                          <span className="font-paragraph text-sm text-foreground">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="studentFriendly"
                            checked={formData.isStudentFriendly === false}
                            onChange={() => setFormData({ ...formData, isStudentFriendly: false })}
                            className="w-4 h-4"
                          />
                          <span className="font-paragraph text-sm text-foreground">No</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <Label className="font-paragraph text-sm text-foreground mb-3 block">
                        Smoking Allowed
                      </Label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="smokingAllowed"
                            checked={formData.isSmokingAllowed === true}
                            onChange={() => setFormData({ ...formData, isSmokingAllowed: true })}
                            className="w-4 h-4"
                          />
                          <span className="font-paragraph text-sm text-foreground">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="smokingAllowed"
                            checked={formData.isSmokingAllowed === false}
                            onChange={() => setFormData({ ...formData, isSmokingAllowed: false })}
                            className="w-4 h-4"
                          />
                          <span className="font-paragraph text-sm text-foreground">No</span>
                        </label>
                      </div>
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
                      <Label htmlFor="socialPreference" className="font-paragraph text-sm text-foreground mb-2 block">
                        Social Preference
                      </Label>
                      <Select 
                        value={formData.socialPreference} 
                        onValueChange={(value) => setFormData({ ...formData, socialPreference: value })}
                      >
                        <SelectTrigger id="socialPreference" className="bg-background border-grey300">
                          <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Quiet">Quiet</SelectItem>
                          <SelectItem value="Social">Social</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-8">
                  <Button 
                    type="submit"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base"
                  >
                    Submit Listing
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="border-grey400 text-foreground hover:bg-grey100 px-8 py-6 text-base"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
