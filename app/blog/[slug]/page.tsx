import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BlogPost } from '@/components/blog/blog-post';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  // List of blog post slugs to pre-render
  const blogPosts = [
    'finding-peace-in-difficult-times',
    'the-power-of-daily-prayer',
    'understanding-gods-love',
    'walking-in-faith',
    'biblical-wisdom-for-modern-life',
    'the-importance-of-forgiveness',
    'growing-in-spiritual-maturity',
    'trusting-gods-plan'
  ];

  return blogPosts.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const title = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `${title} | PrayerVerses.com Blog`,
    description: `Read our inspiring blog post about ${title.toLowerCase()}. Find encouragement and wisdom for your spiritual journey.`,
    keywords: `Christian blog, ${title.toLowerCase()}, faith, spiritual growth`,
    openGraph: {
      title: `${title} | PrayerVerses.com Blog`,
      description: `Read our inspiring blog post about ${title.toLowerCase()}.`,
      type: 'article',
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main>
        <BlogPost slug={params.slug} />
      </main>
      <Footer />
    </div>
  );
}