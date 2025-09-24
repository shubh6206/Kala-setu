/**
 * Profile Storage Service
 * Handles saving and loading user profile data
 */

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'artisan' | 'admin';
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  createdAt: string;
  updatedAt?: string;
}

const STORAGE_KEY = 'kalasetu_user_profile';

export class ProfileStorage {
  static save(profile: UserProfile): void {
    try {
      const profileWithTimestamp = {
        ...profile,
        updatedAt: new Date().toISOString(),
      };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profileWithTimestamp));
        console.log('✅ Profile saved to localStorage:', profileWithTimestamp);
      }
    } catch (error) {
      console.error('❌ Failed to save profile:', error);
      throw new Error('Failed to save profile data');
    }
  }

  static load(): UserProfile | null {
    try {
      if (typeof window === 'undefined') {
        return null;
      }

      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return null;
      }

      const profile = JSON.parse(stored) as UserProfile;
      console.log('📖 Profile loaded from localStorage:', profile);
      return profile;
    } catch (error) {
      console.error('❌ Failed to load profile:', error);
      return null;
    }
  }

  static clear(): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
        console.log('🗑️ Profile cleared from localStorage');
      }
    } catch (error) {
      console.error('❌ Failed to clear profile:', error);
    }
  }

  static update(updates: Partial<UserProfile>): UserProfile | null {
    try {
      const current = this.load();
      if (!current) {
        throw new Error('No profile found to update');
      }

      const updated = {
        ...current,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      this.save(updated);
      return updated;
    } catch (error) {
      console.error('❌ Failed to update profile:', error);
      throw error;
    }
  }

  // Get profile field history for debugging
  static getUpdateHistory(): string[] {
    try {
      const profile = this.load();
      if (!profile) return [];

      return [
        `Created: ${new Date(profile.createdAt).toLocaleString()}`,
        profile.updatedAt ? `Last Updated: ${new Date(profile.updatedAt).toLocaleString()}` : 'Never updated',
      ];
    } catch (error) {
      return ['Error loading history'];
    }
  }
}