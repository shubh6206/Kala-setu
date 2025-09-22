'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Artisan } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export default function ArtisanCard({ artisan }: { artisan: Artisan }) {
  const avatarImage = PlaceHolderImages.find((img) => img.id === artisan.avatarImageId);

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
            {avatarImage && (
                <Image
                    src={avatarImage.imageUrl}
                    alt={artisan.name}
                    data-ai-hint={avatarImage.imageHint}
                    fill
                    className="object-cover"
                />
            )}
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-2xl">{artisan.name}</CardTitle>
        <CardDescription className="text-primary font-semibold mt-1">{artisan.craft}</CardDescription>
        <div className="flex items-center text-muted-foreground text-sm mt-2">
            <MapPin className="h-4 w-4 mr-1" />
            {artisan.location}
        </div>
        <p className="mt-4 text-sm text-foreground/80 line-clamp-3">
          {artisan.story}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full" variant="outline">
          <Link href={`/artisans/${artisan.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
