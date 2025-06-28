import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PrivacyPolicy } from '@/components/legal/privacy-policy';

export const metadata: Metadata = {
  title: 'Privacy Policy | PrayerVerses.com',
  description: 'Read our privacy policy to understand how we collect, use, and protect your personal information on PrayerVerses.com.',
  keywords: 'privacy policy, data protection, personal information, PrayerVerses privacy',
  openGraph: {
    title: 'Privacy Policy | PrayerVerses.com',
    description: 'Read our privacy policy to understand how we protect your personal information.',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main>
        <PrivacyPolicy />
      </main>
      <Footer />
    </div>
  );
}