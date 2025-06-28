import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { VerseDisplay } from '@/components/verse/verse-display';
import { ChapterNavigation } from '@/components/verse/chapter-navigation';
import { RelatedVerses } from '@/components/verse/related-verses';
import { getAllVerseReferences } from '@/lib/bible-data';

interface PageProps {
  params: {
    reference: string;
  };
}

export async function generateStaticParams() {
  try {
    // Generate all possible verse references for static generation
    const allReferences = await getAllVerseReferences();
    
    // Return all references without limiting them
    return allReferences.map((reference) => ({
      reference,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    
    // Fallback to popular verses if there's an error
    const popularVerses = [
      'john-3-16', 'psalm-23-1', 'romans-8-28', 'philippians-4-13', 'jeremiah-29-11',
      'proverbs-3-5-6', 'matthew-28-19-20', 'ephesians-2-8-9', '1-corinthians-13-4-8',
      'psalm-46-1', 'isaiah-40-31', 'romans-12-2', 'galatians-2-20', 'hebrews-11-1',
      'james-1-2-3', '1-peter-5-7', 'revelation-21-4', 'psalm-119-105', 'matthew-5-14-16',
      'john-14-6', 'acts-1-8', 'romans-6-23', '2-corinthians-5-17', 'ephesians-6-10-11',
      'philippians-4-6-7', 'colossians-3-23', '1-thessalonians-5-16-18', '2-timothy-3-16-17',
      'hebrews-13-8', 'james-4-7', '1-john-4-19', 'psalm-139-14', 'isaiah-53-5',
      'matthew-11-28-30', 'luke-1-37', 'john-8-32', 'romans-5-8', '1-corinthians-10-13',
      'psalms-23-1', 'zechariah-1-1' // Add the specific verses that were causing errors
    ];

    return popularVerses.map((reference) => ({
      reference,
    }));
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const reference = params.reference.replace(/-/g, ' ');
  
  return {
    title: `${reference} - Bible Verse with Commentary | PrayerVerses.com`,
    description: `Read ${reference} with beautiful backgrounds, commentary, and sharing options. Discover the meaning and inspiration behind this powerful Bible verse.`,
    keywords: `${reference}, Bible verse, scripture, Christian inspiration, biblical commentary`,
    openGraph: {
      title: `${reference} - Bible Verse with Commentary`,
      description: `Read ${reference} with beautiful backgrounds, commentary, and sharing options.`,
      type: 'article',
    },
  };
}

export default function VersePage({ params }: PageProps) {
  const reference = params.reference.replace(/-/g, ' ');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main>
        <VerseDisplay reference={reference} />
        <ChapterNavigation reference={reference} />
        <RelatedVerses reference={reference} />
      </main>
      <Footer />
    </div>
  );
}