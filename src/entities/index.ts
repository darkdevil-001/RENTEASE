/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: roommategroups
 * Interface for RoommateGroups
 */
export interface RoommateGroups {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  groupName?: string;
  /** @wixFieldType number */
  groupSize?: number;
  /** @wixFieldType text */
  preferredLocation?: string;
  /** @wixFieldType text */
  budgetRange?: string;
  /** @wixFieldType date */
  moveInDate?: Date | string;
  /** @wixFieldType boolean */
  isStudentGroup?: boolean;
  /** @wixFieldType boolean */
  isWorkingGroup?: boolean;
  /** @wixFieldType boolean */
  isSmokingAllowed?: boolean;
  /** @wixFieldType boolean */
  isQuietGroup?: boolean;
  /** @wixFieldType text */
  foodPreference?: string;
  /** @wixFieldType number */
  compatibilityScore?: number;
  /** @wixFieldType text */
  groupDescription?: string;
}


/**
 * Collection ID: rooms
 * Interface for Rooms
 */
export interface Rooms {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType number */
  monthlyRent?: number;
  /** @wixFieldType text */
  roomType?: string;
  /** @wixFieldType number */
  capacity?: number;
  /** @wixFieldType date */
  availabilityDate?: Date | string;
  /** @wixFieldType text */
  leaseOption?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  roomImage?: string;
  /** @wixFieldType boolean */
  isStudentFriendly?: boolean;
  /** @wixFieldType boolean */
  isSmokingAllowed?: boolean;
  /** @wixFieldType text */
  foodPreference?: string;
  /** @wixFieldType text */
  socialPreference?: string;
}


/**
 * Collection ID: users
 * Interface for UserProfiles
 */
export interface UserProfiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  userType?: string;
  /** @wixFieldType text */
  smokingPreference?: string;
  /** @wixFieldType text */
  foodPreference?: string;
  /** @wixFieldType text */
  socialHabits?: string;
  /** @wixFieldType text */
  preferredLocation?: string;
  /** @wixFieldType number */
  minBudget?: number;
  /** @wixFieldType number */
  maxBudget?: number;
}
