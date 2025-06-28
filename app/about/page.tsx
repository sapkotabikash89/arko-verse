import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AboutContent } from '@/components/about/about-content';

export const metadata: Metadata = {
  title: 'About PrayerVerses.com - Our Mission & Story',
  description: 'Learn about PrayerVerses.com, our mission to share God\'s Word, and how we help people find inspiration through Bible verses.',
  keywords: 'about PrayerVerses, Christian website, Bible verse mission, faith community',
  openGraph: {
    title: 'About PrayerVerses.com - Our Mission & Story',
    description: 'Learn about our mission to share God\'s Word and inspire faith through Bible verses.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main>
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}