'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Camera, Save, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Breadcrumb } from '@/components/ui/breadcrumb';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  location: z.string().max(100, 'Location must be less than 100 characters').optional(),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      location: user?.location || '',
      website: user?.website || '',
    },
  });

  // Update form when user data changes
  React.useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
      });
    }
  }, [user, form]);

  const onSubmit = async (data: ProfileForm) => {
    try {
      await updateProfile({
        name: data.name,
        email: data.email,
        bio: data.bio,
        location: data.location,
        website: data.website,
      });
      
      const updatedFields = [];
      if (data.bio !== user?.bio) updatedFields.push('bio');
      if (data.location !== user?.location) updatedFields.push('location');
      if (data.website !== user?.website) updatedFields.push('website');
      if (data.name !== user?.name) updatedFields.push('name');
      if (data.email !== user?.email) updatedFields.push('email');
      
      toast({
        title: 'Profile updated successfully! ✅',
        description: updatedFields.length > 0 
          ? `Updated: ${updatedFields.join(', ')}`
          : 'All your profile information has been saved.',
      });
      
      setIsEditing(false);
    } catch (error) {
      toast({
        title: 'Failed to update profile',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">Please log in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: 'Profile' }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-lg bg-gradient-to-br from-primary/20 to-accent/20">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-white shadow-md"
              >
                <Camera className="h-4 w-4" />
              </Button>
              {/* Role indicator */}
              {user.role === 'artisan' && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                  Artisan
                </div>
              )}
            </div>
            <div className="space-y-2">
              <CardTitle className="text-xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              {user.location && (
                <p className="text-sm text-muted-foreground">{user.location}</p>
              )}
              <Badge variant="secondary" className="capitalize">
                {user.role}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.bio && (
              <div className="text-center">
                <h4 className="font-medium mb-2">About</h4>
                <p className="text-sm text-muted-foreground">{user.bio}</p>
              </div>
            )}
            
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <div>
                <p>Member since</p>
                <p>{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
              {user.updatedAt && (
                <div>
                  <p>Last updated</p>
                  <p>{new Date(user.updatedAt).toLocaleDateString()}</p>
                </div>
              )}
            </div>
            
            {user.role === 'artisan' && (
              <div className="space-y-2">
                <h4 className="font-medium">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold">12</div>
                    <div className="text-muted-foreground">Crafts</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold">4.8</div>
                    <div className="text-muted-foreground">Rating</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and preferences.
              </CardDescription>
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={!isEditing || isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            disabled={!isEditing || isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about yourself..."
                          className="min-h-[100px]"
                          {...field}
                          disabled={!isEditing || isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City, Country"
                            {...field}
                            disabled={!isEditing || isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://yourwebsite.com"
                            {...field}
                            disabled={!isEditing || isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={isLoading}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        form.reset();
                      }}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}