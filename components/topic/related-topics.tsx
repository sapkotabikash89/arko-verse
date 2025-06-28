"use client"

import Link from 'next/link';
import { Heart, Star, Shield, Sun, Leaf, Crown, Zap, Compass } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface RelatedTopicsProps {
  currentTopic: string;
}

const allTopics = [
  { name: 'Love', icon: Heart, color: 'text-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  { name: 'Faith', icon: Star, color: 'text-yellow-500', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  { name: 'Hope', icon: Sun, color: 'text-orange-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  { name: 'Peace', icon: Leaf, color: 'text-green-500', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  { name: 'Strength', icon: Shield, color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  { name: 'Wisdom', icon: Crown, color: 'text-purple-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  { name: 'Courage', icon: Zap, color: 'text-indigo-500', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200' },
  { name: 'Guidance', icon: Compass, color: 'text-teal-500', bgColor: 'bg-teal-50', borderColor: 'border-teal-200' },
];

export function RelatedTopics({ currentTopic }: RelatedTopicsProps) {
  const relatedTopics = allTopics.filter(topic => topic.name.toLowerCase() !== currentTopic.toLowerCase()).slice(0, 6);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Related Topics
          </h2>
          <p className="text-gray-600 text-lg">
            Explore more Bible verses on related spiritual topics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedTopics.map((topic, index) => {
            const IconComponent = topic.icon;
            return (
              <Link key={index} href={`/topic/${topic.name.toLowerCase()}`}>
                <Card className={`${topic.bgColor} ${topic.borderColor} border-2 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer`}>
                  <CardContent className="p-6 text-center">
                    <div className={`${topic.bgColor} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 border-2 ${topic.borderColor}`}>
                      <IconComponent className={`h-6 w-6 ${topic.color}`} />
                    </div>
                    <h3 className="font-semibold text-gray-800">
                      {topic.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}