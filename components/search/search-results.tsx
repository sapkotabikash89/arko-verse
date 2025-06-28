"use client"

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search, BookOpen, Filter } from 'lucide-react';
import { VerseCard } from '@/components/verse/verse-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getVersesByTopic, getVerse, parseReference, Verse, referenceToSlug } from '@/lib/bible-data';
import Link from 'next/link';

interface VerseResult {
  reference: string;
  text: string;
  topic: string;
  background: string;
}

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [verses, setVerses] = useState<VerseResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('relevance');

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
    if (query) {
      searchVerses(query);
    }
  }, [query]);

  const searchVerses = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const results: VerseResult[] = [];
      
      // Check if it's a specific verse reference
      const parsed = parseReference(searchQuery);
      
      if (parsed) {
        // Single verse search
        try {
          const verse = await getVerse(parsed.book, parsed.chapter, parsed.verse);
          if (verse) {
            results.push({
              reference: verse.reference,
              text: verse.text,
              topic: searchQuery.toLowerCase(),
              background: backgrounds[0]
            });
          }
        } catch (error) {
          console.error('Error fetching specific verse:', error);
        }
      } else {
        // Topic-based search
        const topic = searchQuery.toLowerCase();
        const topicVerses = await getVersesByTopic(topic);
        
        topicVerses.forEach((verse, index) => {
          results.push({
            reference: verse.reference,
            text: verse.text,
            topic: topic,
            background: backgrounds[index % backgrounds.length]
          });
        });
      }
      
      setVerses(results);
    } catch (err) {
      setError('Failed to search verses');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Search Results
          </h1>
          {query && (
            <p className="text-lg text-gray-600">
              Showing results for: <span className="font-semibold">"{query}"</span>
            </p>
          )}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by verse reference (John 3:16) or topic (love, faith, hope)..."
              className="w-full h-14 px-6 pr-16 text-lg rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:ring-purple-200 shadow-lg"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-2 top-2 h-10 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>

        {/* Filters */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="book">Book Order</SelectItem>
                <SelectItem value="length">Text Length</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {verses.length > 0 && (
            <p className="text-gray-600">Found {verses.length} verses</p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching Bible verses...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        )}

        {/* Results */}
        {!loading && !error && verses.length > 0 && (
          <div className="space-y-12">
            {verses.map((verse, index) => (
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
                        {verse.topic && (
                          <Link href={`/topic/${verse.topic.toLowerCase()}`}>
                            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 cursor-pointer">
                              {verse.topic}
                            </span>
                          </Link>
                        )}
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
        )}

        {/* No Results */}
        {!loading && !error && query && verses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No verses found for "{query}"</p>
            <p className="text-gray-400 mt-2">Try searching for a different term or verse reference</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && !query && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Enter a search term to find Bible verses</p>
          </div>
        )}
      </div>
    </section>
  );
}