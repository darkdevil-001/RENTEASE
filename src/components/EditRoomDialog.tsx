import { useState } from 'react';
import { Rooms } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface EditRoomDialogProps {
  room: Rooms;
  onClose: () => void;
  onSave: (room: Rooms) => void;
}

export default function EditRoomDialog({ room, onClose, onSave }: EditRoomDialogProps) {
  const [formData, setFormData] = useState({
    location: room.location || '',
    monthlyRent: room.monthlyRent?.toString() || '',
    roomType: room.roomType || '',
    capacity: room.capacity?.toString() || '',
    availabilityDate: room.availabilityDate ? new Date(room.availabilityDate).toISOString().split('T')[0] : '',
    leaseOption: room.leaseOption || '',
    description: room.description || '',
    isStudentFriendly: room.isStudentFriendly || false,
    isSmokingAllowed: room.isSmokingAllowed || false,
    foodPreference: room.foodPreference || '',
    socialPreference: room.socialPreference || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedRoom: Rooms = {
      ...room,
      location: formData.location,
      monthlyRent: parseFloat(formData.monthlyRent),
      roomType: formData.roomType,
      capacity: parseInt(formData.capacity),
      availabilityDate: formData.availabilityDate,
      leaseOption: formData.leaseOption,
      description: formData.description,
      isStudentFriendly: formData.isStudentFriendly,
      isSmokingAllowed: formData.isSmokingAllowed,
      foodPreference: formData.foodPreference,
      socialPreference: formData.socialPreference,
    };

    onSave(updatedRoom);
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background max-w-[56rem] w-full max-h-[90vh] overflow-y-auto border border-grey300">
        <div className="sticky top-0 bg-background border-b border-grey200 p-6 flex items-center justify-between">
          <h2 className="font-heading text-2xl text-foreground uppercase tracking-wide">
            Edit Listing
          </h2>
          <button onClick={onClose} className="text-secondary hover:text-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="edit-location" className="font-paragraph text-sm text-foreground mb-2 block">
                Location *
              </Label>
              <Input
                id="edit-location"
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-background border-grey300"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="edit-roomType" className="font-paragraph text-sm text-foreground mb-2 block">
                  Room Type *
                </Label>
                <Select 
                  required
                  value={formData.roomType} 
                  onValueChange={(value) => setFormData({ ...formData, roomType: value })}
                >
                  <SelectTrigger id="edit-roomType" className="bg-background border-grey300">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Private">Private</SelectItem>
                    <SelectItem value="Shared">Shared</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="edit-capacity" className="font-paragraph text-sm text-foreground mb-2 block">
                  Capacity *
                </Label>
                <Select 
                  required
                  value={formData.capacity} 
                  onValueChange={(value) => setFormData({ ...formData, capacity: value })}
                >
                  <SelectTrigger id="edit-capacity" className="bg-background border-grey300">
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
                <Label htmlFor="edit-monthlyRent" className="font-paragraph text-sm text-foreground mb-2 block">
                  Monthly Rent ($) *
                </Label>
                <Input
                  id="edit-monthlyRent"
                  type="number"
                  required
                  value={formData.monthlyRent}
                  onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                  className="bg-background border-grey300"
                />
              </div>

              <div>
                <Label htmlFor="edit-availabilityDate" className="font-paragraph text-sm text-foreground mb-2 block">
                  Availability Date *
                </Label>
                <Input
                  id="edit-availabilityDate"
                  type="date"
                  required
                  value={formData.availabilityDate}
                  onChange={(e) => setFormData({ ...formData, availabilityDate: e.target.value })}
                  className="bg-background border-grey300"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-leaseOption" className="font-paragraph text-sm text-foreground mb-2 block">
                Lease Option *
              </Label>
              <Select 
                required
                value={formData.leaseOption} 
                onValueChange={(value) => setFormData({ ...formData, leaseOption: value })}
              >
                <SelectTrigger id="edit-leaseOption" className="bg-background border-grey300">
                  <SelectValue placeholder="Select lease option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lease only">Lease only</SelectItem>
                  <SelectItem value="Rent only">Rent only</SelectItem>
                  <SelectItem value="Rent + Lease">Rent + Lease</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="edit-description" className="font-paragraph text-sm text-foreground mb-2 block">
                Description
              </Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-background border-grey300 min-h-[100px]"
              />
            </div>

            <div className="border-t border-grey200 pt-6">
              <h3 className="font-heading text-lg text-foreground mb-4 uppercase tracking-wide">
                Preferences
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="font-paragraph text-sm text-foreground mb-3 block">
                    Student Friendly
                  </Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="edit-studentFriendly"
                        checked={formData.isStudentFriendly === true}
                        onChange={() => setFormData({ ...formData, isStudentFriendly: true })}
                        className="w-4 h-4"
                      />
                      <span className="font-paragraph text-sm text-foreground">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="edit-studentFriendly"
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
                        name="edit-smokingAllowed"
                        checked={formData.isSmokingAllowed === true}
                        onChange={() => setFormData({ ...formData, isSmokingAllowed: true })}
                        className="w-4 h-4"
                      />
                      <span className="font-paragraph text-sm text-foreground">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="edit-smokingAllowed"
                        checked={formData.isSmokingAllowed === false}
                        onChange={() => setFormData({ ...formData, isSmokingAllowed: false })}
                        className="w-4 h-4"
                      />
                      <span className="font-paragraph text-sm text-foreground">No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="edit-foodPreference" className="font-paragraph text-sm text-foreground mb-2 block">
                    Food Preference
                  </Label>
                  <Select 
                    value={formData.foodPreference} 
                    onValueChange={(value) => setFormData({ ...formData, foodPreference: value })}
                  >
                    <SelectTrigger id="edit-foodPreference" className="bg-background border-grey300">
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
                  <Label htmlFor="edit-socialPreference" className="font-paragraph text-sm text-foreground mb-2 block">
                    Social Preference
                  </Label>
                  <Select 
                    value={formData.socialPreference} 
                    onValueChange={(value) => setFormData({ ...formData, socialPreference: value })}
                  >
                    <SelectTrigger id="edit-socialPreference" className="bg-background border-grey300">
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

            <div className="flex gap-4 pt-6 border-t border-grey200">
              <Button 
                type="submit"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Save Changes
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-grey400 text-foreground hover:bg-grey100"
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
