"use client"

import { useState, useEffect } from 'react';
import { VerseCard } from '@/components/verse/verse-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, BookOpen } from 'lucide-react';
import { getVersesByTopic, Verse, referenceToSlug } from '@/lib/bible-data';
import Link from 'next/link';

interface TopicVersesProps {
  topic: string;
}

interface VerseResult {
  reference: string;
  text: string;
  topic: string;
  background: string;
}

export function TopicVerses({ topic }: TopicVersesProps) {
  const [verses, setVerses] = useState<VerseResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Background images for verses
  const backgrounds = [
    "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/158826/structure-light-led-movement-158826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  ];

  useEffect(() => {
    fetchTopicVerses();
  }, [topic]);

  const fetchTopicVerses = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const topicVerses = await getVersesByTopic(topic);
      
      const results: VerseResult[] = topicVerses.map((verse, index) => ({
        reference: verse.reference,
        text: verse.text,
        topic: topic.toLowerCase(),
        background: backgrounds[index % backgrounds.length]
      }));
      
      setVerses(results);
    } catch (err) {
      setError('Failed to load verses');
      console.error('Error fetching topic verses:', err);
    } finally {
      setLoading(false);
    }
  };

  const displayedVerses = showAll ? verses : verses.slice(0, 6);

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading verses about {topic.toLowerCase()}...</p>
        </div>
      </section>
    );
  }

  if (error || verses.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Verses Found</h2>
          <p className="text-gray-600">We couldn't find verses about {topic.toLowerCase()} in our current collection.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {verses.length} Bible Verses About {topic}
          </h2>
          <p className="text-gray-600 text-lg">
            Each verse is carefully selected to provide guidance and inspiration on the topic of {topic.toLowerCase()}
          </p>
        </div>

        <div className="space-y-12">
          {displayedVerses.map((verse, index) => (
            <div key={index} className="space-y-6">
              {/* Verse Content */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center space-y-4">
                    <blockquote className="text-2xl md:text-3xl font-light leading-relaxed text-gray-800">
                      "{verse.text}"
                    </blockquote>
                    <div className="space-y-2">
                      <Link href={`/verse/${referenceToSlug(verse.reference)}`}>
                        <p className="text-xl font-semibold text-purple-600 hover:text-purple-800 cursor-pointer">
                          {verse.reference}
                        </p>
                      </Link>
                      <Link href={`/topic/${topic.toLowerCase()}`}>
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 cursor-pointer">
                          {topic}
                        </span>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Verse Card */}
              <div className="flex justify-center">
                <VerseCard verse={verse} showInteractive={true} />
              </div>
            </div>
          ))}
        </div>

        {verses.length > 6 && !showAll && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => setShowAll(true)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl px-8"
            >
              <ChevronDown className="h-5 w-5 mr-2" />
              Show All {verses.length} Verses
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}