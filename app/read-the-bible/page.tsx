import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BibleReader } from '@/components/bible/bible-reader';

export const metadata: Metadata = {
  title: 'Read the Bible Online - All 66 Books | PrayerVerses.com',
  description: 'Read the complete Bible online. Browse through all 66 books of the Old and New Testament with easy navigation and beautiful formatting.',
  keywords: 'read Bible online, Bible books, Old Testament, New Testament, scripture reading',
  openGraph: {
    title: 'Read the Bible Online - All 66 Books',
    description: 'Read the complete Bible online with easy navigation and beautiful formatting.',
    type: 'website',
  },
};

export default function ReadBiblePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main>
        <BibleReader />
      </main>
      <Footer />
    </div>
  );
}