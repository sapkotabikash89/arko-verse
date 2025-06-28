import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SearchResults } from '@/components/search/search-results';

export const metadata: Metadata = {
  title: 'Bible Verse Search Results | PrayerVerses.com',
  description: 'Search results for Bible verses by reference or topic. Find the scriptures you\'re looking for with our comprehensive search.',
  keywords: 'Bible search, verse search, scripture search, find Bible verses',
  openGraph: {
    title: 'Bible Verse Search Results',
    description: 'Search results for Bible verses by reference or topic.',
    type: 'website',
  },
};

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main>
        <SearchResults />
      </main>
      <Footer />
    </div>
  );
}