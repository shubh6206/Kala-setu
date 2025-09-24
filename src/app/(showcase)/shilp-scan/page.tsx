import { ShilpScanForm } from '@/components/shilp-scan/ShilpScanForm';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';

export default function ShilpScanPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold md:text-5xl">Shilp-Scan AI</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Uncover the story behind any Indian handicraft. Just upload a photo, and let our AI reveal its origin, history, and unique characteristics.
        </p>
      </div>
      
      {/* Demo Mode Banner */}
      <div className="max-w-4xl mx-auto mb-8">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="flex items-center gap-3 p-4">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-900">Demo Mode Active</p>
              <p className="text-blue-700">
                This is a demonstration using mock AI responses. In production, this would connect to Google's Gemini AI for real handicraft identification.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <ShilpScanForm />
      </div>
    </div>
  );
}
