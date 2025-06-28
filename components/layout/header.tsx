"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, BookOpen, Heart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                PrayerVerses
              </span>
              <span className="text-xs text-gray-500 -mt-1">.com</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/verse-of-the-day" 
              className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <Calendar className="h-4 w-4" />
              <span>Daily Verse</span>
            </Link>
            <Link 
              href="/random-verse" 
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Random Verse
            </Link>
            <Link 
              href="/topics" 
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Topics
            </Link>
            <Link 
              href="/read-the-bible" 
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Read Bible
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Blog
            </Link>
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-purple-600"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link 
                    href="/verse-of-the-day" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-purple-50"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Daily Verse</span>
                  </Link>
                  <Link 
                    href="/random-verse" 
                    className="text-gray-700 hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-purple-50"
                  >
                    Random Verse
                  </Link>
                  <Link 
                    href="/topics" 
                    className="text-gray-700 hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-purple-50"
                  >
                    Topics
                  </Link>
                  <Link 
                    href="/read-the-bible" 
                    className="text-gray-700 hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-purple-50"
                  >
                    Read Bible
                  </Link>
                  <Link 
                    href="/blog" 
                    className="text-gray-700 hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-purple-50"
                  >
                    Blog
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search verses by reference (e.g. John 3:16) or topic (e.g. love)"
                className="w-full pl-10 pr-4 py-3 rounded-lg border-purple-200 focus:border-purple-400 focus:ring-purple-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}