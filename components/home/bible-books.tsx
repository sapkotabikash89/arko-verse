"use client"

import Link from 'next/link';
import { Book, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const oldTestament = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth',
  '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah',
  'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
  'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah',
  'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'
];

const newTestament = [
  'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians',
  'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter',
  '1 John', '2 John', '3 John', 'Jude', 'Revelation'
];

export function BibleBooks() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Read the Bible
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse through all 66 books of the Bible and dive deep into God's Word
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Old Testament */}
          <Card className="border-purple-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <CardTitle className="flex items-center text-xl">
                <Book className="h-6 w-6 mr-2" />
                Old Testament
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                {oldTestament.slice(0, 12).map((book, index) => (
                  <Link 
                    key={index}
                    href={`/book/${book.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-purple-700 hover:text-purple-900 hover:underline py-1 transition-colors"
                  >
                    {book}
                  </Link>
                ))}
              </div>
              <Link href="/read-the-bible/old-testament">
                <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                  View All Old Testament Books
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* New Testament */}
          <Card className="border-indigo-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <CardTitle className="flex items-center text-xl">
                <Book className="h-6 w-6 mr-2" />
                New Testament
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                {newTestament.slice(0, 12).map((book, index) => (
                  <Link 
                    key={index}
                    href={`/book/${book.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-indigo-700 hover:text-indigo-900 hover:underline py-1 transition-colors"
                  >
                    {book}
                  </Link>
                ))}
              </div>
              <Link href="/read-the-bible/new-testament">
                <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                  View All New Testament Books
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}