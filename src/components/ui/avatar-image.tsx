'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AvatarImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  size?: number;
}

export function AvatarImage({ 
  src, 
  alt, 
  className, 
  fallbackText,
  size = 128 
}: AvatarImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Generate initials from alt text or fallback text
  const getInitials = (text: string) => {
    return text
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (imageError) {
    return (
      <div 
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 text-foreground font-semibold rounded-full',
          className
        )}
        style={{ width: size, height: size }}
      >
        {getInitials(fallbackText || alt)}
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden rounded-full', className)}>
      {isLoading && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse rounded-full"
          style={{ width: size, height: size }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={cn(
          'rounded-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        onError={handleError}
        onLoad={handleLoad}
        unoptimized // This helps with SVG images
      />
    </div>
  );
}