"use client"

import { useState } from 'react';
import { Search, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative py-20 px-4 text-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-indigo-600/10" />
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-300/20 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-300/20 rounded-full blur-xl" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Main Heading */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-purple-600 mr-2" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Daily Bible Verses
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find spiritual inspiration, search scriptures by topic or reference, and discover God's Word in beautiful, shareable formats
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
          </div>
        </form>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 rounded-xl px-6"
            onClick={() => window.location.href = '/verse-of-the-day'}
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Today's Verse
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 rounded-xl px-6"
            onClick={() => window.location.href = '/random-verse'}
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Random Verse
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 rounded-xl px-6"
            onClick={() => window.location.href = '/topics'}
          >
            Browse Topics
          </Button>
        </div>
      </div>
    </section>
  );
}