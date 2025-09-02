import { VideoGeneratorForm } from "@/components/video-generator-form";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin Panel</h1>
        <p className="text-muted-foreground">
          AI-powered tool to create devotional videos from a single photo.
        </p>
      </div>
      <VideoGeneratorForm />
    </div>
  );
}
