'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AvatarImage } from '@/components/ui/avatar-image';
import { cn } from '@/lib/utils';

interface ArtisanAvatarProps {
  name: string;
  craft: string;
  avatarUrl: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24', 
  lg: 'w-32 h-32',
  xl: 'w-40 h-40',
};

const containerSizes = {
  sm: 'h-24',
  md: 'h-32',
  lg: 'h-48',
  xl: 'h-56',
};

export function ArtisanAvatar({ 
  name, 
  craft, 
  avatarUrl, 
  size = 'lg', 
  showBadge = true,
  className 
}: ArtisanAvatarProps) {
  const getCraftColor = (craft: string) => {
    const craftColors: Record<string, string> = {
      'terracotta pottery': 'bg-orange-100 text-orange-800 border-orange-200',
      'pottery': 'bg-orange-100 text-orange-800 border-orange-200',
      'madhubani painting': 'bg-red-100 text-red-800 border-red-200',
      'painting': 'bg-red-100 text-red-800 border-red-200',
      'channapatna toys': 'bg-green-100 text-green-800 border-green-200',
      'toy making': 'bg-green-100 text-green-800 border-green-200',
      'weaving': 'bg-purple-100 text-purple-800 border-purple-200',
      'jewelry': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'sculpture': 'bg-gray-100 text-gray-800 border-gray-200',
    };
    
    return craftColors[craft.toLowerCase()] || 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const getBackgroundGradient = (craft: string) => {
    const gradients: Record<string, string> = {
      'terracotta pottery': 'from-orange-50 to-amber-100',
      'pottery': 'from-orange-50 to-amber-100',
      'madhubani painting': 'from-red-50 to-pink-100',
      'painting': 'from-red-50 to-pink-100',
      'channapatna toys': 'from-green-50 to-emerald-100',
      'toy making': 'from-green-50 to-emerald-100',
      'weaving': 'from-purple-50 to-violet-100',
      'jewelry': 'from-yellow-50 to-amber-100',
      'sculpture': 'from-gray-50 to-slate-100',
    };
    
    return gradients[craft.toLowerCase()] || 'from-blue-50 to-indigo-100';
  };

  return (
    <div className={cn(
      'relative flex items-center justify-center bg-gradient-to-br',
      getBackgroundGradient(craft),
      containerSizes[size],
      className
    )}>
      {/* Avatar */}
      <div className={cn(
        'relative border-4 border-white shadow-lg rounded-full',
        sizeClasses[size]
      )}>
        <AvatarImage
          src={avatarUrl}
          alt={`${name} - ${craft} artisan`}
          fallbackText={name}
          size={size === 'xl' ? 160 : size === 'lg' ? 128 : size === 'md' ? 96 : 64}
          className="w-full h-full"
        />
      </div>

      {/* Profession Badge */}
      {showBadge && (
        <Badge 
          variant="outline"
          className={cn(
            'absolute top-2 right-2 text-xs font-semibold border-2',
            getCraftColor(craft)
          )}
        >
          {craft}
        </Badge>
      )}

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner decorations */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full"></div>
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-white/30 rounded-full"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-lg"></div>
      </div>
    </div>
  );
}