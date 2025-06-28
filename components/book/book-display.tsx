"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { loadBookData, getChapter, Verse, referenceToSlug } from '@/lib/bible-data';

interface BookDisplayProps {
  book: string;
}

export function BookDisplay({ book }: BookDisplayProps) {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [chapterVerses, setChapterVerses] = useState<Verse[]>([]);
  const [availableChapters, setAvailableChapters] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookLoading, setBookLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      try {
        setBookLoading(true);
        const bookData = await loadBookData(book);
        
        if (bookData) {
          const chapters = Object.keys(bookData.chapters).map(Number).sort((a, b) => a - b);
          setAvailableChapters(chapters);
        } else {
          setError('Book not found');
        }
      } catch (err) {
        setError('Failed to load book');
        console.error('Error loading book:', err);
      } finally {
        setBookLoading(false);
      }
    };

    loadBook();
  }, [book]);

  const fetchChapter = async (chapterNum: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const verses = await getChapter(book, chapterNum);
      setChapterVerses(verses);
      setSelectedChapter(chapterNum);
      
      if (verses.length === 0) {
        setError('No verses found for this chapter');
      }
    } catch (err) {
      setError('Failed to load chapter');
      console.error('Error fetching chapter:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousChapter = () => {
    if (selectedChapter && selectedChapter > Math.min(...availableChapters)) {
      const currentIndex = availableChapters.indexOf(selectedChapter);
      if (currentIndex > 0) {
        fetchChapter(availableChapters[currentIndex - 1]);
      }
    }
  };

  const handleNextChapter = () => {
    if (selectedChapter && selectedChapter < Math.max(...availableChapters)) {
      const currentIndex = availableChapters.indexOf(selectedChapter);
      if (currentIndex < availableChapters.length - 1) {
        fetchChapter(availableChapters[currentIndex + 1]);
      }
    }
  };

  if (bookLoading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading book...</p>
        </div>
      </section>
    );
  }

  if (error && availableChapters.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Book Not Found</h1>
          <p className="text-gray-600 mb-8">The requested book could not be loaded.</p>
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
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800 capitalize">
              {book.replace(/-/g, ' ')}
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Choose a chapter to read from the book of {book.replace(/-/g, ' ')}
          </p>
        </div>

        {/* Chapter Selection */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <CardTitle className="text-2xl text-center">
              {availableChapters.length} Available Chapters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {availableChapters.length > 0 ? (
              <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-4">
                {availableChapters.map((chapter) => (
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
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No chapters available for this book yet.</p>
              </div>
            )}
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
                    disabled={!selectedChapter || availableChapters.indexOf(selectedChapter) <= 0}
                    variant="outline"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous Chapter
                  </Button>

                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {book.replace(/-/g, ' ')} Chapter {selectedChapter}
                    </h2>
                  </div>

                  <Button
                    onClick={handleNextChapter}
                    disabled={!selectedChapter || availableChapters.indexOf(selectedChapter) >= availableChapters.length - 1}
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
            {error && !loading && (
              <Card className="border-red-200 shadow-lg">
                <CardContent className="p-8 text-center">
                  <p className="text-red-600 text-lg">{error}</p>
                </CardContent>
              </Card>
            )}

            {/* Chapter Verses */}
            {!loading && !error && chapterVerses.length > 0 && (
              <div className="space-y-4">
                {chapterVerses.map((verse, index) => {
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