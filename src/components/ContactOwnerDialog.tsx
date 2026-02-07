import { Rooms } from '@/entities';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Mail, Phone, User } from 'lucide-react';

interface ContactOwnerDialogProps {
  room: Rooms;
  onClose: () => void;
}

export default function ContactOwnerDialog({ room, onClose }: ContactOwnerDialogProps) {
  const handleCopyEmail = () => {
    if (room.ownerEmail) {
      navigator.clipboard.writeText(room.ownerEmail);
    }
  };

  const handleCopyPhone = () => {
    if (room.ownerPhone) {
      navigator.clipboard.writeText(room.ownerPhone);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-foreground uppercase tracking-wide">
            Owner Contact Information
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {room.ownerName && (
            <div className="flex items-start gap-3 p-4 bg-grey100 border border-grey300">
              <User className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-heading text-sm text-foreground uppercase tracking-wide mb-1">
                  Owner Name
                </p>
                <p className="font-paragraph text-base text-foreground">
                  {room.ownerName}
                </p>
              </div>
            </div>
          )}

          {room.ownerPhone && (
            <div className="flex items-start gap-3 p-4 bg-grey100 border border-grey300">
              <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-heading text-sm text-foreground uppercase tracking-wide mb-1">
                  Phone Number
                </p>
                <p className="font-paragraph text-base text-foreground">
                  {room.ownerPhone}
                </p>
              </div>
              <Button
                onClick={handleCopyPhone}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs py-1 px-2 flex-shrink-0"
              >
                Copy
              </Button>
            </div>
          )}

          {room.ownerEmail && (
            <div className="flex items-start gap-3 p-4 bg-grey100 border border-grey300">
              <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-heading text-sm text-foreground uppercase tracking-wide mb-1">
                  Email Address
                </p>
                <p className="font-paragraph text-base text-foreground break-all">
                  {room.ownerEmail}
                </p>
              </div>
              <Button
                onClick={handleCopyEmail}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs py-1 px-2 flex-shrink-0"
              >
                Copy
              </Button>
            </div>
          )}

          {!room.ownerName && !room.ownerPhone && !room.ownerEmail && (
            <div className="p-4 bg-grey100 border border-grey300 text-center">
              <p className="font-paragraph text-base text-secondary">
                Owner contact information is not available for this listing.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={onClose}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
