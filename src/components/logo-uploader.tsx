'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, UploadCloud, Wand2, X } from 'lucide-react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

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
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { db, storage } from '@/lib/firebase';


const formSchema = z.object({
  logo: z.instanceof(File).refine(file => file.size > 0, 'Please upload an image.'),
});

type LogoFormValues = z.infer<typeof formSchema>;

export function LogoUploader() {
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LogoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo: new File([], ''),
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        form.setValue('logo', file, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    form.setValue('logo', new File([], ''));
    const fileInput = document.getElementById('logo') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  const onSubmit = async (data: LogoFormValues) => {
    setIsLoading(true);

    try {
        const logoFile = data.logo;
        const storageRef = ref(storage, `logos/app-logo-${Date.now()}`);
        const uploadResult = await uploadBytes(storageRef, logoFile);
        const downloadURL = await getDownloadURL(uploadResult.ref);

        await setDoc(doc(db, 'settings', 'logo'), { url: downloadURL });

        toast({
            title: 'Success!',
            description: 'The application logo has been updated.',
        });
    } catch (error) {
        console.error("Error uploading logo:", error)
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to update the logo. Please try again.',
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Card>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                    <CardTitle className="font-headline">Update Application Logo</CardTitle>
                    <CardDescription>
                        Upload a new image to set as the application logo.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <FormField
                        control={form.control}
                        name="logo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Logo Image</FormLabel>
                                <FormControl>
                                <div className="w-full">
                                  {logoPreview ? (
                                    <div className="relative aspect-square w-48 rounded-lg overflow-hidden border">
                                      <Image src={logoPreview} alt="Preview" fill className="object-cover" />
                                      <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={removeLogo}>
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ) : (
                                    <label htmlFor="logo" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP</p>
                                      </div>
                                      <Input id="logo" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
                                    </label>
                                  )}
                                </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
                <CardFooter className="border-t pt-6">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <UploadCloud className="mr-2 h-4 w-4" />
                                Update Logo
                            </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Form>
    </Card>
  );
}
