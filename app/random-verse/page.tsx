import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { RandomVerseGenerator } from '@/components/random/random-verse-generator';

export const metadata: Metadata = {
  title: 'Random Bible Verse Generator - Discover Scripture | PrayerVerses.com',
  description: 'Generate random Bible verses for daily inspiration. Discover new scriptures and let God\'s Word surprise you with exactly what you need to hear today.',
  keywords: 'random Bible verse, scripture generator, daily inspiration, surprise verse, random scripture',
  openGraph: {
    title: 'Random Bible Verse Generator - Discover Scripture',
    description: 'Generate random Bible verses for daily inspiration and spiritual guidance.',
    type: 'website',
  },
};

export default function RandomVersePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main>
        <RandomVerseGenerator />
      </main>
      <Footer />
    </div>
  );
}