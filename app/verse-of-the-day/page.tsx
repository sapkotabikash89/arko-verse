import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { DailyVerse } from '@/components/home/daily-verse';
import { PreviousVerses } from '@/components/daily/previous-verses';

export const metadata: Metadata = {
  title: 'Daily Bible Verse - Today\'s Inspirational Scripture | PrayerVerses.com',
  description: 'Start your day with inspiration! Read today\'s Bible verse, reflect on God\'s Word, and find spiritual guidance for your daily journey.',
  keywords: 'daily Bible verse, today scripture, inspirational verse, daily devotion, Christian inspiration',
  openGraph: {
    title: 'Daily Bible Verse - Today\'s Inspirational Scripture',
    description: 'Start your day with inspiration! Read today\'s Bible verse and find spiritual guidance.',
    type: 'article',
  },
};

export default function DailyVersePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Daily Bible Verse
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Let God's Word guide your day. Each morning, discover a new verse selected to inspire, encourage, and strengthen your faith.
            </p>
          </div>
        </div>
        <DailyVerse />
        <PreviousVerses />
      </main>
      <Footer />
    </div>
  );
}