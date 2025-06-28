import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BlogList } from '@/components/blog/blog-list';

export const metadata: Metadata = {
  title: 'Christian Blog - Faith, Prayer & Bible Study | PrayerVerses.com',
  description: 'Read inspiring Christian blog posts about faith, prayer, Bible study, and spiritual growth. Find encouragement and wisdom for your spiritual journey.',
  keywords: 'Christian blog, faith articles, prayer guides, Bible study, spiritual growth, devotional',
  openGraph: {
    title: 'Christian Blog - Faith, Prayer & Bible Study',
    description: 'Read inspiring Christian blog posts about faith, prayer, and spiritual growth.',
    type: 'website',
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main>
        <BlogList />
      </main>
      <Footer />
    </div>
  );
}