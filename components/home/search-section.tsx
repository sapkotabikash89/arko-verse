"use client"

import { useState } from 'react';
import { Search, Book, Heart, Star, Compass } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchSection() {
  const [activeTab, setActiveTab] = useState('reference');
  const [searchQuery, setSearchQuery] = useState('');

  const popularVerses = [
    { text: 'John 3:16', icon: Book },
    { text: 'Psalms 23:1', icon: Heart },
    { text: 'Romans 8:28', icon: Star },
    { text: 'Philippians 4:13', icon: Compass },
    { text: 'Jeremiah 29:11', icon: Book },
  ];

  const popularTopics = [
    { text: 'Love', icon: Heart },
    { text: 'Faith', icon: Star },
    { text: 'Hope', icon: Compass },
    { text: 'Peace', icon: Book },
    { text: 'Strength', icon: Heart },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handlePopularClick = (query: string) => {
    if (activeTab === 'reference') {
      window.location.href = `/verse/${query.replace(/[:\s]/g, '-')}`;
    } else {
      window.location.href = `/topic/${query.toLowerCase()}`;
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Bible Search Tool
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Use this tool to help you easily browse and explore the Bible. Search for your favorite verses or discover new ones by topic.
              </p>
            </div>

            {/* Search Tabs */}
            <div className="flex flex-col sm:flex-row gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
              <Button
                variant={activeTab === 'reference' ? 'default' : 'ghost'}
                className={`flex-1 rounded-lg ${
                  activeTab === 'reference' 
                    ? 'bg-purple-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
                onClick={() => setActiveTab('reference')}
              >
                <Book className="h-4 w-4 mr-2" />
                By Reference
              </Button>
              <Button
                variant={activeTab === 'topic' ? 'default' : 'ghost'}
                className={`flex-1 rounded-lg ${
                  activeTab === 'topic' 
                    ? 'bg-purple-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
                onClick={() => setActiveTab('topic')}
              >
                <Heart className="h-4 w-4 mr-2" />
                By Topic
              </Button>
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearch} className="relative mb-6">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeTab === 'reference' 
                    ? "Enter verse reference (e.g., John 3:16, Psalms 23:1)" 
                    : "Enter topic (e.g., love, faith, hope, forgiveness)"
                }
                className="h-12 px-4 pr-12 text-lg rounded-xl border-purple-200 focus:border-purple-400 focus:ring-purple-200"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-2 h-8 px-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {/* Popular Searches */}
            <div>
              <p className="text-sm text-gray-500 mb-3">
                Popular {activeTab === 'reference' ? 'verses' : 'topics'}:
              </p>
              <div className="flex flex-wrap gap-2">
                {(activeTab === 'reference' ? popularVerses : popularTopics).map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handlePopularClick(item.text)}
                      className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300"
                    >
                      <IconComponent className="h-3 w-3 mr-1" />
                      {item.text}
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}