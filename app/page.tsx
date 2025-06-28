import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero-section';
import { SearchSection } from '@/components/home/search-section';
import { DailyVerse } from '@/components/home/daily-verse';
import { PopularTopics } from '@/components/home/popular-topics';
import { FeaturedVerses } from '@/components/home/featured-verses';
import { BibleBooks } from '@/components/home/bible-books';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main>
        <HeroSection />
        <SearchSection />
        <DailyVerse />
        <PopularTopics />
        <FeaturedVerses />
        <BibleBooks />
      </main>
      <Footer />
    </div>
  );
}