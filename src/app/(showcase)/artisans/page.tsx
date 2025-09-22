import ArtisanCard from "@/components/artisans/ArtisanCard";
import { artisans } from "@/lib/data";

export default function ArtisansPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold md:text-5xl">Our Artisans</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Meet the talented creators who are the heart of India's craft heritage. Each artisan has a unique story and a timeless skill.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {artisans.map(artisan => (
          <ArtisanCard key={artisan.id} artisan={artisan} />
        ))}
      </div>
    </div>
  );
}
