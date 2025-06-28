"use client"

import { useState, useEffect } from 'react';
import { Calendar, Share2, Copy, Download, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VerseCard } from '@/components/verse/verse-card';
import { getRandomVerse } from '@/lib/bible-data';

export function DailyVerse() {
  const [todaysVerse, setTodaysVerse] = useState({
    reference: "John 15:17",
    text: "These things I command you, that ye love one another.",
    topic: "Love",
    date: new Date().toISOString().split('T')[0],
    background: "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  });

  useEffect(() => {
    const loadDailyVerse = async () => {
      try {
        const randomVerse = await getRandomVerse();
        if (randomVerse) {
          setTodaysVerse({
            reference: randomVerse.reference,
            text: randomVerse.text,
            topic: "Love",
            date: new Date().toISOString().split('T')[0],
            background: "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          });
        }
      } catch (error) {
        console.error('Error loading daily verse:', error);
        // Keep the default verse if loading fails
      }
    };

    loadDailyVerse();
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-indigo-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">
              Bible Verse of the Day
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="flex justify-center">
          <VerseCard verse={todaysVerse} showInteractive={true} />
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Get daily inspiration delivered to your inbox
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl px-8"
          >
            <Heart className="h-5 w-5 mr-2" />
            Subscribe to Daily Verses
          </Button>
        </div>
      </div>
    </section>
  );
}