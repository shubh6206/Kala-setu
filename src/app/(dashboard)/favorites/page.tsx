'use client';

import React, { useState } from 'react';
import { Heart, Grid, List, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import ArtisanCard from '@/components/artisans/ArtisanCard';
import { artisans } from '@/lib/data';
import { OptimizedImage } from '@/components/ui/optimized-image';

// Mock favorites data
const mockFavorites = {
  artisans: artisans.slice(0, 2),
  crafts: [
    {
      id: '1',
      name: 'Madhubani Fish Painting',
      artisan: 'Meena Devi',
      location: 'Madhubani, Bihar',
      price: 120,
      imageId: 'handicraft-1',
      category: 'Painting',
      dateAdded: '2024-01-15',
    },
    {
      id: '2',
      name: 'Terracotta Elephant',
      artisan: 'Rajesh Kumar',
      location: 'Jaipur, Rajasthan',
      price: 60,
      imageId: 'handicraft-2',
      category: 'Pottery',
      dateAdded: '2024-01-10',
    },
  ],
};

export default function FavoritesPage() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">Please log in to view your favorites.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredCrafts = mockFavorites.crafts.filter(craft =>
    craft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    craft.artisan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArtisans = mockFavorites.artisans.filter(artisan =>
    artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artisan.craft.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: 'Favorites' }
        ]}
      />

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-headline font-bold flex items-center gap-2">
              <Heart className="h-8 w-8 text-red-500" />
              My Favorites
            </h1>
            <p className="text-muted-foreground">
              Your saved artisans and crafts
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Favorites Content */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">
              All ({mockFavorites.artisans.length + mockFavorites.crafts.length})
            </TabsTrigger>
            <TabsTrigger value="artisans">
              Artisans ({mockFavorites.artisans.length})
            </TabsTrigger>
            <TabsTrigger value="crafts">
              Crafts ({mockFavorites.crafts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Favorite Artisans */}
            {filteredArtisans.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Favorite Artisans</h2>
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {filteredArtisans.map((artisan) => (
                    <ArtisanCard key={artisan.id} artisan={artisan} />
                  ))}
                </div>
              </div>
            )}

            {/* Favorite Crafts */}
            {filteredCrafts.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Favorite Crafts</h2>
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {filteredCrafts.map((craft) => (
                    <Card key={craft.id} className="overflow-hidden">
                      <div className="relative h-48">
                        <OptimizedImage
                          src={`https://picsum.photos/400/300?random=${craft.id}`}
                          alt={craft.name}
                          fill
                          className="object-cover"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
                        >
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold line-clamp-1">{craft.name}</h3>
                            <Badge variant="secondary">{craft.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">by {craft.artisan}</p>
                          <p className="text-sm text-muted-foreground">{craft.location}</p>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-lg font-semibold">₹{craft.price}</span>
                            <Button size="sm">View Details</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {filteredArtisans.length === 0 && filteredCrafts.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                  <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start exploring artisans and crafts to add them to your favorites!
                  </p>
                  <Button>Explore Crafts</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="artisans">
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredArtisans.map((artisan) => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="crafts">
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredCrafts.map((craft) => (
                <Card key={craft.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <OptimizedImage
                      src={`https://picsum.photos/400/300?random=${craft.id}`}
                      alt={craft.name}
                      fill
                      className="object-cover"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold line-clamp-1">{craft.name}</h3>
                        <Badge variant="secondary">{craft.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">by {craft.artisan}</p>
                      <p className="text-sm text-muted-foreground">{craft.location}</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-semibold">₹{craft.price}</span>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}