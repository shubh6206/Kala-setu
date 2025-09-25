'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { artisanRegistrationSchema } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Palette, Users, TrendingUp, Shield, CheckCircle, Upload, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';

type ArtisanFormData = z.infer<typeof artisanRegistrationSchema>;

const craftCategories = [
  'Textiles & Weaving',
  'Pottery & Ceramics', 
  'Jewelry & Metalwork',
  'Wood Carving',
  'Painting & Art',
  'Leather Craft',
  'Stone Carving',
  'Bamboo & Cane Work',
  'Embroidery',
  'Toy Making',
  'Other'
];

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

export default function JoinArtisanPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<ArtisanFormData>({
    resolver: zodResolver(artisanRegistrationSchema)
  });

  const onSubmit = async (data: ArtisanFormData) => {
    if (!agreedToTerms) {
      toast({
        title: 'Terms Required',
        description: 'Please agree to the terms and conditions to continue.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Artisan registration data:', data);
      
      toast({
        title: 'Registration Successful! 🎉',
        description: 'Welcome to KalaSetu! Your application is under review. We\'ll contact you within 2-3 business days.',
      });
      
      // Redirect to success page or dashboard
      // router.push('/artisan/dashboard');
      
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">
            Join KalaSetu as an Artisan
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Showcase your traditional crafts to the world, connect with customers, and grow your business
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8" />
              <span className="text-lg">Global Reach</span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8" />
              <span className="text-lg">Fair Pricing</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8" />
              <span className="text-lg">Secure Platform</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Benefits Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Palette className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Showcase Your Art</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create a beautiful profile to display your crafts, tell your story, and attract customers worldwide.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Grow Your Business</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access new markets, get fair prices for your work, and build a sustainable craft business.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Join Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with fellow artisans, share knowledge, and be part of preserving traditional crafts.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Artisan Registration</CardTitle>
              <CardDescription>
                Fill out this form to join our community of talented artisans. All fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        {...register('name')}
                        placeholder="Enter your full name"
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="your.email@example.com"
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        {...register('phone')}
                        placeholder="+91 9876543210"
                        className={errors.phone ? 'border-red-500' : ''}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="location">Location (City, State) *</Label>
                      <Input
                        id="location"
                        {...register('location')}
                        placeholder="e.g., Jaipur, Rajasthan"
                        className={errors.location ? 'border-red-500' : ''}
                      />
                      {errors.location && (
                        <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Craft Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Craft Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="craft">Primary Craft *</Label>
                      <Select onValueChange={(value) => setValue('craft', value)}>
                        <SelectTrigger className={errors.craft ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select your primary craft" />
                        </SelectTrigger>
                        <SelectContent>
                          {craftCategories.map((craft) => (
                            <SelectItem key={craft} value={craft}>
                              {craft}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.craft && (
                        <p className="text-sm text-red-500 mt-1">{errors.craft.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <Input
                        id="experience"
                        type="number"
                        {...register('experience', { valueAsNumber: true })}
                        placeholder="e.g., 10"
                        min="0"
                        max="100"
                        className={errors.experience ? 'border-red-500' : ''}
                      />
                      {errors.experience && (
                        <p className="text-sm text-red-500 mt-1">{errors.experience.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="story">Your Craft Story *</Label>
                    <Textarea
                      id="story"
                      {...register('story')}
                      placeholder="Tell us about your craft journey, techniques you use, and what makes your work special..."
                      rows={4}
                      className={errors.story ? 'border-red-500' : ''}
                    />
                    {errors.story && (
                      <p className="text-sm text-red-500 mt-1">{errors.story.message}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">
                      Minimum 50 characters. This will be displayed on your profile.
                    </p>
                  </div>
                </div>

                {/* Account Setup */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Account Setup</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Label htmlFor="password">Password *</Label>
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                        placeholder="Create a strong password"
                        className={errors.password ? 'border-red-500' : ''}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-6 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      {errors.password && (
                        <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                      )}
                    </div>
                    
                    <div className="relative">
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('confirmPassword')}
                        placeholder="Confirm your password"
                        className={errors.confirmPassword ? 'border-red-500' : ''}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-6 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{' '}
                        <Link href="/terms" className="text-orange-600 hover:underline">
                          Terms and Conditions
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-orange-600 hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        By joining, you agree to showcase authentic handmade crafts and maintain quality standards.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting || !agreedToTerms}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processing Registration...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Join KalaSetu Community
                      </>
                    )}
                  </Button>
                  
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Already have an account?{' '}
                    <Link href="/login" className="text-orange-600 hover:underline">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}