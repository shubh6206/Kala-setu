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
      <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        {/* Vibrant Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600" />
        
        {/* Craft Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-yellow-300 rounded-full animate-pulse" />
          <div className="absolute top-20 right-20 w-24 h-24 bg-blue-400 rounded-lg rotate-45 animate-bounce" />
          <div className="absolute bottom-20 left-20 w-28 h-28 border-4 border-green-400 rotate-12" />
          <div className="absolute bottom-10 right-10 w-20 h-20 bg-purple-400 rounded-full animate-pulse" />
          
          {/* Traditional Pattern Elements */}
          <div className="absolute top-1/3 left-1/4 w-16 h-16 border-2 border-yellow-400 transform rotate-45" />
          <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-cyan-400 rounded-full opacity-60" />
          <div className="absolute bottom-1/3 left-1/3 w-14 h-14 border-2 border-pink-400 rounded-lg rotate-12" />
        </div>

        {/* Heritage Craft Image */}
        {heroImage && (
          <div className="absolute inset-0">
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              data-ai-hint={heroImage.imageHint}
              fill
              className="object-cover mix-blend-overlay opacity-40"
              priority
            />
          </div>
        )}
        
        {/* Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        
        <div className="relative container mx-auto h-full flex flex-col items-center justify-center text-center text-white px-4">
          {/* Decorative Elements */}
          <div className="absolute top-8 left-8 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
          <div className="absolute top-12 right-12 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          
          <div className="max-w-4xl">
            <h1 className="text-4xl font-headline font-bold md:text-6xl lg:text-7xl leading-tight mb-6 drop-shadow-2xl">
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                The Digital Bridge
              </span>
              <br />
              <span className="text-white">for India's Artisans</span>
            </h1>
            
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-white/90 drop-shadow-lg leading-relaxed">
              🎨 Preserving heritage • 💪 Empowering creators • 🌍 Connecting cultures through technology
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-bold bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 shadow-xl transform hover:scale-105 transition-all duration-200">
                <Link href="/shilp-scan">
                  ✨ Try Shilp-Scan AI <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 shadow-xl transform hover:scale-105 transition-all duration-200">
                <Link href="/artisans">🎭 Explore Crafts</Link>
              </Button>
            </div>
          </div>
          
          {/* Floating Craft Icons */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-8 text-2xl animate-bounce">
            <span className="opacity-70">🏺</span>
            <span className="opacity-70">🧵</span>
            <span className="opacity-70">💎</span>
            <span className="opacity-70">🎨</span>
            <span className="opacity-70">🪔</span>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-headline font-bold md:text-4xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              A Holistic Cultural Hub
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              🌟 More than just a marketplace, KalaSetu is an ecosystem for discovery, learning, and empowerment.
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

      <section id="cta" className="py-16 md:py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-lg rotate-45" />
        <div className="absolute top-1/2 left-20 w-12 h-12 border-2 border-yellow-300/30 rotate-12" />
        
        <div className="container mx-auto text-center relative z-10">
            <h2 className="text-3xl font-headline font-bold md:text-4xl text-white mb-4">
              🎨 Are you an Artisan?
            </h2>
            <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              ✨ Join our vibrant community to showcase your craft to a global audience, get fair prices, and grow your business.
            </p>
            <Button size="lg" className="mt-8 font-bold bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 shadow-xl transform hover:scale-105 transition-all duration-200" asChild>
              <Link href="/join-artisan">
                🚀 Join KalaSetu Community
              </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
