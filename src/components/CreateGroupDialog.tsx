import { useState } from 'react';
import { RoommateGroups } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface CreateGroupDialogProps {
  onClose: () => void;
  onCreate: (group: RoommateGroups) => void;
}

export default function CreateGroupDialog({ onClose, onCreate }: CreateGroupDialogProps) {
  const [formData, setFormData] = useState({
    groupName: '',
    groupSize: '',
    preferredLocation: '',
    budgetRange: '',
    moveInDate: '',
    isStudentGroup: false,
    isWorkingGroup: false,
    isSmokingAllowed: false,
    isQuietGroup: false,
    foodPreference: '',
    groupDescription: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newGroup: RoommateGroups = {
      _id: crypto.randomUUID(),
      groupName: formData.groupName,
      groupSize: parseInt(formData.groupSize),
      preferredLocation: formData.preferredLocation,
      budgetRange: formData.budgetRange,
      moveInDate: formData.moveInDate,
      isStudentGroup: formData.isStudentGroup,
      isWorkingGroup: formData.isWorkingGroup,
      isSmokingAllowed: formData.isSmokingAllowed,
      isQuietGroup: formData.isQuietGroup,
      foodPreference: formData.foodPreference,
      groupDescription: formData.groupDescription,
      compatibilityScore: Math.floor(Math.random() * 30) + 70,
    };

    onCreate(newGroup);
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background max-w-[56rem] w-full max-h-[90vh] overflow-y-auto border border-grey300">
        <div className="sticky top-0 bg-background border-b border-grey200 p-6 flex items-center justify-between">
          <h2 className="font-heading text-2xl text-foreground uppercase tracking-wide">
            Create Roommate Group
          </h2>
          <button onClick={onClose} className="text-secondary hover:text-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="groupName" className="font-paragraph text-sm text-foreground mb-2 block">
                Group Name *
              </Label>
              <Input
                id="groupName"
                type="text"
                required
                value={formData.groupName}
                onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                className="bg-background border-grey300"
                placeholder="Enter group name"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="groupSize" className="font-paragraph text-sm text-foreground mb-2 block">
                  Group Size *
                </Label>
                <Select 
                  required
                  value={formData.groupSize} 
                  onValueChange={(value) => setFormData({ ...formData, groupSize: value })}
                >
                  <SelectTrigger id="groupSize" className="bg-background border-grey300">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Members</SelectItem>
                    <SelectItem value="3">3 Members</SelectItem>
                    <SelectItem value="4">4 Members</SelectItem>
                    <SelectItem value="5">5 Members</SelectItem>
                    <SelectItem value="6">6 Members</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="preferredLocation" className="font-paragraph text-sm text-foreground mb-2 block">
                  Preferred Location *
                </Label>
                <Input
                  id="preferredLocation"
                  type="text"
                  required
                  value={formData.preferredLocation}
                  onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                  className="bg-background border-grey300"
                  placeholder="Enter location"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="budgetRange" className="font-paragraph text-sm text-foreground mb-2 block">
                  Budget Range *
                </Label>
                <Input
                  id="budgetRange"
                  type="text"
                  required
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="bg-background border-grey300"
                  placeholder="e.g., $500-$800"
                />
              </div>

              <div>
                <Label htmlFor="moveInDate" className="font-paragraph text-sm text-foreground mb-2 block">
                  Move-in Date *
                </Label>
                <Input
                  id="moveInDate"
                  type="date"
                  required
                  value={formData.moveInDate}
                  onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                  className="bg-background border-grey300"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="groupDescription" className="font-paragraph text-sm text-foreground mb-2 block">
                Group Description
              </Label>
              <Textarea
                id="groupDescription"
                value={formData.groupDescription}
                onChange={(e) => setFormData({ ...formData, groupDescription: e.target.value })}
                className="bg-background border-grey300 min-h-[100px]"
                placeholder="Describe your group..."
              />
            </div>

            <div className="border-t border-grey200 pt-6">
              <h3 className="font-heading text-lg text-foreground mb-4 uppercase tracking-wide">
                Group Preferences
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isStudentGroup}
                      onChange={(e) => setFormData({ ...formData, isStudentGroup: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="font-paragraph text-sm text-foreground">Student Group</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isWorkingGroup}
                      onChange={(e) => setFormData({ ...formData, isWorkingGroup: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="font-paragraph text-sm text-foreground">Working Professionals</span>
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="font-paragraph text-sm text-foreground mb-3 block">
                      Smoking Preference
                    </Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="smoking"
                          checked={formData.isSmokingAllowed === true}
                          onChange={() => setFormData({ ...formData, isSmokingAllowed: true })}
                          className="w-4 h-4"
                        />
                        <span className="font-paragraph text-sm text-foreground">Smoking</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="smoking"
                          checked={formData.isSmokingAllowed === false}
                          onChange={() => setFormData({ ...formData, isSmokingAllowed: false })}
                          className="w-4 h-4"
                        />
                        <span className="font-paragraph text-sm text-foreground">Non-Smoking</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label className="font-paragraph text-sm text-foreground mb-3 block">
                      Social Preference
                    </Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="social"
                          checked={formData.isQuietGroup === true}
                          onChange={() => setFormData({ ...formData, isQuietGroup: true })}
                          className="w-4 h-4"
                        />
                        <span className="font-paragraph text-sm text-foreground">Quiet</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="social"
                          checked={formData.isQuietGroup === false}
                          onChange={() => setFormData({ ...formData, isQuietGroup: false })}
                          className="w-4 h-4"
                        />
                        <span className="font-paragraph text-sm text-foreground">Social</span>
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
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-grey200">
              <Button 
                type="submit"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Create Group
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
