import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Rooms } from '@/entities';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import { ArrowLeft, MapPin, Calendar, DollarSign, Users, Home } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RoomDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<Rooms | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRoom();
  }, [id]);

  const loadRoom = async () => {
    if (!id) return;
    setIsLoading(true);
    const data = await BaseCrudService.getById<Rooms>('rooms', id);
    setRoom(data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <section className="w-full max-w-[100rem] mx-auto px-8 py-16 min-h-[600px]">
          <Link to="/find-room" className="inline-flex items-center gap-2 font-paragraph text-base text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </Link>

          {isLoading ? (
            <div className="flex justify-center items-center py-24">
              <LoadingSpinner />
            </div>
          ) : !room ? (
            <div className="text-center py-24">
              <h2 className="font-heading text-3xl text-foreground mb-4 uppercase tracking-wide">
                Room Not Found
              </h2>
              <p className="font-paragraph text-base text-secondary mb-8">
                The room you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/find-room">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Browse All Rooms
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                {room.roomImage && (
                  <div className="aspect-[4/3] border border-grey300 overflow-hidden mb-8">
                    <Image
                      src={room.roomImage}
                      alt={`Room in ${room.location}`}
                      className="w-full h-full object-cover"
                      width={800}
                    />
                  </div>
                )}
              </div>

              <div>
                <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4 uppercase tracking-tight">
                  {room.location}
                </h1>
                
                <div className="flex items-center gap-2 mb-8">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-paragraph text-lg text-secondary">
                    {room.location}
                  </span>
                </div>

                <div className="border-t border-grey200 pt-8 mb-8">
                  <p className="font-heading text-4xl text-primary mb-8">
                    ${room.monthlyRent}/month
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="flex items-start gap-3">
                      <Home className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-heading text-sm text-foreground uppercase tracking-wide mb-1">
                          Room Type
                        </p>
                        <p className="font-paragraph text-base text-secondary">
                          {room.roomType}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-heading text-sm text-foreground uppercase tracking-wide mb-1">
                          Capacity
                        </p>
                        <p className="font-paragraph text-base text-secondary">
                          {room.capacity} {room.capacity === 1 ? 'Person' : 'People'}
                        </p>
                      </div>
                    </div>

                    {room.availabilityDate && (
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-heading text-sm text-foreground uppercase tracking-wide mb-1">
                            Available From
                          </p>
                          <p className="font-paragraph text-base text-secondary">
                            {new Date(room.availabilityDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}

                    {room.leaseOption && (
                      <div className="flex items-start gap-3">
                        <DollarSign className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-heading text-sm text-foreground uppercase tracking-wide mb-1">
                            Lease Option
                          </p>
                          <p className="font-paragraph text-base text-secondary">
                            {room.leaseOption}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {room.description && (
                  <div className="border-t border-grey200 pt-8 mb-8">
                    <h2 className="font-heading text-xl text-foreground mb-4 uppercase tracking-wide">
                      Description
                    </h2>
                    <p className="font-paragraph text-base text-secondary leading-relaxed">
                      {room.description}
                    </p>
                  </div>
                )}

                <div className="border-t border-grey200 pt-8 mb-8">
                  <h2 className="font-heading text-xl text-foreground mb-4 uppercase tracking-wide">
                    Preferences
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {room.isStudentFriendly && (
                      <span className="font-paragraph text-sm text-foreground bg-grey100 px-4 py-2 border border-grey300">
                        Student Friendly
                      </span>
                    )}
                    {room.isSmokingAllowed !== undefined && (
                      <span className="font-paragraph text-sm text-foreground bg-grey100 px-4 py-2 border border-grey300">
                        {room.isSmokingAllowed ? 'Smoking Allowed' : 'Non-Smoking'}
                      </span>
                    )}
                    {room.foodPreference && (
                      <span className="font-paragraph text-sm text-foreground bg-grey100 px-4 py-2 border border-grey300">
                        {room.foodPreference}
                      </span>
                    )}
                    {room.socialPreference && (
                      <span className="font-paragraph text-sm text-foreground bg-grey100 px-4 py-2 border border-grey300">
                        {room.socialPreference}
                      </span>
                    )}
                  </div>
                </div>

                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base">
                  Contact Owner
                </Button>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
