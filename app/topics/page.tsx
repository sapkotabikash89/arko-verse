import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { TopicsGrid } from '@/components/topics/topics-grid';

export const metadata: Metadata = {
  title: 'Bible Verses by Topic - Browse All Topics | PrayerVerses.com',
  description: 'Browse Bible verses organized by topic. Find scriptures about love, faith, hope, peace, strength, wisdom, and many more spiritual topics.',
  keywords: 'Bible topics, scripture by topic, Christian topics, biblical themes, verse categories',
  openGraph: {
    title: 'Bible Verses by Topic - Browse All Topics',
    description: 'Browse Bible verses organized by topic for spiritual guidance and inspiration.',
    type: 'website',
  },
};

export default function TopicsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main>
        <TopicsGrid />
      </main>
      <Footer />
    </div>
  );
}