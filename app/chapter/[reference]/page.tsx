import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChapterDisplay } from '@/components/chapter/chapter-display';

interface PageProps {
  params: {
    reference: string;
  };
}

export async function generateStaticParams() {
  // Generate a subset of popular chapters to pre-render
  const popularChapters = [
    'genesis-1', 'genesis-2', 'genesis-3', 'exodus-20', 'deuteronomy-6',
    'joshua-1', 'psalm-1', 'psalm-23', 'psalm-91', 'psalm-119',
    'proverbs-3', 'proverbs-31', 'ecclesiastes-3', 'isaiah-53', 'isaiah-55',
    'jeremiah-29', 'matthew-5', 'matthew-6', 'matthew-7', 'matthew-28',
    'mark-16', 'luke-2', 'john-1', 'john-3', 'john-14', 'john-15',
    'acts-2', 'romans-8', 'romans-12', '1-corinthians-13', '1-corinthians-15',
    'galatians-5', 'ephesians-6', 'philippians-4', 'colossians-3',
    '1-thessalonians-4', 'hebrews-11', 'james-1', '1-peter-1', '1-john-4',
    'revelation-21', 'revelation-22'
  ];

  return popularChapters.map((reference) => ({
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