"use client"

import { useState, useEffect } from 'react';
import { BookOpen, MessageCircle, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VerseCard } from '@/components/verse/verse-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getVerse, parseReference } from '@/lib/bible-data';

interface VerseDisplayProps {
  reference: string;
}

interface VerseData {
  reference: string;
  text: string;
  topic: string;
  background: string;
  commentary: string;
  context: string;
  application: string;
}

export function VerseDisplay({ reference }: VerseDisplayProps) {
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        setLoading(true);
        const cleanReference = reference.replace(/-/g, ' ');
        const parsed = parseReference(cleanReference);
        
        if (!parsed) {
          throw new Error('Invalid verse reference');
        }
        
        const verseData = await getVerse(parsed.book, parsed.chapter, parsed.verse);
        
        if (!verseData) {
          throw new Error('Verse not found');
        }
        
        setVerse({
          reference: verseData.reference,
          text: verseData.text,
          topic: 'Faith', // Default topic
          background: 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          commentary: `This verse from ${verseData.reference} offers profound spiritual insight. The words speak to the heart of Christian faith and provide guidance for daily living. Each phrase carries deep meaning that has comforted and inspired believers throughout the centuries.`,
          context: `This passage appears in the broader context of biblical teaching about faith, love, and spiritual growth. Understanding the historical and cultural background helps us appreciate the full meaning of these inspired words.`,
          application: `In our daily lives, this verse challenges us to live out our faith practically. It reminds us to trust in God's goodness, show love to others, and find strength in His promises. Consider how these words can guide your decisions and relationships today.`
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load verse');
        console.error('Error fetching verse:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVerse();
  }, [reference]);

  if (loading) {
    return (
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading verse...</p>
        </div>
      </section>
    );
  }

  if (error || !verse) {
    return (
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Verse Not Found</h1>
          <p className="text-gray-600 mb-8">The requested verse could not be loaded: {error}</p>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
            Search for Verses
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {verse.reference}
          </h1>
          <p className="text-lg text-gray-600">
            Discover the meaning and inspiration behind this powerful Bible verse
          </p>
        </div>

        {/* Main Verse Card */}
        <div className="mb-12">
          <VerseCard verse={verse} showInteractive={true} />
        </div>

        {/* Commentary and Study Tabs */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <Tabs defaultValue="commentary" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="commentary" className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Commentary
                </TabsTrigger>
                <TabsTrigger value="context" className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Context
                </TabsTrigger>
                <TabsTrigger value="application" className="flex items-center">
                  <Share2 className="h-4 w-4 mr-2" />
                  Application
                </TabsTrigger>
              </TabsList>

              <TabsContent value="commentary" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Commentary</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {verse.commentary}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="context" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Historical Context</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {verse.context}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="application" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Practical Application</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {verse.application}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}