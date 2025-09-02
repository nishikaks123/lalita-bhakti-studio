
'use client';

import { LogoUploader } from "@/components/logo-uploader";
import { VideoGeneratorForm } from "@/components/video-generator-form";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function AdminPage() {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!isAdmin) {
    return (
        <div className="flex justify-center items-center h-full">
            <Card className="w-full max-w-md">
                <CardHeader className="flex flex-row items-center gap-4">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                    <CardTitle>Access Denied</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>You do not have permission to view this page. You will be redirected to the dashboard.</p>
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin Panel</h1>
        <p className="text-muted-foreground">
          AI-powered tool to create devotional videos and manage app settings.
        </p>
      </div>

      <VideoGeneratorForm />

      <Separator />

      <LogoUploader />
    </div>
  );
}
