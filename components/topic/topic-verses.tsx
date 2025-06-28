"use client"

import { useState, useEffect } from 'react';
import { VerseCard } from '@/components/verse/verse-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, BookOpen } from 'lucide-react';

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

  // Topic-based verse collections
  const topicVerses: { [key: string]: string[] } = {
    love: [
      "John 3:16", "1 John 4:8", "1 Corinthians 13:4-7", "John 15:13", "Romans 8:38-39",
      "1 John 4:19", "John 15:12", "1 John 4:16", "Ephesians 3:17-19", "1 John 3:16",
      "Romans 5:8", "1 Peter 4:8", "Song of Solomon 8:7", "1 John 4:7", "Matthew 22:37-39",
      "John 13:34-35", "1 Corinthians 13:13", "Galatians 5:22", "Colossians 3:14", "1 John 4:12",
      "Romans 13:10", "1 Thessalonians 3:12", "Philippians 1:9", "2 Thessalonians 3:5", "Jude 1:21",
      "1 John 2:5", "John 14:21", "1 John 5:3", "2 John 1:6", "Romans 8:35",
      "Jeremiah 31:3", "Hosea 11:4", "Zephaniah 3:17", "Isaiah 43:4", "Psalm 136:26"
    ],
    faith: [
      "Hebrews 11:1", "Romans 10:17", "Matthew 17:20", "Ephesians 2:8", "2 Corinthians 5:7",
      "Romans 1:17", "Galatians 2:20", "James 2:17", "1 Peter 1:7", "Romans 4:16",
      "Hebrews 11:6", "Mark 11:22", "Luke 17:6", "Romans 14:23", "2 Timothy 1:12",
      "1 John 5:4", "Habakkuk 2:4", "Romans 3:28", "Galatians 3:26", "Ephesians 3:12",
      "1 Timothy 6:12", "2 Timothy 4:7", "Hebrews 12:2", "1 Corinthians 16:13", "2 Corinthians 4:13",
      "Philippians 3:9", "Colossians 2:7", "1 Thessalonians 1:3", "2 Thessalonians 1:3", "Hebrews 10:38",
      "James 1:3", "James 1:6", "1 Peter 1:5", "1 Peter 1:9", "1 John 5:14"
    ],
    hope: [
      "Jeremiah 29:11", "Romans 15:13", "1 Peter 1:3", "Romans 8:24-25", "Hebrews 6:19",
      "Psalm 42:5", "Lamentations 3:22-23", "Isaiah 40:31", "Romans 5:3-5", "1 Thessalonians 4:13",
      "Titus 2:13", "1 Peter 3:15", "Romans 12:12", "Psalm 130:7", "Proverbs 23:18",
      "Job 11:18", "Psalm 31:24", "Psalm 33:18", "Psalm 38:15", "Psalm 39:7",
      "Psalm 42:11", "Psalm 43:5", "Psalm 62:5", "Psalm 71:5", "Psalm 119:49",
      "Psalm 119:81", "Psalm 119:114", "Psalm 130:5", "Psalm 131:3", "Psalm 146:5",
      "Proverbs 10:28", "Proverbs 11:7", "Proverbs 13:12", "Proverbs 14:32", "Isaiah 38:18"
    ],
    peace: [
      "John 14:27", "Philippians 4:7", "Isaiah 26:3", "Romans 5:1", "Colossians 3:15",
      "2 Thessalonians 3:16", "Numbers 6:26", "Psalm 29:11", "Isaiah 9:6", "Matthew 5:9",
      "Romans 14:19", "1 Corinthians 14:33", "Galatians 5:22", "Ephesians 2:14", "Philippians 4:9",
      "1 Peter 3:11", "Psalm 4:8", "Psalm 34:14", "Psalm 37:11", "Psalm 85:8",
      "Psalm 119:165", "Proverbs 12:20", "Isaiah 32:17", "Isaiah 48:18", "Isaiah 54:10",
      "Isaiah 55:12", "Isaiah 57:19", "Jeremiah 29:7", "Micah 5:5", "Haggai 2:9",
      "Luke 1:79", "Luke 2:14", "John 16:33", "Acts 10:36", "Romans 1:7"
    ],
    strength: [
      "Philippians 4:13", "Isaiah 40:31", "2 Corinthians 12:9", "Psalm 46:1", "Nehemiah 8:10",
      "Ephesians 6:10", "1 Corinthians 16:13", "Joshua 1:9", "Deuteronomy 31:6", "Isaiah 41:10",
      "Psalm 18:32", "Psalm 27:1", "Psalm 28:7", "Psalm 29:11", "Psalm 31:24",
      "Psalm 37:39", "Psalm 46:1", "Psalm 68:35", "Psalm 73:26", "Psalm 84:5",
      "Psalm 84:7", "Psalm 89:17", "Psalm 96:6", "Psalm 105:4", "Psalm 118:14",
      "Psalm 138:3", "Psalm 144:1", "Proverbs 24:5", "Isaiah 12:2", "Isaiah 25:4",
      "Isaiah 26:4", "Isaiah 28:6", "Isaiah 30:15", "Isaiah 33:6", "Isaiah 45:24"
    ],
    wisdom: [
      "Proverbs 3:5-6", "James 1:5", "Proverbs 9:10", "Ecclesiastes 7:12", "1 Corinthians 1:25",
      "Proverbs 1:7", "Proverbs 2:6", "Proverbs 4:7", "Proverbs 8:11", "Proverbs 11:2",
      "Proverbs 13:10", "Proverbs 14:8", "Proverbs 15:33", "Proverbs 16:16", "Proverbs 17:28",
      "Proverbs 18:15", "Proverbs 19:8", "Proverbs 21:30", "Proverbs 22:17", "Proverbs 23:23",
      "Proverbs 24:3-4", "Proverbs 27:5", "Proverbs 28:26", "Proverbs 29:11", "Ecclesiastes 2:13",
      "Ecclesiastes 8:1", "Ecclesiastes 9:16", "Ecclesiastes 10:10", "Daniel 2:20", "Matthew 7:24",
      "Luke 21:15", "1 Corinthians 2:6", "1 Corinthians 3:19", "Ephesians 1:17", "Colossians 2:3"
    ]
  };

  useEffect(() => {
    fetchTopicVerses();
  }, [topic]);

  const fetchTopicVerses = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const results: VerseResult[] = [];
      const topicLower = topic.toLowerCase();
      const verseRefs = topicVerses[topicLower] || [];
      
      if (verseRefs.length > 0) {
        for (let i = 0; i < Math.min(35, verseRefs.length); i++) {
          try {
            const response = await fetch(`https://bible-api.com/${encodeURIComponent(verseRefs[i])}`);
            if (response.ok) {
              const data = await response.json();
              if (data.verses) {
                data.verses.forEach((verse: any) => {
                  results.push({
                    reference: `${verse.book_name} ${verse.chapter}:${verse.verse}`,
                    text: verse.text,
                    topic: topicLower,
                    background: backgrounds[results.length % backgrounds.length]
                  });
                });
              } else {
                results.push({
                  reference: data.reference,
                  text: data.text,
                  topic: topicLower,
                  background: backgrounds[results.length % backgrounds.length]
                });
              }
            }
            
            // Add delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));
          } catch (error) {
            console.error(`Error fetching verse ${verseRefs[i]}:`, error);
          }
        }
      }
      
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
          <p className="text-gray-600">We couldn't find verses about {topic.toLowerCase()}.</p>
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
                      <p className="text-xl font-semibold text-purple-600">
                        {verse.reference}
                      </p>
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {topic}
                      </span>
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