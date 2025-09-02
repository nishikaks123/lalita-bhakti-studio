'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, UploadCloud, Wand2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { createVideoAction } from '@/app/(app)/admin/actions';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';

const formSchema = z.object({
  photoDataUri: z.string().min(1, { message: 'Please upload a photo.' }),
  template: z.string(),
  music: z.string(),
  quote: z.string().min(10, { message: 'Quote must be at least 10 characters.' }),
  overlay: z.string(),
});

type VideoFormValues = z.infer<typeof formSchema>;

const templates = ["Divine Light", "Serene Flow", "Vibrant Celebration"];
const musicOptions = ["Flute Melody", "Sitar Soul", "Chants of Peace"];
const overlayOptions = ["Golden Sparkles", "Lotus Petals", "Sun Rays"];

export function VideoGeneratorForm() {
  const { toast } = useToast();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photoDataUri: '',
      template: templates[0],
      music: musicOptions[0],
      quote: '',
      overlay: overlayOptions[0],
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        form.setValue('photoDataUri', result, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    form.setValue('photoDataUri', '');
    const fileInput = document.getElementById('photo') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  const onSubmit = async (data: VideoFormValues) => {
    setIsLoading(true);
    setGeneratedVideo(null);
    const result = await createVideoAction(data);
    setIsLoading(false);

    if (result.success && result.data?.videoDataUri) {
      setGeneratedVideo(result.data.videoDataUri);
      toast({
        title: 'Success!',
        description: 'Your devotional video has been generated.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Failed to generate video.',
      });
    }
  };

  return (
    <Card>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                    <CardTitle className="font-headline">Create Devotional Video</CardTitle>
                    <CardDescription>
                    Upload a photo and fill in the details to generate a video.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-8 md:grid-cols-2">
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="photoDataUri"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Photo</FormLabel>
                                    <FormControl>
                                    <div className="w-full">
                                      {photoPreview ? (
                                        <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                                          <Image src={photoPreview} alt="Preview" fill className="object-cover" />
                                          <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={removePhoto}>
                                            <X className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      ) : (
                                        <label htmlFor="photo" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP</p>
                                          </div>
                                          <Input id="photo" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
                                        </label>
                                      )}
                                    </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="quote"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Devotional Quote</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter a beautiful quote to display on the video..." {...field} rows={4}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-4 content-start">
                        <FormField
                            control={form.control}
                            name="template"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Template</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger><SelectValue placeholder="Select a template" /></SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {templates.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                    </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="music"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Background Music</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger><SelectValue placeholder="Select music" /></SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {musicOptions.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                                    </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="overlay"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Overlay Effect</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger><SelectValue placeholder="Select an overlay" /></SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {overlayOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                                    </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Wand2 className="mr-2 h-4 w-4" />
                                Generate Video
                            </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Form>
        
        {(isLoading || generatedVideo) && (
            <CardContent>
                <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-4 font-headline">Generated Video</h3>
                    <div className="aspect-video w-full max-w-md mx-auto bg-muted rounded-lg flex items-center justify-center">
                        {isLoading && (
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <Loader2 className="h-8 w-8 animate-spin" />
                                <p>Generating video... This may take a minute.</p>
                            </div>
                        )}
                        {generatedVideo && !isLoading && (
                            <video src={generatedVideo} controls className="w-full h-full rounded-lg" />
                        )}
                    </div>
                </div>
            </CardContent>
        )}
    </Card>
  );
}
