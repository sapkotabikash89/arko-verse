"use client"

import { Calendar, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VerseCard } from '@/components/verse/verse-card';

const previousWeekVerses = [
  {
    date: '2024-01-22',
    reference: 'Psalm 46:10',
    text: 'Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.',
    topic: 'Peace',
    background: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    date: '2024-01-21',
    reference: 'Romans 8:28',
    text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
    topic: 'Faith',
    background: 'https://images.pexels.com/photos/158826/structure-light-led-movement-158826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    date: '2024-01-20',
    reference: 'Isaiah 40:31',
    text: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
    topic: 'Strength',
    background: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    date: '2024-01-19',
    reference: 'Philippians 4:13',
    text: 'I can do all things through Christ who strengthens me.',
    topic: 'Strength',
    background: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    date: '2024-01-18',
    reference: 'John 3:16',
    text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
    topic: 'Love',
    background: 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    date: '2024-01-17',
    reference: 'Proverbs 3:5-6',
    text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    topic: 'Trust',
    background: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    date: '2024-01-16',
    reference: 'Jeremiah 29:11',
    text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.',
    topic: 'Hope',
    background: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export function PreviousVerses() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">
              Previous Week's Daily Verses
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Revisit inspiring verses from the past 7 days
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {previousWeekVerses.map((verse, index) => (
            <div key={index} className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2 font-medium">
                  {new Date(verse.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <VerseCard verse={verse} showInteractive={false} />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center">
          <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous Week
          </Button>
        </div>
      </div>
    </section>
  );
}