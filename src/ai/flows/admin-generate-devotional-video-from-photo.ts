'use server';

/**
 * @fileOverview Flow for generating devotional videos from a photo.
 *
 * - generateDevotionalVideoFromPhoto - A function that handles the video generation process.
 * - GenerateDevotionalVideoInput - The input type for the generateDevotionalVideoFromPhoto function.
 * - GenerateDevotionalVideoOutput - The return type for the generateDevotionalVideoFromPhoto function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import * as fs from 'fs';
import {Readable} from 'stream';

const GenerateDevotionalVideoInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo to use as the basis for the video, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // prettier-ignore
    ),
  template: z.string().describe('The video template to use.'),
  music: z.string().describe('Background music for the video.'),
  quote: z.string().describe('A devotional quote to overlay on the video.'),
  overlay: z.string().describe('An optional overlay effect to add to the video.'),
});

export type GenerateDevotionalVideoInput = z.infer<
  typeof GenerateDevotionalVideoInputSchema
>;

const GenerateDevotionalVideoOutputSchema = z.object({
  videoDataUri: z.string().describe('The generated video as a data URI.'),
});

export type GenerateDevotionalVideoOutput = z.infer<
  typeof GenerateDevotionalVideoOutputSchema
>;

export async function generateDevotionalVideoFromPhoto(
  input: GenerateDevotionalVideoInput
): Promise<GenerateDevotionalVideoOutput> {
  return generateDevotionalVideoFromPhotoFlow(input);
}

const generateDevotionalVideoFromPhotoFlow = ai.defineFlow(
  {
    name: 'generateDevotionalVideoFromPhotoFlow',
    inputSchema: GenerateDevotionalVideoInputSchema,
    outputSchema: GenerateDevotionalVideoOutputSchema,
  },
  async input => {
    let {operation} = await ai.generate({
      model: 'googleai/veo-2.0-generate-001',
      prompt: [
        {
          text: `Create a devotional video using the ${input.template} template, add the following quote: ${input.quote}, and use ${input.music} for the music. Add ${input.overlay} as an overlay.`,
        },
        {
          media: {url: input.photoDataUri},
        },
      ],
      config: {
        durationSeconds: 5,
        aspectRatio: '9:16',
        personGeneration: 'allow_adult',
      },
    });

    if (!operation) {
      throw new Error('Expected the model to return an operation');
    }

    // Wait until the operation completes. Note that this may take some time, maybe even up to a minute. Design the UI accordingly.
    while (!operation.done) {
      operation = await ai.checkOperation(operation);
      // Sleep for 5 seconds before checking again.
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    if (operation.error) {
      throw new Error('failed to generate video: ' + operation.error.message);
    }

    const video = operation.output?.message?.content.find(p => !!p.media);
    if (!video) {
      throw new Error('Failed to find the generated video');
    }
    const path = 'output.mp4';
    await downloadVideo(video, path);

    const videoData = fs.readFileSync(path);
    const videoBase64 = videoData.toString('base64');

    return {videoDataUri: `data:video/mp4;base64,${videoBase64}`};
  }
);

async function downloadVideo(video: any, path: string) {
  const fetch = (await import('node-fetch')).default;
  // Add API key before fetching the video.
  const videoDownloadResponse = await fetch(
    `${video.media!.url}&key=${process.env.GEMINI_API_KEY}`
  );
  if (
    !videoDownloadResponse ||
    videoDownloadResponse.status !== 200 ||
    !videoDownloadResponse.body
  ) {
    throw new Error('Failed to fetch video');
  }

  Readable.from(videoDownloadResponse.body).pipe(fs.createWriteStream(path));
}

