'use server';
/**
 * @fileOverview Identifies an Indian handicraft from a photo and provides its origin and history.
 *
 * - shilpScanIdentifyHandicraft - A function that handles the handicraft identification process.
 * - ShilpScanIdentifyHandicraftInput - The input type for the shilpScanIdentifyHandicraft function.
 * - ShilpScanIdentifyHandicraftOutput - The return type for the shilpScanIdentifyHandicraft function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ShilpScanIdentifyHandicraftInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of an Indian handicraft, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ShilpScanIdentifyHandicraftInput = z.infer<typeof ShilpScanIdentifyHandicraftInputSchema>;

const ShilpScanIdentifyHandicraftOutputSchema = z.object({
  artForm: z.string().describe('The identified art form of the handicraft.'),
  confidence: z.number().describe('The confidence score of the identification (0-1).'),
  historyAndOrigin: z.string().describe('The history and origin of the identified art form.'),
  uniqueMotifsAndCharacteristics: z
    .string()
    .describe('The unique motifs and characteristics of the identified art form.'),
  geographicalLocation: z.string().describe('The geographical location where the art form originates.'),
  // artisanProfiles: z.array(z.string()).describe('Profiles of verified artisans specializing in this craft.'),
  reasoning: z.string().describe('The AI\'s reasoning for the identification, including likelihood of accuracy.'),
});
export type ShilpScanIdentifyHandicraftOutput = z.infer<typeof ShilpScanIdentifyHandicraftOutputSchema>;

export async function shilpScanIdentifyHandicraft(
  input: ShilpScanIdentifyHandicraftInput
): Promise<ShilpScanIdentifyHandicraftOutput> {
  try {
    return await shilpScanIdentifyHandicraftFlow(input);
  } catch (error) {
    console.error('Error in shilpScanIdentifyHandicraft:', error);
    
    // Fallback to mock data for development/demo purposes
    console.log('Using mock data for Shilp-Scan identification');
    
    // Generate mock response based on common Indian handicrafts
    const mockCrafts = [
      {
        artForm: 'Madhubani Painting',
        confidence: 0.85,
        historyAndOrigin: 'Madhubani painting is a traditional art form from the Mithila region of Bihar, India. This ancient art form dates back to the 7th century and was traditionally practiced by women of the region. The paintings were originally done on freshly plastered mud walls and floors of huts, but are now done on cloth, handmade paper, and canvas.',
        uniqueMotifsAndCharacteristics: 'Characterized by complex geometrical patterns, vibrant colors, and themes from Hindu mythology. Common motifs include fish, birds, animals, trees, flowers, and human figures. The paintings use natural dyes and pigments, with distinctive eye-catching borders.',
        geographicalLocation: 'Madhubani district, Bihar, India',
        reasoning: 'Based on the geometric patterns, vibrant colors, and traditional motifs visible in the image, this appears to be a Madhubani painting with high confidence.'
      },
      {
        artForm: 'Terracotta Pottery',
        confidence: 0.78,
        historyAndOrigin: 'Terracotta pottery is one of the oldest forms of Indian handicrafts, dating back to the Indus Valley Civilization. This art form involves creating objects from clay that is fired at relatively low temperatures. Rajasthan, West Bengal, and Tamil Nadu are famous for their distinctive terracotta traditions.',
        uniqueMotifsAndCharacteristics: 'Features earthy reddish-brown color, hand-molded shapes, and often includes decorative elements like geometric patterns, floral designs, or figurative sculptures. The surface may be painted, glazed, or left in its natural fired state.',
        geographicalLocation: 'Rajasthan, West Bengal, Tamil Nadu, India',
        reasoning: 'The clay-based material, reddish-brown coloration, and traditional pottery techniques suggest this is terracotta work from the Indian subcontinent.'
      },
      {
        artForm: 'Warli Painting',
        confidence: 0.82,
        historyAndOrigin: 'Warli painting is a traditional tribal art form from Maharashtra, created by the Warli tribe. Dating back to 2500-3000 BCE, these paintings were traditionally done on the walls of houses using rice paste on a brown background. The art form depicts daily life, nature, and social events.',
        uniqueMotifsAndCharacteristics: 'Simple geometric shapes like circles, triangles, and lines form human figures, animals, trees, and scenes of daily life. Uses only white pigment on brown/red background, creating a distinctive monochromatic appearance with rhythmic patterns.',
        geographicalLocation: 'Maharashtra, India (Warli tribal regions)',
        reasoning: 'The geometric human figures, simple line work, and tribal artistic style are characteristic of traditional Warli painting techniques.'
      }
    ];
    
    // Return a random mock craft for demonstration
    const randomCraft = mockCrafts[Math.floor(Math.random() * mockCrafts.length)];
    
    return {
      ...randomCraft,
      reasoning: `${randomCraft.reasoning} Note: This is a demonstration using mock AI analysis as the actual AI service is not available.`
    };
  }
}

const prompt = ai.definePrompt({
  name: 'shilpScanIdentifyHandicraftPrompt',
  input: {schema: ShilpScanIdentifyHandicraftInputSchema},
  output: {schema: ShilpScanIdentifyHandicraftOutputSchema},
  prompt: `You are an expert in identifying Indian handicrafts. Analyze the image and provide information about the handicraft.

  Respond in the output format, and also add a "reasoning" field to explain the likelihood that you are correct.

  Photo: {{media url=photoDataUri}}
  `,
});

const shilpScanIdentifyHandicraftFlow = ai.defineFlow(
  {
    name: 'shilpScanIdentifyHandicraftFlow',
    inputSchema: ShilpScanIdentifyHandicraftInputSchema,
    outputSchema: ShilpScanIdentifyHandicraftOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
