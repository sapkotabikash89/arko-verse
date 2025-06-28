"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BookDisplayProps {
  book: string;
}

interface Verse {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

// Sample chapter data - in a real app, this would come from an API
const getChaptersForBook = (book: string) => {
  const chapterCounts: { [key: string]: number } = {
    'genesis': 50, 'exodus': 40, 'leviticus': 27, 'numbers': 36, 'deuteronomy': 34,
    'joshua': 24, 'judges': 21, 'ruth': 4, '1 samuel': 31, '2 samuel': 24,
    '1 kings': 22, '2 kings': 25, '1 chronicles': 29, '2 chronicles': 36,
    'ezra': 10, 'nehemiah': 13, 'esther': 10, 'job': 42, 'psalms': 150,
    'proverbs': 31, 'ecclesiastes': 12, 'song of solomon': 8, 'isaiah': 66,
    'jeremiah': 52, 'lamentations': 5, 'ezekiel': 48, 'daniel': 12, 'hosea': 14,
    'joel': 3, 'amos': 9, 'obadiah': 1, 'jonah': 4, 'micah': 7, 'nahum': 3,
    'habakkuk': 3, 'zephaniah': 3, 'haggai': 2, 'zechariah': 14, 'malachi': 4,
    'matthew': 28, 'mark': 16, 'luke': 24, 'john': 21, 'acts': 28,
    'romans': 16, '1 corinthians': 16, '2 corinthians': 13, 'galatians': 6,
    'ephesians': 6, 'philippians': 4, 'colossians': 4, '1 thessalonians': 5,
    '2 thessalonians': 3, '1 timothy': 6, '2 timothy': 4, 'titus': 3,
    'philemon': 1, 'hebrews': 13, 'james': 5, '1 peter': 5, '2 peter': 3,
    '1 john': 5, '2 john': 1, '3 john': 1, 'jude': 1, 'revelation': 22
  };

  return chapterCounts[book.toLowerCase()] || 50;
};

export function BookDisplay({ book }: BookDisplayProps) {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [chapterVerses, setChapterVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chapterCount = getChaptersForBook(book);
  const chapters = Array.from({ length: chapterCount }, (_, i) => i + 1);

  const fetchChapter = async (chapterNum: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://bible-api.com/${book} ${chapterNum}`);
      
      if (!response.ok) {
        throw new Error('Chapter not found');
      }
      
      const data = await response.json();
      setChapterVerses(data.verses || []);
      setSelectedChapter(chapterNum);
    } catch (err) {
      setError('Failed to load chapter');
      console.error('Error fetching chapter:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousChapter = () => {
    if (selectedChapter && selectedChapter > 1) {
      fetchChapter(selectedChapter - 1);
    }
  };

  const handleNextChapter = () => {
    if (selectedChapter && selectedChapter < chapterCount) {
      fetchChapter(selectedChapter + 1);
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800 capitalize">
              {book}
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Choose a chapter to read from the book of {book}
          </p>
        </div>

        {/* Chapter Selection */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <CardTitle className="text-2xl text-center">
              {chapterCount} Chapters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-4">
              {chapters.map((chapter) => (
                <button
                  key={chapter}
                  onClick={() => fetchChapter(chapter)}
                  className={`group ${
                    selectedChapter === chapter
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-purple-50 hover:bg-purple-100 border-purple-200 hover:border-purple-400 text-purple-700'
                  } border-2 rounded-lg p-4 text-center transition-all duration-300 transform hover:scale-105`}
                >
                  <span className="text-lg font-bold">
                    {chapter}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chapter Content */}
        {selectedChapter && (
          <div className="space-y-6">
            {/* Chapter Navigation */}
            <Card className="border-purple-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <Button
                    onClick={handlePreviousChapter}
                    disabled={selectedChapter <= 1}
                    variant="outline"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous Chapter
                  </Button>

                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {book} Chapter {selectedChapter}
                    </h2>
                  </div>

                  <Button
                    onClick={handleNextChapter}
                    disabled={selectedChapter >= chapterCount}
                    variant="outline"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    Next Chapter
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading chapter...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <Card className="border-red-200 shadow-lg">
                <CardContent className="p-8 text-center">
                  <p className="text-red-600 text-lg">{error}</p>
                </CardContent>
              </Card>
            )}

            {/* Chapter Verses */}
            {!loading && !error && chapterVerses.length > 0 && (
              <div className="space-y-4">
                {chapterVerses.map((verse, index) => (
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
            )}
          </div>
        )}

        <div className="text-center mt-8">
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