import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

export default function DashboardPage() {
  const content = [
    {
      title: 'Morning Aarti',
      type: 'video',
      img: 'https://picsum.photos/600/400?random=1',
      hint: 'divine light'
    },
    {
      title: 'Krishna Bhajan',
      type: 'video',
      img: 'https://picsum.photos/600/400?random=2',
      hint: 'devotional music'
    },
    {
      title: 'Ganges River',
      type: 'photo',
      img: 'https://picsum.photos/600/400?random=3',
      hint: 'holy river'
    },
    {
      title: 'Temple Bells',
      type: 'video',
      img: 'https://picsum.photos/600/400?random=4',
      hint: 'temple prayer'
    },
    {
      title: 'Himalayan Sunrise',
      type: 'photo',
      img: 'https://picsum.photos/600/400?random=5',
      hint: 'mountain sunrise'
    },
    {
      title: 'Evening Prayer',
      type: 'video',
      img: 'https://picsum.photos/600/400?random=6',
      hint: 'evening prayer'
    },
  ];

  const videos = content.filter((item) => item.type === 'video');
  const photos = content.filter((item) => item.type === 'photo');

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s your daily dose of devotion.</p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold font-headline mb-4">Latest Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map((item, index) => (
            <Card key={index} className="overflow-hidden group">
              <CardContent className="p-0 relative">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={600}
                  height={400}
                  data-ai-hint={item.hint}
                  className="w-full h-auto aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="text-white h-12 w-12" />
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <p className="font-semibold">{item.title}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold font-headline mb-4">Latest Photos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {photos.map((item, index) => (
            <Card key={index} className="overflow-hidden group">
              <CardContent className="p-0">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={600}
                  height={400}
                  data-ai-hint={item.hint}
                  className="w-full h-auto aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </CardContent>
              <CardFooter className="p-4">
                <p className="font-semibold">{item.title}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
