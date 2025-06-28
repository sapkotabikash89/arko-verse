"use client"

import Link from 'next/link';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ChapterNavigationProps {
  reference: string;
}

export function ChapterNavigation({ reference }: ChapterNavigationProps) {
  // Parse the reference to extract book, chapter, and verse
  const parseReference = (ref: string) => {
    const match = ref.match(/^(.*?)\s+(\d+):(\d+)$/);
    if (match) {
      return {
        book: match[1],
        chapter: parseInt(match[2]),
        verse: parseInt(match[3])
      };
    }
    return { book: 'John', chapter: 15, verse: 17 };
  };

  const parsed = parseReference(reference);
  const bookSlug = parsed.book.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-purple-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {/* Previous Verse */}
              <Link href={`/verse/${parsed.book}-${parsed.chapter}-${parsed.verse - 1}`.replace(/\s+/g, '-')}>
                <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous Verse
                </Button>
              </Link>

              {/* Read Full Chapter */}
              <Link href={`/chapter/${bookSlug}-${parsed.chapter}`}>
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Full Chapter
                </Button>
              </Link>

              {/* Next Verse */}
              <Link href={`/verse/${parsed.book}-${parsed.chapter}-${parsed.verse + 1}`.replace(/\s+/g, '-')}>
                <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  Next Verse
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}