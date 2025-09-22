'use client';

import { ShilpScanIdentifyHandicraftOutput } from '@/ai/flows/shilp-scan-identify-handicraft';
import { ShilpScanConfidenceLevelOutput } from '@/ai/flows/shilp-scan-confidence-level';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface ShilpScanResultProps {
  result: ShilpScanIdentifyHandicraftOutput;
  confidence: ShilpScanConfidenceLevelOutput;
}

export function ShilpScanResult({ result, confidence }: ShilpScanResultProps) {
  const getConfidenceColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Card className="w-full shadow-lg animate-in fade-in-50 duration-500">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                 <CardTitle className="text-3xl font-headline">{result.artForm}</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">{result.geographicalLocation}</CardDescription>
            </div>
            <Badge className={cn('text-sm', getConfidenceColor(confidence.confidenceLevel))}>
                {confidence.confidenceLevel} Confidence
            </Badge>
        </div>
      </CardHeader>
      <CardContent>
         <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-primary">AI Confidence Reasoning</h4>
              <p className="text-sm text-muted-foreground italic mt-1">"{confidence.reasoning}"</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold font-headline text-lg">History & Origin</h4>
              <p className="mt-2 text-foreground/80">{result.historyAndOrigin}</p>
            </div>
            <div>
              <h4 className="font-semibold font-headline text-lg">Unique Motifs & Characteristics</h4>
              <p className="mt-2 text-foreground/80">{result.uniqueMotifsAndCharacteristics}</p>
            </div>
             <div>
              <h4 className="font-semibold font-headline text-lg">AI Identification Reasoning</h4>
              <p className="mt-2 text-foreground/80">{result.reasoning}</p>
            </div>
         </div>
      </CardContent>
    </Card>
  );
}
