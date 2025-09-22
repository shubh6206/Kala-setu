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
  return shilpScanIdentifyHandicraftFlow(input);
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
    outputSchema: ShililpScanIdentifyHandicraftOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
