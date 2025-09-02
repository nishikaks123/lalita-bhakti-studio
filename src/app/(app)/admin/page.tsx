import { LogoUploader } from "@/components/logo-uploader";
import { VideoGeneratorForm } from "@/components/video-generator-form";
import { Separator } from "@/components/ui/separator";

export default function AdminPage() {
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
