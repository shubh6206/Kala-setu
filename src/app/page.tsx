import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Palette, ScanLine, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { artisans } from '@/lib/data';
import ArtisanCard from '@/components/artisans/ArtisanCard';

const features = [
  {
    icon: <ScanLine className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Shilp-Scan',
    description:
      'Identify any Indian handicraft, its origin, and history simply by taking a picture. Our novel AI brings art to your fingertips.',
    link: '/shilp-scan',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Artisan Showcase',
    description:
      'Discover dedicated profiles for artisans. Read their stories, explore their craft, and connect with the creators directly.',
    link: '/artisans',
  },
  {
    icon: <Palette className="h-8 w-8 text-primary" />,
    title: 'Interactive Craft Map',
    description:
      'Visually explore the geographical origins of different crafts on an interactive map of India. A journey of discovery awaits.',
    link: '/craft-map',
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');
  
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[60vh] md:h-[80vh]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-headline font-bold md:text-6xl lg:text-7xl leading-tight">
            The Digital Bridge for India's Artisans
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/80">
            Preserving heritage, empowering creators, and connecting cultures through technology.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="font-bold">
              <Link href="/shilp-scan">
                Try Shilp-Scan AI <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/artisans">Explore Crafts</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-headline font-bold md:text-4xl">A Holistic Cultural Hub</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              More than just a marketplace, KalaSetu is an ecosystem for discovery, learning, and empowerment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-accent/20 bg-card">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-headline text-2xl mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                   <Button asChild variant="link" className="mt-4 text-primary">
                    <Link href={feature.link}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

       <section id="featured-artisans" className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-headline font-bold md:text-4xl">Meet the Creators</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Go behind the scenes and discover the stories of the master artisans who are the soul of KalaSetu.
            </p>
          </div>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {artisans.map((artisan, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <ArtisanCard artisan={artisan} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      <section id="cta" className="py-16 md:py-24 bg-accent/20">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-headline font-bold md:text-4xl">Are you an Artisan?</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our community to showcase your craft to a global audience, get fair prices, and grow your business.
            </p>
            <Button size="lg" className="mt-8 font-bold">
              Join KalaSetu
            </Button>
        </div>
      </section>
    </div>
  );
}
