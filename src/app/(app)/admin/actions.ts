'use server';

import {
  generateDevotionalVideoFromPhoto,
  type GenerateDevotionalVideoInput,
} from '@/ai/flows/admin-generate-devotional-video-from-photo';
import { z } from 'zod';

const GenerateDevotionalVideoInputSchema = z.object({
  photoDataUri: z.string().min(1, "Photo is required."),
  template: z.string(),
  music: z.string(),
  quote: z.string().min(1, "Quote is required."),
  overlay: z.string(),
});

export async function createVideoAction(input: GenerateDevotionalVideoInput) {
  try {
    const validatedInput = GenerateDevotionalVideoInputSchema.parse(input);
    const result = await generateDevotionalVideoFromPhoto(validatedInput);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
        return { success: false, error: 'Invalid input: ' + error.errors.map(e => e.message).join(', ') };
    }
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unknown error occurred.',
    };
  }
}
