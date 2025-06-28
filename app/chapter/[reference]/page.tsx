import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChapterDisplay } from '@/components/chapter/chapter-display';
import { getAllChapterReferences } from '@/lib/bible-data';

interface PageProps {
  params: {
    reference: string;
  };
}

export async function generateStaticParams() {
  // Generate all possible chapter references for static export
  const allChapterReferences = await getAllChapterReferences();
  
  return allChapterReferences.map((reference) => ({
    reference,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const reference = params.reference.replace(/-/g, ' ');
  
  return {
    title: `${reference} - Read Full Chapter | PrayerVerses.com`,
    description: `Read the complete chapter of ${reference} with verse-by-verse navigation and commentary.`,
    keywords: `${reference}, Bible chapter, scripture reading, biblical text`,
    openGraph: {
      title: `${reference} - Read Full Chapter`,
      description: `Read the complete chapter of ${reference} with verse-by-verse navigation.`,
      type: 'article',
    },
  };
}

export default function ChapterPage({ params }: PageProps) {
  const reference = params.reference.replace(/-/g, ' ');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main>
        <ChapterDisplay reference={reference} />
      </main>
      <Footer />
    </div>
  );
}