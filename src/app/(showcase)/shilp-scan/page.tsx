import { ShilpScanForm } from '@/components/shilp-scan/ShilpScanForm';

export default function ShilpScanPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold md:text-5xl">Shilp-Scan AI</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Uncover the story behind any Indian handicraft. Just upload a photo, and let our AI reveal its origin, history, and unique characteristics.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <ShilpScanForm />
      </div>
    </div>
  );
}
