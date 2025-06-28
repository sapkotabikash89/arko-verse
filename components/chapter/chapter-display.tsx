"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getChapter, Verse, referenceToSlug } from '@/lib/bible-data';

interface ChapterDisplayProps {
  reference: string;
}

export function ChapterDisplay({ reference }: ChapterDisplayProps) {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Parse reference to get book and chapter
  const parseReference = (ref: string) => {
    // Handle formats like "john-15" or "1-corinthians-13"
    const parts = ref.split('-');
    if (parts.length < 2) {
      return { book: ref, chapter: 1 };
    }
    
    const chapter = parts.pop();
    const book = parts.join('-'); // Rejoin in case of books like "1-corinthians"
    
    return { 
      book: book, 
      chapter: parseInt(chapter || '1') 
    };
  };

  const { book, chapter } = parseReference(reference);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`Fetching chapter: ${book} ${chapter}`);
        const chapterVerses = await getChapter(book, chapter);
        
        if (chapterVerses.length === 0) {
          setError(`No verses found for ${book} chapter ${chapter}. This chapter may not be available in our current Bible data.`);
        } else {
          setVerses(chapterVerses);
        }
      } catch (err) {
        setError('Failed to load chapter');
        console.error('Error fetching chapter:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [book, chapter]);

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading chapter...</p>
        </div>
      </section>
    );
  }

  if (error || verses.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Chapter Not Available</h1>
          <p className="text-gray-600 mb-8">{error || 'The requested chapter could not be loaded.'}</p>
          <div className="space-y-4">
            <p className="text-gray-500">
              We're working on adding more Bible content. Try one of these available chapters:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/chapter/john-1">
                <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  John 1
                </Button>
              </Link>
              <Link href="/chapter/john-3">
                <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  John 3
                </Button>
              </Link>
              <Link href="/chapter/john-15">
                <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  John 15
                </Button>
              </Link>
              <Link href="/chapter/psalms-1">
                <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  Psalms 1
                </Button>
              </Link>
              <Link href="/chapter/psalms-23">
                <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  Psalms 23
                </Button>
              </Link>
            </div>
            <Link href="/read-the-bible">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 mt-4">
                Browse Bible Books
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Format book name for display
  const displayBookName = book.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {displayBookName} Chapter {chapter}
          </h1>
          <p className="text-lg text-gray-600">
            Read the complete chapter with verse-by-verse navigation
          </p>
        </div>

        {/* Navigation */}
        <Card className="border-purple-200 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Link href={`/chapter/${book}-${chapter - 1}`}>
                <Button 
                  variant="outline" 
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  disabled={chapter <= 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous Chapter
                </Button>
              </Link>

              <div className="text-center">
                <BookOpen className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-800">{displayBookName}</p>
              </div>

              <Link href={`/chapter/${book}-${chapter + 1}`}>
                <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  Next Chapter
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Verses */}
        <div className="space-y-6">
          {verses.map((verse, index) => {
            // Extract verse number from reference
            const verseNumber = verse.reference.split(':')[1] || (index + 1).toString();
            const verseSlug = referenceToSlug(verse.reference);
            
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Link href={`/verse/${verseSlug}`}>
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold cursor-pointer hover:bg-purple-700 transition-colors">
                        {verseNumber}
                      </span>
                    </Link>
                    <div className="flex-1">
                      <p className="text-gray-800 text-lg leading-relaxed">{verse.text}</p>
                      <Link 
                        href={`/verse/${verseSlug}`}
                        className="inline-block mt-2 text-purple-600 hover:text-purple-800 text-sm font-medium"
                      >
                        View verse details →
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Back to Bible Books */}
        <div className="text-center mt-12">
          <Link href="/read-the-bible">
            <span className="text-purple-600 hover:text-purple-800 font-medium">
              ← Back to all Bible books
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}