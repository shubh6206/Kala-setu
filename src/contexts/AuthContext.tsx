'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from '@/hooks/use-local-storage';
import { ProfileStorage, type UserProfile } from '@/lib/profile-storage';
import { AvatarGenerator } from '@/lib/avatar-generator';

// Use the UserProfile interface from ProfileStorage
type User = UserProfile;

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role?: 'user' | 'artisan') => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>('kalasetu_user', null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Simulate API calls - replace with real authentication service
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate friendly avatar for demo user
      const avatarUrl = `https://api.dicebear.com/8.x/adventurer/svg?seed=${email}&backgroundColor=4f46e5`;

      // Mock user data - replace with real API call
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        role: 'user',
        avatar: avatarUrl,
        bio: 'Welcome to KalaSetu! I love exploring Indian handicrafts and supporting traditional artisans.',
        location: 'Mumbai, India',
        website: '',
        createdAt: new Date().toISOString(),
      };
      
      ProfileStorage.save(mockUser);
      setUser(mockUser);
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string, 
    email: string, 
    password: string, 
    role: 'user' | 'artisan' = 'user'
  ): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate professional avatar based on role with better styling
      const avatarUrl = role === 'artisan' 
        ? AvatarGenerator.generateProfessionAvatar({
            profession: 'artisan',
            gender: Math.random() > 0.5 ? 'male' : 'female',
            seed: `${name}-${email}`,
          })
        : `https://api.dicebear.com/8.x/adventurer/svg?seed=${email}&backgroundColor=4f46e5`;

      // Mock user creation - replace with real API call
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role,
        avatar: avatarUrl,
        bio: role === 'artisan' 
          ? `Passionate ${role} dedicated to preserving traditional Indian crafts and sharing cultural heritage through handmade creations.`
          : 'Welcome to KalaSetu! I love exploring Indian handicrafts and supporting traditional artisans.',
        location: '',
        website: '',
        createdAt: new Date().toISOString(),
      };
      
      ProfileStorage.save(newUser);
      setUser(newUser);
    } catch (error) {
      throw new Error('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    ProfileStorage.clear();
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    if (!user) throw new Error('No user logged in');
    
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('🔄 Updating profile with:', updates);
      
      // Update using ProfileStorage for better persistence
      const updatedUser = ProfileStorage.update({ ...user, ...updates });
      
      if (updatedUser) {
        setUser(updatedUser);
        console.log('✅ Profile updated successfully:', updatedUser);
      } else {
        throw new Error('Failed to save profile updates');
      }
    } catch (error) {
      console.error('❌ Profile update failed:', error);
      throw new Error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user: isHydrated ? user : null,
    isLoading: isLoading || !isHydrated,
    login,
    signup,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}