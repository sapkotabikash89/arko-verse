"use client"

import Link from 'next/link';
import { Heart, Star, Shield, Sun, Leaf, Crown, Zap, Compass } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const topics = [
  { name: 'Love', icon: Heart, color: 'text-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-200', count: 89 },
  { name: 'Faith', icon: Star, color: 'text-yellow-500', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200', count: 67 },
  { name: 'Hope', icon: Sun, color: 'text-orange-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200', count: 54 },
  { name: 'Peace', icon: Leaf, color: 'text-green-500', bgColor: 'bg-green-50', borderColor: 'border-green-200', count: 43 },
  { name: 'Strength', icon: Shield, color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', count: 38 },
  { name: 'Wisdom', icon: Crown, color: 'text-purple-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200', count: 52 },
  { name: 'Courage', icon: Zap, color: 'text-indigo-500', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200', count: 29 },
  { name: 'Guidance', icon: Compass, color: 'text-teal-500', bgColor: 'bg-teal-50', borderColor: 'border-teal-200', count: 41 },
];

export function PopularTopics() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Popular Topics
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore Bible verses organized by topic to find exactly what you need for your spiritual journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, index) => {
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

        <div className="text-center mt-12">
          <Link 
            href="/topics"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            View All Topics
          </Link>
        </div>
      </div>
    </section>
  );
}