import { artisans } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ArtisanProfilePage({ params }: { params: { id: string } }) {
  const artisan = artisans.find((a) => a.id === params.id);

  if (!artisan) {
    notFound();
  }

  const avatarImage = PlaceHolderImages.find((img) => img.id === artisan.avatarImageId);

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="shadow-lg">
            <CardHeader className="p-0">
              <div className="relative h-64 w-full">
                {avatarImage && (
                  <Image
                    src={avatarImage.imageUrl}
                    alt={artisan.name}
                    data-ai-hint={avatarImage.imageHint}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="font-headline text-3xl">{artisan.name}</CardTitle>
              <p className="text-primary font-semibold mt-1 text-lg">{artisan.craft}</p>
              <div className="flex items-center text-muted-foreground text-sm mt-2">
                <MapPin className="h-4 w-4 mr-2" />
                {artisan.location}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
            <h2 className="font-headline text-2xl font-bold">The Story of {artisan.name}</h2>
            <p className="mt-4 text-lg text-foreground/80 whitespace-pre-wrap">{artisan.story}</p>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="font-headline text-3xl font-bold text-center mb-8">Featured Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artisan.products.map(product => {
                const productImage = PlaceHolderImages.find(img => img.id === product.imageId);
                return (
                    <Card key={product.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="p-0">
                            <div className="relative h-48 w-full">
                                {productImage && (
                                     <Image
                                        src={productImage.imageUrl}
                                        alt={product.name}
                                        data-ai-hint={productImage.imageHint}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <h4 className="font-semibold text-lg truncate">{product.name}</h4>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-primary font-bold text-xl">${product.price.toFixed(2)}</p>
                                <Button size="sm">Add to Cart</Button>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
    return artisans.map((artisan) => ({
        id: artisan.id,
    }));
}
