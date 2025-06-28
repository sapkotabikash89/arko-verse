import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { TopicVerses } from '@/components/topic/topic-verses';
import { TopicHeader } from '@/components/topic/topic-header';
import { RelatedTopics } from '@/components/topic/related-topics';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  // List of popular topics to pre-render
  const topics = [
    'love', 'faith', 'hope', 'peace', 'joy', 'strength', 'wisdom', 'forgiveness',
    'prayer', 'healing', 'comfort', 'guidance', 'trust', 'courage', 'patience',
    'gratitude', 'salvation', 'grace', 'mercy', 'protection', 'blessing',
    'family', 'marriage', 'friendship', 'children', 'work', 'money', 'success',
    'fear', 'anxiety', 'depression', 'grief', 'suffering', 'trials', 'temptation'
  ];

  return topics.map((topic) => ({
    slug: topic,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const topic = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  
  return {
    title: `Bible Verses About ${topic} - Inspirational Scripture | PrayerVerses.com`,
    description: `Discover powerful Bible verses about ${topic.toLowerCase()}. Find inspiration, comfort, and guidance through God's Word on the topic of ${topic.toLowerCase()}.`,
    keywords: `Bible verses about ${topic.toLowerCase()}, ${topic.toLowerCase()} scripture, Christian ${topic.toLowerCase()}, biblical ${topic.toLowerCase()}`,
    openGraph: {
      title: `Bible Verses About ${topic} - Inspirational Scripture`,
      description: `Discover powerful Bible verses about ${topic.toLowerCase()}. Find inspiration and guidance through God's Word.`,
      type: 'article',
    },
  };
}

export default function TopicPage({ params }: PageProps) {
  const topic = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header />
      <main>
        <TopicHeader topic={topic} />
        <TopicVerses topic={topic} />
        <RelatedTopics currentTopic={topic} />
      </main>
      <Footer />
    </div>
  );
}