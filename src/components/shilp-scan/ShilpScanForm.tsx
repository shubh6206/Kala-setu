'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { shilpScanIdentifyHandicraft, ShilpScanIdentifyHandicraftOutput } from '@/ai/flows/shilp-scan-identify-handicraft';
import { shilpScanConfidenceLevel, ShilpScanConfidenceLevelOutput } from '@/ai/flows/shilp-scan-confidence-level';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Upload, ScanLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ShilpScanResult } from './ShilpScanResult';

export function ShilpScanForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ShilpScanIdentifyHandicraftOutput | null>(null);
  const [confidence, setConfidence] = useState<ShilpScanConfidenceLevelOutput | null>(null);
  
  const { toast } = useToast();
  const placeholderImage = PlaceHolderImages.find(img => img.id === 'shilp-scan-placeholder');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setResult(null);
      setConfidence(null);
    }
  };

  const toDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new window.Image();
      
      img.onload = () => {
        // Calculate new dimensions (max 1024px on longest side)
        const maxSize = 1024;
        let { width, height } = img;
        
        if (width > height && width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        }, 'image/jpeg', 0.8);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select an image file to scan.",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file (JPG, PNG, etc.).",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    setConfidence(null);

    try {
      // Show demo mode notification
      toast({
        title: "🤖 AI Analysis Starting",
        description: "Analyzing your handicraft image... (Demo mode with mock AI responses)",
      });

      const dataUri = await toDataURL(file);
      const identificationResult = await shilpScanIdentifyHandicraft({ photoDataUri: dataUri });
      setResult(identificationResult);

      if (identificationResult) {
        const confidenceResult = await shilpScanConfidenceLevel({
          artForm: identificationResult.artForm,
          confidenceScore: identificationResult.confidence,
        });
        setConfidence(confidenceResult);
        
        toast({
          title: "✨ Analysis Complete!",
          description: `Identified as ${identificationResult.artForm} with ${confidenceResult.confidenceLevel.toLowerCase()} confidence.`,
        });
      }
    } catch (error) {
      console.error('Shilp-Scan error:', error);
      const errorMessage = error instanceof Error ? error.message : "There was an error analyzing the image. Please try again.";
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card className="w-full">
            <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div className="aspect-video border-2 border-dashed border-muted-foreground/50 rounded-lg flex items-center justify-center relative overflow-hidden bg-muted/20">
                            {preview ? (
                                <Image src={preview} alt="Image preview" fill className="object-contain" />
                            ) : placeholderImage ? (
                                 <Image src={placeholderImage.imageUrl} alt={placeholderImage.description} data-ai-hint={placeholderImage.imageHint} fill className="object-cover opacity-30" />
                            ) : (
                                <div className="text-center text-muted-foreground p-8">
                                    <Upload className="mx-auto h-12 w-12" />
                                    <p className="mt-2">Your image preview will appear here.</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="space-y-2">
                             <label htmlFor="file-upload" className="font-medium text-foreground">Upload an Image</label>
                             <Input 
                               id="file-upload" 
                               type="file" 
                               accept="image/*" 
                               onChange={handleFileChange} 
                               className="file:text-primary file:font-semibold"
                               disabled={isLoading}
                               aria-describedby="file-help"
                             />
                             <p id="file-help" className="text-sm text-muted-foreground">
                               Upload a clear picture of a handicraft item. Max size: 10MB. Supported formats: JPG, PNG, WebP.
                             </p>
                        </div>
                       

                        <Button type="submit" className="w-full" disabled={isLoading || !file}>
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <ScanLine className="mr-2 h-4 w-4" />
                            )}
                            {isLoading ? 'Analyzing...' : 'Scan with AI'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
        
        <div className="w-full">
          {isLoading && (
            <Card>
              <CardContent className="p-6 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                <h3 className="mt-4 text-xl font-semibold font-headline">Analyzing your craft...</h3>
                <p className="mt-2 text-muted-foreground">Our AI is examining the intricate details of your item. This may take a moment.</p>
              </CardContent>
            </Card>
          )}

          {result && confidence && (
             <ShilpScanResult result={result} confidence={confidence} />
          )}

          {!isLoading && !result && (
             <Card className="border-dashed">
              <CardContent className="p-10 text-center">
                <h3 className="text-xl font-semibold font-headline text-muted-foreground">Awaiting your masterpiece</h3>
                <p className="mt-2 text-muted-foreground">Upload an image and press 'Scan with AI' to see the magic happen. The analysis results will be displayed here.</p>
              </CardContent>
            </Card>
          )}
        </div>
    </div>
  );
}
