import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { RoommateGroups } from '@/entities';
import { Button } from '@/components/ui/button';
import { Users, Calendar, MapPin, DollarSign, Plus } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import CreateGroupDialog from '@/components/CreateGroupDialog';
import GroupExpensesDialog from '@/components/GroupExpensesDialog';

export default function RoommateGroupsPage() {
  const [groups, setGroups] = useState<RoommateGroups[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedGroupForExpenses, setSelectedGroupForExpenses] = useState<RoommateGroups | null>(null);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<RoommateGroups>('roommategroups');
    setGroups(result.items);
    setIsLoading(false);
  };

  const handleCreateGroup = async (newGroup: RoommateGroups) => {
    setGroups([newGroup, ...groups]);
    await BaseCrudService.create('roommategroups', newGroup);
    setShowCreateDialog(false);
  };

  const getCompatibilityColor = (score?: number) => {
    if (!score) return 'text-grey500';
    if (score >= 80) return 'text-primary';
    if (score >= 60) return 'text-secondary';
    return 'text-grey500';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <section className="w-full max-w-[100rem] mx-auto px-8 py-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl text-foreground mb-4 uppercase tracking-tight">
                Roommate Groups
              </h1>
              <p className="font-paragraph text-lg text-secondary">
                Join or create shared room groups for 2-6 members
              </p>
            </div>
            <Button 
              onClick={() => setShowCreateDialog(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Group
            </Button>
          </div>

          <div className="min-h-[400px]">
            {isLoading ? null : groups.length > 0 ? (
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {groups.map((group) => (
                  <motion.div
                    key={group._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border border-grey300 bg-background p-8"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <h3 className="font-heading text-xl text-foreground uppercase tracking-wide">
                        {group.groupName}
                      </h3>
                      {group.compatibilityScore && (
                        <span className={`font-heading text-2xl ${getCompatibilityColor(group.compatibilityScore)}`}>
                          {group.compatibilityScore}%
                        </span>
                      )}
                    </div>

                    {group.groupDescription && (
                      <p className="font-paragraph text-sm text-secondary mb-6">
                        {group.groupDescription}
                      </p>
                    )}

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="font-paragraph text-sm text-foreground">
                          {group.groupSize} {group.groupSize === 1 ? 'Member' : 'Members'}
                        </span>
                      </div>

                      {group.preferredLocation && (
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-primary" />
                          <span className="font-paragraph text-sm text-foreground">
                            {group.preferredLocation}
                          </span>
                        </div>
                      )}

                      {group.budgetRange && (
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-primary" />
                          <span className="font-paragraph text-sm text-foreground">
                            {group.budgetRange}
                          </span>
                        </div>
                      )}

                      {group.moveInDate && (
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="font-paragraph text-sm text-foreground">
                            {new Date(group.moveInDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-grey200 pt-6 mb-6">
                      <h4 className="font-heading text-sm text-foreground mb-3 uppercase tracking-wide">
                        Preferences
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {group.isStudentGroup && (
                          <span className="font-paragraph text-xs text-foreground bg-grey100 px-3 py-1">
                            Student Group
                          </span>
                        )}
                        {group.isWorkingGroup && (
                          <span className="font-paragraph text-xs text-foreground bg-grey100 px-3 py-1">
                            Working Professionals
                          </span>
                        )}
                        {group.isSmokingAllowed !== undefined && (
                          <span className="font-paragraph text-xs text-foreground bg-grey100 px-3 py-1">
                            {group.isSmokingAllowed ? 'Smoking' : 'Non-Smoking'}
                          </span>
                        )}
                        {group.isQuietGroup !== undefined && (
                          <span className="font-paragraph text-xs text-foreground bg-grey100 px-3 py-1">
                            {group.isQuietGroup ? 'Quiet' : 'Social'}
                          </span>
                        )}
                        {group.foodPreference && (
                          <span className="font-paragraph text-xs text-foreground bg-grey100 px-3 py-1">
                            {group.foodPreference}
                          </span>
                        )}
                      </div>
                    </div>

                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Join Group
                    </Button>
                    <Button 
                      onClick={() => setSelectedGroupForExpenses(group)}
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground mt-2"
                    >
                      View Expenses
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-24">
                <h2 className="font-heading text-3xl text-foreground mb-4 uppercase tracking-wide">
                  No Groups Yet
                </h2>
                <p className="font-paragraph text-lg text-secondary mb-8">
                  Be the first to create a roommate group
                </p>
                <Button 
                  onClick={() => setShowCreateDialog(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Group
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      {showCreateDialog && (
        <CreateGroupDialog
          onClose={() => setShowCreateDialog(false)}
          onCreate={handleCreateGroup}
        />
      )}

      {selectedGroupForExpenses && (
        <GroupExpensesDialog
          groupId={selectedGroupForExpenses._id}
          groupSize={selectedGroupForExpenses.groupSize || 1}
          onClose={() => setSelectedGroupForExpenses(null)}
        />
      )}

      <Footer />
    </div>
  );
}
