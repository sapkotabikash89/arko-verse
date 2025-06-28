import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { TermsOfService } from '@/components/legal/terms-of-service';

export const metadata: Metadata = {
  title: 'Terms of Service | PrayerVerses.com',
  description: 'Read our terms of service to understand the rules and guidelines for using PrayerVerses.com.',
  keywords: 'terms of service, terms and conditions, website rules, PrayerVerses terms',
  openGraph: {
    title: 'Terms of Service | PrayerVerses.com',
    description: 'Read our terms of service and website usage guidelines.',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main>
        <TermsOfService />
      </main>
      <Footer />
    </div>
  );
}