import InteractiveMap from "@/components/craft-map/InteractiveMap";

export default function CraftMapPage() {
    return (
        <div className="container mx-auto py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-headline font-bold md:text-5xl">Interactive Craft Map</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Embark on a visual journey across India and discover the rich, diverse origins of its traditional handicrafts. Click on a state to learn more.
                </p>
            </div>
            <div className="relative w-full max-w-4xl mx-auto aspect-[4/3]">
                <InteractiveMap />
            </div>
        </div>
    );
}
