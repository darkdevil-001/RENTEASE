import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Rooms } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import ContactOwnerDialog from '@/components/ContactOwnerDialog';
import { getTheme } from '@/lib/theme';

export default function FindRoomPage() {
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Rooms[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoomForContact, setSelectedRoomForContact] = useState<Rooms | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Filter states
  const [location, setLocation] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [roomType, setRoomType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [isStudentFriendly, setIsStudentFriendly] = useState('');
  const [isSmokingAllowed, setIsSmokingAllowed] = useState('');
  const [foodPreference, setFoodPreference] = useState('');
  const [socialPreference, setSocialPreference] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [genderPreference, setGenderPreference] = useState('');

  useEffect(() => {
    setTheme(getTheme());
    loadRooms();
    
    // Listen for theme changes
    const handleThemeChange = () => {
      setTheme(getTheme());
    };
    
    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [rooms, location, minBudget, maxBudget, roomType, capacity, isStudentFriendly, isSmokingAllowed, foodPreference, socialPreference, paymentType, genderPreference]);

  const loadRooms = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<Rooms>('rooms');
    setRooms(result.items);
    setFilteredRooms(result.items);
    setIsLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...rooms];

    if (location) {
      filtered = filtered.filter(room => 
        room.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (minBudget) {
      filtered = filtered.filter(room => 
        room.monthlyRent && room.monthlyRent >= parseFloat(minBudget)
      );
    }

    if (maxBudget) {
      filtered = filtered.filter(room => 
        room.monthlyRent && room.monthlyRent <= parseFloat(maxBudget)
      );
    }

    if (roomType) {
      filtered = filtered.filter(room => room.roomType === roomType);
    }

    if (capacity) {
      filtered = filtered.filter(room => room.capacity === parseInt(capacity));
    }

    if (isStudentFriendly) {
      filtered = filtered.filter(room => 
        room.isStudentFriendly === (isStudentFriendly === 'true')
      );
    }

    if (isSmokingAllowed) {
      filtered = filtered.filter(room => 
        room.isSmokingAllowed === (isSmokingAllowed === 'true')
      );
    }

    if (foodPreference) {
      filtered = filtered.filter(room => room.foodPreference === foodPreference);
    }

    if (socialPreference) {
      filtered = filtered.filter(room => room.socialPreference === socialPreference);
    }

    if (paymentType) {
      filtered = filtered.filter(room => {
        if (paymentType === 'Rent Only') {
          return room.leaseOption === 'Rent only';
        } else if (paymentType === 'Lease Only') {
          return room.leaseOption === 'Lease only';
        } else if (paymentType === 'Rent + Lease') {
          return room.leaseOption === 'Rent + Lease';
        }
        return true;
      });
    }

    if (genderPreference && genderPreference !== 'Any') {
      filtered = filtered.filter(room => {
        const roomGender = room.socialPreference;
        if (genderPreference === 'Male') {
          return roomGender === 'Male' || roomGender === 'Any';
        } else if (genderPreference === 'Female') {
          return roomGender === 'Female' || roomGender === 'Any';
        }
        return true;
      });
    }

    setFilteredRooms(filtered);
  };

  const resetFilters = () => {
    setLocation('');
    setMinBudget('');
    setMaxBudget('');
    setRoomType('');
    setCapacity('');
    setIsStudentFriendly('');
    setIsSmokingAllowed('');
    setFoodPreference('');
    setSocialPreference('');
    setPaymentType('');
    setGenderPreference('');
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-grey900' : 'bg-background'}`}>
      <Header />
      
      <main className="flex-1">
        <section className="w-full max-w-[100rem] mx-auto px-8 py-16">
          <h1 className={`font-heading text-5xl md:text-6xl ${theme === 'dark' ? 'text-grey100' : 'text-foreground'} mb-4 uppercase tracking-tight`}>
            Find Your Perfect Room
          </h1>
          <p className={`font-paragraph text-lg ${theme === 'dark' ? 'text-grey400' : 'text-secondary'} mb-12`}>
            Search and filter rooms based on your preferences
          </p>

          {/* Filters */}
          <div className={`${theme === 'dark' ? 'bg-grey800' : 'bg-grey100'} p-8 mb-16`}>
            <h2 className={`font-heading text-xl ${theme === 'dark' ? 'text-grey100' : 'text-foreground'} mb-6 uppercase tracking-wide`}>
              Search Preferences
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <Label htmlFor="location" className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey200' : 'text-foreground'} mb-2 block`}>
                  Preferred Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`${theme === 'dark' ? 'bg-grey700 border-grey600 text-grey100' : 'bg-background border-grey300'}`}
                />
              </div>

              <div>
                <Label htmlFor="minBudget" className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey200' : 'text-foreground'} mb-2 block`}>
                  Min Budget ($)
                </Label>
                <Input
                  id="minBudget"
                  type="number"
                  placeholder="Min budget"
                  value={minBudget}
                  onChange={(e) => setMinBudget(e.target.value)}
                  className={`${theme === 'dark' ? 'bg-grey700 border-grey600 text-grey100' : 'bg-background border-grey300'}`}
                />
              </div>

              <div>
                <Label htmlFor="maxBudget" className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey200' : 'text-foreground'} mb-2 block`}>
                  Max Budget ($)
                </Label>
                <Input
                  id="maxBudget"
                  type="number"
                  placeholder="Max budget"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  className={`${theme === 'dark' ? 'bg-grey700 border-grey600 text-grey100' : 'bg-background border-grey300'}`}
                />
              </div>

              <div>
                <Label htmlFor="paymentType" className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey200' : 'text-foreground'} mb-2 block`}>
                  Payment Type
                </Label>
                <Select value={paymentType} onValueChange={setPaymentType}>
                  <SelectTrigger id="paymentType" className={`${theme === 'dark' ? 'bg-grey700 border-grey600 text-grey100' : 'bg-background border-grey300'}`}>
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rent Only">Rent Only</SelectItem>
                    <SelectItem value="Lease Only">Lease Only</SelectItem>
                    <SelectItem value="Rent + Lease">Rent + Lease</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="roomType" className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey200' : 'text-foreground'} mb-2 block`}>
                  Room Type
                </Label>
                <Select value={roomType} onValueChange={setRoomType}>
                  <SelectTrigger id="roomType" className={`${theme === 'dark' ? 'bg-grey700 border-grey600 text-grey100' : 'bg-background border-grey300'}`}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Private">Private</SelectItem>
                    <SelectItem value="Shared">Shared</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="capacity" className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey200' : 'text-foreground'} mb-2 block`}>
                  Number of Roommates
                </Label>
                <Select value={capacity} onValueChange={setCapacity}>
                  <SelectTrigger id="capacity" className={`${theme === 'dark' ? 'bg-grey700 border-grey600 text-grey100' : 'bg-background border-grey300'}`}>
                    <SelectValue placeholder="Select capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="studentFriendly" className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey200' : 'text-foreground'} mb-2 block`}>
                  Student/Working
                </Label>
                <Select value={isStudentFriendly} onValueChange={setIsStudentFriendly}>
                  <SelectTrigger id="studentFriendly" className={`${theme === 'dark' ? 'bg-grey700 border-grey600 text-grey100' : 'bg-background border-grey300'}`}>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Student Friendly</SelectItem>
                    <SelectItem value="false">Working Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="smoking" className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey200' : 'text-foreground'} mb-2 block`}>
                  Smoking Preference
                </Label>
                <Select value={isSmokingAllowed} onValueChange={setIsSmokingAllowed}>
                  <SelectTrigger id="smoking" className={`${theme === 'dark' ? 'bg-grey700 border-grey600 text-grey100' : 'bg-background border-grey300'}`}>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Smoking Allowed</SelectItem>
                    <SelectItem value="false">Non-Smoking</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="food" className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey200' : 'text-foreground'} mb-2 block`}>
                  Food Preference
                </Label>
                <Select value={foodPreference} onValueChange={setFoodPreference}>
                  <SelectTrigger id="food" className={`${theme === 'dark' ? 'bg-grey700 border-grey600 text-grey100' : 'bg-background border-grey300'}`}>
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
                <Label htmlFor="social" className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey200' : 'text-foreground'} mb-2 block`}>
                  Social Preference
                </Label>
                <Select value={socialPreference} onValueChange={setSocialPreference}>
                  <SelectTrigger id="social" className={`${theme === 'dark' ? 'bg-grey700 border-grey600 text-grey100' : 'bg-background border-grey300'}`}>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Quiet">Quiet</SelectItem>
                    <SelectItem value="Social">Social</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="gender" className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey200' : 'text-foreground'} mb-2 block`}>
                  Gender Preference
                </Label>
                <Select value={genderPreference} onValueChange={setGenderPreference}>
                  <SelectTrigger id="gender" className={`${theme === 'dark' ? 'bg-grey700 border-grey600 text-grey100' : 'bg-background border-grey300'}`}>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Any">Any</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={resetFilters}
              variant="outline"
              className={`${theme === 'dark' ? 'border-grey600 text-grey200 hover:bg-grey700' : 'border-grey400 text-foreground hover:bg-grey100'}`}
            >
              Reset Filters
            </Button>
          </div>

          {/* Results */}
          <div className="min-h-[400px]">
            <h2 className={`font-heading text-2xl ${theme === 'dark' ? 'text-grey100' : 'text-foreground'} mb-8 uppercase tracking-wide`}>
              Available Rooms ({filteredRooms.length})
            </h2>

            {isLoading ? null : filteredRooms.length > 0 ? (
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {filteredRooms.map((room) => (
                  <motion.div
                    key={room._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to={`/room/${room._id}`} className="block group">
                      <div className={`border ${theme === 'dark' ? 'border-grey700 hover:border-primary bg-grey800' : 'border-grey300 hover:border-primary bg-background'} transition-colors`}>
                        {room.roomImage && (
                          <div className="aspect-[4/3] overflow-hidden">
                            <Image
                              src={room.roomImage}
                              alt={`Room in ${room.location}`}
                              className="w-full h-full object-cover"
                              width={400}
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className={`font-heading text-xl ${theme === 'dark' ? 'text-grey100' : 'text-foreground'} mb-2 uppercase tracking-wide`}>
                            {room.location}
                          </h3>
                          <p className={`font-paragraph text-base ${theme === 'dark' ? 'text-grey400' : 'text-secondary'} mb-4`}>
                            {room.roomType} • {room.capacity} {room.capacity === 1 ? 'Person' : 'People'}
                          </p>
                          <div className="mb-4">
                            <p className="font-heading text-2xl text-primary mb-2">
                              ${room.monthlyRent}/month
                            </p>
                            {room.leaseAmount && (room.leaseOption === 'Lease only' || room.leaseOption === 'Rent + Lease') && (
                              <p className={`font-paragraph text-base ${theme === 'dark' ? 'text-grey400' : 'text-secondary'}`}>
                                Lease: ${room.leaseAmount}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {room.isStudentFriendly && (
                              <span className={`font-paragraph text-xs ${theme === 'dark' ? 'text-grey200 bg-grey700' : 'text-foreground bg-grey100'} px-3 py-1`}>
                                Student Friendly
                              </span>
                            )}
                            {room.isSmokingAllowed !== undefined && (
                              <span className={`font-paragraph text-xs ${theme === 'dark' ? 'text-grey200 bg-grey700' : 'text-foreground bg-grey100'} px-3 py-1`}>
                                {room.isSmokingAllowed ? 'Smoking' : 'Non-Smoking'}
                              </span>
                            )}
                            {room.foodPreference && (
                              <span className={`font-paragraph text-xs ${theme === 'dark' ? 'text-grey200 bg-grey700' : 'text-foreground bg-grey100'} px-3 py-1`}>
                                {room.foodPreference}
                              </span>
                            )}
                            {room.occupancyType === 'Partially Occupied' && (
                              <span className={`font-paragraph text-xs ${theme === 'dark' ? 'text-primary bg-primary/20 border-primary' : 'text-foreground bg-primary/10 border-primary'} px-3 py-1 border`}>
                                {room.currentMembers} member{room.currentMembers !== 1 ? 's' : ''} • {Math.max(0, (room.capacity || 0) - (room.currentMembers || 0))} slot{Math.max(0, (room.capacity || 0) - (room.currentMembers || 0)) !== 1 ? 's' : ''} available
                              </span>
                            )}
                          </div>
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedRoomForContact(room);
                            }}
                            variant="outline"
                            className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                          >
                            Contact Owner
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <p className={`font-paragraph text-lg ${theme === 'dark' ? 'text-grey400' : 'text-secondary'}`}>
                  No rooms found matching your preferences. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {selectedRoomForContact && (
        <ContactOwnerDialog
          room={selectedRoomForContact}
          onClose={() => setSelectedRoomForContact(null)}
        />
      )}
    </div>
  );
}
