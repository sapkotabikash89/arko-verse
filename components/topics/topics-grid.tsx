"use client"

import Link from 'next/link';
import { Heart, Star, Shield, Sun, Leaf, Crown, Zap, Compass, Cross, Move as Dove, Mountain, Anchor, Gift, Key, Lightbulb, Users, Home, Clock, Target, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search } from 'lucide-react';

const allTopics = [
  { name: 'Love', icon: Heart, color: 'text-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-200', count: 89 },
  { name: 'Faith', icon: Star, color: 'text-yellow-500', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200', count: 67 },
  { name: 'Hope', icon: Sun, color: 'text-orange-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200', count: 54 },
  { name: 'Peace', icon: Leaf, color: 'text-green-500', bgColor: 'bg-green-50', borderColor: 'border-green-200', count: 43 },
  { name: 'Strength', icon: Shield, color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', count: 38 },
  { name: 'Wisdom', icon: Crown, color: 'text-purple-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200', count: 52 },
  { name: 'Courage', icon: Zap, color: 'text-indigo-500', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200', count: 29 },
  { name: 'Guidance', icon: Compass, color: 'text-teal-500', bgColor: 'bg-teal-50', borderColor: 'border-teal-200', count: 41 },
  { name: 'Forgiveness', icon: Cross, color: 'text-pink-500', bgColor: 'bg-pink-50', borderColor: 'border-pink-200', count: 35 },
  { name: 'Joy', icon: Dove, color: 'text-cyan-500', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-200', count: 47 },
  { name: 'Patience', icon: Mountain, color: 'text-gray-500', bgColor: 'bg-gray-50', borderColor: 'border-gray-200', count: 31 },
  { name: 'Trust', icon: Anchor, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', count: 42 },
  { name: 'Grace', icon: Gift, color: 'text-emerald-500', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', count: 39 },
  { name: 'Prayer', icon: Key, color: 'text-violet-500', bgColor: 'bg-violet-50', borderColor: 'border-violet-200', count: 56 },
  { name: 'Understanding', icon: Lightbulb, color: 'text-amber-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', count: 28 },
  { name: 'Fellowship', icon: Users, color: 'text-rose-500', bgColor: 'bg-rose-50', borderColor: 'border-rose-200', count: 33 },
  { name: 'Family', icon: Home, color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200', count: 44 },
  { name: 'Perseverance', icon: Clock, color: 'text-slate-500', bgColor: 'bg-slate-50', borderColor: 'border-slate-200', count: 26 },
  { name: 'Purpose', icon: Target, color: 'text-lime-500', bgColor: 'bg-lime-50', borderColor: 'border-lime-200', count: 37 },
  { name: 'Victory', icon: Award, color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200', count: 24 },
];

export function TopicsGrid() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTopics = allTopics.filter(topic =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Bible Verses by Topic
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore Bible verses organized by topic to find exactly what you need for your spiritual journey
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search topics..."
              className="pl-10 h-12 border-purple-200 focus:border-purple-400 focus:ring-purple-200 rounded-xl"
            />
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTopics.map((topic, index) => {
            const IconComponent = topic.icon;
            return (
              <Link key={index} href={`/topic/${topic.name.toLowerCase()}`}>
                <Card className={`${topic.bgColor} ${topic.borderColor} border-2 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer`}>
                  <CardContent className="p-6 text-center">
                    <div className={`${topic.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 ${topic.borderColor}`}>
                      <IconComponent className={`h-8 w-8 ${topic.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {topic.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {topic.count} verses
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No topics found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </section>
  );
}