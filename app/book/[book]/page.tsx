import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BookDisplay } from '@/components/book/book-display';

interface PageProps {
  params: {
    book: string;
  };
}

export async function generateStaticParams() {
  // List of Bible books to pre-render
  const oldTestament = [
    'genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy', 'joshua', 'judges', 'ruth',
    '1-samuel', '2-samuel', '1-kings', '2-kings', '1-chronicles', '2-chronicles', 'ezra',
    'nehemiah', 'esther', 'job', 'psalms', 'proverbs', 'ecclesiastes', 'song-of-solomon',
    'isaiah', 'jeremiah', 'lamentations', 'ezekiel', 'daniel', 'hosea', 'joel', 'amos',
    'obadiah', 'jonah', 'micah', 'nahum', 'habakkuk', 'zephaniah', 'haggai', 'zechariah', 'malachi'
  ];

  const newTestament = [
    'matthew', 'mark', 'luke', 'john', 'acts', 'romans', '1-corinthians', '2-corinthians',
    'galatians', 'ephesians', 'philippians', 'colossians', '1-thessalonians', '2-thessalonians',
    '1-timothy', '2-timothy', 'titus', 'philemon', 'hebrews', 'james', '1-peter', '2-peter',
    '1-john', '2-john', '3-john', 'jude', 'revelation'
  ];

  const allBooks = [...oldTestament, ...newTestament];

  return allBooks.map((book) => ({
    book,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const book = params.book.replace(/-/g, ' ');
  
  return {
    title: `${book} - Read Bible Book | PrayerVerses.com`,
    description: `Read the complete book of ${book} with chapter navigation and verse details.`,
    keywords: `${book}, Bible book, scripture reading, biblical text`,
    openGraph: {
      title: `${book} - Read Bible Book`,
      description: `Read the complete book of ${book} with chapter navigation.`,
      type: 'website',
    },
  };
}

export default function BookPage({ params }: PageProps) {
  const book = params.book.replace(/-/g, ' ');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main>
        <BookDisplay book={book} />
      </main>
      <Footer />
    </div>
  );
}