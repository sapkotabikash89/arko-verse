"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VerseCard } from '@/components/verse/verse-card';

interface ChapterDisplayProps {
  reference: string;
}

interface Verse {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export function ChapterDisplay({ reference }: ChapterDisplayProps) {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Parse reference to get book and chapter
  const parseReference = (ref: string) => {
    const parts = ref.split('-');
    const chapter = parts.pop();
    const book = parts.join(' ');
    return { book, chapter: parseInt(chapter || '1') };
  };

  const { book, chapter } = parseReference(reference);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://bible-api.com/${book} ${chapter}`);
        
        if (!response.ok) {
          throw new Error('Chapter not found');
        }
        
        const data = await response.json();
        setVerses(data.verses || []);
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Chapter Not Found</h1>
          <p className="text-gray-600 mb-8">The requested chapter could not be loaded.</p>
          <Link href="/read-the-bible">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              Browse Bible Books
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {verses[0]?.book_name} Chapter {chapter}
          </h1>
          <p className="text-lg text-gray-600">
            Read the complete chapter with verse-by-verse navigation
          </p>
        </div>

        {/* Navigation */}
        <Card className="border-purple-200 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Link href={`/chapter/${book.toLowerCase().replace(/\s+/g, '-')}-${chapter - 1}`}>
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
                <p className="font-semibold text-gray-800">{verses[0]?.book_name}</p>
              </div>

              <Link href={`/chapter/${book.toLowerCase().replace(/\s+/g, '-')}-${chapter + 1}`}>
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
          {verses.map((verse, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Link href={`/verse/${verse.book_name.replace(/\s+/g, '-')}-${verse.chapter}-${verse.verse}`}>
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold cursor-pointer hover:bg-purple-700 transition-colors">
                      {verse.verse}
                    </span>
                  </Link>
                  <div className="flex-1">
                    <p className="text-gray-800 text-lg leading-relaxed">{verse.text}</p>
                    <Link 
                      href={`/verse/${verse.book_name.replace(/\s+/g, '-')}-${verse.chapter}-${verse.verse}`}
                      className="inline-block mt-2 text-purple-600 hover:text-purple-800 text-sm font-medium"
                    >
                      View verse details →
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}