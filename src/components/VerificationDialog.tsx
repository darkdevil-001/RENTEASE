import { useState } from 'react';
import { Rooms } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface VerificationDialogProps {
  room: Rooms;
  onClose: () => void;
  onSave: (room: Rooms) => void;
}

export default function VerificationDialog({ room, onClose, onSave }: VerificationDialogProps) {
  const [verificationType, setVerificationType] = useState<'license' | 'voter' | 'aadhaar' | ''>('');
  const [verificationId, setVerificationId] = useState(room.identityNumber || '');
  const [hasRentalAgreement, setHasRentalAgreement] = useState(room.hasRentalAgreement || false);
  const [hasOwnershipAgreement, setHasOwnershipAgreement] = useState(room.hasOwnershipAgreement || false);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(room.ownerVerificationStatus === 'Verified');

  const validateDrivingLicense = (id: string): boolean => {
    // Format: 10-15 alphanumeric characters
    const licenseRegex = /^[A-Z0-9]{10,15}$/i;
    return licenseRegex.test(id.trim());
  };

  const validateVoterId = (id: string): boolean => {
    // Format: 8-12 alphanumeric characters
    const voterRegex = /^[A-Z0-9]{8,12}$/i;
    return voterRegex.test(id.trim());
  };

  const validateAadhaar = (id: string): boolean => {
    // Format: 12 digits
    const aadhaarRegex = /^[0-9]{12}$/;
    return aadhaarRegex.test(id.trim());
  };

  const validatePAN = (id: string): boolean => {
    // Format: 10 alphanumeric characters (PAN format: AAAAA0000A)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(id.trim());
  };

  const handleVerify = () => {
    setError('');

    if (!verificationType) {
      setError('Please select a verification type');
      return;
    }

    if (!verificationId.trim()) {
      setError('Please enter a verification ID');
      return;
    }

    let isValid = false;
    if (verificationType === 'license') {
      isValid = validateDrivingLicense(verificationId);
      if (!isValid) {
        setError('Invalid Driving License format. Use 10-15 alphanumeric characters.');
        return;
      }
    } else if (verificationType === 'voter') {
      isValid = validateVoterId(verificationId);
      if (!isValid) {
        setError('Invalid Voter ID format. Use 8-12 alphanumeric characters.');
        return;
      }
    } else if (verificationType === 'aadhaar') {
      isValid = validateAadhaar(verificationId);
      if (!isValid) {
        setError('Invalid Aadhaar format. Use 12 digits.');
        return;
      }
    }

    setIsVerified(true);
  };

  const handleSave = () => {
    if (!isVerified) {
      setError('Please complete verification first');
      return;
    }

    const updatedRoom: Rooms = {
      ...room,
      ownerVerificationStatus: 'Verified',
      identityNumber: verificationId,
      hasRentalAgreement: hasRentalAgreement,
      hasOwnershipAgreement: hasOwnershipAgreement,
    };

    onSave(updatedRoom);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-foreground uppercase tracking-wide">
            Verify Your Identity
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {isVerified ? (
            <div className="p-4 bg-grey100 border border-primary rounded">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-paragraph font-semibold text-primary">
                  Verification Successful
                </span>
              </div>
              <p className="font-paragraph text-sm text-secondary">
                Your identity has been verified (format checked). This will be displayed on your room listing as a trust indicator.
              </p>
            </div>
          ) : (
            <>
              <div>
                <Label className="font-paragraph text-sm text-foreground mb-3 block">
                  Verification Type *
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-grey300 cursor-pointer hover:bg-grey100">
                    <input
                      type="radio"
                      name="verificationType"
                      value="aadhaar"
                      checked={verificationType === 'aadhaar'}
                      onChange={(e) => setVerificationType(e.target.value as 'aadhaar')}
                      className="w-4 h-4"
                    />
                    <span className="font-paragraph text-sm text-foreground">
                      Aadhaar / PAN Number
                    </span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-grey300 cursor-pointer hover:bg-grey100">
                    <input
                      type="radio"
                      name="verificationType"
                      value="license"
                      checked={verificationType === 'license'}
                      onChange={(e) => setVerificationType(e.target.value as 'license')}
                      className="w-4 h-4"
                    />
                    <span className="font-paragraph text-sm text-foreground">
                      Driving License
                    </span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-grey300 cursor-pointer hover:bg-grey100">
                    <input
                      type="radio"
                      name="verificationType"
                      value="voter"
                      checked={verificationType === 'voter'}
                      onChange={(e) => setVerificationType(e.target.value as 'voter')}
                      className="w-4 h-4"
                    />
                    <span className="font-paragraph text-sm text-foreground">
                      Voter ID
                    </span>
                  </label>
                </div>
              </div>

              {verificationType && (
                <div>
                  <Label htmlFor="verificationId" className="font-paragraph text-sm text-foreground mb-2 block">
                    {verificationType === 'aadhaar' ? 'Aadhaar / PAN Number' : verificationType === 'license' ? 'Driving License Number' : 'Voter ID Number'} *
                  </Label>
                  <Input
                    id="verificationId"
                    type="text"
                    value={verificationId}
                    onChange={(e) => setVerificationId(e.target.value)}
                    placeholder={verificationType === 'aadhaar' ? 'Enter Aadhaar (12 digits) or PAN' : verificationType === 'license' ? 'Enter license number' : 'Enter voter ID number'}
                    className="bg-background border-grey300 uppercase"
                  />
                  <p className="font-paragraph text-xs text-secondary mt-2">
                    {verificationType === 'aadhaar'
                      ? 'Format: 12 digits for Aadhaar or AAAAA0000A for PAN'
                      : verificationType === 'license'
                      ? 'Format: 10-15 alphanumeric characters'
                      : 'Format: 8-12 alphanumeric characters'}
                  </p>
                </div>
              )}

              <div className="border-t border-grey200 pt-4">
                <Label className="font-paragraph text-sm text-foreground mb-3 block">
                  Agreements
                </Label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3 border border-grey300 cursor-pointer hover:bg-grey100">
                    <input
                      type="checkbox"
                      checked={hasRentalAgreement}
                      onChange={(e) => setHasRentalAgreement(e.target.checked)}
                      className="w-4 h-4 mt-0.5"
                    />
                    <span className="font-paragraph text-sm text-foreground">
                      I have a valid Rental Agreement
                    </span>
                  </label>
                  <label className="flex items-start gap-3 p-3 border border-grey300 cursor-pointer hover:bg-grey100">
                    <input
                      type="checkbox"
                      checked={hasOwnershipAgreement}
                      onChange={(e) => setHasOwnershipAgreement(e.target.checked)}
                      className="w-4 h-4 mt-0.5"
                    />
                    <span className="font-paragraph text-sm text-foreground">
                      I have Home Ownership Agreement / Proof
                    </span>
                  </label>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive rounded flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="font-paragraph text-sm text-destructive">
                    {error}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-grey400 text-foreground hover:bg-grey100"
          >
            {isVerified ? 'Close' : 'Cancel'}
          </Button>
          {!isVerified && (
            <Button
              type="button"
              onClick={handleVerify}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Verify
            </Button>
          )}
          {isVerified && (
            <Button
              type="button"
              onClick={handleSave}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save & Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
