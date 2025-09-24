'use server';
/**
 * @fileOverview An AI agent that determines the confidence level of the Shilp-Scan identification.
 *
 * - shilpScanConfidenceLevel - A function that determines the confidence level of the Shilp-Scan identification.
 * - ShilpScanConfidenceLevelInput - The input type for the shilpScanConfidenceLevel function.
 * - ShilpScanConfidenceLevelOutput - The return type for the shilpScanConfidenceLevel function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ShilpScanConfidenceLevelInputSchema = z.object({
  artForm: z.string().describe('The identified art form.'),
  confidenceScore: z.number().describe('The confidence score of the identification (0-1).'),
});
export type ShilpScanConfidenceLevelInput = z.infer<typeof ShilpScanConfidenceLevelInputSchema>;

const ShilpScanConfidenceLevelOutputSchema = z.object({
  confidenceLevel: z
    .string()
    .describe(
      'A human-readable confidence level (e.g., High, Medium, Low) based on the confidence score.'
    ),
  reasoning: z.string().describe('The reasoning behind the assigned confidence level.'),
});
export type ShilpScanConfidenceLevelOutput = z.infer<typeof ShilpScanConfidenceLevelOutputSchema>;

export async function shilpScanConfidenceLevel(
  input: ShilpScanConfidenceLevelInput
): Promise<ShilpScanConfidenceLevelOutput> {
  try {
    return await shilpScanConfidenceLevelFlow(input);
  } catch (error) {
    console.error('Error in shilpScanConfidenceLevel:', error);
    
    // Fallback to mock confidence analysis
    console.log('Using mock data for confidence level analysis');
    
    const { confidenceScore } = input;
    
    let confidenceLevel: string;
    let reasoning: string;
    
    if (confidenceScore >= 0.8) {
      confidenceLevel = 'High';
      reasoning = 'The AI model shows high confidence in this identification based on clear visual features, distinctive patterns, and strong matches with known characteristics of this art form.';
    } else if (confidenceScore >= 0.6) {
      confidenceLevel = 'Medium';
      reasoning = 'The identification shows moderate confidence. While several key features match the identified art form, some elements may be ambiguous or partially obscured.';
    } else {
      confidenceLevel = 'Low';
      reasoning = 'The confidence level is low due to unclear features, partial visibility, or mixed characteristics that make definitive identification challenging.';
    }
    
    return {
      confidenceLevel,
      reasoning: `${reasoning} Note: This is a demonstration using mock AI analysis as the actual AI service is not available.`
    };
  }
}

const prompt = ai.definePrompt({
  name: 'shilpScanConfidenceLevelPrompt',
  input: {schema: ShilpScanConfidenceLevelInputSchema},
  output: {schema: ShilpScanConfidenceLevelOutputSchema},
  prompt: `You are an AI expert in determining the confidence level of an AI-powered handicraft identification system called Shilp-Scan.

You will receive the identified art form and the confidence score (0-1) from the Shilp-Scan system.

Based on the confidence score, you will determine a human-readable confidence level (High, Medium, Low) and provide reasoning for your choice.

Art Form: {{{artForm}}}
Confidence Score: {{{confidenceScore}}}

Respond in JSON format with the following keys:
- confidenceLevel (string): A human-readable confidence level (High, Medium, Low).
- reasoning (string): The reasoning behind the assigned confidence level.

Consider these guidelines for confidence levels:
- High: Confidence score >= 0.8
- Medium: Confidence score >= 0.5 and < 0.8
- Low: Confidence score < 0.5`,
});

const shilpScanConfidenceLevelFlow = ai.defineFlow(
  {
    name: 'shilpScanConfidenceLevelFlow',
    inputSchema: ShilpScanConfidenceLevelInputSchema,
    outputSchema: ShilpScanConfidenceLevelOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
