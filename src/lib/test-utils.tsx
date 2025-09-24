import React from 'react';
import { Toaster } from '@/components/ui/toaster';

// Mock data for testing
export const mockArtisan = {
  id: 'test-1',
  name: 'Test Artisan',
  craft: 'Test Craft',
  location: 'Test Location',
  story: 'Test story about the artisan',
  avatarImageId: 'test-avatar',
  products: [
    {
      id: 'test-product-1',
      name: 'Test Product',
      imageId: 'test-image',
      price: 100,
    },
  ],
};

export const mockShilpScanResult = {
  artForm: 'Test Art Form',
  confidence: 0.85,
  historyAndOrigin: 'Test history and origin',
  uniqueMotifsAndCharacteristics: 'Test motifs and characteristics',
  geographicalLocation: 'Test Location',
  reasoning: 'Test reasoning',
};

export const mockConfidenceResult = {
  confidenceLevel: 'High',
  reasoning: 'Test confidence reasoning',
};

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

// Testing utilities would go here when @testing-library/react is installed
// For now, just export the providers for manual testing

export { AllTheProviders };