import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Rooms } from '@/entities';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Pencil, Trash2, Plus, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import EditRoomDialog from '@/components/EditRoomDialog';
import VerificationDialog from '@/components/VerificationDialog';
import { getTheme } from '@/lib/theme';

export default function OwnerDashboardPage() {
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingRoom, setEditingRoom] = useState<Rooms | null>(null);
  const [verifyingRoom, setVerifyingRoom] = useState<Rooms | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

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

  const loadRooms = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<Rooms>('rooms');
    setRooms(result.items);
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    
    setRooms(rooms.filter(room => room._id !== id));
    await BaseCrudService.delete('rooms', id);
  };

  const handleUpdate = async (updatedRoom: Rooms) => {
    setRooms(rooms.map(room => room._id === updatedRoom._id ? updatedRoom : room));
    await BaseCrudService.update('rooms', updatedRoom);
    setEditingRoom(null);
  };

  const handleVerification = async (updatedRoom: Rooms) => {
    setRooms(rooms.map(room => room._id === updatedRoom._id ? updatedRoom : room));
    await BaseCrudService.update('rooms', updatedRoom);
    setVerifyingRoom(null);
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-grey900' : 'bg-background'}`}>
      <Header />
      
      <main className="flex-1">
        <section className={`w-full max-w-[100rem] mx-auto px-8 py-16 ${theme === 'dark' ? 'bg-grey900' : 'bg-background'}`}>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className={`font-heading text-5xl md:text-6xl ${theme === 'dark' ? 'text-grey100' : 'text-foreground'} mb-4 uppercase tracking-tight`}>
                My Listings
              </h1>
              <p className={`font-paragraph text-lg ${theme === 'dark' ? 'text-grey400' : 'text-secondary'}`}>
                Manage your room listings
              </p>
            </div>
            <Link to="/list-room">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Listing
              </Button>
            </Link>
          </div>

          <div className="min-h-[400px]">
            {isLoading ? null : rooms.length > 0 ? (
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {rooms.map((room) => (
                  <motion.div
                    key={room._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`border ${theme === 'dark' ? 'border-grey700 bg-grey800' : 'border-grey300 bg-background'}`}
                  >
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

                      {/* Verification Status */}
                      <div className={`mb-4 p-3 ${theme === 'dark' ? 'bg-grey700 border-grey600' : 'bg-grey100 border-grey300'} border`}>
                        <div className="flex items-center gap-2 mb-2">
                          {room.ownerVerificationStatus === 'Verified' ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-primary" />
                              <span className="font-paragraph text-sm text-primary font-semibold">
                                Verified (Format Checked)
                              </span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className={`w-4 h-4 ${theme === 'dark' ? 'text-grey400' : 'text-secondary'}`} />
                              <span className={`font-paragraph text-sm ${theme === 'dark' ? 'text-grey400' : 'text-secondary'}`}>
                                Not Verified
                              </span>
                            </>
                          )}
                        </div>
                        <Button
                          onClick={() => setVerifyingRoom(room)}
                          variant="outline"
                          className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs py-2"
                        >
                          {room.ownerVerificationStatus === 'Verified' ? 'Update Verification' : 'Verify Now'}
                        </Button>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setEditingRoom(room)}
                          variant="outline"
                          className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(room._id)}
                          variant="outline"
                          className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-24">
                <h2 className={`font-heading text-3xl ${theme === 'dark' ? 'text-grey100' : 'text-foreground'} mb-4 uppercase tracking-wide`}>
                  No Listings Yet
                </h2>
                <p className={`font-paragraph text-lg ${theme === 'dark' ? 'text-grey400' : 'text-secondary'} mb-8`}>
                  Start by adding your first room listing
                </p>
                <Link to="/list-room">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Listing
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      {editingRoom && (
        <EditRoomDialog
          room={editingRoom}
          onClose={() => setEditingRoom(null)}
          onSave={handleUpdate}
        />
      )}

      {verifyingRoom && (
        <VerificationDialog
          room={verifyingRoom}
          onClose={() => setVerifyingRoom(null)}
          onSave={handleVerification}
        />
      )}

      <Footer />
    </div>
  );
}
